package saienqo.backend.controller;

import saienqo.backend.service.ProjectDocsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import saienqo.backend.model.ProjectDocs;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class ProjectDocsController {

    @Autowired
    private ProjectDocsService projectDocsService;

    @GetMapping("/projectDocs")
    public ResponseEntity<List<ProjectDocs>> getProjectDocs(){
        return ResponseEntity.ok().body(projectDocsService.getProjectDocs());
    }
}
