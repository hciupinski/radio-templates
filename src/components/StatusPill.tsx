import type { TemplateStatus } from "../types/radiology";

const labels: Record<TemplateStatus, string> = {
  draft: "draft",
  reviewed: "reviewed",
  deprecated: "deprecated"
};

export function StatusPill({ status }: { status: TemplateStatus }) {
  return <span className={`status-pill ${status}`}>{labels[status]}</span>;
}
