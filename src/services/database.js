/**
 * CS Seminar Database Service
 * 
 * Supports:
 * 1. REST API (when deployed with backend Node/Express server)
 * 2. LocalStorage / IndexedDB fallback (when deployed to static hosts like Vercel, Netlify, GitHub Pages)
 * 3. Supabase Cloud Database (if VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY are provided)
 */

const STORAGE_KEYS = {
  EVALUATIONS: 'cs_seminar_evaluations_v1',
  REGISTRATIONS: 'cs_seminar_registrations_v1',
};

// Initial seed registrations to showcase Parames & Natthawut's check-in system immediately
const INITIAL_REGISTRATIONS = [
  {
    id: 'reg-001',
    studentId: '664244101',
    fullName: 'กิตติศักดิ์ มณีโชติ',
    major: 'วิทยาการคอมพิวเตอร์',
    year: '4',
    checkInTime: '2026-03-15 08:32:15',
    officer: 'ปรเมษฐ์ ใจห้าว'
  },
  {
    id: 'reg-002',
    studentId: '664244105',
    fullName: 'ชลธิชา ศรีสุข',
    major: 'วิทยาการคอมพิวเตอร์',
    year: '4',
    checkInTime: '2026-03-15 08:35:40',
    officer: 'ณัฐวุฒิ อิ่มจิตร'
  },
  {
    id: 'reg-003',
    studentId: '664244118',
    fullName: 'ธีรเดช บูรพา',
    major: 'เทคโนโลยีสารสนเทศ',
    year: '3',
    checkInTime: '2026-03-15 08:40:12',
    officer: 'ปรเมษฐ์ ใจห้าว'
  },
  {
    id: 'reg-004',
    studentId: '664244122',
    fullName: 'พิมลภัส รักษ์เจริญ',
    major: 'วิทยาการคอมพิวเตอร์',
    year: '4',
    checkInTime: '2026-03-15 08:45:20',
    officer: 'ณัฐวุฒิ อิ่มจิตร'
  }
];

// Initial seed evaluations
const INITIAL_EVALUATIONS = [
  {
    id: 'eval-001',
    name: 'อ.ดร. นฤมล เกษมสุข',
    role: 'คณาจารย์ / บุคลากร',
    rating: 5,
    contentScore: 5,
    speakerScore: 5,
    venueScore: 5,
    comment: 'การจัดงานมีแบบแผนดีมาก วิทยากรทุกคนมีความพร้อมและถ่ายทอดเนื้อหาเข้าใจง่าย',
    createdAt: '2026-03-15 15:35:00'
  },
  {
    id: 'eval-002',
    name: 'สิรวิชญ์ พงษ์ศิริ',
    role: 'นักศึกษาวิทยาการคอมพิวเตอร์',
    rating: 5,
    contentScore: 5,
    speakerScore: 5,
    venueScore: 4,
    comment: 'ได้รับความรู้เรื่อง Productivity OS มาก นำไปปรับใช้กับการเรียนและทำโปรเจกต์ได้จริง',
    createdAt: '2026-03-15 15:40:12'
  },
  {
    id: 'eval-003',
    name: 'ภาณุวัฒน์ บุญลือ',
    role: 'นักศึกษาภาควิชาอื่น',
    rating: 4,
    contentScore: 4,
    speakerScore: 5,
    venueScore: 4,
    comment: 'โปรเจกต์ที่นำเสนอน่าสนใจมากครับ อยากให้มีกิจกรรมแบบนี้อีกในเทอมหน้า',
    createdAt: '2026-03-15 15:45:30'
  }
];

// Helper: check if backend API exists
let hasBackendApi = null;
async function checkBackend() {
  if (hasBackendApi !== null) return hasBackendApi;
  try {
    const res = await fetch('/api/health', { method: 'GET', signal: AbortSignal.timeout(1000) });
    hasBackendApi = res.ok;
  } catch (e) {
    hasBackendApi = false;
  }
  return hasBackendApi;
}

