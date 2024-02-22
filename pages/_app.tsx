import "../app/globals.css";
import Header from "@/components/Header";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="bg-slate-900 text-white font-inter h-screen flex flex-col overflow-y-auto">
      <Header />
      <Component {...pageProps} />
    </main>
  );
}
