package saienqo.backend.playload.response;

import java.time.LocalDateTime;

public class ResponseFile {
    private String id;
    private String name;
    private String url;
    private String type;
    private String username;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private long size;
    public ResponseFile( String id,String name, String url, String type, long size,String username
    ,LocalDateTime createDate,LocalDateTime updateDate) {
        this.id=id;
        this.name = name;
        this.url = url;
        this.type = type;
        this.size = size;
        this.username=username;
        this.createDate=createDate;
        this.updateDate=updateDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDateTime getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDateTime createDate) {
        this.createDate = createDate;
    }

    public LocalDateTime getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalDateTime updateDate) {
        this.updateDate = updateDate;
    }

    public long getSize() {
        return size;
    }
    public void setSize(long size) {
        this.size = size;

    }
}