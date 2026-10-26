# Computer Science Academic Seminar E-Report 2569
### ระบบรายงานผลการสัมมนาวิชาการภาควิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์และเทคโนโลยี

โครงการนี้ได้รับการปรับปรุงและยกระดับโครงสร้างใหม่ทั้งหมดตามแพทเทิร์นโปรเจกต์ต้นแบบ (Vite + React + Tailwind CSS + Lucide Icons) พร้อมทั้งเพิ่มระบบฐานข้อมูล (Database) และระบุบทบาทหน้าที่ของคณะผู้จัดทำทุกคนอย่างชัดเจน พร้อมสำหรับการนำขึ้นโฮสต์ (Hosting Ready) 100%

---

## 👥 คณะผู้จัดทำและบทบาทหน้าที่ (Organizing Committee & Roles)

| ลำดับ | รายชื่อ | รหัสนักศึกษา | บทบาทหน้าที่ในงาน |
|:---:|:---|:---:|:---|
| 1 | **นางสาว อมินตา รุ่งเรือง** | 664244104 | **พิธีกร** (Host / MC ดำเนินรายการ) |
| 2 | **นาย ปรเมษฐ์ ใจห้าว** | 664244119 | **ลงชื่อนักศึกษา** (Student Registration Officer) |
| 3 | **นาย เจตนิพัทธ์ รักทอง** | 664244112 | **ตากล้อง** (Photographer & Media Operator) |
| 4 | **นาย ณัฐวุฒิ อิ่มจิตร** | 664244114 | **ลงชื่อนักศึกษา** (Student Registration Officer) |
| 5 | **นาย ธนพจน์ โพธิ์เกตุ** | 664244115 | **ควบคุมเครื่องเสียงและความเรียบร้อย** (Sound & Event Coordinator) |
| ที่ปรึกษา | **อาจารย์ ชนิตร์นารถ วิเชียรประดิษฐ์** | - | **อาจารย์ที่ปรึกษาหลักโครงการ** |

---

## 💾 ระบบฐานข้อมูลที่เพิ่มเข้ามา (Database Architecture)

ระบบมีกลไกฐานข้อมูลแบบ Hybrid พร้อมสำหรับการขึ้นโฮสต์ทุกรูปแบบ:

1. **ระบบลงชื่อนักศึกษาเข้าร่วมงาน (Student Registration Database)**
   - สอดคล้องกับบทบาทหน้าที่ของ **นาย ปรเมษฐ์ ใจห้าว** และ **นาย ณัฐวุฒิ อิ่มจิตร**
   - ฟอร์มลงชื่อ (รหัสนักศึกษา, ชื่อ-นามสกุล, สาขาวิชา, ชั้นปี, เจ้าหน้าที่ผู้รับลงชื่อ)
   - ตารางแสดงรายชื่อผู้ลงชื่อแบบ Real-time พร้อมระบบค้นหา (Search) และลบรายการ
   - ตัวนับจำนวนผู้เข้าร่วม (Live Counter)
   - ปุ่ม **Export CSV** ส่งออกรายชื่อนักศึกษาไปใช้งานต่อได้ทันที

2. **ระบบแบบประเมินความพึงพอใจและแดชบอร์ดสถิติ (Satisfaction Evaluation Database)**
   - แบบฟอร์มประเมินคะแนนภาพรวม (1-5 ดาว) พร้อมคะแนนรายด้าน (เนื้อหา, วิทยากร, สถานที่/เครื่องเสียง)
   - แดชบอร์ดสรุปคะแนนเฉลี่ยแบบสด (Average Rating)
   - กราฟแท่งแสดงสัดส่วนการกระจายตัวของคะแนน (Rating Distribution)
   - กล่องแสดงความคิดเห็นและข้อเสนอแนะล่าสุด (Live Feedback Feed)
   - ปุ่ม **Export CSV** สำหรับนำผลคะแนนไปสรุปเล่มรายงานสัมมนา

3. **ความพร้อมต่อการขึ้นโฮสต์ (Zero-Config Hosting Support)**
   - **Static Hosting (Vercel, Netlify, GitHub Pages, Firebase):** ข้อมูลจะถูกบันทึกลงใน Browser Database (IndexedDB & LocalStorage) ทำงานได้ทันที 100% โดยไม่ต้องเช่าฐานข้อมูลแยก
   - **Fullstack Node.js Server (`server/index.js`):** หากนำไปรันบน Node.js / Render / VPS ระบบจะบันทึกลง `server/database.json` และมี REST API (`/api/registrations`, `/api/evaluations`) ให้ใช้งานได้ทันที

---

## 🚀 วิธีการทดสอบและรันในเครื่อง (Local Development)

