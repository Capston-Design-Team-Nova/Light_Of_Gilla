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
    private int comment_id;

    @Column
    private String comment;

    @Column
    private String user_id;
    @Column
    private String post_id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_comment_id", referencedColumnName = "comment_id")
    private CommentEntity commentEntity;  // 부모 댓글

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private PostEntity postEntity;

    @Column
    private String category_id;


    public static CommentEntity toSaveEntity(CommentDTO commentDTO) {
        CommentEntity commentEntity=new CommentEntity();
        commentEntity.setComment(commentDTO.getComment());
        return commentEntity;

    }

}
