package saienqo.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import saienqo.backend.model.ProjectDocs;

@Repository
public interface ProjectDocsRepository extends JpaRepository<ProjectDocs,Long> {
    ProjectDocs findByName(String name);
}
