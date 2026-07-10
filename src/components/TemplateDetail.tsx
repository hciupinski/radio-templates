import {
  ArrowRight,
  Bone,
  ChevronLeft,
  Clipboard,
  Copy,
  Edit3,
  ExternalLink,
  FileText,
  Info,
  ListChecks,
  Pin,
  PinOff,
  Radio,
  ScanLine,
  Stethoscope
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { RadiologyTemplate, RelatedStudyOption, Source } from "../types/radiology";
import { ImageGallery } from "./ImageGallery";
import { StatusPill } from "./StatusPill";

type TemplateDetailTab = "preview" | "content" | "notes" | "sources";

type TemplateDetailProps = {
  template?: RadiologyTemplate;
  sourceMap: Map<string, Source>;
  breadcrumb?: string;
  pinned?: boolean;
  relatedStudies: RelatedStudyOption[];
  onSelectRelatedStudy?: (option: RelatedStudyOption) => void;
  onTogglePinned?: (id: string) => void;
  onBackToList?: () => void;
};

const tabLabels: Record<TemplateDetailTab, string> = {
  preview: "Podgląd",
  content: "Zawartość",
  notes: "Uwagi",
  sources: "Źródła"
};

async function copyToClipboard(value: string): Promise<void> {
  try {
    await navigator.clipboard?.writeText(value);
    return;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "true");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
}

function formatFullTemplate(template: RadiologyTemplate): string {
  return [
    template.title,
    "",
    "Opis:",
    template.sections.reportTemplate.trim(),
    "",
    "Wnioski:",
    template.sections.impressionTemplate.trim()
  ].join("\n");
}

function formatStudyCount(count: number): string {
  if (count === 1) {
    return "1 szablon";
  }

  if (count > 1 && count < 5) {
    return `${count} szablony`;
  }

  return `${count} szablonów`;
}

function iconForModality(modality: RelatedStudyOption["modality"]) {
  switch (modality) {
    case "RTG":
      return Bone;
    case "CT":
    case "MR":
      return ScanLine;
    case "USG":
      return Radio;
    default:
      return Stethoscope;
  }
}

function DetailBlock({
  title,
  icon,
  children,
  action
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="detail-block">
      <div className="detail-block-heading">
        <div className="detail-block-title">
          {icon}
          <h3>{title}</h3>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function RelatedStudies({
  studies,
  onSelect
}: {
  studies: RelatedStudyOption[];
  onSelect?: (option: RelatedStudyOption) => void;
}) {
  const recommended = studies.find((study) => !study.isCurrent);

  if (!studies.length) {
    return null;
  }

  return (
    <section className="related-studies" aria-label="Inne badania dla tej jednostki">
      <div className="related-studies-heading">
        <h3>Inne badania dla tej jednostki</h3>
        <Info size={15} aria-hidden="true" />
      </div>

      <div className="related-study-cards">
        {studies.map((study) => {
          const Icon = iconForModality(study.modality);
          return (
            <button
              key={study.modality}
              className={study.isCurrent ? "related-study-card active" : "related-study-card"}
              type="button"
              onClick={() => onSelect?.(study)}
              aria-current={study.isCurrent ? "true" : undefined}
            >
              <span className="related-study-card-icon" aria-hidden="true">
                <Icon size={22} />
              </span>
              <span className="related-study-card-copy">
                <strong>{study.modality}</strong>
                <small className="related-study-card-count">{formatStudyCount(study.count)}</small>
              </span>
            </button>
          );
        })}
      </div>

      <div className="related-study-mobile">
        <div className="related-study-chips">
          {studies.map((study) => (
            <button
              key={study.modality}
              className={study.isCurrent ? "related-study-chip active" : "related-study-chip"}
              type="button"
              onClick={() => onSelect?.(study)}
              aria-current={study.isCurrent ? "true" : undefined}
            >
              <strong>{study.modality}</strong>
              <span>{formatStudyCount(study.count)}</span>
            </button>
          ))}
        </div>
        {recommended ? (
          <button className="related-study-cta" type="button" onClick={() => onSelect?.(recommended)}>
            Zobacz {recommended.modality}
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </section>
  );
}

export function TemplateDetail({
  template,
  sourceMap,
  breadcrumb,
  pinned,
  relatedStudies,
  onSelectRelatedStudy,
  onTogglePinned,
  onBackToList
}: TemplateDetailProps) {
  const [activeTab, setActiveTab] = useState<TemplateDetailTab>("preview");

  useEffect(() => {
    setActiveTab("preview");
  }, [template?.id]);

  const sources = useMemo(() => {
    return (
      template?.sourceRefs
        .map((id) => sourceMap.get(id))
        .filter((source): source is Source => Boolean(source)) ?? []
    );
  }, [sourceMap, template?.sourceRefs]);

  if (!template) {
    return (
      <section className="template-detail empty-detail">
        {onBackToList ? (
          <button className="mobile-back" type="button" onClick={onBackToList}>
            <ChevronLeft size={17} aria-hidden="true" />
            Wróć do listy
          </button>
        ) : null}
        <h2>Wybierz szablon</h2>
        <p>Po wybraniu pozycji z listy zobaczysz pełny opis, wnioski i źródła.</p>
      </section>
    );
  }

  const availableTabs: TemplateDetailTab[] = [
    "preview",
    "content",
    ...(template.sections.clinicalNotes?.length || template.sections.differential?.length || template.sections.followUp?.length
      ? (["notes"] as TemplateDetailTab[])
      : []),
    ...(sources.length ? (["sources"] as TemplateDetailTab[]) : [])
  ];

  return (
    <article className="template-detail" aria-label="Szczegóły szablonu">
      <div className="mobile-detail-topbar">
        {onBackToList ? (
          <button className="mobile-icon-button" type="button" onClick={onBackToList} aria-label="Wróć do listy">
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
        ) : null}
        <strong>{template.title}</strong>
        <span className="mobile-detail-topbar-spacer" aria-hidden="true" />
      </div>

      <header className="detail-hero">
        {breadcrumb ? <span className="detail-breadcrumb">{breadcrumb}</span> : null}
        <div className="detail-hero-content">
          <div className="detail-hero-main">
            <span className="detail-document-mark" aria-hidden="true">
              <FileText size={26} />
            </span>
            <div>
              <h2>{template.title}</h2>
              <p>{template.examTypes.join(", ")}</p>
            </div>
          </div>
          <div className="detail-hero-actions">
            <button
              className="secondary-action"
              type="button"
              onClick={() => copyToClipboard(formatFullTemplate(template))}
              aria-label="Kopiuj cały szablon"
              title="Kopiuj cały szablon"
            >
              <Clipboard size={17} aria-hidden="true" />
              <span className="detail-action-label">Kopiuj</span>
            </button>
            <button
              className="secondary-action"
              type="button"
              onClick={() => copyToClipboard(template.sections.reportTemplate)}
              aria-label="Kopiuj opis"
              title="Kopiuj opis"
            >
              <Copy size={17} aria-hidden="true" />
              <span className="detail-action-label">Opis</span>
            </button>
            {onTogglePinned ? (
              <button
                className="icon-action"
                type="button"
                onClick={() => onTogglePinned(template.id)}
                aria-label={pinned ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
                data-mobile-label={pinned ? "Odepnij" : "Przypnij"}
              >
                {pinned ? <PinOff size={18} aria-hidden="true" /> : <Pin size={18} aria-hidden="true" />}
              </button>
            ) : null}
            <button
              className="icon-action"
              type="button"
              aria-label="Edytuj szablon"
              data-mobile-label="Edycja"
              disabled
              title="Edycja będzie dostępna w kolejnym etapie"
            >
              <Edit3 size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div className="detail-meta-row">
        <StatusPill status={template.status} />
        <span className="version-pill">{template.version}</span>
        <span>Zaktualizowano: {template.updatedAt}</span>
      </div>

      <nav className="detail-tabs" aria-label="Sekcje szablonu">
        {availableTabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "detail-tab active" : "detail-tab"}
            type="button"
            onClick={() => setActiveTab(tab)}
          >
            {tabLabels[tab]}
            {tab === "notes" ? <span>{(template.sections.clinicalNotes?.length ?? 0) + (template.sections.differential?.length ?? 0) + (template.sections.followUp?.length ?? 0)}</span> : null}
          </button>
        ))}
      </nav>

      {activeTab === "preview" ? (
        <>
          <RelatedStudies studies={relatedStudies} onSelect={onSelectRelatedStudy} />

          <DetailBlock title="Cechy do oceny" icon={<ListChecks size={18} aria-hidden="true" />}>
            <ul className="assessment-list">
              {template.sections.assessmentChecklist.map((item, index) => {
                const isRequired = index < 2;
                return (
                  <li
                    key={item}
                    className={isRequired ? "assessment-item is-required" : "assessment-item is-optional"}
                  >
                    <span className="assessment-item-text">{item}</span>
                    <strong className="assessment-badge">{isRequired ? "Wymagane" : "Opcjonalne"}</strong>
                  </li>
                );
              })}
            </ul>
          </DetailBlock>

          <DetailBlock
            title="Galeria obrazów"
            action={
              template.imageRefs?.length ? (
                <span className="detail-meta-badge">{template.imageRefs.length} przykładów</span>
              ) : null
            }
          >
            <ImageGallery
              images={template.imageRefs}
              sourceMap={sourceMap}
              templateTitle={template.title}
            />
          </DetailBlock>
        </>
      ) : null}

      {activeTab === "content" ? (
        <>
          <DetailBlock
            title="Opis"
            action={
              <button
                className="small-copy"
                type="button"
                onClick={() => copyToClipboard(template.sections.reportTemplate)}
              >
                Kopiuj
              </button>
            }
          >
            <pre className="template-text">{template.sections.reportTemplate.trim()}</pre>
          </DetailBlock>

          <DetailBlock
            title="Wnioski"
            action={
              <button
                className="small-copy"
                type="button"
                onClick={() => copyToClipboard(template.sections.impressionTemplate)}
              >
                Kopiuj
              </button>
            }
          >
            <pre className="template-text impression">{template.sections.impressionTemplate.trim()}</pre>
          </DetailBlock>
        </>
      ) : null}

      {activeTab === "notes" ? (
        <>
          {template.sections.clinicalNotes?.length ? (
            <DetailBlock title="Uwagi">
              <ul className="plain-list">
                {template.sections.clinicalNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </DetailBlock>
          ) : null}

          {template.sections.differential?.length ? (
            <DetailBlock title="Różnicowanie">
              <ul className="plain-list">
                {template.sections.differential.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </DetailBlock>
          ) : null}

          {template.sections.followUp?.length ? (
            <DetailBlock title="Dalsze postępowanie">
              <ul className="plain-list">
                {template.sections.followUp.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </DetailBlock>
          ) : null}
        </>
      ) : null}

      {activeTab === "sources" ? (
        <DetailBlock title="Źródła">
          <div className="source-list">
            {sources.map((source) => (
              <a href={source.url} key={source.id} target="_blank" rel="noreferrer">
                <span>{source.title}</span>
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            ))}
          </div>
        </DetailBlock>
      ) : null}
    </article>
  );
}
