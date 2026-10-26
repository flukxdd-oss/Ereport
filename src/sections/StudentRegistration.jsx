import React, { useState, useEffect } from 'react';
import { UserCheck, UserPlus, Search, Download, Trash2, ShieldCheck, CheckCircle2, Users } from 'lucide-react';
import { getRegistrations, saveRegistration, deleteRegistration, exportToCSV } from '../services/database';

export default function StudentRegistration({ onShowToast }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [studentId, setStudentId] = useState('');
  const [fullName, setFullName] = useState('');
  const [major, setMajor] = useState('วิทยาการคอมพิวเตอร์');
  const [year, setYear] = useState('4');
  const [officer, setOfficer] = useState('ปรเมษฐ์ ใจห้าว');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await getRegistrations();
    setRegistrations(data);
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!studentId || !fullName) {
      onShowToast?.('กรุณากรอกรหัสนักศึกษาและชื่อ-นามสกุลให้ครบถ้วน', 'error');
      return;
    }

    // Check duplicate
    const exists = registrations.find(r => r.studentId === studentId.trim());
    if (exists) {
      onShowToast?.(`รหัสนักศึกษา ${studentId} ได้ลงชื่อเข้าร่วมงานแล้ว`, 'error');
      return;
    }

    const saved = await saveRegistration({
      studentId,
      fullName,
      major,
      year,
      officer
    });

    setRegistrations(prev => [saved, ...prev]);
    setStudentId('');
    setFullName('');
    onShowToast?.(`ลงชื่อนักศึกษา: ${saved.fullName} เรียบร้อยแล้ว (บันทึกลง Database)`, 'success');
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`ต้องการลบรายการลงชื่อของ "${name}" หรือไม่?`)) {
      const updated = await deleteRegistration(id);
      setRegistrations(updated);
      onShowToast?.(`ลบข้อมูลเรียบร้อยแล้ว`, 'info');
    }
  };

  const filteredRegistrations = registrations.filter(r => 
    (r.fullName && r.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (r.studentId && r.studentId.includes(searchQuery)) ||
    (r.major && r.major.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section id="registration" className="bg-white dark:bg-tech-card rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 transition-colors">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <UserCheck size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>ระบบลงชื่อนักศึกษา</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono">
                Database Connected
              </span>
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              รับผิดชอบโดยฝ่ายลงชื่อนักศึกษา: <strong className="text-slate-600 dark:text-slate-300">นาย ปรเมษฐ์ ใจห้าว</strong> และ <strong className="text-slate-600 dark:text-slate-300">นาย ณัฐวุฒิ อิ่มจิตร</strong>
            </p>
          </div>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-4 py-2 rounded-2xl">
          <Users size={16} className="text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs text-slate-600 dark:text-slate-300">ลงชื่อแล้วทั้งหมด:</span>
          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-base">{registrations.length}</span>
          <span className="text-xs text-slate-500">คน</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Check-in Form (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-5">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
            <UserPlus size={18} className="text-emerald-600 dark:text-emerald-400" />
            <span>ฟอร์มลงชื่อเข้าร่วมงาน (Check-in Form)</span>
          </div>

          <form onSubmit={handleRegister} className="space-y-4 text-xs sm:text-sm">
            <div className="space-y-1.5">
              <label className="block font-medium text-slate-700 dark:text-slate-300">
                รหัสนักศึกษา <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={12}
                placeholder="เช่น 664244101"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-medium text-slate-700 dark:text-slate-300">
                ชื่อ-นามสกุล <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="ระบุชื่อและนามสกุล"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block font-medium text-slate-700 dark:text-slate-300">
                  สาขาวิชา
                </label>
                <select
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                >
                  <option value="วิทยาการคอมพิวเตอร์">วิทยาการคอมพิวเตอร์</option>
                  <option value="เทคโนโลยีสารสนเทศ">เทคโนโลยีสารสนเทศ</option>
                  <option value="วิทยาการข้อมูลและ AI">วิทยาการข้อมูลและ AI</option>
                  <option value="สาขาอื่น ๆ">สาขาอื่น ๆ</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block font-medium text-slate-700 dark:text-slate-300">
                  ชั้นปี
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                >
                  <option value="1">ปี 1</option>
                  <option value="2">ปี 2</option>
                  <option value="3">ปี 3</option>
                  <option value="4">ปี 4</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block font-medium text-slate-700 dark:text-slate-300">
                เจ้าหน้าที่ผู้รับลงชื่อ (Officer in charge)
              </label>
              <select
                value={officer}
                onChange={(e) => setOfficer(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
              >
                <option value="ปรเมษฐ์ ใจห้าว">นาย ปรเมษฐ์ ใจห้าว (ฝ่ายลงชื่อ)</option>
                <option value="ณัฐวุฒิ อิ่มจิตร">นาย ณัฐวุฒิ อิ่มจิตร (ฝ่ายลงชื่อ)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-xl shadow-lg shadow-emerald-600/25 transition flex items-center justify-center gap-2 pt-3"
            >
              <CheckCircle2 size={16} />
              <span>บันทึกการลงชื่อเข้าฐานข้อมูล</span>
            </button>
          </form>
        </div>

        {/* Right: Live Database Table (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Controls: Search & Export */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="ค้นหารหัสนักศึกษา, ชื่อ, หรือสาขา..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              onClick={() => {
                exportToCSV(registrations, 'attendee_registrations');
                onShowToast?.('ส่งออกไฟล์ CSV สำเร็จ', 'success');
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition text-xs font-semibold flex items-center justify-center gap-1.5 shrink-0 border border-slate-200 dark:border-slate-700"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          </div>

          {/* Database Table Container */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden bg-white dark:bg-slate-800/50 shadow-sm max-h-[380px] overflow-y-auto">
            {filteredRegistrations.length === 0 ? (
              <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-xs">
                ไม่พบข้อมูลนักศึกษาที่ลงชื่อ
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">รหัส</th>
                    <th className="py-2.5 px-3 font-semibold">ชื่อ-นามสกุล</th>
                    <th className="py-2.5 px-3 font-semibold hidden sm:table-cell">สาขา/ชั้นปี</th>
                    <th className="py-2.5 px-3 font-semibold hidden md:table-cell">เวลา</th>
                    <th className="py-2.5 px-3 font-semibold text-right">จัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {filteredRegistrations.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition">
                      <td className="py-2.5 px-3 font-mono font-medium text-slate-900 dark:text-white">
                        {item.studentId}
                      </td>
                      <td className="py-2.5 px-3 font-medium text-slate-800 dark:text-slate-200">
                        {item.fullName}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                        {item.major} (ปี {item.year})
                      </td>
                      <td className="py-2.5 px-3 text-[10px] text-slate-400 font-mono hidden md:table-cell">
                        {item.checkInTime}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => handleDelete(item.id, item.fullName)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                          title="ลบรายการ"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span>*ข้อมูลบันทึกในระบบฐานข้อมูลแบบเรียลไทม์</span>
            <span>แสดง {filteredRegistrations.length} จาก {registrations.length} รายการ</span>
          </div>

        </div>

      </div>

    </section>
  );
}
