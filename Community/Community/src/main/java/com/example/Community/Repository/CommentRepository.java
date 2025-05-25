package com.example.Community.Repository;

import com.example.Community.Entity.CommentEntity;
import com.example.Community.Entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {
    Optional<CommentEntity> findById(Long Id);
    List<CommentEntity> findAllByPostEntityOrderByIdDesc(PostEntity postEntity);
    List<CommentEntity> findAllByNickName(String nickName);
}
