package com.example.Community.Controller;

import com.example.Community.Dto.CommentDTO;
import com.example.Community.Service.CommentService;
import com.example.Community.Service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("comment")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "https://ddo857ydmq0nf.cloudfront.net"
})
public class CommentController {
    private final CommentService commentService;
    private final PostService postService;
    @PostMapping("/save")
    public ResponseEntity save(@RequestBody CommentDTO commentDTO)//자동으로 CommentDTO로 매핑
    {
        //ResponseBody를 붙혀서 문자열을 그대로 반환하게 함
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

}
