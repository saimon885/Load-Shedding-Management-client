"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import {
  User,
  LogOut,
  Settings,
  HelpCircle,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import LogOutUser from "./LogOut";
import { UsegetMeHook } from "@/hooks/profile.hook";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/outage", label: "outage" },
  { href: "/about", label: "About Us" },
];

const MENU_ITEMS = [
  { href: "/profile", label: "My Profile", icon: User },
  { href: "/dashboard", label: "Dashbooard", icon: LayoutDashboard },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data, isLoading } = UsegetMeHook();

  console.log(data);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = data?.data;
  const isLoggedIn = !!user;
  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close everything on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Shadow only after scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus when the route changes
  useEffect(() => {
    if (pathname) {
    }
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  // if (!data) {
  //   return null;
  // }
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-shadow duration-200 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81] ${
                    active
                      ? "text-[#0F4C81] dark:text-sky-400"
                      : "text-slate-700 dark:text-slate-200 hover:text-[#0F4C81] dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute left-3 right-3 -bottom-[13px] h-0.5 rounded-full bg-[#0F4C81] dark:bg-sky-400" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isLoading ? (
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
            ) : isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={isDropdownOpen}
                  onClick={() => setIsDropdownOpen((v) => !v)}
                  className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]"
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0F4C81] dark:bg-sky-500 text-white text-sm font-semibold">
                    {user?.profile ? (
                      <Image
                        src={user?.profile?.profileImage || ""}
                        alt={user?.name || "Profile"}
                        width={112}
                        height={112}
                        className="rounded-full"
                      />
                    ) : (
                      <>{initial}</>
                    )}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`hidden sm:block text-slate-500 dark:text-slate-400 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-60 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-50"
                  >
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {user?.email}
                      </p>
                    </div>

                    {MENU_ITEMS.map(({ href, label, icon: Icon }) => (
                      <Link
                        key={href}
                        href={href}
                        role="menuitem"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                      >
                        <Icon size={16} />
                        <span>{label}</span>
                      </Link>
                    ))}

                    <div className="border-t border-slate-100 dark:border-slate-700 mt-1 pt-1">
                      <LogOutUser></LogOutUser>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#0F4C81] hover:bg-[#0A365C] dark:bg-sky-500 dark:hover:bg-sky-600 transition"
                >
                  Get started
                </Link>
              </div>
            )}

            {/* Mobile toggle */}
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-[#0F4C81] dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 space-y-1 shadow-lg z-40">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`block px-3 py-2 rounded-md text-base font-medium transition ${
                  active
                    ? "bg-slate-100 dark:bg-slate-800 text-[#0F4C81] dark:text-sky-400"
                    : "text-slate-700 dark:text-slate-200 hover:text-[#0F4C81] dark:hover:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {!isLoading && !isLoggedIn && (
            <div className="grid grid-cols-2 gap-2 pt-3 mt-2 border-t border-slate-100 dark:border-slate-800">
              <Link
                href="/login"
                className="text-center px-4 py-2 rounded-lg text-sm font-medium border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="text-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#0F4C81] dark:bg-sky-500"
              >
                Get started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
