package com.example.Community.Service;

import com.example.Community.Dto.CommentDTO;
import com.example.Community.Entity.CommentEntity;
import com.example.Community.Entity.PostEntity;
import com.example.Community.Repository.CommentRepository;
import com.example.Community.Repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository PostRepository;

    public Long save(CommentDTO commentDTO) {//저장할때는 Entity형식으로 변환
        /*부모 엔티티(BoardEntity)조회*/
        Optional<PostEntity> optionalPostEntity = PostRepository.findById(commentDTO.getPost_id());
        if (optionalPostEntity.isPresent()) {
            PostEntity postEntity = optionalPostEntity.get();
            CommentEntity commentEntity;
            if (commentDTO.getParentComment_id() != null) {  // 대댓글인 경우
                Optional<CommentEntity> optionalParentComment = commentRepository.findByComment_id(commentDTO.getParentComment_id());
                if (optionalParentComment.isPresent()) {
                    CommentEntity parentCommentEntity = optionalParentComment.get();
                    commentEntity = CommentEntity.toSaveEntity(commentDTO, postEntity, parentCommentEntity);
                } else {
                    return null; // 부모 댓글이 없으면 저장 실패
                }
            } else {  // 일반 댓글인 경우
                commentEntity = CommentEntity.toSaveEntity(commentDTO, postEntity, null);
            }
            return commentRepository.save(commentEntity).getComment_id();
        } else {
            return null;  // 게시글이 없는 경우 저장 실패
        }


    }

    public List<CommentDTO> findAll(Long postId) {
        PostEntity postEntity = PostRepository.findById(postId).get();
        List<CommentEntity> commentEntityList = commentRepository.findAllByPostEntityOrderByIdDesc(postEntity);

        List<CommentDTO> commentDTOList = new ArrayList<>();
        for (CommentEntity commentEntity : commentEntityList) {
            CommentDTO commentDTO = CommentDTO.toCommentDTO(commentEntity,postId);
            commentDTOList.add(commentDTO);
        }

        // 댓글-대댓글 계층 구조 만들기
        return buildCommentHierarchy(commentDTOList);
    }

    // 계층 구조를 만드는 메서드
    private List<CommentDTO> buildCommentHierarchy(List<CommentDTO> commentDTOList) {
        List<CommentDTO> result = new ArrayList<>();
        for (CommentDTO comment : commentDTOList) {
            if (comment.getParentComment_id() == null) { // 일반 댓글
                result.add(comment);
                // 대댓글 찾아서 추가
                result.addAll(findChildComments(comment, commentDTOList));
            }
        }
        return result;
    }

    // 재귀로 대댓글 찾기
    private List<CommentDTO> findChildComments(CommentDTO parent, List<CommentDTO> allComments) {
        List<CommentDTO> childList = new ArrayList<>();
        for (CommentDTO comment : allComments) {
            if (parent.getComment_id().equals(comment.getParentComment_id())) {
                childList.add(comment);
                childList.addAll(findChildComments(comment, allComments)); // 대댓글의 대댓글도 계속 탐색
            }
        }
        return childList;
    }

}
