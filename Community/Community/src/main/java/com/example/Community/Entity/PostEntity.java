package com.example.Community.Entity;

import com.example.Community.Dto.PostDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name="Posts")
public class PostEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long post_id;

    @Column
    private String title;

    @Column
    private int commentCounts;

    @Column
    private String nickName;
    @Column
    private String category;

    @Column
    private String content;

    @Column
    private int likes;

    @Column
    private int postHits;

    @Column
    private String userid;

    @OneToMany(mappedBy="postEntity",cascade = CascadeType.REMOVE,orphanRemoval = true,fetch = FetchType.LAZY)
    private List<CommentEntity> commentEntityList=new ArrayList<>();

    public static PostEntity toSaveEntity(PostDTO postDTO){
      PostEntity postEntity = new PostEntity();
      postEntity.setTitle(postDTO.getTitle());
      postEntity.setNickName(postDTO.getNickName());
      postEntity.setContent(postDTO.getContent());
      postEntity.setUserid(postDTO.getUser_id());
      postEntity.setCategory(postDTO.getCategory());
      postEntity.setPostHits(0);
      postEntity.setLikes(0);
      postEntity.setCommentCounts(0);
      return postEntity;
    }
    public static PostEntity toUpdateEntity(PostDTO postDTO){
        PostEntity postEntity = new PostEntity();
        postEntity.setPost_id(postDTO.getPost_Id());
        postEntity.setTitle(postDTO.getTitle());
        postEntity.setContent(postDTO.getContent());
        postEntity.setUserid(postDTO.getUser_id());
        postEntity.setLikes(postDTO.getLikes());
        postEntity.setCategory(postDTO.getCategory());
        postEntity.setPostHits(postDTO.getPostHits());
        postEntity.setCommentCounts(postDTO.getCommentCounts());
        return postEntity;
    }

}
