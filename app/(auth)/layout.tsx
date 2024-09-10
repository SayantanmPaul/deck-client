import { BackgroundBeams } from "@/components/ui/background-beams";
import DeckLogo from "@/public/deck.svg";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="w-full h-dvh flex flex-col gap-6 items-center justify-center p-4 z-20">
        <BackgroundBeams />
        <span className="flex gap-3 select-none items-center">
          <Image
            src={DeckLogo}
            alt="logo"
            width={200}
            height={200}
            draggable={false}
            className="w-8 h-8 object-contain"
            priority
          />
          <p className="text-3xl font-bold font-brand text-white">Deck</p>
        </span>
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl">
          {children}
        </div>
      </div>
    </main>
  );
}
