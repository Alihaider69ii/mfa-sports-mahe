import { ExternalLink, Sparkles, Check } from 'lucide-react';
import { SITE_CONFIG } from '@/config';
import { EnquiryForm } from './EnquiryForm';

export function CustomJerseySection() {
  return (
    <section id="custom-jerseys" className="py-12 bg-pitch-dark relative overflow-hidden border-t border-pitch-border">
      {/* Stadium backdrop subtle glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-volt/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Custom Jersey CTA & Features */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-volt/10 border border-volt/30 text-volt text-xs font-display uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Sublimation & Embroidery</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-white leading-tight">
              Customize Your <span className="text-volt">Dream Jersey</span> Today
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Design customized kits for your local football club, sevens tournament, cricket league, or college batch. High-grade dotknit fabrics, durable sublimation, and premium collar finishes tailored in Mahe, Kerala.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-pitch-surface border border-volt/40 flex items-center justify-center text-volt shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Player names, custom kit numbers & club emblems</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-pitch-surface border border-volt/40 flex items-center justify-center text-volt shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Choice of 5-Sleeves, Full Sleeves, Mandarin or V-Collars</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-pitch-surface border border-volt/40 flex items-center justify-center text-volt shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Bulk pricing with fast door delivery across India</span>
              </div>
            </div>

            {/* Direct Link to Live Custom Jersey Configurator */}
            <div className="pt-2">
              <a
                href={SITE_CONFIG.customJerseyLiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xs bg-volt hover:bg-volt-hover text-pitch-black font-display font-black text-sm uppercase tracking-wider transition-all transform hover:scale-[1.02] shadow-volt-glow"
              >
                <span>Open Custom Jersey Studio on MFA Sports</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-[11px] text-slate-400 mt-2">
                Deep-links directly to the live custom jersey catalog on mfasportsmahe.com
              </p>
            </div>
          </div>

          {/* Right Column: Bulk Enquiry Form */}
          <div id="bulk-enquiry" className="lg:col-span-7">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
