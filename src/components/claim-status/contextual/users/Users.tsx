import { Envelope } from "@/components/icons";

import { ContextualSectionShell } from "@/components/claim-status/contextual/ContextualSectionShell";
import { ContextualCard, ContextualCardMeta, ContextualCardTitle } from "@/components/ui/ContextualCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { assignedUsers } from "@/data/contextual";

export function Users() {
  return (
    <ContextualSectionShell>
      <div className="contextual-section--stack">
        <SectionTitle title="Assigned Users" />
        <ul className="contextual-list">
          {assignedUsers.map((user) => (
            <li key={user.id}>
              <ContextualCard className="contextual-card--spaced">
                <div className="user-avatar">{user.initials}</div>
                <div className="contextual-card-body">
                  <ContextualCardTitle>{user.name}</ContextualCardTitle>
                  <ContextualCardMeta>{user.role}</ContextualCardMeta>
                </div>
                <a href={`mailto:${user.email}`} className="user-email-link">
                  <Envelope size={13} />
                  <span className="user-email-text">{user.email}</span>
                </a>
              </ContextualCard>
            </li>
          ))}
        </ul>
      </div>
    </ContextualSectionShell>
  );
}
