package com.internbridge.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "logbooks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Logbook {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "placement_id", nullable = false)
    private Placement placement;

    @Column(name = "record_date", nullable = false)
    private LocalDate recordDate;

    @Column(name = "hours_worked", nullable = false)
    private Double hoursWorked;

    @Column(name = "tasks_completed", columnDefinition = "TEXT")
    private String tasksCompleted;

    @Enumerated(EnumType.STRING)
    @Column(name = "company_status", nullable = false)
    @Builder.Default
    private LogbookStatus companyStatus = LogbookStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(name = "lecturer_status", nullable = false)
    @Builder.Default
    private LogbookStatus lecturerStatus = LogbookStatus.PENDING;
}
