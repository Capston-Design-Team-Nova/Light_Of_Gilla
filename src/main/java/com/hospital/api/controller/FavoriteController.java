package com.hospital.api.controller;

import com.hospital.api.model.Hospital;
import com.hospital.api.service.FavoriteService;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping("/{hospitalId}")
    public void addFavorite(@PathVariable Long hospitalId,
                            @RequestHeader("X-User-Name") String encodedUsername) {
        String username = URLDecoder.decode(encodedUsername, StandardCharsets.UTF_8);
        favoriteService.addFavorite(username, hospitalId);
    }

    @DeleteMapping("/{hospitalId}")
    public void removeFavorite(@PathVariable Long hospitalId,
                               @RequestHeader("X-User-Name") String encodedUsername) {
        String username = URLDecoder.decode(encodedUsername, StandardCharsets.UTF_8);
        favoriteService.removeFavorite(username, hospitalId);
    }

    @GetMapping
    public List<Hospital> getFavorites(@RequestHeader("X-User-Name") String encodedUsername) {
        String username = URLDecoder.decode(encodedUsername, StandardCharsets.UTF_8);
        return favoriteService.getFavorites(username);
    }

}
