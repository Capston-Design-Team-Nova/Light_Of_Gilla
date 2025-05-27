// SearchHistoryController.java
package com.teamnova.user_service.controller;

import com.teamnova.user_service.entity.SearchHistory;
import com.teamnova.user_service.service.SearchHistoryService;
import com.teamnova.user_service.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/search")
public class SearchHistoryController {
    private final SearchHistoryService searchHistoryService;
    private final JwtUtil jwtUtil;

    public SearchHistoryController(SearchHistoryService searchHistoryService, JwtUtil jwtUtil) {
        this.searchHistoryService = searchHistoryService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/log")
    public ResponseEntity<String> logSearch(@RequestHeader("Authorization") String token,
                                            @RequestBody Map<String, String> request) {
        String userId = jwtUtil.getUserIdFromToken(token);
        String keyword = request.get("keyword");
        searchHistoryService.saveSearch(userId, keyword);
        return ResponseEntity.ok("검색 기록 저장 완료");
    }

    @GetMapping("/history")
    public ResponseEntity<List<SearchHistory>> getHistory(@RequestHeader("Authorization") String token) {
        String userId = jwtUtil.getUserIdFromToken(token);
        return ResponseEntity.ok(searchHistoryService.getSearchHistory(userId));
    }

    @DeleteMapping("/history")
    public ResponseEntity<String> clearHistory(@RequestHeader("Authorization") String token) {
        String userId = jwtUtil.getUserIdFromToken(token);
        searchHistoryService.deleteSearchHistory(userId);
        return ResponseEntity.ok("검색 기록 삭제 완료");
    }

    @DeleteMapping("/history/{historyId}")
    public ResponseEntity<String> deleteSingleHistory(@RequestHeader("Authorization") String token,
                                                      @PathVariable Long historyId) {
        String userId = jwtUtil.getUserIdFromToken(token);
        searchHistoryService.deleteSingleHistory(userId, historyId);
        return ResponseEntity.ok("검색 기록 1건 삭제 완료");
    }

}
