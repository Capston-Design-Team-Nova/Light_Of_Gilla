package com.hospital.api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String author;            // 작성자

    private int rating;              // 별점 (1~5)

    @Column(columnDefinition = "TEXT")
    private String content;          // 리뷰 내용

    private int likes = 0;           // 좋아요 수

    private LocalDateTime createdAt; // 작성일

    @ManyToOne
    @JoinColumn(name = "hospital_id", referencedColumnName = "id")
    private Hospital hospital;
}
