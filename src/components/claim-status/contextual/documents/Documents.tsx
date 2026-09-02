import { Download, FileText } from "@/components/icons";

import { ContextualSectionShell } from "@/components/claim-status/contextual/ContextualSectionShell";
import {
  ContextualCard,
  ContextualCardIconButton,
  ContextualCardMeta,
  ContextualCardTitle,
} from "@/components/ui/ContextualCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { claimDocuments } from "@/data/contextual";

export function Documents() {
  return (
    <ContextualSectionShell>
      <div className="px-4 py-4">
        <SectionTitle title={`Attached Documents (${claimDocuments.length})`} />
        <ul className="flex flex-col gap-2">
          {claimDocuments.map((doc) => (
            <li key={doc.id}>
              <ContextualCard>
                <div className="flex min-w-0 items-center gap-2.5">
                  <FileText size={16} className="shrink-0 text-brand-500" />
                  <div className="min-w-0">
                    <ContextualCardTitle>{doc.name}</ContextualCardTitle>
                    <ContextualCardMeta>
                      {doc.size} &middot; Uploaded {doc.uploadedOn} by {doc.uploadedBy}
                    </ContextualCardMeta>
                  </div>
                </div>
                <ContextualCardIconButton aria-label={`Download ${doc.name}`}>
                  <Download size={15} />
                </ContextualCardIconButton>
              </ContextualCard>
            </li>
          ))}
        </ul>
      </div>
    </ContextualSectionShell>
  );
}
