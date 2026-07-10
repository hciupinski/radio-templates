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
    organ: organ.label
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
                  const defaultPath = (() => {
                    const examType = modality.examTypes[0];
                    const bodySystem = examType?.bodySystems[0];
                    const organ = bodySystem?.organs[0];
                    return examType && bodySystem && organ
                      ? {
                          modality: modality.label,
                          examType: examType.label,
                          bodySystem: bodySystem.label,
                          organ: organ.label
                        }
                      : null;
                  })();

                return (
                  <button
                    key={modality.label}
                      className={active ? "modality-chip active" : "modality-chip"}
                      type="button"
                      onClick={() => {
                        if (defaultPath) {
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
              {anatomyTree
                .filter((modality) => modality.label === activePath.modality)
                .map((modality) =>
                  modality.examTypes.map((examType) => (
                    <div className="tree-exam enhanced" key={examType.label}>
                      <button
                        className="tree-exam-heading tree-trigger"
                        type="button"
                        onClick={() => {
                          const nextPath = firstPathForExamType(modality.label, examType);
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
                                onClick={() => {
                                  const nextPath = firstPathForBodySystem(
                                    modality.label,
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
                                      modality: modality.label,
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
                  ))
                )}
            </section>
          </div>
        </>
      )}
    </aside>
  );
}
