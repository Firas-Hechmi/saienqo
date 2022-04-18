package saienqo.backend.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import saienqo.backend.model.User;
import saienqo.backend.repository.RoleRepository;
import saienqo.backend.repository.UserRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class EmailSenderService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    public void sendEmail(String projectName,String subject,String body){
        Set roles=new HashSet<>();
        roles.add(
                roleRepository.findByName("Role_"+projectName)
        );
        roles.add(
                roleRepository.findByName("ROLE_DIRECTION")
        );
        roles.add(
                roleRepository.findByName("ROLE_BUREAU")
        );
        List<User> users=userRepository.findAllByRolesIn(roles);

        SimpleMailMessage message=new SimpleMailMessage();
        message.setFrom("firashechmi4@gmail.com");
        message.setSubject(subject);
        message.setText(body);

        for(User user : users)
        {
            message.setTo(user.getEmail());
            mailSender.send(message);
        }


    }
}
