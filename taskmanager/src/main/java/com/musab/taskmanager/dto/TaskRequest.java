package com.musab.taskmanager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class TaskRequest {

    @NotBlank(message = "Task title is required")
    private String title;

    private String description;

    private LocalDate deadline;

    @NotNull(message = "Assigned user is required")
    private Long userId;

    @NotNull(message = "Project is required")
    private Long projectId;
}
