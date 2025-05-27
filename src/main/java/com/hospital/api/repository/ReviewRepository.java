package com.hospital.api.repository;

import com.hospital.api.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByHospitalIdOrderByCreatedAtDesc(Long hospitalId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.hospital.id = :hospitalId")
    Double findAverageRatingByHospitalId(@Param("hospitalId") Long hospitalId);
    List<Review> findByAuthorOrderByCreatedAtDesc(String author);
}
