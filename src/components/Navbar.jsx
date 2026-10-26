import React, { useState } from 'react';
import { Cpu, Moon, Sun, Printer, Menu, X, CheckSquare, Star, FileText } from 'lucide-react';

export default function Navbar({ darkMode, setDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDark = () => {
    setDarkMode(!darkMode);
  };

  const navLinks = [
    { name: 'หน้าปก', href: '#cover' },
    { name: 'สารบัญ', href: '#toc' },
    { name: 'บทคัดย่อ', href: '#abstract' },
    { name: 'คณะผู้จัดทำ', href: '#committee' },
    { name: 'กำหนดการ', href: '#schedule' },
    { name: 'เนื้อหาสัมมนา', href: '#content' },
    { name: 'ดาวน์โหลด', href: '#downloads' },
    { name: 'ภาพและวิดีโอ', href: '#gallery' },
    { name: 'ลงชื่อนักศึกษา', href: '#registration', highlight: true },
    { name: 'แบบประเมิน', href: '#evaluation', highlight: true }
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <a href="#cover" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-tech-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-tech-500/25 group-hover:scale-105 transition-transform">
            <Cpu size={22} />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-tech-600 dark:text-indigo-400 font-semibold block">
              Computer Science E-Report
            </span>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
              สัมมนาวิชาการ 2569
            </h1>
          </div>
        </a>

        {/* Desktop Quick Nav Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/60 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/60">
          {navLinks.slice(0, 8).map(link => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-tech-600 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 transition"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#registration"
            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition flex items-center gap-1"
          >
            <CheckSquare size={12} />
            <span>ลงชื่อ</span>
          </a>
          <a
            href="#evaluation"
            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-tech-500/10 text-tech-600 dark:text-indigo-400 hover:bg-tech-500/20 transition flex items-center gap-1"
          >
            <Star size={12} />
            <span>ประเมิน</span>
          </a>
        </nav>

        {/* Actions (Dark Mode & Print Button & Mobile Hamburger) */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleDark}
            aria-label="สลับโหมดแสงสว่าง/มืด"
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            title={darkMode ? 'เปลี่ยนเป็นธีมสว่าง' : 'เปลี่ยนเป็นธีมมืด'}
          >
            {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => window.print()}
            className="hidden sm:flex items-center gap-2 bg-tech-600 hover:bg-tech-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-md shadow-tech-600/20 transition"
            title="พิมพ์หน้ารายงาน หรือบันทึกเป็น PDF"
          >
            <Printer size={16} />
            <span>พิมพ์ PDF</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            aria-label="เปิดเมนู"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-5 space-y-1 shadow-xl">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                link.highlight
                  ? 'bg-tech-50 text-tech-700 dark:bg-tech-950/50 dark:text-indigo-300 font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.print();
              }}
              className="w-full flex items-center justify-center gap-2 bg-tech-600 hover:bg-tech-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium"
            >
              <Printer size={16} />
              <span>พิมพ์รายงาน / บันทึก PDF</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
