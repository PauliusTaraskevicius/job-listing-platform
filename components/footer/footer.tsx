import Link from "next/link";

import { LuBriefcaseBusiness } from "react-icons/lu";
import { Categories } from "./categories";
import { Cities } from "./cities";

import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { Button } from "../ui/button";
import { getCategories } from "@/actions/category";
import { getCities } from "@/actions/city";

const socials = [
  {
    icon: <FaXTwitter className="size-4" />,
    href: "",
  },
  {
    icon: <FaLinkedin className="size-4" />,
    href: "",
  },
  {
    icon: <FaFacebook className="size-4" />,
    href: "",
  },
];

const Footer = async () => {
  const categories = await getCategories();
  const cities = await getCities();

  const currentDate = new Date().getFullYear();

  return (
    <footer className="bottom-0 flex w-full flex-col justify-between gap-8 border-t-2 px-2 py-6 sm:px-4 sm:py-12 md:flex-row lg:px-36">
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-1 cursor-pointer">
            <LuBriefcaseBusiness className="size-11 text-neutral-950 dark:text-white" />
            DarbasMan
          </Link>
          <p className="text-sm tracking-tight">
            Rask darbo pasiūlymą savo mieste jau šiandien
          </p>
          <p className="text-sm tracking-wide text-muted-foreground">
            {currentDate} Darbas man
          </p>
          <Link
            href="#"
            className="text-sm tracking-tight text-muted-foreground"
          >
            Talpinti skelbimą
          </Link>

          <div className="flex gap-2 my-4">
            {socials.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  className="rounded-full border-2"
                  size="icon"
                  variant="outline"
                >
                  {item.icon}
                </Button>
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <Link href="#">
              <p className="w-fit text-sm text-muted-foreground">Sąlygos</p>
            </Link>
            <Link href="#">
              <p className="w-fit text-sm text-muted-foreground">
                Privatumo politika
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex gap-10">
        <div className="flex flex-col space-y-3">
          <h6 className="text-lg">Kategorijos</h6>
          <Categories categories={categories.data} />
        </div>

        <div className="flex flex-col space-y-3">
          <h6 className="text-lg">Miestai</h6>
          <Cities cities={cities.data} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
