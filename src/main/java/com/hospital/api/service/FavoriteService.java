package com.hospital.api.service;

import com.hospital.api.model.Favorite;
import com.hospital.api.model.Hospital;
import com.hospital.api.repository.FavoriteRepository;
import com.hospital.api.repository.HospitalRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FavoriteService {

    private final FavoriteRepository favoriteRepo;
    private final HospitalRepository hospitalRepo;

    public FavoriteService(FavoriteRepository favoriteRepo, HospitalRepository hospitalRepo) {
        this.favoriteRepo = favoriteRepo;
        this.hospitalRepo = hospitalRepo;
    }

    // 즐겨찾기 추가
    public void addFavorite(String username, Long hospitalId) {
        if (favoriteRepo.findByUsernameAndHospitalId(username, hospitalId).isPresent()) return;

        Hospital hospital = hospitalRepo.findById(hospitalId).orElseThrow();
        Favorite fav = new Favorite();
        fav.setUsername(username);
        fav.setHospital(hospital);
        favoriteRepo.save(fav);
    }

    // 즐겨찾기 해제
    public void removeFavorite(String username, Long hospitalId) {
        favoriteRepo.deleteByUsernameAndHospitalId(username, hospitalId);
    }

    // 즐겨찾기 목록 조회
    public List<Hospital> getFavorites(String username) {
        List<Favorite> favs = favoriteRepo.findByUsername(username);
        return favs.stream().map(Favorite::getHospital).toList();
    }
}
