package com.example.Community;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@EqualsAndHashCode // equals와 hashCode 메서드를 자동으로 생성
@Data
@AllArgsConstructor
public class CategoryId implements Serializable {

    @Column(name="post_id")
    private Integer postId;

    @Column(name="category_id")
    private Integer categoryId;



}
