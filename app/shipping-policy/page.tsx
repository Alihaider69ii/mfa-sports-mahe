import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Truck, CheckCircle, ArrowLeft, Clock } from 'lucide-react';
import { getPolicies } from '@/lib/data';
import { SITE_CONFIG } from '@/config';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy | MFA Sports Mahe',
  description: 'Shipping timelines and free delivery details for MFA Sports Mahe Kerala.',
};

export default function ShippingPolicyPage() {
  const policies = getPolicies();
  const policy = policies.shippingPolicy;

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
            <div className="p-2.5 rounded bg-pitch-surface text-volt border border-pitch-border">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
                {policy.title || 'Shipping Policy'}
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Fast Pan-India Dispatch from Mahe, Kerala
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p className="bg-pitch-surface/60 p-4 rounded border border-pitch-border/60">
              {policy.content ||
                'All non-customized products will be dispatched within 2 business days of placing your order. Free delivery is provided across India for all orders above Rs 399.'}
            </p>

            <h3 className="text-sm font-display font-bold uppercase tracking-wider text-volt pt-2">
              Dispatch & Delivery Highlights
            </h3>
            <ul className="space-y-2.5">
              {policy.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle className="w-4 h-4 text-volt shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded bg-pitch-surface border border-pitch-border">
                <div className="flex items-center gap-2 text-volt font-display font-bold text-xs uppercase mb-1">
                  <Clock className="w-4 h-4" />
                  <span>Dispatch Schedule</span>
                </div>
                <p className="text-xs text-slate-300">
                  Orders dispatched Mon–Sat within 48 hours. Custom printed jerseys take 3–5 working days for production.
                </p>
              </div>

              <div className="p-4 rounded bg-pitch-surface border border-pitch-border">
                <div className="flex items-center gap-2 text-gold font-display font-bold text-xs uppercase mb-1">
                  <Truck className="w-4 h-4" />
                  <span>Free Shipping Threshold</span>
                </div>
                <p className="text-xs text-slate-300">
                  Automatic free shipping applied on all orders valuing ₹{SITE_CONFIG.freeDeliveryThreshold} or higher.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
