import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Search, MapPin, Bed, Bath, Maximize, Phone, MessageCircle, Home, UserCircle2, Settings, LogOut, Link as LinkIcon, Camera, ChevronLeft, ChevronRight, X, Building2, UploadCloud, Info } from 'lucide-react';

// ==========================================
// 1. ตั้งค่า Supabase (ใส่ URL และ Key ของคุณ)
// ==========================================
const supabaseUrl = 'YOUR_SUPABASE_URL'; 
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// ==========================================
// 2. ข้อมูลตั้งต้น (โซน, โครงการ, เอเจ้นท์)
// ==========================================
const ZONES = [
  'จุฬา-สามย่าน',
  'สาทร พระราม 3',
  'อ่อนนุช',
  'สุขุมวิท อโศก',
  'พระราม 9 ห้วยขวาง รัชดา',
  'ปิ่นเกล้า จรัญฯ ศิริราช ไฟฉาย'
];

const PROJECTS_BY_ZONE = {
  'จุฬา-สามย่าน': ['Ideo Chula Samyan', 'Ashton Chula-Silom', 'Chapter Chula-Samyan'],
  'สาทร พระราม 3': ['Supalai Prima Riva', 'Lumpini Place Rama 3', 'The Pano', 'Star View', 'Rhythm Sathorn'],
  'อ่อนนุช': ['Ideo Mobi Sukhumvit', 'The Base Sukhumvit 77', 'KnightsBridge Prime Onnut', 'Chambers On Nut Station'],
  'สุขุมวิท อโศก': ['Ashton Asoke', 'The Lofts Asoke', 'Noble BE19', 'Celes Asoke'],
  'พระราม 9 ห้วยขวาง รัชดา': ['Ideo Rama 9 - Asoke', 'Life Asoke - Rama 9', 'The Base Garden Rama 9', 'Nue District R9', 'XT Huai Khwang', 'Rhythm Ratchada'],
  'ปิ่นเกล้า จรัญฯ ศิริราช ไฟฉาย': [
    'LIFE ปิ่นเกล้า', 'The Parkland จรัญฯ-ปิ่นเกล้า', 'Plum Condo Pinklao Station',
    'Chewathai Pinklao', 'The Origin Pinklao', 'WHIZDOM COEX Pinklao',
    'Aspire Pinklao-Arun Ammarin', 'Aspire Arun Prive', 'Ideo Mobi Charan Interchange',
    'The Tree Charan 30', 'D Bura Prannok', 'The President Charan-Yaek Fai Chai Station',
    'Supalai Park Yaek Fai Chai Station', 'Supalai Loft Yaek Fai Chai Station',
    'Nue Noble Fai Chai-Wang Lang', 'Lumpini Ville Charan-Fai Chai', 'Sun City MRT Yaek Fai Chai',
    'Lumpini Selected Charan 65-Sirindhorn Station', 'The Tree Charan-Bang Phlat',
    'The Privacy Charan-Ratchawithi Station', 'SO Origin Siriraj'
  ]
};

const PRESET_AGENTS = [
  { name: 'TEENOI AGENT', phone: '0809768545', line: '@402muzza' },
  { name: 'FERN AGENT', phone: '0950519992', line: '@402muzza' }
];

const THEMES = {
  blue: 'bg-blue-600 hover:bg-blue-700',
  emerald: 'bg-emerald-600 hover:bg-emerald-700',
  rose: 'bg-rose-600 hover:bg-rose-700',
  violet: 'bg-violet-600 hover:bg-violet-700',
  orange: 'bg-orange-500 hover:bg-orange-600'
};

