import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Lock, Unlock, X, AlertCircle, CheckCircle2, KeyRound, RotateCcw } from 'lucide-react';

interface AdminPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditMode: boolean;
  onUnlock: () => void;
  onLock: () => void;
  onResetCache?: () => void;
}

const CORRECT_PIN = '261026';

export const AdminPinModal: React.FC<AdminPinModalProps> = ({
  isOpen,
  onClose,
  isEditMode,
  onUnlock,
  onLock,
  onResetCache,
}) => {
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError(null);
      setSuccess(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pin === CORRECT_PIN) {
      setError(null);
      setSuccess(true);
      setTimeout(() => {
        onUnlock();
        onClose();
      }, 600);
    } else {
      setError('PIN Admin Salah! Masukkan PIN yang valid.');
      setPin('');
      inputRef.current?.focus();
    }
  };

  const handleDigitClick = (digit: string) => {
    if (pin.length < 6) {
      const nextPin = pin + digit;
      setPin(nextPin);
      setError(null);
      if (nextPin.length === 6) {
        if (nextPin === CORRECT_PIN) {
          setError(null);
          setSuccess(true);
          setTimeout(() => {
            onUnlock();
            onClose();
          }, 600);
        } else {
          setError('PIN Admin Salah! Masukkan PIN yang valid.');
          setPin('');
        }
      }
    }
  };

  const handleDeleteDigit = () => {
    setPin((prev) => prev.slice(0, -1));
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-slate-950/95 border border-sky-500/40 p-6 sm:p-8 text-center z-10 space-y-6 shadow-[0_0_60px_rgba(0,112,243,0.35)]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-5 right-5 p-2 rounded-full border border-white/10 hover:border-white/30 text-slate-400 hover:text-white bg-slate-900 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500/20 via-blue-600/30 to-sky-400/20 border border-sky-400/50 flex items-center justify-center shadow-[0_0_30px_rgba(0,112,243,0.3)]">
            {isEditMode ? (
              <Unlock className="w-8 h-8 text-amber-400" />
            ) : (
              <KeyRound className="w-8 h-8 text-sky-400" />
            )}
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold font-['Outfit'] text-white">
            {isEditMode ? 'Status Mode Admin: Aktif' : 'Masukkan PIN Admin'}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
            {isEditMode
              ? 'Mode Edit Global dan Manajemen Foto PKPA sedang aktif. Anda dapat mengunci kembali kapan saja.'
              : 'Fitur tersembunyi khusus pemilik portofolio untuk mengaktifkan pengeditan teks langsung & pengelolaan galeri foto PKPA.'}
          </p>
        </div>

        {isEditMode ? (
          /* Active State actions */
          <div className="space-y-4 pt-2">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Editing teks aktif & tombol foto PKPA terbuka</span>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  onLock();
                  onClose();
                }}
                className="w-full py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.3)]"
              >
                <Lock className="w-4 h-4" />
                <span>Kunci & Keluar Mode Edit</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-full border border-white/20 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
              >
                Tetap Lanjutkan Edit
              </button>

              {onResetCache && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset semua data portofolio ke default awal dan bersihkan cache?')) {
                      onResetCache();
                      onClose();
                    }
                  }}
                  className="w-full py-2 rounded-full border border-amber-500/50 hover:bg-amber-500/20 text-amber-300 text-xs font-mono transition-colors cursor-pointer flex items-center justify-center gap-1.5 mt-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Data ke Default & Bersihkan Cache</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* PIN Input Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 6 Digit Display Indicator */}
            <div className="flex justify-center items-center gap-2.5 sm:gap-3 py-2">
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const filled = pin.length > i;
                return (
                  <div
                    key={i}
                    className={`w-10 h-12 sm:w-11 sm:h-13 rounded-xl border flex items-center justify-center text-xl font-bold font-mono transition-all duration-200 ${
                      filled
                        ? 'border-sky-400 bg-sky-950/80 text-sky-300 shadow-[0_0_12px_rgba(0,112,243,0.4)] scale-105'
                        : 'border-white/20 bg-slate-900/60 text-slate-500'
                    }`}
                  >
                    {filled ? '•' : ''}
                  </div>
                );
              })}
            </div>

            {/* Hidden Input for Native Keyboard */}
            <input
              ref={inputRef}
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={pin}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                setPin(val);
                setError(null);
                if (val.length === 6) {
                  if (val === CORRECT_PIN) {
                    setError(null);
                    setSuccess(true);
                    setTimeout(() => {
                      onUnlock();
                      onClose();
                    }, 600);
                  } else {
                    setError('PIN Admin Salah! Masukkan PIN yang valid.');
                    setPin('');
                  }
                }
              }}
              className="sr-only"
              aria-label="PIN Admin 6 Digit"
            />

            {/* Error Message */}
            {error && (
              <div className="p-2.5 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center justify-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>PIN Benar! Membuka Mode Admin...</span>
              </div>
            )}

            {/* On-screen Numeric Keypad */}
            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto pt-1">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  onClick={() => handleDigitClick(digit)}
                  className="py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-sky-400 text-lg font-bold font-mono text-white transition-all cursor-pointer active:scale-95"
                >
                  {digit}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPin('')}
                className="py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-white/10 text-xs font-mono text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => handleDigitClick('0')}
                className="py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-sky-400 text-lg font-bold font-mono text-white transition-all cursor-pointer active:scale-95"
              >
                0
              </button>
              <button
                type="button"
                onClick={handleDeleteDigit}
                className="py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-white/10 text-xs font-mono text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                Del
              </button>
            </div>

            {/* Hint */}
            <div className="text-[11px] font-mono text-slate-300">
              Kunci Rahasia Admin Terproteksi
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
