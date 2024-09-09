

import Image from "next/image";
import { Minus } from "lucide-react";


export const Banner = () => {
  return (
    <div className="flex flex-col space-y-5 px-4 xl:px-0">
    <h1 className="text-2xl md:text-4xl font-bold">
      Atraskite naujus talentus jūsų darbo vietai
    </h1>
    <div className="flex flex-col space-y-5">
      <div className="relative w-sm md:w-[640px]">
        <q className="tracking-widest  text-sm text-antialiased text-muted-foreground">
          Nėra jokių abejonių, kad naudosiu &apos;manodarbas.lt&apos;
          paslaugas ateityje.Sukurti darbo skelbimą dar niekada nebuvo taip
          lengva ir paprasta.Iškilusias problemas ar klausymus operatyviai
          ir kokybiškai išsprendžianti administracija.
        </q>
      </div>
      <div className="flex items-center justify-start gap-x-2">
        <Minus className="size-7 text-muted-foreground" />

        <span className="relative flex items-center space-x-6 shrink-0 overflow-hidden">
          <Image
            src="/profile.jpg"
            height={60}
            width={60}
            alt="profile"
            className="aspect-square rounded-full"
            quality={80}
            priority
          />
          <p className="text-muted-foreground tracking-widest text-sm text-antialiased">
            Jonas Žiobaras, įkūrėjas @ G2i{" "}
          </p>
        </span>
      </div>
    </div>
  </div>
  )
}
