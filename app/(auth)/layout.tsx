import Image from "next/image";
import DeckLogo from "@/public/deck.svg";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="w-full h-dvh flex flex-col gap-6 items-center justify-center p-6">
        <span className="flex gap-3 select-none items-center">
          <Image
            src={DeckLogo}
            alt="logo"
            width={200}
            height={200}
            draggable={false}
            className="w-8 h-8 object-contain"
          />
          <p className="text-3xl font-bold font-brand">Deck</p>
        </span>
        {children}
      </div>
    </main>
  );
}
