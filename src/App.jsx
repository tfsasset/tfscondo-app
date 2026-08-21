
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://atbyudnixujiwlxepchh.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_leBQo88PZWYV800h4C6dUA_Oj4gMzMm';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const isSupabaseConfigured = true;

const PROJECT_LIST = [
  {
    zone: "สาทร พระราม 3",
    projects: [
      "RHYTHM SATHORN-NARATHIWAS", "SALADAENG ONE", "THE PARKLAND GRAND TAKSIN",
      "ASPIRE SATHORN-THAPRA", "METRO PARK SATHORN", "SUPALAI PRIME RAMA 3",
      "NARAYANA PLACE", "LUMPINI PLACE RAMA 3-RIVERVIEW", "THE ISSARA SATHORN",
      "CHATEAU IN TOWN SATHORN-NARATHIWAS", "THE ROOM SATHORN-ST.LOUIS"
    ]
  },
  {
    zone: "อ่อนนุช",
    projects: [
      "THE BASE SUKHUMVIT 77", "IDEO MOBI SUKHUMVIT 81", "BLOCKS 77",
      "KAVE TOWN SHIFT", "VY VILLA", "THE TREE ON NUT STATION",
      "XT EKKAMAI", "WHIZDOM 101", "ASPIRE SUKHUMVIT 48", "THE LINE SUKHUMVIT 101",
      "PARK ORIGIN PHETCHABURI", "NUE CONDO ON NUT", "SO ORIGIN ON NUT"
    ]
  },
  {
    zone: "สุขุมวิท อโศก",
    projects: [
      "ASHTON ASOKE", "ASHTON ASOKE-RAMA 9", "THE ROOM ASOKE", "Q ASOKE",
      "LIFE ASOKE", "LIFE ASOKE HYPE", "LIFE ASIA", "EDGE SAKHUMVIT 23",
      "VYLAR SUKHUMVIT", "MARQUE SUKHUMVIT", "THE AGATHE SUKHUMVIT 69",
      "VITTORIO SUKHUMVIT 39", "KHUN BY YOO", "HYDE HERITAGE THONGLORO"
    ]
  },
  {
    zone: "พระราม 9 ห้วยขวาง รัชดา",
    projects: [
      "BELLE GRAND RAMA 9", "LIFE RAMA 9", "CENTRIC RATCHADA-HUAI KWANG",
      "IDEO RATCHADA-HUAI KWANG", "NUE DISTRICT R9", "THE LINE ASTHMA",
      "METRO LUXE RATCHADA", "THE SEED RATCHADA", "RHYTHM ASOKE-RAMA 9",
      "ASHTON ASOKE-RAMA 9", "SHREEDHARA RAMA 9", "THE AMBIANCE SATHORN",
      "NUE CONDO RAMA 9", "CHAPTHER RAMA 9"
    ]
  },
  {
    zone: "จุฬา-สามย่าน",
    projects: [
      "IDEO CHULA SAMYAN", "IDEO Q CHULA SAMYAN", "ASHTON CHULA SILOM", "THE NEST CHULA SAMYAN",
      "PARK ORIGIN CHULA SAMYAN", "CHAPTER CHULA SAMYAN", "TRIPLE Y RESIDENCE", "CULTURE CHULA",
      "THE SEED MEMORIES SIAM", "THE ROOM RAMA 4", "COOPER SIAM", "WISH @ SAMYAN"
    ]
  }
];

const POPULAR_ZONES = [
  { name: "สาทร พระราม 3", bg: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80" },
  { name: "อ่อนนุช", bg: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
  { name: "สุขุมวิท อโศก", bg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" },
  { name: "พระราม 9 ห้วยขวาง รัชดา", bg: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80" }
];

const SEARCH_TABS = ['หาซื้อ', 'หาเช่า', 'คอนโดใกล้ฉัน', 'คอนโดใกล้ BTS', 'คอนโดใกล้ MRT', 'คอนโดใกล้มหาวิทยาลัย','ทาวน์โฮม'];
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
  Building: () => <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  Location: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Phone: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
  Chat: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
};

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

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, bannerUrl: reader.result });
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
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white shadow-2xl rounded-3xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-gray-800"><Icons.Settings /> ตั้งค่าเว็บไซต์</h2>
          <button onClick={onClose} className="p-2 text-gray-500 transition-colors rounded-full hover:bg-gray-200"><Icons.Close /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex-grow p-6 space-y-5">
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">ชื่อโครงการ / บริษัท</label>
            <input required type="text" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} className="w-full p-3 border border-gray-300 outline-none rounded-xl focus:border-orange-500" />
          </div>
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">รูปภาพโลโก้</label>
            <div className="flex items-center gap-4">
              <label className="px-4 py-2 text-sm font-bold text-gray-700 transition-colors bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-xl">
                อัปโหลดโลโก้
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>
              {formData.logoUrl && <img src={formData.logoUrl} alt="Logo Preview" className="object-contain h-10" />}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">รูปภาพแบนเนอร์ (Hero Banner)</label>
            <div className="space-y-3">
              <label className="block w-full px-4 py-3 text-sm font-bold text-center text-gray-600 transition-colors border-2 border-gray-300 border-dashed cursor-pointer rounded-xl hover:border-orange-500 hover:text-orange-600">
                คลิกเพื่อเปลี่ยนรูปภาพแบนเนอร์จากเครื่อง
                <input type="file" accept="image/*" onChange={handleBannerUpload} className="hidden" />
              </label>
              <div>
                <span className="block mb-1 text-xs font-semibold text-gray-500">หรือวางลิงก์รูปภาพ (Image URL):</span>
                <input 
                  type="url" 
                  value={formData.bannerUrl && !formData.bannerUrl.startsWith('data:') ? formData.bannerUrl : ''} 
                  onChange={(e) => setFormData({...formData, bannerUrl: e.target.value})} 
                  placeholder="https://images.unsplash.com/..." 
                  className="w-full p-3 text-sm border border-gray-300 outline-none rounded-xl focus:border-orange-500" 
                />
              </div>
              {formData.bannerUrl && (
                <div className="relative h-32 overflow-hidden border border-gray-200 rounded-xl">
                  <img src={formData.bannerUrl} alt="Banner Preview" className="object-cover w-full h-full" />
                </div>
              )}
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

