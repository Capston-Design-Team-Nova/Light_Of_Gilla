package com.teamnova.user_service.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class VerificationService {
    private final Map<String, String> verificationCodes = new HashMap<>();

    // 인증 코드 생성
    public String generateVerificationCode(String email) {
        String code = String.format("%06d", new Random().nextInt(999999));
        verificationCodes.put(email, code);
        return code;
    }

    // 인증 코드 검증
    public boolean verifyCode(String email, String code) {
        String savedCode = verificationCodes.get(email);
        return savedCode != null && savedCode.equals(code);
    }

    // 인증 코드 삭제
    public void removeCode(String email) {
        verificationCodes.remove(email);
    }
}