import React from 'react';
import { BookOpen, Cpu, Layers, Sparkles, UserCheck } from 'lucide-react';
import { sessionsData } from '../data/sessions';

export default function ContentSessions() {
  const session1 = sessionsData[0];
  const session2 = sessionsData[1];

  return (
    <section id="content" className="bg-white dark:bg-tech-card rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 transition-colors">
      <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-tech-50 dark:bg-slate-800 text-tech-600 dark:text-indigo-400 flex items-center justify-center font-bold">
          <BookOpen size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            เนื้อหาสัมมนาและเซสชัน <span className="text-sm font-normal text-slate-500 dark:text-slate-400 block sm:inline">Seminar Sessions</span>
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500">หัวข้อบรรยายเชิงวิชาการและการนำเสนอโครงงานวิจัยระดับปริญญาตรี</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Session 1 Card */}
        <div className="bg-slate-50 dark:bg-slate-800/40 p-6 sm:p-7 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-5 flex flex-col justify-between hover:shadow-card transition">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-tech-100 dark:bg-tech-950/70 text-tech-700 dark:text-indigo-300 border border-tech-200 dark:border-tech-800">
                {session1.sessionNumber}
              </span>
              <div className="w-9 h-9 rounded-xl bg-tech-100 dark:bg-slate-700 text-tech-600 dark:text-indigo-400 flex items-center justify-center">
                <Cpu size={20} />
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {session1.title}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              {session1.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {session1.tags.map((tag, i) => (
                <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-600/60">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <div className="text-xs font-bold text-tech-700 dark:text-indigo-300 flex items-center gap-1.5">
              <UserCheck size={14} />
              <span>วิทยากรผู้บรรยายร่วม (5 ท่าน) :</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
              {session1.speakers.map((spk, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-white/70 dark:bg-slate-700/40 border border-slate-200/50 dark:border-slate-700/50">
                  <span className="w-5 h-5 rounded-full bg-tech-100 dark:bg-tech-950 text-tech-700 dark:text-indigo-300 font-mono text-[10px] flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span className="font-medium truncate">{spk.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Session 2 Card */}
        <div className="bg-slate-50 dark:bg-slate-800/40 p-6 sm:p-7 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-5 flex flex-col justify-between hover:shadow-card transition">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                {session2.sessionNumber}
              </span>
              <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-slate-700 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Layers size={20} />
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {session2.title}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              {session2.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {session2.tags.map((tag, i) => (
                <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-600/60">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <div className="text-xs font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
              <Sparkles size={14} />
              <span>การนำเสนอ 5 โครงงานจบวิจัยเชิงปฏิบัติการ :</span>
            </div>
            <div className="space-y-2 text-xs">
              {session2.speakers.map((spk, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-700/40 border border-slate-200/50 dark:border-slate-700/50 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-mono text-[10px] flex items-center justify-center font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">{spk.name}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 pl-7 text-[11px]">
                    เรื่อง: <span className="font-medium text-purple-700 dark:text-purple-300">"{spk.topic}"</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
