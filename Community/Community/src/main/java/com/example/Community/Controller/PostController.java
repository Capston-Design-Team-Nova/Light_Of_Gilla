package com.example.Community.Controller;

import com.example.Community.Dto.CommentDTO;
import com.example.Community.Dto.PostDTO;
import com.example.Community.Service.CommentService;
import com.example.Community.Service.PostService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/post")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {
    private final PostService postService;
    private final CommentService commentService;
    @PostMapping("/save")//post형식으로 받음
    public void save(@RequestBody PostDTO postDTO) throws IOException {
        postService.save(postDTO);
        System.out.println(postDTO.getCategory_name());



    }
    @GetMapping("/")
    public ResponseEntity<List<PostDTO>> findAll(){
        List<PostDTO> postDTOList = postService.findAll();
        return ResponseEntity.ok(postDTOList);
    }
    @PostMapping("/like")
    public void like(@RequestParam("post_id") Long post_id) {
        postService.updatelikes(post_id);
    }

    @GetMapping("/search/{user_id}")
    public ResponseEntity findBySearchUserId(@PathVariable String user_id) {//@PathVariable는 {id}값을 매개변수로 바인딩 해준다.
        List<PostDTO> postDTOUserIdList= postService.findByUserId(user_id);
        return ResponseEntity.ok(postDTOUserIdList);
    }
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
