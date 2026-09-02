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
            <li
              key={doc.id}
              className="flex items-center justify-between rounded-md border border-gray-100 bg-white px-3 py-2.5 shadow-sm"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <FileText size={16} className="shrink-0 text-brand-500" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-800">{doc.name}</p>
                  <p className="text-xs text-gray-400">
                    {doc.size} &middot; Uploaded {doc.uploadedOn} by {doc.uploadedBy}
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label={`Download ${doc.name}`}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600"
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
