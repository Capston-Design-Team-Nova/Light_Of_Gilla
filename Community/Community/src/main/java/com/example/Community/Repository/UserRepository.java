package com.example.Community.Repository;


import com.example.Community.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    @Query("SELECT u.nickName FROM UserEntity u WHERE u.email = :value OR u.userid = :value")
    Optional<String> findNickNameByEmailOrUserId(@Param("value") String value);
}
