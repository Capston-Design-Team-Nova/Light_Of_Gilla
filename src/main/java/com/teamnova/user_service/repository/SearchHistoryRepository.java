package com.teamnova.user_service.repository;

import com.teamnova.user_service.entity.SearchHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Long> {
    List<SearchHistory> findByUserIdOrderBySearchedAtDesc(String userId);

    void deleteByUserId(String userId);
}
