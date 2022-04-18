package saienqo.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import saienqo.backend.playload.request.PostRequest;
import saienqo.backend.playload.response.PostResponse;
import saienqo.backend.service.PostService;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping("/posts/{project_id}")
    public ResponseEntity<List<PostResponse>> getPosts(@PathVariable Long project_id){
        return ResponseEntity.ok().body(postService.getPosts(project_id));
    }

    @PostMapping("/posts")
    public ResponseEntity<List<PostResponse>> savePost(@RequestBody PostRequest p){
        return ResponseEntity.ok().body(
                postService.savePost(p)
        );
    }

    @PutMapping("/like/post/{id}")
    public ResponseEntity<PostResponse> likePost(@PathVariable Long id){
        return ResponseEntity.ok().body(postService.likePost(id));
    }
}
