import type { ContextualTabId } from "@/types/workflow";

import { Calls } from "@/components/claim-status/contextual/calls/Calls";
import { ClaimAction } from "@/components/claim-status/contextual/claim-action/ClaimAction";
import { Documents } from "@/components/claim-status/contextual/documents/Documents";
import { Fax } from "@/components/claim-status/contextual/fax/Fax";
import { Submission } from "@/components/claim-status/contextual/submission/Submission";
import { Users } from "@/components/claim-status/contextual/users/Users";

interface ContextualContentProps {
  activeContext: ContextualTabId;
}

export function ContextualContent({ activeContext }: ContextualContentProps) {
  switch (activeContext) {
    case "claim-action":
      return <ClaimAction />;
    case "submission":
      return <Submission />;
    case "fax":
      return <Fax />;
    case "documents":
      return <Documents />;
    case "users":
      return <Users />;
    case "calls":
      return <Calls />;
    default:
      return null;
  }
}
