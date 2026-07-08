import { StrictMode, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { loadContent } from "./data/content";
import type { AppContentBundle, RadiologyTemplate } from "./types/radiology";
import "./pdf/pdf.css";

function groupKey(template: RadiologyTemplate): string {
  return [
    template.modality,
    template.bodyParts[0] ?? "Inne",
    template.organs[0] ?? "Inne",
    template.pathology[0] ?? "Inne"
  ].join(" / ");
}

function groupTemplates(templates: RadiologyTemplate[]) {
  const grouped = new Map<string, RadiologyTemplate[]>();
  for (const template of templates) {
    const key = groupKey(template);
    const current = grouped.get(key);
    if (current) {
      current.push(template);
    } else {
      grouped.set(key, [template]);
    }
  }
  return grouped;
}

function PdfDocument() {
  const [bundle, setBundle] = useState<AppContentBundle | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      try {
        const nextBundle = await loadContent();
        if (!cancelled) {
          setBundle(nextBundle);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Nie udało się załadować danych do eksportu PDF."
          );
        }
      }
    }

    void initialize();

    return () => {
      cancelled = true;
    };
  }, []);

  const grouped = useMemo(() => {
    return bundle ? groupTemplates(bundle.templates) : new Map<string, RadiologyTemplate[]>();
  }, [bundle]);
  const sourceMap = useMemo(() => {
    return new Map(bundle?.sources.map((source) => [source.id, source]) ?? []);
  }, [bundle]);
  const generatedAt = new Intl.DateTimeFormat("pl-PL", {
    dateStyle: "long",
    timeStyle: "short"
  }).format(new Date());

  if (error) {
    return (
      <main className="pdf-document">
        <section className="cover page">
          <h1>Nie udało się przygotować PDF</h1>
          <p>{error}</p>
        </section>
      </main>
    );
  }

  if (!bundle) {
    return (
      <main className="pdf-document">
        <section className="cover page">
          <h1>Przygotowywanie PDF</h1>
          <p>Ładowanie najnowszej wersji treści…</p>
        </section>
      </main>
    );
  }

  return (
    <main className="pdf-document">
      <section className="cover page">
        <p className="doc-type">Atlas opisów radiologicznych</p>
        <h1>Szablony opisów radiologicznych</h1>
        <p className="lead">
          Ustrukturyzowana biblioteka roboczych szablonów opisów z sekcjami: cechy do oceny,
          opis, wnioski, uwagi i źródła.
        </p>
        <dl>
          <div>
            <dt>Zakres</dt>
            <dd>{bundle.templates.length} szablonów</dd>
          </div>
          <div>
            <dt>Wersja treści</dt>
            <dd>{bundle.contentVersion}</dd>
          </div>
          <div>
            <dt>Data generacji</dt>
            <dd>{generatedAt}</dd>
          </div>
        </dl>
        <p className="disclaimer">
          Materiał edukacyjno-organizacyjny. Szablony oznaczone jako draft wymagają recenzji
          merytorycznej przed przyjęciem jako standard pracowni.
        </p>
      </section>

      <section className="toc page">
        <h2>Spis treści</h2>
        <ol>
          {[...grouped.entries()].map(([key, items]) => (
            <li key={key}>
              <span>{key}</span>
              <strong>{items.length}</strong>
            </li>
          ))}
        </ol>
      </section>

      {[...grouped.entries()].map(([key, items]) => (
        <section className="chapter page" key={key}>
          <h2>{key}</h2>
          {items.map((template) => {
            const templateSources = template.sourceRefs
              .map((sourceRef) => sourceMap.get(sourceRef))
              .filter(Boolean);

            return (
              <article className="pdf-template" key={template.id}>
                <header>
                  <div>
                    <p>
                      {template.modality} · {template.examTypes.join(", ")} · {template.status}
                    </p>
                    <h3>{template.title}</h3>
                  </div>
                  <span>{template.version}</span>
                </header>

                <h4>Cechy do oceny</h4>
                <ul>
                  {template.sections.assessmentChecklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <h4>Opis</h4>
                <pre>{template.sections.reportTemplate.trim()}</pre>

                <h4>Wnioski</h4>
                <pre>{template.sections.impressionTemplate.trim()}</pre>

                {template.sections.clinicalNotes?.length ? (
                  <>
                    <h4>Uwagi</h4>
                    <ul>
                      {template.sections.clinicalNotes.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  </>
                ) : null}

                {template.sections.followUp?.length ? (
                  <>
                    <h4>Dalsze postępowanie</h4>
                    <ul>
                      {template.sections.followUp.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  </>
                ) : null}

                <p className="source-line">
                  Źródła: {templateSources.map((source) => source?.title).join("; ")}
                </p>
              </article>
            );
          })}
        </section>
      ))}

      <section className="sources page">
        <h2>Źródła</h2>
        {bundle.sources.map((source) => (
          <article key={source.id}>
            <h3>{source.title}</h3>
            <p>{source.url}</p>
            <p>{source.licenseNote}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

createRoot(document.getElementById("pdf-root")!).render(
  <StrictMode>
    <PdfDocument />
  </StrictMode>
);
