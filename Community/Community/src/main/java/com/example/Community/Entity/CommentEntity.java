package com.example.Community.Entity;

import com.example.Community.Dto.CommentDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="Comments")
public class CommentEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long comment_id;

    @Column
    private String comment;

    @Column
    private String user_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_comment_id", referencedColumnName = "comment_id")
    private CommentEntity commentEntity;  // 부모 댓글

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private PostEntity postEntity;




    public static CommentEntity toSaveEntity(CommentDTO commentDTO,PostEntity postEntity,CommentEntity parentComment) {
        CommentEntity commentEntity=new CommentEntity();
        commentEntity.setComment(commentDTO.getComment());
        commentEntity.setUser_id(commentDTO.getUser_id());
        if (parentComment != null) {
            commentEntity.setCommentEntity(parentComment);
        } else {
            commentEntity.setCommentEntity(null);  // 최상위 댓글
        }
        commentEntity.setPostEntity(postEntity);
        return commentEntity;

    }
    public static CommentEntity toUpdateEntity(CommentDTO commentDTO,PostEntity postEntity,CommentEntity parentComment) {
        CommentEntity commentEntity=new CommentEntity();
        commentEntity.setComment_id(commentDTO.getComment_id());
        commentEntity.setComment(commentDTO.getComment());
        commentEntity.setUser_id(commentDTO.getUser_id());
        if (parentComment != null) {
            commentEntity.setCommentEntity(parentComment);
        } else {
            commentEntity.setCommentEntity(null);  // 최상위 댓글
        }
        commentEntity.setPostEntity(postEntity);
        return commentEntity;

    }

}
