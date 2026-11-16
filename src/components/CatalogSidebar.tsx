import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  FolderOpen,
  Layers3,
  Stethoscope
} from "lucide-react";
import type { AnatomyTreeModality, CatalogGroupSummary, CatalogPath, CatalogViewMode } from "../types/radiology";

type CatalogSidebarProps = {
  viewMode: CatalogViewMode;
  anatomyTree: AnatomyTreeModality[];
  conditionGroups: CatalogGroupSummary[];
  activePath: CatalogPath;
  activeConditionGroupId: string;
  onSelectPath: (path: CatalogPath) => void;
  onSelectConditionGroup: (groupId: string) => void;
};

function isActivePath(activePath: CatalogPath, candidate: CatalogPath): boolean {
  return (
    activePath.modality === candidate.modality &&
    activePath.examType === candidate.examType &&
    activePath.bodySystem === candidate.bodySystem &&
    activePath.organ === candidate.organ
  );
}

function firstPathForExamType(
  modalityLabel: string,
  examType: AnatomyTreeModality["examTypes"][number]
): CatalogPath | null {
  const bodySystem = examType.bodySystems[0];
  const organ = bodySystem?.organs[0];

  if (!bodySystem || !organ) {
    return null;
  }

  return {
    modality: modalityLabel,
    examType: examType.label,
    bodySystem: bodySystem.label,
    organ: organ.label
  };
}

function firstPathForBodySystem(
  modalityLabel: string,
  examTypeLabel: string,
  bodySystem: AnatomyTreeModality["examTypes"][number]["bodySystems"][number]
): CatalogPath | null {
  const organ = bodySystem.organs[0];

  if (!organ) {
    return null;
  }

  return {
    modality: modalityLabel,
    examType: examTypeLabel,
    bodySystem: bodySystem.label,
    // A multi-organ system stays expanded so the user can choose the organ first.
    organ: bodySystem.organs.length === 1 ? organ.label : ""
  };
}

