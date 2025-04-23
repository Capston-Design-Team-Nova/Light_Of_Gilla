package com.example.Community.Repository;

import com.example.Community.Entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<PostEntity,Long> {
    List<PostEntity> findAllByUserid(String userId);

    List<PostEntity> findAllByCategory(String category);

    List<PostEntity> findByTitleContaining(String title);
    // 제목과 내용에 '사과'가 포함된 글을 모두 검색

    @Query("SELECT p FROM PostEntity p WHERE p.title LIKE %:keyword% OR p.content LIKE %:keyword%")
    List<PostEntity> findByTitleOrContentContaining(@Param("keyword") String keyword);

    @Modifying//@Query는 기본적으로 **조회용(SELECT)**으로 인식되므로, 수정 작업임을 알려주기 위해 필요합니다.
    @Query(value= "update PostEntity b set b.postHits=b.postHits+1 where b.post_id= :id")//updateHits의 쿼리문
    void updateHits(@Param("id") Long id);

    @Modifying//@Query는 기본적으로 **조회용(SELECT)**으로 인식되므로, 수정 작업임을 알려주기 위해 필요합니다.
    @Query(value= "update PostEntity b set b.commentCounts=b.commentCounts+1 where b.post_id= :id")//updateHits의 쿼리문
    void updateComments(@Param("id") Long id);

    @Modifying//@Query는 기본적으로 **조회용(SELECT)**으로 인식되므로, 수정 작업임을 알려주기 위해 필요합니다.
    @Query(value= "update PostEntity b set b.likes=b.likes+1 where b.post_id= :id")//updateHits의 쿼리문
    void updateLikes(@Param("id") Long id);


    @Query("SELECT u.id FROM UserEntity u WHERE u.nickName = :nickName")
    List<PostEntity> findIdByNickName(@Param("nickName") String nickName);

}
