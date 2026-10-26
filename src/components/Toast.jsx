import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success' || !toast.type;
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-md">
      <div className={`px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border transition-all ${
        isSuccess 
          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-700 dark:border-slate-200' 
          : isError
          ? 'bg-rose-900 text-white border-rose-700'
          : 'bg-slate-800 text-white border-slate-700'
      }`}>
        {isSuccess && <CheckCircle size={20} className="text-emerald-400 shrink-0" />}
        {isError && <AlertCircle size={20} className="text-rose-400 shrink-0" />}
        {!isSuccess && !isError && <Info size={20} className="text-tech-400 shrink-0" />}
        
        <span className="text-sm font-medium leading-snug">{toast.message}</span>
        
        {onClose && (
          <button 
            onClick={onClose} 
            className="ml-2 text-slate-400 hover:text-white dark:hover:text-slate-900 p-1 rounded-lg"
            aria-label="ปิดการแจ้งเตือน"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
