/**
 * Database Baju Tradisional Nusantara (38 Provinsi di Indonesia)
 * Digunakan secara langsung di frontend tanpa perlu setup server database/CORS.
 */

const BAJU_DATA = [
  {
    id: "aceh",
    province: "Aceh",
    region: "Sumatera",
    clothingName: "Ulee Balang",
    description: "Baju adat Ulee Balang merupakan pakaian adat tradisional Aceh yang dahulunya hanya digunakan oleh keluarga raja dan ulama. Pakaian ini mencerminkan keagungan nilai-nilai Islam dan budaya Melayu yang melekat erat pada masyarakat Aceh.",
    philosophy: "Melambangkan kehormatan, keagungan, dan ketaatan terhadap syariat Islam. Warna hitam melambangkan kebesaran dan kewibawaan, sedangkan benang emas melambangkan kemakmuran.",
    components: [
      "Baju Meukasah (Baju atasan berkerah tinggi mirip kerah Tiongkok)",
      "Sileuweu (Celana panjang hitam lebar)",
      "Ija Lamgugap (Kain sarung sutra yang dililitkan di pinggang)",
      "Kopiah Meukeutop (Topi khas Aceh dengan motif sulaman tradisional)",
      "Siwah (Senjata tradisional sejenis belati)"
    ],
    occasions: "Upacara adat, pernikahan, dan acara kenegaraan resmi.",
    colorPalette: { primary: "#111111", secondary: "#D4AF37", accent: "#8B0000" },
    styleTag: "sumatera"
  },
  {
    id: "sumut",
    province: "Sumatera Utara",
    region: "Sumatera",
    clothingName: "Ulos & Bagasan Godang",
    description: "Pakaian adat Sumatera Utara diwakili oleh kain Ulos (khususnya suku Batak Toba) dan Bagasan Godang (suku Mandailing). Kain tenun Ulos memiliki peran sakral dalam setiap siklus kehidupan masyarakat Batak.",
    philosophy: "Kain Ulos melambangkan kehangatan, kasih sayang, dan restu (tumpak). Bagasan Godang melambangkan kemuliaan, perlindungan bagi masyarakat, dan keadilan pemimpin.",
    components: [
      "Kain Ulos (Ulos Ragidup atau Ulos Sadum yang diselempangkan)",
      "Bulang-bulang (Hiasan kepala untuk pria)",
      "Bulang (Hiasan kepala bertingkat warna emas untuk wanita)",
      "Baju Kurung / Jas Beludru hitam dengan sulaman emas",
      "Kain Sarung Songket"
    ],
    occasions: "Pernikahan adat, upacara kematian, pesta panen, dan ritual adat Batak.",
    colorPalette: { primary: "#2b2b2b", secondary: "#C5A059", accent: "#9e2a2b" },
    styleTag: "sumatera"
  },
  {
    id: "sumbar",
    province: "Sumatera Barat",
    region: "Sumatera",
    clothingName: "Baju Limpapeh Rumah Nan Gadang",
    description: "Pakaian adat Minangkabau yang dikenakan oleh wanita (Bundo Kanduang) yang melambangkan kebesaran dan peran penting seorang ibu sebagai tiang tengah dalam rumah tangga adat Minangkabau.",
    philosophy: "Limpapeh berarti tiang tengah bangunan Rumah Gadang, melambangkan bahwa perempuan adalah pilar utama pelestari adat, budaya, dan penerus garis keturunan dalam sistem kekerabatan matrilineal Minangkabau.",
    components: [
      "Tingkuluak Balapak (Hiasan kepala menyerupai tanduk kerbau atau atap Rumah Gadang)",
      "Baju Batabue (Baju kurung bertabur benang emas)",
      "Minsie (Hiasan pinggir baju berlapis emas lambang batasan hukum adat)",
      "Lambuak (Kain sarung tenun songket)",
      "Salempang (Selendang sutra/songket bahu)"
    ],
    occasions: "Upacara adat pernikahan, pelantikan penghulu, dan festival budaya Minang.",
    colorPalette: { primary: "#A30000", secondary: "#D4AF37", accent: "#006400" },
    styleTag: "sumatera"
  },
  {
    id: "riau",
    province: "Riau",
    region: "Sumatera",
    clothingName: "Kebaya Labuh & Baju Kurung Melayu",
    description: "Pakaian tradisional masyarakat Melayu Riau. Untuk pria menggunakan Baju Kurung Cekak Musang, sedangkan untuk wanita mengenakan Kebaya Labuh panjang hingga menutupi lutut.",
    philosophy: "Mencerminkan nilai kesopanan, kesederhanaan, dan ketaatan beragama. Kebaya Labuh yang longgar melambangkan penjagaan kehormatan diri wanita Melayu.",
    components: [
      "Kebaya Labuh (Baju kurung longgar panjang hingga bawah lutut)",
      "Kain Samping (Kain songket pendek yang dililitkan di pinggang pria)",
      "Tanjak / Songkok (Penutup kepala pria dari bahan kain songket)",
      "Selendang tipis penutup dada bagi wanita"
    ],
    occasions: "Pernikahan adat Melayu, acara keagamaan Islam, dan hari jadi provinsi.",
    colorPalette: { primary: "#FFD700", secondary: "#008080", accent: "#FF4500" },
    styleTag: "sumatera"
  },
  {
    id: "kepri",
    province: "Kepulauan Riau",
    region: "Sumatera",
    clothingName: "Kebaya Labuh & Baju Kurung Teluk Belanga",
    description: "Pakaian adat Kepulauan Riau yang sangat dipengaruhi oleh sejarah Kesultanan Riau-Lingga. Karakteristik utamanya adalah kerah bulat tanpa lipatan dengan kancing tunggal untuk pria (Teluk Belanga).",
    philosophy: "Melambangkan kepatuhan, kehalusan budi pekerti masyarakat pesisir, serta kearifan lokal Melayu yang terbuka namun tetap memegang teguh adat istiadat.",
    components: [
      "Baju Kurung Teluk Belanga (Pria)",
      "Kebaya Labuh berbahan sutra atau brokat (Wanita)",
      "Kain Sarung Pelekat atau Songket khas Kepri",
      "Peci hitam atau Tanjak"
    ],
    occasions: "Upacara resmi pemerintahan, perayaan hari besar Melayu, dan pernikahan.",
    colorPalette: { primary: "#20B2AA", secondary: "#E6A100", accent: "#FFFFFF" },
    styleTag: "sumatera"
  },
  {
    id: "jambi",
    province: "Jambi",
    region: "Sumatera",
    clothingName: "Baju Kurung Tanggung",
    description: "Pakaian adat Jambi disebut 'Tanggung' karena panjang lengannya yang hanya berkisar tiga perempat lengan, melambangkan kepraktisan dalam bekerja namun tetap menjaga kesopanan adat Melayu Jambi.",
    philosophy: "Melambangkan kelincahan, ketangkasan bekerja, serta ketundukan pada adat istiadat setempat yang berbunyi 'Adat bersendi Syarak, Syarak bersendi Kitabullah'.",
    components: [
      "Baju Kurung Tanggung berlapis beludru merah dengan sulaman emas",
      "Lacak (Hiasan kepala pria berbentuk tegak dari kain beludru bergambar flora)",
      "Tengkuluk (Hiasan kepala wanita berupa lilitan selendang)",
      "Kain Songket motif Bungo Melati atau Pucuk Rebung",
      "Sabuk emas dan selempang"
    ],
    occasions: "Pernikahan, pertunjukan seni tari tradisional Jambi, dan menyambut tamu agung.",
    colorPalette: { primary: "#B22222", secondary: "#DAA520", accent: "#000000" },
    styleTag: "sumatera"
  },
  {
    id: "sumsel",
    province: "Sumatera Selatan",
    region: "Sumatera",
    clothingName: "Aesan Gede & Aesan Paksangko",
    description: "Aesan Gede adalah pakaian kebesaran adat Palembang yang terinspirasi dari kemegahan masa kejayaan Kerajaan Sriwijaya. Menampilkan nuansa emas berkilau dan perhiasan mewah bertumpuk.",
    philosophy: "Aesan berarti hiasan, Gede berarti besar atau megah. Melambangkan kemewahan, keagungan, kejayaan maritim, dan keanggunan laksana raja-raja Sriwijaya.",
    components: [
      "Kesuho (Mahkota emas dengan motif melati bertumpuk)",
      "Dodot Songket (Kain tenun songket benang emas motif nampan perak)",
      "Teratai (Hiasan dada berbentuk lingkaran berlekuk berlapis emas)",
      "Kaling Kebo Mungkur (Kalung berbentuk kerbau melambangkan kekuatan)",
      "Pending (Ikat pinggang emas ukuran besar)"
    ],
    occasions: "Upacara pernikahan adat Palembang (terutama saat resepsi/Munggah).",
    colorPalette: { primary: "#800020", secondary: "#FFD700", accent: "#E9967A" },
    styleTag: "sumatera"
  },
  {
    id: "babel",
    province: "Kepulauan Bangka Belitung",
    region: "Sumatera",
    clothingName: "Paksian",
    description: "Pakaian adat Bangka Belitung ini merupakan perpaduan harmonis antara kebudayaan Melayu lokal, budaya Tionghoa, dan pengaruh Arab. Ciri khasnya adalah mahkota Paksian emas pada wanita.",
    philosophy: "Melambangkan kerukunan, asimilasi budaya yang harmonis, dan kesucian. Warna merah tua mencerminkan keteguhan hati, sementara benang emas menyimbolkan kejayaan tambang timah.",
    components: [
      "Baju Kurung Paksian warna merah berbahan beludru atau sutra",
      "Mahkota Paksian bertatahkan manik-manik dan ornamen emas",
      "Kain Cual (Kain tenun ikat sutra khas Bangka Belitung)",
      "Sumping (Hiasan telinga bernuansa Tionghoa)"
    ],
    occasions: "Upacara adat pernikahan, perayaan hari besar daerah.",
    colorPalette: { primary: "#D2143A", secondary: "#D4AF37", accent: "#4682B4" },
    styleTag: "sumatera"
  },
  {
    id: "bengkulu",
    province: "Bengkulu",
    region: "Sumatera",
    clothingName: "Baju Adat Rejang Lebong",
    description: "Pakaian tradisional Bengkulu, khususnya suku Rejang, memiliki kemiripan dengan busana Melayu Sumatera lainnya namun memiliki hiasan kepala wanita bertingkat emas yang menyerupai mahkota kembang melur.",
    philosophy: "Melambangkan sifat kepahlawanan, kesucian, dan kearifan masyarakat dalam menjaga keseimbangan alam dan hukum adat.",
    components: [
      "Baju bertabur beludru merah atau hitam lengan panjang",
      "Detar (Penutup kepala pria dengan bentuk segitiga berdiri)",
      "Sunting bertingkat kembang emas untuk wanita",
      "Kain sarung Liko yang disulam benang emas emas"
    ],
    occasions: "Pernikahan adat, penyambutan tamu kehormatan, dan tari festival Tabot.",
    colorPalette: { primary: "#8B0000", secondary: "#C5A352", accent: "#000080" },
    styleTag: "sumatera"
  },
  {
    id: "lampung",
    province: "Lampung",
    region: "Sumatera",
    clothingName: "Tulang Bawang",
    description: "Baju adat Lampung dicirikan dengan dominasi kain tapis yang disulam dengan benang emas secara manual, serta pemakaian perhiasan kepala megah bernama Siger Lampung.",
    philosophy: "Siger Lampung dengan 9 lekukan (Siger Pepadun) atau 7 lekukan (Siger Saibatin) melambangkan jumlah sungai utama di Lampung sekaligus strata kepemimpinan adat yang dihormati.",
    components: [
      "Siger (Mahkota emas berbentuk tanduk bertatahkan ukiran bunga)",
      "Kain Tapis (Kain tenun khas Lampung bermotif garis emas)",
      "Keraparan (Selendang bahu tapis)",
      "Perhiasan dada berupa kalung papan jajar dan buah jukum"
    ],
    occasions: "Pernikahan, upacara adat Begawi (pemberian gelar adat Lampung).",
    colorPalette: { primary: "#FFFFFF", secondary: "#E5A93B", accent: "#000000" },
    styleTag: "sumatera"
  },
  {
    id: "jakarta",
    province: "DKI Jakarta",
    region: "Jawa",
    clothingName: "Kebaya Encim & Sadariah",
    description: "Pakaian tradisional khas Betawi. Kebaya Encim berpotongan meruncing di bagian depan dengan detail bordir halus bunga, mencerminkan pengaruh kuat kebudayaan Tionghoa (Peranakan) dan Eropa.",
    philosophy: "Kebaya Encim melambangkan keanggunan, keceriaan, dan kepraktisan wanita Betawi. Baju Sadariah melambangkan kesederhanaan, ketaatan beragama, dan kesopanan pria Betawi.",
    components: [
      "Kebaya Encim (Bahan katun/rubiah dengan bordir kerancang di ujungnya)",
      "Baju Sadariah (Koko putih polos berkerah shanghai bagi pria)",
      "Kain Batik Betawi motif Tumpal atau Loreng Pucuk Rebung",
      "Celana Batik komprang longgar",
      "Peci hitam dan sarung pelekat yang dikalungkan di leher"
    ],
    occasions: "Hari Ulang Tahun Jakarta, festival Abang None Jakarta, pernikahan adat.",
    colorPalette: { primary: "#FF1493", secondary: "#FFFFFF", accent: "#008000" },
    styleTag: "jawa"
  },
  {
    id: "jabar",
    province: "Jawa Barat",
    region: "Jawa",
    clothingName: "Kebaya Sunda & Bedahan",
    description: "Kebaya Sunda memiliki ciri khas kerah berbentuk V-neck yang memberikan kesan leher lebih jenjang, dipadukan dengan sanggul khas Sunda dan hiasan kepala mahkota Siger Sunda untuk pengantin.",
    philosophy: "Kebaya Sunda menggambarkan kelembutan, kesopanan, kesederhanaan, dan kecantikan alami wanita tanah Pasundan yang lekat dengan ungkapan 'Nyunda'.",
    components: [
      "Kebaya Sunda brokat halus",
      "Kain Kebat / Sinjang (Batik motif Lereng atau Merak Ngibing)",
      "Beskap (Baju resmi pria berkerah tegak tertutup)",
      "Bendo (Penutup kepala pria khas Sunda)",
      "Kelat Bahu dan Roncean Melati"
    ],
    occasions: "Pernikahan adat Sunda, wisuda, upacara mapag penganten.",
    colorPalette: { primary: "#F5F5DC", secondary: "#D4AF37", accent: "#556B2F" },
    styleTag: "jawa"
  },
  {
    id: "banten",
    province: "Banten",
    region: "Jawa",
    clothingName: "Baju Pangsi Banten",
    description: "Pakaian tradisional masyarakat Banten yang didominasi warna hitam polos longgar, mencerminkan kehidupan masyarakat Banten (dan suku Baduy) yang bersahaja, mandiri, dan tangguh.",
    philosophy: "Pangsi singkatan dari Pangeusi Nusi, artinya pengisi tubuh. Longgarnya celana melambangkan kebebasan bergerak, kekuatan fisik jawara, dan ketidakikatan pada hal keduniawian.",
    components: [
      "Baju Salontreng (Baju atasan hitam longgar berkancing batok kelapa)",
      "Celana Pangsi (Celana hitam gombrang selutut atau semata kaki)",
      "Iket Baduy / Lomar (Ikat kepala tenun khas biru-hitam)",
      "Golok Banten diselipkan di pinggang"
    ],
    occasions: "Latihan bela diri pencak silat, festival kebudayaan Banten, kegiatan harian suku Baduy.",
    colorPalette: { primary: "#000000", secondary: "#0000FF", accent: "#8B4513" },
    styleTag: "jawa"
  },
  {
    id: "jateng",
    province: "Jawa Tengah",
    region: "Jawa",
    clothingName: "Jawi Jangkep & Kebaya Jawa",
    description: "Jawi Jangkep adalah pakaian resmi pria Jawa Tengah berupa beskap motif bunga/polos, dipadu dengan kain jarik batik, blangkon, dan keris. Untuk wanita menggunakan Kebaya Beludru panjang hitam.",
    philosophy: "Setiap detail pakaian mengandung pralambang moral Jawa. Blangkon melambangkan pengendalian pikiran. Keris diletakkan di punggung melambangkan bahwa manusia harus menahan amarah dan nafsu buruknya.",
    components: [
      "Beskap Jawi Jangkep (Atasan pria beludru hitam atau bermotif)",
      "Kain Jarik Batik tulis (motif Sidomukti, Truntum, atau Parang)",
      "Blangkon (Topi khas Jawa dari bahan kain batik bermotif)",
      "Keris dengan sarung kayu berukir selutut",
      "Selop hitam (Alas kaki tradisional)"
    ],
    occasions: "Pernikahan tradisi Jawa, upacara adat kraton Surakarta/Yogyakarta.",
    colorPalette: { primary: "#1E1E1E", secondary: "#B8860B", accent: "#8B0000" },
    styleTag: "jawa"
  },
  {
    id: "diy",
    province: "DI Yogyakarta",
    region: "Jawa",
    clothingName: "Kebaya Kesatrian Ageng",
    description: "Busana kebesaran adat Keraton Yogyakarta yang dirancang oleh Sri Sultan Hamengkubuwono IX. Menampilkan perpaduan surjan sutra hitam bermotif benang emas dan keris kraton.",
    philosophy: "Kesatrian melambangkan jiwa ksatria yang gagah, bijaksana, bertata krama luhur, dan bertanggung jawab penuh atas kesejahteraan rakyat.",
    components: [
      "Surjan (Pakaian pria berkerah tegak dengan kancing melambangkan rukun Islam)",
      "Kain Batik motif khas Keraton (e.g. Parang Barong, Sido Asih)",
      "Blangkon gaya Yogyakarta (dengan tonjolan mondolan di bagian belakang)",
      "Keris gayaman gaya Yogyakarta",
      "Kamis / Sabuk emas lebar"
    ],
    occasions: "Upacara pernikahan adat Keraton Yogyakarta, resepsi kenegaraan istana.",
    colorPalette: { primary: "#0A0A0C", secondary: "#D4AF37", accent: "#4A0E17" },
    styleTag: "jawa"
  },
  {
    id: "jatim",
    province: "Jawa Timur",
    region: "Jawa",
    clothingName: "Pesa'an Madura",
    description: "Pakaian tradisional pria suku Madura berupa kaos garis-garis merah-putih horisontal yang dipadukan dengan baju dan celana hitam longgar, dilengkapi ikat pinggang kulit lebar dan senjata celurit.",
    philosophy: "Garis merah-putih melambangkan keberanian, ketegasan, kegagahan, dan sifat pekerja keras masyarakat Madura. Baju longgar menandakan kebebasan dan keterbukaan jiwa mereka.",
    components: [
      "Kaos bergaris merah dan putih mendatar",
      "Baju Pesa'an (Baju luar hitam polos tanpa kancing)",
      "Celana Gombrang (Celana panjang hitam longgar)",
      "Odheng (Ikat kepala berbahan batik bermotif tegas khas Madura)",
      "Sabuk Kulit Katemang lebar hitam/cokelat",
      "Celurit (Senjata tradisional khas Madura)"
    ],
    occasions: "Karapan Sapi, upacara adat Madura, pertunjukan seni bela diri, Hari Jadi Provinsi.",
    colorPalette: { primary: "#E63946", secondary: "#FFFFFF", accent: "#1D3557" },
    styleTag: "jawa"
  },
  {
    id: "bali",
    province: "Bali",
    region: "Bali & Nusa Tenggara",
    clothingName: "Payas Agung & Payas Madya",
    description: "Payas Agung adalah busana adat Bali berkasta tertinggi yang sangat mewah dan sakral. Menggunakan mahkota emas bertingkat tinggi bagi pria dan wanita, dilapisi wastra songket prada berlapis benang emas murni.",
    philosophy: "Melambangkan keagungan Sang Hyang Widhi dan status bangsawan. Hiasan mahkota emas menjulang ke atas menyimbolkan Gunung Agung yang suci sebagai tempat bersemayam para dewa.",
    components: [
      "Gelungan/Mahkota bertingkat emas bertatahkan kembang bergoyang",
      "Wastra Songket Prada (Kain tenun berserat emas bermotif suci Bali)",
      "Sabuk Serok (Kain lilitan pinggang panjang menyapu lantai)",
      "Badong (Hiasan melingkar di dada/bahu berlapis emas dan permata)",
      "Kancing emas pada telinga dan lengan"
    ],
    occasions: "Upacara Potong Gigi (Mepandes), pernikahan adat kastil Bali, upacara keagamaan besar.",
    colorPalette: { primary: "#D4AF37", secondary: "#800080", accent: "#FF8C00" },
    styleTag: "balint"
  },
  {
    id: "ntb",
    province: "Nusa Tenggara Barat",
    region: "Bali & Nusa Tenggara",
    clothingName: "Lambung & Rimpu Mbojo",
    description: "Baju adat Suku Sasak dinamakan Lambung (untuk wanita) berupa kebaya hitam kerah V tanpa lengan dengan hiasan emas. Sedangkan suku Mbojo di Bima mengenal pakaian tradisional 'Rimpu' yang menggunakan sarung tenun Tembe Nggoli laksana hijab.",
    philosophy: "Lambung melambangkan kesucian, kepatuhan, serta kelembutan wanita Sasak. Rimpu melambangkan penjagaan kehormatan wanita Muslim Bima sesuai nilai syariah Islam.",
    components: [
      "Baju Lambung (Atasan hitam kerah V berbahan beludru)",
      "Tembe Nggoli (Kain sarung tenun khas Bima bermotif kotak berwarna cerah)",
      "Sabuk Anteng (Kain tenun pengikat pinggang wanita Sasak)",
      "Keris / Sampari khas NTB diselipkan di pinggang pria"
    ],
    occasions: "Upacara penyambutan tamu (Gendang Beleq), pesta pernikahan adat Sasak/Samawa/Mbojo.",
    colorPalette: { primary: "#000000", secondary: "#BA55D3", accent: "#FF69B4" },
    styleTag: "balint"
  },
  {
    id: "ntt",
    province: "Nusa Tenggara Timur",
    region: "Bali & Nusa Tenggara",
    clothingName: "Pakaian Adat Rote & Amarasi",
    description: "Pakaian adat NTT terkenal dengan kain tenun ikat khasnya yang memiliki ragam motif geometris rumit di tiap pulau. Salah satu yang paling ikonik adalah baju adat pulau Rote dengan topi Ti'i Langga.",
    philosophy: "Ti'i Langga (topi anyaman daun lontar berbentuk antena) melambangkan jiwa kepemimpinan, kehormatan diri pria Rote, serta tekad yang kokoh bagaikan pohon kelapa di sabana NTT.",
    components: [
      "Ti'i Langga (Topi anyaman daun lontar khas pulau Rote)",
      "Kain Tenun Ikat Rote motif geometris alam liar",
      "Habas (Perhiasan kalung berbentuk bulan sabit emas atau perak)",
      "Selempang tenun menyilang bahu pria dan wanita"
    ],
    occasions: "Festival budaya NTT, upacara perkawinan adat, upacara penyambutan kenegaraan.",
    colorPalette: { primary: "#F4A460", secondary: "#000000", accent: "#FF4500" },
    styleTag: "balint"
  },
  {
    id: "kalbar",
    province: "Kalimantan Barat",
    region: "Kalimantan",
    clothingName: "King Baba & King Bibinge",
    description: "Pakaian adat Suku Dayak Kalimantan Barat. King Baba untuk pria dan King Bibinge untuk wanita. Terbuat dari serat kayu tanaman Ampuro yang dihiasi lukisan etnik khas Dayak dan bulu burung enggang.",
    philosophy: "Melambangkan kedekatan mutlak suku Dayak dengan alam semesta (hutan hujan Kalimantan). Bulu burung Enggang melambangkan kesucian, keagungan, dan perlindungan dari para leluhur.",
    components: [
      "Rompi serat kayu Ampuro tanpa lengan dengan hiasan lukisan manik-manik",
      "Cawat/Celana serat kayu",
      "Ikat kepala berhias bulu burung Enggang asli",
      "Mandau (Senjata tradisional khas Dayak)",
      "Perisai kayu (Talawang) berukiran naga atau totem pelindung"
    ],
    occasions: "Gawai Dayak (Pesta panen padi tahunan), ritual pernikahan adat Dayak.",
    colorPalette: { primary: "#8B4513", secondary: "#D4AF37", accent: "#FF0000" },
    styleTag: "kalimantan"
  },
  {
    id: "kalteng",
    province: "Kalimantan Tengah",
    region: "Kalimantan",
    clothingName: "Sangkarut",
    description: "Baju Sangkarut merupakan pakaian pelindung/perang tradisional Dayak Ngaju. Terbuat dari anyaman serat kulit kayu siren/nyamu yang keras dan dilapisi logam atau kerang keras untuk menahan serangan musuh.",
    philosophy: "Melambangkan keberanian, ketangguhan mental prajurit, perlindungan spiritual, dan kewaspadaan tinggi dalam menjalani kehidupan.",
    components: [
      "Baju Sangkarut (Rompi anyaman kulit kayu keras berlapis ornamen logam/kerang)",
      "Suku/Cawat kain penutup tubuh bagian bawah",
      "Ikat kepala berhias bulu burung Ruai/Enggang",
      "Kalung dari taring macan/babi hutan sebagai penolak bala"
    ],
    occasions: "Upacara adat kematian Tiwah, penyambutan tamu adat besar, tarian perang.",
    colorPalette: { primary: "#5C4033", secondary: "#E5A93B", accent: "#FFFFFF" },
    styleTag: "kalimantan"
  },
  {
    id: "kalsel",
    province: "Kalimantan Selatan",
    region: "Kalimantan",
    clothingName: "Bagajah Gamuling Baular Lulut",
    description: "Pakaian pengantin tradisional suku Banjar. Memiliki kemiripan estetika dengan budaya Jawa Kuno, ditandai dengan lilitan tubuh berupa kemben beludru tanpa baju atasan untuk pria, dipadu kalung melati melingkar leher.",
    philosophy: "Bagajah artinya gajah (simbol kekuatan agung), Baular Lulut artinya ular naga (simbol kesuburan dan kebijaksanaan air). Pakaian ini melambangkan harapan kebahagiaan abadi rumah tangga.",
    components: [
      "Mahkota emas melingkar kepala bermotif gajah dan ular naga",
      "Kemben beludru bersulam benang emas motif kembang melur",
      "Untaian ronce bunga melati yang menjuntai ke dada",
      "Kain sarung Sasirangan khas Banjar"
    ],
    occasions: "Upacara pernikahan agung adat Banjar.",
    colorPalette: { primary: "#FFD700", secondary: "#228B22", accent: "#DC143C" },
    styleTag: "kalimantan"
  },
  {
    id: "kaltim",
    province: "Kalimantan Timur",
    region: "Kalimantan",
    clothingName: "Baju Kustin",
    description: "Baju adat Kustin merupakan pakaian kebesaran Kesultanan Kutai Kartanegara. Terbuat dari beludru hitam lengan panjang dengan hiasan sulaman benang emas (pasmen) di kerah dan pergelangan tangan.",
    philosophy: "Kustin berasal dari kata 'Kostum' yang berarti pakaian resmi bangsawan. Melambangkan kedaulatan sultan, kejayaan kerajaan Kutai sebagai kerajaan Hindu tertua di Indonesia, dan kemakmuran wilayah.",
    components: [
      "Jas Kustin (Bahan beludru hitam pekat berlapis sulaman emas melingkar)",
      "Celana Kustin hitam panjang bagi pria",
      "Sanggul/Hiasan kepala Jipon emas bertingkat untuk wanita",
      "Sapu tangan sutra berenda emas"
    ],
    occasions: "Upacara penobatan Sultan Kutai, pesta adat Erau Kutai Kartanegara.",
    colorPalette: { primary: "#000000", secondary: "#D4AF37", accent: "#FFFFFF" },
    styleTag: "kalimantan"
  },
  {
    id: "kalut",
    province: "Kalimantan Utara",
    region: "Kalimantan",
    clothingName: "Ta'a & Sapei Sapaq",
    description: "Busana tradisional Kalimantan Utara diwakili oleh suku Dayak Kenyah. Ta'a adalah pakaian wanita berupa rompi berhias manik-manik indah, sedangkan Sapei Sapaq adalah rompi perang pria yang gagah.",
    philosophy: "Manik-manik yang dirangkai membentuk motif burung enggang dan harimau melambangkan kebesaran jiwa, keberanian bertarung, serta status sosial bangsawan dalam adat Dayak.",
    components: [
      "Baju Ta'a (Rompi beludru hitam bersulam manik-manik motif daun/burung)",
      "Uleng (Topi anyaman manik-manik panjang menjuntai indah)",
      "Sapei Sapaq (Rompi perang pria bermotif harimau)",
      "Gelang manik-manik perunggu tebal di lengan atas"
    ],
    occasions: "Festival seni budaya daerah Kaltara, upacara syukuran panen raya.",
    colorPalette: { primary: "#111111", secondary: "#DAA520", accent: "#FFFFFF" },
    styleTag: "kalimantan"
  },
  {
    id: "sulut",
    province: "Sulawesi Utara",
    region: "Sulawesi",
    clothingName: "Laku Tepu",
    description: "Baju adat suku Sangihe Talaud yang terbuat dari bahan serat tanaman pisang abaka (serat kofo) yang ditenun secara tradisional menjadi baju terusan panjang tertutup berwarna cerah.",
    philosophy: "Melambangkan kemandirian sandang masyarakat kepulauan Sangihe, kepolosan hati, ketaatan beragama, serta pertahanan diri dari pengaruh buruk luar.",
    components: [
      "Baju terusan longgar lengan panjang berbahan serat kofo",
      "Paporong (Ikat kepala berbentuk kerucut bersilang bagi pria)",
      "Kili-kili (Selendang tenun penutup bahu wanita)",
      "Kalung manik-manik batu mulia merah kuno"
    ],
    occasions: "Tulude (Upacara syukuran tahun baru adat Sangihe), pernikahan resmi.",
    colorPalette: { primary: "#FF8C00", secondary: "#FFFF00", accent: "#8B0000" },
    styleTag: "sulawesi"
  },
  {
    id: "sulbar",
    province: "Sulawesi Barat",
    region: "Sulawesi",
    clothingName: "Pattuqduq Towaine",
    description: "Pakaian adat wanita Mandar di Sulawesi Barat. Terdiri dari baju kurung beludru dipadu dengan kain sarung tenun sutra Mandar (Sa'be Mandar) yang dihiasi perhiasan koin emas kuno bertumpuk.",
    philosophy: "Melambangkan keanggunan, keteguhan prinsip wanita Mandar, kesopanan tinggi, serta kesiapan mental untuk membangun keluarga harmonis.",
    components: [
      "Baju Kurung Rawang Boko (Baju kurung tipis transparan bersulam emas)",
      "Sa'be Mandar (Kain sarung sutra Mandar bermotif garis tegas)",
      "Hiasan kepala berupa bando melingkar bertatahkan bunga emas",
      "Kalung rantai emas panjang bersilang dada"
    ],
    occasions: "Mengiringi tarian Sayyang Pattuqduq (kuda menari), upacara pernikahan adat Mandar.",
    colorPalette: { primary: "#EE82EE", secondary: "#FFD700", accent: "#000000" },
    styleTag: "sulawesi"
  },
  {
    id: "sulteng",
    province: "Sulawesi Tengah",
    region: "Sulawesi",
    clothingName: "Baju Nggembe & Koje",
    description: "Baju Nggembe adalah busana adat wanita suku Kaili. Berbentuk segi empat longgar berlengan pendek dengan kerah bulat hiasan payet melingkar. Untuk pria menggunakan baju Koje lengan panjang hitam.",
    philosophy: "Nggembe melambangkan kesederhanaan hidup masyarakat lembah Palu, keterbukaan hati dalam menerima pendatang, dan kecintaan pada adat damai.",
    components: [
      "Baju Nggembe (Atasan sutra longgar tanpa lekukan tubuh)",
      "Kain sarung Donggala (Kain tenun sutra khas Donggala bermotif bunga pajoki)",
      "Dali (Anting-anting panjang berumbai emas)",
      "Gemo (Kalung manik-manik bersusun)"
    ],
    occasions: "Upacara pesta panen (Vunja), festival kebudayaan Kaili, pernikahan.",
    colorPalette: { primary: "#4B0082", secondary: "#D4AF37", accent: "#FF00FF" },
    styleTag: "sulawesi"
  },
  {
    id: "sultra",
    province: "Sulawesi Tenggara",
    region: "Sulawesi",
    clothingName: "Babu Nggawi",
    description: "Babu Nggawi adalah pakaian adat suku Tolaki. Terdiri dari baju atasan beludru merah berkerah V berlengan panjang dengan hiasan renda emas melingkar di ujung lengan dan bahu.",
    philosophy: "Babu melambangkan pakaian, Nggawi melambangkan keindahan yang serasi. Menunjukkan kehalusan budi pekerti, kejujuran bersikap, dan kehormatan keluarga suku Tolaki.",
    components: [
      "Babu Nggawi (Baju beludru merah bersulam benang emas motif flora)",
      "Sawu (Kain sarung tenun Tolaki bermotif garis emas)",
      "Porehu (Mahkota emas kecil bermotif kembang melati)",
      "Kalung emas bermotif rantai bertumpuk"
    ],
    occasions: "Upacara pernikahan adat Tolaki, menyambut tamu kehormatan daerah Kendari.",
    colorPalette: { primary: "#D2143A", secondary: "#D4AF37", accent: "#000000" },
    styleTag: "sulawesi"
  },
  {
    id: "sulsel",
    province: "Sulawesi Selatan",
    region: "Sulawesi",
    clothingName: "Baju Bodo & Bella Dada",
    description: "Baju Bodo merupakan salah satu pakaian adat tertua di Nusantara yang berasal dari suku Bugis-Makassar. Berbentuk segi empat longgar berbahan kain kasa sutra transparan berlengan pendek menggelembung.",
    philosophy: "Warna Baju Bodo menunjukkan umur dan kasta sosial pemakainya (e.g., merah untuk remaja, hijau untuk bangsawan paruh baya, putih untuk ibu menyusui). Bentuk longgar melambangkan kebebasan jiwa perempuan Bugis.",
    components: [
      "Baju Bodo (Atasan transparan kain kasa sutra menggelembung)",
      "Lipa Sabbe (Kain sarung sutra Bugis bermotif kotak/tabolo cerah)",
      "Simpolong Tattong (Gaya sanggul berdiri tegak laksana mahkota)",
      "Bando emas bersusun dan anting-anting gelang besar (baju)",
      "Jas Bella Dada (Jas beludru pria berkerah tegak dengan kancing emas)"
    ],
    occasions: "Pernikahan adat Bugis/Makassar, mengiringi Tari Pakarena, festival budaya.",
    colorPalette: { primary: "#008000", secondary: "#FFD700", accent: "#FF1493" },
    styleTag: "sulawesi"
  },
  {
    id: "gorontalo",
    province: "Gorontalo",
    region: "Sulawesi",
    clothingName: "Bili'u & Makuta",
    description: "Bili'u adalah pakaian adat wanita Gorontalo yang bermakna 'yang diangkat'. Menampilkan hiasan dada berlapis logam mulia bertumpuk delapan yang melambangkan tanggung jawab seorang istri.",
    philosophy: "Bili'u melambangkan pengangkatan derajat wanita sebagai ratu dalam rumah tangga. Makuta (mahkota pria) melambangkan kewibawaan dan tanggung jawab suami sebagai pelindung keluarga.",
    components: [
      "Baju kurung tanpa kerah berbahan beludru (biasanya kuning/hijau/merah)",
      "Baya Lo Bubu (Hiasan kepala wanita berupa anyaman rambut dihiasi emas)",
      "Tuhi-tuhi (Tujuh tangkai kembang emas tegak di kepala)",
      "Alumbu (Selendang bahu kanan ke pinggang kiri)"
    ],
    occasions: "Upacara pernikahan tradisional Gorontalo (Mopotilolo).",
    colorPalette: { primary: "#FFCC00", secondary: "#006600", accent: "#990000" },
    styleTag: "sulawesi"
  },
  {
    id: "maluku",
    province: "Maluku",
    region: "Maluku",
    clothingName: "Baju Cele",
    description: "Baju Cele dicirikan oleh motif kotak-kotak merah-putih atau merah-biru kecil yang bertekstur tebal. Dikenakan bersama kain sarung tenun yang dilingkarkan di pinggang hingga mata kaki.",
    philosophy: "Baju Cele mencerminkan sifat ramah, keceriaan, dan keterbukaan masyarakat kepulauan Maluku. Warna merah melambangkan keberanian para pahlawan Maluku (seperti Pattimura).",
    components: [
      "Baju Cele (Atasan berpotongan sederhana motif kotak-kotak merah)",
      "Kain Pikul (Kain brokat putih tipis penutup pundak/dada)",
      "Kain sarung tenun bermotif alam pesisir Maluku",
      "Konde bertumpuk dihiasi kembang perak berbentuk burung/bunga"
    ],
    occasions: "Pesta adat rakyat Maluku (Pesta Rakyat Obor), upacara pernikahan adat.",
    colorPalette: { primary: "#DC143C", secondary: "#FFFFFF", accent: "#4169E1" },
    styleTag: "maluku"
  },
  {
    id: "malut",
    province: "Maluku Utara",
    region: "Maluku",
    clothingName: "Manteren Lamo & Kimun Gia",
    description: "Manteren Lamo adalah jubah kebesaran Sultan Ternate dan Tidore di Maluku Utara. Jubah beludru hitam panjang yang berhiaskan kancing emas murni dengan kerah tinggi berdiri tegak.",
    philosophy: "Melambangkan kedaulatan penuh sultan, sejarah kejayaan jalur rempah (cengkih dan pala) dunia, keagungan spiritual Islam, dan persatuan kepulauan Maluku Utara.",
    components: [
      "Jubah Manteren Lamo (Jubah beludru hitam panjang berkancing baris emas)",
      "Celana hitam panjang bersulam benang emas di sisinya",
      "Tanjak khusus sultan bersulam ornamen naga emas",
      "Kimun Gia (Pakaian kebaya sutra putih panjang bagi permaisuri)"
    ],
    occasions: "Penobatan Sultan, festival budaya Kesultanan Ternate/Tidore, kunjungan tamu negara.",
    colorPalette: { primary: "#1A1A24", secondary: "#E5A93B", accent: "#FFFFFF" },
    styleTag: "maluku"
  },
  {
    id: "papua",
    province: "Papua",
    region: "Papua",
    clothingName: "Koteka & Baju Yokal",
    description: "Pakaian adat Papua diwakili oleh Koteka (penutup kemaluan pria dari kulit labu air kering) untuk suku di pegunungan, dan Yokal (baju rumbai kulit kayu cokelat kemerahan) untuk wanita yang telah menikah.",
    philosophy: "Melambangkan kesederhanaan, keterikatan batin yang suci dengan alam raya Papua, kebebasan, dan perlindungan adat leluhur yang tak lekang oleh waktu.",
    components: [
      "Koteka (Pria - berbahan kulit buah labu air kering berbentuk kerucut)",
      "Yokal (Wanita - atasan anyaman serat kulit kayu rumbai kecokelatan)",
      "Hiasan kepala berbentuk mahkota berhias bulu burung Cenderawasih",
      "Lukisan badan bermotif flora/fauna purba dengan pewarna alami putih-merah"
    ],
    occasions: "Festival Lembah Baliem, upacara adat perdamaian suku, penyambutan tamu besar.",
    colorPalette: { primary: "#8B4513", secondary: "#FFFFFF", accent: "#FF8C00" },
    styleTag: "papua"
  },
  {
    id: "papuabar",
    province: "Papua Barat",
    region: "Papua",
    clothingName: "Baju Ewer",
    description: "Baju Ewer merupakan pakaian tradisional Papua Barat yang terbuat dari bahan serat tanaman jerami atau kulit kayu kering yang dianyam halus menjadi rumbai rok indah.",
    philosophy: "Melambangkan kedamaian pesisir Papua Barat, kearifan mengelola hasil bumi secara lestari, serta keindahan seni gerak tari suku pesisir.",
    components: [
      "Rok Ewer (Rok rumbai anyaman daun sagu/jerami kering)",
      "Baju atasan berbahan kain bludru hitam hiasan manik kerang (modern)",
      "Mahkota bulu burung kasuari atau cenderawasih",
      "Kalung dari anyaman taring babi hutan atau gigi hiu"
    ],
    occasions: "Tari penyambutan tamu (Tari Tumbu Tanah), festival pariwisata Raja Ampat.",
    colorPalette: { primary: "#D2B48C", secondary: "#000000", accent: "#FF4500" },
    styleTag: "papua"
  },
  {
    id: "papuapesisir",
    province: "Papua Barat Daya",
    region: "Papua",
    clothingName: "Baju Adat Suku Malamoi",
    description: "Pakaian adat khas suku Moi di Sorong, Papua Barat Daya. Menggunakan mahkota berhias paruh burung enggang Papua dan selempang kain tenun khas bermotif geometris.",
    philosophy: "Melambangkan identitas suku Moi sebagai penjaga hutan adat Malamoi, kearifan lokal dalam melestarikan burung langka, serta persaudaraan suku.",
    components: [
      "Topi Adat dengan paruh burung Enggang dan bulu cenderawasih",
      "Kain Tenun adat bermotif garis etnik merah-hitam",
      "Kalung manik-manik batu laut",
      "Gelang anyaman serat rotan halus di lengan bawah"
    ],
    occasions: "Upacara adat pernikahan suku Moi, penyambutan wisatawan Sorong.",
    colorPalette: { primary: "#7F1D1D", secondary: "#D4AF37", accent: "#FFFFFF" },
    styleTag: "papua"
  },
  {
    id: "papuatengah",
    province: "Papua Tengah",
    region: "Papua",
    clothingName: "Baju Adat Suku Kamoro",
    description: "Pakaian tradisional suku Kamoro di wilayah Mimika, Papua Tengah. Menggunakan anyaman rok rumbai dari rumput rawa pantai dan hiasan dada berupa lukisan pigmen tanah liat merah.",
    philosophy: "Melambangkan hubungan harmonis antara suku Kamoro dengan sungai, hutan sagu, dan laut selatan Papua. Menunjukkan ketangkasan nelayan adat.",
    components: [
      "Anyaman rok rumbai rumput laut kering",
      "Tifa (Alat musik kendang yang digenggam pria)",
      "Hiasan hidung (Otsur) dari tulang hewan laut",
      "Ikat lengan dari serat rotan dengan bulu ayam hutan"
    ],
    occasions: "Ritual adat pembuatan ukiran patung leluhur (Karapao), tari sambut tamu.",
    colorPalette: { primary: "#9E2A2B", secondary: "#E09F3E", accent: "#FFFFFF" },
    styleTag: "papua"
  },
  {
    id: "papuapegunungan",
    province: "Papua Pegunungan",
    region: "Papua",
    clothingName: "Baju Adat Suku Dani (Sali)",
    description: "Sali adalah pakaian wanita suku Dani di lembah Baliem yang belum menikah, terbuat dari rajutan serat kulit kayu pohon pilihan berwarna cokelat jerami alami.",
    philosophy: "Melambangkan kesucian gadis remaja suku Dani, kepatuhan didikan orang tua adat, serta identitas diri yang menyatu dengan dinginnya pegunungan Jayawijaya.",
    components: [
      "Sali (Rok terusan bertali bahu berbahan rajutan serat kulit kayu)",
      "Noken (Tas rajutan benang kayu yang digantungkan di kepala)",
      "Taring babi melengkung diselipkan di cuping hidung pria",
      "Ikat kepala manik-manik berhias jerami kering"
    ],
    occasions: "Upacara kedewasaan gadis Dani, Festival Kebudayaan Lembah Baliem.",
    colorPalette: { primary: "#8B5A2B", secondary: "#D2B48C", accent: "#8B0000" },
    styleTag: "papua"
  },
  {
    id: "papuaselatan",
    province: "Papua Selatan",
    region: "Papua",
    clothingName: "Baju Adat Suku Asmat",
    description: "Pakaian tradisional suku Asmat di Papua Selatan. Dicirikan dengan rumbai sagu tebal berlapis arang kayu hitam dan kapur putih di tubuh, dilengkapi tameng perisai ukir Asmat legendaris.",
    philosophy: "Mencerminkan penghormatan mendalam suku Asmat kepada arwah nenek moyang (Fumeripits). Setiap ukiran baju dan perisai menceritakan riwayat kepahlawanan leluhur.",
    components: [
      "Rok rumbai tebal dari daun sagu kering",
      "Perisai/Tameng kayu Asmat berukir motif wajah leluhur",
      "Ikat kepala anyaman sagu berhias bulu burung Kasuari",
      "Kalung gigi anjing liar melambangkan keberanian berburu"
    ],
    occasions: "Ritual adat perdamaian perang suku, pesta ulat sagu, upacara penghormatan patung Bisj.",
    colorPalette: { primary: "#2B1A0A", secondary: "#E0E0E0", accent: "#900C3F" },
    styleTag: "papua"
  }
];

// Ekspor data untuk Node.js jika diperlukan, atau buat tersedia secara global di browser.
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = BAJU_DATA;
}
