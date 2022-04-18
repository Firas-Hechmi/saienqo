package saienqo.backend.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="historic")
public class Historic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade =CascadeType.ALL)
    @JoinColumn(name = "project_id",referencedColumnName = "id")
    private Project project;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String action;

    private LocalDateTime date;

    public Historic(){}

    public Historic(User user,Project project,String action){
        this.user=user;
        this.action=action;
        this.date=LocalDateTime.now();
        this.project=project;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
