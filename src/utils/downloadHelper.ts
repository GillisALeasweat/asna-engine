import JSZip from 'jszip';

/**
 * Downloads a single text-based file in browser
 */
export const downloadTextFile = (filename: string, content: string, mimeType = 'text/plain;charset=utf-8') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export interface FileEntry {
  path: string; // e.g. "rfcs/0001-asna-architecture.md" or "README.md"
  content: string;
}

/**
 * Bundles multiple text files into a structured ZIP archive and triggers download
 */
export const downloadZipArchive = async (files: FileEntry[], zipName = 'asna-repository-kit.zip') => {
  const zip = new JSZip();

  files.forEach(({ path, content }) => {
    zip.file(path, content);
  });

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = zipName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
