package saienqo.backend.playload.request;

import javax.validation.constraints.NotBlank;

public class PostRequest {

    @NotBlank
    private Long projectid;

    @NotBlank
    private Long userid;

    @NotBlank
    private String content;

    public Long getProjectid() {
        return projectid;
    }

    public void setProjectid(Long projectid) {
        this.projectid = projectid;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
