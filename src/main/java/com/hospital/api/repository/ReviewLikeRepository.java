package com.hospital.api.repository;

import com.hospital.api.model.ReviewLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewLikeRepository extends JpaRepository<ReviewLike, Long> {
    Optional<ReviewLike> findByReviewIdAndUsername(Long reviewId, String username);
    int countByReviewId(Long reviewId);
    List<ReviewLike> findByUsername(String username);
}
