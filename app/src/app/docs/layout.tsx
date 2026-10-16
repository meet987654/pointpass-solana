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
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 bg-[#09090b]">
      {/* Mobile Nav Toggle */}
      <div className="md:hidden mb-6 flex items-center justify-between p-3.5 rounded-[4px] render-card border border-[#222228]">
        <span className="text-xs font-mono uppercase tracking-wider text-[#a1a1aa]">Documentation</span>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="px-3 py-1 rounded-[4px] bg-white text-black text-xs font-medium cursor-pointer"
        >
          {mobileMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside
          className={`w-full md:w-60 shrink-0 ${
            mobileMenuOpen ? "block" : "hidden md:block"
          }`}
        >
          <div className="sticky top-24 space-y-7">
            {navSections.map((sec) => (
              <div key={sec.title} className="space-y-2">
                <h3 className="text-[11px] font-mono font-semibold tracking-wider text-[#71717a]">
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
                          className={`block px-2.5 py-1.5 rounded-[4px] text-xs font-normal transition-colors ${
                            isActive
                              ? "bg-[#18181b] text-white font-medium border-l-2 border-purple-500"
                              : "text-[#a1a1aa] hover:text-white"
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

            <div className="p-3.5 render-card-subtle space-y-1.5">
              <span className="text-[11px] font-mono uppercase text-[#71717a] block">Program ID</span>
              <code className="text-[11px] font-mono text-purple-300 block break-all">
                E46pY2xe8ZHeVjuxiHac4Mctey7rwLP8ZAWasMU7ykUg
              </code>
            </div>
          </div>
        </aside>

        {/* Main Doc Content */}
        <article className="flex-1 min-w-0 max-w-3xl">{children}</article>
      </div>
    </div>
  );
}
