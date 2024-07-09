import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scrum Poker",
  description: "Scrum Poker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <body>{children}</body>
    </html>
  );
}
