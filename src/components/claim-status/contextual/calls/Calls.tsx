import { PhoneIncoming, PhoneOutgoing } from "@/components/icons";

import { ContextualSectionShell } from "@/components/claim-status/contextual/ContextualSectionShell";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { callLog } from "@/data/contextual";

export function Calls() {
  return (
    <ContextualSectionShell>
      <div className="px-4 py-4">
        <SectionTitle title="Call Log" />
        <ul className="flex flex-col gap-2">
          {callLog.map((call) => (
            <li key={call.id} className="contextual-note">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {call.direction === "Inbound" ? (
                    <PhoneIncoming size={14} className="text-success" />
                  ) : (
                    <PhoneOutgoing size={14} className="text-brand-500" />
                  )}
                  <span className="contextual-card__title">{call.caller}</span>
                </div>
                <span className="contextual-card__meta">{call.duration}</span>
              </div>
              <p className="mt-1 contextual-card__meta">{call.date}</p>
              <p className="mt-1.5 text-body-sm text-ink-muted">{call.notes}</p>
            </li>
          ))}
        </ul>
      </div>
    </ContextualSectionShell>
  );
}
