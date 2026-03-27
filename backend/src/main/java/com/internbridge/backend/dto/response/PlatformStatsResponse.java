package com.internbridge.backend.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlatformStatsResponse {
    private long totalUsers;
    private long totalPartners;
    private String systemUptime;
    private int securityAlerts;
    private int resourceUsage;
    private String userTrend;
    private String partnerTrend;
}
