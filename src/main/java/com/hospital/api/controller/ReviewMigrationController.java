package com.hospital.api.controller;

import com.hospital.api.service.ReviewMigrationService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Controller
public class ReviewMigrationController {

    private final ReviewMigrationService reviewMigrationService;
    public ReviewMigrationController(ReviewMigrationService reviewMigrationService) { this.reviewMigrationService = reviewMigrationService; }

    @GetMapping("/migrate-reviews")
    public void migrate() {
        reviewMigrationService.migrateReviews();
    }
}
