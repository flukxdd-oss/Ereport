import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 4000;
const DB_FILE = path.join(__dirname, 'database.json');
const DIST_DIR = path.join(__dirname, '..', 'dist');

// Ensure DB file exists
function loadDatabase() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      evaluations: [
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
        }
      ],
      registrations: [
        {
          id: 'reg-001',
          studentId: '664244101',
          fullName: 'กิตติศักดิ์ มณีโชติ',
          major: 'วิทยาการคอมพิวเตอร์',
          year: '4',
          officer: 'ปรเมษฐ์ ใจห้าว',
          checkInTime: '2026-03-15 08:32:15'
        },
        {
          id: 'reg-002',
          studentId: '664244105',
          fullName: 'ชลธิชา ศรีสุข',
          major: 'วิทยาการคอมพิวเตอร์',
          year: '4',
          officer: 'ณัฐวุฒิ อิ่มจิตร',
          checkInTime: '2026-03-15 08:35:40'
        }
      ]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  } catch (e) {
    console.error('Failed reading DB file, returning empty:', e);
    return { evaluations: [], registrations: [] };
  }
}

function saveDatabase(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// MIME types mapper
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
};

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // --- API ROUTES ---
  if (pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', serverTime: new Date().toISOString() }));
    return;
  }

  if (pathname === '/api/evaluations') {
    const db = loadDatabase();
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(db.evaluations || []));
      return;
    }
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const newEval = JSON.parse(body);
          if (!newEval.id) newEval.id = 'eval-' + Date.now();
          if (!newEval.createdAt) newEval.createdAt = new Date().toLocaleString('th-TH');
          db.evaluations = [newEval, ...(db.evaluations || [])];
          saveDatabase(db);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(newEval));
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON body' }));
        }
      });
      return;
    }
  }

  if (pathname === '/api/registrations') {
    const db = loadDatabase();
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(db.registrations || []));
      return;
    }
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const newReg = JSON.parse(body);
          if (!newReg.id) newReg.id = 'reg-' + Date.now();
          if (!newReg.checkInTime) newReg.checkInTime = new Date().toLocaleString('th-TH');
          db.registrations = [newReg, ...(db.registrations || [])];
          saveDatabase(db);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(newReg));
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON body' }));
        }
      });
      return;
    }
  }

  if (pathname.startsWith('/api/registrations/') && req.method === 'DELETE') {
    const id = pathname.replace('/api/registrations/', '');
    const db = loadDatabase();
    db.registrations = (db.registrations || []).filter(item => item.id !== id);
    saveDatabase(db);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, deletedId: id }));
    return;
  }

  // --- STATIC FILE SERVING (Production Build in dist/) ---
  let filePath = path.join(DIST_DIR, pathname === '/' ? 'index.html' : pathname);
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // Fallback to dist/index.html for SPA routing
  const fallbackIndex = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(fallbackIndex)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(fallbackIndex).pipe(res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 Not Found - Please run "npm run build" to generate static assets.');
});

server.listen(PORT, () => {
  console.log(`[CS Seminar E-Report Server] Running on http://localhost:${PORT}`);
});
