import { Wrapper } from "@/components/wrapper";
import { Navigation } from "@/components/navigation/navigation";

import { Toaster } from "@/components/ui/toaster";

import PremiumModal from "@/components/PREMIUM/premium-modal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Wrapper>
        <Navigation />
        <main>{children}</main>
        <PremiumModal />
        <Toaster />
      </Wrapper>
    </div>
  );
}
