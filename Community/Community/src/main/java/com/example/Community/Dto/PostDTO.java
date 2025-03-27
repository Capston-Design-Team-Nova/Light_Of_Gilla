package com.example.Community.Dto;

import com.example.Community.Entity.PostEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;


@Getter
@Setter
@ToString
@NoArgsConstructor//기본생성자
@AllArgsConstructor//모든 필드를 매개변수로 하는 생성자
public class PostDTO {
    private Long post_Id;
    private String title;
    private int postHits;
    private int commentCounts;
    private String content;
    private String user_id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime postCreated_date;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime postUpdated_date;
    public static PostDTO toPostDTO(PostEntity postEntity){

        PostDTO postDTO=new PostDTO();
        postDTO.setPostHits(postEntity.getPostHits());
        postDTO.setPost_Id(postEntity.getPost_id());
        postDTO.setTitle(postEntity.getTitle());
        postDTO.setCommentCounts(postEntity.getCommentCounts());
        postDTO.setContent(postEntity.getContent());
        postDTO.setUser_id(postEntity.getUserid());
        postDTO.setPostCreated_date(postEntity.getCreatedTime());
        postDTO.setPostUpdated_date(postEntity.getUpdatedTime());
        return postDTO;

    }
}
