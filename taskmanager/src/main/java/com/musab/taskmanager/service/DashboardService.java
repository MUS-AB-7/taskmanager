package com.musab.taskmanager.service;

import com.musab.taskmanager.dto.DashboardResponse;
import com.musab.taskmanager.entity.Status;
import com.musab.taskmanager.entity.Task;
import com.musab.taskmanager.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final TaskRepository taskRepository;

    public DashboardResponse getDashboard() {
        List<Task> tasks = taskRepository.findAll();

        long total = tasks.size();
        long completed = tasks.stream().filter(task -> task.getStatus() == Status.DONE).count();
        long pending = tasks.stream().filter(task -> task.getStatus() != Status.DONE).count();
        long overdue = tasks.stream()
                .filter(task -> task.getDeadline() != null
                        && task.getDeadline().isBefore(LocalDate.now())
                        && task.getStatus() != Status.DONE)
                .count();

        return new DashboardResponse(total, completed, pending, overdue);
    }
}
