'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Phone, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!phone || phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!password) {
      setError('Please enter your account password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess('Redirecting to secure MFA Sports account portal...');
      setTimeout(() => {
        window.open('https://www.mfasportsmahe.com/', '_blank');
        setSuccess('');
      }, 1200);
    }, 800);
  };

  return (
    <div className="min-h-[85vh] bg-pitch-black flex items-center justify-center px-4 py-12 relative">
      <div className="w-full max-w-md bg-pitch-card border border-pitch-border rounded-lg shadow-2xl p-6 sm:p-8 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-volt/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center justify-center p-3 rounded-xl bg-pitch-surface border border-pitch-border mb-3">
            <Image
              src="/img/logo.png"
              alt="MFA Sports Mahe"
              width={140}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-display font-black uppercase text-white tracking-tight">
            Account Login
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
            Enter your number and password to access your account securely.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-display font-bold uppercase text-slate-300 tracking-wider mb-1.5">
              Mobile Number
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 flex items-center gap-1 text-xs font-mono font-bold text-volt border-r border-pitch-border pr-2.5">
                <span>+91</span>
              </span>
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="90746 94968"
                className="w-full pl-16 pr-4 py-3 bg-pitch-surface border border-pitch-border rounded text-white text-sm font-mono placeholder:text-slate-600 focus:outline-none focus:border-volt transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-display font-bold uppercase text-slate-300 tracking-wider">
                Password
              </label>
              <a
                href="https://www.mfasportsmahe.com/password_reset/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-volt hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 bg-pitch-surface border border-pitch-border rounded text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-volt transition-colors"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-2.5 rounded bg-red-950/40 border border-red-800 text-xs text-red-300">
              {error}
            </div>
          )}

          {success && (
            <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded bg-volt hover:bg-volt-hover text-pitch-black font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-volt-glow disabled:opacity-50"
          >
            <span>{loading ? 'Verifying...' : 'Login'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-pitch-border text-center text-xs text-slate-400">
          <span>New to MFA? </span>
          <a
            href="https://www.mfasportsmahe.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-volt font-bold uppercase tracking-wider hover:underline"
          >
            Create an account
          </a>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-gold" />
          <span>Official 256-Bit Encrypted MFA Sports Portal</span>
        </div>
      </div>
    </div>
  );
}
