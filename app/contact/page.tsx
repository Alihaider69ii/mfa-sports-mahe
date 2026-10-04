import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Phone, Mail, MapPin, ArrowLeft } from 'lucide-react';
import { SITE_CONFIG } from '@/config';
import { EnquiryForm } from '@/components/EnquiryForm';

export const metadata: Metadata = {
  title: 'Contact Us | MFA Sports Mahe',
  description: 'Reach MFA Sports Mahe Kerala for football jerseys, bulk team orders, and customer queries.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-pitch-black py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-slate-400 hover:text-volt transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Store</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Real Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-pitch-card border border-pitch-border rounded p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs font-display uppercase tracking-widest font-bold text-volt">
                  Official Store Contact
                </span>
                <h1 className="text-3xl sm:text-4xl font-display font-black uppercase text-white mt-1">
                  Get in Touch
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                  Have questions about sizes, ongoing offers, or custom club prints? Reach out via phone, email, or visit our store in Mahe.
                </p>
              </div>

              <div className="space-y-4 pt-2 text-sm text-slate-200">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-pitch-surface text-volt shrink-0 mt-0.5 border border-pitch-border">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold uppercase text-xs text-slate-400">Store Address</h4>
                    <p className="font-medium text-white">{SITE_CONFIG.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-pitch-surface text-volt shrink-0 mt-0.5 border border-pitch-border">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold uppercase text-xs text-slate-400">Phone Support</h4>
                    <a href={`tel:${SITE_CONFIG.phone}`} className="font-medium text-volt hover:underline">
                      {SITE_CONFIG.phoneFormatted}
                    </a>
                    <p className="text-[11px] text-slate-400">{SITE_CONFIG.phoneHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-pitch-surface text-volt shrink-0 mt-0.5 border border-pitch-border">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold uppercase text-xs text-slate-400">Email Address</h4>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="font-medium text-white hover:text-volt">
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
