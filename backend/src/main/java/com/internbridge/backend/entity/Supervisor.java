package com.internbridge.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "supervisors")
@PrimaryKeyJoinColumn(name = "user_id")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Supervisor extends User {

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "staff_id", unique = true)
    private String staffId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_admin_id")
    private SchoolAdmin schoolAdmin;
}
