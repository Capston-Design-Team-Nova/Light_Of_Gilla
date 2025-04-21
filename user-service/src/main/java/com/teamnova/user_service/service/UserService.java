package com.teamnova.user_service.service;

import com.teamnova.user_service.entity.User;
import com.teamnova.user_service.repository.UserRepository;
import com.teamnova.user_service.util.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private static final Set<String> blacklistedTokens = new HashSet<>();
    private final JwtUtil jwtUtil; // 🔹 주입받을 JWT 유틸

    public UserService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

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

    public String login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 🔹 비밀번호 확인 (passwordEncoder.matches() 사용!)
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // 🔹 로그인 성공 시 JWT 토큰 생성
        return jwtUtil.generateToken(user.getUserId());
    }
    public User updateNickname(String userId, String newNickname) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setNickname(newNickname);
        return userRepository.save(user);
    }
    public User updateProfileImage(String userId, String newImageUrl) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setProfileImage(newImageUrl);
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

}
