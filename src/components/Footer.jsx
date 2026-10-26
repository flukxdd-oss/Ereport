import React from 'react';
import { ArrowUp, Printer, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-10 mt-20 no-print transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 dark:text-slate-400">
        
        <div className="space-y-1 text-center sm:text-left">
          <p className="font-medium text-slate-700 dark:text-slate-300">
            &copy; 2026 Computer Science Academic Seminar E-Report. All rights reserved.
          </p>
          <p className="flex items-center justify-center sm:justify-start gap-1">
            ภาควิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์และเทคโนโลยี • พัฒนาด้วย <Heart size={13} className="text-rose-500 fill-rose-500 inline" /> โดยคณะนักศึกษาชั้นปีที่ 4
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-tech-600 dark:hover:text-indigo-400 transition py-1 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowUp size={14} />
            <span>กลับสู่ด้านบน</span>
          </button>
          <span>•</span>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 hover:text-tech-600 dark:hover:text-indigo-400 transition py-1 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Printer size={14} />
            <span>พิมพ์รายงานเป็น PDF</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
