import { ChevronLeft, Clipboard, Copy, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import type { RadiologyTemplate, Source } from "../types/radiology";
import { ImageGallery } from "./ImageGallery";
import { StatusPill } from "./StatusPill";

type TemplateDetailProps = {
  template?: RadiologyTemplate;
  sourceMap: Map<string, Source>;
  onBackToList?: () => void;
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

function DetailBlock({
  title,
  children,
  action
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="detail-block">
      <div className="detail-block-heading">
        <h3>{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

export function TemplateDetail({ template, sourceMap, onBackToList }: TemplateDetailProps) {
  if (!template) {
    return (
      <section className="detail-panel empty-detail">
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

  const sources = template.sourceRefs
    .map((id) => sourceMap.get(id))
    .filter((source): source is Source => Boolean(source));

  return (
    <article className="detail-panel" aria-label="Szczegóły szablonu">
      {onBackToList ? (
        <button className="mobile-back" type="button" onClick={onBackToList}>
          <ChevronLeft size={17} aria-hidden="true" />
          Wróć do listy
        </button>
      ) : null}

      <div className="detail-header">
        <div>
          <span className="detail-kicker">
            {template.modality} · {template.examTypes.join(", ")}
          </span>
          <h2>{template.title}</h2>
          <p>
            {template.bodyParts.join(", ")} · {template.organs.join(", ")} · wersja{" "}
            {template.version}
          </p>
        </div>
        <StatusPill status={template.status} />
      </div>

      <div className="detail-actions">
        <button type="button" onClick={() => copyToClipboard(formatFullTemplate(template))}>
          <Clipboard size={17} aria-hidden="true" />
          Kopiuj całość
        </button>
        <button type="button" onClick={() => copyToClipboard(template.sections.reportTemplate)}>
          <Copy size={17} aria-hidden="true" />
          Kopiuj opis
        </button>
        <button
          type="button"
          onClick={() => copyToClipboard(template.sections.impressionTemplate)}
        >
          <Copy size={17} aria-hidden="true" />
          Kopiuj wnioski
        </button>
      </div>

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

      <DetailBlock title="Cechy do oceny">
        <ul className="checklist">
          {template.sections.assessmentChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </DetailBlock>

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

      <DetailBlock title="Źródła">
        <div className="source-list">
          {sources.map((source) =>
            source ? (
              <a href={source.url} key={source.id} target="_blank" rel="noreferrer">
                <span>{source.title}</span>
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            ) : null
          )}
        </div>
      </DetailBlock>
    </article>
  );
}
