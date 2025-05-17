package com.example.Community.Entity;


import com.example.Community.Dto.LikeDTO;
import com.example.Community.Dto.UserDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="likes", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"post_id", "nickName"})
})
public class LikeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nickName;

    @Column
    private Long post_id;

    public static LikeEntity toSaveLikeEntity(LikeDTO likeDTO) {
        LikeEntity likeEntity = new LikeEntity();
        likeEntity.setNickName(likeDTO.getNickName());
        likeEntity.setPost_id(likeDTO.getPost_id());
        return likeEntity;
    }
}
