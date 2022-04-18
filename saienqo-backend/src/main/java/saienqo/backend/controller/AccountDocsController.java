package saienqo.backend.controller;

import saienqo.backend.model.AccountDocs;
import saienqo.backend.service.AccountDocsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class AccountDocsController {

    @Autowired
    private AccountDocsService accountDocsService;

    @GetMapping("/accountDocs")
    public ResponseEntity<List<AccountDocs>> getAccountDocs()
    {
        return ResponseEntity.ok().body(accountDocsService.getAccountDocs());
    }
}
