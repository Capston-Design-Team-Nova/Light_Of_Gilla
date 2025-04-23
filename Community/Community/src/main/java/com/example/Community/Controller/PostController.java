package com.example.Community.Controller;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.Community.Dto.UserDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
        "http:localhost:3000"
,"https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com"})
public class PostController {
    private final PostService postService;
    private final CommentService commentService;
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
    @GetMapping("/sign")
    public void SaveSign(@RequestBody UserDTO userDTO) {
        postService.saveSign(userDTO);
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
    @GetMapping("/update/{post_id}")
    public ResponseEntity UpdateForm(@PathVariable("post_id") Long post_id) {
        PostDTO postDTO= postService.findByPostId(post_id);
        /*댓글 목록 가져오기*/
        return ResponseEntity.ok(postDTO);
    }
    @Transactional
    @PostMapping("/update")
    public ResponseEntity Update(@ModelAttribute PostDTO post) {
        PostDTO postDTO=postService.update(post);
        return ResponseEntity.ok(postDTO);
    }


}
