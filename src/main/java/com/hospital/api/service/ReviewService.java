package com.hospital.api.service;

import com.hospital.api.model.Hospital;
import com.hospital.api.model.Review;
import com.hospital.api.model.ReviewLike;
import com.hospital.api.model.ReviewResponseDto;
import com.hospital.api.repository.HospitalRepository;
import com.hospital.api.repository.ReviewLikeRepository;
import com.hospital.api.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepo;
    private final HospitalRepository hospitalRepo;
    private final ReviewLikeRepository likeRepo;

    public ReviewService(ReviewRepository reviewRepo, HospitalRepository hospitalRepo, ReviewLikeRepository likeRepo) {
        this.reviewRepo = reviewRepo;
        this.hospitalRepo = hospitalRepo;
        this.likeRepo = likeRepo;
    }

    // 리뷰 작성
    public Review createReview(Long hospitalId, Review review) {
        Hospital hospital = hospitalRepo.findById(hospitalId).orElseThrow();
        review.setHospital(hospital);
        review.setCreatedAt(LocalDateTime.now());
        review.setLikes(0);
        return reviewRepo.save(review);
    }

    // 리뷰 수정
    public Review updateReview(Long reviewId, String content, int rating) {
        Review review = reviewRepo.findById(reviewId).orElseThrow();
        review.setContent(content);
        review.setRating(rating);
        return reviewRepo.save(review);
    }

    // 리뷰 삭제
    public void deleteReview(Long reviewId) {
        reviewRepo.deleteById(reviewId);
    }

    public List<ReviewResponseDto> getReviewsByHospital(Long hospitalId, String username) {
        List<Review> reviews = reviewRepo.findByHospitalIdOrderByCreatedAtDesc(hospitalId);

        Set<Long> likedReviewIds = likeRepo.findByUsername(username).stream()
                .map(rl -> rl.getReview().getId())
                .collect(Collectors.toSet());

        return reviews.stream().map(r -> new ReviewResponseDto(
                r.getId(),
                r.getAuthor(),
                r.getContent(),
                r.getLikes(),
                r.getRating(),
                likedReviewIds.contains(r.getId()),
                r.getCreatedAt(), // ⬅️ 여기도 추가
                r.getHospital().getId() // ⬅️ 병원 ID 추가
        )).toList();
    }

    public List<ReviewResponseDto> getReviewsByUser(String username) {
        List<Review> reviews = reviewRepo.findByAuthorOrderByCreatedAtDesc(username);

        Set<Long> likedReviewIds = likeRepo.findByUsername(username).stream()
                .map(like -> like.getReview().getId())
                .collect(Collectors.toSet());

        return reviews.stream().map(r -> new ReviewResponseDto(
                r.getId(),
                r.getAuthor(),
                r.getContent(),
                r.getLikes(),
                r.getRating(),
                likedReviewIds.contains(r.getId()),
                r.getCreatedAt(),
                r.getHospital().getId() // ⬅️ 병원 ID 추가
        )).toList();
    }


    // 좋아요 토글
    public void toggleLike(Long reviewId, String username) {
        Review review = reviewRepo.findById(reviewId).orElseThrow();

        Optional<ReviewLike> existing = likeRepo.findByReviewIdAndUsername(reviewId, username);
        if (existing.isPresent()) {
            likeRepo.delete(existing.get());
        } else {
            ReviewLike like = new ReviewLike();
            like.setReview(review);
            like.setUsername(username);
            likeRepo.save(like);
        }

        int newLikeCount = likeRepo.countByReviewId(reviewId);
        review.setLikes(newLikeCount);
        reviewRepo.save(review);
    }

    public Double getAverageRating(Long hospitalId) {
        Double average = reviewRepo.findAverageRatingByHospitalId(hospitalId);
        return average != null ? average : 0.0;  // null 방지
    }
}