const UnitDetailModal = ({ isOpen, unit, onClose, themeConfig }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  if (!isOpen || !unit) return null;

  const images = unit.images && unit.images.length > 0 ? unit.images : ['https://placehold.co/800x600/e2e8f0/475569?text=No+Image'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/80">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${themeConfig.light} ${themeConfig.text}`}>{unit.propertyType || 'คอนโด'}</span>
              <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${unit.actionType === 'ขาย' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{unit.actionType || 'เช่า'}</span>
            </div>
            <h2 className="mt-1 text-lg font-extrabold text-gray-900 sm:text-xl line-clamp-1">{unit.title || unit.projectName}</h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-500 transition-colors rounded-full hover:bg-gray-200"><Icons.Close /></button>
        </div>

        <div className="flex-grow p-6 space-y-6 overflow-y-auto">
          <div className="relative overflow-hidden bg-black shadow-inner h-72 sm:h-96 rounded-2xl">
            <img src={images[currentIdx]} alt={unit.title} className="object-cover w-full h-full" />
            {images.length > 1 && (
              <>
                <button onClick={() => setCurrentIdx((prev) => (prev - 1 + images.length) % images.length)} className="absolute p-2 text-white -translate-y-1/2 rounded-full left-3 top-1/2 bg-black/50 hover:bg-black/70"><Icons.ChevronLeft /></button>
                <button onClick={() => setCurrentIdx((prev) => (prev + 1) % images.length)} className="absolute p-2 text-white -translate-y-1/2 rounded-full right-3 top-1/2 bg-black/50 hover:bg-black/70"><Icons.ChevronRight /></button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                  {images.map((_, i) => <div key={i} className={`w-2 h-2 rounded-full ${i === currentIdx ? 'bg-white' : 'bg-white/50'}`} />)}
                </div>
              </>
            )}
            <div className={`absolute top-4 right-4 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-lg ${unit.status === 'available' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
              {unit.status === 'available' ? 'ว่างพร้อมเช่า' : 'ไม่ว่าง'}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <div className="p-5 border border-gray-100 bg-gray-50 rounded-2xl">
                <p className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
                  <span className={themeConfig.text}><Icons.Location /></span> {unit.projectName} {unit.zone ? `(${unit.zone})` : ''}
                </p>
                
                <div className="grid grid-cols-2 gap-4 pt-4 mt-4 text-sm border-t sm:grid-cols-4 border-gray-200/60">
                  <div>
                    <span className="block text-xs text-gray-400">ห้องนอน</span>
                    <span className="font-bold text-gray-800">{unit.bedroom || 'สตูดิโอ'}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400">ห้องน้ำ</span>
                    <span className="font-bold text-gray-800">{unit.bathroom ? `${unit.bathroom} ห้องน้ำ` : '-'}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400">ชั้น</span>
                    <span className="font-bold text-gray-800">ชั้น {unit.floor}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400">ขนาดพื้นที่</span>
                    <span className="font-bold text-gray-800">{unit.size}</span>
                  </div>
                </div>
              </div>

              {unit.detailUrl && (
                <div className="flex items-center justify-between p-4 border border-blue-100 bg-blue-50/50 rounded-2xl">
                  <span className="text-sm font-bold text-blue-900">ลิงก์ประกาศต้นฉบับ / รายละเอียดเพิ่มเติม</span>
                  <a href={unit.detailUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors">
                    <Icons.Link /> เปิดลิงก์
                  </a>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between p-6 space-y-4 bg-white border-2 border-gray-100 shadow-sm rounded-2xl">
              <div>
                <span className="block text-xs font-bold tracking-wider text-gray-400 uppercase">ราคาประกาศ</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className={`text-3xl font-black ${themeConfig.text}`}>฿{Number(unit.price || 0).toLocaleString()}</span>
                  <span className="text-xs text-gray-500">{unit.actionType === 'ขาย' ? 'บาท' : 'บาท/เดือน'}</span>
                </div>
              </div>

              <div className="pt-4 space-y-3 border-t border-gray-100">
                <h4 className="text-xs font-bold tracking-wider text-gray-400 uppercase">ข้อมูลเอเจ้นท์ / ผู้ติดต่อ</h4>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full ${themeConfig.light} ${themeConfig.text} font-bold text-lg flex items-center justify-center border ${themeConfig.border}`}>
                    {(unit.agentName || 'A').charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">{unit.agentName || 'TFS Asset Agent'}</h5>
                    <p className="flex items-center gap-1 mt-0.5 text-xs text-gray-500"><Icons.Phone /> {unit.agentPhone || '081-234-5678'}</p>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  {unit.agentIDLINE && (
                    <div className="flex items-center justify-between p-3 text-xs font-bold border border-emerald-200 bg-emerald-50 rounded-xl text-emerald-800">
                      <span className="flex items-center gap-1.5"><Icons.Chat /> LINE ID: {unit.agentIDLINE}</span>
                      <span className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg">แอดไลน์</span>
                    </div>
                  )}
                  {unit.agentLINK && (
                    <a href={unit.agentLINK} target="_blank" rel="noopener noreferrer" className="block py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold text-center rounded-xl transition-colors shadow-sm">
                      ติดต่อผ่านลิงก์โซเชียล
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PublicView = ({ units, themeConfig, bannerUrl }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('หาซื้อ');
  const [selectedUnit, setSelectedUnit] = useState(null);

  const filteredUnits = units.filter(unit => {
    const matchSearch = (unit.projectName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                        (unit.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (unit.zone || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

  const defaultBanner = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80";

  return (
    <div className="pb-24 space-y-12 bg-gray-50/50">
      <div className="relative h-[500px] w-full flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src={bannerUrl || defaultBanner} alt="Hero Background" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full px-4 pt-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-3xl text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white tracking-tight leading-tight drop-shadow-lg" style={{ fontFamily: '"LINE Seed Sans TH", "Prompt", sans-serif' }}>
              FIND YOUR PERFECT PROPERTY 
            </h1>
            <p className="mt-4 text-base italic font-normal tracking-wide sm:text-lg text-white/90 drop-shadow-md" style={{ fontFamily: '"LINE Seed Sans TH", "Prompt", sans-serif' }}>
              Thailand Properties for Rent & Sale
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-6xl px-4 mx-auto -mt-24 z-25 sm:px-6 lg:px-8">
        <div className="overflow-hidden border shadow-2xl bg-white/95 backdrop-blur-xl border-white/40 shadow-black/10 rounded-3xl">
          <div className="flex px-4 pt-2 overflow-x-auto border-b border-gray-100 scrollbar-hide">
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
          <div className="flex flex-col items-center gap-4 p-6 sm:p-10 sm:flex-row">
            <div className="relative flex-grow w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-6 text-gray-400 pointer-events-none"><Icons.Search /></div>
              <input 
                type="text" 
                placeholder="กรอกชื่อ ทำเล / โครงการ / รถไฟฟ้า..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-5 pr-6 text-base text-gray-900 placeholder-gray-400 transition-all border rounded-full shadow-inner pl-14 bg-gray-50/85 hover:bg-gray-50 border-gray-200/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
            <button className={`w-full sm:w-auto px-12 py-5 ${themeConfig.bg} ${themeConfig.hover} text-white font-bold rounded-full transition-all shadow-lg shadow-blue-500/25 whitespace-nowrap text-base`}>
              ค้นหา
            </button>
          </div>
        </div>
      </div>

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
              <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-gray-100 group-hover:${themeConfig.light} group-hover:${themeConfig.border} group-hover:-translate-y-1 transition-all duration-300`}>
                {cat.icon}
              </div>
              <span className={`text-xs font-medium text-gray-600 group-hover:${themeConfig.text}`}>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${themeConfig.text}`}>ทำเลยอดนิยม</h2>
          <span className={`${themeConfig.text} text-sm font-semibold cursor-pointer hover:underline flex items-center gap-1`}>ทำเลอื่นๆ <Icons.ChevronRight /></span>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {POPULAR_ZONES.map((zone, idx) => (
            <div key={idx} onClick={() => setSearchTerm(zone.name)} className="relative h-56 overflow-hidden border border-gray-200 shadow-sm cursor-pointer group rounded-2xl">
              <img src={zone.bg} alt={zone.name} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 text-center bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <h3 className="text-lg font-bold text-white">{zone.name}</h3>
                <p className="text-gray-200 text-[10px] mt-1 line-clamp-1">ขาย เช่า คอนโด บ้าน ที่ดิน {zone.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">รายการประกาศล่าสุด</h2>
          <span className="text-sm font-medium px-4 py-1.5 bg-white shadow-sm border border-gray-200 rounded-full text-gray-600">พบ {filteredUnits.length} รายการ</span>
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
              <div key={unit.id} onClick={() => setSelectedUnit(unit)} className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm cursor-pointer rounded-3xl hover:shadow-xl group">
                <UnitCard unit={unit} themeConfig={themeConfig} />
              </div>
            ))}
          </div>
        )}
      </div>

      <UnitDetailModal isOpen={selectedUnit !== null} unit={selectedUnit} onClose={() => setSelectedUnit(null)} themeConfig={themeConfig} />
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
        <img src={images[currentImageIndex]} alt={unit.title} className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105" />
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
        <div className="space-y-2">
          <div className="flex gap-2">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${themeConfig.light} ${themeConfig.text}`}>{unit.propertyType || 'คอนโด'}</span>
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${unit.actionType === 'ขาย' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
              {unit.actionType || 'เช่า'}
            </span>
          </div>

          <h3 className="text-base font-bold leading-snug text-gray-900 transition-colors line-clamp-2 group-hover:text-blue-600">
            {unit.title || `${unit.projectName} - ${unit.zone || ''}`}
          </h3>

          <p className="flex items-center gap-1 text-xs text-gray-500">
            <span className="text-gray-400"><Icons.Location /></span> {unit.projectName} {unit.zone ? `(${unit.zone})` : ''}
          </p>

          <div className="flex flex-wrap items-center pt-1 text-xs font-medium text-gray-600 gap-x-2 gap-y-1">
            <span>{unit.bedroom || 'สตูดิโอ'}</span>
            {unit.bathroom ? <><span>•</span><span>{unit.bathroom} ห้องน้ำ</span></> : null}
            <span>•</span><span>ชั้น {unit.floor}</span>
            <span>•</span><span>{unit.size}</span>
          </div>
        </div>

        <div className="flex items-end justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="block text-xs text-gray-400">ราคาประกาศ</span>
            <span className="text-xl font-extrabold text-gray-900">฿{Number(unit.price || 0).toLocaleString()}</span>
          </div>
          <span className={`text-xs font-bold ${themeConfig.text} group-hover:underline flex items-center gap-0.5`}>
            ดูรายละเอียด <Icons.ChevronRight />
          </span>
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
        <p className="mt-1 text-sm text-gray-500">จัดการข้อมูลประกาศ, เอเจ้นท์ และข้อมูลเจ้าของห้อง (เฉพาะแอดมิน)</p>
      </div>
      <div className="flex w-full gap-3 sm:w-auto">
        <button onClick={onOpenSettings} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors">
          <Icons.Settings /> ตั้งค่าเว็บ
        </button>
        <button onClick={onAddNew} className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl ${themeConfig.bg} ${themeConfig.hover} text-white font-bold transition-all shadow-lg shadow-${themeConfig.id}-500/30`}>
          <Icons.Plus /> เพิ่มประกาศใหม่
        </button>
      </div>
    </div>

    <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[950px]">
          <thead>
            <tr className="text-gray-600 border-b border-gray-100 bg-gray-50">
              <th className="p-4 text-sm font-bold">หัวข้อประกาศ / โครงการ</th>
              <th className="p-4 text-sm font-bold">ประเภท / โซน</th>
              <th className="p-4 text-sm font-bold">ราคา</th>
              <th className={`p-4 font-bold text-sm ${themeConfig.light}`}>ข้อมูลเอเจ้นท์ (สาธารณะ)</th>
              <th className="p-4 text-sm font-bold text-rose-800 bg-rose-50/50">🔒 ข้อมูลเจ้าของห้อง (ลับ - แอดมินเท่านั้น)</th>
              <th className="p-4 text-sm font-bold text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr><td colSpan="6" className="p-16 font-medium text-center text-gray-400">กำลังโหลดข้อมูล...</td></tr>
            ) : units.length === 0 ? (
              <tr><td colSpan="6" className="p-16 font-medium text-center text-gray-400">ยังไม่มีประกาศในระบบ</td></tr>
            ) : units.map((unit) => (
              <tr key={unit.id} className="transition-colors hover:bg-gray-50/50">
                <td className="p-4">
                  <div className="font-extrabold text-gray-900 line-clamp-1">{unit.title || unit.projectName}</div>
                  <div className="text-xs text-gray-500">{unit.projectName} • ชั้น {unit.floor} • {unit.size}</div>
                </td>
                <td className="p-4 text-sm font-medium text-gray-600">
                  <div><span className={`px-2 py-0.5 rounded text-xs ${unit.actionType === 'ขาย' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{unit.actionType || 'เช่า'}</span> {unit.propertyType || 'คอนโด'}</div>
                  <div className="mt-1 text-xs text-gray-400">โซน: {unit.zone || '-'}</div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${unit.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {unit.status === 'available' ? 'ว่าง' : 'ไม่ว่าง'}
                  </span>
                  <div className="mt-1 text-sm font-extrabold text-gray-900">฿{Number(unit.price || 0).toLocaleString()}</div>
                </td>
                <td className={`p-4 text-sm ${themeConfig.light} bg-opacity-30`}>
                  <div className="font-semibold text-gray-800 mb-0.5">{unit.agentName || '-'}</div>
                  <div className="font-medium text-gray-600">{unit.agentPhone || '-'}</div>
                  <div className="text-xs text-gray-400">LINE: {unit.agentIDLINE || '-'}</div>
                </td>
                <td className="p-4 text-sm bg-rose-50/30">
                  <div className="font-semibold text-rose-900 mb-0.5">{unit.ownerName || '-'}</div>
                  <div className="font-medium text-rose-700">{unit.ownerPhone || '-'}</div>
                  <div className="text-xs text-rose-600">LINE: {unit.ownerIDLINE || '-'}</div>
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
  const [formData, setFormData] = useState({ 
    title: '', propertyType: 'คอนโด', actionType: 'เช่า', zone: '', projectName: '', 
    floor: '', size: '', bedroom: '1 ห้องนอน', bathroom: '1',
    status: 'available', price: '', 
    agentName: '', agentPhone: '', agentIDLINE: '', agentLINK: '',
    ownerName: '', ownerPhone: '', ownerIDLINE: '',
    detailUrl: '', images: [] 
  });
  
  const [isCompressing, setIsCompressing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData(unitToEdit ? { ...unitToEdit, images: unitToEdit.images ? [...unitToEdit.images] : [] } : { 
        title: '', propertyType: 'คอนโด', actionType: 'เช่า', zone: '', projectName: '', 
        floor: '', size: '', bedroom: '1 ห้องนอน', bathroom: '1',
        status: 'available', price: '', 
        agentName: '', agentPhone: '', agentIDLINE: '', agentLINK: '',
        ownerName: '', ownerPhone: '', ownerIDLINE: '',
        detailUrl: '', images: [] 
      });
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
            {unitToEdit ? <><Icons.Edit /> แก้ไขข้อมูลประกาศ</> : <><Icons.Plus /> เพิ่มประกาศใหม่</>}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-500 transition-colors rounded-full hover:bg-gray-200"><Icons.Close /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-grow p-6 space-y-6 overflow-y-auto">
          <div className="space-y-4">
            <h4 className={`font-bold text-gray-800 text-sm border-l-4 ${themeConfig.border} pl-3`}>รายละเอียดประกาศ</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block mb-1 text-xs font-bold text-gray-600">หัวข้อประกาศ (เช่น ขาย Life Ladprao ลดพิเศษ...)</label>
                <input required type="text" name="title" value={formData.title || ''} onChange={handleChange} placeholder="ระบุหัวข้อดึงดูดใจ..." className={`w-full border border-gray-300 rounded-xl p-3 outline-none ${themeConfig.ring} focus:border-transparent text-sm`} />
              </div>

              <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">ประเภทอสังหาฯ</label>
                <select name="propertyType" value={formData.propertyType} onChange={handleChange} className={`w-full border border-gray-300 rounded-xl p-3 outline-none bg-white ${themeConfig.ring} text-sm`}>
                  <option value="คอนโด">คอนโด</option>
                  <option value="บ้านเดี่ยว">บ้านเดี่ยว</option>
                  <option value="ทาวน์โฮม">ทาวน์โฮม</option>
                  <option value="ที่ดิน">ที่ดิน</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">ประเภทรายการ</label>
                <select name="actionType" value={formData.actionType} onChange={handleChange} className={`w-full border border-gray-300 rounded-xl p-3 outline-none bg-white ${themeConfig.ring} text-sm`}>
                  <option value="เช่า">หาเช่า / ให้เช่า</option>
                  <option value="ขาย">ขาย / ขายขาดทุน</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">โซน / ทำเล</label>
                <select name="zone" value={formData.zone} onChange={handleChange} className={`w-full border border-gray-300 rounded-xl p-3 outline-none bg-white ${themeConfig.ring} text-sm`}>
                  <option value="">-- เลือกโซนทำเล --</option>
                  {PROJECT_LIST.map((zoneData, idx) => (
                    <option key={idx} value={zoneData.zone}>{zoneData.zone}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">ชื่อโครงการ</label>
                <select required name="projectName" value={formData.projectName} onChange={handleChange} className={`w-full border border-gray-300 rounded-xl p-3 outline-none bg-white ${themeConfig.ring} text-sm`}>
                  <option value="">-- เลือกโครงการ --</option>
                  {PROJECT_LIST.map((zoneData, idx) => (
                    <optgroup key={idx} label={`โซน: ${zoneData.zone}`}>
                      {zoneData.projects.map((proj, pIdx) => <option key={pIdx} value={proj}>{proj}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">ห้องนอน / รูปแบบ</label>
                <select name="bedroom" value={formData.bedroom || '1 ห้องนอน'} onChange={handleChange} className={`w-full border border-gray-300 rounded-xl p-3 outline-none bg-white ${themeConfig.ring} text-sm`}>
                  <option value="สตูดิโอ">สตูดิโอ</option>
                  <option value="1 ห้องนอน">1 ห้องนอน</option>
                  <option value="2 ห้องนอน">2 ห้องนอน</option>
                  <option value="3 ห้องนอนขึ้นไป">3 ห้องนอนขึ้นไป</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">จำนวนห้องน้ำ</label>
                <input type="text" name="bathroom" value={formData.bathroom || '1'} onChange={handleChange} placeholder="เช่น 1 หรือ 2" className={`w-full border border-gray-300 rounded-xl p-3 outline-none ${themeConfig.ring} text-sm`} />
              </div>

              <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">ชั้น</label>
                <input required type="text" name="floor" value={formData.floor} onChange={handleChange} className={`w-full border border-gray-300 rounded-xl p-3 outline-none ${themeConfig.ring} text-sm`} />
              </div>

              <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">ขนาดพื้นที่ (ตร.ม.)</label>
                <input required type="text" name="size" value={formData.size} onChange={handleChange} className={`w-full border border-gray-300 rounded-xl p-3 outline-none ${themeConfig.ring} text-sm`} />
              </div>

              <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">ราคา (บาท)</label>
                <input required type="text" name="price" value={formData.price} onChange={handleChange} className={`w-full border border-gray-300 rounded-xl p-3 outline-none ${themeConfig.ring} text-sm`} />
              </div>

              <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">สถานะ</label>
                <select name="status" value={formData.status} onChange={handleChange} className={`w-full border border-gray-300 rounded-xl p-3 outline-none bg-white ${themeConfig.ring} text-sm`}>
                  <option value="available">ว่าง / พร้อมอยู่</option>
                  <option value="rented">ปิดการขาย / ปิดการเช่า</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block mb-1 text-xs font-bold text-gray-600">ลิงก์ติดต่อ / รายละเอียดเพิ่มเติม (URL)</label>
                <input type="url" name="detailUrl" value={formData.detailUrl || ''} onChange={handleChange} placeholder="https://..." className={`w-full border border-gray-300 rounded-xl p-3 outline-none ${themeConfig.ring} text-sm`} />
              </div>
            </div>
          </div>

          <div className="pt-2 space-y-4">
            <h4 className={`font-bold text-gray-800 text-sm border-l-4 ${themeConfig.border} pl-3`}>ข้อมูลเอเจ้นท์ / ผู้ติดต่อ (แสดงหน้าเว็บให้ลูกค้าเห็น)</h4>
            
            {}
            <div className="p-4 border border-blue-100 bg-blue-50/70 rounded-2xl">
              <label className="block mb-2 text-xs font-extrabold text-blue-800">⭐ เลือกโปรไฟล์เอเจ้นท์ (ระบบจะเติมข้อมูลให้อัตโนมัติ)</label>
              <select 
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'TEENOI') {
                    setFormData(prev => ({ ...prev, agentName: 'TEENOI AGENT', agentPhone: '0809768545', agentIDLINE: '@402muzza' , agentLINK: 'https://lin.ee/pzVZf5S' }));
                  } else if (val === 'FERN') {
                    setFormData(prev => ({ ...prev, agentName: 'FERN AGENT', agentPhone: '0950519992', agentIDLINE: '@402muzza' , agentLINK: 'https://lin.ee/pzVZf5S' }));
                  } else if (val === 'CLEAR') {
                    setFormData(prev => ({ ...prev, agentName: '', agentPhone: '', agentIDLINE: '', agentLINK: '' }));
                  }
                  e.target.value = ""; // รีเซ็ตกลับเป็นค่าว่างเพื่อให้กดเลือกซ้ำได้
                }}
                defaultValue=""
                className={`w-full border border-blue-200 bg-white rounded-xl p-3 outline-none ${themeConfig.ring} focus:border-blue-500 text-sm font-bold text-blue-700 shadow-sm cursor-pointer`}
              >
                <option value="" disabled>-- คลิกเพื่อเลือกเอเจ้นท์ที่ต้องการ --</option>
                <option value="TEENOI">TEENOI AGENT (เบอร์: 0809768545)</option>
                <option value="FERN">FERN AGENT (เบอร์: 0950519992)</option>
                <option value="CLEAR">-- ล้างข้อมูล (เพื่อพิมพ์กรอกเอง) --</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">ชื่อเอเจ้นท์ / ผู้ดูแล</label>
                <input type="text" name="agentName" value={formData.agentName || ''} onChange={handleChange} placeholder="เช่น คุณเอเจ้นท์ใจดี" className={`w-full border border-gray-300 rounded-xl p-3 outline-none ${themeConfig.ring} text-sm`} />
              </div>
              <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">เบอร์โทรเอเจ้นท์</label>
                <input type="text" name="agentPhone" value={formData.agentPhone || ''} onChange={handleChange} placeholder="081-234-5678" className={`w-full border border-gray-300 rounded-xl p-3 outline-none ${themeConfig.ring} text-sm`} />
              </div>
              <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">LINE ID เอเจ้นท์</label>
                <input type="text" name="agentIDLINE" value={formData.agentIDLINE || ''} onChange={handleChange} placeholder="line_id" className={`w-full border border-gray-300 rounded-xl p-3 outline-none ${themeConfig.ring} text-sm`} />
              </div>
              <div>
                <label className="block mb-1 text-xs font-bold text-gray-600">LINK เพิ่มเติม (เช่น ลิงก์เพจ/แชท)</label>
                <input type="url" name="agentLINK" value={formData.agentLINK || ''} onChange={handleChange} placeholder="https://..." className={`w-full border border-gray-300 rounded-xl p-3 outline-none ${themeConfig.ring} text-sm`} />
              </div>
            </div>
          </div>

          <div className="p-4 pt-2 space-y-4 border-2 border-rose-100 bg-rose-50/40 rounded-2xl">
            <h4 className="pl-3 text-sm font-bold border-l-4 border-rose-500 text-rose-900">🔒 ข้อมูลเจ้าของห้อง (ลับ - เห็นเฉพาะแอดมินหลังบ้านเท่านั้น)</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block mb-1 text-xs font-bold text-rose-900">ชื่อเจ้าของห้อง</label>
                <input type="text" name="ownerName" value={formData.ownerName || ''} onChange={handleChange} placeholder="ชื่อเจ้าของ..." className="w-full p-3 text-sm bg-white border outline-none border-rose-200 rounded-xl focus:border-rose-500" />
              </div>
              <div>
                <label className="block mb-1 text-xs font-bold text-rose-900">เบอร์โทรเจ้าของ</label>
                <input type="text" name="ownerPhone" value={formData.ownerPhone || ''} onChange={handleChange} placeholder="เบอร์โทร..." className="w-full p-3 text-sm bg-white border outline-none border-rose-200 rounded-xl focus:border-rose-500" />
              </div>
              <div>
                <label className="block mb-1 text-xs font-bold text-rose-900">LINE เจ้าของ</label>
                <input type="text" name="ownerIDLINE" value={formData.ownerIDLINE || ''} onChange={handleChange} className="w-full p-3 text-sm bg-white border outline-none border-rose-200 rounded-xl focus:border-rose-500" />
              </div>
            </div>
          </div>

          <div className="pt-2 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className={`font-bold text-gray-800 text-sm border-l-4 ${themeConfig.border} pl-3`}>รูปภาพประกาศ</h4>
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
                  ยังไม่มีรูปภาพ
                </div>
              )}
            </div>
          </div>

          {uploadStatus && <p className={`text-center text-sm font-semibold ${themeConfig.text}`}>{uploadStatus}</p>}

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="flex-1 py-3 font-medium text-gray-700 transition-colors border border-gray-300 rounded-xl hover:bg-gray-50">ยกเลิก</button>
            <button type="submit" disabled={isCompressing} className={`flex-1 py-3 rounded-xl ${themeConfig.bg} ${themeConfig.hover} text-white font-bold transition-colors shadow-lg shadow-${themeConfig.id}-500/30 disabled:opacity-50`}>
              {isCompressing ? 'กำลังบันทึก...' : 'บันทึกประกาศ'}
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
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-rose-100 text-rose-600"><Icons.Trash /></div>
        <h3 className="mb-2 text-xl font-extrabold text-gray-900">ยืนยันการลบข้อมูล</h3>
        <p className="mb-6 text-sm text-gray-500">คุณแน่ใจหรือไม่ว่าต้องการลบประกาศนี้?</p>
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
        <div className={`w-16 h-16 ${themeConfig.light} ${themeConfig.text} rounded-full flex items-center justify-center mx-auto mb-4`}><Icons.Lock /></div>
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

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [units, setUnits] = useState([]);
  
  const cachedSettings = JSON.parse(localStorage.getItem('tfs_site_config'));
  const [appConfig, setAppConfig] = useState(cachedSettings || { 
    companyName: 'TFS Asset', 
    logoUrl: '', 
    bannerUrl: '', 
    theme: 'blue', 
    adminPassword: 'admin' 
  });
  
  const themeConfig = THEMES[appConfig.theme] || THEMES.blue;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured) {
        const { data: unitsData, error: unitsError } = await supabase.from('units').select('*').order('id', { ascending: false });
        if (!unitsError && unitsData) {
          setUnits(unitsData);
        }

        const { data: settingsData, error: settingsError } = await supabase.from('site_settings').select('*').eq('id', '1').maybeSingle();
        if (!settingsError && settingsData) {
          const newSettings = {
            companyName: settingsData.companyName || 'TFS Asset',
            logoUrl: settingsData.logoUrl || '',
            bannerUrl: settingsData.bannerUrl || '',
            theme: settingsData.theme || 'blue',
            adminPassword: settingsData.adminPassword || 'admin'
          };
          setAppConfig(newSettings);
          localStorage.setItem('tfs_site_config', JSON.stringify(newSettings));
        }
      }
    } catch (err) {
      console.error("Fetch data error on refresh:", err);
    } finally {
      setIsLoading(false);
    }
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
            
            const { error } = await supabase.storage.from('condo-images').upload(fileName, blob);
            
            if (!error) {
              const { data: publicUrlData } = supabase.storage.from('condo-images').getPublicUrl(fileName);
              finalImageUrls.push(publicUrlData.publicUrl);
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
      
      await supabase.from('units').upsert(dataToSave);
      await fetchData();
    }
    setIsModalOpen(false);
    setEditingUnit(null);
  };

  const handleSaveSettings = async (newConfig) => {
    setAppConfig(newConfig);
    
    if (isSupabaseConfigured) {
      let finalLogoUrl = newConfig.logoUrl;
      let finalBannerUrl = newConfig.bannerUrl;
      
      if (newConfig.logoUrl && newConfig.logoUrl.startsWith('data:image')) {
        try {
          const res = await fetch(newConfig.logoUrl);
          const blob = await res.blob();
          const fileName = `logo-${Date.now()}.png`;
          const { error } = await supabase.storage.from('condo-images').upload(fileName, blob);
          if (!error) {
            const { data } = supabase.storage.from('condo-images').getPublicUrl(fileName);
            finalLogoUrl = data.publicUrl;
          }
        } catch (e) { console.error("Upload logo error:", e); }
      }

      if (newConfig.bannerUrl && newConfig.bannerUrl.startsWith('data:image')) {
        try {
          const res = await fetch(newConfig.bannerUrl);
          const blob = await res.blob();
          const fileName = `banner-${Date.now()}.jpg`;
          const { error } = await supabase.storage.from('condo-images').upload(fileName, blob);
          if (!error) {
            const { data } = supabase.storage.from('condo-images').getPublicUrl(fileName);
            finalBannerUrl = data.publicUrl;
          }
        } catch (e) { console.error("Upload banner error:", e); }
      }

      const dbConfig = {
        id: '1',
        companyName: newConfig.companyName,
        logoUrl: finalLogoUrl,
        bannerUrl: finalBannerUrl,
        theme: newConfig.theme,
        adminPassword: newConfig.adminPassword
      };

      await supabase.from('site_settings').upsert(dbConfig);
      const finalSettings = {...newConfig, logoUrl: finalLogoUrl, bannerUrl: finalBannerUrl};
      setAppConfig(finalSettings);
      localStorage.setItem('tfs_site_config', JSON.stringify(finalSettings));
    }
    setIsSettingsOpen(false);
  };

  const confirmDelete = async () => {
    if (deleteId !== null) {
      if (isSupabaseConfigured) {
        await supabase.from('units').delete().eq('id', deleteId);
        await fetchData();
      }
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 bg-gray-50 selection:bg-blue-200">
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isAdmin ? 'bg-white shadow-sm' : 'bg-transparent shadow-none'}`}>
        <div className="flex items-center justify-between h-20 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsAdmin(false)}>
            {appConfig.logoUrl ? (
              <img src={appConfig.logoUrl} alt="Logo" className="object-contain h-10 drop-shadow-md" />
            ) : (
              <div className={`w-10 h-10 ${themeConfig.bg} text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg`}>
                {appConfig.companyName ? appConfig.companyName.charAt(0) : 'T'}
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
          <PublicView units={units} themeConfig={themeConfig} bannerUrl={appConfig.bannerUrl} />
        )}
      </main>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} config={appConfig} onSave={handleSaveSettings} themeConfig={themeConfig} />
      <UnitFormModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingUnit(null); }} onSave={handleSave} unitToEdit={editingUnit} themeConfig={themeConfig} />
      <DeleteConfirmModal isOpen={deleteId !== null} onClose={() => setDeleteId(null)} onConfirm={confirmDelete} />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} themeConfig={themeConfig} expectedPassword={appConfig.adminPassword} onLogin={() => { setIsAuthenticated(true); setIsAdmin(true); setShowLogin(false); }} />
        {/* 🟢 Footer */}
      <footer className="py-8 mt-12 bg-white border-t border-gray-100">
        <div className="px-4 mx-auto text-center max-w-7xl">
          <p className="text-sm font-medium text-gray-400">
            © {new Date().getFullYear()} {appConfig.companyName}. All rights reserved.
          </p>
          <p className="mt-1 text-xs text-gray-300">
            Powered by TFS ASSET Management System
          </p>
        </div>
      </footer>
    </div>
  );
}