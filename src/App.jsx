
import React, { useState, useEffect } from 'react';

// ⚠️ หมายเหตุ: สำหรับการรันบนคอมพิวเตอร์จริง ให้เอาเครื่องหมาย // บรรทัดล่างนี้ออกนะครับ
// import { createClient } from '@supabase/supabase-js';

// สร้างตัวจำลองเพื่อไม่ให้หน้าต่างพรีวิวขัดข้อง
const createClient = (url, key) => ({
  from: () => ({
    select: () => ({ order: () => Promise.resolve({ data: [], error: null }) }),
    upsert: () => Promise.resolve({ error: null }),
    delete: () => ({ eq: () => Promise.resolve({ error: null }) })
  }),
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: {}, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: 'https://placehold.co/600x400?text=Mock+Image' } })
    })
  }
});

// ==========================================
// ⚠️ ใส่ URL และ KEY ของ Supabase ของคุณที่นี่
// ==========================================
const SUPABASE_URL = 'https://atbyudnixujiwlxepchh.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_leBQo88PZWYV800h4C6dUA_Oj4gMzMm';

// สร้างตัวเชื่อมต่อฐานข้อมูล
const isSupabaseConfigured = SUPABASE_URL.includes('supabase.co') && !SUPABASE_URL.includes('XXXXXXXXXX');
const supabase = isSupabaseConfigured ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// ==========================================
// ข้อมูลตั้งต้น
// ==========================================
const PROJECT_LIST = [
  {
    zone: "จุฬา-สามย่าน",
    projects: [
      "IDEO CHULA SAMYAN", "IDEO Q CHULA SAMYAN", "ASHTON CHULA SILOM", "THE NEST CHULA SAMYAN",
      "PARK ORIGIN CHULA SAMYAN", "CHAPTER CHULA SAMYAN", "TRIPLE Y RESIDENCE", "CULTURE CHULA",
      "THE SEED MEMORIES SIAM", "THE ROOM RAMA 4", "COOPER SIAM", "WISH @ SAMYAN", "VERTIQ",
      "Siamese Surawong", "SALADAENG ONE", "KLASS SIAM", "IDEO Q SIAM RATCHATHEWI",
      "PYNE BY SANSIRI", "THE LINE RATCHATHEWI", "IDEO MOBI RAMA 4"
    ]
  },
  {
    zone: "ปิ่นเกล้า-จรัญฯ-ศิริราช",
    projects: [
      "THE ORIGIN PINKLAO", "THE NIGH CONDO PINKLAO-CHARAN", "FEEL CONDO PINKLAO-CHARAN 59",
      "THE PARKLAND CHARAN-PINKLAO", "LIFE PINKLAO", "PLUM CONDO PINKLAO STATION",
      "ASPIRE PINKLAO-ARUN AMARIN", "LUMPINI SELECTED CHARAN 65-SIRINDHORN",
      "IDEO MOBI CHARAN-INTERCHANGE", "IDEO CHARAN 70-RIVERVIEW", "SUN CITY MRT YAEK FAI CHAI",
      "DBURA PRANNOK", "THE TREE CHARAN 30", "THE TREE RIO BANG-AOR STATION",
      "THE TREE CHARAN-BANG PHLAT", "LUMPINI PARK PINKLAO", "LUMPINI PLACE BOROM RATCHACHONNANI",
      "NUE NOBLE FAICHAI WANGLANG", "D CONDO PINKLAO", "ORIGIN PLUG & PLAY SIRINDHORN STATION",
      "ORIGIN PLAY BANGKHUNNON TRIPLE STATION", "CHATEAU IN TOWN PINKLAO-SIRIRAJ",
      "THE PRIVACY CHARAN-RATCHAWITHI STATION", "THE PRIVACY CHARAN 30",
      "THE PRIVACY CHARAN 30 PHASE 2", "D CONDO PANA", "D CONDO CAMPUS RESORT RATCHAPRUEK",
      "THE TREE PHRAN NOK", "THE TREE INTERCHANGE", "SUPALAI PARK YAEK FAI CHAI STATION",
      "SUPALAI CITY RESORT CHARAN 91", "SUPALAI LOFT YAEK FAI CHAI STATION",
      "THE PRESIDENT CHARAN-YAEK FAI CHAI", "THE PRESIDENT PETCHKASEM-BANGKHAE",
      "BANGKOK HORIZON P48", "BANGKOK HORIZON RATCHADA-THAPRA", "THANA ASTORIA PINKLAO",
      "THANA ASTORIA CHARAN 40", "THANA TRI", "COMMON TU", "UNIO CHARAN 3",
      "UNIO CHARAN 3 PHASE 2", "UNIO H CHARAN 3", "RICH PARK @ CHARAN 13",
      "CITY HOME RATCHADA-PINKLAO", "MY CONDO PINKLAO"
    ]
  },
  {
    zone: "ตลาดพลู-ท่าพระ",
    projects: [
      "THE KEY WUTTHAKAT", "ASPIRE SATHORN-THAPRA", "IDEO SATHORN-THAPRA",
      "THE PARKLAND GRAND TAKSIN", "THE PRESIDENT SATHORN-RATCHAPHRUEK",
      "WHIZDOM STATION RATCHADA-THAPRA", "LIFE @ BTS THAPRA", "SUPALAI PARK TALAT PHLU STATION",
      "RHYTHM SATHORN-NARATHIWAS", "METRO PARK SATHORN", "THE TEMPO GRAND SATHORN-WUTTHAKAT",
      "PELA WUTTHAKAT", "RICH POINT @ BTS WUTTHAKAT", "THE BASE WUTTHAKAT",
      "ALTITUDE UNICORN SATHORN-THAPRA"
    ]
  }
];

