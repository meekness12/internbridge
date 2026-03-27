package com.internbridge.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsResponse {
    
    private List<PlacementVelocity> placementVelocity;
    private List<SectorDistribution> sectorDistribution;
    private List<NodeStatus> nodeAwareness;
    private long totalPlacements;
    private String placementTrend;
    private double certificationRate;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PlacementVelocity {
        private String month;
        private int rate;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SectorDistribution {
        private String sector;
        private int percentage;
        private String color;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class NodeStatus {
        private String label;
        private String city;
        private String ping;
        private String status;
    }
}
