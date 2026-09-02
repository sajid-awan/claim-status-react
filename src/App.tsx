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
    <div className="claim-status-app app-shell">
      <AppSidebar
        mobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />
      <div className="app-shell__main">
        <AppHeader onOpenSidebar={() => setIsMobileSidebarOpen(true)} />
        <main className="app-shell__content">
          {isClaimStatusOpen ? (
            <ClaimStatusPage claim={mockClaim} onClose={() => setIsClaimStatusOpen(false)} />
          ) : (
            <div className="app-empty-state">
              <Files size={32} weight="regular" className="app-empty-state__icon" />
              <p className="app-empty-state__text">Claim Status view closed.</p>
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
