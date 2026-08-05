import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Interview Coach",
  description: "Practice personalized interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}