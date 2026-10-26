import React from 'react';
import { DownloadCloud, FileText, Presentation, Download, CheckCircle2 } from 'lucide-react';
import { downloadsData } from '../data/downloads';

export default function Downloads({ onShowToast }) {
  const handleDownload = (item) => {
    if (item.isPrintTrigger) {
      onShowToast?.(`กำลังเปิดหน้าพิมพ์รายงานฉบับสมบูรณ์ (PDF)...`, 'info');
      setTimeout(() => {
        window.print();
      }, 500);
    } else {
      onShowToast?.(`เริ่มการดาวน์โหลด ${item.title}...`, 'success');
    }
  };

  return (
    <section id="downloads" className="bg-white dark:bg-tech-card rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
      <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-tech-50 dark:bg-slate-800 text-tech-600 dark:text-indigo-400 flex items-center justify-center font-bold">
          <DownloadCloud size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            เอกสารดาวน์โหลดและสไลด์ <span className="text-sm font-normal text-slate-500 dark:text-slate-400 block sm:inline">Downloads & Resources</span>
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500">เอกสารประกอบการสัมมนา รายงานสรุปผลฉบับสมบูรณ์ และสไลด์บรรยาย</p>
        </div>
      </div>

      <div className="space-y-3">
        {downloadsData.map((item) => (
          <div 
            key={item.id} 
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 hover:border-tech-400 dark:hover:border-indigo-500 transition shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                item.color === 'rose' 
                  ? 'bg-rose-500/10 text-rose-500 dark:bg-rose-950/50' 
                  : 'bg-amber-500/10 text-amber-500 dark:bg-amber-950/50'
              }`}>
                {item.color === 'rose' ? <FileText size={24} /> : <Presentation size={24} />}
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            </div>

            <button 
              onClick={() => handleDownload(item)}
              className="bg-tech-600 hover:bg-tech-700 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-md shadow-tech-600/20 transition flex items-center justify-center gap-2 shrink-0 group"
            >
              <Download size={16} className="group-hover:-translate-y-0.5 transition-transform" />
              <span>{item.isPrintTrigger ? 'พิมพ์ / บันทึก PDF' : 'ดาวน์โหลดไฟล์'}</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
