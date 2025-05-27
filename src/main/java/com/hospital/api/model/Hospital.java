package com.hospital.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Hospital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "BIGINT") // 또는 그냥 생략해도 보통 괜찮음
    private Long id;

    private String district;
    private String name;
    private Float score;
    private String address;

    @Column(length = 1000) // 혹은 더 길게
    private String imgUrl;

    @Column(columnDefinition = "TEXT")
    private String reviews;

    @Column(columnDefinition = "TEXT")
    private String openHour;
}