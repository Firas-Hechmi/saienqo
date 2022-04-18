package saienqo.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import saienqo.backend.model.FileDB;

import java.util.List;

@Repository
public interface FileDBRepository extends JpaRepository<FileDB, String> {
     List<FileDB> findByProjectIdAndProjectDocsName(Long id, String name);
}
