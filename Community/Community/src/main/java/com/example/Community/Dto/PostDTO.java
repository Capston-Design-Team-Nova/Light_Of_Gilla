package com.example.Community.Dto;

import com.example.Community.CategoryId;
import com.example.Community.Entity.PostEntity;
import jakarta.persistence.Column;
import lombok.*;

import java.time.LocalDateTime;


@Getter
@Setter
@ToString
@NoArgsConstructor//기본생성자
@AllArgsConstructor//모든 필드를 매개변수로 하는 생성자
public class PostDTO {
    private int category_Id;
    private int post_Id;
    private String title;
    private String content;
    private String user_id;
    private LocalDateTime postCreated_date;
    private LocalDateTime postUpdated_date;
    public static PostDTO toPostDto(PostEntity postEntity){

        PostDTO postDTO=new PostDTO();
        postDTO.setCategory_Id(postEntity.getId().getCategoryId());
        postDTO.setPost_Id(postEntity.getId().getPostId());
        postDTO.setTitle(postEntity.getTitle());
        postDTO.setContent(postEntity.getContent());
        postDTO.setUser_id(postDTO.getUser_id());
        postDTO.setPostCreated_date(postDTO.getPostCreated_date());
        postDTO.setPostUpdated_date(postDTO.getPostUpdated_date());
        return postDTO;

    }
}
