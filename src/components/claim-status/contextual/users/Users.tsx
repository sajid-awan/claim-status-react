import { Envelope } from "@/components/icons";

import { ContextualSectionShell } from "@/components/claim-status/contextual/ContextualSectionShell";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { assignedUsers } from "@/data/contextual";

export function Users() {
  return (
    <ContextualSectionShell>
      <div className="px-4 py-4">
        <SectionTitle title="Assigned Users" />
        <ul className="flex flex-col gap-2">
          {assignedUsers.map((user) => (
            <li key={user.id} className="contextual-card gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-600">
                {user.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="contextual-card__title">{user.name}</p>
                <p className="contextual-card__meta">{user.role}</p>
              </div>
              <a
                href={`mailto:${user.email}`}
                className="flex items-center gap-1 text-xs text-ink-muted hover:text-brand-600"
              >
                <Envelope size={13} />
                <span className="hidden sm:inline">{user.email}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </ContextualSectionShell>
  );
}
