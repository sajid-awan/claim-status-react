import { Download, FileText } from "@/components/icons";

import { ContextualSectionShell } from "@/components/claim-status/contextual/ContextualSectionShell";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { claimDocuments } from "@/data/contextual";

export function Documents() {
  return (
    <ContextualSectionShell>
      <div className="px-4 py-4">
        <SectionTitle title={`Attached Documents (${claimDocuments.length})`} />
        <ul className="flex flex-col gap-2">
          {claimDocuments.map((doc) => (
            <li key={doc.id} className="contextual-card">
              <div className="flex min-w-0 items-center gap-2.5">
                <FileText size={16} className="shrink-0 text-brand-500" />
                <div className="min-w-0">
                  <p className="contextual-card__title">{doc.name}</p>
                  <p className="contextual-card__meta">
                    {doc.size} &middot; Uploaded {doc.uploadedOn} by {doc.uploadedBy}
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label={`Download ${doc.name}`}
                className="contextual-card__icon-btn"
              >
                <Download size={15} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </ContextualSectionShell>
  );
}
