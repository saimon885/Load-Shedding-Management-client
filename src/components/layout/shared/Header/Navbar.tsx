"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ActiveLink from "./ActiveLink";
import Logo from "./Logo";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Outages",
    children: [
      {
        label: "All Outages",
        href: "/outages",
      },
      {
        label: "Report Outage",
        href: "/outages/report",
      },
    ],
  },
  {
    label: "Schedules",
    children: [
      {
        label: "Load Shedding",
        href: "/schedules",
      },
      {
        label: "Upcoming",
        href: "/schedules/upcoming",
      },
    ],
  },
  {
    label: "Reports",
    href: "/reports",
  },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setDropdownOpen((current) => (current === label ? null : label));
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setDropdownOpen(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <div className="hidden lg:flex lg:items-center">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.label} className="relative">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleDropdown(item.label)}
                      className="flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-accent hover:text-accent-foreground dark:text-slate-300"
                    >
                      {item.label}

                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          dropdownOpen === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {dropdownOpen === item.label && (
                      <div className="absolute left-0 top-full z-50 mt-2 w-48 rounded-lg border bg-background p-1.5 shadow-lg">
                        {item.children.map((child) => (
                          <ActiveLink
                            key={child.href}
                            href={child.href}
                            onClick={() => setDropdownOpen(null)}
                            className="block rounded-md px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-accent hover:text-accent-foreground dark:text-slate-300"
                            activeClassName="bg-accent text-blue-600 dark:text-sky-400"
                          >
                            {child.label}
                          </ActiveLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <ActiveLink
                    href={item.href}
                    className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-accent hover:text-accent-foreground dark:text-slate-300"
                    activeClassName="bg-accent text-blue-600 dark:text-sky-400"
                  >
                    {item.label}
                  </ActiveLink>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button size={"lg"} variant={"destructive"}>
            <Link href="/login" onClick={closeMobileMenu}>
              Login
            </Link>
          </Button>

          <Button size={"lg"} variant={"outline"}>
            <Link href="/dashboard" onClick={closeMobileMenu}>
              Dashboard
            </Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t bg-background lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        onClick={() => toggleDropdown(item.label)}
                        className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-accent hover:text-accent-foreground dark:text-slate-300"
                      >
                        {item.label}

                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            dropdownOpen === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {dropdownOpen === item.label && (
                        <div className="ml-3 mt-1 border-l pl-3">
                          {item.children.map((child) => (
                            <ActiveLink
                              key={child.href}
                              href={child.href}
                              onClick={closeMobileMenu}
                              className="block rounded-md px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-accent hover:text-accent-foreground dark:text-slate-300"
                              activeClassName="bg-accent text-blue-600 dark:text-sky-400"
                            >
                              {child.label}
                            </ActiveLink>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <ActiveLink
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="block rounded-md px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-accent hover:text-accent-foreground dark:text-slate-300"
                      activeClassName="bg-accent text-blue-600 dark:text-sky-400"
                    >
                      {item.label}
                    </ActiveLink>
                  )}
                </li>
              ))}

              <li className="mt-2 border-t pt-3">
                <Button size={"lg"} variant={"destructive"}>
                  <Link href="/login" onClick={closeMobileMenu}>
                    Login
                  </Link>
                </Button>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  onClick={closeMobileMenu}
                  className="flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
