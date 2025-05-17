package com.example.Community.Repository;

import com.example.Community.Entity.CommentEntity;
import com.example.Community.Entity.LikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<LikeEntity, Long> {
    List<LikeEntity> findAllByNickName(String nickName);
    Optional<LikeEntity> findByPostidAndNickName(Long post_id, String nickName);
    boolean existsByPostidAndNickName(Long postId, String nickName);
}
