package com.hospital.api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username; // 또는 User 엔티티 연관관계로 변경 가능

    @ManyToOne
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;
}