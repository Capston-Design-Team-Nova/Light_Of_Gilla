package com.example.Community.Repository;

import com.example.Community.CategoryId;
import com.example.Community.Entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<PostEntity,Long> {
    List<PostEntity> findAllByUserid(String userId);

}
