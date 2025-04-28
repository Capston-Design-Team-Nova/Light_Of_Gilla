package com.example.Community.Repository;

import com.example.Community.Entity.CommentEntity;
import com.example.Community.Entity.LikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeRepository extends JpaRepository<LikeEntity, Long> {
    List<LikeEntity> findAllByNickName(String nickName);
}
