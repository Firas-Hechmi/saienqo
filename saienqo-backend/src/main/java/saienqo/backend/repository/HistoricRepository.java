package saienqo.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import saienqo.backend.model.Historic;

import java.util.List;

@Repository
public interface HistoricRepository extends JpaRepository<Historic,Long> {
    List<Historic> findHistoricByProjectId(Long id);
}
