import type { Metadata } from "next";
import "@/styles/globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";


export const metadata: Metadata = {
  title: "Cinelista",
  description: "No Cinelista, você encontra os títulos mais populares do cinema e mais bem avaliados.",
};

export default function RootLayout({ 
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" >
      <body>
        <Header/>
        {children}
        <Footer/>  
      </body>
    </html>
  );
}
