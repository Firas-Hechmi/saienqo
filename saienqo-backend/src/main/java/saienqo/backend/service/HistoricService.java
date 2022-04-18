package saienqo.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import saienqo.backend.model.Historic;
import saienqo.backend.playload.response.HistoricResponse;
import saienqo.backend.repository.HistoricRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HistoricService {

    @Autowired
    private HistoricRepository historicRepository;

    public List<HistoricResponse> getProjectHistoric(Long idProject) {
        List<HistoricResponse> projectHistoric = historicRepository.findHistoricByProjectId(idProject).stream().map(e->{
            return new HistoricResponse(
                    e.getUser().getUsername(),
                    e.getAction(),
                    e.getDate()
            );
        }).collect(Collectors.toList());

        return projectHistoric;
    }
}
