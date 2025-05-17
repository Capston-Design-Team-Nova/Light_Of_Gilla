package com.example.Community.Controller;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.Community.Dto.LikeDTO;
import com.example.Community.Dto.UserDTO;
import com.example.Community.Repository.LikeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Community.Dto.CommentDTO;
import com.example.Community.Dto.PostDTO;
import com.example.Community.Service.CommentService;
import com.example.Community.Service.PostService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/post")
@CrossOrigin(origins = {"https://ddo857ydmq0nf.cloudfront.net",
        "http://localhost:3000"
,"https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com"})
public class PostController {
    private final PostService postService;
    private final CommentService commentService;
    private final LikeRepository likeRepository;
    @PostMapping("/save")//post형식으로 받음
    public void save(@RequestBody PostDTO postDTO) throws IOException {
        postService.save(postDTO);


    }
    @GetMapping("/category/{category}")
    public ResponseEntity<List<PostDTO>> findCategory(@PathVariable("category") String category) {
        // URL 디코딩
        String decodedCategory = URLDecoder.decode(category, StandardCharsets.UTF_8);

        // 디코딩된 카테고리로 데이터 조회
        List<PostDTO> posts = postService.findByCategory(decodedCategory);

        // 결과 반환
        return ResponseEntity.ok(posts);
    }
    @PostMapping("/signup")
    public void SaveSign(@RequestBody UserDTO userDTO) {
        System.out.println(userDTO.getUserid());
        System.out.println(userDTO.getNickName());
        System.out.println(userDTO.getEmail());
        postService.saveSign(userDTO);
    }

    @GetMapping("/getNickName")
    public ResponseEntity<String> getNickName(@RequestParam("value") String nickName) {
        String Nick = postService.findNickNameByEmail(nickName);
        return ResponseEntity.ok(Nick);
    }

    @GetMapping("/search/{searchString}")
    public ResponseEntity<List<PostDTO>> findSearchTitleOrContent(@PathVariable("searchString") String search) {

        String decodedSearch = URLDecoder.decode(search, StandardCharsets.UTF_8);

        List<PostDTO> posts = postService.findTitleOrContent(decodedSearch);

        return ResponseEntity.ok(posts);
    }
    @GetMapping("/view")
    public ResponseEntity<List<PostDTO>> findAll(){
        List<PostDTO> postDTOList = postService.findAll();
        return ResponseEntity.ok(postDTOList);
    }
    @PostMapping("/like")
    public void like(@RequestParam("post_id") Long post_id) {
        postService.updatelikes(post_id);
    }

//    @GetMapping("/search/{user_id}")
//    public ResponseEntity findBySearchUserId(@PathVariable String user_id) {//@PathVariable는 {id}값을 매개변수로 바인딩 해준다.
//        List<PostDTO> postDTOUserIdList= postService.findByUserId(user_id);
//        return ResponseEntity.ok(postDTOUserIdList);
//    }
    @GetMapping("/{post_id}")
    public ResponseEntity findById(@PathVariable("post_id") Long post_id) {//@PathVariable는 {id}값을 매개변수로 바인딩 해준다.
        postService.updateHits(post_id);
        PostDTO postDTO= postService.findByPostId(post_id);
        List<CommentDTO> commentDTOList=commentService.findAll(post_id);
        Map<String, Object> response = new HashMap<>();
        response.put("post", postDTO);
        response.put("comments", commentDTOList);

        return ResponseEntity.ok(response);
    }
    @PostMapping("/update")
    public void UpdateForm(@RequestBody PostDTO postDTO) {
        postService.update(postDTO);
    }
    @GetMapping("/myPost")
    public ResponseEntity<List<PostDTO>> findMyPost(@RequestParam("value") String value) {
        String name = URLDecoder.decode(value,StandardCharsets.UTF_8);
        List<PostDTO> posts = postService.findByMyPost(name);
        return ResponseEntity.ok(posts);
    }
    @PostMapping("/savelike")
    public ResponseEntity<String> saveLike(@RequestBody LikeDTO likeDTO) {
        boolean saved = postService.likesave(likeDTO);

        if (!saved) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 좋아요 했습니다.");
        }

        return ResponseEntity.ok("좋아요 저장 완료");

    }
    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable Long postId) {
        try {
            postService.deletePostById(postId);  // 서비스에서 삭제 로직 수행

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("삭제 실패");
        }
        return null;
    }
    @GetMapping("/mylike")
    public ResponseEntity<List<PostDTO>> findMyLike(@RequestParam("value") String value) {
        String name = URLDecoder.decode(value,StandardCharsets.UTF_8);
        List<PostDTO> posts = postService.findByMyLike(name);
        return ResponseEntity.ok(posts);
    }
    @GetMapping("/hasliked")
    public boolean hasLiked(@RequestParam Long post_id, @RequestParam String nickName) {
        return likeRepository.existsByPostidAndNickName(post_id, nickName);
    }
}
