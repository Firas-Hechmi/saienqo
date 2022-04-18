package saienqo.backend.playload.response;

import java.time.LocalDateTime;

public class HistoricResponse {

    private String username;

    private String action;

    private LocalDateTime date;

    public HistoricResponse(){}

    public HistoricResponse(String username,String action,LocalDateTime date){
        this.username=username;
        this.action=action;
        this.date=date;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}
