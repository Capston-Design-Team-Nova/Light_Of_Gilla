package com.hospital.api.repository;

import com.hospital.api.model.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Optional;

public interface HospitalRepository extends JpaRepository<Hospital, Long> {
    List<Hospital> findByDistrict(String district, Pageable pageable);
    List<Hospital> findByNameContaining(String name, Pageable pageable);

    Optional<Hospital> findByNameAndAddress(String name, String address);
}