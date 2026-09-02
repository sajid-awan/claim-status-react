import { useState } from "react";
import { Files } from "@/components/icons";

import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { ClaimStatusPage } from "@/components/claim-status/ClaimStatusPage";
import { PrimaryButton } from "@/components/ui/Button";
import { mockClaim } from "@/data/claims";

function App() {
  const [isClaimStatusOpen, setIsClaimStatusOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-surface-page md:h-auto md:overflow-y-auto lg:h-screen lg:overflow-hidden">
      <AppSidebar
        mobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-surface-body md:min-h-0 lg:min-h-0">
        <AppHeader onOpenSidebar={() => setIsMobileSidebarOpen(true)} />
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden bg-surface-body px-2 pb-2 pt-2 max-lg:overflow-y-auto max-lg:px-4 sm:pb-3 sm:pt-3 lg:overflow-hidden lg:px-3">
          {isClaimStatusOpen ? (
            <ClaimStatusPage claim={mockClaim} onClose={() => setIsClaimStatusOpen(false)} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-ink-muted">
              <Files size={32} weight="regular" className="text-border-secondary" />
              <p className="text-sm">Claim Status view closed.</p>
              <PrimaryButton onClick={() => setIsClaimStatusOpen(true)}>
                Reopen Claim {mockClaim.claimNumber}
              </PrimaryButton>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
