import { Mail, MapPin, Phone, Zap } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4 lg:py-14">
          <div className="lg:col-span-1">
            <Link href="/" className="mb-5 inline-flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-slate-950">
                <Zap className="h-6 w-6 fill-current" strokeWidth={2.5} />
              </span>

              <div className="leading-none">
                <p className="text-lg font-extrabold tracking-tight text-white">
                  Power<span className="text-amber-400">Grid</span>
                </p>
                <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Load Management
                </p>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-6 text-slate-400">
              A smart power outage management platform designed to monitor
              outages, manage load shedding schedules, and keep customers
              informed.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Link
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 transition-colors hover:border-slate-700 hover:bg-slate-900 hover:text-white"
              >
                <FaFacebook className="h-4 w-4" />
              </Link>

              <Link
                href="#"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 transition-colors hover:border-slate-700 hover:bg-slate-900 hover:text-white"
              >
                <FaGithub className="h-4 w-4" />
              </Link>

              <Link
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 transition-colors hover:border-slate-700 hover:bg-slate-900 hover:text-white"
              >
                <FaLinkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Platform
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-amber-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/outages"
                  className="transition-colors hover:text-amber-400"
                >
                  Outages
                </Link>
              </li>

              <li>
                <Link
                  href="/schedules"
                  className="transition-colors hover:text-amber-400"
                >
                  Load Shedding Schedule
                </Link>
              </li>

              <li>
                <Link
                  href="/reports"
                  className="transition-colors hover:text-amber-400"
                >
                  Reports
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="transition-colors hover:text-amber-400"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Support
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/help"
                  className="transition-colors hover:text-amber-400"
                >
                  Help Center
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-amber-400"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-amber-400"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-amber-400"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span className="text-slate-400">
                  Chandpur, Chattogram
                  <br />
                  Bangladesh
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-amber-400" />
                <a
                  href="mailto:support@powergrid.com"
                  className="transition-colors hover:text-white"
                >
                  support@powergrid.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-amber-400" />
                <a
                  href="tel:+8801000000000"
                  className="transition-colors hover:text-white"
                >
                  +880 1000-000000
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800" />

        <div className="flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate-500">
            © {new Date().getFullYear()} PowerGrid. All rights reserved.
          </p>

          <p className="text-slate-500">Smart Power Management System</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
