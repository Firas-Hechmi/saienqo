package saienqo.backend.service;

import saienqo.backend.model.Project;
import saienqo.backend.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private FileStorageService fileStorageService;

    public List<Project> getProjects(){
        return projectRepository.findAll();
    }

    public String getProjectName(Long id){
        Project project=projectRepository.findById(id).orElseThrow(()->new RuntimeException("project not found"));

        return project.getName();
    }

    public void removeFile(String id){
        fileStorageService.removeProject(id);
    }
}
