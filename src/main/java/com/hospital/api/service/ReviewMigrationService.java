package com.hospital.api.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hospital.api.model.Hospital;
import com.hospital.api.model.Review;
import com.hospital.api.repository.HospitalRepository;
import com.hospital.api.repository.ReviewRepository;
import jakarta.persistence.EntityManager;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class ReviewMigrationService {

    private final HospitalRepository hospitalRepo;
    private final ReviewRepository reviewRepo;
    private final EntityManager entityManager;

    private final ObjectMapper mapper = new ObjectMapper();
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");

    public ReviewMigrationService(HospitalRepository hospitalRepo, ReviewRepository reviewRepo, EntityManager entityManager) {
        this.hospitalRepo = hospitalRepo;
        this.reviewRepo = reviewRepo;
        this.entityManager = entityManager;
    }

    private int parseSafeInt(String value, int defaultVal) {
        try {
            if (value == null || value.isBlank()) return defaultVal;
            return (int) Float.parseFloat(value);
        } catch (Exception e) {
            return defaultVal;
        }
    }

    private LocalDateTime parseSafeDate(String dateRaw) {
        try {
            if (dateRaw == null || dateRaw.isBlank()) return LocalDateTime.now();

            // 1. yyyy.MM.dd. → 2025.03.16.
            if (dateRaw.matches("\\d{4}\\.\\d{2}\\.\\d{2}\\.")) {
                DateTimeFormatter f1 = DateTimeFormatter.ofPattern("yyyy.MM.dd.");
                return LocalDate.parse(dateRaw, f1).atStartOfDay();
            }

            // 2. yyyyMMdd → 20250327
            if (dateRaw.matches("\\d{8}")) {
                DateTimeFormatter f2 = DateTimeFormatter.ofPattern("yyyyMMdd");
                return LocalDate.parse(dateRaw, f2).atStartOfDay();
            }

            // 그 외 → 현재 시간 반환
            return LocalDateTime.now();
        } catch (Exception e) {
            return LocalDateTime.now(); // 실패 시 현재 시간
        }
    }

    public void migrateReviews() {
        List<Hospital> hospitals = hospitalRepo.findAll();
        int total = 0;
        Set<String> seen = new HashSet<>(); // 중복 방지용 키 저장소

        for (Hospital hospital : hospitals) {
            Long hospitalId = hospital.getId();

            // ✅ ID 1~10만 처리
            if (hospitalId == null || hospitalId < 1 || hospitalId > 10) {
                continue;
            }

            String raw = hospital.getReviews();
            if (raw == null || raw.isBlank()) continue;

            try {
                String formattedJson = raw.replace("'", "\"");
                List<Map<String, String>> parsed = mapper.readValue(formattedJson, List.class);

                for (Map<String, String> r : parsed) {
                    try {
                        String author = r.getOrDefault("작성자", "익명");
                        String content = r.getOrDefault("내용", "");
                        String dateRaw = r.get("날짜");
                        String key = author + content + dateRaw;

                        // ✅ 중복 체크
                        if (seen.contains(key)) continue;
                        seen.add(key);

                        Review review = new Review();
                        review.setAuthor(author);
                        review.setContent(content);
                        review.setLikes(parseSafeInt(r.get("좋아요"), 0));
                        review.setRating(parseSafeInt(r.get("별점"), 0));
                        review.setHospital(hospital);
                        review.setCreatedAt(parseSafeDate(dateRaw));

                        reviewRepo.save(review);
                        total++;

                        if (total % 1000 == 0) {
                            entityManager.flush();
                            entityManager.clear();
                            System.out.println("✅ " + total + "개 리뷰 저장 완료");
                        }

                    } catch (Exception reviewEx) {
                        System.out.println("⚠ 리뷰 하나 스킵됨 (hospitalId=" + hospital.getId() + ") => " + reviewEx.getMessage());
                        entityManager.clear(); // flush 전에 세션 정리
                    }
                }

            } catch (Exception e) {
                System.out.println("❌ 파싱 실패: hospital_id = " + hospital.getId());
            }
        }
        try {
            entityManager.flush();
            entityManager.clear();
        } catch (Exception e) {
            System.out.println("⚠ flush 실패: " + e.getMessage());
        }
        System.out.println("🎉 전체 마이그레이션 완료 - 총 " + total + "개 리뷰");
    }

}
