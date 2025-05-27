package com.hospital.api.controller;

import com.hospital.api.model.Hospital;
import com.hospital.api.service.HospitalService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hospitals")
public class HospitalController {

    private final HospitalService service;

    public HospitalController(HospitalService service) {
        this.service = service;
    }

    @GetMapping
    public List<Hospital> getHospitals(@RequestParam(required = false) String district) {
        if (district != null) {
            return service.getByDistrict(district);
        }
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Hospital getHospitalById(@PathVariable Long id) {
        return service.getById(id);
    }
    @GetMapping("/search")
    public List<Hospital> searchHospitals(@RequestParam String name) {
        return service.searchByName(name);
    }

}