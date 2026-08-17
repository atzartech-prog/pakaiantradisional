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
    
    let svgHeader = `<svg viewBox="0 0 200 240" width="${size}" height="${size}" class="clothing-svg-card" xmlns="http://www.w3.org/2000/svg">`;
    let svgBackground = `
        <defs>
            <linearGradient id="grad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FFFDF9" />
                <stop offset="100%" stop-color="#F2EDE4" />
            </linearGradient>
            <!-- Gradasi untuk Bayangan Baju (3D effect) -->
            <linearGradient id="shading-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#000000" stop-opacity="0.25" />
                <stop offset="40%" stop-color="#000000" stop-opacity="0" />
                <stop offset="70%" stop-color="#FFFFFF" stop-opacity="0" />
                <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.15" />
            </linearGradient>
            <!-- Gradasi Emas Mengkilap -->
            <linearGradient id="gold-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FFF099" />
                <stop offset="50%" stop-color="#D4AF37" />
                <stop offset="100%" stop-color="#AA7C11" />
            </linearGradient>
            <filter id="shadow-${id}" x="-20%" y="-20%" width="140%" height="140%">
                <drop-shadow dx="0" dy="6" stdDeviation="5" flood-color="#2D2319" flood-opacity="0.15" />
            </filter>
        </defs>
        <!-- Latar Belakang Kartu dengan Tekstur Halus -->
        <rect width="200" height="240" rx="16" fill="url(#grad-${id})" />
        <!-- Lingkaran Aura Etnik Belakang -->
        <circle cx="100" cy="115" r="60" fill="${primary}" opacity="0.05" />
        <circle cx="100" cy="115" r="45" fill="none" stroke="${secondary}" stroke-opacity="0.1" stroke-width="1.5" stroke-dasharray="4,4" />
        
        <!-- Penyangga Stand Kayu / Mannequin Elegan -->
        <path d="M100,50 L100,210 M65,210 L135,210" stroke="#8E7C6E" stroke-width="3" stroke-linecap="round" fill="none" />
        <path d="M75,60 C90,52 110,52 125,60" stroke="#8E7C6E" stroke-width="4" stroke-linecap="round" fill="none" />
        <circle cx="100" cy="40" r="6" stroke="#8E7C6E" stroke-width="3" fill="none" />
    `;
    
    let svgCostumeContent = '';
    let svgHeadwear = '';
    
    // Rangkuman Desain Baju dengan Garis Luwes (Curves)
    switch (id) {
        // --- SUMATERA ---
        case 'aceh':
            svgCostumeContent = `
                <!-- Baju Meukasah (Hitam/Crimson Sutra) -->
                <g filter="url(#shadow-${id})">
                    <path d="M60,90 Q50,135 60,180 Q100,190 140,180 Q150,135 140,90 C125,85 75,85 60,90 Z" fill="${primary}" />
                    <!-- Lengan melengkung luwes -->
                    <path d="M60,90 Q40,115 50,145 Q58,145 60,130" stroke="${primary}" stroke-width="10" stroke-linecap="round" fill="none" />
                    <path d="M140,90 Q160,115 150,145 Q142,145 140,130" stroke="${primary}" stroke-width="10" stroke-linecap="round" fill="none" />
                    <!-- Detail Kerah Shanghai Emas -->
                    <path d="M88,90 C88,72 112,72 112,90 Z" fill="url(#gold-${id})" />
                    <path d="M92,90 C92,78 108,78 108,90 Z" fill="${primary}" />
                    <!-- Hiasan dada emas diagonal simetris -->
                    <path d="M85,100 L115,100 M80,115 L120,115 M83,130 L117,130" stroke="url(#gold-${id})" stroke-width="2" stroke-linecap="round" />
                    <!-- Kancing Baris Tengah -->
                    <line x1="100" y1="90" x2="100" y2="180" stroke="url(#gold-${id})" stroke-width="2" />
                    <circle cx="100" cy="108" r="3" fill="url(#gold-${id})" />
                    <circle cx="100" cy="125" r="3" fill="url(#gold-${id})" />
                    <circle cx="100" cy="142" r="3" fill="url(#gold-${id})" />
                    <circle cx="100" cy="160" r="3" fill="url(#gold-${id})" />
                    <!-- Ujung Lengan Emas -->
                    <path d="M43,138 L54,143" stroke="url(#gold-${id})" stroke-width="4" />
                    <path d="M157,138 L146,143" stroke="url(#gold-${id})" stroke-width="4" />
                    <!-- Shadow Overlay -->
                    <path d="M60,90 Q50,135 60,180 Q100,190 140,180 Q150,135 140,90 Z" fill="url(#shading-${id})" />
                </g>
            `;
            svgHeadwear = `
                <!-- Kopiah Meukeutop khas Aceh -->
                <g filter="url(#shadow-${id})">
                    <path d="M82,50 C80,25 120,25 118,50 Z" fill="${accent}" />
                    <!-- Motif garis anyaman emas melengkung -->
                    <path d="M82,50 Q100,32 118,50 M85,42 Q100,26 115,42" fill="none" stroke="url(#gold-${id})" stroke-width="2" />
                    <!-- Mahkota kubah bawah merah -->
                    <path d="M80,50 C90,56 110,56 120,50 L118,55 C110,58 90,58 82,55 Z" fill="${primary}" />
                    <path d="M80,50 C90,56 110,56 120,50" fill="none" stroke="url(#gold-${id})" stroke-width="1.5" />
                </g>
            `;
            break;
            
        case 'sumut':
            svgCostumeContent = `
                <!-- Ulos & Bagasan Godang -->
                <g filter="url(#shadow-${id})">
                    <!-- Jas Hitam Beludru bawah -->
                    <path d="M62,95 Q52,135 62,185 Q100,192 138,185 Q148,135 138,95 C125,92 75,92 62,95 Z" fill="#1C1A17" />
                    <!-- Ulos Batak Merah Melengkung Luwes Draping -->
                    <path d="M65,95 Q82,120 115,160 Q130,178 135,185 Q125,190 115,180 Q78,130 60,105 Z" fill="${primary}" />
                    <!-- Motif Detail Emas & Garis Ulos -->
                    <path d="M67,97 Q84,122 117,162 M73,99 Q90,124 122,164" fill="none" stroke="url(#gold-${id})" stroke-width="1" />
                    <path d="M61,105 Q72,122 90,146" fill="none" stroke="${accent}" stroke-width="1.5" />
                    <!-- Rumbai/Fringe di ujung Ulos bawah -->
                    <path d="M125,183 L126,192 M128,181 L129,190 M131,179 L132,188 M134,177 L135,186" stroke="url(#gold-${id})" stroke-width="1.5" />
                    <!-- Shadow Overlay -->
                    <path d="M62,95 Q52,135 62,185 Q100,192 138,185 Q148,135 138,95 C125,92 75,92 62,95 Z" fill="url(#shading-${id})" />
                </g>
            `;
            svgHeadwear = `
                <!-- Bulang Bulang ikat kepala Mandailing -->
                <g filter="url(#shadow-${id})">
                    <path d="M78,44 Q100,38 122,44 L118,52 Q100,48 82,52 Z" fill="${primary}" />
                    <path d="M78,44 Q100,38 122,44" fill="none" stroke="url(#gold-${id})" stroke-width="2" />
                    <path d="M82,52 Q100,48 118,52" fill="none" stroke="url(#gold-${id})" stroke-width="1.5" />
                </g>
            `;
            break;
            
        case 'sumbar':
            svgCostumeContent = `
                <!-- Baju Kurung Limpapeh Minangkabau -->
                <g filter="url(#shadow-${id})">
                    <path d="M60,98 Q50,140 60,185 Q100,195 140,185 Q150,140 140,98 Z" fill="${primary}" />
                    <!-- Lengan baju longgar menggantung luwes -->
                    <path d="M60,98 C45,120 40,145 52,155 C60,155 60,140 63,125" fill="${primary}" />
                    <path d="M140,98 C155,120 160,145 148,155 C140,155 140,140 137,125" fill="${primary}" />
                    <!-- Hiasan Bahu Payet Emas -->
                    <path d="M58,98 C65,100 70,110 65,115" fill="none" stroke="url(#gold-${id})" stroke-width="3" stroke-linecap="round" />
                    <path d="M142,98 C135,100 130,110 135,115" fill="none" stroke="url(#gold-${id})" stroke-width="3" stroke-linecap="round" />
                    <!-- Kalung Papan Emas Bersusun Luwes melengkung -->
                    <path d="M82,108 C90,122 110,122 118,108" fill="none" stroke="url(#gold-${id})" stroke-width="3.5" />
                    <path d="M76,116 C88,135 112,135 124,116" fill="none" stroke="url(#gold-${id})" stroke-width="2" />
                    <!-- Bordir Emas Bawah Baju -->
                    <path d="M62,180 Q100,190 138,180" fill="none" stroke="url(#gold-${id})" stroke-width="3" />
                    <path d="M60,98 Q50,140 60,185 Q100,195 140,185 Q150,140 140,98 Z" fill="url(#shading-${id})" />
                </g>
            `;
            svgHeadwear = `
                <!-- Tingkuluak Tanduk Kerbau melengkung 3D -->
                <g filter="url(#shadow-${id})">
                    <!-- Tanduk Belakang -->
                    <path d="M100,55 C120,55 135,50 145,25 C132,45 115,50 100,50 C85,50 68,45 55,25 C65,50 80,55 100,55 Z" fill="${accent}" />
                    <!-- Tanduk Utama Depan -->
                    <path d="M100,52 C118,52 138,45 148,22 C135,42 115,48 100,48 C85,48 65,42 52,22 C62,45 82,52 100,52 Z" fill="${primary}" />
                    <!-- Lilitan Emas Tengah Tanduk -->
                    <path d="M92,49 C96,49 100,42 100,48 C100,42 104,49 108,49" fill="none" stroke="url(#gold-${id})" stroke-width="2.5" />
                    <!-- Emas Ujung Tanduk -->
                    <circle cx="52" cy="22" r="3" fill="url(#gold-${id})" />
                    <circle cx="148" cy="22" r="3" fill="url(#gold-${id})" />
                </g>
            `;
            break;
            
        case 'sumsel':
            svgCostumeContent = `
                <!-- Aesan Gede Sriwijaya -->
                <g filter="url(#shadow-${id})">
                    <!-- Kain Dodot Songket Merah Emas -->
                    <path d="M65,110 C58,145 68,185 75,200 C85,205 115,205 125,200 C132,185 142,145 135,110 Z" fill="url(#gold-${id})" />
                    <!-- Detail Motif Benang Songket Merah -->
                    <path d="M68,125 Q100,130 132,125 M70,145 Q100,150 130,145 M72,165 Q100,170 128,165 M74,185 Q100,190 126,185" fill="none" stroke="${primary}" stroke-width="2.5" stroke-opacity="0.85" />
                    <!-- Teratai Hiasan Dada Melingkar Besar -->
                    <path d="M72,110 C75,82 125,82 128,110 C120,122 80,122 72,110 Z" fill="${primary}" />
                    <path d="M72,110 C75,82 125,82 128,110" fill="none" stroke="url(#gold-${id})" stroke-width="3" />
                    <!-- Kalung Kebo Mungkur emas menggantung di dada -->
                    <circle cx="100" cy="115" r="10" fill="url(#gold-${id})" />
                    <path d="M93,122 L100,132 L107,122 Z" fill="url(#gold-${id})" />
                    <path d="M65,110 C58,145 68,185 75,200 C85,205 115,205 125,200 C132,185 142,145 135,110 Z" fill="url(#shading-${id})" />
                </g>
            `;
            svgHeadwear = `
                <!-- Kesuho Crown tinggi melati bergoyang -->
                <g filter="url(#shadow-${id})">
                    <path d="M82,50 C80,30 90,20 100,16 C110,20 120,30 118,50 Z" fill="url(#gold-${id})" />
                    <path d="M86,50 C86,36 94,28 100,24 C106,28 114,36 114,50 Z" fill="${primary}" />
                    <!-- Hiasan Permata dan Melati Crown -->
                    <circle cx="100" cy="15" r="4" fill="#FFFFFF" />
                    <circle cx="82" cy="46" r="3" fill="#FFFFFF" />
                    <circle cx="118" cy="46" r="3" fill="#FFFFFF" />
                    <path d="M88,34 Q100,28 112,34" fill="none" stroke="url(#gold-${id})" stroke-width="2" />
                </g>
            `;
            break;
            
        case 'lampung':
            svgCostumeContent = `
                <!-- Tulang Bawang Lampung -->
                <g filter="url(#shadow-${id})">
                    <!-- Baju Putih Bersih -->
                    <path d="M64,98 Q54,135 64,185 Q100,192 136,185 Q146,135 136,98 Z" fill="#FAFAFA" />
                    <!-- Kain Tapis Emas melingkar bawah -->
                    <path d="M70,160 Q100,168 130,160 L136,185 Q100,192 64,185 Z" fill="url(#gold-${id})" />
                    <line x1="70" y1="172" x2="130" y2="172" stroke="${primary}" stroke-width="2" />
                    <!-- Selempang Tapis Menyilang Lembut -->
                    <path d="M68,102 Q100,135 125,178 L112,185 Q90,140 60,115 Z" fill="url(#gold-${id})" />
                    <!-- Kalung Papan Jajar Emas bersusun melengkung -->
                    <path d="M84,115 Q100,128 116,115" fill="none" stroke="url(#gold-${id})" stroke-width="4.5" stroke-linecap="round" />
                    <path d="M80,126 Q100,142 120,126" fill="none" stroke="url(#gold-${id})" stroke-width="3" stroke-linecap="round" />
                    <path d="M76,138 Q100,158 124,138" fill="none" stroke="url(#gold-${id})" stroke-width="2" stroke-linecap="round" />
                    <path d="M64,98 Q54,135 64,185 Q100,192 136,185 Q146,135 136,98 Z" fill="url(#shading-${id})" />
                </g>
            `;
            svgHeadwear = `
                <!-- Siger Lampung (9 Lekukan emas bergelombang anggun) -->
                <g filter="url(#shadow-${id})">
                    <path d="M70,52 C75,44 80,48 85,38 C90,48 95,44 100,34 C105,44 110,48 115,38 C120,48 125,44 130,52 L125,62 L75,62 Z" fill="url(#gold-${id})" />
                    <!-- Tiang hiasan puncak siger -->
                    <circle cx="100" cy="30" r="3" fill="${primary}" />
                    <circle cx="85" cy="34" r="2.5" fill="${primary}" />
                    <circle cx="115" cy="34" r="2.5" fill="${primary}" />
                    <!-- Manik-manik bawah siger -->
                    <path d="M75,59 Q100,64 125,59" fill="none" stroke="${primary}" stroke-width="2" />
                </g>
            `;
            break;

        // --- JAWA ---
        case 'jakarta':
            svgCostumeContent = `
                <!-- Kebaya Encim Betawi -->
                <g filter="url(#shadow-${id})">
                    <!-- Kebaya Encim Merah Muda Terbuka bawah (Lancip depan) -->
                    <path d="M65,95 Q54,135 68,180 L100,205 L132,180 Q146,135 135,95 Z" fill="${primary}" />
                    <!-- Kerah V Belah Depan kebaya -->
                    <path d="M88,95 L100,135 L112,95" fill="none" stroke="#FFFFFF" stroke-width="3" />
                    <!-- Bordir Bunga/Kerancang Putih disepanjang kerah & bawah -->
                    <path d="M88,95 L100,135 L112,95 L132,180 L100,205 L68,180 Z" fill="none" stroke="${secondary}" stroke-width="1.5" stroke-dasharray="2,3" />
                    <!-- Kain Batik Betawi Cerah di bagian bawah -->
                    <path d="M74,188 L126,188 L120,230 L80,230 Z" fill="${accent}" />
                    <path d="M74,188 Q100,192 126,188" fill="none" stroke="url(#gold-${id})" stroke-width="2" />
                    <!-- Detail Bunga Batik Betawi -->
                    <circle cx="90" cy="205" r="4" fill="${secondary}" opacity="0.7" />
                    <circle cx="110" cy="215" r="4" fill="${secondary}" opacity="0.7" />
                    <!-- Lengan baju melengkung luwes -->
                    <path d="M65,95 Q48,115 54,142 Q60,142 62,130" stroke="${primary}" stroke-width="9" stroke-linecap="round" fill="none" />
                    <path d="M135,95 Q152,115 146,142 Q140,142 138,130" stroke="${primary}" stroke-width="9" stroke-linecap="round" fill="none" />
                    <path d="M65,95 Q54,135 68,180 L100,205 L132,180 Q146,135 135,95 Z" fill="url(#shading-${id})" />
                </g>
            `;
            svgHeadwear = `
                <!-- Selendang Kerudung Sifon Betawi Melengkung Anggun -->
                <g filter="url(#shadow-${id})">
                    <path d="M78,48 C75,32 125,32 122,48 C126,62 122,80 120,85 L112,85 C114,75 116,54 100,54 C84,54 86,75 88,85 L80,85 C78,80 74,62 78,48 Z" fill="${accent}" fill-opacity="0.85" />
                    <path d="M78,48 C75,32 125,32 122,48" fill="none" stroke="#FFFFFF" stroke-width="1" stroke-opacity="0.5" />
                </g>
            `;
            break;

        case 'jateng':
        case 'diy':
            svgCostumeContent = `
                <!-- Jawi Jangkep Jawa Tengah / Surjan Kraton -->
                <g filter="url(#shadow-${id})">
                    <!-- Beskap/Surjan Beludru Hitam -->
                    <path d="M62,95 Q52,135 62,185 Q100,192 138,185 Q148,135 138,95 Z" fill="${primary}" />
                    <!-- Lengan baju melengkung luwes -->
                    <path d="M62,95 Q42,115 50,145 Q58,145 60,130" stroke="${primary}" stroke-width="10" stroke-linecap="round" fill="none" />
                    <path d="M138,95 Q158,115 150,145 Q142,145 140,130" stroke="${primary}" stroke-width="10" stroke-linecap="round" fill="none" />
                    <!-- Kerah Shanghai Khas Kraton -->
                    <path d="M90,95 C90,80 110,80 110,95 Z" fill="url(#gold-${id})" />
                    <path d="M93,95 C93,85 107,85 107,95 Z" fill="${primary}" />
                    <!-- Baris Kancing Emas Menyamping Elegan -->
                    <line x1="106" y1="95" x2="106" y2="185" stroke="url(#gold-${id})" stroke-width="2" />
                    <circle cx="106" cy="110" r="3" fill="url(#gold-${id})" />
                    <circle cx="106" cy="125" r="3" fill="url(#gold-${id})" />
                    <circle cx="106" cy="140" r="3" fill="url(#gold-${id})" />
                    <circle cx="106" cy="155" r="3" fill="url(#gold-${id})" />
                    <!-- Kain Batik Cokelat Wiru (Lipatan di Tengah) -->
                    <path d="M70,185 L130,185 L124,232 L76,232 Z" fill="#6E4720" />
                    <!-- Motif Lereng Jarik -->
                    <path d="M80,185 L100,232 M92,185 L112,232 M104,185 L124,232" stroke="${secondary}" stroke-width="1.5" stroke-opacity="0.6" />
                    <!-- Wiru (Lipatan Batik Tengah Vertikal) -->
                    <path d="M98,185 L98,232 L104,232 L104,185 Z" fill="#8B5A2B" stroke="url(#gold-${id})" stroke-width="1" />
                    <!-- Keris terselip di belakang (gagang kayu melengkung terlihat) -->
                    <path d="M130,150 Q145,138 140,130 Q132,126 128,140" fill="#CD853F" stroke="#5C3A21" stroke-width="1.5" />
                    <path d="M62,95 Q52,135 62,185 Q100,192 138,185 Q148,135 138,95 Z" fill="url(#shading-${id})" />
                </g>
            `;
            svgHeadwear = `
                <!-- Blangkon dengan Mondolan belakang (gaya Jogja/Solo) -->
                <g filter="url(#shadow-${id})">
                    <path d="M80,51 C80,42 120,42 120,51 Z" fill="#6E4720" />
                    <!-- Garis-garis lipatan blangkon silang -->
                    <path d="M80,51 L100,42 L120,51 M82,48 L100,40 L118,48" fill="none" stroke="${secondary}" stroke-width="1" stroke-opacity="0.5" />
                    <!-- Mondolan (tonjolan rambut belakang bulat) -->
                    <circle cx="100" cy="45" r="6" fill="#422911" />
                    <circle cx="100" cy="45" r="4" fill="none" stroke="url(#gold-${id})" stroke-width="1" />
                </g>
            `;
            break;
            
        case 'jatim':
            svgCostumeContent = `
                <!-- Pesa'an Madura Garis Merah Putih Dinamis -->
                <g filter="url(#shadow-${id})">
                    <!-- Kaos Dalam Bergaris Merah Putih dengan Kerutan Organik -->
                    <path d="M68,100 C62,128 66,155 72,180 C88,185 112,185 128,180 C134,155 138,128 132,100 Z" fill="#FAFAFA" />
                    <path d="M67,110 Q100,113 133,110 M68,125 Q100,128 132,125 M69,140 Q100,143 131,140 M70,155 Q100,158 130,155 M71,170 Q100,173 129,170" fill="none" stroke="${primary}" stroke-width="6" />
                    <!-- Jas Hitam Pesa'an Terbuka Lebar Bergantung Lembut -->
                    <path d="M60,95 Q52,135 64,180 C70,180 78,160 76,130 C74,105 78,95 78,95 Z" fill="#1A1816" />
                    <path d="M140,95 Q148,135 136,180 C130,180 122,160 124,130 C126,105 122,95 122,95 Z" fill="#1A1816" />
                    <!-- Celurit Khas Madura Terselip -->
                    <path d="M110,174 Q135,160 128,150" fill="none" stroke="#DDDDDD" stroke-width="3.5" stroke-linecap="round" />
                    <path d="M102,176 L112,172" stroke="#8B5A2B" stroke-width="5" stroke-linecap="round" /> <!-- Gagang celurit -->
                    <!-- Sabuk Kulit Katemang lebar cokelat berdimensi -->
                    <rect x="70" y="174" width="60" height="14" fill="#4A2F1B" rx="3" />
                    <rect x="70" y="174" width="60" height="14" fill="none" stroke="url(#gold-${id})" stroke-width="1" />
                    <rect x="94" y="171" width="12" height="20" fill="url(#gold-${id})" rx="2" />
                </g>
            `;
            svgHeadwear = `
                <!-- Odheng Madura dengan Simpul Kuncung melengkung -->
                <g filter="url(#shadow-${id})">
                    <path d="M80,51 C80,44 120,44 120,51 L124,46 L100,38 L76,46 Z" fill="#6E4720" />
                    <path d="M78,48 L100,43 L122,48" fill="none" stroke="url(#gold-${id})" stroke-width="1.5" />
                    <!-- Lipatan Segitiga khas Madura menjulang ke atas asimetris -->
                    <path d="M108,39 L122,25 L116,39 Z" fill="#6E4720" stroke="url(#gold-${id})" stroke-width="1" />
                </g>
            `;
            break;

        // --- BALI & NUSA TENGGARA ---
        case 'bali':
            svgCostumeContent = `
                <!-- Payas Agung Bali -->
                <g filter="url(#shadow-${id})">
                    <!-- Kemben/Wastra Prada Ungu Songket Emas -->
                    <path d="M68,110 C62,135 68,175 74,198 C84,204 116,204 126,198 C132,175 138,135 132,110 Z" fill="${primary}" />
                    <!-- Motif Melingkar Emas Prada -->
                    <path d="M70,122 Q100,128 130,122 M71,142 Q100,148 129,142 M73,162 Q100,168 127,162 M75,182 Q100,188 125,182" fill="none" stroke="url(#gold-${id})" stroke-width="2.5" stroke-opacity="0.9" />
                    <!-- Sabuk Serok Kuning melilit pinggang luwes menjuntai -->
                    <path d="M72,142 Q100,147 128,142 L125,158 Q100,163 75,158 Z" fill="url(#gold-${id})" />
                    <path d="M96,158 C96,180 92,195 90,215 L106,215 C108,195 104,180 104,158 Z" fill="url(#gold-${id})" /> <!-- Kain selendang panjang menjuntai tengah -->
                    <!-- Badong/Hiasan Dada melingkar khas Bali -->
                    <path d="M72,110 C75,82 125,82 128,110 C120,122 80,122 72,110 Z" fill="url(#gold-${id})" />
                    <!-- Permata Ruby merah di badong -->
                    <circle cx="100" cy="100" r="4" fill="${primary}" />
                    <circle cx="86" cy="104" r="3" fill="${primary}" />
                    <circle cx="114" cy="104" r="3" fill="${primary}" />
                    <path d="M68,110 C62,135 68,175 74,198 C84,204 116,204 126,198 C132,175 138,135 132,110 Z" fill="url(#shading-${id})" />
                </g>
            `;
            svgHeadwear = `
                <!-- Gelungan (Mahkota Emas Bali dengan kembang goyang melengkung) -->
                <g filter="url(#shadow-${id})">
                    <!-- Struktur Mahkota Emas Utama -->
                    <path d="M85,50 C82,20 100,8 100,8 C100,8 118,20 115,50 Z" fill="url(#gold-${id})" />
                    <!-- Detail Ukiran Bertingkat -->
                    <path d="M88,42 C88,26 96,18 100,12 C104,18 112,26 112,42 Z" fill="${primary}" />
                    <!-- Tangkai Kembang Goyang Mengembang Luwes -->
                    <path d="M82,34 Q70,22 68,26" fill="none" stroke="url(#gold-${id})" stroke-width="1.5" />
                    <path d="M80,24 Q68,12 64,18" fill="none" stroke="url(#gold-${id})" stroke-width="1.5" />
                    <path d="M118,34 Q130,22 132,26" fill="none" stroke="url(#gold-${id})" stroke-width="1.5" />
                    <path d="M120,24 Q132,12 136,18" fill="none" stroke="url(#gold-${id})" stroke-width="1.5" />
                    <!-- Bunga Melati Emas bulat di ujung tangkai -->
                    <circle cx="68" cy="26" r="3.5" fill="#FFFF33" />
                    <circle cx="64" cy="18" r="3.5" fill="#FFFF33" />
                    <circle cx="132" cy="26" r="3.5" fill="#FFFF33" />
                    <circle cx="136" cy="18" r="3.5" fill="#FFFF33" />
                    <!-- Puncak Mahkota -->
                    <polygon points="100,2 103,8 97,8" fill="url(#gold-${id})" />
                </g>
            `;
            break;
            
        case 'ntt':
            svgCostumeContent = `
                <!-- Baju Adat Rote NTT -->
                <g filter="url(#shadow-${id})">
                    <!-- Kain Hitam Dasar -->
                    <path d="M64,98 Q54,135 64,185 Q100,192 136,185 Q146,135 136,98 Z" fill="#1C1B19" />
                    <!-- Selendang Tenun Ikat Rote Merah Geometris Menyilang -->
                    <path d="M63,102 C75,122 110,165 125,188 L114,192 C95,160 72,122 60,114 Z" fill="${primary}" />
                    <path d="M137,102 C125,122 90,165 75,188 L86,192 C105,160 128,122 140,114 Z" fill="${secondary}" />
                    <!-- Pola Tenun Ikat Geometris Putih Sederhana -->
                    <path d="M63,102 L125,188 M137,102 L75,188" stroke="#FFFFFF" stroke-dasharray="2,5" stroke-width="2" />
                    <path d="M60,114 L114,192 M140,114 L86,192" stroke="#FFFFFF" stroke-dasharray="1,4" stroke-width="1.5" />
                    <!-- Rumbai Benang Tenun di Ujung Selempang Bawah -->
                    <path d="M73,186 L71,196 M77,188 L75,198 M123,186 L125,196 M127,188 L129,198" stroke="#FFFFFF" stroke-width="1.5" />
                </g>
            `;
            svgHeadwear = `
                <!-- Ti'i Langga Rote daun lontar melengkung organik -->
                <g filter="url(#shadow-${id})">
                    <!-- Pinggiran Topi Melingkar Lebar -->
                    <ellipse cx="100" cy="50" rx="26" ry="6" fill="${secondary}" />
                    <ellipse cx="100" cy="50" rx="26" ry="6" fill="none" stroke="#6E501C" stroke-width="1" />
                    <!-- Kubah Tengah Topi -->
                    <path d="M82,48 C82,34 118,34 118,48 Z" fill="${primary}" />
                    <!-- Antena / Cula Tegak Melengkung Beruas -->
                    <path d="M100,40 L100,16 Q96,12 100,6 Q104,12 100,16 Z" fill="${secondary}" />
                    <line x1="97" y1="24" x2="103" y2="24" stroke="#6E501C" stroke-width="1.5" />
                    <line x1="96" y1="14" x2="104" y2="14" stroke="#6E501C" stroke-width="1.5" />
                </g>
            `;
            break;

        // --- KALIMANTAN ---
        case 'kalbar':
        case 'kalteng':
        case 'kalut':
            svgCostumeContent = `
                <!-- King Baba Dayak serat kayu -->
                <g filter="url(#shadow-${id})">
                    <!-- Rompi Serat Kayu Cokelat dengan Tepian Bergelombang -->
                    <path d="M65,95 Q55,135 65,185 Q100,192 135,185 Q145,135 135,95 L112,95 Q100,105 88,95 Z" fill="${primary}" />
                    <!-- Motif Wave/Luwes Ukiran Dayak Emas -->
                    <path d="M78,110 Q100,135 122,110 M76,140 Q100,165 124,140 M78,170 Q100,195 122,170" fill="none" stroke="url(#gold-${id})" stroke-width="2.5" stroke-linecap="round" />
                    <!-- Manik-Manik Merah/Putih di sepanjang jahitan tepi rompi -->
                    <path d="M65,95 Q55,135 65,185 M135,95 Q145,135 135,185" fill="none" stroke="#FFFFFF" stroke-dasharray="2,5" stroke-width="2" />
                    <!-- Mandau Dayak di Pinggang -->
                    <path d="M106,178 Q138,162 132,150 L126,155 Z" fill="#EAEAEA" stroke="#5C5C5C" stroke-width="1" />
                    <path d="M96,182 L108,176" stroke="#4A2E1B" stroke-width="6" stroke-linecap="round" /> <!-- Gagang Kayu Mandau -->
                    <path d="M65,95 Q55,135 65,185 Q100,192 135,185 Q145,135 135,95 L112,95 Q100,105 88,95 Z" fill="url(#shading-${id})" />
                </g>
            `;
            svgHeadwear = `
                <!-- Ikat Kepala Dayak Bulu Enggang Melengkung ditiup angin -->
                <g filter="url(#shadow-${id})">
                    <rect x="78" y="46" width="44" height="8" fill="url(#gold-${id})" rx="2" />
                    <path d="M78,46 L122,46" stroke="${primary}" stroke-width="1.5" />
                    <!-- Bulu Enggang Melengkung Organik Panjang -->
                    <path d="M96,46 C90,14 105,4 105,46 Z" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" />
                    <path d="M104,46 C110,14 95,4 95,46 Z" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" />
                    <!-- Bagian Hitam Bulu -->
                    <path d="M96,25 C92,16 102,12 104,20 Z" fill="#111111" />
                    <path d="M104,25 C108,16 98,12 96,20 Z" fill="#111111" />
                </g>
            `;
            break;
            
        case 'kalsel':
            svgCostumeContent = `
                <!-- Pengantin Banjar Bagajah Gamuling -->
                <g filter="url(#shadow-${id})">
                    <!-- Kemben Beludru Merah/Kuning Emas melingkar tubuh -->
                    <path d="M72,115 C65,135 70,175 75,192 C85,196 115,196 125,192 C130,175 135,135 128,115 Z" fill="${primary}" />
                    <path d="M72,115 C65,135 70,175 75,192 C85,196 115,196 125,192 C130,175 135,135 128,115 Z" fill="none" stroke="url(#gold-${id})" stroke-width="2" />
                    <!-- Untaian ronce bunga melati panjang menjuntai indah bermotif melingkar -->
                    <path d="M82,115 C88,145 80,165 85,190" fill="none" stroke="#FAFAFA" stroke-width="3" stroke-linecap="round" stroke-dasharray="1,5" />
                    <path d="M118,115 C112,145 120,165 115,190" fill="none" stroke="#FAFAFA" stroke-width="3" stroke-linecap="round" stroke-dasharray="1,5" />
                    <!-- Kalung emas bertumpuk -->
                    <path d="M86,115 C90,126 110,126 114,115" fill="none" stroke="url(#gold-${id})" stroke-width="3" />
                    <path d="M72,115 C65,135 70,175 75,192 C85,196 115,196 125,192 C130,175 135,135 128,115 Z" fill="url(#shading-${id})" />
                </g>
            `;
            svgHeadwear = `
                <!-- Mahkota Gajah Gemuling khas Banjar melengkung -->
                <g filter="url(#shadow-${id})">
                    <path d="M78,50 Q100,42 122,50 L118,38 Q100,32 82,38 Z" fill="url(#gold-${id})" />
                    <!-- Ornamen Ular Naga Emas melingkar atas -->
                    <path d="M90,38 Q100,20 110,38" fill="none" stroke="url(#gold-${id})" stroke-width="3" stroke-linecap="round" />
                    <circle cx="100" cy="22" r="3.5" fill="${primary}" />
                </g>
            `;
            break;

        // --- SULAWESI ---
        case 'sulsel':
            svgCostumeContent = `
                <!-- Baju Bodo Suku Bugis (Luwes & Transparan Lebar) -->
                <g filter="url(#shadow-${id})">
                    <!-- Baju Bodo Sutra Hijau/Pink Gelembung Lebar Transparan -->
                    <path d="M50,105 C46,128 54,152 70,165 C85,170 115,170 130,165 C146,152 154,128 150,105 C135,102 65,102 50,105 Z" fill="${primary}" fill-opacity="0.88" />
                    <!-- Kerah V melengkung -->
                    <path d="M86,105 C90,118 110,118 114,105 Z" fill="#FFFFFF" />
                    <path d="M86,105 C90,118 110,118 114,105" fill="none" stroke="url(#gold-${id})" stroke-width="2.5" />
                    <!-- Lipa Sabbe (Sarung Tenun Sutra Bugis Kotak-Kotak Cerah) -->
                    <path d="M70,165 C76,192 78,212 80,232 L120,232 C122,212 124,192 130,165 Z" fill="${accent}" />
                    <!-- Detail Garis Kotak Emas Sarung -->
                    <path d="M82,165 L92,232 M94,165 L102,232 M106,165 L112,232 M118,165 L122,232" stroke="url(#gold-${id})" stroke-width="1" stroke-opacity="0.5" />
                    <path d="M74,182 L126,182 M76,202 L124,202 M78,220 L122,220" stroke="url(#gold-${id})" stroke-width="1" stroke-opacity="0.5" />
                    <!-- Perhiasan Bando Gelang emas lengan lebar baju bodo -->
                    <circle cx="58" cy="138" r="4.5" fill="url(#gold-${id})" />
                    <circle cx="142" cy="138" r="4.5" fill="url(#gold-${id})" />
                    <!-- Shadow Overlay -->
                    <path d="M50,105 C46,128 54,152 70,165 C85,170 115,170 130,165 C146,152 154,128 150,105 Z" fill="url(#shading-${id})" />
                </g>
            `;
            svgHeadwear = `
                <!-- Simpolong Tattong (Sanggul khas Bugis melengkung berdiri) -->
                <g filter="url(#shadow-${id})">
                    <path d="M96,50 C94,30 118,30 116,50 Z" fill="#181818" />
                    <!-- Hiasan tusuk konde emas melengkung keluar -->
                    <path d="M112,42 Q128,34 130,38" fill="none" stroke="url(#gold-${id})" stroke-width="2.5" stroke-linecap="round" />
                    <circle cx="130" cy="38" r="3.5" fill="#FFFF33" />
                </g>
            `;
            break;
            
        case 'gorontalo':
            svgCostumeContent = `
                <!-- Bili'u Gorontalo -->
                <g filter="url(#shadow-${id})">
                    <!-- Baju Kurung Beludru Kuning/Ungu -->
                    <path d="M64,98 Q54,135 64,185 Q100,192 136,185 Q146,135 136,98 Z" fill="${primary}" />
                    <!-- Hiasan Dada Papan Emas Bertingkat Lebar melengkung -->
                    <path d="M76,108 C80,135 120,135 124,108 Z" fill="url(#gold-${id})" />
                    <!-- Baris Manik Ruby Merah di Hiasan Dada -->
                    <circle cx="100" cy="118" r="3" fill="${accent}" />
                    <circle cx="88" cy="114" r="2.5" fill="${accent}" />
                    <circle cx="112" cy="114" r="2.5" fill="${accent}" />
                    <!-- Lengan baju melengkung -->
                    <path d="M64,98 Q46,118 52,146" fill="none" stroke="${primary}" stroke-width="9" stroke-linecap="round" />
                    <path d="M136,98 Q154,118 148,146" fill="none" stroke="${primary}" stroke-width="9" stroke-linecap="round" />
                    <path d="M64,98 Q54,135 64,185 Q100,192 136,185 Q146,135 136,98 Z" fill="url(#shading-${id})" />
                </g>
            `;
            svgHeadwear = `
                <!-- Baya Lo Bubu & 7 Tangkai Kembang Emas Melengkung Fleksibel -->
                <g filter="url(#shadow-${id})">
                    <path d="M84,50 C82,42 118,42 116,50 Z" fill="#1A1A1A" />
                    <!-- Tangkai Kembang Goyang Emas melengkung simetris -->
                    <path d="M100,42 Q100,14 100,8" fill="none" stroke="url(#gold-${id})" stroke-width="2" />
                    <path d="M94,44 Q85,22 84,14" fill="none" stroke="url(#gold-${id})" stroke-width="1.5" />
                    <path d="M106,44 Q115,22 116,14" fill="none" stroke="url(#gold-${id})" stroke-width="1.5" />
                    <path d="M88,47 Q72,30 70,22" fill="none" stroke="url(#gold-${id})" stroke-width="1.5" />
                    <path d="M112,47 Q128,30 130,22" fill="none" stroke="url(#gold-${id})" stroke-width="1.5" />
                    <!-- Kuncup bunga melati emas diatas tangkai -->
                    <circle cx="100" cy="8" r="3.5" fill="url(#gold-${id})" />
                    <circle cx="84" cy="14" r="3" fill="url(#gold-${id})" />
                    <circle cx="116" cy="14" r="3" fill="url(#gold-${id})" />
                    <circle cx="70" cy="22" r="3" fill="url(#gold-${id})" />
                    <circle cx="130" cy="22" r="3" fill="url(#gold-${id})" />
                </g>
            `;
            break;

        // --- MALUKU ---
        case 'maluku':
            svgCostumeContent = `
                <!-- Baju Cele Kotak Kotak Merah & Selendang Brokat Renda -->
                <g filter="url(#shadow-${id})">
                    <!-- Baju Kotak Merah Cele -->
                    <path d="M64,98 Q54,135 64,185 Q100,192 136,185 Q146,135 136,98 Z" fill="${primary}" />
                    <!-- Detail Garis Kotak-Kotak Sederhana putih tipis -->
                    <path d="M64,98 Q54,135 64,185 Q100,192 136,185 Q146,135 136,98 Z" fill="none" stroke="#FFFFFF" stroke-width="1" stroke-dasharray="3,5" stroke-opacity="0.6" />
                    <!-- Kain Sarung Bawah melingkar -->
                    <path d="M72,185 C78,205 78,215 80,232 L120,232 C122,215 122,205 128,185 Z" fill="${accent}" />
                    <!-- Kain Sifon Putih Pikul Bahu/Pundak bergantungan luwes -->
                    <path d="M64,98 Q78,110 95,138 Q82,142 70,126 Z" fill="#FFFFFF" fill-opacity="0.88" />
                    <path d="M136,98 Q122,110 105,138 Q118,142 130,126 Z" fill="#FFFFFF" fill-opacity="0.88" />
                    <path d="M64,98 Q54,135 64,185 Q100,192 136,185 Q146,135 136,98 Z" fill="url(#shading-${id})" />
                </g>
            `;
            svgHeadwear = `
                <!-- Konde Melingkar Bulat Hiasan Kembang Perak -->
                <g filter="url(#shadow-${id})">
                    <circle cx="100" cy="46" r="11" fill="#1C1B19" />
                    <!-- Tusuk Konde Perak Melengkung Khas Cele -->
                    <path d="M88,42 Q100,32 112,42" fill="none" stroke="#DDDDDD" stroke-width="2" />
                    <circle cx="88" cy="42" r="2.5" fill="#FFFFFF" />
                    <circle cx="112" cy="42" r="2.5" fill="#FFFFFF" />
                </g>
            `;
            break;

        // --- PAPUA ---
        case 'papua':
        case 'papuabar':
        case 'papuapesisir':
        case 'papuatengah':
        case 'papuapegunungan':
        case 'papuaselatan':
            svgCostumeContent = `
                <!-- Pakaian Adat Rumbai Sagu Papua Organik -->
                <g filter="url(#shadow-${id})">
                    <!-- Tubuh Mannequin Cokelat Kulit Eksotis -->
                    <path d="M82,95 C78,112 85,138 88,145 C92,148 108,148 112,145 C115,138 122,112 118,95 Z" fill="#A0522D" />
                    <!-- Lukisan Garis Badan Adat Putih/Merah (Clay Pigment) -->
                    <path d="M92,105 Q100,110 108,105 M94,120 Q100,125 106,120 M96,135 Q100,138 104,135" fill="none" stroke="#FAFAFA" stroke-width="1.5" stroke-opacity="0.8" />
                    <!-- Kalung Gigi Taring Hewan menggantung -->
                    <path d="M88,100 C92,112 108,112 112,100" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" />
                    <!-- Rok Rumbai Jerami/Daun Sagu berlapis-lapis melengkung luwes -->
                    <!-- Lapisan Belakang rumbai -->
                    <path d="M72,142 C60,180 55,215 65,222 C80,225 120,225 135,222 C145,215 140,180 128,142 Z" fill="${primary}" />
                    <!-- Garis Rumbai Acak Melengkung Bergesekan -->
                    <path d="M72,142 Q58,180 66,220 M78,142 Q68,180 74,222 M84,142 Q78,180 82,223 M90,142 Q92,180 90,222 M96,142 Q105,180 102,223 M104,142 Q115,180 114,222 M112,142 Q125,180 122,222 M120,142 Q135,180 130,221" fill="none" stroke="#5C3A21" stroke-width="1.5" />
                    <path d="M75,145 Q62,185 70,221 M81,145 Q74,185 80,222 M93,145 Q90,185 94,223 M101,145 Q110,185 108,222 M117,145 Q130,185 126,221" fill="none" stroke="url(#gold-${id})" stroke-width="1" stroke-opacity="0.7" />
                </g>
            `;
            svgHeadwear = `
                <!-- Mahkota Bulu Burung Cenderawasih/Kasuari yang mengembang luwes -->
                <g filter="url(#shadow-${id})">
                    <!-- Ikat Kepala Anyaman Rotan -->
                    <path d="M80,51 Q100,45 120,51 L118,57 Q100,51 82,57 Z" fill="#6E4720" />
                    <path d="M80,51 Q100,45 120,51" fill="none" stroke="url(#gold-${id})" stroke-width="1.5" />
                    <!-- Bulu Burung Kasuari/Cenderawasih Berumbai Mengembang Anggun -->
                    <path d="M85,50 C75,14 90,10 92,50" fill="none" stroke="${secondary}" stroke-width="3" stroke-linecap="round" />
                    <path d="M92,50 C85,8 100,5 98,50" fill="none" stroke="#FFA500" stroke-width="4.5" stroke-linecap="round" />
                    <path d="M100,50 C108,5 115,10 106,50" fill="none" stroke="${secondary}" stroke-width="3.5" stroke-linecap="round" />
                    <path d="M107,50 C118,14 125,18 114,50" fill="none" stroke="#FFA500" stroke-width="2.5" stroke-linecap="round" />
                    <!-- Bulu Cenderawasih halus putih meliuk ditiup angin -->
                    <path d="M96,48 Q106,12 118,20" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="1,2" />
                    <path d="M104,48 Q94,12 82,20" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="1,2" />
                </g>
            `;
            break;

        default:
            // Standar Mannequin dengan Bayangan
            svgCostumeContent = `
                <g filter="url(#shadow-${id})">
                    <path d="M66,95 Q56,135 66,185 Q100,192 134,185 Q144,135 134,95 Z" fill="${primary}" />
                    <path d="M80,95 L100,120 L120,95 Z" fill="url(#gold-${id})" />
                    <circle cx="100" cy="145" r="14" fill="url(#gold-${id})" opacity="0.35" />
                    <path d="M66,95 Q56,135 66,185 Q100,192 134,185 Q144,135 134,95 Z" fill="url(#shading-${id})" />
                </g>
            `;
            svgHeadwear = `
                <g filter="url(#shadow-${id})">
                    <path d="M84,50 C82,42 118,42 116,50 Z" fill="url(#gold-${id})" />
                </g>
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