// ==========================================
// 3. คอมโพเนนต์หลัก
// ==========================================
export default function App() {
  const [units, setUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // ระบบจดจำแคช ป้องกันหน้าจอกระพริบ (FOUC)
  const [siteSettings, setSiteSettings] = useState(() => {
    const cached = localStorage.getItem('siteSettings');
    return cached ? JSON.parse(cached) : { companyName: 'TFS ASSET', theme: 'emerald', logoUrl: '', bannerUrl: '' };
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null); // สำหรับแสดง Popup ดูรายละเอียด
  
  const [formData, setFormData] = useState({
    id: '', topic: '', type: 'Condo', zone: '', projectName: '',
    building: '', floor: '', size: '', bedroom: 'สตูดิโอ', bathroom: '1', status: 'ว่าง', price: '', detailUrl: '',
    agentName: '', agentPhone: '', agentLine: '',
    ownerName: '', ownerPhone: '', ownerIDLINE: '', ownerLINK: '',
    images: []
  });

  const [uploadingImages, setUploadingImages] = useState(false);
  const [selectedAgentProfile, setSelectedAgentProfile] = useState('');

  // ------------------------------------------
  // ฟังก์ชันดึงข้อมูลจาก Supabase
  // ------------------------------------------
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // ดึงข้อมูลการตั้งค่า
      const { data: settingsData, error: settingsError } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', '1')
        .maybeSingle();

      if (settingsData) {
        setSiteSettings(settingsData);
        localStorage.setItem('siteSettings', JSON.stringify(settingsData));
      }

      // ดึงข้อมูลห้อง
      const { data: unitsData, error: unitsError } = await supabase
        .from('units')
        .select('*')
        .order('created_at', { ascending: false });

      if (unitsData) setUnits(unitsData);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------------------------
  // ฟังก์ชันต่างๆ สำหรับ Admin
  // ------------------------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    const adminPass = siteSettings?.adminPassword || 'admin';
    if (passwordInput === adminPass) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setShowAdminDashboard(true);
      setPasswordInput('');
    } else {
      alert('รหัสผ่านไม่ถูกต้อง');
    }
  };

  const handleSelectAgentProfile = (profileName) => {
    setSelectedAgentProfile(profileName);
    const agent = PRESET_AGENTS.find(a => a.name === profileName);
    if (agent) {
      setFormData(prev => ({ ...prev, agentName: agent.name, agentPhone: agent.phone, agentLine: agent.line }));
    }
  };

  const handleImageUpload = async (e, type = 'units') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    const uploadedUrls = [];

    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const bucket = type === 'units' ? 'condo-images' : 'site-assets';

      const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        alert('อัปโหลดรูปล้มเหลว: ' + uploadError.message);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath);
      uploadedUrls.push(publicUrl);
    }

    if (type === 'units') {
      setFormData(prev => ({ ...prev, images: [...(prev.images || []), ...uploadedUrls] }));
    } else if (type === 'logo') {
      setSiteSettings(prev => ({ ...prev, logoUrl: uploadedUrls[0] }));
    } else if (type === 'banner') {
      setSiteSettings(prev => ({ ...prev, bannerUrl: uploadedUrls[0] }));
    }
    setUploadingImages(false);
  };

  const saveSettings = async () => {
    const { error } = await supabase.from('site_settings').upsert({ id: '1', ...siteSettings });
    if (error) alert('บันทึกการตั้งค่าไม่สำเร็จ');
    else {
      localStorage.setItem('siteSettings', JSON.stringify(siteSettings));
      setShowSettingsModal(false);
      alert('บันทึกการตั้งค่าสำเร็จ');
    }
  };

  const saveUnit = async (e) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      id: formData.id || Math.random().toString(36).substr(2, 9),
    };

    const { error } = await supabase.from('units').upsert(dataToSave);
    
    if (error) {
      console.error(error);
      alert('บันทึกข้อมูลไม่สำเร็จ กรุณาตรวจสอบตารางฐานข้อมูล');
    } else {
      setShowFormModal(false);
      fetchData();
      alert('บันทึกข้อมูลสำเร็จ');
    }
  };

  const deleteUnit = async (id) => {
    if(window.confirm('ยืนยันการลบข้อมูลนี้?')) {
      const { error } = await supabase.from('units').delete().eq('id', id);
      if (!error) fetchData();
    }
  };

  const openForm = (unit = null) => {
    if (unit) {
      setFormData(unit);
      setSelectedAgentProfile('');
    } else {
      setFormData({
        id: '', topic: '', type: 'Condo', zone: '', projectName: '',
        building: '', floor: '', size: '', bedroom: 'สตูดิโอ', bathroom: '1', status: 'ว่าง', price: '', detailUrl: '',
        agentName: '', agentPhone: '', agentLine: '',
        ownerName: '', ownerPhone: '', ownerIDLINE: '', ownerLINK: '', images: []
      });
      setSelectedAgentProfile('');
    }
    setShowFormModal(true);
  };

  const themeClass = THEMES[siteSettings.theme] || THEMES.emerald;

  // ------------------------------------------
  // ส่วนแสดงผล UI
  // ------------------------------------------
  return (
    <div className="min-h-screen font-sans text-gray-800 bg-gray-50">
      
      {/* 🟢 Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-100 shadow-sm bg-white/95 backdrop-blur-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              {siteSettings.logoUrl ? (
                <img src={siteSettings.logoUrl} alt="Logo" className="object-contain w-auto h-10" />
              ) : (
                <div className={`w-10 h-10 ${themeClass} rounded-xl flex items-center justify-center text-white font-bold text-xl`}>
                  {siteSettings.companyName.charAt(0)}
                </div>
              )}
              <span className="text-xl font-bold tracking-tight" style={{ fontFamily: '"LINE Seed Sans TH", "Prompt", sans-serif' }}>
                {siteSettings.companyName}
              </span>
            </div>
            
            <div className="flex gap-2">
              <button onClick={() => { setShowAdminDashboard(false); setSelectedUnit(null); }} className="px-4 py-2 text-sm font-medium text-gray-700 transition bg-gray-100 rounded-full hover:bg-gray-200">
                <Home className="inline-block w-4 h-4 mr-1" /> หน้าแรก
              </button>
              {!isAdmin ? (
                <button onClick={() => setShowAdminLogin(true)} className="px-4 py-2 text-sm font-medium text-gray-600 transition border border-gray-200 rounded-full hover:bg-gray-50">
                  <UserCircle2 className="inline-block w-4 h-4 mr-1" /> แอดมิน
                </button>
              ) : (
                <button onClick={() => setShowAdminDashboard(true)} className={`px-4 py-2 text-sm font-medium text-white ${themeClass} rounded-full transition`}>
                  <Settings className="inline-block w-4 h-4 mr-1" /> จัดการระบบ
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        
        {/* 🟢 หน้า Dashboard แอดมิน */}
        {showAdminDashboard && isAdmin ? (
          <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-4 mb-8 sm:flex-row">
              <h2 className="text-2xl font-bold">ระบบจัดการหลังบ้าน</h2>
              <div className="flex gap-2">
                <button onClick={() => setShowSettingsModal(true)} className="flex items-center gap-2 px-4 py-2 text-white bg-gray-800 rounded-lg">
                  <Settings className="w-4 h-4" /> ตั้งค่าเว็บ
                </button>
                <button onClick={() => openForm()} className={`px-4 py-2 ${themeClass} text-white rounded-lg flex items-center gap-2`}>
                  + เพิ่มประกาศใหม่
                </button>
              </div>
            </div>

            <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="font-medium text-gray-600 bg-gray-50">
                    <tr>
                      <th className="px-6 py-4">รูปปก</th>
                      <th className="px-6 py-4">ข้อมูลประกาศ</th>
                      <th className="px-6 py-4">ผู้ติดต่อ (เอเจ้นท์)</th>
                      <th className="px-6 py-4 text-orange-800 border-l border-orange-100 bg-orange-50">ความลับ: เจ้าของห้อง</th>
                      <th className="px-6 py-4 text-right">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {units.map((unit) => (
                      <tr key={unit.id} className="transition hover:bg-gray-50/50">
                        <td className="px-6 py-4">
                          <img src={unit.images?.[0] || 'https://placehold.co/100x100?text=No+Image'} alt="cover" className="object-cover w-16 h-16 rounded-lg" />
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-base text-gray-900 mb-1 truncate max-w-[200px]">{unit.topic}</p>
                          <p className="text-xs text-gray-500">{unit.projectName} • {unit.zone}</p>
                          <span className="inline-block px-2 py-1 mt-1 text-xs font-semibold text-green-700 bg-green-100 rounded">฿{Number(unit.price).toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium">{unit.agentName || '-'}</p>
                          <p className="text-xs text-gray-500">📞 {unit.agentPhone || '-'}</p>
                          <p className="text-xs text-green-600">LINE: {unit.agentLine || '-'}</p>
                        </td>
                        {/* 🔒 โซนข้อมูลลับ (เฉพาะแอดมิน) */}
                        <td className="px-6 py-4 border-l border-orange-100 bg-orange-50/30">
                          <p className="font-medium text-gray-900">{unit.ownerName || '-'}</p>
                          <p className="text-xs text-gray-600">📞 {unit.ownerPhone || '-'}</p>
                          <p className="mb-1 text-xs text-gray-600">LINE ID: {unit.ownerIDLINE || '-'}</p>
                          {unit.ownerLINK && (
                            <a href={unit.ownerLINK} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                              <LinkIcon className="w-3 h-3" /> ลิงก์ข้อมูล/แชท
                            </a>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => openForm(unit)} className="mr-4 font-medium text-blue-600 hover:text-blue-800">แก้ไข</button>
                          <button onClick={() => deleteUnit(unit.id)} className="font-medium text-red-600 hover:text-red-800">ลบ</button>
                        </td>
                      </tr>
                    ))}
                    {units.length === 0 && (
                      <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">ยังไม่มีข้อมูลประกาศ</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          
          /* 🟢 หน้าแรก (ลูกค้าทั่วไป) */
          <div>
            {/* Hero Section */}
            <div className="relative flex items-center justify-center min-h-[500px] xl:min-h-[600px] overflow-hidden">
              <div 
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url(${siteSettings.bannerUrl || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'})` }}
              />
              {/* Premium Left-Heavy Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
              
              <div className="relative z-10 w-full px-4 mx-auto mt-12 max-w-7xl sm:px-6 lg:px-8 md:mt-0">
                <div className="max-w-3xl">
                  <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white tracking-tight leading-tight drop-shadow-lg" style={{ fontFamily: '"LINE Seed Sans TH", "Prompt", sans-serif' }}>
                    Thailand Properties for Rent & Sale
                  </h1>
                  <p className="mt-4 text-base italic font-normal tracking-wide sm:text-lg text-white/90 drop-shadow-md" style={{ fontFamily: '"LINE Seed Sans TH", "Prompt", sans-serif' }}>
                    FIND YOUR PERFECT PROPERTY 
                  </p>
                </div>
              </div>
            </div>

            {/* โปร่งๆ Search Bar */}
            <div className="relative z-20 w-full max-w-4xl px-4 mx-auto -mt-10 sm:px-6 lg:px-8">
              <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-xl p-3 sm:p-4 border border-white/40 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />
                  <input 
                    type="text" 
                    placeholder="ค้นหา โครงการ, ทำเล, รถไฟฟ้า..." 
                    className="w-full py-4 pl-12 pr-4 text-base transition-all border-transparent outline-none bg-gray-50/50 hover:bg-gray-50 focus:bg-white focus:border-gray-200 rounded-2xl"
                  />
                </div>
                <button className={`w-full sm:w-auto px-8 py-4 ${themeClass} text-white font-medium rounded-2xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]`}>
                  ค้นหา
                </button>
              </div>
            </div>

            {/* ส่วนแสดงรายการ */}
            <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold tracking-tight">รายการประกาศล่าสุด</h2>
                <span className="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded-full">พบ {units.length} รายการ</span>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin border-t-emerald-500"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {units.map((unit) => (
                    <div 
                      key={unit.id} 
                      onClick={() => setSelectedUnit(unit)}
                      className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 cursor-pointer group rounded-3xl hover:shadow-2xl hover:shadow-gray-200/50"
                    >
                      {/* รูปภาพ */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                        <img 
                          src={unit.images?.[0] || 'https://placehold.co/600x400?text=No+Image'} 
                          alt={unit.topic}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute flex gap-2 top-3 right-3">
                          <span className={`px-2.5 py-1 text-xs font-bold rounded-full shadow-sm text-white backdrop-blur-md ${unit.status === 'ว่าง' ? 'bg-green-500/90' : 'bg-red-500/90'}`}>
                            {unit.status}
                          </span>
                        </div>
                        <div className="absolute flex gap-2 bottom-3 left-3">
                           <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold rounded-lg shadow-sm">
                            {unit.type}
                          </span>
                        </div>
                      </div>

                      {/* ข้อมูล */}
                      <div className="flex flex-col flex-1 p-5">
                        <h3 className="mb-2 text-lg font-bold leading-snug text-gray-900 line-clamp-2">{unit.topic || unit.projectName}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-4 line-clamp-1">
                          <MapPin className="w-3.5 h-3.5 shrink-0" /> {unit.zone}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                          <div className="flex items-center gap-1.5"><Bed className="w-4 h-4 text-gray-400" /> {unit.bedroom}</div>
                          <div className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-gray-400" /> {unit.bathroom}</div>
                          <div className="flex items-center gap-1.5"><Maximize className="w-4 h-4 text-gray-400" /> {unit.size} ตร.ม.</div>
                        </div>

                        <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100">
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-0.5">ราคาเช่า/เดือน</p>
                            <p className={`text-xl font-bold ${themeClass.split(' ')[0].replace('bg-', 'text-')}`}>
                              ฿{Number(unit.price).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center justify-center w-10 h-10 transition rounded-full bg-gray-50 group-hover:bg-gray-100">
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ========================================== */}
      {/* 🔴 Modal: ดูรายละเอียดห้องแบบเต็ม (Public) */}
      {/* ========================================== */}
      {selectedUnit && !showAdminDashboard && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative flex flex-col w-full max-w-4xl max-h-full overflow-hidden bg-white shadow-2xl rounded-3xl">
            <button onClick={() => setSelectedUnit(null)} className="absolute z-10 flex items-center justify-center w-10 h-10 text-white transition rounded-full top-4 right-4 bg-black/20 hover:bg-black/40 backdrop-blur-md">
              <X className="w-6 h-6" />
            </button>

            <div className="flex-1 overflow-y-auto">
              {/* แกลลอรี่รูปภาพ */}
              <div className="w-full h-[300px] sm:h-[400px] bg-gray-100 flex overflow-x-auto snap-x snap-mandatory">
                {selectedUnit.images && selectedUnit.images.length > 0 ? (
                  selectedUnit.images.map((img, i) => (
                    <img key={i} src={img} alt="room" className="object-cover w-full h-full shrink-0 snap-center" />
                  ))
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-400">No Image</div>
                )}
              </div>

              {/* เนื้อหา */}
              <div className="p-6 sm:p-8">
                <div className="flex gap-2 mb-4">
                  <span className={`px-3 py-1 text-sm font-bold rounded-lg text-white ${selectedUnit.status === 'ว่าง' ? 'bg-green-500' : 'bg-red-500'}`}>{selectedUnit.status}</span>
                  <span className="px-3 py-1 text-sm font-bold text-gray-700 bg-gray-100 rounded-lg">{selectedUnit.type}</span>
                </div>
                
                <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">{selectedUnit.topic || selectedUnit.projectName}</h2>
                <p className="flex items-center gap-2 mb-6 text-gray-500"><MapPin className="w-5 h-5" /> โครงการ: {selectedUnit.projectName} • {selectedUnit.zone}</p>
                
                <div className="grid grid-cols-2 gap-4 py-6 mb-8 border-gray-100 sm:grid-cols-4 border-y">
                  <div><p className="mb-1 text-sm text-gray-500">รูปแบบห้อง</p><p className="flex items-center gap-2 text-lg font-semibold"><Bed className="w-5 h-5" /> {selectedUnit.bedroom}</p></div>
                  <div><p className="mb-1 text-sm text-gray-500">ห้องน้ำ</p><p className="flex items-center gap-2 text-lg font-semibold"><Bath className="w-5 h-5" /> {selectedUnit.bathroom}</p></div>
                  <div><p className="mb-1 text-sm text-gray-500">ชั้น / อาคาร</p><p className="flex items-center gap-2 text-lg font-semibold"><Building2 className="w-5 h-5" /> ชั้น {selectedUnit.floor} {selectedUnit.building ? `(ตึก ${selectedUnit.building})` : ''}</p></div>
                  <div><p className="mb-1 text-sm text-gray-500">ขนาดพื้นที่</p><p className="flex items-center gap-2 text-lg font-semibold"><Maximize className="w-5 h-5" /> {selectedUnit.size} ตร.ม.</p></div>
                </div>

                <div className="flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center bg-gray-50 rounded-2xl">
                  <div>
                    <p className="mb-1 font-medium text-gray-500">ราคาเช่า/เดือน</p>
                    <p className={`text-4xl font-bold ${themeClass.split(' ')[0].replace('bg-', 'text-')}`}>
                      ฿{Number(selectedUnit.price).toLocaleString()}
                    </p>
                  </div>
                  
                  {/* ข้อมูลติดต่อ Agent สำหรับฝั่ง Public (ไม่โชว์ Owner) */}
                  <div className="w-full pt-4 border-t border-gray-200 sm:w-auto sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
                    <p className="mb-3 text-sm font-bold text-gray-900">ติดต่อผู้ดูแล (Agent)</p>
                    {selectedUnit.agentName && <p className="mb-2 font-medium text-gray-800">คุณ {selectedUnit.agentName}</p>}
                    <div className="flex gap-3">
                      {selectedUnit.agentPhone && (
                        <a href={`tel:${selectedUnit.agentPhone}`} className="flex items-center justify-center flex-1 gap-2 px-5 py-3 font-medium text-white transition bg-gray-900 sm:flex-none hover:bg-black rounded-xl">
                          <Phone className="w-4 h-4" /> โทร
                        </a>
                      )}
                      {selectedUnit.agentLine && (
                        <a href={`https://line.me/ti/p/~${selectedUnit.agentLine.replace('@','')}`} target="_blank" rel="noreferrer" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-[#00B900] hover:bg-[#009900] text-white font-medium rounded-xl transition">
                          <MessageCircle className="w-4 h-4" /> LINE
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                {selectedUnit.detailUrl && (
                  <div className="mt-6 text-center">
                    <a href={selectedUnit.detailUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-blue-600 hover:underline">
                      <LinkIcon className="w-4 h-4" /> ดูรายละเอียดเพิ่มเติม / ลิงก์ต้นทาง
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 🔴 Modal: ฟอร์มเพิ่ม/แก้ไขข้อมูล (Admin) */}
      {/* ========================================== */}
      {showFormModal && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xl font-bold">{formData.id ? 'แก้ไขข้อมูลประกาศ' : 'เพิ่มประกาศใหม่'}</h2>
              <button onClick={() => setShowFormModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="unitForm" onSubmit={saveUnit} className="space-y-8">
                
                {/* Section 1: ข้อมูลหลัก */}
                <div>
                  <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-gray-800"><Building2 className="w-5 h-5 text-gray-400" /> ข้อมูลประกาศ</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="block mb-1 text-sm font-medium text-gray-700">หัวข้อประกาศ (เช่น ขายดาวน์ด่วน, วิวแม่น้ำ)</label>
                      <input type="text" required className="w-full border-gray-300 rounded-lg p-2.5 border focus:ring-2 focus:ring-blue-100 outline-none" 
                        value={formData.topic} onChange={e => setFormData({...formData, topic: e.target.value})} placeholder="กรอกหัวข้อประกาศให้ดึงดูดใจ..." />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">ประเภทอสังหาฯ</label>
                      <select className="w-full border-gray-300 rounded-lg p-2.5 border" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                        <option value="Condo">คอนโด (Condo)</option>
                        <option value="House">บ้าน (House / Townhome)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">โซนทำเล</label>
                      <select required className="w-full border-gray-300 rounded-lg p-2.5 border" value={formData.zone} onChange={e => { setFormData({...formData, zone: e.target.value, projectName: ''}) }}>
                        <option value="">-- เลือกโซนทำเล --</option>
                        {ZONES.map(z => <option key={z} value={z}>{z}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block mb-1 text-sm font-medium text-gray-700">ชื่อโครงการ</label>
                      {formData.zone ? (
                        <select required className="w-full border-gray-300 rounded-lg p-2.5 border" value={formData.projectName} onChange={e => setFormData({...formData, projectName: e.target.value})}>
                          <option value="">-- เลือกโครงการ --</option>
                          {PROJECTS_BY_ZONE[formData.zone]?.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      ) : (
                        <input type="text" disabled placeholder="กรุณาเลือกโซนก่อน" className="w-full border-gray-300 rounded-lg p-2.5 border bg-gray-50" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 2: รายละเอียดพื้นที่ */}
                <div>
                  <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-gray-800"><Maximize className="w-5 h-5 text-gray-400" /> รายละเอียดพื้นที่ & ราคา</h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div>
                      <label className="block mb-1 text-sm text-gray-600">ห้องนอน</label>
                      <select className="w-full border-gray-300 rounded-lg p-2.5 border" value={formData.bedroom} onChange={e => setFormData({...formData, bedroom: e.target.value})}>
                        <option value="สตูดิโอ">สตูดิโอ</option>
                        <option value="1">1 Bed</option><option value="2">2 Bed</option>
                        <option value="3">3 Bed</option><option value="4">4 Bed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1 text-sm text-gray-600">ห้องน้ำ</label>
                      <input type="number" className="w-full border-gray-300 rounded-lg p-2.5 border" value={formData.bathroom} onChange={e => setFormData({...formData, bathroom: e.target.value})} />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm text-gray-600">อาคาร/ตึก (ถ้ามี)</label>
                      <input type="text" className="w-full border-gray-300 rounded-lg p-2.5 border" value={formData.building} onChange={e => setFormData({...formData, building: e.target.value})} />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm text-gray-600">ชั้น</label>
                      <input type="text" className="w-full border-gray-300 rounded-lg p-2.5 border" value={formData.floor} onChange={e => setFormData({...formData, floor: e.target.value})} />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm text-gray-600">ขนาด (ตร.ม.)</label>
                      <input type="number" required className="w-full border-gray-300 rounded-lg p-2.5 border" value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})} />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm text-gray-600">ราคา (บาท)</label>
                      <input type="number" required className="w-full border-gray-300 rounded-lg p-2.5 border" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm text-gray-600">สถานะ</label>
                      <select className="w-full border-gray-300 rounded-lg p-2.5 border" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                        <option value="ว่าง">ว่าง (Available)</option>
                        <option value="ไม่ว่าง">ติดจอง/ขายแล้ว (Sold)</option>
                      </select>
                    </div>
                    <div className="sm:col-span-4">
                      <label className="block mb-1 text-sm text-gray-600">ลิงก์ต้นทาง / รายละเอียดเพิ่มเติม (URL)</label>
                      <input type="url" className="w-full border-gray-300 rounded-lg p-2.5 border" value={formData.detailUrl} onChange={e => setFormData({...formData, detailUrl: e.target.value})} placeholder="https://..." />
                    </div>
                  </div>
                </div>

                {/* Section 3: รูปภาพ */}
                <div>
                  <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-gray-800"><Camera className="w-5 h-5 text-gray-400" /> อัปโหลดรูปภาพ</h3>
                  <div className="p-6 text-center border-2 border-gray-300 border-dashed rounded-xl">
                    <input type="file" multiple accept="image/*" onChange={(e) => handleImageUpload(e, 'units')} className="hidden" id="image-upload" disabled={uploadingImages} />
                    <label htmlFor="image-upload" className="flex flex-col items-center cursor-pointer">
                      <UploadCloud className="w-10 h-10 mb-2 text-gray-400" />
                      <span className="text-sm font-medium text-blue-600">คลิกเพื่ออัปโหลดรูปภาพ</span>
                      <span className="mt-1 text-xs text-gray-500">เลือกได้หลายรูป (JPG, PNG)</span>
                    </label>
                  </div>
                  {formData.images?.length > 0 && (
                    <div className="flex gap-2 pb-2 mt-4 overflow-x-auto">
                      {formData.images.map((url, i) => (
                        <div key={i} className="relative w-24 h-24 shrink-0">
                          <img src={url} alt="preview" className="object-cover w-full h-full border rounded-lg" />
                          <button type="button" onClick={() => setFormData(prev => ({...prev, images: prev.images.filter((_, idx) => idx !== i)}))} className="absolute p-1 text-white bg-red-500 rounded-full -top-2 -right-2"><X className="w-3 h-3" /></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="my-6 border-t border-gray-200"></div>

                {/* Section 4: ข้อมูลติดต่อ (Agent) */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800"><MessageCircle className="w-5 h-5 text-gray-400" /> ข้อมูลผู้ดูแล (Agent) - แสดงหน้าเว็บ</h3>
                    
                    {/* 🔹 Dropdown เลือก Agent เพื่อ Auto-fill */}
                    <select 
                      className="text-sm border-blue-300 bg-blue-50 text-blue-700 rounded-lg p-1.5 border outline-none font-medium"
                      value={selectedAgentProfile}
                      onChange={(e) => handleSelectAgentProfile(e.target.value)}
                    >
                      <option value="">-- เลือกโปรไฟล์เอเจ้นท์อัตโนมัติ --</option>
                      {PRESET_AGENTS.map(agent => (
                        <option key={agent.name} value={agent.name}>{agent.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block mb-1 text-sm text-gray-600">ชื่อเอเจ้นท์</label>
                      <input type="text" className="w-full border-gray-300 rounded-lg p-2.5 border" value={formData.agentName} onChange={e => setFormData({...formData, agentName: e.target.value})} placeholder="Ex. คุณส้มโอ" />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm text-gray-600">เบอร์โทรติดต่อ</label>
                      <input type="text" className="w-full border-gray-300 rounded-lg p-2.5 border" value={formData.agentPhone} onChange={e => setFormData({...formData, agentPhone: e.target.value})} />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm text-gray-600">LINE ID</label>
                      <input type="text" className="w-full border-gray-300 rounded-lg p-2.5 border" value={formData.agentLine} onChange={e => setFormData({...formData, agentLine: e.target.value})} />
                    </div>
                  </div>
                </div>

                {/* Section 5: ข้อมูลเจ้าของห้อง (Private) */}
                <div className="relative p-5 overflow-hidden border border-orange-200 bg-orange-50 rounded-2xl">
                  <div className="absolute top-0 right-0 px-3 py-1 text-xs font-bold text-orange-800 bg-orange-200 rounded-bl-lg">ความลับแอดมิน</div>
                  <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-orange-900"><Info className="w-5 h-5" /> ข้อมูลเจ้าของห้อง (Owner)</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <label className="block mb-1 text-sm text-orange-800">ชื่อเจ้าของ</label>
                      <input type="text" className="w-full border-orange-200 rounded-lg p-2.5 border bg-white" value={formData.ownerName} onChange={e => setFormData({...formData, ownerName: e.target.value})} />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm text-orange-800">เบอร์โทร</label>
                      <input type="text" className="w-full border-orange-200 rounded-lg p-2.5 border bg-white" value={formData.ownerPhone} onChange={e => setFormData({...formData, ownerPhone: e.target.value})} />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm text-orange-800">LINE ID</label>
                      <input type="text" className="w-full border-orange-200 rounded-lg p-2.5 border bg-white" value={formData.ownerIDLINE} onChange={e => setFormData({...formData, ownerIDLINE: e.target.value})} />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm text-orange-800">ลิงก์ / หมายเหตุ</label>
                      <input type="text" className="w-full border-orange-200 rounded-lg p-2.5 border bg-white" value={formData.ownerLINK} onChange={e => setFormData({...formData, ownerLINK: e.target.value})} />
                    </div>
                  </div>
                </div>

              </form>
            </div>

            <div className="flex justify-end gap-3 p-4 border-t border-gray-100 bg-gray-50">
              <button onClick={() => setShowFormModal(false)} className="px-6 py-2.5 text-gray-600 bg-white border border-gray-300 rounded-xl font-medium hover:bg-gray-50">ยกเลิก</button>
              <button form="unitForm" type="submit" disabled={uploadingImages} className={`px-8 py-2.5 text-white rounded-xl font-medium shadow-md ${uploadingImages ? 'bg-gray-400' : themeClass}`}>
                {uploadingImages ? 'กำลังอัปโหลด...' : 'บันทึกข้อมูล'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 🔴 Modal: ตั้งค่าเว็บ (Site Settings) */}
      {/* ========================================== */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-[110] bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-md overflow-hidden bg-white shadow-xl rounded-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
              <h2 className="flex items-center gap-2 text-xl font-bold"><Settings className="w-5 h-5" /> ตั้งค่าเว็บไซต์</h2>
              <button onClick={() => setShowSettingsModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">ชื่อโครงการ / บริษัท</label>
                <input type="text" className="w-full border-gray-300 rounded-lg p-2.5 border" value={siteSettings.companyName} onChange={e => setSiteSettings({...siteSettings, companyName: e.target.value})} />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">รูปภาพโลโก้</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'logo')} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                {siteSettings.logoUrl && <img src={siteSettings.logoUrl} alt="Logo preview" className="object-contain h-10 mt-2" />}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">รูปภาพแบนเนอร์ (Hero Banner)</label>
                <div className="flex flex-col gap-2">
                  <input type="text" placeholder="หรือวางลิงก์รูปภาพ (URL)" className="w-full text-sm border-gray-300 rounded-lg p-2.5 border" value={siteSettings.bannerUrl || ''} onChange={e => setSiteSettings({...siteSettings, bannerUrl: e.target.value})} />
                  <span className="text-xs text-center text-gray-500">- หรือ -</span>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'banner')} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
                </div>
                {siteSettings.bannerUrl && <img src={siteSettings.bannerUrl} alt="Banner preview" className="object-cover w-full h-20 mt-2 border rounded-lg" />}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">โทนสีของเว็บไซต์</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(THEMES).map(theme => (
                    <button key={theme} onClick={() => setSiteSettings({...siteSettings, theme})} className={`p-3 rounded-lg border-2 flex items-center gap-2 ${siteSettings.theme === theme ? 'border-gray-900 bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}>
                      <div className={`w-5 h-5 rounded-full ${THEMES[theme].split(' ')[0]}`}></div>
                      <span className="text-sm font-medium capitalize">{theme}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="block mb-2 text-sm font-medium text-gray-700">รหัสผ่านแอดมินใหม่ (เว้นว่างหากไม่เปลี่ยน)</label>
                <input type="text" placeholder="ตั้งรหัสผ่านใหม่..." className="w-full border-gray-300 rounded-lg p-2.5 border" onChange={e => setSiteSettings({...siteSettings, adminPassword: e.target.value || 'admin'})} />
              </div>
            </div>

            <div className="flex justify-end gap-3 p-4 border-t border-gray-100 bg-gray-50">
              <button onClick={() => setShowSettingsModal(false)} className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg">ยกเลิก</button>
              <button onClick={saveSettings} className="px-6 py-2 font-medium text-white bg-gray-900 rounded-lg hover:bg-black">บันทึก</button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 🔴 Modal: Login แอดมิน */}
      {/* ========================================== */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-[120] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm p-6 bg-white shadow-xl rounded-2xl">
            <button onClick={() => setShowAdminLogin(false)} className="absolute text-gray-400 top-4 right-4 hover:text-gray-600"><X className="w-5 h-5" /></button>
            <div className="mb-6 text-center">
              <div className={`w-12 h-12 mx-auto ${themeClass} rounded-full flex items-center justify-center text-white mb-3`}>
                <Settings className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold">เข้าสู่ระบบแอดมิน</h2>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input type="password" required placeholder="ใส่รหัสผ่าน..." className="w-full p-3 text-center border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-100" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
              </div>
              <button type="submit" className={`w-full py-3 text-white rounded-xl font-bold text-lg shadow-md ${themeClass}`}>
                เข้าสู่ระบบ
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}