import React from 'react';
import { FileText, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Abstract() {
  return (
    <section id="abstract" className="bg-white dark:bg-tech-card rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
      <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-tech-50 dark:bg-slate-800 text-tech-600 dark:text-indigo-400 flex items-center justify-center font-bold">
          <FileText size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            บทคัดย่อ <span className="text-sm font-normal text-slate-500 dark:text-slate-400 block sm:inline">Abstract</span>
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500">บทสรุปผู้บริหารและผลการดำเนินงานสัมมนา</p>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed space-y-4 text-sm sm:text-base">
        <p className="indent-8 text-justify">
          การจัดสัมมนาวิชาการทางวิทยาการคอมพิวเตอร์ ประจำปีการศึกษา 2568 มีวัตถุประสงค์หลักเพื่อให้คณาจารย์ นักศึกษา และผู้สนใจ ได้รับทราบถึงแนวโน้มความก้าวหน้าทางเทคโนโลยีสารสนเทศ การประยุกต์ใช้ปัญญาประดิษฐ์ (AI) ในกระบวนการทำงาน การจัดการ Productivity OS และสถาปัตยกรรมคลาวด์คอมพิวติ้งสมัยใหม่ โดยงานสัมมนาครั้งนี้ได้รวบรวมตัวแทนนักศึกษาชั้นปีที่ 4 ผู้จัดทำโครงงานระดับปริญญาตรีและผู้เชี่ยวชาญมาร่วมถ่ายทอด แลกเปลี่ยนมุมมอง และนำเสนอผลงานเชิงลึกเพื่อการต่อยอดองค์ความรู้
        </p>
        <p className="indent-8 text-justify">
          ผลจากการจัดสัมมนาพบว่า มีผู้เข้าร่วมงานกว่า 250 คน ประกอบด้วยคณาจารย์ นักศึกษาภาควิชาวิทยาการคอมพิวเตอร์ และสาขาที่เกี่ยวข้อง โดยผู้เข้าร่วมได้รับองค์ความรู้เชิงปฏิบัติทั้งในด้านระบบบริหารจัดการร้านคาเฟ่บอร์ดเกม, ระบบบริหารจัดการลำดับการเข้ารับบริการในโรงพยาบาล, ระบบวิเคราะห์หุ้นและพอร์ตจำลองอัจฉริยะ, Game Engine สร้างเกม Visual Novel, และระบบสารสนเทศสั่งทำป้ายออนไลน์ ซึ่งแสดงให้เห็นถึงศักยภาพการบูรณาการองค์ความรู้ด้าน Computer Science สู่การแก้ไขปัญหาในภาคอุตสาหกรรมจริงอย่างเป็นรูปธรรม
        </p>
      </div>

      {/* Highlights Box */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-tech-100 dark:bg-tech-950/60 text-tech-600 dark:text-indigo-400 shrink-0">
            <Sparkles size={18} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">บูรณาการทฤษฎีสู่ปฏิบัติ</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">เชื่อมโยงหลักสูตรเข้ากับสถานการณ์ใช้งานจริงในอุตสาหกรรมซอฟต์แวร์</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">วัดผลผ่านระบบดิจิทัล</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">ประเมินผลและเช็คชื่อผู้เข้าร่วมผ่านฐานข้อมูลกลาง Real-time</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0">
            <FileText size={18} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">รายงานโปร่งใสตรวจสอบได้</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">เผยแพร่เอกสาร วิดีโอย้อนหลัง และผลสรุปครบถ้วนบนระบบออนไลน์</p>
          </div>
        </div>
      </div>
    </section>
  );
}
