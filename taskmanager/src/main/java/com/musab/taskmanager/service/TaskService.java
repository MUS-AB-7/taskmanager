package com.musab.taskmanager.service;

import com.musab.taskmanager.dto.TaskRequest;
import com.musab.taskmanager.entity.Status;
import com.musab.taskmanager.entity.Task;
import com.musab.taskmanager.repository.ProjectRepository;
import com.musab.taskmanager.repository.TaskRepository;
import com.musab.taskmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    public Task createTask(TaskRequest request) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setDeadline(request.getDeadline());
        task.setStatus(Status.TODO);
        task.setAssignedTo(userRepository.findById(request.getUserId()).orElseThrow());
        task.setProject(projectRepository.findById(request.getProjectId()).orElseThrow());

        return taskRepository.save(task);
    }

    public Task updateStatus(Long id, Status status) {
        Task task = taskRepository.findById(id).orElseThrow();
        task.setStatus(status);

        return taskRepository.save(task);
    }

    public List<Task> getByProject(Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }

    public List<Task> getByUser(Long userId) {
        return taskRepository.findByAssignedToId(userId);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
}
