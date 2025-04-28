package com.example.Community.Controller;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

import com.example.Community.Dto.PostDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Community.Dto.CommentDTO;
import com.example.Community.Service.CommentService;
import com.example.Community.Service.PostService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("comment")
@CrossOrigin(origins = {"https://ddo857ydmq0nf.cloudfront.net",
                        "http://localhost:3000"
        ,"https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com"
})
public class CommentController {
    private final CommentService commentService;
    private final PostService postService;
    @PostMapping("/save")
    public ResponseEntity save(@RequestBody CommentDTO commentDTO)//자동으로 CommentDTO로 매핑
    {
        System.out.println(commentDTO.getNickName());
        postService.updateCommentCounts(commentDTO.getPost_id());
        Long saveResult=commentService.save(commentDTO);
        if(saveResult !=null)
        {
            //작성 성공하면 댓글목록을 가져와서 리턴
            //댓글목록:해당 게시글의 댓글 전체
            List<CommentDTO> commentDTOList=commentService.findAll(commentDTO.getPost_id());
            return new ResponseEntity<>(commentDTOList, HttpStatus.OK);//ResponseEntity는 클라이언트로 응답을 보낸다.
        }
        else{
            return new ResponseEntity<>("해당 게시글이 존재하지 않습니다.",HttpStatus.NOT_FOUND);
        }

    }
    @GetMapping("/myComment")
    public ResponseEntity<List<PostDTO>> findMyPost(@RequestParam("value") String value) {
        String name = URLDecoder.decode(value, StandardCharsets.UTF_8);
        List<PostDTO> posts = commentService.findByMyComment(name);
        return ResponseEntity.ok(posts);
    }

}
