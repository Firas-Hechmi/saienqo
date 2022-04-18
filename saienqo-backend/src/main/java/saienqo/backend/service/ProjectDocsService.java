package saienqo.backend.service;

import saienqo.backend.model.ProjectDocs;
import saienqo.backend.repository.ProjectDocsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectDocsService {

    @Autowired
    private ProjectDocsRepository projectDocsRepository;

    public List<ProjectDocs> getProjectDocs(){
        return projectDocsRepository.findAll();
    }
}
