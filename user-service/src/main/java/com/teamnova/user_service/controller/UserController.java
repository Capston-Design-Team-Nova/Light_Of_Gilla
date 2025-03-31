package com.teamnova.user_service.controller;

import com.teamnova.user_service.entity.User;
import com.teamnova.user_service.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
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
        String token = userService.login(request.getEmail(), request.getPassword());

        // 🔹 JWT 토큰을 JSON 형식으로 응답
        return ResponseEntity.ok().body(Map.of("token", token));
    }

    @PatchMapping("/{userId}/nickname")
    public ResponseEntity<User> updateNickname(@PathVariable String userId, @RequestBody Map<String, String> request) {
        String newNickname = request.get("nickname");
        return ResponseEntity.ok(userService.updateNickname(userId, newNickname));
    }

    @PatchMapping("/{userId}/profile-image")
    public ResponseEntity<User> updateProfileImage(@PathVariable String userId, @RequestBody Map<String, String> request) {
        String newImageUrl = request.get("profileImage");
        return ResponseEntity.ok(userService.updateProfileImage(userId, newImageUrl));
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

}