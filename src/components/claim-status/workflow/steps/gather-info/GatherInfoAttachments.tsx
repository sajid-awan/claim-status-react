import { useRef, useState } from "react";

import { Link, UploadSimple } from "@/components/icons";
import { FormField } from "@/components/ui/FormField";

interface GatherInfoAttachmentsProps {
  fileName: string;
  linkedDocuments: string[];
  onFileNameChange: (fileName: string) => void;
  onLinkedDocumentsChange: (documents: string[]) => void;
}

const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_FILE_TYPES = ".pdf,.doc,.docx,.jpg,.jpeg,.png,.tif,.tiff";

function validateFile(file: File): string | null {
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return `“${file.name}” exceeds ${MAX_FILE_SIZE_MB} MB.`;
  }
  return null;
}

export function GatherInfoAttachments({
  fileName,
  linkedDocuments,
  onFileNameChange,
  onLinkedDocumentsChange,
}: GatherInfoAttachmentsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const linkInputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  function handleUpload(file: File | undefined) {
    if (!file) return;
    const error = validateFile(file);
    setUploadError(error);
    if (!error) onFileNameChange(file.name);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleLinkedDocuments(fileList: FileList | null) {
    if (!fileList?.length) return;
    const nextDocuments = [...linkedDocuments];

    for (const file of Array.from(fileList)) {
      const error = validateFile(file);
      if (error) {
        setUploadError(error);
        return;
      }
      if (!nextDocuments.includes(file.name)) nextDocuments.push(file.name);
    }

    setUploadError(null);
    onLinkedDocumentsChange(nextDocuments);
    if (linkInputRef.current) linkInputRef.current.value = "";
  }

  const hasUploadedFile = fileName !== "No file attached";

  return (
    <FormField label="Attachments">
      <div className="upload-stack">
        <input
          ref={fileInputRef}
          id="gather-info-upload"
          type="file"
          accept={ACCEPTED_FILE_TYPES}
          className="visually-hidden"
          onChange={(event) => handleUpload(event.target.files?.[0])}
        />
        <label htmlFor="gather-info-upload" className="upload-zone">
          <UploadSimple size={18} weight="bold" />
          Upload File
        </label>

        <input
          ref={linkInputRef}
          id="gather-info-link"
          type="file"
          accept={ACCEPTED_FILE_TYPES}
          multiple
          className="visually-hidden"
          onChange={(event) => handleLinkedDocuments(event.target.files)}
        />
        <label htmlFor="gather-info-link" className="upload-zone upload-zone--link">
          <Link size={18} weight="bold" />
          Link Documents
        </label>
      </div>

      {uploadError ? (
        <p className="upload-error" role="alert">
          {uploadError}
        </p>
      ) : null}

      {hasUploadedFile ? (
        <ul className="upload-list">
          <li className="upload-list__item">
            <span className="upload-list__name">{fileName}</span>
            <button
              type="button"
              onClick={() => onFileNameChange("No file attached")}
              className="upload-list__remove"
            >
              Remove
            </button>
          </li>
        </ul>
      ) : null}

      {linkedDocuments.length > 0 ? (
        <ul className="upload-list">
          {linkedDocuments.map((name) => (
            <li key={name} className="upload-list__item">
              <span className="upload-list__name">{name}</span>
              <button
                type="button"
                onClick={() =>
                  onLinkedDocumentsChange(linkedDocuments.filter((document) => document !== name))
                }
                className="upload-list__remove"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </FormField>
  );
}
