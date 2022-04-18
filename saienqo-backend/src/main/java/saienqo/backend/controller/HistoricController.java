package saienqo.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import saienqo.backend.playload.response.HistoricResponse;
import saienqo.backend.service.HistoricService;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class HistoricController {

    @Autowired
    private HistoricService historicService;

    @GetMapping("/historic/project/{idProject}")
    public ResponseEntity<List<HistoricResponse>> getProjectHistoric(@PathVariable Long idProject){
        return ResponseEntity.ok().body(
                historicService.getProjectHistoric(idProject)
        );
    }
}
