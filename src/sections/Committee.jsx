import React from 'react';
import { Users, Award, Mic, ClipboardList, Camera, Volume2, UserCheck, ShieldCheck } from 'lucide-react';
import { advisorData, studentCommittee } from '../data/committee';

// Role icon mapper
function getRoleIcon(role) {
  if (role.includes('พิธีกร')) return <Mic size={15} className="shrink-0" />;
  if (role.includes('ลงชื่อ')) return <ClipboardList size={15} className="shrink-0" />;
  if (role.includes('ตากล้อง') || role.includes('กล้อง')) return <Camera size={15} className="shrink-0" />;
  if (role.includes('เครื่องเสียง')) return <Volume2 size={15} className="shrink-0" />;
  return <Award size={15} className="shrink-0" />;
}

export default function Committee() {
  return (
    <section id="committee" className="bg-white dark:bg-tech-card rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-10 transition-colors">
      
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-tech-50 dark:bg-slate-800 text-tech-600 dark:text-indigo-400 flex items-center justify-center font-bold">
          <Users size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            คณะผู้จัดทำและอาจารย์ที่ปรึกษา <span className="text-sm font-normal text-slate-500 dark:text-slate-400 block sm:inline">Organizing Committee & Roles</span>
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500">รายชื่อคณะทำงานพร้อมบทบาทหน้าที่รับผิดชอบในงานสัมมนาวิชาการ</p>
        </div>
      </div>

      {/* Advisor Group */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-tech-600 dark:text-indigo-400">
          <ShieldCheck size={16} />
          <span>อาจารย์ที่ปรึกษาโครงการ (Project Advisor)</span>
        </div>

        <div className="max-w-xl">
          <div className="p-5 rounded-2xl bg-gradient-to-r from-tech-50/70 to-indigo-50/50 dark:from-slate-800/60 dark:to-slate-800/40 border border-tech-100 dark:border-slate-700/80 flex items-center gap-5 shadow-sm hover:shadow-md transition">
            <div className="relative">
              <img 
                src={advisorData.image} 
                alt={advisorData.name} 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-md border-2 border-white dark:border-slate-700"
                onError={(e) => { e.currentTarget.src = advisorData.fallbackImage; }}
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-tech-600 text-white flex items-center justify-center text-[10px] shadow">
                <Award size={12} />
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-tech-600 text-white text-[11px] font-semibold">
                {advisorData.role}
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                {advisorData.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {advisorData.englishName}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {advisorData.department}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Student Committee Group with Explicit Roles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-tech-600 dark:text-indigo-400">
            <Users size={16} />
            <span>คณะนักศึกษาผู้จัดทำ (ชั้นปีที่ 4) และบทบาทหน้าที่</span>
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">5 สมาชิก</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {studentCommittee.map((student) => (
            <div 
              key={student.id} 
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/70 hover:border-tech-400 dark:hover:border-tech-500/60 shadow-sm hover:shadow-card transition flex flex-col items-center text-center space-y-3 relative group overflow-hidden"
            >
              {/* Subtle accent top border */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${student.accentColor}`}></div>

              {/* Student Photo */}
              <div className="relative mt-1">
                <img 
                  src={student.image} 
                  alt={student.name} 
                  className="w-20 h-20 rounded-2xl object-cover shadow-md border-2 border-white dark:border-slate-700 group-hover:scale-105 transition-transform duration-200"
                  onError={(e) => { e.currentTarget.src = `https://placehold.co/120x120/4f46e5/ffffff?text=${encodeURIComponent(student.name.substring(0, 2))}`; }}
                />
              </div>

              {/* Name & ID */}
              <div className="space-y-0.5">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  {student.prefix} {student.name}
                </h4>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  รหัสนักศึกษา: <span className="font-semibold text-slate-700 dark:text-slate-200">{student.id}</span>
                </p>
              </div>

              {/* PROMINENT ROLE BADGE */}
              <div className="pt-1 w-full">
                <div className={`w-full py-2 px-3 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-bold shadow-sm ${student.badgeColor}`}>
                  {getRoleIcon(student.role)}
                  <span>หน้าที่: {student.role}</span>
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-mono">
                  {student.roleEn}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
