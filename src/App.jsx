
import React, { useState, useEffect } from 'react';

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

const POPULAR_ZONES = [
  { name: "พระราม 9", bg: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
  { name: "อโศก ทองหล่อ", bg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" },
  { name: "รัชดา ห้วยขวาง", bg: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80" },
  { name: "สาทร", bg: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80" }
];

const SEARCH_TABS = ['หาซื้อ', 'หาเช่า', 'บทความ', 'ประกันภัย ให้เช่าหายห่วง', 'ทรัพย์ใกล้ฉัน', 'คอนโดใกล้ BTS', 'คอนโดใกล้ MRT', 'คอนโดใกล้มหาวิทยาลัย'];
const PROPERTY_CATEGORIES = [
  { name: 'คอนโด', icon: '🏢' },
  { name: 'บ้านเดี่ยว', icon: '🏡' },
  { name: 'ทาวน์โฮม', icon: '🏘️' },
  { name: 'บ้านแฝด', icon: '🏠' },
  { name: 'ที่ดิน', icon: '🗺️' },
  { name: 'ตึกแถว', icon: '🏬' },
  { name: 'สำนักงาน', icon: '🏢' },
  { name: 'โฮมออฟฟิศ', icon: '💻' },
  { name: 'ร้านค้า', icon: '🏪' },
];

const THEMES = {
  blue: { id: 'blue', name: 'สีฟ้า', bg: 'bg-blue-600', hover: 'hover:bg-blue-700', text: 'text-blue-600', light: 'bg-blue-50', border: 'border-blue-600', ring: 'focus:ring-blue-500' },
  green: { id: 'green', name: 'สีเขียว', bg: 'bg-emerald-600', hover: 'hover:bg-emerald-700', text: 'text-emerald-600', light: 'bg-emerald-50', border: 'border-emerald-600', ring: 'focus:ring-emerald-500' },
  rose: { id: 'rose', name: 'สีแดง/ชมพู', bg: 'bg-rose-600', hover: 'hover:bg-rose-700', text: 'text-rose-600', light: 'bg-rose-50', border: 'border-rose-600', ring: 'focus:ring-rose-500' },
  purple: { id: 'purple', name: 'สีม่วง', bg: 'bg-purple-600', hover: 'hover:bg-purple-700', text: 'text-purple-600', light: 'bg-purple-50', border: 'border-purple-600', ring: 'focus:ring-purple-500' },
  orange: { id: 'orange', name: 'สีส้ม', bg: 'bg-orange-500', hover: 'hover:bg-orange-600', text: 'text-orange-600', light: 'bg-orange-50', border: 'border-orange-500', ring: 'focus:ring-orange-500' },
};

const Icons = {
  User: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  Shield: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  Edit: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  Trash: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  Plus: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
  Close: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  Search: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  ChevronLeft: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>,
  ChevronRight: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>,
  Settings: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Lock: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
  Link: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
  Building: () => <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
};

// ==========================================
// Components
// ==========================================

const SettingsModal = ({ isOpen, onClose, config, onSave }) => {
  const [formData, setFormData] = useState({ ...config });
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-3xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-gray-800"><Icons.Settings /> ตั้งค่าเว็บไซต์</h2>
          <button onClick={onClose} className="p-2 text-gray-500 transition-colors rounded-full hover:bg-gray-200"><Icons.Close /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">ชื่อโครงการ / บริษัท</label>
            <input required type="text" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} className="w-full p-3 border border-gray-300 outline-none rounded-xl focus:border-orange-500" />
          </div>
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">รูปภาพโลโก้</label>
            <div className="flex items-center gap-4">
              <label className="px-4 py-2 text-sm font-bold text-gray-700 transition-colors bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-xl">
                อัปโหลดรูปภาพ
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>
              {formData.logoUrl && <img src={formData.logoUrl} alt="Logo Preview" className="object-contain h-10" />}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">โทนสีของเว็บไซต์</label>
            <div className="grid grid-cols-2 gap-3">
              {Object.values(THEMES).map(theme => (
                <div key={theme.id} onClick={() => setFormData({...formData, theme: theme.id})} className={`cursor-pointer border-2 rounded-xl p-3 flex items-center gap-2 transition-all ${formData.theme === theme.id ? theme.border + ' bg-orange-50 shadow-sm' : 'border-gray-100 hover:border-gray-200'}`}>
                  <div className={`w-5 h-5 rounded-full ${theme.bg}`}></div>
                  <span className="text-sm font-bold text-gray-700">{theme.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">รหัสผ่านแอดมินใหม่ (เว้นว่างหากไม่เปลี่ยน)</label>
            <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="ตั้งรหัสผ่านใหม่..." className="w-full p-3 border border-gray-300 outline-none rounded-xl focus:border-orange-500" />
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="flex-1 py-3 font-bold text-gray-700 transition-colors border border-gray-300 rounded-xl hover:bg-gray-50">ยกเลิก</button>
            <button type="submit" className="flex-1 py-3 font-bold text-white transition-colors bg-orange-500 shadow-lg rounded-xl hover:bg-orange-600 shadow-orange-500/30">บันทึก</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PublicView = ({ units, themeConfig }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('หาซื้อ');
  const [selectedZone, setSelectedZone] = useState('ทั้งหมด');

  const filteredUnits = units.filter(unit => {
    const matchSearch = (unit.projectName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                        (unit.unitNumber || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="pb-24 space-y-12 bg-gray-50/50">
      
      {/* 1. Hero Section (แบบเต็มจอพร้อม Overlay) */}
      <div className="relative h-[500px] w-full flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80" 
            alt="Hero Background" 
            className="object-cover w-full h-full"
          />
          {/* Gradient Overlay เพื่อให้ตัวหนังสืออ่านง่ายขึ้น */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full px-4 pt-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left">
            <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl drop-shadow-lg">
               หาเช่า บ้าน | คอนโด 
            </h1>
            <div className="flex flex-wrap gap-3 mt-4 text-sm font-medium text-white/90 sm:text-base drop-shadow-md">
              <span>คอนโดหรู</span> • <span>เช่าคอนโด</span> • <span>ขายคอนโด</span> • 
              <span>เช่าบ้าน</span> • <span>ขายบ้าน</span> 
            </div>
          </div>
        </div>
      </div>

      {/* 2. Floating Search Box (กล่องค้นหาลอยตัวแบบพรีเมียม) */}
      <div className="relative z-20 w-full max-w-6xl px-4 mx-auto -mt-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white border border-gray-100 shadow-2xl rounded-2xl">
          
          {/* แถบ Tabs ด้านบน */}
          <div className="flex overflow-x-auto border-b border-gray-100 scrollbar-hide">
            {SEARCH_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-6 py-4 text-sm font-semibold transition-colors border-b-2 ${
                  activeTab === tab 
                    ? `border-${themeConfig.id}-500 text-${themeConfig.id}-600 bg-${themeConfig.id}-50/30` 
                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ช่องกรอกข้อมูลค้นหา */}
          <div className="flex flex-col items-center gap-4 p-4 sm:p-6 sm:flex-row">
            <div className="relative flex-grow w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none">
                <Icons.Search />
              </div>
              <input 
                type="text" 
                placeholder="กรอกชื่อ ทำเล / โครงการ / รถไฟฟ้า..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-300 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm sm:text-base shadow-inner"
              />
            </div>
            <button className={`w-full sm:w-auto px-10 py-3.5 ${themeConfig.bg} ${themeConfig.hover} text-white font-bold rounded-full transition-all shadow-md shadow-blue-500/30 whitespace-nowrap`}>
              ค้นหา
            </button>
          </div>
        </div>
      </div>

      {/* 3. หมวดหมู่ประเภทอสังหาฯ */}
      <div className="px-4 pt-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${themeConfig.text}`}>ประเภทอสังหาฯ</h2>
          <div className="flex gap-2">
            <button className="flex items-center justify-center w-8 h-8 text-gray-500 border border-gray-200 rounded-full hover:bg-gray-50"><Icons.ChevronLeft /></button>
            <button className="flex items-center justify-center w-8 h-8 text-gray-500 border border-gray-200 rounded-full hover:bg-gray-50"><Icons.ChevronRight /></button>
          </div>
        </div>
        
        <div className="flex gap-6 py-2 overflow-x-auto scrollbar-hide sm:justify-center">
          {PROPERTY_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3 min-w-[70px] cursor-pointer group">
              <div className={`w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-gray-100 group-hover:${themeConfig.light} group-hover:${themeConfig.border} group-hover:-translate-y-1 transition-all duration-300`}>
                {cat.icon}
              </div>
              <span className={`text-xs font-medium text-gray-600 group-hover:${themeConfig.text}`}>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. ทำเลยอดนิยม (สไตล์รูปเทาตามตัวอย่าง) */}
      <div className="px-4 pt-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${themeConfig.text}`}>ทำเลยอดนิยม</h2>
          <span className={`${themeConfig.text} text-sm font-semibold cursor-pointer hover:underline flex items-center gap-1`}>ทำเลอื่นๆ <Icons.ChevronRight /></span>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {POPULAR_ZONES.map((zone, idx) => (
            <div key={idx} onClick={() => setSearchTerm(zone.name)} className="relative h-56 overflow-hidden bg-gray-400 border border-gray-200 shadow-sm cursor-pointer group rounded-xl">
              {/* ใช้สีเทาเป็นพื้นหลังแทนรูปภาพชั่วคราวเพื่อให้เหมือน Mockup */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 text-center bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <h3 className="text-lg font-bold text-white">{zone.name}</h3>
                <p className="text-gray-200 text-[10px] mt-1 line-clamp-1">ขาย เช่า คอนโด บ้าน ที่ดิน {zone.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Unit Listings Section (รายการประกาศ) */}
      <div className="px-4 pt-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">รายการประกาศล่าสุด</h2>
          <span className="text-sm font-medium px-4 py-1.5 bg-gray-100 rounded-full text-gray-600">พบ {filteredUnits.length} รายการ</span>
        </div>

        {filteredUnits.length === 0 ? (
          <div className="p-16 text-center bg-white border border-gray-100 shadow-sm rounded-3xl">
            <Icons.Building />
            <p className="mt-4 text-lg font-medium text-gray-500">ไม่พบข้อมูลห้องพักที่คุณค้นหา</p>
            <button onClick={() => setSearchTerm('')} className={`mt-4 ${themeConfig.text} font-semibold hover:underline`}>ดูประกาศทั้งหมด</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredUnits.map((unit) => (
              <div key={unit.id} className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-xl group">
                <UnitCard unit={unit} themeConfig={themeConfig} />
              </div>
            ))}
          </div>
        )}
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
    <>
      <div className="relative h-64 overflow-hidden">
        <img src={images[currentImageIndex]} alt={`ห้อง ${unit.unitNumber}`} className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105" />
        {images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"><Icons.ChevronLeft /></button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"><Icons.ChevronRight /></button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, idx) => <div key={idx} className={`w-1.5 h-1.5 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} />)}
            </div>
          </>
        )}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-md ${unit.status === 'available' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
          {unit.status === 'available' ? 'ว่างพร้อมเช่า' : 'ไม่ว่าง'}
        </div>
      </div>
      <div className="flex flex-col justify-between flex-grow p-6 space-y-4">
        <div>
          <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${themeConfig.light} ${themeConfig.text} mb-2`}>{unit.projectName || 'ไม่ระบุโครงการ'}</span>
          <h3 className="text-xl font-bold text-gray-900">ห้อง {unit.unitNumber}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{unit.building ? `${unit.building} • ` : ''}ชั้น {unit.floor} • ขนาด {unit.size}</p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="block text-xs text-gray-400">ราคาเช่า/เดือน</span>
            <span className={`text-xl font-extrabold ${themeConfig.text}`}>฿{unit.price}</span>
          </div>
          <div className="flex gap-2">
            {unit.detailUrl && (
              <a href={unit.detailUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors shadow-sm" title="ดูรายละเอียดเพิ่มเติม">
                <Icons.Link />
              </a>
            )}
            <button className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm ${unit.status === 'available' ? `${themeConfig.bg} ${themeConfig.hover} text-white shadow-${themeConfig.id}-500/20` : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`} disabled={unit.status !== 'available'}>
              {unit.status === 'available' ? 'สนใจติดต่อ' : 'ไม่ว่าง'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const AdminView = ({ units, onEdit, onDelete, onAddNew, onOpenSettings, themeConfig, isLoading }) => (
  <div className="px-4 mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8">
    <div className="flex flex-col items-start justify-between gap-4 p-6 bg-white border border-gray-100 shadow-sm sm:flex-row sm:items-center rounded-3xl">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900">ระบบจัดการหลังบ้าน</h2>
        <p className="mt-1 text-sm text-gray-500">จัดการข้อมูลห้องพักและตั้งค่าเว็บไซต์</p>
      </div>
      <div className="flex w-full gap-3 sm:w-auto">
        <button onClick={onOpenSettings} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors">
          <Icons.Settings /> ตั้งค่าเว็บ
        </button>
        <button onClick={onAddNew} className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl ${themeConfig.bg} ${themeConfig.hover} text-white font-bold transition-all shadow-lg shadow-${themeConfig.id}-500/30`}>
          <Icons.Plus /> เพิ่มห้องใหม่
        </button>
      </div>
    </div>

    {!isSupabaseConfigured && (
      <div className={`p-4 ${themeConfig.light} border-l-4 ${themeConfig.border} rounded-r-2xl text-gray-800 flex items-start gap-3`}>
        <div className={themeConfig.text}><Icons.Shield /></div>
        <div>
          <h4 className="font-bold">คำเตือนระบบ:</h4>
          <p className="mt-1 text-sm text-gray-600">ยังไม่ได้เชื่อมต่อ Supabase ข้อมูลตอนนี้จะเป็นตัวจำลองและจะไม่ถูกบันทึกถาวร</p>
        </div>
      </div>
    )}

    <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="text-gray-600 border-b border-gray-100 bg-gray-50">
              <th className="p-4 text-sm font-bold">โครงการ / ห้อง</th>
              <th className="p-4 text-sm font-bold">ข้อมูลห้อง</th>
              <th className="p-4 text-sm font-bold">สถานะ</th>
              <th className={`p-4 font-bold text-sm ${themeConfig.light}`}>ข้อมูลเจ้าของห้อง</th>
              <th className="p-4 text-sm font-bold text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr><td colSpan="5" className="p-16 font-medium text-center text-gray-400">กำลังโหลดข้อมูล...</td></tr>
            ) : units.length === 0 ? (
              <tr><td colSpan="5" className="p-16 font-medium text-center text-gray-400">ยังไม่มีข้อมูลห้องพักในระบบ</td></tr>
            ) : units.map((unit) => (
              <tr key={unit.id} className="transition-colors hover:bg-gray-50/50">
                <td className="p-4">
                  <div className={`font-bold ${themeConfig.text} text-sm mb-0.5`}>{unit.projectName}</div>
                  <div className="font-extrabold text-gray-900">ห้อง {unit.unitNumber}</div>
                  <div className="text-xs text-gray-400">{unit.building}</div>
                  {unit.detailUrl && (
                    <a href={unit.detailUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-1 text-xs font-medium text-blue-500 hover:underline">
                      <Icons.Link /> ลิงก์รายละเอียด
                    </a>
                  )}
                </td>
                <td className="p-4 text-sm font-medium text-gray-600">
                  <div>ชั้น {unit.floor}</div>
                  <div className="text-xs text-gray-400">ขนาด {unit.size}</div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${unit.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {unit.status === 'available' ? 'ว่างพร้อมเช่า' : 'ไม่ว่าง'}
                  </span>
                  <div className="mt-1 text-xs font-extrabold text-gray-900">฿{unit.price}/ด.</div>
                </td>
                <td className={`p-4 text-sm ${themeConfig.light} bg-opacity-30`}>
                  <div className="font-semibold text-gray-800 mb-0.5">{unit.ownerName || '-'}</div>
                  <div className="font-medium text-gray-600">{unit.ownerPhone || '-'}</div>
                  <div className="text-xs text-gray-400">{unit.owneIDLINE || '-'}</div>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => onEdit(unit)} className={`p-2.5 ${themeConfig.text} ${themeConfig.light} hover:bg-opacity-70 rounded-xl transition-colors`} title="แก้ไข"><Icons.Edit /></button>
                    <button onClick={() => onDelete(unit.id)} className="p-2.5 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors" title="ลบ"><Icons.Trash /></button>
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
  const [formData, setFormData] = useState({ projectName: '', unitNumber: '', building: '', floor: '', size: '', status: 'available', price: '', ownerName: '', ownerPhone: '', ownerEmail: '', detailUrl: '', images: [] });
  const [isCompressing, setIsCompressing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData(unitToEdit ? { ...unitToEdit, images: unitToEdit.images ? [...unitToEdit.images] : [] } : { projectName: '', unitNumber: '', building: '', floor: '', size: '', status: 'available', price: '', ownerName: '', ownerPhone: '', ownerEmail: '', detailUrl: '', images: [] });
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
    onSave(formData, setUploadStatus).finally(() => setIsCompressing(false));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-gray-800">
            {unitToEdit ? <><Icons.Edit /> แก้ไขข้อมูลห้อง</> : <><Icons.Plus /> เพิ่มข้อมูลห้องใหม่</>}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-500 transition-colors rounded-full hover:bg-gray-200"><Icons.Close /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-grow p-6 space-y-6 overflow-y-auto">
          {/* ข้อมูลห้องพัก */}
          <div className="space-y-4">
            <h4 className={`font-bold text-gray-800 text-sm border-l-4 ${themeConfig.border} pl-3`}>ข้อมูลห้องพัก</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block mb-1 text-xs font-bold text-gray-600">ชื่อโครงการ</label>
                <select required name="projectName" value={formData.projectName} onChange={handleChange} className={`w-full border border-gray-300 rounded-xl p-3 outline-none bg-white ${themeConfig.ring} focus:border-transparent text-sm`}>
                  <option value="">-- เลือกโครงการ --</option>
                  {PROJECT_LIST.map((zoneData, idx) => (
                    <optgroup key={idx} label={`โซน: ${zoneData.zone}`}>
                      {zoneData.projects.map((proj, pIdx) => <option key={pIdx} value={proj}>{proj}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">เลขห้อง</label>
                <input required type="text" name="unitNumber" value={formData.unitNumber} onChange={handleChange} className={`w-full border border-gray-300 rounded-xl p-3 outline-none ${themeConfig.ring} focus:border-transparent text-sm`} />
              </div>
              <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">อาคาร</label>
                <input type="text" name="building" value={formData.building} onChange={handleChange} className={`w-full border border-gray-300 rounded-xl p-3 outline-none ${themeConfig.ring} focus:border-transparent text-sm`} />
              </div>
              <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">ชั้น</label>
                <input required type="text" name="floor" value={formData.floor} onChange={handleChange} className={`w-full border border-gray-300 rounded-xl p-3 outline-none ${themeConfig.ring} focus:border-transparent text-sm`} />
              </div>
              <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">ขนาด</label>
                <input required type="text" name="size" value={formData.size} onChange={handleChange} placeholder="เช่น 35 ตร.ม." className={`w-full border border-gray-300 rounded-xl p-3 outline-none ${themeConfig.ring} focus:border-transparent text-sm`} />
              </div>
              <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">ราคา/เดือน</label>
                <input required type="text" name="price" value={formData.price} onChange={handleChange} placeholder="เช่น 15,000" className={`w-full border border-gray-300 rounded-xl p-3 outline-none ${themeConfig.ring} focus:border-transparent text-sm`} />
              </div>
              <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">สถานะ</label>
                <select name="status" value={formData.status} onChange={handleChange} className={`w-full border border-gray-300 rounded-xl p-3 outline-none bg-white ${themeConfig.ring} focus:border-transparent text-sm`}>
                  <option value="available">ว่าง (พร้อมเช่า)</option>
                  <option value="rented">มีผู้เช่าแล้ว</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-1 text-xs font-bold text-gray-600">ลิงก์รายละเอียดห้องเพิ่มเติม (URL)</label>
                <input type="url" name="detailUrl" value={formData.detailUrl || ''} onChange={handleChange} placeholder="https://..." className={`w-full border border-gray-300 rounded-xl p-3 outline-none ${themeConfig.ring} focus:border-transparent text-sm`} />
              </div>
            </div>
          </div>

          {/* ข้อมูลเจ้าของห้อง */}
          <div className="pt-2 space-y-4">
            <h4 className={`font-bold text-gray-800 text-sm border-l-4 ${themeConfig.border} pl-3`}>ข้อมูลเจ้าของห้อง</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">ชื่อ-นามสกุล</label>
                <input required type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} className={`w-full border border-gray-300 rounded-xl p-3 outline-none ${themeConfig.ring} focus:border-transparent text-sm`} />
              </div>
              <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">เบอร์โทรศัพท์</label>
                <input required type="text" name="ownerPhone" value={formData.ownerPhone} onChange={handleChange} className={`w-full border border-gray-300 rounded-xl p-3 outline-none ${themeConfig.ring} focus:border-transparent text-sm`} />
              </div>
              <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">ID LINE</label>
                <input type="text" name="ownerIDLINE" value={formData.ownerIDLINE} onChange={handleChange} className={`w-full border border-gray-300 rounded-xl p-3 outline-none ${themeConfig.ring} focus:border-transparent text-sm`} />
              </div>
               <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">LINK</label>
                <input type="url" name="ownerLINK" value={formData.ownerLINK} onChange={handleChange} className={`w-full border border-gray-300 rounded-xl p-3 outline-none ${themeConfig.ring} focus:border-transparent text-sm`} />
              </div>
            </div>
          </div>

          {/* รูปภาพห้องพัก */}
          <div className="pt-2 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className={`font-bold text-gray-800 text-sm border-l-4 ${themeConfig.border} pl-3`}>รูปภาพห้องพัก</h4>
              <label className={`cursor-pointer ${themeConfig.light} ${themeConfig.text} hover:opacity-80 px-3 py-1.5 rounded-xl text-xs font-bold transition-opacity flex items-center gap-1 border ${themeConfig.border}`}>
                <Icons.Plus /> เพิ่มรูปภาพ
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {formData.images.map((imgSrc, index) => (
                <div key={index} className="relative h-24 overflow-hidden border border-gray-200 shadow-sm group rounded-2xl">
                  <img src={imgSrc} alt="Room" className="object-cover w-full h-full" />
                  <button type="button" onClick={() => removeImage(index)} className="absolute top-1.5 right-1.5 bg-rose-600 hover:bg-rose-700 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Icons.Trash /></button>
                </div>
              ))}
              {formData.images.length === 0 && (
                <div className="py-8 text-sm text-center text-gray-400 border-2 border-gray-200 border-dashed col-span-full rounded-2xl">
                  ยังไม่มีรูปภาพ (กดปุ่มเพิ่มรูปภาพด้านบน)
                </div>
              )}
            </div>
          </div>

          {uploadStatus && <p className={`text-center text-sm font-semibold ${themeConfig.text}`}>{uploadStatus}</p>}

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="flex-1 py-3 font-medium text-gray-700 transition-colors border border-gray-300 rounded-xl hover:bg-gray-50">ยกเลิก</button>
            <button type="submit" disabled={isCompressing} className={`flex-1 py-3 rounded-xl ${themeConfig.bg} ${themeConfig.hover} text-white font-bold transition-colors shadow-lg shadow-${themeConfig.id}-500/30 disabled:opacity-50`}>
              {isCompressing ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
            </button>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm p-8 overflow-hidden text-center bg-white shadow-2xl rounded-3xl">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-rose-100 text-rose-600">
          <Icons.Trash />
        </div>
        <h3 className="mb-2 text-xl font-extrabold text-gray-900">ยืนยันการลบข้อมูล</h3>
        <p className="mb-6 text-sm text-gray-500">คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลห้องนี้? การกระทำนี้ไม่สามารถย้อนกลับได้</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 font-bold text-gray-700 transition-colors border border-gray-300 rounded-xl hover:bg-gray-50">ยกเลิก</button>
          <button onClick={handleConfirm} disabled={isDeleting} className="flex-1 py-3 font-bold text-white transition-colors rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50">
            {isDeleting ? 'กำลังลบ...' : 'ลบข้อมูล'}
          </button>
        </div>
      </div>
    </div>
  );
};

const LoginModal = ({ isOpen, onClose, onLogin, themeConfig, expectedPassword }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  useEffect(() => { if (isOpen) { setPassword(''); setError(''); } }, [isOpen]);
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === expectedPassword) onLogin(); else setError('รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm p-8 overflow-hidden bg-white shadow-2xl rounded-3xl">
        <div className={`w-16 h-16 ${themeConfig.light} ${themeConfig.text} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <Icons.Lock />
        </div>
        <h3 className="mb-2 text-xl font-extrabold text-center text-gray-900">เข้าสู่ระบบแอดมิน</h3>
        <p className="mb-6 text-sm text-center text-gray-500">กรุณาใส่รหัสผ่านเพื่อจัดการข้อมูล</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="password" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="รหัสผ่าน..." className={`w-full border ${error ? 'border-rose-300 focus:ring-rose-200' : 'border-gray-300'} rounded-xl p-3.5 outline-none focus:ring-2 text-center text-lg tracking-widest`} />
          {error && <p className="text-sm font-medium text-center text-rose-500">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 font-bold text-gray-700 transition-colors border border-gray-300 rounded-xl hover:bg-gray-50">ยกเลิก</button>
            <button type="submit" className={`flex-1 py-3 rounded-xl ${themeConfig.bg} hover:opacity-90 text-white font-bold transition-opacity`}>ยืนยัน</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// Main App Component
// ==========================================
export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [units, setUnits] = useState([]);
  
  const [appConfig, setAppConfig] = useState(() => {
    const saved = localStorage.getItem('condoAppConfig');
    return saved ? JSON.parse(saved) : { companyName: 'TFS Asset', logoUrl: '', theme: 'blue', adminPassword: 'admin' };
  });

  const themeConfig = THEMES[appConfig.theme] || THEMES.blue;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    setIsLoading(true);
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('units').select('*').order('id', { ascending: false });
      if (!error && data) {
        setUnits(data);
      } else {
        console.error("Error fetching units:", error);
      }
    } else {
      setUnits([{
        id: "mock1", projectName: "IDEO CHULA SAMYAN", unitNumber: "A-101", building: "ตึก A", floor: 12, size: "35 ตร.ม.", 
        status: "available", price: "15,000", ownerName: "สมชาย ใจดี", ownerPhone: "081-234-5678", ownerEmail: "somchai@example.com", 
        detailUrl: "https://example.com",
        images: ["https://placehold.co/600x400/e2e8f0/475569?text=IDEO+CHULA"]
      }]);
    }
    setIsLoading(false);
  };

  const handleSave = async (unitData, setUploadStatus) => {
    const dataToSave = { ...unitData };
    let finalImageUrls = [];

    if (isSupabaseConfigured) {
      for (const [index, img] of unitData.images.entries()) {
        if (img.startsWith('data:image')) {
          setUploadStatus(`กำลังอัปโหลดรูปภาพที่ ${index + 1}...`);
          try {
            const res = await fetch(img);
            const blob = await res.blob();
            const fileName = `room-${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
            
            const { data, error } = await supabase.storage.from('condo-images').upload(fileName, blob);
            
            if (!error) {
              const { data: publicUrlData } = supabase.storage.from('condo-images').getPublicUrl(fileName);
              finalImageUrls.push(publicUrlData.publicUrl);
            } else {
              console.error("Upload error:", error);
            }
          } catch (e) {
            console.error("Error converting image:", e);
          }
        } else {
          finalImageUrls.push(img);
        }
      }
      
      dataToSave.images = finalImageUrls.length > 0 ? finalImageUrls : [];
      setUploadStatus('กำลังบันทึกข้อมูลลงฐานข้อมูล...');
      
      if (!dataToSave.id) dataToSave.id = Date.now().toString();
      
      const { error: dbError } = await supabase.from('units').upsert(dataToSave);
      
      if (!dbError) {
        await fetchUnits();
      } else {
        console.error("DB Save error:", dbError);
      }
    } else {
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
    setAppConfig(newConfig);
    localStorage.setItem('condoAppConfig', JSON.stringify(newConfig));
    setIsSettingsOpen(false);
  };

  const confirmDelete = async () => {
    if (deleteId !== null) {
      if (isSupabaseConfigured) {
        const { error } = await supabase.from('units').delete().eq('id', deleteId);
        if (!error) {
          await fetchUnits();
        } else {
          console.error("Delete error:", error);
        }
      } else {
        setUnits(units.filter(u => u.id !== deleteId));
      }
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 bg-gray-50 selection:bg-blue-200">
      
      {/* Navbar แบบพรีเมียม (ไม่มีพื้นหลังสีขาวล้วน) */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isAdmin ? 'bg-white shadow-sm' : 'bg-transparent shadow-none'}`}>
        <div className="flex items-center justify-between h-20 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsAdmin(false)}>
            {appConfig.logoUrl ? (
              <img src={appConfig.logoUrl} alt="Logo" className="object-contain h-10 drop-shadow-md" />
            ) : (
              <div className={`w-10 h-10 ${themeConfig.bg} text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg`}>
                {appConfig.companyName.charAt(0)}
              </div>
            )}
            <span className={`text-xl font-black tracking-tight drop-shadow-sm ${isAdmin ? 'text-gray-900' : 'text-white'}`}>{appConfig.companyName}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className={`flex p-1 rounded-full border ${isAdmin ? 'bg-gray-100 border-gray-200/60' : 'bg-black/20 border-white/20 backdrop-blur-md'}`}>
              <button onClick={() => setIsAdmin(false)} className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${!isAdmin ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                <Icons.User /> <span className="hidden sm:inline">หน้าแรก</span>
              </button>
              {isAdmin ? (
                <button onClick={() => { setIsAdmin(false); setIsAuthenticated(false); }} className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${themeConfig.bg} text-white shadow-lg shadow-${themeConfig.id}-500/30`}>
                  <Icons.Lock /> <span className="hidden sm:inline">ออกจากระบบ</span>
                </button>
              ) : (
                <button onClick={() => isAuthenticated ? setIsAdmin(true) : setShowLogin(true)} className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white transition-all duration-200 rounded-full hover:bg-white/10">
                  <Icons.Shield /> <span className="hidden sm:inline">แอดมิน</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className={isAdmin ? 'pt-28' : ''}>
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