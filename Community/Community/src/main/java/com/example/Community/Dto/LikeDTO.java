package com.example.Community.Dto;


import com.example.Community.Entity.LikeEntity;
import com.example.Community.Entity.UserEntity;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class LikeDTO {
    private String NickName;
    private Long post_id;
    public static LikeDTO toLikeDTO(LikeEntity likeEntity) {
       LikeDTO likeDTO = new LikeDTO();
       likeDTO.setNickName(likeEntity.getNickName());
       likeDTO.setPost_id(likeEntity.getPost_id());
       return likeDTO;
    }
}
