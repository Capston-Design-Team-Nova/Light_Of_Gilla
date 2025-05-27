package com.hospital.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class ReviewResponseDto {
    private Long id;
    private String author;
    private String content;
    private int likes;
    private int rating;
    private boolean likedByCurrentUser;
    private LocalDateTime createdAt; // ⬅️ 추가
    private Long hospitalId; // ⬅️ 병원 ID 추가

}