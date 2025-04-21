package com.teamnova.user_service.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secretKey;  // ✅ secretKey 주입 확인 필요!

    @Value("${jwt.expiration}")
    private long expirationTime;

    @PostConstruct
    public void init() {
        if (secretKey == null || secretKey.isBlank()) {
            throw new IllegalArgumentException("🚨 Invalid JWT Secret Key! Please check your application configuration.");
        }

        // Secret Key의 길이를 검증 (예: 최소 32자 이상인지)
        if (secretKey.length() < 32) {
            throw new IllegalArgumentException("🚨 Secret Key must be at least 32 characters long for sufficient security!");
        }

        // 특수 문자 포함 여부 검증 (옵션)
        if (!secretKey.matches("^[\\w\\d]+$")) {
            throw new IllegalArgumentException("🚨 Secret Key must contain only alphanumeric characters!");
        }

        System.out.println("✅ JWT Secret Key successfully loaded.");
    }


    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    // JWT 토큰 생성
    public String generateToken(String userId) {
        return Jwts.builder()
                .setSubject(userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // JWT 토큰에서 userId 추출
    public String getUserIdFromToken(String token) {
        try {
            // Bearer 포함 여부 확인 후 제거
            if (token.startsWith("Bearer ")) {
                token = token.substring(7); // "Bearer " 이후부터 자르기
            }
            return Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token) // 정리된 토큰 사용
                    .getBody()
                    .getSubject();
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid JWT token provided.", e);
        }

    }
    public boolean validateToken(String token) {
        try {// Bearer 포함 여부 확인 후 제거
            if (token.startsWith("Bearer ")) {
                token = token.substring(7); // "Bearer " 이후부터 자르기
            }
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            System.out.println("JWT 만료됨: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println("지원되지 않는 JWT 형식: " + e.getMessage());
        } catch (MalformedJwtException e) {
            System.out.println("잘못된 JWT 형식: " + e.getMessage());
        } catch (SecurityException e) {
            System.out.println("JWT 서명 검증 실패: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("JWT 토큰이 비어있거나 잘못되었습니다: " + e.getMessage());
        }
        return false;

    }

}
