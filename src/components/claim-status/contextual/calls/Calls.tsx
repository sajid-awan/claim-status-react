import { PhoneIncoming, PhoneOutgoing } from "@/components/icons";

import { ContextualSectionShell } from "@/components/claim-status/contextual/ContextualSectionShell";
import { ContextualCardMeta, ContextualCardTitle, ContextualNote } from "@/components/ui/ContextualCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { callLog } from "@/data/contextual";

export function Calls() {
  return (
    <ContextualSectionShell>
      <div className="px-4 py-4">
        <SectionTitle title="Call Log" />
        <ul className="flex flex-col gap-2">
          {callLog.map((call) => (
            <li key={call.id}>
              <ContextualNote>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {call.direction === "Inbound" ? (
                      <PhoneIncoming size={14} className="text-success" />
                    ) : (
                      <PhoneOutgoing size={14} className="text-brand-500" />
                    )}
                    <ContextualCardTitle>{call.caller}</ContextualCardTitle>
                  </div>
                  <ContextualCardMeta>{call.duration}</ContextualCardMeta>
                </div>
                <ContextualCardMeta className="mt-1">{call.date}</ContextualCardMeta>
                <p className="mt-1.5 text-body-sm text-ink-muted">{call.notes}</p>
              </ContextualNote>
            </li>
          ))}
        </ul>
      </div>
    </ContextualSectionShell>
  );
}