```bash
# 1. ติดตั้ง Dependencies (ทำแล้วเรียบร้อย)
npm install

# 2. รันโหมด Development (Hot Reload)
npm run dev

# 3. สั่ง Build สำหรับสร้างไฟล์ขึ้นโฮสต์ (ไฟล์จะถูกสร้างในโฟลเดอร์ dist/)
npm run build

# 4. ทดสอบพรีวิวผลงาน Build
npm run preview

# 5. รันโหมด Full-Stack เซิร์ฟเวอร์ Node.js + Database API
npm run server
```

---

## 🌐 คู่มือการนำขึ้นโฮสต์ (Hosting Deployment Guide)

### 📌 วิธีที่ 1: ขึ้น Netlify Drop (ง่ายที่สุด ภายใน 1 นาที ไม่ต้องใช้ Git)
1. เข้าไปที่ [app.netlify.com/drop](https://app.netlify.com/drop)
2. สั่งรัน `npm run build` ในเครื่องเพื่อสร้างโฟลเดอร์ `dist`
3. ลากโฟลเดอร์ **`dist`** ไปวางในหน้าเว็บ Netlify Drop
4. ระบบจะเปิด URL ออนไลน์ให้ทันที พร้อมใช้งาน!

### 📌 วิธีที่ 2: ขึ้น Vercel (แนะนำสำหรับ Production)
1. ติดตั้ง Vercel CLI ด้วยคำสั่ง:
   ```bash
   npx vercel
   ```
2. หรือ Push โค้ดขึ้น GitHub แล้ว Import โปรเจกต์ในหน้าเว็บ [vercel.com](https://vercel.com)
3. ระบบจะตรวจจับ `vercel.json` และทำการ Build อัตโนมัติ

### 📌 วิธีที่ 3: ขึ้น Render / Railway (แบบ Full-stack Node.js มี API)
1. อัปโหลดโปรเจกต์ขึ้น GitHub
2. สร้าง Web Service บน [render.com](https://render.com)
3. กำหนด:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run server`
4. โปรเจกต์จะทำงานทั้งระบบหน้าบ้าน React และเซิร์ฟเวอร์ฐานข้อมูลกลาง

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```
c:/e_report/
├── dist/                     # ไฟล์คอมไพล์สำเร็จพร้อมขึ้นโฮสต์ (Production Ready)
├── public/                   # รูปภาพและวิดีโองานสัมมนา
│   ├── 1.jpg                 # อมินตา รุ่งเรือง (พิธีกร)
│   ├── 2.png                 # ปรเมษฐ์ ใจห้าว (ลงชื่อนักศึกษา)
│   ├── 3.png                 # เจตนิพัทธ์ รักทอง (ตากล้อง)
│   ├── 4.png                 # ณัฐวุฒิ อิ่มจิตร (ลงชื่อนักศึกษา)
│   ├── 5.png                 # ธนพจน์ โพธิ์เกตุ (เครื่องเสียง)
│   ├── unnamed.png           # อาจารย์ ชนิตร์นารถ วิเชียรประดิษฐ์ (ที่ปรึกษา)
│   └── 1015 (1).mp4          # วิดีโอบันทึกงานสัมมนา
├── server/
│   ├── index.js              # Node.js REST API Server
│   └── database.json         # ฐานข้อมูล JSON
├── src/
│   ├── components/           # Navbar, Footer, Toast
│   ├── data/                 # ข้อมูลคณะผู้จัด, กำหนดการ, เซสชัน, เอกสาร
│   ├── sections/             # ส่วนต่างๆ ของ E-Report ตามดีไซน์เดิม
│   │   ├── Cover.jsx         # หน้าปก
│   │   ├── TOC.jsx           # สารบัญ
│   │   ├── Abstract.jsx      # บทคัดย่อ
│   │   ├── Committee.jsx     # คณะผู้จัดทำและหน้าที่
│   │   ├── Schedule.jsx      # กำหนดการ
│   │   ├── ContentSessions.jsx # เนื้อหาสัมมนา
│   │   ├── Downloads.jsx     # เอกสารดาวน์โหลด
│   │   ├── GalleryVideo.jsx  # วิดีโอและแกลเลอรี
│   │   ├── StudentRegistration.jsx # ฐานข้อมูลลงชื่อนักศึกษา
│   │   └── Evaluation.jsx    # ฐานข้อมูลแบบประเมินและสถิติ
│   ├── services/
│   │   └── database.js       # ระบบเชื่อมต่อฐานข้อมูล
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html                # Entry point
├── package.json              # รายการแพ็กเกจและสคริปต์
├── tailwind.config.js        # กำหนดชุดสี Tech Theme และฟอนต์
├── vite.config.js            # การตั้งค่า Vite
├── vercel.json               # คอนฟิก Vercel
├── netlify.toml              # คอนฟิก Netlify
└── index_original_backup.html # ไฟล์ต้นฉบับสำรอง
```
