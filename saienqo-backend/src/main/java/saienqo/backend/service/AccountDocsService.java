package saienqo.backend.service;

import saienqo.backend.model.AccountDocs;
import saienqo.backend.repository.AccountDocsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountDocsService {

    @Autowired
    private AccountDocsRepository accountDocsRepository;

    public List<AccountDocs> getAccountDocs(){
        return accountDocsRepository.findAll();
    }
}
