package com.teamnova.user_service.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class User {
    @Id
    @Column(name = "user_id", length = 50)  // VARCHAR2(50)
    private String userId;  // 아이디 (VARCHAR2(50), PK)

    @Column(nullable = false)
    private String password;  // 비밀번호 (VARCHAR)

    @Column(nullable = false, unique = true)
    private String email;  // 이메일 (VARCHAR, UNIQUE)

    @Column(nullable = false, unique = true)
    private String phone;  // 전화번호 (VARCHAR, UNIQUE)

    @Column(nullable = false)
    private String nickname;  // 닉네임 (VARCHAR)

    @Column(name = "profile_image")
    private String profileImage;  // 프로필 이미지 URL (VARCHAR)

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;  // 가입 날짜 (DATETIME)

    @Column(name = "resident_number", nullable = false, unique = true)
    private String residentNumber;  // 주민번호 앞자리 (VARCHAR)

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();  // 가입 날짜 자동 생성
    }
}
