/**
 * Logic Aplikasi Pustaka Busana Nusantara
 * Mengontrol rendering katalog, filter wilayah, pencarian, detail modal, favorit, kuis, dan peta interaktif.
 */

// State Global Aplikasi
let currentTab = 'explore';
let activeRegionFilter = 'all';
let searchQuery = '';
let currentSort = 'province-asc';
let favorites = [];

// State Kuis
let quizQuestions = [];
let currentQuestionIndex = 0;
let quizScore = 0;
let quizIsAnswered = false;

// Inisialisasi Aplikasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Muat data favorit dari localStorage
    loadFavorites();
    
    // Render Katalog Pertama Kali
    renderAll();
    
    // Setup Peta Interaktif Click Listeners
    initInteractiveMap();
    
    // Update Badge Counter Favorit di Navbar
    updateFavCount();
});

// ==========================================================================
// DYNAMIC SVG ILLUSTRATION GENERATOR
// Menghasilkan representasi baju adat berupa vektor SVG yang indah,
// tanpa bergantung pada berkas gambar eksternal (mencegah broken link).
// ==========================================================================
function getClothingSVG(id, palette, size = "100%") {
    const primary = palette.primary || "#8B2635";
    const secondary = palette.secondary || "#D4AF37";
    const accent = palette.accent || "#2E5A44";
    
    // Template dasar SVG
    let svgHeader = `<svg viewBox="0 0 200 240" width="${size}" height="${size}" class="clothing-svg-card" xmlns="http://www.w3.org/2000/svg">`;
    let svgBackground = `
        <defs>
            <linearGradient id="grad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FCFAF7" />
                <stop offset="100%" stop-color="#EDE9E3" />
            </linearGradient>
            <filter id="shadow-${id}" x="-10%" y="-10%" width="120%" height="120%">
                <drop-shadow dx="0" dy="4" stdDeviation="4" flood-color="#1f2421" flood-opacity="0.08" />
            </filter>
        </defs>
        <!-- Latar Belakang Kartu -->
        <rect width="200" height="240" rx="16" fill="url(#grad-${id})" />
        <!-- Lingkaran Aura Belakang -->
        <circle cx="100" cy="115" r="55" fill="${primary}" opacity="0.06" />
        <!-- Penyangga Baju (Mannequin Hanger) -->
        <path d="M100,50 L100,200 M75,60 C90,55 110,55 125,60" stroke="#CCCCCC" stroke-width="3" stroke-linecap="round" fill="none" />
        <circle cx="100" cy="40" r="8" stroke="#CCCCCC" stroke-width="3" fill="none" />
    `;
    
    let svgCostumeContent = '';
    let svgHeadwear = '';
    
    // Desain Khusus Berdasarkan Provinsi/ID Baju Adat
    switch (id) {
        // --- SUMATERA ---
        case 'aceh':
            // Baju Ulee Balang (Hitam & Kerah Shanghai Emas) + Kopiah Meukeutop
            svgCostumeContent = `
                <!-- Baju Meukasah -->
                <path d="M60,90 L140,90 L135,180 L65,180 Z" fill="${primary}" filter="url(#shadow-${id})" />
                <path d="M90,90 L100,75 L110,90 Z" fill="${secondary}" /> <!-- Kerah Shanghai -->
                <line x1="100" y1="90" x2="100" y2="180" stroke="${secondary}" stroke-width="3" /> <!-- Kancing baris -->
                <path d="M60,90 L50,140 L65,140 Z" fill="${primary}" /> <!-- Lengan kiri -->
                <path d="M140,90 L150,140 L135,140 Z" fill="${primary}" /> <!-- Lengan kanan -->
                <!-- Bordir Emas Ujung Lengan -->
                <rect x="50" y="130" width="15" height="5" fill="${secondary}" />
                <rect x="135" y="130" width="15" height="5" fill="${secondary}" />
            `;
            svgHeadwear = `
                <!-- Kopiah Meukeutop -->
                <path d="M85,50 C85,35 115,35 115,50 Z" fill="${accent}" />
                <path d="M85,50 L115,50 L110,55 L90,55 Z" fill="${secondary}" />
                <path d="M93,42 L107,42 L105,48 L95,48 Z" fill="#FFFFFF" />
            `;
            break;
            
        case 'sumut':
            // Ulos Batak (Selendang Merah-Hitam-Emas Melintang) + Ikat Kepala Pria
            svgCostumeContent = `
                <!-- Jas Beludru -->
                <path d="M60,95 L140,95 L135,185 L65,185 Z" fill="#2b2b2b" filter="url(#shadow-${id})" />
                <!-- Kain Ulos Melintang -->
                <path d="M65,95 L135,185 L120,185 L60,110 Z" fill="${primary}" />
                <path d="M72,95 L135,175 M68,103 L125,180" stroke="${secondary}" stroke-width="2" /> <!-- Motif Emas Ulos -->
            `;
            svgHeadwear = `
                <!-- Bulang Bulang ikat kepala -->
                <rect x="80" y="44" width="40" height="10" rx="2" fill="${primary}" />
                <rect x="80" y="48" width="40" height="3" fill="${secondary}" />
            `;
            break;
            
        case 'sumbar':
            // Baju Limpapeh (Kandang Tanduk Kerbau Merah Megah)
            svgCostumeContent = `
                <path d="M60,100 L140,100 L130,190 L70,190 Z" fill="${primary}" filter="url(#shadow-${id})" />
                <!-- Hiasan Payet Emas Bahu -->
                <path d="M60,100 L80,100 L75,115 L60,110 Z" fill="${secondary}" />
                <path d="M140,100 L120,100 L125,115 L140,110 Z" fill="${secondary}" />
                <!-- Kalung bersusun emas -->
                <path d="M85,110 C90,125 110,125 115,110" stroke="${secondary}" stroke-width="3" fill="none" />
                <path d="M80,118 C90,135 110,135 120,118" stroke="${secondary}" stroke-width="2" fill="none" />
            `;
            svgHeadwear = `
                <!-- Tingkuluak Tanduk Kerbau -->
                <path d="M100,55 L65,30 C75,50 90,55 100,55 C110,55 125,50 135,30 Z" fill="${primary}" />
                <path d="M65,30 L67,35 L75,35 Z" fill="${secondary}" />
                <path d="M135,30 L133,35 L125,35 Z" fill="${secondary}" />
            `;
            break;
            
        case 'sumsel':
            // Aesan Gede (Dodot Songket Emas Mewah + Mahkota Kesuho Tinggi)
            svgCostumeContent = `
                <!-- Kain Dodot Songket -->
                <path d="M65,110 L135,110 L125,195 L75,195 Z" fill="${secondary}" filter="url(#shadow-${id})" />
                <!-- Teratai Dada melingkar -->
                <path d="M70,110 C70,75 130,75 130,110 Z" fill="${primary}" />
                <circle cx="100" cy="98" r="16" fill="${secondary}" />
                <!-- Detail Songket merah emas -->
                <path d="M75,120 L125,120 M77,140 L123,140 M80,160 L120,160 M82,180 L118,180" stroke="${primary}" stroke-width="2" />
            `;
            svgHeadwear = `
                <!-- Kesuho Crown -->
                <path d="M80,50 L120,50 L115,35 L100,25 L85,35 Z" fill="${secondary}" />
                <circle cx="100" cy="23" r="4" fill="${primary}" />
                <circle cx="85" cy="35" r="3" fill="${primary}" />
                <circle cx="115" cy="35" r="3" fill="${primary}" />
            `;
            break;
            
        case 'lampung':
            // Siger Lampung (Kubah Emas 9 Lekukan Megah)
            svgCostumeContent = `
                <!-- Baju Putih Tapis -->
                <path d="M65,100 L135,100 L125,190 L75,190 Z" fill="#FFFFFF" filter="url(#shadow-${id})" stroke="${secondary}" stroke-width="1.5" />
                <!-- Selempang Tapis Emas -->
                <path d="M70,100 L120,190 L110,190 L65,110 Z" fill="${secondary}" />
                <!-- Kalung Papan Jajar -->
                <path d="M80,115 L120,115 L115,125 L85,125 Z" fill="${secondary}" />
                <path d="M83,130 L117,130 L112,142 L88,142 Z" fill="${secondary}" />
            `;
            svgHeadwear = `
                <!-- Siger Lampung (9 Lekuk) -->
                <path d="M70,52 C85,55 90,40 100,50 C110,40 115,55 130,52 L125,62 L75,62 Z" fill="${secondary}" />
                <line x1="100" y1="50" x2="100" y2="35" stroke="${secondary}" stroke-width="2" />
                <line x1="88" y1="52" x2="82" y2="40" stroke="${secondary}" stroke-width="1.5" />
                <line x1="112" y1="52" x2="118" y2="40" stroke="${secondary}" stroke-width="1.5" />
            `;
            break;

        // --- JAWA ---
        case 'jakarta':
            // Kebaya Encim Betawi (Merah Muda & Selendang Hijau)
            svgCostumeContent = `
                <!-- Kebaya Encim -->
                <path d="M65,95 L135,95 L125,180 L100,200 L75,180 Z" fill="${primary}" filter="url(#shadow-${id})" />
                <path d="M90,95 L100,120 L110,95 Z" fill="#FFFFFF" /> <!-- Kerah V -->
                <!-- Bordir bunga kerancang di keliling kerah -->
                <path d="M90,95 L100,120 L110,95" stroke="${secondary}" stroke-width="2" fill="none" />
                <!-- Kain Sarung Batik Betawi -->
                <path d="M75,180 L125,180 L120,225 L80,225 Z" fill="${accent}" />
            `;
            svgHeadwear = `
                <!-- Selendang Kerudung Betawi -->
                <path d="M80,48 C85,38 115,38 120,48 C122,60 120,75 120,75 L110,75 C110,60 90,60 90,75 Z" fill="${accent}" />
            `;
            break;

        case 'jateng':
        case 'diy':
            // Jawi Jangkep/Surjan (Beludru Hitam + Kain Jarik Batik + Blangkon)
            svgCostumeContent = `
                <!-- Beskap/Surjan Beludru -->
                <path d="M60,95 L140,95 L130,185 L70,185 Z" fill="${primary}" filter="url(#shadow-${id})" />
                <!-- Kancing Asimetris & Kerah Shanghai Khas Surjan -->
                <path d="M92,95 L100,82 L108,95 Z" fill="${primary}" />
                <line x1="105" y1="95" x2="105" y2="185" stroke="${secondary}" stroke-width="2" />
                <!-- Kain Jarik Batik Cokelat -->
                <path d="M70,185 L130,185 L125,230 L75,230 Z" fill="#8B5A2B" />
                <path d="M85,185 L110,230" stroke="${secondary}" stroke-width="1.5" /> <!-- Garis motif Lereng -->
                <path d="M95,185 L120,230" stroke="${secondary}" stroke-width="1.5" />
            `;
            svgHeadwear = `
                <!-- Blangkon Jawa -->
                <path d="M80,52 C80,45 120,45 120,52 Z" fill="#8B5A2B" />
                <!-- Ikatan Belakang Mondolan (Yogya/Solo style) -->
                <circle cx="100" cy="46" r="5" fill="#5C3A21" />
                <rect x="85" y="50" width="30" height="4" fill="${secondary}" />
            `;
            break;
            
        case 'jatim':
            // Pesa'an Madura (Garis Merah-Putih & Luaran Hitam)
            svgCostumeContent = `
                <!-- Kaos Garis Merah Putih -->
                <path d="M68,100 L132,100 L128,180 L72,180 Z" fill="#FFFFFF" />
                <path d="M68,105 L132,105 M69,120 L131,120 M70,135 L130,135 M71,150 L129,150 M72,165 L128,165" stroke="${primary}" stroke-width="6" />
                <!-- Jas Hitam Pesa'an Terbuka -->
                <path d="M60,95 L78,95 L85,180 L70,185 Z" fill="#1C1C1C" filter="url(#shadow-${id})" />
                <path d="M140,95 L122,95 L115,180 L130,185 Z" fill="#1C1C1C" filter="url(#shadow-${id})" />
                <!-- Sabuk Kulit Lebar -->
                <rect x="70" y="175" width="60" height="12" fill="#5C3A21" rx="2" />
                <rect x="95" y="175" width="10" height="12" fill="${secondary}" />
            `;
            svgHeadwear = `
                <!-- Odheng Madura -->
                <path d="M80,50 L120,50 L115,44 L100,40 L85,44 Z" fill="#8B5A2B" />
                <path d="M78,48 L90,52 L100,45 L110,52 L122,48" stroke="${secondary}" stroke-width="1.5" fill="none" />
            `;
            break;

        // --- BALI & NUSA TENGGARA ---
        case 'bali':
            // Payas Agung Bali (Mahkota Emas Menjulang Tinggi + Songket)
            svgCostumeContent = `
                <!-- Kemben Prada Emas -->
                <path d="M68,110 L132,110 L125,195 L75,195 Z" fill="${secondary}" filter="url(#shadow-${id})" />
                <!-- Badong/Hiasan Bahu Melingkar -->
                <path d="M70,110 C80,92 120,92 130,110 Z" fill="${primary}" />
                <circle cx="100" cy="100" r="12" fill="${secondary}" />
                <!-- Sabuk Prada Cerah -->
                <rect x="72" y="140" width="56" height="15" fill="${accent}" />
                <line x1="72" y1="148" x2="128" y2="148" stroke="${secondary}" stroke-width="2" />
            `;
            svgHeadwear = `
                <!-- Gelungan (Mahkota Emas Menjulang Bali) -->
                <path d="M90,50 L110,50 L115,20 L100,8 L85,20 Z" fill="${secondary}" />
                <circle cx="100" cy="15" r="4" fill="${primary}" />
                <circle cx="92" cy="30" r="3" fill="${primary}" />
                <circle cx="108" cy="30" r="3" fill="${primary}" />
                <!-- Kembang Goyang Samping -->
                <line x1="85" y1="20" x2="75" y2="15" stroke="${secondary}" stroke-width="1.5" />
                <line x1="115" y1="20" x2="125" y2="15" stroke="${secondary}" stroke-width="1.5" />
                <circle cx="75" cy="15" r="2.5" fill="#FFFF00" />
                <circle cx="125" cy="15" r="2.5" fill="#FFFF00" />
            `;
            break;
            
        case 'ntt':
            // Baju Rote (Kain Tenun Ikat Rote + Topi Ti'i Langga Antena)
            svgCostumeContent = `
                <!-- Kain Tenun Ikat Menyilang -->
                <path d="M65,100 L135,100 L125,190 L75,190 Z" fill="#1A1A1A" filter="url(#shadow-${id})" />
                <!-- Selendang Tenun Geometris Merah Cokelat -->
                <path d="M70,100 L125,190 L115,190 L65,112 Z" fill="${primary}" />
                <path d="M130,100 L75,190 L85,190 L135,112 Z" fill="${secondary}" />
                <!-- Motif Tenun Ikat garis putih kecil -->
                <path d="M70,100 L125,190 M130,100 L75,190" stroke="#FFFFFF" stroke-dasharray="2,4" stroke-width="1.5" />
            `;
            svgHeadwear = `
                <!-- Topi Ti'i Langga Daun Lontar -->
                <path d="M80,50 C80,42 120,42 120,50 L125,54 L75,54 Z" fill="${primary}" />
                <!-- Antena / Cula Lontar khas Rote -->
                <path d="M100,42 L100,20 L96,16 L104,16 Z" fill="${primary}" />
                <line x1="80" y1="50" x2="120" y2="50" stroke="${secondary}" stroke-width="2" />
            `;
            break;

        // --- KALIMANTAN ---
        case 'kalbar':
        case 'kalteng':
        case 'kalut':
            // King Baba (Rompi Kulit Kayu Cokelat + Motif Etnis Manik + Bulu Enggang)
            svgCostumeContent = `
                <!-- Rompi Kulit Kayu -->
                <path d="M65,95 L90,95 L100,105 L110,95 L135,95 L125,185 L75,185 Z" fill="${primary}" filter="url(#shadow-${id})" />
                <!-- Motif Manik Manusia Purba / Dayak -->
                <circle cx="100" cy="135" r="10" stroke="${secondary}" stroke-width="2" fill="none" />
                <path d="M90,135 L110,135 M100,125 L100,155" stroke="${secondary}" stroke-width="2" />
                <path d="M92,150 L100,140 L108,150" stroke="${secondary}" stroke-width="2" fill="none" />
                <path d="M92,120 L100,130 L108,120" stroke="${secondary}" stroke-width="2" fill="none" />
            `;
            svgHeadwear = `
                <!-- Ikat Kepala Hias Bulu Enggang -->
                <rect x="80" y="46" width="40" height="8" fill="${secondary}" rx="1" />
                <path d="M82,46 L95,46 L95,54 L82,54 Z" fill="#000000" />
                <!-- Bulu Burung Enggang Putih Ujung Hitam -->
                <path d="M96,46 C90,15 102,10 102,46 Z" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" />
                <path d="M104,46 C110,15 98,10 98,46 Z" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" />
                <!-- Bagian hitam ujung bulu -->
                <path d="M95,20 C92,14 100,10 102,15 Z" fill="#000000" />
                <path d="M105,20 C108,14 100,10 98,15 Z" fill="#000000" />
            `;
            break;
            
        case 'kalsel':
            // Baju Pengantin Banjar (Kemben Emas + Untaian Melati Khas)
            svgCostumeContent = `
                <!-- Kemben Banjar Beludru -->
                <path d="M70,115 L130,115 L122,190 L78,190 Z" fill="${primary}" filter="url(#shadow-${id})" />
                <line x1="70" y1="115" x2="130" y2="115" stroke="${secondary}" stroke-width="4" />
                <!-- Roncean Melati Panjang Menjuntai -->
                <path d="M82,115 C85,140 85,160 88,185" stroke="#FFFFFF" stroke-dasharray="3,3" stroke-width="3" fill="none" />
                <path d="M118,115 C115,140 115,160 112,185" stroke="#FFFFFF" stroke-dasharray="3,3" stroke-width="3" fill="none" />
            `;
            svgHeadwear = `
                <!-- Mahkota Gajah Gemuling -->
                <path d="M80,50 L120,50 L115,40 L100,34 L85,40 Z" fill="${secondary}" />
                <circle cx="100" cy="42" r="3" fill="${primary}" />
            `;
            break;

        // --- SULAWESI ---
        case 'sulsel':
            // Baju Bodo Bugis (Ungu/Hijau Kotak Sutra Menggelembung)
            svgCostumeContent = `
                <!-- Baju Bodo Segi Empat Menggelembung -->
                <path d="M50,100 L150,100 L130,180 L70,180 Z" fill="${primary}" filter="url(#shadow-${id})" />
                <path d="M80,100 L100,115 L120,100 Z" fill="#FFFFFF" /> <!-- Kerah V -->
                <!-- Lipa Sabbe (Sarung Sutra Kotak-Kotak Cerah) -->
                <path d="M70,180 L130,180 L125,230 L75,230 Z" fill="${accent}" />
                <!-- Grid Kotak-Kotak Sarung -->
                <path d="M80,180 L80,230 M90,180 L90,230 M100,180 L100,230 M110,180 L110,230 M120,180 L120,230" stroke="${secondary}" stroke-opacity="0.4" stroke-width="1.5" />
                <path d="M74,195 L126,195 M72,210 L128,210 M75,222 L125,222" stroke="${secondary}" stroke-opacity="0.4" stroke-width="1.5" />
            `;
            svgHeadwear = `
                <!-- Simpolong Tattong (Sanggul Berdiri Bugis) -->
                <path d="M100,50 C110,35 125,35 125,50 C125,65 110,60 100,50 Z" fill="#1C1C1C" />
                <circle cx="118" cy="45" r="4" fill="${secondary}" />
            `;
            break;
            
        case 'gorontalo':
            // Bili'u Gorontalo (Kuning Mas Beludru & Tujuh Tangkai Kembang)
            svgCostumeContent = `
                <path d="M65,100 L135,100 L125,190 L75,190 Z" fill="${primary}" filter="url(#shadow-${id})" />
                <!-- Hiasan Dada Emas Bertingkat -->
                <path d="M80,110 L120,110 L115,140 L85,140 Z" fill="${secondary}" />
                <line x1="80" y1="120" x2="120" y2="120" stroke="${primary}" stroke-width="2" />
                <line x1="85" y1="130" x2="115" y2="130" stroke="${primary}" stroke-width="2" />
            `;
            svgHeadwear = `
                <!-- Baya Lo Bubu & Tuhi-Tuhi (7 tangkai emas) -->
                <path d="M85,50 C85,42 115,42 115,50 Z" fill="#111111" />
                <!-- 5 dari 7 tangkai kembang emas tegak -->
                <line x1="100" y1="42" x2="100" y2="20" stroke="${secondary}" stroke-width="2" />
                <line x1="93" y1="44" x2="88" y2="24" stroke="${secondary}" stroke-width="1.5" />
                <line x1="107" y1="44" x2="112" y2="24" stroke="${secondary}" stroke-width="1.5" />
                <line x1="87" y1="47" x2="78" y2="30" stroke="${secondary}" stroke-width="1.5" />
                <line x1="113" y1="47" x2="122" y2="30" stroke="${secondary}" stroke-width="1.5" />
                <!-- Kembang bintang diatas tangkai -->
                <circle cx="100" cy="20" r="3" fill="${secondary}" />
                <circle cx="88" cy="24" r="2.5" fill="${secondary}" />
                <circle cx="112" cy="24" r="2.5" fill="${secondary}" />
            `;
            break;

        // --- MALUKU ---
        case 'maluku':
            // Baju Cele (Kotak-Kotak Merah-Putih & Brokat Pundak)
            svgCostumeContent = `
                <!-- Baju Kotak Cele -->
                <path d="M65,95 L135,95 L125,185 L75,185 Z" fill="${primary}" filter="url(#shadow-${id})" />
                <path d="M65,95 L135,95 L125,185 L75,185 Z" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="4,6" />
                <!-- Kain Pikul Putih Pundak -->
                <path d="M65,95 L80,95 L100,135 L80,140 Z" fill="#FFFFFF" opacity="0.9" />
                <path d="M135,95 L120,95 L100,135 L120,140 Z" fill="#FFFFFF" opacity="0.9" />
                <!-- Kain Sarung Bawah -->
                <path d="M75,185 L125,185 L120,230 L80,230 Z" fill="${accent}" />
            `;
            svgHeadwear = `
                <!-- Konde Bertumpuk Bulat Perak -->
                <circle cx="100" cy="46" r="10" fill="#111111" />
                <path d="M92,44 C92,35 108,35 108,44 Z" fill="none" stroke="${secondary}" stroke-width="2" />
            `;
            break;

        // --- PAPUA ---
        case 'papua':
        case 'papuabar':
        case 'papuapesisir':
        case 'papuatengah':
        case 'papuapegunungan':
        case 'papuaselatan':
            // Rumbai Daun Sagu + Mahkota Kasuari/Cenderawasih + Noken
            svgCostumeContent = `
                <!-- Tubh Telanjang Atas / Mannequin Cokelat -->
                <path d="M80,95 L120,95 L115,140 L85,140 Z" fill="#CD853F" />
                <!-- Kalung taring/gigi hewan -->
                <path d="M90,105 C95,115 105,115 110,105" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none" />
                <!-- Rok Rumbai Daun Sagu -->
                <path d="M75,140 L125,140 L135,210 L65,210 Z" fill="${primary}" filter="url(#shadow-${id})" />
                <!-- Garis-garis rumbai sagu -->
                <path d="M75,140 L65,210 M85,140 L80,210 M95,140 L95,210 M105,140 L110,210 M115,140 L125,210 M125,140 L135,210" stroke="#5C3A21" stroke-width="1.5" />
            `;
            svgHeadwear = `
                <!-- Mahkota Bulu Burung Cenderawasih -->
                <rect x="82" y="46" width="36" height="8" fill="#5C3A21" rx="2" />
                <!-- Bulu cenderawasih kuning orange menjuntai keatas belakang -->
                <path d="M85,46 C80,18 92,12 94,46 Z" fill="${secondary}" />
                <path d="M92,46 C90,12 102,5 100,46 Z" fill="${secondary}" />
                <path d="M100,46 C105,12 110,15 106,46 Z" fill="${secondary}" />
                <path d="M108,46 C115,18 118,22 112,46 Z" fill="${secondary}" />
            `;
            break;

        default:
            // Default Generic Silhouette (Kebaya/Jas)
            svgCostumeContent = `
                <path d="M65,95 L135,95 L125,190 L75,190 Z" fill="${primary}" filter="url(#shadow-${id})" />
                <path d="M80,95 L100,120 L120,95 Z" fill="${secondary}" />
                <circle cx="100" cy="140" r="15" fill="${secondary}" opacity="0.3" />
            `;
            svgHeadwear = `
                <path d="M85,50 C85,42 115,42 115,50 Z" fill="${secondary}" />
            `;
            break;
    }
    
    return svgHeader + svgBackground + svgCostumeContent + svgHeadwear + `</svg>`;
}

