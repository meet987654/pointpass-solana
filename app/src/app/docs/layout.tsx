"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navSections = [
  {
    title: "GETTING STARTED",
    links: [
      { href: "/docs", label: "Protocol Overview" },
    ],
  },
  {
    title: "SOLANA ARCHITECTURE",
    links: [
      { href: "/docs/pda", label: "PDA Seed Derivation" },
      { href: "/docs/cpi", label: "CPI & Token Minting" },
      { href: "/docs/receipts", label: "Proof-of-Burn Receipts" },
      { href: "/docs/security", label: "Security & Invariants" },
    ],
  },
  {
    title: "DEVELOPER REFERENCE",
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
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 bg-[#050814]">
      {/* Mobile Nav Toggle */}
      <div className="md:hidden mb-6 flex items-center justify-between p-4 rounded-2xl glass-card">
        <span className="text-xs font-mono uppercase tracking-wider text-blue-200/80">Documentation</span>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="btn-glass-primary text-xs py-1.5 px-4 cursor-pointer"
        >
          {mobileMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside
          className={`w-full md:w-64 shrink-0 ${
            mobileMenuOpen ? "block" : "hidden md:block"
          }`}
        >
          <div className="sticky top-28 space-y-7 glass-card p-6">
            {navSections.map((sec) => (
              <div key={sec.title} className="space-y-2.5">
                <h3 className="text-[11px] font-mono font-semibold tracking-wider text-[#67baf4]">
                  {sec.title}
                </h3>
                <ul className="space-y-1.5">
                  {sec.links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block px-3 py-1.5 rounded-full text-xs font-normal transition-all ${
                            isActive
                              ? "bg-white text-[#050814] font-medium shadow-[0_0_16px_rgba(103,186,244,0.4)]"
                              : "text-blue-100/70 hover:text-white hover:bg-white/5"
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

            <div className="p-4 rounded-xl bg-[#08122a]/50 border border-white/10 space-y-1.5 font-mono text-[11px]">
              <span className="uppercase text-blue-200/60 block">Program ID</span>
              <code className="text-[#67baf4] block break-all font-medium">
                E46pY2xe8ZHeVjuxiHac4Mctey7rwLP8ZAWasMU7ykUg
              </code>
            </div>
          </div>
        </aside>

        {/* Main Doc Content */}
        <article className="flex-1 min-w-0 max-w-3xl glass-card p-8 sm:p-10">{children}</article>
      </div>
    </div>
  );
}
