import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { QueryProvider } from "@/components/providers/query-provider";
import { Wrapper } from "@/components/wrapper";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";

import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer/footer";
import PremiumModal from "@/components/PREMIUM/premium-modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Darbų skelbimo talpinimo platforma.",
  description: "Darbų skelbimo talpinimo platforma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Wrapper>
                <main>{children}</main>
                <PremiumModal />
                <Toaster />
              </Wrapper>
              <Footer />
            </ThemeProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
