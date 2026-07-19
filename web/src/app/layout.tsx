import type { Metadata } from "next";

import "./globals.css";



export const metadata: Metadata = {
  title:"WeTalk | Random video or Voice Chat with Random people" ,
  description: "Random video or Voice Chat with Random people",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en">
    
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
