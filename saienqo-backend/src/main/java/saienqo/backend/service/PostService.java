package saienqo.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import saienqo.backend.model.Post;
import saienqo.backend.model.Project;
import saienqo.backend.model.User;
import saienqo.backend.playload.request.PostRequest;
import saienqo.backend.playload.response.PostResponse;
import saienqo.backend.repository.PostRepository;
import saienqo.backend.repository.ProjectRepository;
import saienqo.backend.repository.UserRepository;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public List<PostResponse> getPosts(Long projectId){
        List<PostResponse> listPosts=postRepository.findByProjectId(projectId).stream().map(post->{
            return new PostResponse(
                    post.getId(),
                    post.getUser().getUsername(),
                    post.getContent(),
                    post.getLikes(),
                    post.getDate()
            );
        }).collect(Collectors.toList());
        Collections.reverse(listPosts);

        return listPosts;
    }

    public List<PostResponse> savePost(PostRequest postRequest){
        Project p=projectRepository.findById(postRequest.getProjectid()).orElseThrow(()->new RuntimeException("project not found"));
        User u=userRepository.findById(postRequest.getUserid()).orElseThrow(()->new RuntimeException("user not found"));
        postRepository.save(
                new Post(p,u,postRequest.getContent())
        );
        return  getPosts(postRequest.getProjectid());
    }

    public PostResponse likePost(Long id){
        Post post=postRepository.findById(id).orElseThrow(()->new RuntimeException("Post not found "));
        post.setLikes(post.getLikes()+1);
        postRepository.save(post);
        return new PostResponse(post.getId(),post.getUser().getUsername(),post.getContent(),post.getLikes(),post.getDate());
    }

}
