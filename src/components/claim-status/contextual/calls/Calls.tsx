import { PhoneIncoming, PhoneOutgoing } from "@/components/icons";

import { ContextualSectionShell } from "@/components/claim-status/contextual/ContextualSectionShell";
import { ContextualCardMeta, ContextualCardTitle, ContextualNote } from "@/components/ui/ContextualCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { callLog } from "@/data/contextual";

export function Calls() {
  return (
    <ContextualSectionShell>
      <div className="contextual-section--stack">
        <SectionTitle title="Call Log" />
        <ul className="contextual-list">
          {callLog.map((call) => (
            <li key={call.id}>
              <ContextualNote>
                <div className="call-note-header">
                  <div className="call-note-leading">
                    {call.direction === "Inbound" ? (
                      <PhoneIncoming size={14} className="call-note-icon--inbound" />
                    ) : (
                      <PhoneOutgoing size={14} className="call-note-icon--outbound" />
                    )}
                    <ContextualCardTitle>{call.caller}</ContextualCardTitle>
                  </div>
                  <ContextualCardMeta>{call.duration}</ContextualCardMeta>
                </div>
                <ContextualCardMeta className="call-note-date">{call.date}</ContextualCardMeta>
                <p className="call-note-body">{call.notes}</p>
              </ContextualNote>
            </li>
          ))}
        </ul>
      </div>
    </ContextualSectionShell>
  );
}
