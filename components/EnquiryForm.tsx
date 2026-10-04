'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    teamOrDesign: '',
    quantity: '15',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry.');
      }

      setSuccessMsg(data.message || 'Enquiry submitted successfully!');
      setFormData({
        name: '',
        phone: '',
        city: '',
        teamOrDesign: '',
        quantity: '15',
        message: '',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-pitch-card p-6 sm:p-8 rounded border border-pitch-border shadow-pitch-card">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-display font-extrabold uppercase tracking-wide text-white">
          Team & Bulk Order Enquiry
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Custom team kits, tournament batches, or corporate orders. We will get back with factory mockups and quotes.
        </p>
      </div>

      {successMsg ? (
        <div className="p-4 rounded bg-pitch-surface border border-volt text-slate-100 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-volt shrink-0 mt-0.5" />
          <div>
            <h4 className="font-display font-bold text-sm uppercase text-volt">Enquiry Received</h4>
            <p className="text-xs text-slate-300 mt-1">{successMsg}</p>
            <button
              onClick={() => setSuccessMsg('')}
              className="mt-3 text-xs font-bold uppercase text-volt hover:underline"
            >
              Submit another request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {errorMsg && (
            <div className="p-3 rounded bg-red-950/60 border border-red-500/50 text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul K"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-pitch-surface border border-pitch-border rounded-xs px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-volt transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                WhatsApp / Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-pitch-surface border border-pitch-border rounded-xs px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-volt transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                City / Location *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Mahe / Kozhikode"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-pitch-surface border border-pitch-border rounded-xs px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-volt transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                Team or Design *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Red Devils FC / Dotknit"
                value={formData.teamOrDesign}
                onChange={(e) => setFormData({ ...formData, teamOrDesign: e.target.value })}
                className="w-full bg-pitch-surface border border-pitch-border rounded-xs px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-volt transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                Quantity (Pieces) *
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full bg-pitch-surface border border-pitch-border rounded-xs px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-volt transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
              Design Requirements / Collar Type / Notes
            </label>
            <textarea
              rows={3}
              placeholder="Tell us about collar style (Mandarin/V-Neck), sleeve type (5-Sleeves/Full), sponsor prints, or custom player names..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-pitch-surface border border-pitch-border rounded-xs px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-volt transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xs bg-volt hover:bg-volt-hover text-pitch-black font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending Enquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Bulk Order Enquiry</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
