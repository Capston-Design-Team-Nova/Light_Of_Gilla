package com.example.Community.Repository;

import com.example.Community.Entity.CategoryEntity;
import com.example.Community.Entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer> {
}
