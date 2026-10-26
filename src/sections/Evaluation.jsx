import React, { useState, useEffect } from 'react';
import { Star, Send, CheckCircle2, BarChart3, MessageSquare, Download, Sparkles, RefreshCw } from 'lucide-react';
import { getEvaluations, saveEvaluation, exportToCSV } from '../services/database';

export default function Evaluation({ onShowToast }) {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('นักศึกษาวิทยาการคอมพิวเตอร์');
  const [rating, setRating] = useState(5);
  const [contentScore, setContentScore] = useState(5);
  const [speakerScore, setSpeakerScore] = useState(5);
  const [venueScore, setVenueScore] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadEvaluations();
  }, []);

  const loadEvaluations = async () => {
    setLoading(true);
    const data = await getEvaluations();
    setEvaluations(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const saved = await saveEvaluation({
        name: name.trim() || 'ไม่ประสงค์ออกนาม',
        role,
        rating: Number(rating),
        contentScore: Number(contentScore),
        speakerScore: Number(speakerScore),
        venueScore: Number(venueScore),
        comment
      });

      setEvaluations(prev => [saved, ...prev]);
      setName('');
      setComment('');
      setRating(5);
      onShowToast?.('บันทึกแบบประเมินความพึงพอใจเข้าสู่ฐานข้อมูลสำเร็จ ขอบคุณครับ!', 'success');
    } catch (err) {
      onShowToast?.('เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Compute Statistics
  const totalCount = evaluations.length;
  const avgRating = totalCount > 0 
    ? (evaluations.reduce((sum, item) => sum + (Number(item.rating) || 5), 0) / totalCount).toFixed(2)
    : '5.00';

  const countByScore = {
    5: evaluations.filter(e => e.rating === 5).length,
    4: evaluations.filter(e => e.rating === 4).length,
    3: evaluations.filter(e => e.rating === 3).length,
    2: evaluations.filter(e => e.rating === 2).length,
    1: evaluations.filter(e => e.rating === 1).length,
  };

  return (
    <section id="evaluation" className="bg-white dark:bg-tech-card rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-10 transition-colors">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-tech-50 dark:bg-slate-800 text-tech-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Star size={20} className="fill-tech-600 dark:fill-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>แบบประเมินความพึงพอใจ</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-tech-100 dark:bg-tech-950 text-tech-700 dark:text-indigo-300 font-mono">
                Database Connected
              </span>
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              แบบสำรวจความคิดเห็นและแดชบอร์ดสรุปผลแบบเรียลไทม์
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              exportToCSV(evaluations, 'evaluation_results');
              onShowToast?.('ส่งออกผลการประเมิน CSV สำเร็จ', 'success');
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition text-xs font-semibold flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Evaluation Form (Left 6 cols) + Realtime Dashboard (Right 6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Survey Form (6 cols) */}
        <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-5">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
            <Sparkles size={18} className="text-tech-600 dark:text-indigo-400" />
            <span>กรอกแบบประเมินโครงการสัมมนา</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-medium text-slate-700 dark:text-slate-300">
                  ชื่อ-นามสกุล (ผู้ประเมิน)
                </label>
                <input
                  type="text"
                  placeholder="ระบุชื่อของคุณ (หรือไม่ระบุก็ได้)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tech-600 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-medium text-slate-700 dark:text-slate-300">
                  สถานะผู้เข้าร่วม <span className="text-rose-500">*</span>
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tech-600 text-xs"
                >
                  <option value="นักศึกษาวิทยาการคอมพิวเตอร์">นักศึกษาวิทยาการคอมพิวเตอร์</option>
                  <option value="นักศึกษาภาควิชาอื่น">นักศึกษาภาควิชาอื่น</option>
                  <option value="คณาจารย์ / บุคลากร">คณาจารย์ / บุคลากร</option>
                  <option value="บุคคลภายนอก / ผู้สนใจทั่วไป">บุคคลภายนอก / ผู้สนใจทั่วไป</option>
                </select>
              </div>
            </div>

            {/* Overall Rating */}
            <div className="space-y-2 p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80">
              <label className="block font-bold text-slate-800 dark:text-slate-200 text-xs">
                ความพึงพอใจต่อภาพรวมการสัมมนา :
              </label>
              <div className="flex items-center gap-2 pt-1">
                {[5, 4, 3, 2, 1].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${
                      rating === star
                        ? 'bg-tech-600 text-white border-tech-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-tech-400'
                    }`}
                  >
                    <Star size={13} className={rating === star ? 'fill-white' : 'fill-amber-400 text-amber-400'} />
                    <span>{star === 5 ? '5 ดีมาก' : star === 4 ? '4 ดี' : star === 3 ? '3 ปานกลาง' : star}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Criteria */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400">เนื้อหาบรรยาย</label>
                <select
                  value={contentScore}
                  onChange={(e) => setContentScore(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                >
                  <option value="5">ดีมาก (5)</option>
                  <option value="4">ดี (4)</option>
                  <option value="3">ปานกลาง (3)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400">การนำเสนอ/วิทยากร</label>
                <select
                  value={speakerScore}
                  onChange={(e) => setSpeakerScore(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                >
                  <option value="5">ดีมาก (5)</option>
                  <option value="4">ดี (4)</option>
                  <option value="3">ปานกลาง (3)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400">สถานที่ & เครื่องเสียง</label>
                <select
                  value={venueScore}
                  onChange={(e) => setVenueScore(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                >
                  <option value="5">ดีมาก (5)</option>
                  <option value="4">ดี (4)</option>
                  <option value="3">ปานกลาง (3)</option>
                </select>
              </div>
            </div>

            {/* Comments */}
            <div className="space-y-1.5">
              <label className="block font-medium text-slate-700 dark:text-slate-300">
                ข้อเสนอแนะเพิ่มเติมเพื่อการพัฒนา
              </label>
              <textarea
                rows={3}
                placeholder="พิมพ์ความคิดเห็น ข้อเสนอแนะ หรือข้อความให้กำลังใจคณะผู้จัดทำ..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tech-600 text-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-tech-600 hover:bg-tech-700 text-white font-medium py-3 rounded-xl shadow-lg shadow-tech-600/25 transition flex items-center justify-center gap-2"
            >
              <Send size={16} />
              <span>{submitting ? 'กำลังบันทึกลงฐานข้อมูล...' : 'ส่งแบบประเมินความพึงพอใจ'}</span>
            </button>
          </form>
        </div>

        {/* Right: Real-time Evaluation Dashboard (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
              <BarChart3 size={18} className="text-tech-600 dark:text-indigo-400" />
              <span>แดชบอร์ดสรุปผลการประเมิน (Live Statistics)</span>
            </div>
            <button 
              onClick={loadEvaluations}
              className="text-xs text-slate-400 hover:text-tech-600 flex items-center gap-1"
              title="รีเฟรชข้อมูล"
            >
              <RefreshCw size={12} />
              <span>อัปเดต</span>
            </button>
          </div>

          {/* Average Rating Big Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-tech-500/10 via-indigo-500/10 to-transparent border border-tech-200 dark:border-tech-800/60 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">คะแนนเฉลี่ยความพึงพอใจ</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-tech-600 dark:text-indigo-400 font-mono">{avgRating}</span>
                <span className="text-slate-400 text-sm">/ 5.00</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={15} className="fill-amber-400" />
                ))}
              </div>
            </div>

            <div className="text-right space-y-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">ผู้ตอบแบบประเมิน</span>
              <div className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 font-mono">
                {totalCount}
              </div>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">100% บันทึกลงระบบ</span>
            </div>
          </div>

          {/* Rating Breakdown Bars */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-2.5">
            <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300">การกระจายของคะแนนความพึงพอใจ</h4>
            {[5, 4, 3, 2, 1].map((score) => {
              const count = countByScore[score] || 0;
              const percent = totalCount > 0 ? ((count / totalCount) * 100).toFixed(0) : 0;
              return (
                <div key={score} className="flex items-center gap-3 text-xs">
                  <span className="w-12 text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
                    <span>{score}</span>
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div 
                      className="h-full bg-tech-600 dark:bg-indigo-500 rounded-full transition-all duration-500" 
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <span className="w-12 text-right font-mono text-[11px] text-slate-500">
                    {count} ({percent}%)
                  </span>
                </div>
              );
            })}
          </div>

          {/* Recent Comments Feed */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <MessageSquare size={14} className="text-tech-600 dark:text-indigo-400" />
              <span>ความคิดเห็นล่าสุดจากผู้เข้าร่วม ({evaluations.filter(e => e.comment).length} ความเห็น)</span>
            </h4>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {evaluations.filter(e => e.comment).map((item) => (
                <div key={item.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{item.name} ({item.role})</span>
                    <span className="text-slate-400 text-[10px] font-mono">{item.createdAt}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 italic">"{item.comment}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
