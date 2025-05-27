package com.hospital.api.service;

import com.hospital.api.cache.HospitalCache;
import com.hospital.api.model.Hospital;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HospitalService {

    private final HospitalCache hospitalCache;

    public HospitalService(HospitalCache hospitalCache) {
        this.hospitalCache = hospitalCache;
    }

    public List<Hospital> getAll() {
        // 캐시에 저장된 전체 병원 반환
        return hospitalCache.getCachedHospitalList();
    }

    public Hospital getById(Long id) {
        return hospitalCache.getCachedHospitalList().stream()
                .filter(h -> h.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public List<Hospital> getByDistrict(String district) {
        return hospitalCache.getCachedHospitalList().stream()
                .filter(h -> h.getDistrict().equalsIgnoreCase(district))
                .limit(500)
                .collect(Collectors.toList());
    }

    public List<Hospital> searchByName(String name) {
        return hospitalCache.getCachedHospitalList().stream()
                .filter(h -> h.getName().toLowerCase().contains(name.toLowerCase()))
                .limit(500)
                .collect(Collectors.toList());
    }

    public Hospital findByNameAndAddress(String name, String address) {
        return hospitalCache.findByNameAndAddress(name, address);
    }
}
