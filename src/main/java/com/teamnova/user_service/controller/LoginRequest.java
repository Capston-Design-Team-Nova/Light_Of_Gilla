package com.teamnova.user_service.controller;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    private String emailOrUserId;  // 이메일 또는 아이디로 로그인
    private String password;
}

