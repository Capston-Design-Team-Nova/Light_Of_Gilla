package com.example.Community.Repository;

import com.example.Community.CategoryId;
import com.example.Community.Entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<PostEntity, CategoryId> {
}
