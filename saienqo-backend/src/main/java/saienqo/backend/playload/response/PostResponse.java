package saienqo.backend.playload.response;

import java.time.LocalDateTime;

public class PostResponse {
    private Long id;
    private String username;
    private String content;
    private int likes;
    private LocalDateTime date;

    public PostResponse(){
    }
    public PostResponse(Long id,String username,String content,int likes,LocalDateTime date){
        this.id=id;
        this.content=content;
        this.username=username;
        this.likes=likes;
        this.date=date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}
