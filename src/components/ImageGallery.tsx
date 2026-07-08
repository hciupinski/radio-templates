import {
  ChevronLeft,
  ChevronRight,
  Expand,
  ExternalLink,
  ImageOff,
  ScanSearch,
  X
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ImageRef, Source } from "../types/radiology";

type ImageGalleryProps = {
  images?: ImageRef[];
  sourceMap: Map<string, Source>;
  templateTitle: string;
};

const categoryLabelMap: Record<ImageRef["category"], string> = {
  typical: "Typowy obraz",
  variant: "Wariant",
  doppler: "Doppler",
  differential: "Różnicowanie",
  "normal-reference": "Punkt odniesienia",
  pitfall: "Pułapka"
};

const licenseLabelMap: Record<ImageRef["licenseMode"], string> = {
  "link-only": "Link zewnętrzny",
  "cc-by": "CC BY",
  "cc-by-sa": "CC BY-SA",
  "cc-by-nc": "CC BY-NC",
  "public-domain": "Public domain",
  unknown: "Licencja do sprawdzenia"
};

function sourceLabelForImage(image: ImageRef, sourceMap: Map<string, Source>): string {
  if (image.sourceId) {
    const source = sourceMap.get(image.sourceId);
    if (source) {
      return source.title;
    }
  }

  if (image.attribution) {
    return image.attribution;
  }

  try {
    return new URL(image.sourceUrl).hostname.replace(/^www\./u, "");
  } catch {
    return "Źródło zewnętrzne";
  }
}

