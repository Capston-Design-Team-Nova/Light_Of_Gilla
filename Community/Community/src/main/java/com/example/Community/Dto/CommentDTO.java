package com.example.Community.Dto;


import com.example.Community.Entity.CommentEntity;
import jakarta.persistence.Column;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor//기본생성자
@AllArgsConstructor//모든 필드를 매개변수로 하는 생성자
public class CommentDTO {
    private int id;
    private String comment;
    private String user_id;
    private String post_id;
    private LocalDateTime postCreated_date;
    private LocalDateTime postUpdated_date;
    private int parentComment_id;
    private String category_id;

    public static CommentDTO toDTO(CommentEntity commentEntity) {
        CommentDTO commentDTO=new CommentDTO();
        commentDTO.setId(commentEntity.getComment_id());
        commentDTO.setComment(commentEntity.getComment());
        commentDTO.setUser_id(commentEntity.getUser_id());
        commentDTO.setPost_id(commentEntity.getPost_id());
        commentDTO.setPostCreated_date(commentEntity.getCreatedTime());
        commentDTO.setPostUpdated_date(commentEntity.getUpdatedTime());
        commentDTO.setParentComment_id(commentDTO.getParentComment_id());
        commentDTO.setCategory_id(commentEntity.getCategory_id());
        return commentDTO;

    }


}
