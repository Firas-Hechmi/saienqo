package saienqo.backend.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import saienqo.backend.model.*;
import saienqo.backend.repository.*;

@Service
public class FileStorageService {

  @Autowired
  private FileDBRepository fileDBRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ProjectRepository projectRepository;

  @Autowired
  private ProjectDocsRepository projectDocsRepository;

  @Autowired
  private HistoricRepository historicRepository;

  @Autowired
  private EmailSenderService emailSenderService;

  public FileDB store(MultipartFile file, Long project_id, String project_docs_name, Long user_id) throws IOException {
      String fileName = StringUtils.cleanPath(file.getOriginalFilename());
      User user=userRepository.findById(user_id).orElseThrow(()->new RuntimeException("User not found"));
      Project project=projectRepository.findById(project_id).orElseThrow(()->new RuntimeException("Project not found"));
      ProjectDocs projectDocs=projectDocsRepository.findByName(project_docs_name);
      FileDB FileDB = new FileDB(fileName, file.getContentType(), file.getBytes());
      FileDB.setProject(project);
      FileDB.setUser(user);
      FileDB.setProjectDocs(projectDocs);
      historicRepository.save(new Historic(
         user,
              project,
         "Ajout du fichier "+fileName
      ));

      emailSenderService.sendEmail(project.getName(),"Nouvelle action dans le "+project.getName(),
              user.getUsername()+" a ajouté un nouveau fichier : "+FileDB.getName()+" dans le project : "+project.getName());

    return fileDBRepository.save(FileDB);
  }

  public FileDB update(String id,MultipartFile file) throws IOException{
       FileDB fileToUpdate=fileDBRepository.findById(id).orElseThrow(()->new RuntimeException("File not found"));
       Project project=fileToUpdate.getProject();
       User user=fileToUpdate.getUser();
       String oldName=fileToUpdate.getName();
       String newName=StringUtils.cleanPath(file.getOriginalFilename());
       fileToUpdate.setName(
              newName
       );
       fileToUpdate.setType(
               file.getContentType()
       );
       fileToUpdate.setData(
               file.getBytes()
       );
       fileToUpdate.setUpdateDate(LocalDateTime.now());
       historicRepository.save(new Historic(
               fileToUpdate.getUser(),
               fileToUpdate.getProject(),
               "Substituion du ficher "+oldName+" par le fichier "+newName
       ));

      emailSenderService.sendEmail(project.getName(),
              "Nouvelle action dans le "+project.getName(),
              user.getUsername()+" a substitué le fichier  "+oldName+" par le fichier "+newName+
                      " dans le projet : "+project.getName());

       return fileDBRepository.save(fileToUpdate);
  }

  public void removeProject(String id){
      FileDB file=fileDBRepository.findById(id).orElseThrow(()->new RuntimeException((" file not found")));
      Project project=file.getProject();
      String projectName=project.getName();
      User user=file.getUser();
      file.setProject(null);
      fileDBRepository.save(file);
      historicRepository.save(new Historic(
              file.getUser(),
              project,
              "Suppression du fichier "+file.getName()+" du projet "+projectName
      ));

      emailSenderService.sendEmail( projectName,"Nouvelle action dans le "+ projectName,
              user.getUsername()+" a supprimeé le fichier : "+file.getName()+" du projet : "+ projectName);
  }

  public FileDB getFile(String id) {
    return fileDBRepository.findById(id).get();
  }

  
  public Stream<FileDB> getAllFiles() {
    return fileDBRepository.findAll().stream();
  }

  public  Stream<FileDB> getProjectDocs( Long id,String name){
      return  fileDBRepository.findByProjectIdAndProjectDocsName(id,name).stream();
  }

}
