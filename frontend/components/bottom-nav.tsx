"use client";

import { Flag, TrendingUp, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type ItemNav = {
  href: string;
  label: string;
  ikon: ReactNode;
  aktif: (path: string) => boolean;
};

const ITEM_NAV: ItemNav[] = [
  {
    href: "/",
    label: "Target",
    ikon: <Flag size={20} aria-hidden />,
    aktif: (path) =>
      path === "/" || path.startsWith("/latihan") || path.startsWith("/makanan"),
  },
  {
    href: "/progres",
    label: "Progress",
    ikon: <TrendingUp size={20} aria-hidden />,
    aktif: (path) => path.startsWith("/progres"),
  },
  {
    href: "/profil",
    label: "Profile",
    ikon: <User size={20} aria-hidden />,
    aktif: (path) => path.startsWith("/profil"),
  },
];

export function BottomNav() {
  const path = usePathname();

  return (
    <nav className="nav-bawah" aria-label="Navigasi utama">
      {ITEM_NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="nav-bawah__tautan"
          aria-current={item.aktif(path) ? "page" : undefined}
        >
          {item.ikon}
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
