package saienqo.backend.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

@Entity
@Table(name = "files")
public class FileDB {
  @Id
  @GeneratedValue(generator = "uuid")
  @GenericGenerator(name = "uuid", strategy = "uuid2")
  private String id;

  private String name;

  private String type;

  @Lob
  private byte[] data;

  @ManyToOne(fetch = FetchType.LAZY)
  private AccountDocs accountDocs=null;

  @ManyToOne(fetch = FetchType.LAZY)
  private ProjectDocs projectDocs=null;

  @ManyToOne(fetch = FetchType.LAZY)
  private Project project=null;

  @ManyToOne(fetch = FetchType.LAZY)
  private User user;

  private LocalDateTime createDate;

  private LocalDateTime updateDate;

  public FileDB() {
  }

  public FileDB(String name, String type, byte[] data) {
    this.name = name;
    this.type = type;
    this.data = data;
    this.createDate=LocalDateTime.now();
  }

  public String getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public byte[] getData() {
    return data;
  }

  public void setData(byte[] data) {
    this.data = data;
  }

  public AccountDocs getAccountDocs() {
    return accountDocs;
  }

  public void setAccountDocs(AccountDocs accountDocs) {
    this.accountDocs = accountDocs;
  }

  public ProjectDocs getProjectDocs() {
    return projectDocs;
  }

  public void setProjectDocs(ProjectDocs projectDocs) {
    this.projectDocs = projectDocs;
  }

  public Project getProject() {
    return project;
  }

  public void setProject(Project project) {
    this.project = project;
  }

  public LocalDateTime getCreateDate() {
    return createDate;
  }

  public void setCreateDate(LocalDateTime createDate) {
    this.createDate = createDate;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public LocalDateTime getUpdateDate() {
    return updateDate;
  }

  public void setUpdateDate(LocalDateTime updateDate) {
    this.updateDate = updateDate;
  }
}
