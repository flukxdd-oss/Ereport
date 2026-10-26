import React from 'react';
import { Clock, CheckCircle2, Coffee, Presentation, Cpu, Gamepad2, UserCheck } from 'lucide-react';
import { scheduleData } from '../data/schedule';

export default function Schedule() {
  const getTimelineIcon = (iconName) => {
    switch (iconName) {
      case 'clipboard-check': return <UserCheck size={16} />;
      case 'cpu': return <Cpu size={16} />;
      case 'presentation': return <Presentation size={16} />;
      case 'coffee': return <Coffee size={16} />;
      case 'gamepad': return <Gamepad2 size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <section id="schedule" className="bg-white dark:bg-tech-card rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 transition-colors">
      <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-tech-50 dark:bg-slate-800 text-tech-600 dark:text-indigo-400 flex items-center justify-center font-bold">
          <Clock size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            กำหนดการจัดสัมมนา <span className="text-sm font-normal text-slate-500 dark:text-slate-400 block sm:inline">Event Schedule</span>
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500">กำหนดการตลอดวันสัมมนา วันที่ 15 มีนาคม 2569 ณ หอประชุมคณะวิทยาศาสตร์</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-7 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
        {scheduleData.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline bullet dot */}
            <div className="absolute -left-6 sm:-left-8 top-1.5 w-5 h-5 rounded-full bg-tech-600 border-4 border-white dark:border-tech-card shadow group-hover:scale-125 transition-transform flex items-center justify-center">
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-2 hover:border-tech-400 dark:hover:border-tech-600 transition shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-tech-100 dark:bg-slate-700 text-tech-700 dark:text-indigo-300 inline-flex items-center gap-1.5">
                  <Clock size={12} />
                  <span>{item.time}</span>
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300 flex items-center gap-1">
                  {getTimelineIcon(item.icon)}
                  <span>{item.badge}</span>
                </span>
              </div>

              <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                {item.title}
              </h3>
              
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
