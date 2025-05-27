package com.hospital.api.controller;

import com.hospital.api.model.Review;
import com.hospital.api.model.ReviewResponseDto;
import com.hospital.api.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/{hospitalId}")
    public Review createReview(@PathVariable Long hospitalId, @RequestBody Review review) {
        return reviewService.createReview(hospitalId, review);
    }

    @PutMapping("/{reviewId}")
    public Review updateReview(@PathVariable Long reviewId, @RequestBody Review review) {
        return reviewService.updateReview(reviewId, review.getContent(), review.getRating());
    }

    @DeleteMapping("/{reviewId}")
    public void deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);
    }

    @GetMapping("/hospital/{hospitalId}")
    public List<ReviewResponseDto> getReviews(
            @PathVariable Long hospitalId,
            @RequestHeader("X-User-Name") String encodedUsername) {
        String username = URLDecoder.decode(encodedUsername, StandardCharsets.UTF_8);
        return reviewService.getReviewsByHospital(hospitalId, username);
    }

    @PostMapping("/{reviewId}/like")
    public void toggleLike(@PathVariable Long reviewId,
                           @RequestHeader("X-User-Name") String encodedUsername) {
        String username = URLDecoder.decode(encodedUsername, StandardCharsets.UTF_8);
        reviewService.toggleLike(reviewId, username);
    }

    @GetMapping("/hospital/{hospitalId}/average-rating")
    public ResponseEntity<Double> getAverageRating(@PathVariable Long hospitalId) {
        Double avgRating = reviewService.getAverageRating(hospitalId);
        return ResponseEntity.ok(avgRating);
    }

    @GetMapping("/my")
    public List<ReviewResponseDto> getMyReviews(@RequestHeader("X-User-Name") String encodedUsername) {
        String username = URLDecoder.decode(encodedUsername, StandardCharsets.UTF_8);
        return reviewService.getReviewsByUser(username);
    }
}
