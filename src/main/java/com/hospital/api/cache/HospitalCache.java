package com.hospital.api.cache;

import com.hospital.api.model.Hospital;
import com.hospital.api.repository.HospitalRepository;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class HospitalCache {

    private final HospitalRepository hospitalRepository;
    @Getter
    private List<Hospital> cachedHospitalList;

    public HospitalCache(HospitalRepository hospitalRepository) {
        this.hospitalRepository = hospitalRepository;
    }

    public Hospital findByNameAndAddress(String name, String address) {
        return cachedHospitalList.stream()
                .filter(h -> h.getName().equals(name) && h.getAddress().equals(address))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("해당 병원을 찾을 수 없습니다."));
    }

    @PostConstruct
    public void init() {
        this.cachedHospitalList = hospitalRepository.findAll();
        System.out.println("[HospitalCache] 병원 정보 " + cachedHospitalList.size() + "개 로드 완료");
    }
}
