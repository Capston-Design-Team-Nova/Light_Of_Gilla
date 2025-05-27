package com.hospital.api.repository;

import com.hospital.api.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Optional<Favorite> findByUsernameAndHospitalId(String username, Long hospitalId);
    List<Favorite> findByUsername(String username);
    void deleteByUsernameAndHospitalId(String username, Long hospitalId);
}