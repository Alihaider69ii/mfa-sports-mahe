import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck, CheckCircle, ArrowLeft } from 'lucide-react';
import { getPolicies } from '@/lib/data';
import { SITE_CONFIG } from '@/config';

export const metadata: Metadata = {
  title: 'Return Policy | MFA Sports Mahe',
  description: 'Official return and replacement policy of MFA Sports Mahe Kerala.',
};

export default function ReturnPolicyPage() {
  const policies = getPolicies();
  const policy = policies.returnPolicy;

  return (
    <div className="min-h-screen bg-pitch-black py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-slate-400 hover:text-volt transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Store</span>
        </Link>

        <div className="bg-pitch-card border border-pitch-border rounded p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3 border-b border-pitch-border pb-4">
            <div className="p-2.5 rounded bg-pitch-surface text-gold border border-pitch-border">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
                {policy.title || 'Return Policy'}
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                MFA Sports Mahe · Customer Satisfaction Assurance
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p className="bg-pitch-surface/60 p-4 rounded border border-pitch-border/60">
              {policy.content ||
                'Customers have the right to return a product if it is delivered in a damaged condition. To initiate the return, please reach out to customer care within 7 days of receiving your order.'}
            </p>

            <h3 className="text-sm font-display font-bold uppercase tracking-wider text-volt pt-2">
              Key Return Guidelines
            </h3>
            <ul className="space-y-2.5">
              {policy.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle className="w-4 h-4 text-volt shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-pitch-border">
              <h4 className="text-xs font-display font-bold uppercase tracking-wider text-white mb-2">
                Need Support with an Order?
              </h4>
              <p className="text-xs text-slate-400">
                Contact our customer support team directly at{' '}
                <a href={`tel:${SITE_CONFIG.phone}`} className="text-volt font-bold underline">
                  {SITE_CONFIG.phoneFormatted}
                </a>{' '}
                ({SITE_CONFIG.phoneHours}) or email{' '}
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-volt underline">
                  {SITE_CONFIG.email}
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
