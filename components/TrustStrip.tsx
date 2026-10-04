import { Truck, ShieldCheck, Lock, Users } from 'lucide-react';
import { SITE_CONFIG } from '@/config';

export function TrustStrip() {
  return (
    <section className="py-8 bg-pitch-surface/60 border-y border-pitch-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* Free delivery */}
          <div className="flex items-start gap-3 p-3 bg-pitch-card/60 rounded border border-pitch-border/50">
            <div className="p-2 rounded bg-pitch-dark text-volt shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-display uppercase tracking-wide font-bold text-white">
                Free Delivery Above ₹{SITE_CONFIG.freeDeliveryThreshold}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                All over India dispatch within 2 business days.
              </p>
            </div>
          </div>

          {/* 7 Days Return */}
          <div className="flex items-start gap-3 p-3 bg-pitch-card/60 rounded border border-pitch-border/50">
            <div className="p-2 rounded bg-pitch-dark text-gold shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-display uppercase tracking-wide font-bold text-white">
                {SITE_CONFIG.returnWindowDays}-Day Return
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Eligible if goods have manufacturing defects.
              </p>
            </div>
          </div>

          {/* Secure Payment & Support */}
          <div className="flex items-start gap-3 p-3 bg-pitch-card/60 rounded border border-pitch-border/50">
            <div className="p-2 rounded bg-pitch-dark text-volt shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-display uppercase tracking-wide font-bold text-white">
                Secure Live Orders
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Deep-linked directly to official MFA Sports.
              </p>
            </div>
          </div>

          {/* Real Customer Count Claim */}
          <div className="flex items-start gap-3 p-3 bg-pitch-card/60 rounded border border-pitch-border/50">
            <div className="p-2 rounded bg-pitch-dark text-gold shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-display uppercase tracking-wide font-bold text-white">
                {SITE_CONFIG.customerCountClaim}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Kerala&apos;s favourite custom & football jersey hub.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
