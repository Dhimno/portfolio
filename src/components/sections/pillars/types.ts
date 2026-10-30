import React from "react";

export type PillarMode = "telemetry" | "arsenal";

export interface PillarData {
  id: string;
  code: string;
  tag: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  tools?: string[];
  statusText?: string;
}

export interface RetroChassisProps {
  code: string;
  statusText?: string;
  activeTab: PillarMode;
  onTabChange: (tab: PillarMode) => void;
  children: React.ReactNode;
  className?: string;
  headerSlot?: React.ReactNode;
}

export interface PillarCardProps {
  pillar: PillarData;
  telemetryContent?: React.ReactNode;
  arsenalContent?: React.ReactNode;
  defaultTab?: PillarMode;
  className?: string;
}
