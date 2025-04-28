package com.example.Community.Service;

import com.example.Community.Dto.PostDTO;
import com.example.Community.Dto.UserDTO;
import com.example.Community.Entity.PostEntity;
import com.example.Community.Entity.UserEntity;
import com.example.Community.Repository.CommentRepository;
import com.example.Community.Repository.PostRepository;
import com.example.Community.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

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
}
