"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
interface Props {
  items: {
    title: String;
    path: any;
    icon: any;
  };
}

const MenuLink: FC<Props> = ({ items }) => {
  const pathname = usePathname();
  return (
    <Link
      className={`text-primary-text flex mt-2 items-center p-4 rounded-2xl hover:bg-primary text-sm hover:text-primary-bodytext ${
        pathname === items.path ? "bg-primary text-[#ffffff]" : ""
      }`} // tailwind global config is overwritten so setting the colour manually
      href={items.path}
    >
      {items.icon}
      <div className="w-2"></div>
      {items.title}
    </Link>
  );
};

export default MenuLink;
