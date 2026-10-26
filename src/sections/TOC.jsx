import React from 'react';
import { ListFilter, ChevronRight, FileText, Users, Clock, BookOpen, Download, Image, UserCheck, Star } from 'lucide-react';

export default function TOC() {
  const tocItems = [
    { number: '01', title: 'บทคัดย่อ (Abstract)', href: '#abstract', icon: FileText, desc: 'สรุปภาพรวมและวัตถุประสงค์ของการจัดสัมมนา' },
    { number: '02', title: 'คณะผู้จัดทำและอาจารย์ที่ปรึกษา', href: '#committee', icon: Users, desc: 'รายชื่อคณะนักศึกษาผู้จัดทำพร้อมหน้าที่และอาจารย์ที่ปรึกษา' },
    { number: '03', title: 'กำหนดการจัดสัมมนา', href: '#schedule', icon: Clock, desc: 'ไทม์ไลน์และกำหนดเวลาตลอดช่วงกิจกรรม' },
    { number: '04', title: 'เนื้อหาสัมมนาและเซสชันเชิงวิชาการ', href: '#content', icon: BookOpen, desc: 'Productivity OS และ Project Showcase ทั้ง 5 หัวข้อ' },
    { number: '05', title: 'เอกสารประกอบและสไลด์ดาวน์โหลด', href: '#downloads', icon: Download, desc: 'ดาวน์โหลด Full Report PDF และไฟล์สไลด์ Keynote' },
    { number: '06', title: 'ภาพกิจกรรมและวิดีโอบันทึกงาน', href: '#gallery', icon: Image, desc: 'วิดีโอสัมมนาฉบับเต็มและภาพบรรยากาศ' },
    { number: '07', title: 'ระบบลงชื่อนักศึกษา (Database)', href: '#registration', icon: UserCheck, desc: 'ระบบลงทะเบียนและเช็คชื่อผู้เข้าร่วมงาน บันทึกลงฐานข้อมูล' },
    { number: '08', title: 'แบบประเมินความพึงพอใจและสถิติ', href: '#evaluation', icon: Star, desc: 'ฟอร์มประเมินและแดชบอร์ดสรุปคะแนนความพึงพอใจแบบ Real-time' },
  ];

  return (
    <section id="toc" className="bg-white dark:bg-tech-card rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-tech-50 dark:bg-slate-800 text-tech-600 dark:text-indigo-400 flex items-center justify-center font-bold">
          <ListFilter size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            สารบัญรายงาน <span className="text-sm font-normal text-slate-500 dark:text-slate-400 block sm:inline">Table of Contents</span>
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500">คลิกเลือกหัวข้อเพื่อนำทางไปยังส่วนต่างๆ ของรายงาน</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tocItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.number}
              href={item.href}
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-tech-50/80 dark:hover:bg-slate-800 transition border border-slate-200/60 dark:border-slate-700/60 group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="w-9 h-9 shrink-0 rounded-xl bg-tech-100 dark:bg-slate-700 text-tech-700 dark:text-indigo-300 text-sm font-bold flex items-center justify-center group-hover:bg-tech-600 group-hover:text-white transition-colors">
                  {item.number}
                </span>
                <div className="min-w-0">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-tech-600 dark:group-hover:text-indigo-400 transition block truncate text-sm sm:text-base">
                    {item.title}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 block truncate">
                    {item.desc}
                  </span>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 group-hover:text-tech-600 dark:group-hover:text-indigo-400 transition shrink-0 ml-2" />
            </a>
          );
        })}
      </div>
    </section>
  );
}
