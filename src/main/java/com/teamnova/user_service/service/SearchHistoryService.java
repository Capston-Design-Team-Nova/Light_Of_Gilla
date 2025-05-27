// SearchHistoryService.java
package com.teamnova.user_service.service;

import com.teamnova.user_service.entity.SearchHistory;
import com.teamnova.user_service.repository.SearchHistoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SearchHistoryService {
    private final SearchHistoryRepository searchHistoryRepository;

    public SearchHistoryService(SearchHistoryRepository searchHistoryRepository) {
        this.searchHistoryRepository = searchHistoryRepository;
    }

    public void saveSearch(String userId, String keyword) {
        SearchHistory history = new SearchHistory();
        history.setUserId(userId);
        history.setKeyword(keyword);
        history.setSearchedAt(LocalDateTime.now());
        searchHistoryRepository.save(history);
    }

    public List<SearchHistory> getSearchHistory(String userId) {
        return searchHistoryRepository.findByUserIdOrderBySearchedAtDesc(userId);
    }

    @Transactional
    public void deleteSearchHistory(String userId) {
        searchHistoryRepository.deleteByUserId(userId);
    }

    public void deleteSingleHistory(String userId, Long historyId) {
        SearchHistory history = searchHistoryRepository.findById(historyId)
                .orElseThrow(() -> new RuntimeException("검색 기록을 찾을 수 없습니다."));

        if (!history.getUserId().equals(userId)) {
            throw new RuntimeException("권한이 없습니다.");
        }

        searchHistoryRepository.deleteById(historyId);
    }

}
