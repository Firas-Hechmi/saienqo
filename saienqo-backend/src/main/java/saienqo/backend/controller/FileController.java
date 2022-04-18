package saienqo.backend.controller;

import java.util.List;
import java.util.stream.Collectors;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import saienqo.backend.playload.response.MessageResponse;
import saienqo.backend.playload.response.ResponseFile;
import saienqo.backend.service.FileStorageService;

import saienqo.backend.model.FileDB;

@Controller
@CrossOrigin("*")
public class FileController {

  @Autowired
  private FileStorageService storageService;


  @PostMapping("/upload")
  @PreAuthorize("hasAnyRole('DIRECTION','BUREAU','ENTREPRISES')")
  public ResponseEntity<MessageResponse> uploadFile(@RequestParam("file") MultipartFile file,
   @RequestParam("project_id") Long project_id,@RequestParam("project_docs_name") String project_docs_name,
   @RequestParam("user_id") Long user_id

   ) {
    String message = "";
    try {
      storageService.store(file,project_id,project_docs_name,user_id);

      message = "Document a été ajouté avec succès : " + file.getOriginalFilename();
      return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
    } catch (Exception e) {
      message = "Could not upload the file: " + file.getOriginalFilename() + "!";
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
    }
  }


  @PutMapping("/update/{id}")
  @PreAuthorize("hasRole('DIRECTION')")
  public ResponseEntity<MessageResponse> updateFile(@PathVariable String id,@RequestParam("file") MultipartFile file) {
    String message = "";
    try {
      storageService.update(id,file);

      message = "Document a été modifié avec succès ";
      return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
    } catch (Exception e) {
      message = "Modification du document a échoué ! ";
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
    }
  }

  @GetMapping("/files")
  public ResponseEntity<List<ResponseFile>> getListFiles() {
    List<ResponseFile> files = storageService.getAllFiles().map(dbFile -> {
      String fileDownloadUri = ServletUriComponentsBuilder
          .fromCurrentContextPath()
          .path("/files/")
          .path(dbFile.getId())
          .toUriString();

      return new ResponseFile(
              dbFile.getId(),
          dbFile.getName(),
          fileDownloadUri,
          dbFile.getType(),
          dbFile.getData().length,
              dbFile.getUser().getUsername(),
              dbFile.getCreateDate(),
              dbFile.getUpdateDate()
              );
    }).collect(Collectors.toList());

    return ResponseEntity.status(HttpStatus.OK).body(files);
  }

  @GetMapping("/files/projectDocs/{projectName}")
  @PreAuthorize("hasAnyRole('DIRECTION','BUREAU','ENTREPRISES','CLIENT_DIRECT','CLIENT_INDIRECT')")

  public ResponseEntity<List<ResponseFile>> getFilesByProjectAndCategory(@RequestParam Long project_id,String project_docs_name){
    List<ResponseFile> files = storageService.getProjectDocs(project_id, project_docs_name).map(dbFile -> {
      String fileDownloadUri = ServletUriComponentsBuilder
              .fromCurrentContextPath()
              .path("/files/")
              .path(dbFile.getId())
              .toUriString();

      return new ResponseFile(
              dbFile.getId(),
              dbFile.getName(),
              fileDownloadUri,
              dbFile.getType(),
              dbFile.getData().length,
              dbFile.getUser().getUsername(),
              dbFile.getCreateDate(),
              dbFile.getUpdateDate()
      );
    }).collect(Collectors.toList());

    return ResponseEntity.status(HttpStatus.OK).body(files);
  }

  @GetMapping("/files/{id}")
  public ResponseEntity<byte[]> getFile(@PathVariable String id) {
    FileDB fileDB = storageService.getFile(id);

    return ResponseEntity.ok()
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
        .body(fileDB.getData())
            ;

  }


}
