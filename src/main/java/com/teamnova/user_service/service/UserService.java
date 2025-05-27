package com.teamnova.user_service.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.teamnova.user_service.entity.User;
import com.teamnova.user_service.repository.UserRepository;
import com.teamnova.user_service.util.JwtUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.apache.commons.lang3.RandomStringUtils; // 임시 비밀번호 생성용
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.time.LocalDateTime;
import java.util.*;
import java.io.File;
import java.io.IOException;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private static final Set<String> blacklistedTokens = new HashSet<>();
    private final JwtUtil jwtUtil; // 🔹 주입받을 JWT 유틸
    private final EmailService emailService;

    @Value("${cloud.aws.credentials.access-key}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secret-key}")
    private String secretKey;

    @Value("${cloud.aws.region.static}")
    private String region;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public UserService(UserRepository userRepository, JwtUtil jwtUtil, EmailService emailService) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
    }

    @Transactional
    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));  // 비밀번호 암호화 후 저장
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();  // 모든 유저 조회
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    public User updateUser(String userId, User updatedUser) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setNickname(updatedUser.getNickname());
        user.setPhone(updatedUser.getPhone());
        user.setProfileImage(updatedUser.getProfileImage());

        return userRepository.save(user);
    }
    public void deleteUser(String userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(userId);
    }

    public void updatePassword(String userId, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword)); // 비밀번호 암호화 후 저장
        userRepository.save(user);
    }
    public List<User> getUsersByNickname(String nickname) {
        return userRepository.findByNicknameContaining(nickname);
    }

    public long getUserCount() {
        return userRepository.count();
    }

    public String login(String emailOrUserId, String password) {
        User user = userRepository.findByEmail(emailOrUserId)
                .or(() -> userRepository.findById(emailOrUserId))  // 아이디 검색 추가
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(user.getUserId());
    }

    public User updateNickname(String userId, String newNickname) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setNickname(newNickname);
        return userRepository.save(user);
    }
    public User updateProfileImage(String userId, MultipartFile file) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // AWS S3 설정
        String key = "profiles/" + userId + "_" + file.getOriginalFilename();

        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(accessKey, secretKey);
        S3Client s3Client = S3Client.builder()
                .region(Region.of(region)) // 서울 리전
                .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                .build();

        try {
            s3Client.putObject(PutObjectRequest.builder()
                            .bucket(bucket)
                            .key(key)
                            .contentType(file.getContentType()) // ✅ 추가!
                            .build(),
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize())
            );
        } catch (IOException e) {
            throw new RuntimeException("S3 업로드 실패", e);
        }

        // CloudFront URL로 프로필 이미지 경로 설정
        String cloudFrontUrl = "https://ddo857ydmq0nf.cloudfront.net/" + key;
        user.setProfileImage(cloudFrontUrl);

        return userRepository.save(user);
    }


    public void logout(String token) {
        blacklistedTokens.add(token);
    }

    public boolean isTokenBlacklisted(String token) {
        return blacklistedTokens.contains(token);
    }

    public User getMyInfo(String token) {
        System.out.println("Received Token: " + token);
        String userId = jwtUtil.getUserIdFromToken(token); // JWT에서 userId 추출
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    public String refreshToken(String refreshToken) {
        System.out.println("Received Token: " + refreshToken);
        if (!jwtUtil.validateToken(refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }
        String userId = jwtUtil.getUserIdFromToken(refreshToken);
        return jwtUtil.generateToken(userId);
    }

    public void resetPasswordByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String tempPassword = RandomStringUtils.randomAlphanumeric(10); // 임시 비밀번호 생성
        user.setPassword(passwordEncoder.encode(tempPassword));
        userRepository.save(user);

        emailService.sendTemporaryPassword(email, tempPassword); // 이메일 전송
    }
}