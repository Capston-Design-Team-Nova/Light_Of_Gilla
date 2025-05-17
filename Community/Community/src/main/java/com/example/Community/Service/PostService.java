package com.example.Community.Service;

import com.example.Community.Dto.LikeDTO;
import com.example.Community.Dto.PostDTO;
import com.example.Community.Dto.UserDTO;
import com.example.Community.Entity.CommentEntity;
import com.example.Community.Entity.LikeEntity;
import com.example.Community.Entity.PostEntity;
import com.example.Community.Entity.UserEntity;
import com.example.Community.Repository.CommentRepository;
import com.example.Community.Repository.LikeRepository;
import com.example.Community.Repository.PostRepository;
import com.example.Community.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;

    public void save(PostDTO postDTO){
//       Optional<CategoryEntity>OptionalcategoryEntity=categoryRepository.findById(postDTO.getCategory_Id());
//       if(OptionalcategoryEntity.isPresent()){
//           CategoryEntity categoryEntity=OptionalcategoryEntity.get();
//           PostEntity postEntity=PostEntity.toSaveEntity(postDTO,categoryEntity);
//           postRepository.save(postEntity);
//
//       }

        PostEntity postEntity=PostEntity.toSaveEntity(postDTO);
        postRepository.save(postEntity);
    }
    @Transactional//자식entity를 lazy loding할경우 필요
    public List<PostDTO> findAll(){
        List<PostEntity> PostEntityList = postRepository.findAll();
        List<PostDTO> PostDTOList=new ArrayList<>();
        for(PostEntity postEntity:PostEntityList){
            PostDTOList.add(PostDTO.toPostDTO(postEntity));
        }

        Collections.reverse(PostDTOList);
        return PostDTOList;
    }

    public List<PostDTO> findByUserId(String user_id){
        List<PostEntity> ListUserIdPostEntityList=postRepository.findAllByUserid(user_id);
        List<PostDTO> PostDTOList=new ArrayList<>();
        for(PostEntity postEntity:ListUserIdPostEntityList){
            PostDTOList.add(PostDTO.toPostDTO(postEntity));
        }
        return PostDTOList;
    }
    @Transactional
    public void updateHits(Long id){
        postRepository.updateHits(id);
    }
    @Transactional
    public void updateCommentCounts(Long id){
        postRepository.updateComments(id);
    }
    @Transactional
    public void updatelikes(Long id){
        postRepository.updateLikes(id);
    }
    public PostDTO findByPostId(Long post_id){
        Optional<PostEntity> optionalPostEntity=postRepository.findById(post_id);
        if(optionalPostEntity.isPresent()){
            PostEntity postEntity=optionalPostEntity.get();
            PostDTO postDTO=PostDTO.toPostDTO(postEntity);
            return postDTO;
        }
           return null;
    }
    public PostDTO update(PostDTO postDTO) {
        PostEntity postEntity = PostEntity.toUpdateEntity(postDTO);
        postRepository.save(postEntity);//기존 id가 있으면 update실행
        return findByPostId(postDTO.getPost_Id());
    }

    public List<PostDTO> findByCategory(String category) {
        List<PostEntity> PostEntityList = postRepository.findAllByCategory(category);
        List<PostDTO> PostDTOList=new ArrayList<>();
        for(PostEntity postEntity:PostEntityList){
            PostDTOList.add(PostDTO.toPostDTO(postEntity));
        }
        return PostDTOList;
    }

    public List<PostDTO> findTitleOrContent(String decodedSearch) {
        List<PostEntity> PostEntityList = postRepository.findByTitleOrContentContaining(decodedSearch);
        List<PostDTO> PostDTOList=new ArrayList<>();
        for(PostEntity postEntity:PostEntityList){
            PostDTOList.add(PostDTO.toPostDTO(postEntity));
        }
        return PostDTOList;
    }

    public void saveSign(UserDTO userDTO) {
        UserEntity userEntity=UserEntity.toSaveUserEntity(userDTO);
        userRepository.save(userEntity);
    }
    public String findNickNameByEmail(String value){
        return userRepository.findNickNameByEmailOrUserId(value).orElse("닉네임 없음");

    }

    public List<PostDTO> findByMyPost(String name) {
        List<PostEntity> PostEntityList = postRepository.findAllByNickName(name);
        List<PostDTO> PostDTOList=new ArrayList<>();
        for(PostEntity postEntity:PostEntityList){
            PostDTOList.add(PostDTO.toPostDTO(postEntity));
        }
        Collections.reverse(PostDTOList);
        return PostDTOList;
    }
    public boolean toggleLike(LikeDTO likeDTO) {
        Optional<LikeEntity> existing = likeRepository.findByPostidAndNickName(
                likeDTO.getPost_id(), likeDTO.getNickName()
        );

        if (existing.isPresent()) {
            likeRepository.delete(existing.get());
            postRepository.decreaseLikeCount(likeDTO.getPost_id()); // 좋아요 -1
            return false; // 좋아요 취소됨
        } else {
            likeRepository.save(LikeEntity.toSaveLikeEntity(likeDTO));
            postRepository.increaseLikeCount(likeDTO.getPost_id()); // 좋아요 +1
            return true; // 좋아요 추가됨
        }
    }


    public List<PostDTO> findByMyLike(String name) {
        List<LikeEntity> LikeEntities = likeRepository.findAllByNickName(name);

        Set<Long> postIds = LikeEntities.stream()
                .map(likeEntity -> likeEntity.getPostid())
                .collect(Collectors.toSet());

        List<PostDTO> postDTOList = new ArrayList<>();
        for (Long postId : postIds) {
            Optional<PostEntity> postEntityOptional = postRepository.findById(postId);
            if (postEntityOptional.isPresent()) {
                postDTOList.add(PostDTO.toPostDTO(postEntityOptional.get()));
            }
        }
        Collections.reverse(postDTOList);

        return postDTOList;
    }
    public void deletePostById(Long post_id) {
        Optional<PostEntity> optionalPostEntity=postRepository.findById(post_id);
        postRepository.delete(optionalPostEntity.get());

    }
}
