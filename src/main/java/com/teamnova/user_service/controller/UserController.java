package com.teamnova.user_service.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.teamnova.user_service.entity.User;
import com.teamnova.user_service.service.*;
import com.teamnova.user_service.util.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final VerificationService verificationService;
    private final EmailService emailService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService,
                          VerificationService verificationService,
                          EmailService emailService,
                          JwtUtil jwtUtil) { // ✅ 여기 추가
        this.userService = userService;
        this.verificationService = verificationService;
        this.emailService = emailService;
        this.jwtUtil = jwtUtil; // ✅ 그리고 초기화
    }


    @PostMapping("/signup")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable String userId) {
        return ResponseEntity.ok(userService.getUserById(userId));
    }
    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable String userId, @RequestBody User updatedUser) {
        return ResponseEntity.ok(userService.updateUser(userId, updatedUser));
    }
    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }
    @PutMapping("/{userId}/password")
    public ResponseEntity<String> updatePassword(@PathVariable String userId, @RequestBody Map<String, String> request) {
        String newPassword = request.get("password");
        userService.updatePassword(userId, newPassword);
        return ResponseEntity.ok("비밀번호 변경 완료");
    }
    @GetMapping("/search")
    public ResponseEntity<List<User>> getUsersByNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(userService.getUsersByNickname(nickname));
    }
    @GetMapping("/count")
    public ResponseEntity<Long> getUserCount() {
        return ResponseEntity.ok(userService.getUserCount());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String token = userService.login(request.getEmailOrUserId(), request.getPassword());
        return ResponseEntity.ok().body(Map.of("token", token));
    }

    @PatchMapping("/{userId}/nickname")
    public ResponseEntity<User> updateNickname(@PathVariable String userId, @RequestBody Map<String, String> request) {
        String newNickname = request.get("nickname");
        return ResponseEntity.ok(userService.updateNickname(userId, newNickname));
    }

    @PatchMapping("/{userId}/profile-image")
    public ResponseEntity<User> updateProfileImage(
            @PathVariable String userId,
            @RequestParam("profileImage") MultipartFile file) {

        return ResponseEntity.ok(userService.updateProfileImage(userId, file));
    }


    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String token) {
        userService.logout(token);
        return ResponseEntity.ok("로그아웃 성공");
    }
    @GetMapping("/me")
    public ResponseEntity<?> getMyInfo(@RequestHeader("Authorization") String token) {
        try {
            User user = userService.getMyInfo(token);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid JWT token: " + e.getMessage());
        }
    }

    @PostMapping("/token/refresh")
    public ResponseEntity<String> refreshToken(@RequestHeader("Authorization") String refreshToken) {
        return ResponseEntity.ok(userService.refreshToken(refreshToken));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        userService.resetPasswordByEmail(email);
        return ResponseEntity.ok("임시 비밀번호가 이메일로 전송되었습니다.");
    }
    @PostMapping("/send-verification-email")
    public ResponseEntity<String> sendVerificationEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = verificationService.generateVerificationCode(email);
        emailService.sendVerificationCode(email, code);  // 이메일 발송
        return ResponseEntity.ok("인증 코드가 이메일로 발송되었습니다.");
    }

    @PostMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");

        if (verificationService.verifyCode(email, code)) {
            verificationService.removeCode(email);  // 인증 완료 후 코드 삭제
            return ResponseEntity.ok("이메일 인증 성공");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("인증 코드가 일치하지 않습니다.");
        }
    }
}