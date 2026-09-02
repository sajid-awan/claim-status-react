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
            <li key={call.id} className="rounded-md border border-gray-100 bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {call.direction === "Inbound" ? (
                    <PhoneIncoming size={14} className="text-emerald-500" />
                  ) : (
                    <PhoneOutgoing size={14} className="text-brand-500" />
                  )}
                  <span className="text-sm font-medium text-gray-800">{call.caller}</span>
                </div>
                <span className="text-xs text-gray-400">{call.duration}</span>
              </div>
              <p className="mt-1 text-xs text-gray-400">{call.date}</p>
              <p className="mt-1.5 text-sm text-gray-600">{call.notes}</p>
            </li>
          ))}
        </ul>
      </div>
    </ContextualSectionShell>
  );
}
