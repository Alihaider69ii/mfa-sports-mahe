import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '@/config';
import { Category } from '@/lib/types';

interface FooterProps {
  categories: Category[];
}

export function Footer({ categories }: FooterProps) {
  return (
    <footer className="bg-pitch-black border-t border-pitch-border text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-pitch-border">
          {/* Brand & Address Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/img/logo.png"
                alt="MFA Sports Mahe"
                width={150}
                height={45}
                className="object-contain filter brightness-110"
              />
            </Link>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              Authentic football kits, cricket jerseys, player editions, retro collections, and custom team jerseys crafted with pride in Mahe, Kerala.
            </p>

            <div className="space-y-2 pt-1 text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-volt shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-volt shrink-0" />
                <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-volt transition-colors font-medium">
                  {SITE_CONFIG.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-volt shrink-0" />
                <span>{SITE_CONFIG.phoneHours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-volt shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-volt transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE_CONFIG.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-pitch-surface border border-pitch-border hover:border-volt hover:text-volt transition-all text-xs font-semibold text-slate-200"
              >
                <span>Instagram ({SITE_CONFIG.instagram.followers})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com/@mfasports?feature=shared"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-pitch-surface border border-pitch-border hover:border-volt hover:text-volt transition-all text-xs font-semibold text-slate-200"
              >
                <svg className="w-3.5 h-3.5 text-red-500 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>YouTube</span>
              </a>
            </div>
          </div>

          {/* Categories Column 1 */}
          <div>
            <h4 className="text-white font-display font-bold uppercase tracking-wider text-xs mb-3">
              Jersey Categories
            </h4>
            <ul className="space-y-1.5">
              {categories.slice(0, 8).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/c/${cat.slug}`}
                    className="hover:text-volt transition-colors block py-0.5"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column 2 */}
          <div>
            <h4 className="text-white font-display font-bold uppercase tracking-wider text-xs mb-3">
              More Categories
            </h4>
            <ul className="space-y-1.5">
              {categories.slice(8, 16).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/c/${cat.slug}`}
                    className="hover:text-volt transition-colors block py-0.5"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Policies */}
          <div>
            <h4 className="text-white font-display font-bold uppercase tracking-wider text-xs mb-3">
              Help & Policies
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/blogs" className="hover:text-volt transition-colors block py-0.5 text-slate-300 font-medium">
                  Matchday Stories & Blogs
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-volt transition-colors block py-0.5 text-slate-300">
                  User Account Login (+91)
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-volt transition-colors block py-0.5">
                  Return Policy (7 Days)
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-volt transition-colors block py-0.5">
                  Shipping Policy (Free above ₹399)
                </Link>
              </li>
              <li>
                <Link href="/#custom-jerseys" className="hover:text-volt transition-colors block py-0.5">
                  Custom Team Jerseys
                </Link>
              </li>
              <li>
                <Link href="/#bulk-enquiry" className="hover:text-volt transition-colors block py-0.5">
                  Bulk Orders & Quotations
                </Link>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-volt transition-colors flex items-center gap-1 py-0.5 text-slate-300"
                >
                  <span>MFA Sports Live Site</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} MFA Sports Mahe. Fast, Bold Mobile Redesign Demo.</p>
          <p className="text-center sm:text-right">
            Designed for mobile football fans · High-performance Static Generation
          </p>
        </div>
      </div>
    </footer>
  );
}
