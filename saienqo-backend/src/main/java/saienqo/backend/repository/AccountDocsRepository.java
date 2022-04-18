package saienqo.backend.repository;

import saienqo.backend.model.AccountDocs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountDocsRepository extends JpaRepository<AccountDocs,Long> {
}
