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
      <div className="contextual-section--stack">
        <SectionTitle title={`Attached Documents (${claimDocuments.length})`} />
        <ul className="contextual-list">
          {claimDocuments.map((doc) => (
            <li key={doc.id}>
              <ContextualCard>
                <div className="contextual-card-row--start">
                  <FileText size={16} className="doc-icon" />
                  <div className="contextual-card-body">
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