const THEMES = {
  blue: { id: 'blue', name: 'สีฟ้า', bg: 'bg-blue-600', hover: 'hover:bg-blue-700', text: 'text-blue-600', light: 'bg-blue-50', border: 'border-blue-600', ring: 'focus:ring-blue-500' },
  green: { id: 'green', name: 'สีเขียว', bg: 'bg-emerald-600', hover: 'hover:bg-emerald-700', text: 'text-emerald-600', light: 'bg-emerald-50', border: 'border-emerald-600', ring: 'focus:ring-emerald-500' },
  rose: { id: 'rose', name: 'สีแดง/ชมพู', bg: 'bg-rose-600', hover: 'hover:bg-rose-700', text: 'text-rose-600', light: 'bg-rose-50', border: 'border-rose-600', ring: 'focus:ring-rose-500' },
  purple: { id: 'purple', name: 'สีม่วง', bg: 'bg-purple-600', hover: 'hover:bg-purple-700', text: 'text-purple-600', light: 'bg-purple-50', border: 'border-purple-600', ring: 'focus:ring-purple-500' },
  pastelPink: { id: 'pastelPink', name: 'พาสเทลชมพู', bg: 'bg-pink-400', hover: 'hover:bg-pink-500', text: 'text-pink-600', light: 'bg-pink-50', border: 'border-pink-400', ring: 'focus:ring-pink-400' },
  pastelBlue: { id: 'pastelBlue', name: 'พาสเทลฟ้า', bg: 'bg-sky-400', hover: 'hover:bg-sky-500', text: 'text-sky-600', light: 'bg-sky-50', border: 'border-sky-400', ring: 'focus:ring-sky-400' },
  pastelGreen: { id: 'pastelGreen', name: 'พาสเทลเขียว', bg: 'bg-teal-400', hover: 'hover:bg-teal-500', text: 'text-teal-600', light: 'bg-teal-50', border: 'border-teal-400', ring: 'focus:ring-teal-400' },
  pastelPeach: { id: 'pastelPeach', name: 'พาสเทลพีช', bg: 'bg-orange-400', hover: 'hover:bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50', border: 'border-orange-400', ring: 'focus:ring-orange-400' }
};

const Icons = {
  User: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Shield: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Edit: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>,
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Close: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Warning: () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  ChevronLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
  Settings: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
  Lock: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
  Image: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
};

// ==========================================
// Components
// ==========================================

