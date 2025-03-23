package com.example.Community.Dto;

import com.example.Community.Entity.PostEntity;
import lombok.*;

import java.time.LocalDateTime;


@Getter
@Setter
@ToString
@NoArgsConstructor//기본생성자
@AllArgsConstructor//모든 필드를 매개변수로 하는 생성자
public class PostDTO {
    private int category_Id;
    private Long post_Id;
    private String title;
    private String content;
    private String user_id;
    private LocalDateTime postCreated_date;
    private LocalDateTime postUpdated_date;
    public static PostDTO toPostDTO(PostEntity postEntity){

        PostDTO postDTO=new PostDTO();
        postDTO.setPost_Id(postEntity.getPost_id());
        postDTO.setCategory_Id(postEntity.getCategory().getCategory_id());
        postDTO.setTitle(postEntity.getTitle());
        postDTO.setContent(postEntity.getContent());
        postDTO.setUser_id(postEntity.getUserid());
        postDTO.setPostCreated_date(postEntity.getCreatedTime());
        postDTO.setPostUpdated_date(postEntity.getUpdatedTime());
        return postDTO;

    }
}
