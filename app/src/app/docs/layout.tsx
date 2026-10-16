"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navSections = [
  {
    title: "Getting Started",
    links: [
      { href: "/docs", label: "Protocol Overview" },
    ],
  },
  {
    title: "Solana Architecture",
    links: [
      { href: "/docs/pda", label: "PDA Seed Derivation" },
      { href: "/docs/cpi", label: "CPI & Token Minting" },
      { href: "/docs/receipts", label: "Proof-of-Burn Receipts" },
      { href: "/docs/security", label: "Security & Invariants" },
    ],
  },
  {
    title: "Developer Reference",
    links: [
      { href: "/docs/sdk", label: "TypeScript Client SDK" },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Mobile Nav Toggle */}
      <div className="md:hidden mb-6 flex items-center justify-between p-4 rounded-xl glass-panel">
        <span className="text-sm font-semibold text-neutral-300">Documentation Menu</span>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="px-3 py-1.5 rounded-lg bg-white/[0.08] text-xs font-semibold text-white"
        >
          {mobileMenuOpen ? "Close Menu" : "Browse Docs"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar */}
        <aside
          className={`w-full md:w-64 shrink-0 ${
            mobileMenuOpen ? "block" : "hidden md:block"
          }`}
        >
          <div className="sticky top-24 space-y-8">
            {navSections.map((sec) => (
              <div key={sec.title} className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-mono">
                  {sec.title}
                </h3>
                <ul className="space-y-1">
                  {sec.links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block px-3 py-2 rounded-xl text-sm transition-all ${
                            isActive
                              ? "bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20"
                              : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            <div className="p-4 rounded-2xl glass-panel border border-white/[0.08] space-y-2">
              <span className="text-xs font-bold text-white block">Canonical Devnet ID</span>
              <code className="text-[11px] font-mono text-emerald-400 block break-all">
                E46pY2xe8ZHeVjuxiHac4Mctey7rwLP8ZAWasMU7ykUg
              </code>
            </div>
          </div>
        </aside>

        {/* Main Doc Content */}
        <article className="flex-1 min-w-0 max-w-4xl">{children}</article>
      </div>
    </div>
  );
}
