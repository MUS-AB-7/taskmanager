package com.musab.taskmanager.service;

import com.musab.taskmanager.dto.ProjectRequest;
import com.musab.taskmanager.entity.Project;
import com.musab.taskmanager.entity.User;
import com.musab.taskmanager.repository.ProjectRepository;
import com.musab.taskmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public Project createProject(String email, ProjectRequest request) {
        User creator = userRepository.findByEmail(email).orElseThrow();

        Project project = new Project();
        project.setName(request.getName());
        project.setCreatedBy(creator);

        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}
