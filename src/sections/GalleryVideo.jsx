import React, { useState } from 'react';
import { Images, Video, Camera, Play, Maximize2 } from 'lucide-react';

export default function GalleryVideo() {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    { src: '/1.jpg', title: 'การดำเนินรายการโดยพิธีกร', caption: 'นางสาว อมินตา รุ่งเรือง (พิธีกรดำเนินงาน)' },
    { src: '/2.png', title: 'จุดรับลงทะเบียนนักศึกษา', caption: 'ฝ่ายลงชื่อนักศึกษา: นาย ปรเมษฐ์ ใจห้าว' },
    { src: '/4.png', title: 'การอำนวยความสะดวกและเช็คชื่อ', caption: 'ฝ่ายลงชื่อนักศึกษา: นาย ณัฐวุฒิ อิ่มจิตร' },
    { src: '/5.png', title: 'การควบคุมระบบเสียงและมัลติมีเดีย', caption: 'ฝ่ายควบคุมเครื่องเสียง: นาย ธนพจน์ โพธิ์เกตุ' },
    { src: '/3.png', title: 'การบันทึกภาพถ่ายและวิดีโอ', caption: 'ฝ่ายบันทึกภาพ/ตากล้อง: นาย เจตนิพัทธ์ รักทอง' },
  ];

  return (
    <section id="gallery" className="bg-white dark:bg-tech-card rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 transition-colors">
      
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-tech-50 dark:bg-slate-800 text-tech-600 dark:text-indigo-400 flex items-center justify-center font-bold">
          <Images size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            ภาพกิจกรรมและวิดีโอบันทึกงาน <span className="text-sm font-normal text-slate-500 dark:text-slate-400 block sm:inline">Gallery & Video</span>
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500">บันทึกภาพนิ่งและวิดีโองานสัมมนา โดยฝ่ายตากล้อง (นาย เจตนิพัทธ์ รักทอง)</p>
        </div>
      </div>

      {/* Video Player */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
            <Video size={18} className="text-tech-600 dark:text-indigo-400" />
            <span>วิดีโอบันทึกงานสัมมนาวิชาการฉบับเต็ม</span>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-tech-100 dark:bg-slate-800 text-tech-700 dark:text-indigo-300 font-mono">
            Full HD 1080p
          </span>
        </div>

        <div className="w-full rounded-2xl overflow-hidden bg-slate-950 shadow-xl border border-slate-200 dark:border-slate-700/80 aspect-video max-h-[520px] flex items-center justify-center">
          <video 
            controls 
            className="w-full h-full object-contain mx-auto" 
            preload="metadata"
            poster="/1.jpg"
          >
            <source src="/seminar-video.mp4" type="video/mp4" />
            <source src="/1015 (1).mp4" type="video/mp4" />
            เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ HTML5
          </video>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center flex items-center justify-center gap-1.5 pt-1">
          <Camera size={14} className="text-tech-600 dark:text-indigo-400" />
          <span>บันทึกภาพและผลิตสื่อโดย: <strong className="text-slate-700 dark:text-slate-300">นาย เจตนิพัทธ์ รักทอง (ตากล้อง)</strong></span>
        </p>
      </div>

      {/* Photo Gallery Grid */}
      <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Camera size={16} className="text-tech-600 dark:text-indigo-400" />
            <span>ประมวลภาพบรรยากาศและการปฏิบัติหน้าที่</span>
          </h3>
          <span className="text-xs text-slate-400 dark:text-slate-500">คลิกที่ภาพเพื่อดูภาพขนาดใหญ่</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {galleryItems.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/70 bg-slate-100 dark:bg-slate-800 aspect-square cursor-pointer shadow-sm hover:shadow-md transition"
            >
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-white">
                <span className="text-[11px] font-bold line-clamp-1">{item.title}</span>
                <span className="text-[9px] text-slate-300 line-clamp-1">{item.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="max-w-2xl w-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl p-4 space-y-3" onClick={e => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.title} className="w-full max-h-[70vh] object-contain rounded-2xl" />
            <div className="flex items-center justify-between pt-2 px-2">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{selectedImage.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{selectedImage.caption}</p>
              </div>
              <button 
                onClick={() => setSelectedImage(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