export function ImageGallery({ images = [], sourceMap, templateTitle }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loadedState, setLoadedState] = useState<Record<string, boolean>>({});
  const [failedState, setFailedState] = useState<Record<string, boolean>>({});

  const selectedImage = selectedIndex === null ? undefined : images[selectedIndex];
  const hasImages = images.length > 0;

  const selectedSourceLabel = useMemo(() => {
    if (!selectedImage) {
      return "";
    }

    return sourceLabelForImage(selectedImage, sourceMap);
  }, [selectedImage, sourceMap]);

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      } else if (event.key === "ArrowRight" && images.length > 1) {
        setSelectedIndex((current) => {
          if (current === null) {
            return 0;
          }

          return (current + 1) % images.length;
        });
      } else if (event.key === "ArrowLeft" && images.length > 1) {
        setSelectedIndex((current) => {
          if (current === null) {
            return 0;
          }

          return (current - 1 + images.length) % images.length;
        });
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [images.length, selectedIndex]);

  function markLoaded(imageId: string) {
    setLoadedState((current) => ({ ...current, [imageId]: true }));
  }

  function markFailed(imageId: string) {
    setFailedState((current) => ({ ...current, [imageId]: true }));
  }

  if (!hasImages) {
    return (
      <div className="gallery-empty">
        <div className="gallery-empty-icon" aria-hidden="true">
          <ScanSearch size={18} />
        </div>
        <div>
          <strong>Brak jeszcze dodanych obrazów edukacyjnych</strong>
          <p>
            Ten szablon nie ma jeszcze zweryfikowanych przykładów obrazowych. Po uzupełnieniu
            `imageRefs` pojawią się tutaj karty do porównania cech i pełnoekranowy podgląd.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="gallery-lead">
        <p>
          Zweryfikowane przykłady obrazowe dla szybkiego porównania cech typowych, wariantów i
          pułapek rozpoznawczych.
        </p>
      </div>

      <div className="image-grid">
        {images.map((image, index) => {
          const isLoaded = loadedState[image.id];
          const isFailed = failedState[image.id];
          const sourceLabel = sourceLabelForImage(image, sourceMap);

          return (
            <article className="image-card" key={image.id}>
              <button
                className="image-card-preview"
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`Otwórz podgląd obrazu: ${image.title}`}
              >
                <div
                  className={[
                    "image-card-media",
                    isLoaded ? "is-loaded" : "",
                    isFailed ? "is-error" : ""
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {!isFailed ? (
                    <img
                      src={image.thumbnailUrl ?? image.imageUrl}
                      alt={image.alt}
                      loading="lazy"
                      onLoad={() => markLoaded(image.id)}
                      onError={() => markFailed(image.id)}
                    />
                  ) : (
                    <div className="image-card-fallback">
                      <ImageOff size={18} aria-hidden="true" />
                      <span>Podgląd zablokowany przez zewnętrzne źródło</span>
                    </div>
                  )}
                  <div className="image-card-badges">
                    <span className="image-badge">{categoryLabelMap[image.category]}</span>
                    <span className="image-badge subtle">{licenseLabelMap[image.licenseMode]}</span>
                  </div>
                  <span className="image-card-zoom">
                    <Expand size={16} aria-hidden="true" />
                    Powiększ
                  </span>
                </div>
              </button>

              <div className="image-card-copy">
                <div className="image-card-header">
                  <h4>{image.title}</h4>
                </div>

                <div className="image-card-actions">
                  <button type="button" className="image-card-button" onClick={() => setSelectedIndex(index)}>
                    Zobacz szczegóły
                  </button>
                  <a
                    className="image-card-link"
                    href={image.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{sourceLabel}</span>
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {selectedImage ? (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria obrazów dla ${templateTitle}`}
        >
          <button
            type="button"
            className="gallery-backdrop"
            aria-label="Zamknij podgląd"
            onClick={() => setSelectedIndex(null)}
          />

          <div className="gallery-shell" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="gallery-close"
              onClick={() => setSelectedIndex(null)}
              aria-label="Zamknij podgląd"
            >
              <X size={18} aria-hidden="true" />
            </button>

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  className="gallery-nav previous"
                  onClick={() =>
                    setSelectedIndex((current) =>
                      current === null ? 0 : (current - 1 + images.length) % images.length
                    )
                  }
                  aria-label="Poprzedni obraz"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="gallery-nav next"
                  onClick={() =>
                    setSelectedIndex((current) =>
                      current === null ? 0 : (current + 1) % images.length
                    )
                  }
                  aria-label="Następny obraz"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </>
            ) : null}

            <div className="gallery-stage">
              <figure className="gallery-figure">
                {!failedState[selectedImage.id] ? (
                  <img
                    src={selectedImage.imageUrl}
                    alt={selectedImage.alt}
                    onLoad={() => markLoaded(selectedImage.id)}
                    onError={() => markFailed(selectedImage.id)}
                  />
                ) : (
                  <div className="gallery-figure-fallback">
                    <ImageOff size={22} aria-hidden="true" />
                    <strong>Nie udało się załadować obrazu bezpośrednio</strong>
                    <p>Źródło nadal możesz otworzyć w nowej karcie i sprawdzić przykład na stronie.</p>
                  </div>
                )}
              </figure>

              <aside className="gallery-meta">
                <div className="gallery-meta-header">
                  <span className="image-badge">{categoryLabelMap[selectedImage.category]}</span>
                  <span className="image-badge subtle">
                    {licenseLabelMap[selectedImage.licenseMode]}
                  </span>
                </div>
                <h4>{selectedImage.title}</h4>
                <p>{selectedImage.caption}</p>

                <div className="gallery-meta-block">
                  <h5>Na co patrzeć</h5>
                  <ul className="image-findings">
                    {selectedImage.findings.map((finding) => (
                      <li key={finding}>{finding}</li>
                    ))}
                  </ul>
                </div>

                <div className="gallery-meta-grid">
                  <div>
                    <span>Źródło</span>
                    <strong>{selectedSourceLabel}</strong>
                  </div>
                  <div>
                    <span>Weryfikacja</span>
                    <strong>{selectedImage.lastCheckedAt}</strong>
                  </div>
                </div>

                <div className="gallery-meta-actions">
                  <a href={selectedImage.sourceUrl} target="_blank" rel="noreferrer">
                    Otwórz źródło
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                  <a href={selectedImage.imageUrl} target="_blank" rel="noreferrer">
                    Otwórz obraz
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