// ==========================================================================
// CATALOG RENDERING & LOGIC
// ==========================================================================
function renderAll() {
    let filteredData = [...BAJU_DATA];
    
    // 1. Filter Berdasarkan Wilayah
    if (activeRegionFilter !== 'all') {
        filteredData = filteredData.filter(item => item.region === activeRegionFilter);
    }
    
    // 2. Filter Berdasarkan Pencarian (Search Query)
    if (searchQuery !== '') {
        const query = searchQuery.toLowerCase().trim();
        filteredData = filteredData.filter(item => 
            item.clothingName.toLowerCase().includes(query) || 
            item.province.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        );
    }
    
    // 3. Pengurutan (Sorting)
    if (currentSort === 'province-asc') {
        filteredData.sort((a, b) => a.province.localeCompare(b.province));
    } else if (currentSort === 'province-desc') {
        filteredData.sort((a, b) => b.province.localeCompare(a.province));
    } else if (currentSort === 'name-asc') {
        filteredData.sort((a, b) => a.clothingName.localeCompare(b.clothingName));
    }
    
    // 4. Update Jumlah Hasil
    const countElement = document.getElementById('results-count');
    if (countElement) {
        countElement.innerText = `Menampilkan ${filteredData.length} pakaian adat`;
    }
    
    // 5. Render ke Grid Utama Eksplorasi
    const grid = document.getElementById('catalog-grid');
    if (grid) {
        // Beri efek transisi fade-out lembut saat render ulang
        grid.classList.add('fade-out');
        setTimeout(() => {
            grid.innerHTML = '';
            if (filteredData.length === 0) {
                grid.innerHTML = `
                    <div class="empty-state" style="grid-column: 1 / -1;">
                        <i class="fa-solid fa-folder-open"></i>
                        <h3>Data Tidak Ditemukan</h3>
                        <p>Tidak ada pakaian adat yang cocok dengan pencarian atau filter Anda.</p>
                    </div>
                `;
            } else {
                filteredData.forEach(item => {
                    grid.appendChild(createCardElement(item));
                });
            }
            grid.classList.remove('fade-out');
        }, 150);
    }

    // 6. Render ke Grid Tab Peta jika sedang aktif
    const mapGrid = document.getElementById('map-catalog-grid');
    if (mapGrid && currentTab === 'map-view') {
        mapGrid.innerHTML = '';
        if (activeRegionFilter === 'all') {
            mapGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; padding: 20px 0;">
                    <p>Silakan klik wilayah pada peta di atas untuk melihat pakaian adat daerah tersebut.</p>
                </div>
            `;
        } else {
            filteredData.forEach(item => {
                mapGrid.appendChild(createCardElement(item));
            });
        }
    }
}

// Membuat DOM Element Kartu Baju Adat
function createCardElement(item) {
    const isFav = favorites.includes(item.id);
    const card = document.createElement('div');
    card.className = 'card animate-fade-in';
    card.onclick = () => openModal(item.id);
    
    // Generate inline SVG untuk ilustrasi
    const svgHTML = getClothingSVG(item.id, item.colorPalette);
    
    card.innerHTML = `
        <div class="card-image-wrapper">
            <span class="card-badge" style="color: ${item.colorPalette.primary}; border-color: ${item.colorPalette.primary}22">${item.region}</span>
            <button class="card-fav-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite('${item.id}', this)">
                <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
            ${svgHTML}
        </div>
        <div class="card-info">
            <span class="card-province">${item.province}</span>
            <h3 class="card-title">${item.clothingName}</h3>
            <p class="card-desc">${item.description}</p>
            <div class="card-footer">
                <span class="card-tag">38 Provinsi</span>
                <span class="card-action-text">Detail <i class="fa-solid fa-arrow-right"></i></span>
            </div>
        </div>
    `;
    
    return card;
}

// Handle Event Input Pencarian
function handleSearch() {
    searchQuery = document.getElementById('search-input').value;
    renderAll();
}

// Handle Event Perubahan Filter Wilayah
function filterByRegion(region) {
    activeRegionFilter = region;
    
    // Update tombol filter aktif di UI eksplorasi
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-region') === region) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update highlight peta di UI Peta
    const paths = document.querySelectorAll('.map-region-path');
    paths.forEach(path => {
        if (path.getAttribute('data-region') === region) {
            path.classList.add('selected');
        } else {
            path.classList.remove('selected');
        }
    });

    // Update label hasil peta
    const mapSelectionText = document.getElementById('map-selection-text');
    if (mapSelectionText) {
        if (region === 'all') {
            mapSelectionText.innerText = "Klik salah satu wilayah kepulauan di atas untuk melihat hasilnya";
        } else {
            mapSelectionText.innerText = `Menampilkan baju adat dari wilayah: ${region}`;
        }
    }

    renderAll();
}

// Handle Event Pengurutan
function handleSort() {
    currentSort = document.getElementById('sort-select').value;
    renderAll();
}

// ==========================================================================
// DETAILED MODAL CONTROL
// ==========================================================================
let currentSelectedId = null;

function openModal(id) {
    const item = BAJU_DATA.find(x => x.id === id);
    if (!item) return;
    
    currentSelectedId = id;
    
    // Set data teks
    document.getElementById('modal-province').innerText = item.province;
    document.getElementById('modal-region').innerText = item.region;
    document.getElementById('modal-clothing-name').innerText = item.clothingName;
    document.getElementById('modal-desc').innerText = item.description;
    document.getElementById('modal-philosophy').innerText = item.philosophy;
    document.getElementById('modal-occasions').innerText = item.occasions;
    
    // Set komponen list
    const compList = document.getElementById('modal-components');
    compList.innerHTML = '';
    item.components.forEach(comp => {
        const li = document.createElement('li');
        li.innerText = comp;
        compList.appendChild(li);
    });
    
    // Set Ilustrasi SVG (Ukuran besar)
    const imgContainer = document.getElementById('modal-img-container');
    imgContainer.innerHTML = getClothingSVG(item.id, item.colorPalette, "100%");
    
    // Set Swatch Palet Warna
    const paletteContainer = document.getElementById('modal-palette');
    paletteContainer.innerHTML = '';
    Object.entries(item.colorPalette).forEach(([key, color]) => {
        const swatch = document.createElement('div');
        swatch.className = 'palette-swatch';
        swatch.style.backgroundColor = color;
        swatch.setAttribute('data-color', color);
        paletteContainer.appendChild(swatch);
    });

    // Set Status Tombol Favorit di Modal
    const modalFavBtn = document.getElementById('modal-fav-btn');
    const isFav = favorites.includes(id);
    if (isFav) {
        modalFavBtn.classList.add('active');
        modalFavBtn.innerHTML = `<i class="fa-solid fa-heart"></i> Terfavorit`;
    } else {
        modalFavBtn.classList.remove('active');
        modalFavBtn.innerHTML = `<i class="fa-regular fa-heart"></i> Simpan ke Favorit`;
    }
    
    // Tampilkan Modal
    document.getElementById('detail-modal').classList.add('active');
    document.body.style.overflow = 'hidden'; // Kunci scroll layar belakang
}

function closeModal(event) {
    document.getElementById('detail-modal').classList.remove('active');
    document.body.style.overflow = ''; // Aktifkan kembali scroll
}

// Mengubah status favorit via tombol modal
function toggleFavoriteCurrent() {
    if (!currentSelectedId) return;
    
    // Simulasi klik tombol favorit kartu
    toggleFavorite(currentSelectedId);
    
    // Update tampilan tombol modal
    const modalFavBtn = document.getElementById('modal-fav-btn');
    const isFav = favorites.includes(currentSelectedId);
    if (isFav) {
        modalFavBtn.classList.add('active');
        modalFavBtn.innerHTML = `<i class="fa-solid fa-heart"></i> Terfavorit`;
    } else {
        modalFavBtn.classList.remove('active');
        modalFavBtn.innerHTML = `<i class="fa-regular fa-heart"></i> Simpan ke Favorit`;
    }

    // Render ulang catalog dan favorit screen untuk menjaga konsistensi
    renderAll();
    if (currentTab === 'favorites') {
        renderFavorites();
    }
}

// ==========================================================================
// FAVORITES SYSTEM (LOCALSTORAGE)
// ==========================================================================
function loadFavorites() {
    const saved = localStorage.getItem('nusantara_baju_favs');
    if (saved) {
        try {
            favorites = JSON.parse(saved);
        } catch (e) {
            favorites = [];
        }
    }
}

function toggleFavorite(id, btnElement = null) {
    const index = favorites.indexOf(id);
    if (index === -1) {
        favorites.push(id);
    } else {
        favorites.splice(index, 1);
    }
    
    // Simpan ke LocalStorage
    localStorage.setItem('nusantara_baju_favs', JSON.stringify(favorites));
    
    // Update badge counter di navbar
    updateFavCount();
    
    // Update UI tombol kartu jika dikirim
    if (btnElement) {
        const isFav = favorites.includes(id);
        if (isFav) {
            btnElement.classList.add('active');
            btnElement.innerHTML = `<i class="fa-solid fa-heart"></i>`;
        } else {
            btnElement.classList.remove('active');
            btnElement.innerHTML = `<i class="fa-regular fa-heart"></i>`;
        }
    } else {
        // Jika dipicu tanpa tombol spesifik (misal dari modal), render ulang seluruh kartu
        renderAll();
    }

    // Jika sedang di tab favorit, render ulang daftarnya langsung
    if (currentTab === 'favorites') {
        renderFavorites();
    }
}

function updateFavCount() {
    const badge = document.getElementById('fav-count');
    if (badge) {
        badge.innerText = favorites.length;
    }
}

function renderFavorites() {
    const grid = document.getElementById('favorites-grid');
    const emptyState = document.getElementById('favorites-empty');
    if (!grid || !emptyState) return;
    
    grid.innerHTML = '';
    
    const favData = BAJU_DATA.filter(item => favorites.includes(item.id));
    
    if (favData.length === 0) {
        grid.classList.add('hidden');
        emptyState.classList.remove('hidden');
    } else {
        grid.classList.remove('hidden');
        emptyState.classList.add('hidden');
        
        favData.forEach(item => {
            grid.appendChild(createCardElement(item));
        });
    }
}

// ==========================================================================
// INTERACTIVE MAP LOGIC
// ==========================================================================
function initInteractiveMap() {
    const paths = document.querySelectorAll('.map-region-path');
    paths.forEach(path => {
        path.addEventListener('click', () => {
            const region = path.getAttribute('data-region');
            
            // Toggle filter
            if (activeRegionFilter === region) {
                filterByRegion('all'); // Matikan filter jika mengklik wilayah yang sama lagi
            } else {
                filterByRegion(region);
            }
        });
    });
}

// ==========================================================================
// INTERACTIVE QUIZ MODE LOGIC
// ==========================================================================
function startQuiz() {
    // Sembunyikan layar awal & hasil, tunjukkan layar permainan kuis
    document.getElementById('quiz-start-screen').classList.add('hidden');
    document.getElementById('quiz-result-screen').classList.add('hidden');
    document.getElementById('quiz-play-screen').classList.remove('hidden');
    
    // Inisialisasi State Kuis
    currentQuestionIndex = 0;
    quizScore = 0;
    
    // Buat Pertanyaan Acak
    generateQuizQuestions();
    
    // Tampilkan pertanyaan pertama
    renderQuestion();
}

function generateQuizQuestions() {
    quizQuestions = [];
    // Acak salinan database
    const shuffledData = [...BAJU_DATA].sort(() => 0.5 - Math.random());
    
    // Ambil 10 item teratas sebagai basis pertanyaan
    for (let i = 0; i < 10; i++) {
        const correctBaju = shuffledData[i];
        
        // Tentukan tipe pertanyaan secara acak (Tipe 0: Tebak Provinsi dari Baju, Tipe 1: Tebak Baju dari Provinsi)
        const questionType = Math.random() > 0.5 ? 0 : 1;
        
        // Kumpulkan 3 opsi salah acak
        const wrongOptions = [];
        const pool = BAJU_DATA.filter(x => x.id !== correctBaju.id);
        const shuffledPool = pool.sort(() => 0.5 - Math.random());
        
        for (let j = 0; j < 3; j++) {
            if (questionType === 0) {
                wrongOptions.push(shuffledPool[j].province);
            } else {
                wrongOptions.push(shuffledPool[j].clothingName);
            }
        }
        
        // Masukkan opsi benar
        const correctAnswer = questionType === 0 ? correctBaju.province : correctBaju.clothingName;
        const allOptions = [...wrongOptions, correctAnswer].sort(() => 0.5 - Math.random());
        
        quizQuestions.push({
            baju: correctBaju,
            type: questionType,
            questionText: questionType === 0 
                ? `Pakaian adat tradisional bernama "${correctBaju.clothingName}" berasal dari provinsi mana?`
                : `Apa nama pakaian adat tradisional yang khas dari provinsi "${correctBaju.province}"?`,
            options: allOptions,
            correctAnswer: correctAnswer
        });
    }
}

function renderQuestion() {
    quizIsAnswered = false;
    const currentQ = quizQuestions[currentQuestionIndex];
    
    // Update Meta Kuis
    document.getElementById('quiz-question-number').innerText = `Pertanyaan ${currentQuestionIndex + 1} dari 10`;
    document.getElementById('quiz-score').innerText = `Skor: ${quizScore}`;
    document.getElementById('quiz-progress-fill').style.width = `${(currentQuestionIndex / 10) * 100}%`;
    
    // Set teks pertanyaan & Gambar Ilustrasi Baju Adat pendukung kuis
    document.getElementById('quiz-question-text').innerText = currentQ.questionText;
    document.getElementById('quiz-img-container').innerHTML = getClothingSVG(currentQ.baju.id, currentQ.baju.colorPalette, "140px");
    
    // Render Pilihan Jawaban
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    currentQ.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'quiz-opt-btn';
        btn.innerHTML = `<span>${option}</span> <i class="fa-regular fa-circle"></i>`;
        btn.onclick = () => selectQuizAnswer(option, btn);
        optionsContainer.appendChild(btn);
    });
}

function selectQuizAnswer(selectedOption, btnElement) {
    if (quizIsAnswered) return; // Mencegah klik ganda
    quizIsAnswered = true;
    
    const currentQ = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQ.correctAnswer;
    
    // Cari semua tombol opsi untuk di-disable
    const allButtons = document.querySelectorAll('.quiz-opt-btn');
    allButtons.forEach(btn => btn.style.cursor = 'default');
    
    if (isCorrect) {
        btnElement.classList.add('correct');
        btnElement.querySelector('i').className = 'fa-solid fa-circle-check';
        quizScore += 10;
        document.getElementById('quiz-score').innerText = `Skor: ${quizScore}`;
    } else {
        btnElement.classList.add('wrong');
        btnElement.querySelector('i').className = 'fa-solid fa-circle-xmark';
        
        // Tunjukkan jawaban yang benar dengan warna hijau lembut
        allButtons.forEach(btn => {
            if (btn.querySelector('span').innerText === currentQ.correctAnswer) {
                btn.classList.add('correct');
                btn.querySelector('i').className = 'fa-solid fa-circle-check';
            }
        });
    }
    
    // Pindah ke pertanyaan berikutnya setelah jeda 1.5 detik
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < 10) {
            renderQuestion();
        } else {
            showQuizResult();
        }
    }, 1500);
}

function showQuizResult() {
    document.getElementById('quiz-play-screen').classList.add('hidden');
    document.getElementById('quiz-result-screen').classList.remove('hidden');
    document.getElementById('quiz-progress-fill').style.width = '100%';
    
    const finalScore = quizScore;
    document.getElementById('quiz-final-score').innerText = finalScore;
    
    // Setel Ikon & Judul berdasarkan performa skor
    const titleEl = document.getElementById('quiz-result-title');
    const descEl = document.getElementById('quiz-result-desc');
    const iconEl = document.getElementById('quiz-result-icon');
    
    descEl.innerText = `Anda menjawab ${finalScore / 10} dari 10 pertanyaan dengan benar.`;
    
    if (finalScore >= 80) {
        titleEl.innerText = "Luar Biasa! Ahli Budaya";
        iconEl.innerHTML = `<i class="fa-solid fa-trophy" style="color: #FFD700;"></i>`;
    } else if (finalScore >= 50) {
        titleEl.innerText = "Bagus! Terus Belajar";
        iconEl.innerHTML = `<i class="fa-solid fa-award" style="color: #C0C0C0;"></i>`;
    } else {
        titleEl.innerText = "Mari Coba Lagi!";
        iconEl.innerHTML = `<i class="fa-solid fa-circle-info" style="color: var(--color-primary);"></i>`;
    }
}

// ==========================================================================
// TABS NAVIGATION & MOBILE MENU
// ==========================================================================
function switchTab(tabId) {
    currentTab = tabId;
    
    // Update Kelas Aktif di Navigasi Navbar
    const navButtons = document.querySelectorAll('.nav-links button');
    navButtons.forEach(btn => {
        if (btn.id === `nav-btn-${tabId.split('-')[0]}`) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Sembunyikan semua konten tab, tunjukkan tab terpilih
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        if (tab.id === `tab-${tabId}`) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Pemicu render khusus tab tertentu
    if (tabId === 'favorites') {
        renderFavorites();
    } else if (tabId === 'explore' || tabId === 'map-view') {
        renderAll();
    } else if (tabId === 'quiz') {
        // Reset kuis ke layar mulai saat masuk tab kuis
        document.getElementById('quiz-start-screen').classList.remove('hidden');
        document.getElementById('quiz-play-screen').classList.add('hidden');
        document.getElementById('quiz-result-screen').classList.add('hidden');
    }
    
    // Tutup menu mobile jika sedang terbuka
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }

    // Scroll ke atas container secara otomatis saat ganti tab
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}
