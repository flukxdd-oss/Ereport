import React from 'react';
import { GraduationCap, Calendar, MapPin, ArrowDown, Users, Award, BookOpen, Database } from 'lucide-react';

export default function Cover() {
  return (
    <section 
      id="cover" 
      className="min-h-[55vh] flex flex-col items-center justify-center text-center bg-gradient-to-b from-tech-50/80 via-tech-50/20 to-transparent dark:from-slate-800/50 dark:via-slate-800/10 dark:to-transparent rounded-3xl p-8 sm:p-14 border border-slate-200/80 dark:border-slate-800 relative overflow-hidden shadow-sm"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f10a_1px,transparent_1px),linear-gradient(to_bottom,#6366f10a_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl space-y-6">
        
        {/* Academic Year Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tech-100 dark:bg-tech-950/70 text-tech-700 dark:text-indigo-300 text-sm font-semibold tracking-wide border border-tech-200/50 dark:border-tech-800/50 shadow-sm">
          <GraduationCap size={16} />
          <span>รายงานการสัมมนาทางวิชาการ ประจำปีการศึกษา 2568</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          สัมมนาวิชาการ 2569
          <span className="block text-xl sm:text-2xl font-bold bg-gradient-to-r from-tech-600 to-indigo-500 bg-clip-text text-transparent mt-2">
            Computer Science Academic Seminar & Project Showcase
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
          รายงานสรุปผลการจัดสัมมนาวิชาการภาควิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์และเทคโนโลยี พร้อมระบบสารสนเทศฐานข้อมูลลงทะเบียนและประเมินผลออนไลน์
        </p>

        {/* Date & Venue Metadata */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-tech-600 dark:text-indigo-400" />
            <span className="font-medium text-slate-700 dark:text-slate-300">15 มีนาคม พ.ศ. 2569</span>
          </div>
          <div className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-tech-600 dark:text-indigo-400" />
            <span className="font-medium text-slate-700 dark:text-slate-300">หอประชุมคณะวิทยาศาสตร์ ชั้น 4</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="pt-3 flex flex-wrap justify-center gap-3">
          <a 
            href="#abstract" 
            className="bg-tech-600 hover:bg-tech-700 text-white font-medium px-6 py-3 rounded-xl shadow-lg shadow-tech-600/25 transition flex items-center gap-2 group"
          >
            <span>เริ่มอ่านรายงาน</span>
            <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
          </a>

          <a 
            href="#registration" 
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/25 transition flex items-center gap-2 group"
          >
            <Users size={16} />
            <span>ระบบลงชื่อนักศึกษา</span>
          </a>

          <a 
            href="#evaluation" 
            className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 transition flex items-center gap-2"
          >
            <Database size={16} className="text-tech-600 dark:text-indigo-400" />
            <span>ฐานข้อมูล & แบบประเมิน</span>
          </a>
        </div>

        {/* Micro Stats Ribbon */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-center">
            <div className="text-xl font-bold text-tech-600 dark:text-indigo-400">250+</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">ผู้เข้าร่วมสัมมนา</div>
          </div>
          <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-center">
            <div className="text-xl font-bold text-tech-600 dark:text-indigo-400">5 โครงงาน</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Project Showcase</div>
          </div>
          <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-center">
            <div className="text-xl font-bold text-tech-600 dark:text-indigo-400">2 เซสชัน</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">บรรยายเชิงวิชาการ</div>
          </div>
          <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-center">
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">Database</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">ระบบบันทึกออนไลน์</div>
          </div>
        </div>

      </div>
    </section>
  );
}
