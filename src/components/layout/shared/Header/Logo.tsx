import Link from "next/link";
import { Zap, ShieldCheck } from "lucide-react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 ${className}`}
      aria-label="Load Shedding Management System"
    >
      <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-slate-950 shadow-sm">
        <span className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-transparent to-cyan-400/20" />

        <Zap
          size={25}
          strokeWidth={2.8}
          className="relative z-10 fill-amber-400 text-amber-400"
        />

        <span className="absolute bottom-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-slate-950">
          <ShieldCheck size={8} strokeWidth={3} className="text-white" />
        </span>
      </span>

      {showText && (
        <span className="flex flex-col leading-none">
          <span className="text-[17px] font-extrabold tracking-tight text-slate-900">
            Power<span className="text-amber-500">Grid</span>
          </span>

          <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Load Management
          </span>
        </span>
      )}
    </Link>
  );
}