const SettingsModal = ({ isOpen, onClose, config, onSave }) => {
  const [formData, setFormData] = useState({ ...config });
  const [newPassword, setNewPassword] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      setFormData({ ...config });
      setNewPassword('');
    }
  }, [isOpen, config]);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, logoUrl: reader.result });
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = { ...formData };
    if (newPassword.trim() !== '') dataToSave.adminPassword = newPassword;
    onSave(dataToSave);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Icons.Settings /> ตั้งค่าเว็บไซต์</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-200"><Icons.Close /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">ชื่อโครงการ / บริษัท</label>
            <input required type="text" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">รูปภาพโลโก้</label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer bg-gray-50 border border-gray-300 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
                <Icons.Image /> อัปโหลดรูปภาพ
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>
            </div>
            {formData.logoUrl && (
              <div className="mt-3 relative inline-block">
                 <img src={formData.logoUrl} alt="Logo" className="h-12 object-contain rounded border border-gray-200 p-2 bg-gray-50 shadow-sm" />
                 <button type="button" onClick={() => setFormData({...formData, logoUrl: ''})} className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 shadow-sm transition-colors"><Icons.Close /></button>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">โทนสีของเว็บไซต์</label>
            <div className="grid grid-cols-2 gap-3">
              {Object.values(THEMES).map(theme => (
                <div key={theme.id} onClick={() => setFormData({...formData, theme: theme.id})} className={`cursor-pointer border-2 rounded-lg p-3 flex items-center gap-2 transition-all ${formData.theme === theme.id ? theme.border + ' bg-gray-50 shadow-sm' : 'border-gray-100 hover:border-gray-200'}`}>
                  <div className={`w-5 h-5 rounded-full ${theme.bg}`}></div><span className="text-sm font-medium text-gray-700">{theme.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <label className="block text-sm font-medium text-gray-600 mb-1">รหัสผ่านแอดมินใหม่ (เว้นว่างหากไม่เปลี่ยน)</label>
            <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="ตั้งรหัสผ่านใหม่..." className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-gray-500" />
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 font-medium transition-colors">ยกเลิก</button>
            <button type="submit" className={`flex-1 py-2.5 rounded-lg text-white font-medium transition-colors ${THEMES[formData.theme].bg} ${THEMES[formData.theme].hover} shadow-sm`}>บันทึก</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UnitCard = ({ unit, themeConfig }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = unit.images && unit.images.length > 0 ? unit.images : ['https://placehold.co/600x400/e2e8f0/475569?text=No+Image'];
  const nextImage = (e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev + 1) % images.length); };
  const prevImage = (e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length); };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 flex flex-col">
      <div className="h-48 overflow-hidden relative group bg-gray-100">
        <img src={images[currentImageIndex]} alt={`ห้อง ${unit.unitNumber}`} className="w-full h-full object-cover transition-all duration-300" />
        {images.length > 1 && (
          <>
            <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={prevImage} className="p-1 rounded-full bg-black/40 text-white hover:bg-black/60"><Icons.ChevronLeft /></button>
              <button onClick={nextImage} className="p-1 rounded-full bg-black/40 text-white hover:bg-black/60"><Icons.ChevronRight /></button>
            </div>
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
              {images.map((_, idx) => <div key={idx} className={`w-1.5 h-1.5 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} />)}
            </div>
          </>
        )}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${unit.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {unit.status === 'available' ? 'ว่าง' : 'มีผู้เช่า'}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-2">
          <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${themeConfig.light} ${themeConfig.text} mb-2`}>{unit.projectName || 'ไม่ระบุโครงการ'}</span>
        </div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">ห้อง {unit.unitNumber}</h3>
            <p className="text-gray-500 text-sm mt-1">{unit.building} • ชั้น {unit.floor}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">ราคา/เดือน</p>
            <p className={`text-lg font-bold ${themeConfig.text}`}>฿{unit.price}</p>
          </div>
        </div>
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
          <span className="flex items-center gap-1 font-medium"><Icons.Shield /> {unit.size}</span>
          <button className={`px-4 py-2 rounded-lg font-medium transition-colors shadow-sm ${unit.status === 'available' ? `${themeConfig.light} ${themeConfig.text} ${themeConfig.hover} hover:text-white` : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`} disabled={unit.status !== 'available'}>
            {unit.status === 'available' ? 'สนใจติดต่อ' : 'ไม่ว่าง'}
          </button>
        </div>
      </div>
    </div>
  );
};

const PublicView = ({ units, themeConfig }) => (
  <div className="p-6 max-w-7xl mx-auto animate-in fade-in duration-300">
    <div className="mb-8"><h2 className="text-3xl font-bold text-gray-800">รายการห้องชุดโครงการ</h2><p className="text-gray-500 mt-2">เลือกชมห้องที่น่าสนใจสำหรับคุณ</p></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {units.length === 0 ? (
         <div className="col-span-full py-12 text-center text-gray-400 bg-white rounded-xl border border-gray-100 border-dashed">
           <p className="text-lg">ยังไม่มีข้อมูลห้องในระบบ</p>
         </div>
      ) : (
        units.map((unit) => <UnitCard key={unit.id} unit={unit} themeConfig={themeConfig} />)
      )}
    </div>
  </div>
);

const AdminView = ({ units, onEdit, onDelete, onAddNew, onOpenSettings, themeConfig, isLoading }) => (
  <div className="p-6 max-w-7xl mx-auto animate-in fade-in duration-300">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Icons.Shield /> ระบบจัดการข้อมูลแอดมิน</h2>
        <p className="text-gray-500 mt-1">จัดการข้อมูลห้องและเจ้าของห้องทั้งหมด</p>
      </div>
      <div className="flex gap-2">
        <button onClick={onOpenSettings} className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-sm transition-colors"><Icons.Settings /> ตั้งค่าเว็บ</button>
        <button onClick={onAddNew} className={`${themeConfig.bg} ${themeConfig.hover} text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-sm transition-colors`}><Icons.Plus /> เพิ่มข้อมูลห้อง</button>
      </div>
    </div>
    
    {!isSupabaseConfigured && (
      <div className="mb-6 p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg text-orange-800 flex items-start gap-3">
        <Icons.Warning />
        <div>
          <h4 className="font-bold">ยังไม่ได้เชื่อมต่อ Supabase!</h4>
          <p className="text-sm mt-1">ข้อมูลที่เห็นตอนนี้เป็นการจำลองในเครื่อง (ข้อมูลจะหายเมื่อรีเฟรช) กรุณานำ URL และ Key จากเว็บ Supabase มาใส่ในโค้ดบรรทัดที่ 8-9 เพื่อให้ใช้งานได้จริง</p>
        </div>
      </div>
    )}

    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600">
              <th className="p-4 font-semibold text-sm">โครงการ / ห้อง</th>
              <th className="p-4 font-semibold text-sm">ข้อมูลห้อง</th>
              <th className="p-4 font-semibold text-sm">สถานะ</th>
              <th className={`p-4 font-semibold text-sm ${themeConfig.light}`}>ข้อมูลเจ้าของ</th>
              <th className={`p-4 font-semibold text-sm ${themeConfig.light}`}>ติดต่อ</th>
              <th className="p-4 font-semibold text-sm text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr><td colSpan="6" className="p-12 text-center text-gray-500">กำลังโหลดข้อมูล...</td></tr>
            ) : units.length === 0 ? (
              <tr><td colSpan="6" className="p-12 text-center text-gray-500">ไม่มีข้อมูลในระบบ กดปุ่ม "เพิ่มข้อมูลห้อง" เพื่อเริ่มต้น</td></tr>
            ) : units.map((unit) => (
              <tr key={unit.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className={`font-bold ${themeConfig.text} text-sm mb-1`}>{unit.projectName}</div>
                  <div className="font-semibold text-gray-800">ห้อง {unit.unitNumber}</div>
                  <div className="text-xs text-gray-500">{unit.building}</div>
                </td>
                <td className="p-4 text-sm text-gray-600"><div>ชั้น {unit.floor}</div><div>ขนาด {unit.size}</div></td>
                <td className="p-4">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold shadow-sm ${unit.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{unit.status === 'available' ? 'ว่าง' : 'มีผู้เช่า'}</span>
                  <div className="text-xs font-medium text-gray-600 mt-1">฿{unit.price}/ด.</div>
                </td>
                <td className={`p-4 text-sm ${themeConfig.light} bg-opacity-50`}><div className="font-medium text-gray-800">{unit.ownerName}</div></td>
                <td className={`p-4 text-sm text-gray-600 ${themeConfig.light} bg-opacity-50`}><div>{unit.ownerPhone}</div><div className="text-xs text-gray-500">{unit.ownerEmail}</div></td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => onEdit(unit)} className={`p-2 ${themeConfig.text} ${themeConfig.light} hover:bg-opacity-70 rounded-lg transition-colors`} title="แก้ไข"><Icons.Edit /></button>
                    <button onClick={() => onDelete(unit.id)} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors" title="ลบ"><Icons.Trash /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const UnitFormModal = ({ isOpen, onClose, onSave, unitToEdit, themeConfig }) => {
  const [formData, setFormData] = useState({ projectName: '', unitNumber: '', building: '', floor: '', size: '', status: 'available', price: '', ownerName: '', ownerPhone: '', ownerEmail: '', images: [] });
  const [isCompressing, setIsCompressing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      setFormData(unitToEdit ? { ...unitToEdit, images: unitToEdit.images ? [...unitToEdit.images] : [] } : { projectName: '', unitNumber: '', building: '', floor: '', size: '', status: 'available', price: '', ownerName: '', ownerPhone: '', ownerEmail: '', images: [] });
      setUploadStatus('');
    }
  }, [isOpen, unitToEdit]);

  if (!isOpen) return null;

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, images: [...prev.images, reader.result] }));
      reader.readAsDataURL(file);
    });
    e.target.value = null;
  };

  const removeImage = (index) => setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsCompressing(true);
    setUploadStatus('กำลังบันทึกข้อมูล...');
    const cleanedData = { ...formData };
    
    // ส่ง callback progress ไปด้วยเพื่อโชว์สถานะ
    onSave(cleanedData, setUploadStatus).finally(() => setIsCompressing(false));
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl my-8 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">{unitToEdit ? 'แก้ไขข้อมูลห้อง' : 'เพิ่มข้อมูลห้องใหม่'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1"><Icons.Close /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700 border-b pb-2">ข้อมูลห้องพัก (หน้าลูกค้า)</h4>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">ชื่อโครงการ</label>
                <select required name="projectName" value={formData.projectName} onChange={handleChange} className={`w-full border border-gray-300 rounded-lg p-2.5 outline-none bg-white ${themeConfig.ring} focus:ring-2`}>
                  <option value="">-- เลือกโครงการ --</option>
                  {PROJECT_LIST.map((zoneData, idx) => (
                    <optgroup key={idx} label={`โซน: ${zoneData.zone}`}>
                      {zoneData.projects.map((proj, pIdx) => <option key={pIdx} value={proj}>{proj}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-600 mb-1">เลขห้อง</label><input required type="text" name="unitNumber" value={formData.unitNumber} onChange={handleChange} className={`w-full border border-gray-300 rounded-lg p-2.5 outline-none ${themeConfig.ring} focus:ring-2`} /></div>
                <div><label className="block text-sm font-medium text-gray-600 mb-1">อาคาร</label><input type="text" name="building" value={formData.building} onChange={handleChange} className={`w-full border border-gray-300 rounded-lg p-2.5 outline-none ${themeConfig.ring} focus:ring-2`} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-600 mb-1">ชั้น</label><input required type="text" name="floor" value={formData.floor} onChange={handleChange} className={`w-full border border-gray-300 rounded-lg p-2.5 outline-none ${themeConfig.ring} focus:ring-2`} /></div>
                <div><label className="block text-sm font-medium text-gray-600 mb-1">ขนาด</label><input required type="text" name="size" value={formData.size} onChange={handleChange} className={`w-full border border-gray-300 rounded-lg p-2.5 outline-none ${themeConfig.ring} focus:ring-2`} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-600 mb-1">ราคา/เดือน</label><input required type="text" name="price" value={formData.price} onChange={handleChange} className={`w-full border border-gray-300 rounded-lg p-2.5 outline-none ${themeConfig.ring} focus:ring-2`} /></div>
                <div><label className="block text-sm font-medium text-gray-600 mb-1">สถานะ</label><select name="status" value={formData.status} onChange={handleChange} className={`w-full border border-gray-300 rounded-lg p-2.5 outline-none bg-white ${themeConfig.ring} focus:ring-2`}><option value="available">ว่าง (พร้อมเช่า)</option><option value="occupied">มีผู้เช่าแล้ว</option></select></div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className={`font-semibold ${themeConfig.text} border-b ${themeConfig.border} border-opacity-20 pb-2 flex items-center gap-2`}><Icons.Shield /> ข้อมูลส่วนตัวเจ้าของ</h4>
              <div><label className="block text-sm font-medium text-gray-600 mb-1">ชื่อ-นามสกุล</label><input required type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} className={`w-full border border-gray-300 rounded-lg p-2.5 outline-none ${themeConfig.light} ${themeConfig.ring} focus:ring-2`} /></div>
              <div><label className="block text-sm font-medium text-gray-600 mb-1">เบอร์โทรศัพท์</label><input required type="text" name="ownerPhone" value={formData.ownerPhone} onChange={handleChange} className={`w-full border border-gray-300 rounded-lg p-2.5 outline-none ${themeConfig.light} ${themeConfig.ring} focus:ring-2`} /></div>
              <div><label className="block text-sm font-medium text-gray-600 mb-1">ID LINE</label><input type="text" name="ownerIDLINE" value={formData.ownerIDLINE} onChange={handleChange} className={`w-full border border-gray-300 rounded-lg p-2.5 outline-none ${themeConfig.light} ${themeConfig.ring} focus:ring-2`} /></div>
              <div><label className="block text-sm font-medium text-gray-600 mb-1">LINK</label><input type="text" name="ownerLINK" value={formData.ownerLINK} onChange={handleChange} className={`w-full border border-gray-300 rounded-lg p-2.5 outline-none ${themeConfig.light} ${themeConfig.ring} focus:ring-2`} /></div>
              <div className="space-y-3">
                <div className="flex justify-between items-center mt-4">
                  <label className="block text-sm font-medium text-gray-600">รูปภาพห้อง</label>
                  <label className={`cursor-pointer text-xs ${themeConfig.text} font-medium flex items-center gap-1 hover:underline bg-gray-50 px-2 py-1 rounded border border-gray-200`}><Icons.Plus /> เพิ่มรูปภาพ<input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" /></label>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {formData.images.map((imgSrc, index) => (
                    <div key={index} className="relative group border border-gray-200 rounded-lg overflow-hidden bg-gray-50 h-24 shadow-sm">
                      <img src={imgSrc} alt="preview" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500/90 hover:bg-red-600 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"><Icons.Trash /></button>
                    </div>
                  ))}
                  {formData.images.length === 0 && (
                     <div className="col-span-3 py-4 text-center text-xs text-gray-400 border border-dashed rounded-lg">ยังไม่มีรูปภาพ</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm font-medium text-blue-600">{uploadStatus}</span>
            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 font-medium transition-colors">ยกเลิก</button>
              <button type="submit" disabled={isCompressing} className={`px-5 py-2.5 rounded-lg ${themeConfig.bg} ${themeConfig.hover} shadow-sm text-white font-medium transition-colors disabled:opacity-50 flex items-center gap-2`}>
                {isCompressing ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  
  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    await onConfirm();
    setIsDeleting(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center animate-in zoom-in-95 duration-200">
        <div className="flex justify-center mb-4"><Icons.Warning /></div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">ยืนยันการลบข้อมูล</h3>
        <p className="text-gray-500 mb-6">คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลห้องนี้? การกระทำนี้ไม่สามารถย้อนกลับได้</p>
        <div className="flex gap-3 justify-center">
          <button onClick={onClose} disabled={isDeleting} className="flex-1 py-2.5 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 font-medium disabled:opacity-50">ยกเลิก</button>
          <button onClick={handleConfirm} disabled={isDeleting} className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium shadow-sm disabled:opacity-50">{isDeleting ? 'กำลังลบ...' : 'ลบข้อมูล'}</button>
        </div>
      </div>
    </div>
  );
}

const LoginModal = ({ isOpen, onClose, onLogin, themeConfig, expectedPassword }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  React.useEffect(() => { if (isOpen) { setPassword(''); setError(''); } }, [isOpen]);
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === expectedPassword) onLogin(); else setError('รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่');
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 animate-in zoom-in-95 duration-200">
        <div className="flex justify-center mb-4 text-gray-800"><Icons.Lock /></div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">เข้าสู่ระบบแอดมิน</h3>
        <p className="text-gray-500 mb-6 text-center text-sm">กรุณาใส่รหัสผ่านเพื่อจัดการข้อมูล</p>
        <form onSubmit={handleSubmit}>
          <input type="password" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="รหัสผ่าน..." className={`w-full border ${error ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 ' + themeConfig.ring} rounded-lg p-3 outline-none focus:ring-2 mb-2 text-center text-lg tracking-widest`} />
          {error && <p className="text-red-500 text-xs text-center mb-4">{error}</p>}
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 font-medium">ยกเลิก</button>
            <button type="submit" className={`flex-1 py-2.5 rounded-lg ${themeConfig.bg} hover:${themeConfig.hover} text-white font-medium shadow-sm`}>ยืนยัน</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// Main App Component
// ==========================================
export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [units, setUnits] = useState([]);
  
  // โหลดการตั้งค่าจาก LocalStorage ของเบราว์เซอร์
  const [appConfig, setAppConfig] = useState(() => {
    const saved = localStorage.getItem('condoAppConfig');
    return saved ? JSON.parse(saved) : { companyName: 'CondoSpace', logoUrl: '', theme: 'blue', adminPassword: 'admin' };
  });
  
  const themeConfig = THEMES[appConfig.theme] || THEMES.blue;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // ดึงข้อมูลจาก Supabase เมื่อเปิดเว็บ
  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    setIsLoading(true);
    if (isSupabaseConfigured) {
      // ดึงจาก Supabase
      const { data, error } = await supabase.from('units').select('*').order('id', { ascending: false });
      if (!error && data) {
        setUnits(data);
      } else {
        console.error("Error fetching units:", error);
      }
    } else {
      // ข้อมูลจำลองหากยังไม่ได้ต่อฐานข้อมูล
      setUnits([{
        id: "mock1", projectName: "IDEO CHULA SAMYAN", unitNumber: "A-101", building: "ตึก A", floor: 12, size: "35 ตร.ม.",
        status: "available", price: "15,000", ownerName: "สมชาย ใจดี", ownerPhone: "081-234-5678", ownerEmail: "somchai@example.com",
        images: ["https://placehold.co/600x400/e2e8f0/475569?text=IDEO+CHULA"]
      }]);
    }
    setIsLoading(false);
  };

  const handleSave = async (unitData, setUploadStatus) => {
    const dataToSave = { ...unitData };
    let finalImageUrls = [];

    if (isSupabaseConfigured) {
      // 1. อัปโหลดรูปภาพใหม่ไปที่ Storage
      for (const [index, img] of unitData.images.entries()) {
        if (img.startsWith('data:image')) {
          setUploadStatus(`กำลังอัปโหลดรูปภาพที่ ${index + 1}...`);
          try {
            // แปลง Base64 เป็นไฟล์ Blob
            const res = await fetch(img);
            const blob = await res.blob();
            // ตั้งชื่อไฟล์ให้ไม่ซ้ำกัน
            const fileName = `room-${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
            
            // อัปโหลดเข้า Storage ชื่อ condo-images
            const { data, error } = await supabase.storage.from('condo-images').upload(fileName, blob);
            
            if (!error) {
              // ขอลิ้งค์รูปแบบ Public เพื่อเก็บลง Database
              const { data: publicUrlData } = supabase.storage.from('condo-images').getPublicUrl(fileName);
              finalImageUrls.push(publicUrlData.publicUrl);
            } else {
              console.error("Upload error:", error);
            }
          } catch (e) {
            console.error("Error converting image:", e);
          }
        } else {
          // ถ้ารูปเป็น URL อยู่แล้ว (มาจากรูปเดิมตอนแก้ไข)
          finalImageUrls.push(img);
        }
      }
      
      dataToSave.images = finalImageUrls.length > 0 ? finalImageUrls : [];
      setUploadStatus('กำลังบันทึกข้อมูลลงฐานข้อมูล...');
      
      // 2. บันทึกข้อมูลลงตาราง units
      if (!dataToSave.id) dataToSave.id = Date.now().toString(); // สร้าง ID ใหม่ถ้าเป็นการเพิ่ม
      
      const { error: dbError } = await supabase.from('units').upsert(dataToSave);
      
      if (!dbError) {
        await fetchUnits(); // รีเฟรชข้อมูลใหม่
      } else {
        console.error("DB Save error:", dbError);
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล: " + dbError.message);
      }
      
    } else {
      // การทำงานแบบจำลอง (In-memory) กรณีไม่ได้ต่อ Database
      dataToSave.id = editingUnit ? editingUnit.id : Date.now().toString();
      if (editingUnit) {
        setUnits(units.map(u => u.id === editingUnit.id ? dataToSave : u));
      } else {
        setUnits([dataToSave, ...units]);
      }
    }
    
    setIsModalOpen(false);
    setEditingUnit(null);
  };

  const handleSaveSettings = (newConfig) => {
    // บันทึกการตั้งค่าลง LocalStorage
    setAppConfig(newConfig);
    localStorage.setItem('condoAppConfig', JSON.stringify(newConfig));
    setIsSettingsOpen(false);
  };

  const confirmDelete = async () => {
    if (deleteId !== null) {
      if (isSupabaseConfigured) {
        // ลบข้อมูลจาก Supabase
        const { error } = await supabase.from('units').delete().eq('id', deleteId);
        if (!error) {
          await fetchUnits();
        } else {
          console.error("Delete error:", error);
          alert("ไม่สามารถลบข้อมูลได้");
        }
      } else {
        // การทำงานแบบจำลอง
        setUnits(units.filter(u => u.id !== deleteId));
      }
      setDeleteId(null);
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 font-sans text-gray-900 selection:${themeConfig.light}`}>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex flex-shrink-0 items-center gap-3">
              {appConfig.logoUrl ? (
                <img src={appConfig.logoUrl} alt="Logo" className="h-8 object-contain" />
              ) : (
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm ${themeConfig.bg}`}>
                  {appConfig.companyName.charAt(0)}
                </div>
              )}
              <span className={`font-bold text-xl tracking-tight ${themeConfig.text} truncate max-w-[150px] sm:max-w-xs`}>{appConfig.companyName}</span>
            </div>
            
            <div className="flex items-center">
              <div className="flex p-1 bg-gray-100 rounded-lg border border-gray-200">
                <button onClick={() => setIsAdmin(false)} className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${!isAdmin ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                  <Icons.User /> <span className="hidden sm:inline">ลูกค้าทั่วไป</span>
                </button>
                {isAdmin ? (
                  <button onClick={() => { setIsAdmin(false); setIsAuthenticated(false); }} className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${themeConfig.bg} text-white shadow-sm`}>
                    <Icons.Lock /> <span className="hidden sm:inline">ออกจากระบบ</span>
                  </button>
                ) : (
                  <button onClick={() => isAuthenticated ? setIsAdmin(true) : setShowLogin(true)} className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 text-gray-500 hover:text-gray-700">
                    <Icons.Shield /> <span className="hidden sm:inline">แอดมิน</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="pb-12 pt-4">
        {isAdmin ? (
          <AdminView units={units} themeConfig={themeConfig} isLoading={isLoading} onEdit={(u) => { setEditingUnit(u); setIsModalOpen(true); }} onDelete={(id) => setDeleteId(id)} onAddNew={() => { setEditingUnit(null); setIsModalOpen(true); }} onOpenSettings={() => setIsSettingsOpen(true)} />
        ) : (
          <PublicView units={units} themeConfig={themeConfig} />
        )}
      </main>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} config={appConfig} onSave={handleSaveSettings} />
      <UnitFormModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingUnit(null); }} onSave={handleSave} unitToEdit={editingUnit} themeConfig={themeConfig} />
      <DeleteConfirmModal isOpen={deleteId !== null} onClose={() => setDeleteId(null)} onConfirm={confirmDelete} />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} themeConfig={themeConfig} expectedPassword={appConfig.adminPassword} onLogin={() => { setIsAuthenticated(true); setIsAdmin(true); setShowLogin(false); }} />
    </div>
  );
}