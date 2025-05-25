package com.example.Community.Dto;


import com.example.Community.Entity.CommentEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor//기본생성자
@AllArgsConstructor//모든 필드를 매개변수로 하는 생성자
public class CommentDTO {
    private Long id;
    private String comment;
    private String user_id;
    private String nickName;
    private Long post_id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime postCreated_date;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime postUpdated_date;
    private Long parentComment_id;


    public static CommentDTO toCommentDTO(CommentEntity commentEntity,Long post_id) {
        CommentDTO commentDTO=new CommentDTO();
        commentDTO.setId(commentEntity.getId());
        commentDTO.setComment(commentEntity.getComment());
        commentDTO.setUser_id(commentEntity.getUser_id());
        commentDTO.setPost_id(post_id);
        commentDTO.setNickName(commentEntity.getNickName());
        commentDTO.setPostCreated_date(commentEntity.getCreatedTime());
        commentDTO.setPostUpdated_date(commentEntity.getUpdatedTime());
        commentDTO.setParentComment_id(commentDTO.getParentComment_id());
        return commentDTO;

    }


}