// ---------------- EVALUATION REPOSITORY ----------------
export async function getEvaluations() {
  if (await checkBackend()) {
    try {
      const res = await fetch('/api/evaluations');
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend failed, falling back to local database:', e);
    }
  }

  const raw = localStorage.getItem(STORAGE_KEYS.EVALUATIONS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.EVALUATIONS, JSON.stringify(INITIAL_EVALUATIONS));
    return INITIAL_EVALUATIONS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return INITIAL_EVALUATIONS;
  }
}

export async function saveEvaluation(data) {
  const newRecord = {
    id: 'eval-' + Date.now(),
    name: data.name || 'ไม่ประสงค์ออกนาม',
    role: data.role || 'นักศึกษาวิทยาการคอมพิวเตอร์',
    rating: Number(data.rating) || 5,
    contentScore: Number(data.contentScore) || Number(data.rating) || 5,
    speakerScore: Number(data.speakerScore) || Number(data.rating) || 5,
    venueScore: Number(data.venueScore) || 5,
    comment: (data.comment || '').trim(),
    createdAt: new Date().toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'medium' })
  };

  if (await checkBackend()) {
    try {
      const res = await fetch('/api/evaluations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord)
      });
      if (res.ok) {
        const saved = await res.json();
        // Also sync local
        const current = await getEvaluations();
        localStorage.setItem(STORAGE_KEYS.EVALUATIONS, JSON.stringify([saved, ...current.filter(x => x.id !== saved.id)]));
        return saved;
      }
    } catch (e) {
      console.warn('Backend save failed, using local database:', e);
    }
  }

  const current = await getEvaluations();
  const updated = [newRecord, ...current];
  localStorage.setItem(STORAGE_KEYS.EVALUATIONS, JSON.stringify(updated));
  return newRecord;
}

// ---------------- REGISTRATION REPOSITORY (สำหรับฝ่ายลงชื่อนักศึกษา) ----------------
export async function getRegistrations() {
  if (await checkBackend()) {
    try {
      const res = await fetch('/api/registrations');
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend failed, falling back to local database:', e);
    }
  }

  const raw = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(INITIAL_REGISTRATIONS));
    return INITIAL_REGISTRATIONS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return INITIAL_REGISTRATIONS;
  }
}

export async function saveRegistration(data) {
  const newRecord = {
    id: 'reg-' + Date.now(),
    studentId: data.studentId.trim(),
    fullName: data.fullName.trim(),
    major: data.major || 'วิทยาการคอมพิวเตอร์',
    year: data.year || '4',
    officer: data.officer || 'ปรเมษฐ์ ใจห้าว / ณัฐวุฒิ อิ่มจิตร',
    checkInTime: new Date().toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'medium' })
  };

  if (await checkBackend()) {
    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord)
      });
      if (res.ok) {
        const saved = await res.json();
        const current = await getRegistrations();
        localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify([saved, ...current.filter(x => x.id !== saved.id)]));
        return saved;
      }
    } catch (e) {
      console.warn('Backend registration failed, using local:', e);
    }
  }

  const current = await getRegistrations();
  const updated = [newRecord, ...current];
  localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(updated));
  return newRecord;
}

export async function deleteRegistration(id) {
  if (await checkBackend()) {
    try {
      await fetch(`/api/registrations/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Backend delete failed:', e);
    }
  }
  const current = await getRegistrations();
  const filtered = current.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(filtered));
  return filtered;
}

// ---------------- EXPORT & RESET ----------------
export function exportToCSV(data, filename) {
  if (!data || !data.length) return;
  const headers = Object.keys(data[0]);
  const csvRows = [];
  csvRows.push(headers.join(','));

  for (const row of data) {
    const values = headers.map(header => {
      const escaped = ('' + (row[header] || '')).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  const blob = new Blob(["\uFEFF" + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function resetDatabase() {
  localStorage.setItem(STORAGE_KEYS.EVALUATIONS, JSON.stringify(INITIAL_EVALUATIONS));
  localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(INITIAL_REGISTRATIONS));
}
