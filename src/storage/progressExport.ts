import type { LearnerProgress } from "../domain/contentTypes";

export function serializeProgress(progress: LearnerProgress): string {
  return JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), progress }, null, 2);
}

export function parseProgressExport(raw: string): LearnerProgress {
  const parsed = JSON.parse(raw) as { version?: number; progress?: LearnerProgress };

  if (parsed.version !== 1 || !parsed.progress?.id || !parsed.progress.displayName) {
    throw new Error("Archivo de progreso no valido.");
  }

  return parsed.progress;
}

export function downloadProgress(progress: LearnerProgress): void {
  const blob = new Blob([serializeProgress(progress)], { type: "application/json" });
  const href = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = "progreso-repasa-lengua-angela.json";
  link.click();
  URL.revokeObjectURL(href);
}