export function CatalogSidebar({
  viewMode,
  anatomyTree,
  conditionGroups,
  activePath,
  activeConditionGroupId,
  onSelectPath,
  onSelectConditionGroup
}: CatalogSidebarProps) {
  const [groupOverride, setGroupOverride] = useState<{ path: CatalogPath; groupId: string | null } | null>(null);
  const selectedModality = anatomyTree.find((modality) => modality.label === activePath.modality);
  const activeGroup = selectedModality?.examTypeGroups.find((group) =>
    group.examTypes.some((examType) => examType.label === activePath.examType)
  );
  const openGroupId = groupOverride?.path === activePath
    ? groupOverride.groupId
    : activeGroup?.id;
  const groupedExamLabels = new Set(
    selectedModality?.examTypeGroups.flatMap((group) => group.examTypes.map((examType) => examType.label))
  );

  function renderExamType(modalityLabel: string, examType: AnatomyTreeModality["examTypes"][number]) {
    return (
      <div className="tree-exam enhanced" key={examType.label}>
        <button
          className="tree-exam-heading tree-trigger"
          type="button"
          aria-expanded={examType.label === activePath.examType}
          onClick={() => {
            const nextPath = firstPathForExamType(modalityLabel, examType);
            if (nextPath) {
              onSelectPath(nextPath);
            }
          }}
        >
          <span>
            {examType.label === activePath.examType ? (
              <ChevronDown size={14} aria-hidden="true" />
            ) : (
              <ChevronRight size={14} aria-hidden="true" />
            )}
            {examType.label}
          </span>
          <strong className="count-badge">{examType.count}</strong>
        </button>
        {examType.label === activePath.examType ? (
          <div className="tree-system-list">
            {examType.bodySystems.map((bodySystem) => (
              <div className="tree-system enhanced" key={bodySystem.label}>
                <button
                  className="tree-system-heading tree-trigger"
                  type="button"
                  aria-expanded={bodySystem.label === activePath.bodySystem}
                  onClick={() => {
                    const nextPath = firstPathForBodySystem(
                      modalityLabel,
                      examType.label,
                      bodySystem
                    );
                    if (nextPath) {
                      onSelectPath(nextPath);
                    }
                  }}
                >
                  <span className={bodySystem.label === activePath.bodySystem ? "active" : ""}>
                    {bodySystem.label === activePath.bodySystem ? (
                      <ChevronDown size={14} aria-hidden="true" />
                    ) : (
                      <ChevronRight size={14} aria-hidden="true" />
                    )}
                    {bodySystem.label}
                  </span>
                  <strong className="count-badge">{bodySystem.count}</strong>
                </button>
                {bodySystem.label === activePath.bodySystem ? (
                  <div className="tree-organ-list enhanced">
                    {bodySystem.organs.map((organ) => {
                      const nextPath = {
                        modality: modalityLabel,
                        examType: examType.label,
                        bodySystem: bodySystem.label,
                        organ: organ.label
                      };
                      return (
                        <button
                          key={`${examType.label}-${bodySystem.label}-${organ.label}`}
                          className={
                            isActivePath(activePath, nextPath)
                              ? "tree-organ-button active"
                              : "tree-organ-button"
                          }
                          type="button"
                          onClick={() => onSelectPath(nextPath)}
                        >
                          <span>
                            <Stethoscope size={13} aria-hidden="true" />
                            {organ.label}
                          </span>
                          <strong className="count-badge">{organ.count}</strong>
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <aside className="catalog-sidebar" aria-label="Nawigacja katalogu">
      {viewMode === "conditions" ? (
        <div className="sidebar-scroll sidebar-list-scroll">
          <section className="tree-panel tree-list-panel tree-panel-root">
            <div className="tree-panel-label">
              <Layers3 size={14} aria-hidden="true" />
              <span>Jednostki chorobowe</span>
            </div>
            <div className="condition-list lightweight">
              {conditionGroups.map((group) => (
                <button
                  key={group.id}
                  className={
                    group.id === activeConditionGroupId
                      ? "condition-button active"
                      : "condition-button"
                  }
                  type="button"
                  onClick={() => onSelectConditionGroup(group.id)}
                >
                  <span className="condition-copy">
                    <span className="condition-label">{group.label}</span>
                    <span className="condition-meta">{group.modalities.join(" · ")}</span>
                  </span>
                  <strong className="count-badge">{group.count}</strong>
                </button>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <>
          <div className="sidebar-static sidebar-static-root">
            <section className="tree-panel tree-panel-fixed tree-panel-root">
              <div className="tree-panel-label">
                <Layers3 size={14} aria-hidden="true" />
                <span>Modalność</span>
              </div>
              <div className="modality-chip-row">
                {anatomyTree.map((modality) => {
                  const active = modality.label === activePath.modality;
                  const examType = modality.examTypeGroups[0]?.examTypes[0] ?? modality.examTypes[0];
                  const defaultPath = examType ? firstPathForExamType(modality.label, examType) : null;

                  return (
                    <button
                      key={modality.label}
                      className={active ? "modality-chip active" : "modality-chip"}
                      type="button"
                      onClick={() => {
                        if (defaultPath) {
                          setGroupOverride(
                            modality.examTypeGroups.length ? { path: defaultPath, groupId: null } : null
                          );
                          onSelectPath(defaultPath);
                        }
                      }}
                    >
                      <span>{modality.label}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="sidebar-scroll sidebar-list-scroll anatomy-scroll">
            <section className="tree-panel tree-list-panel tree-panel-root">
              <div className="tree-panel-label">
                <FolderOpen size={14} aria-hidden="true" />
                <span>Badanie</span>
              </div>
              {selectedModality?.examTypeGroups.map((group) => {
                const isOpen = group.id === openGroupId;
                return (
                  <div className="tree-exam-group" key={group.id}>
                    <button
                      className="tree-exam-group-heading tree-trigger"
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setGroupOverride({ path: activePath, groupId: isOpen ? null : group.id })}
                    >
                      <span className={isOpen ? "active" : undefined}>
                        {isOpen ? <ChevronDown size={14} aria-hidden="true" /> : <ChevronRight size={14} aria-hidden="true" />}
                        {group.label}
                      </span>
                      <strong className="count-badge">{group.count}</strong>
                    </button>
                    {isOpen ? (
                      <div className="tree-exam-group-list">
                        {group.examTypes.map((examType) => renderExamType(selectedModality.label, examType))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
              {selectedModality?.examTypes
                .filter((examType) => !groupedExamLabels.has(examType.label))
                .map((examType) => renderExamType(selectedModality.label, examType))}
            </section>
          </div>
        </>
      )}
    </aside>
  );
}
