"use client";

import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import { Footer, Header } from "@/components/header-footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { UniBandConfig } from "@/config";

const metadata = {
  title: "UniBand",
  description: UniBandConfig.home.subtitle,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/public/favicon.ico" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <StyledComponentsRegistry>
            <Header />
            {children}
            <Footer />
            <cite
              // biome-ignore lint/security/noDangerouslySetInnerHtml: :)
              dangerouslySetInnerHTML={{
                __html:
                  "<!-- Website designed and developed by Samuel Ou. https://github.com/S-Ou -->",
              }}
            />
          </StyledComponentsRegistry>
        </QueryClientProvider>
      </body>
    </html>
  );
}
