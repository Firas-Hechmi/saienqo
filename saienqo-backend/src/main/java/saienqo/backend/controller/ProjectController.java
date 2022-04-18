package saienqo.backend.controller;


import org.springframework.security.access.prepost.PreAuthorize;
import saienqo.backend.model.Project;
import saienqo.backend.playload.response.MessageResponse;
import saienqo.backend.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getProjects(){
        return ResponseEntity.ok().body(projectService.getProjects());
    }

    @DeleteMapping("/project/file/{id}")
    @PreAuthorize("hasRole('DIRECTION')")
    public ResponseEntity<MessageResponse> removeFile(@PathVariable String id)
    {

        projectService.removeFile(id);
        return ResponseEntity.ok().body(new MessageResponse("Le Fichier a été supprimé de ce projet")) ;
    }
    @GetMapping("/projects/name/{id}")
    public ResponseEntity<String> getProjectName(@PathVariable Long id){
        return ResponseEntity.ok().body(projectService.getProjectName(id));
    }
}
