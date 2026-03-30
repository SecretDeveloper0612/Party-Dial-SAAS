import type { Metadata } from "next";
import "./main.css";

export const metadata: Metadata = {
  title: "Partner with PartyDial | Venue Growth Platform",
  description: "Join the largest network of event venues and grow your business with high-quality verified leads.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-pd" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
