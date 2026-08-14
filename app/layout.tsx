import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3:17 AM — for people who should probably be asleep.",
  description: "3:17 AM — A Gen-Z night-owl digital environment experience. Listen together in real-time rooms, share songs & feelings, and never listen alone.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" class="h-full w-full bg-[#05070d]">
      <body class="h-full w-full overflow-hidden m-0 p-0 bg-[#05070d]">
        {children}
      </body>
    </html>
  );
}
