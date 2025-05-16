package com.example.Community.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)//특정 이벤트리스너 등록,심사기능이 추가됨
@Getter
public class BaseEntity {
    @CreationTimestamp//엔티티가 처음 저장될때 시간
    @Column(updatable = false)
    private LocalDateTime createdTime;

    @UpdateTimestamp//엔티티가 수정되었을때 시간
    @Column(insertable = false)//컬럼이 추가되지 않게함.자동으로 업뎃한다는 의미
    private LocalDateTime updatedTime;
}

