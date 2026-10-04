/* ============================================================================
   PUJAPATH — Kolkata Durga Puja database
   ----------------------------------------------------------------------------
   Compiled from widely published public knowledge (newspaper Puja guides,
   club histories, public maps). Coordinates, visit durations, crowd levels
   and nearby services are APPROXIMATE and provided as clearly labelled demo
   data — always verify locally. Entries flagged  demo:true  are
   community-suggested listings with approximate details.
   ========================================================================== */

const DB = {

meta: {
  disclaimer: "Demo dataset — locations, timings and services are approximate. Verify locally before travelling.",
  updated: "Sharodiya 2026 edition"
},

/* Puja days 2026. Dates are indicative — confirm with the almanac. */
pujaDays: [
  { key: "pre",      label: "Pre-Puja (Kumartuli walks)", short: "Pre-Puja", date: "before 18 Oct 2026", crowd: 0.5 },
  { key: "panchami", label: "Panchami", short: "Panchami", date: "17 Oct 2026 (indicative)", crowd: 0.8 },
  { key: "shashthi", label: "Shashthi", short: "Shashthi", date: "18 Oct 2026 (indicative)", crowd: 0.95 },
  { key: "saptami",  label: "Saptami",  short: "Saptami",  date: "19 Oct 2026 (indicative)", crowd: 1.1 },
  { key: "ashtami",  label: "Ashtami",  short: "Ashtami",  date: "20 Oct 2026 (indicative)", crowd: 1.35 },
  { key: "navami",   label: "Navami",   short: "Navami",   date: "21 Oct 2026 (indicative)", crowd: 1.3 },
  { key: "dashami",  label: "Dashami (Bijoya)", short: "Dashami", date: "22 Oct 2026 (indicative)", crowd: 1.15 }
],

areas: [
  { key: "North",   label: "North Kolkata",   note: "Bonedi baris, Kumartuli, the old city" },
  { key: "Central", label: "Central Kolkata", note: "College Street, Esplanade, Entally" },
  { key: "South",   label: "South Kolkata",   note: "Ballygunge to Garia — the big barowari belt" },
  { key: "East",    label: "East Kolkata",    note: "Salt Lake, Lake Town, EM Bypass" },
  { key: "West",    label: "Behala side",     note: "Behala, Barisha, New Alipore" }
],

/* ------------------------------------------------------------------ */
/* PANDALS — the heart of the database.                                */
/* cat: major | local | community | heritage | hidden                  */
/* crowd: Very High | High | Moderate | Low   (typical evening)        */
/* pop: 1-10 public profile. dur: suggested visit minutes.             */
/* ------------------------------------------------------------------ */
pandals: [

/* ------------------------- NORTH KOLKATA ------------------------- */
{ i:"bagbazar", n:"Bagbazar Sarbojanin Durgotsav", cat:"major", area:"North", loc:"Bagbazar", lat:22.6045, lng:88.3668, dur:40, pop:9, crowd:"Very High", since:1919, tags:["traditional","ghat","classic"], d:"A centenarian barowari by the river — the classic Kolkata protima, sindoor-red aesthetics and the Bagbazar ghat adda beside it." },
{ i:"kumartuli-park", n:"Kumartuli Park Sarbojanin", cat:"major", area:"North", loc:"Kumartuli", lat:22.5990, lng:88.3618, dur:40, pop:9, crowd:"Very High", since:1995, tags:["idol-art","artisan"], d:"The idol-makers own puja in the heart of the artisan quarter — combine it with a walk through the Kumartuli workshops." },
{ i:"kumartuli-adi", n:"Adi Kumartuli Sarbojanin", cat:"local", area:"North", loc:"Kumartuli (Banamali Sarkar St)", lat:22.6008, lng:88.3585, dur:25, pop:6, crowd:"Moderate", tags:["idol-art","old"], d:"The old founding puja of the potters' quarter, older and quieter than its famous neighbour." },
{ i:"sovabazar-rajbari", n:"Sovabazar Rajbari Thakur Dalan", cat:"heritage", area:"North", loc:"Sovabazar (Raja Nabakrishna St)", lat:22.5965, lng:88.3662, dur:45, pop:8, crowd:"High", since:1757, tags:["bonedi","thakurdalan","history"], d:"Raja Nabakrishna Deb's 1757 puja — arguably the one that made Durga Puja a Calcutta spectacle. The thakur dalan and naach-ghar are unforgettable." },
{ i:"hatibagan-sarbojanin", n:"Hatibagan Sarbojanin", cat:"major", area:"North", loc:"Hatibagan", lat:22.5985, lng:88.3725, dur:35, pop:7, crowd:"High", tags:["theme","market"], d:"Big neighbourhood barowari at the Hatibagan crossing — great for pairing with market browsing." },
{ i:"hatibagan-nabin", n:"Hatibagan Nabin Pally", cat:"major", area:"North", loc:"Hatibagan", lat:22.5998, lng:88.3748, dur:40, pop:8, crowd:"Very High", tags:["theme"], d:"One of the north's big theme pulls — ambitious concepts, long evening queues." },
{ i:"nalin-sarkar", n:"Nalin Sarkar Street Sarbojanin", cat:"major", area:"North", loc:"Hatibagan (Nalin Sarkar St)", lat:22.6002, lng:88.3715, dur:35, pop:7, crowd:"High", tags:["theme","artisan"], d:"Craft-driven themes with beautiful detailing; a consistent award-list presence." },
{ i:"jagat-mukherjee", n:"Jagat Mukherjee Park Sarbojanin", cat:"major", area:"North", loc:"Sovabazar", lat:22.5988, lng:88.3662, dur:40, pop:8, crowd:"Very High", since:1936, tags:["theme"], d:"Sovabazar's giant — big ideas, big structures, big crowds. An anchor of the North Kolkata trail." },
{ i:"ahiritola", n:"Ahiritola Sarbojanin", cat:"major", area:"North", loc:"Ahiritola", lat:22.5952, lng:88.3568, dur:40, pop:8, crowd:"High", tags:["theme","riverside"], d:"River-side theme heavyweight on the western edge of the old city; pair with a strand walk." },
{ i:"simla-byayam", n:"Simla Byayam Samity", cat:"local", area:"North", loc:"Simla (Raja Dinendra St)", lat:22.5885, lng:88.3648, dur:30, pop:7, crowd:"Moderate", since:1926, tags:["traditional","ekchala"], d:"A wrestlers' club puja famous for its classic ekchala protima — old Kolkata grace without theme-park noise." },
{ i:"beniatola", n:"Beniatola Sarbojanin", cat:"local", area:"North", loc:"Beniatola Lane", lat:22.5912, lng:88.3602, dur:25, pop:6, crowd:"Moderate", tags:["neighbourhood"], d:"Lane puja off Central Avenue with a loyal para following — the kind of place regulars return to every year." },
{ i:"chorbagan", n:"Chorbagan Sarbojanin", cat:"local", area:"North", loc:"Chorbagan (Amherst St)", lat:22.5908, lng:88.3598, dur:30, pop:6, crowd:"Moderate", tags:["art","theme"], d:"Art-forward small barowari that punches far above its size; loved by pandal photographers." },
{ i:"chhatu-latu", n:"Chhatu Babu Latu Babu Thakurbari", cat:"heritage", area:"North", loc:"Beadon Square (Ramdulal Sarkar St)", lat:22.5922, lng:88.3650, dur:30, pop:6, crowd:"Low", since:1790, tags:["bonedi","thakurdalan"], d:"Ramdulal Niwas — the maritime-merchant family's courtyard puja, serene and candle-lit in the evenings.", demo:true },
{ i:"khelat-ghosh", n:"Khelat Ghosh Bari (Pathuriaghata)", cat:"heritage", area:"North", loc:"Pathuriaghata", lat:22.5875, lng:88.3582, dur:40, pop:7, crowd:"Moderate", since:1847, tags:["bonedi","thakurdalan","architecture"], d:"The Ghosh family's grand mansion with its towering thakur dalan — one of the great bonedi interiors of the city." },
{ i:"mallick-bari", n:"Mallick Bari, Pathuriaghata", cat:"heritage", area:"North", loc:"Pathuriaghata", lat:22.5858, lng:88.3570, dur:25, pop:5, crowd:"Low", since:1800, tags:["bonedi"], d:"Old Mallick family house puja; a quieter stop on the Pathuriaghata heritage lane.", demo:true },
{ i:"thanthania-dutta", n:"Thanthania Dutta Bari", cat:"heritage", area:"North", loc:"Thanthania (Bidhan Sarani)", lat:22.5848, lng:88.3628, dur:25, pop:5, crowd:"Low", since:1858, tags:["bonedi"], d:"The Dutta family's home puja on the old Cornwallis Street spine — intimate, traditional, easy to combine with College Street." },
{ i:"jorasanko-dawn", n:"Jorasanko Dawn Bari Puja", cat:"heritage", area:"North", loc:"Jorasanko", lat:22.5818, lng:88.3608, dur:25, pop:5, crowd:"Low", tags:["bonedi","hidden"], d:"A lesser-known aristocratic house puja a lane away from the Tagore museum — heritage without queues.", demo:true },
{ i:"hatkhola-goho", n:"Hatkhola Goho Barir Puja", cat:"hidden", area:"North", loc:"Hatkhola", lat:22.6038, lng:88.3658, dur:20, pop:4, crowd:"Low", tags:["bonedi","hidden"], d:"A nearly five-century-old family puja in the Hatkhola lanes — one of Kolkata's most quietly extraordinary darshans.", demo:true },
{ i:"fariapukur", n:"Fariapukur Sarbojanin", cat:"local", area:"North", loc:"Fariapukur (Shyambazar)", lat:22.6052, lng:88.3728, dur:20, pop:5, crowd:"Low", tags:["neighbourhood"], d:"Solid para barowari near Shyambazar — a good breather between the Hatibagan giants.", demo:true },

/* ------------------------- CENTRAL KOLKATA ------------------------ */
{ i:"college-square", n:"College Square Sarbojanin", cat:"major", area:"Central", loc:"College Street", lat:22.5762, lng:88.3638, dur:40, pop:9, crowd:"Very High", since:1948, tags:["lights","reflection","photo","lake"], d:"The mirror-lake puja — at night the lit pandal doubles itself in the water. Possibly the most photographed frame of Puja." },
{ i:"mohammad-ali-park", n:"Mohammad Ali Park Durga Puja", cat:"major", area:"Central", loc:"MG Road / Chittaranjan Ave", lat:22.5780, lng:88.3565, dur:45, pop:9, crowd:"Very High", tags:["theme","architecture","unity"], d:"Famous for monumental replica architecture and its long-standing message of communal harmony." },
{ i:"santosh-mitra", n:"Santosh Mitra Square (Lebutala)", cat:"major", area:"Central", loc:"Lebutala / Bow Street", lat:22.5722, lng:88.3625, dur:40, pop:8, crowd:"Very High", since:1936, tags:["theme"], d:"The old Lebutala Park puja — now one of the city's most-watched theme stages." },
{ i:"chaltabagan", n:"Manicktala Chaltabagan Lohapatty", cat:"major", area:"Central", loc:"Manicktala (Vivekananda Rd)", lat:22.5688, lng:88.3565, dur:35, pop:7, crowd:"High", since:1943, tags:["art","traditional"], d:"Elegant art direction and a beloved protima; a calmer major for the Central trail." },
{ i:"rani-rashmoni", n:"Rani Rashmoni Bari, Janbazar", cat:"heritage", area:"Central", loc:"Janbazar (Rani Rashmoni Rd)", lat:22.5637, lng:88.3588, dur:30, pop:6, crowd:"Moderate", since:1800, tags:["bonedi","history"], d:"The family seat of Rani Rashmoni of Dakshineswar fame — living history in the middle of the commercial city.", demo:true },
{ i:"bowbazar", n:"Bowbazar Sarbojanin", cat:"local", area:"Central", loc:"Bowbazar", lat:22.5680, lng:88.3632, dur:20, pop:5, crowd:"Moderate", tags:["neighbourhood"], d:"Bustling market-para puja; drop in while crossing between College Street and Entally.", demo:true },
{ i:"sealdah-sarbojanin", n:"Sealdah Sarbojanin Durgotsav", cat:"local", area:"Central", loc:"Sealdah", lat:22.5670, lng:88.3685, dur:20, pop:5, crowd:"Moderate", tags:["station-side"], d:"Handy if you are changing trains — a full-hearted para puja minutes from the platforms.", demo:true },
{ i:"entally", n:"Entally Sarbojanin", cat:"community", area:"Central", loc:"Entally", lat:22.5562, lng:88.3668, dur:20, pop:4, crowd:"Low", tags:["neighbourhood"], d:"Small community puja in the Entally lanes — the unglamorous, affectionate Kolkata the big guides skip.", demo:true },
{ i:"telengabagan", n:"Telengabagan Sarbojanin", cat:"major", area:"Central", loc:"Ultadanga", lat:22.5935, lng:88.3850, dur:35, pop:7, crowd:"High", tags:["theme"], d:"Ultadanga's theme heavyweight; pairs naturally with Kankurgachi and Phoolbagan on the east-of-north trail." },
{ i:"mitali-kankurgachi", n:"Mitali Sangha, Kankurgachi", cat:"major", area:"Central", loc:"Kankurgachi", lat:22.5790, lng:88.3915, dur:35, pop:7, crowd:"High", tags:["theme"], d:"One of the most decorated theme pujas of the last decade — the CIT Road corridor's centrepiece." },
{ i:"phoolbagan", n:"Phoolbagan Sarbojanin", cat:"local", area:"Central", loc:"Phoolbagan", lat:22.5715, lng:88.3860, dur:20, pop:5, crowd:"Moderate", tags:["neighbourhood"], d:"Busy crossing-side barowari — easy metro access via the Green Line.", demo:true },
{ i:"beliaghata-33", n:"Beliaghata 33 Pally Sarbojanin", cat:"major", area:"Central", loc:"Beliaghata", lat:22.5625, lng:88.3925, dur:35, pop:7, crowd:"High", tags:["theme"], d:"Ambitious themes on the EM Bypass edge; a strong first or last stop on a Bypass route.", demo:true },

/* --------------------------- EAST KOLKATA ------------------------- */
{ i:"sreebhumi", n:"Sreebhumi Sporting Club", cat:"major", area:"East", loc:"Lake Town", lat:22.6096, lng:88.4045, dur:50, pop:10, crowd:"Very High", since:1969, tags:["theme","record","mega"], d:"The Burj-Khalifa-and-beyond puja — the single biggest draw of East Kolkata. Go early or go patient." },
{ i:"laketown-adhibasi", n:"Lake Town Adhibasi Brinda", cat:"major", area:"East", loc:"Lake Town", lat:22.6058, lng:88.4048, dur:35, pop:7, crowd:"High", since:1962, tags:["theme","folk"], d:"Folk and indigenous-art themes with real craft depth — the thinking visitor's Lake Town stop.", demo:true },
{ i:"dumdumpark-bharat", n:"Dum Dum Park Bharat Chakra", cat:"major", area:"East", loc:"Dum Dum Park", lat:22.6170, lng:88.4012, dur:35, pop:7, crowd:"High", tags:["theme"], d:"Consistent award-season name; the Dum Dum Park cluster lets you see a lot on foot." },
{ i:"dumdumpark-tarun", n:"Dum Dum Park Tarun Sangha", cat:"major", area:"East", loc:"Dum Dum Park", lat:22.6185, lng:88.4025, dur:35, pop:7, crowd:"High", tags:["theme"], d:"Neighbour and friendly rival of Bharat Chakra — together they make the park a two-for-one evening.", demo:true },
{ i:"bangur", n:"Bangur Avenue Sarbojanin", cat:"local", area:"East", loc:"Bangur Avenue", lat:22.6128, lng:88.4152, dur:20, pop:5, crowd:"Moderate", tags:["neighbourhood"], d:"Friendly township barowari — a gentler add-on to a Lake Town circuit.", demo:true },
{ i:"saltlake-fd", n:"Salt Lake FD Block Sharod Utsav", cat:"major", area:"East", loc:"Salt Lake, FD Block", lat:22.5855, lng:88.4080, dur:40, pop:8, crowd:"High", since:1975, tags:["ground","community-big"], d:"The big-ground Salt Lake puja — fireworks of community energy, wide approach roads, easier with groups.", demo:true },
{ i:"saltlake-ak", n:"Salt Lake AK Block Sangha", cat:"local", area:"East", loc:"Salt Lake, AK Block", lat:22.5948, lng:88.4105, dur:25, pop:5, crowd:"Moderate", since:1962, tags:["neighbourhood"], d:"One of the township's oldest block pujas — tree-shaded, relaxed, very Salt Lake.", demo:true },
{ i:"saltlake-labony", n:"Labony Sharodotsav (BE Block East)", cat:"local", area:"East", loc:"Salt Lake, BE Block", lat:22.5780, lng:88.4075, dur:25, pop:5, crowd:"Moderate", since:1973, tags:["family","neighbourhood"], d:"A byword for the gentle family-style block puja; combine with a Salt Lake stadium-side stroll.", demo:true },

/* --------------------------- SOUTH KOLKATA ------------------------ */
{ i:"ballygunge-cultural", n:"Ballygunge Cultural Association", cat:"major", area:"South", loc:"Ballygunge Circular Road", lat:22.5262, lng:88.3662, dur:40, pop:9, crowd:"Very High", since:1951, tags:["traditional","protima"], d:"South Kolkata royalty — one of the most revered protimas in the city, inside a modest pandal that says: the goddess is the theme." },
{ i:"ekdalia", n:"Ekdalia Evergreen Club", cat:"major", area:"South", loc:"Ekdalia (Gariahat)", lat:22.5185, lng:88.3700, dur:40, pop:9, crowd:"Very High", since:1943, tags:["traditional","decor"], d:"Old-money elegance — famous lighting, classic protima, and decor that honours traditional pata-art." },
{ i:"singhi-park", n:"Singhi Park Sarbojanin", cat:"major", area:"South", loc:"Singhi Park (Rashbehari)", lat:22.5170, lng:88.3665, dur:40, pop:9, crowd:"Very High", since:1941, tags:["traditional","protima"], d:"An anchor of the Gariahat trail — the Singhi Park protima draws devotees who queue past midnight." },
{ i:"hindustan-park", n:"Hindustan Park Sarbojanin", cat:"major", area:"South", loc:"Hindustan Park (Gariahat)", lat:22.5210, lng:88.3622, dur:35, pop:7, crowd:"High", tags:["theme"], d:"The para park that went theme-bold without losing its neighbourhood soul." },
{ i:"deshapriya", n:"Deshapriya Park Durga Utsav", cat:"major", area:"South", loc:"Deshapriya Park", lat:22.5178, lng:88.3598, dur:35, pop:8, crowd:"High", tags:["ground","record"], d:"Once home to the world's tallest Durga — still the grand civic-ground puja of the Rashbehari belt." },
{ i:"tridhara", n:"Tridhara Sammilani", cat:"major", area:"South", loc:"Rashbehari (near Deshapriya Park)", lat:22.5153, lng:88.3613, dur:40, pop:8, crowd:"Very High", since:1947, tags:["traditional","art"], d:"Three paras, one puja — consistently among the finest blends of classical protima and serious art direction." },
{ i:"babubagan", n:"Babubagan Club, Dhakuria", cat:"major", area:"South", loc:"Dhakuria", lat:22.5082, lng:88.3648, dur:35, pop:7, crowd:"High", tags:["theme"], d:"Dhakuria's big theme stage, minutes from the lakes — good sunset-to-evening pairing." },
{ i:"selimpur", n:"Selimpur Pally Sarbojanin", cat:"major", area:"South", loc:"Selimpur", lat:22.5092, lng:88.3688, dur:35, pop:7, crowd:"High", tags:["theme"], d:"A theme leader of the deep-south Gariahat side; strong craft, strong queues." },
{ i:"jodhpur-95", n:"95 Pally Sarbojanin, Jodhpur Park", cat:"major", area:"South", loc:"Jodhpur Park", lat:22.5075, lng:88.3625, dur:35, pop:7, crowd:"High", tags:["theme"], d:"The Jodhpur Park star — big installations in a leafy, walkable grid." },
{ i:"jodhpur-park", n:"Jodhpur Park Sarbojanin", cat:"local", area:"South", loc:"Jodhpur Park", lat:22.5072, lng:88.3608, dur:25, pop:6, crowd:"Moderate", tags:["park-side","neighbourhood"], d:"The park's own gentler puja — do both Jodhpur stops on foot in under an hour.", demo:true },
{ i:"badamtala", n:"Badamtala Ashar Sangha", cat:"major", area:"South", loc:"Kalighat (Nepal Bhattacharjee St)", lat:22.5122, lng:88.3475, dur:35, pop:8, crowd:"High", since:1939, tags:["art","award"], d:"A tiny lane that produces museum-grade art every single year — many people's answer to the best puja in Kolkata." },
{ i:"pally-66", n:"66 Pally Sarbojanin", cat:"local", area:"South", loc:"Kalighat (Nepal Bhattacharjee St)", lat:22.5135, lng:88.3485, dur:30, pop:7, crowd:"Moderate", tags:["art","neighbourhood"], d:"Badamtala's beloved neighbour — artistic, warm, and walkable from Kalighat metro." },
{ i:"mudiali", n:"Mudiali Club", cat:"major", area:"South", loc:"Mudiali (Tollygunge)", lat:22.5088, lng:88.3525, dur:35, pop:8, crowd:"High", since:1935, tags:["traditional","heritage-ambience"], d:"Heritage-house atmosphere with an iconic protima — one of the oldest and most loved of the south." },
{ i:"samaj-sebi", n:"Samaj Sebi Sangha", cat:"major", area:"South", loc:"Lake Market / Mudiali", lat:22.5103, lng:88.3568, dur:35, pop:7, crowd:"High", since:1946, tags:["traditional"], d:"Grand yet devotional — the Lake Market side's pride, walkable from Mudiali and the lakes.", demo:true },
{ i:"chetla-agrani", n:"Chetla Agrani Club", cat:"major", area:"South", loc:"Chetla", lat:22.5158, lng:88.3368, dur:35, pop:8, crowd:"High", since:1959, tags:["theme"], d:"Chetla's giant — bold themes on the Alipore edge; the west-of-Kalighat trail starts here." },
{ i:"alipore-78", n:"Alipore 78 Pally Sarbojanin", cat:"local", area:"South", loc:"Alipore", lat:22.5305, lng:88.3345, dur:30, pop:6, crowd:"Moderate", since:1942, tags:["neighbourhood"], d:"Graceful old-Alipore barowari — quieter streets, big heart, near the zoo and Woodlands side.", demo:true },
{ i:"suruchi", n:"Suruchi Sangha, New Alipore", cat:"major", area:"South", loc:"New Alipore", lat:22.4965, lng:88.3318, dur:45, pop:9, crowd:"Very High", since:1952, tags:["theme","state-award"], d:"State-award magnet — the artistic conscience of New Alipore with themes that travel the news cycle." },
{ i:"barisha-club", n:"Barisha Club", cat:"major", area:"West", loc:"Barisha (Diamond Harbour Rd)", lat:22.4845, lng:88.3090, dur:35, pop:8, crowd:"High", since:1929, tags:["traditional"], d:"Behala's biggest — a proper old-school barowari with dhak, devotion and DH Road chaos.", demo:true },
{ i:"sabarna-bari", n:"Sabarna Roy Choudhury Barir Pujo", cat:"heritage", area:"West", loc:"Barisha", lat:22.4835, lng:88.3125, dur:40, pop:7, crowd:"Moderate", since:1610, tags:["bonedi","history","oldest"], d:"The family that once held the zamindari of Kolkata — their Aatchala Bari puja, running since 1610, may be Bengal's oldest family puja." },
{ i:"behala-natun-dal", n:"Behala Natun Dal", cat:"local", area:"West", loc:"Behala", lat:22.4945, lng:88.3105, dur:25, pop:6, crowd:"Moderate", tags:["theme","neighbourhood"], d:"Energetic Behala club puja — a natural pair with Barisha on a DH Road evening.", demo:true },
{ i:"naktala", n:"Naktala Udayan Sangha", cat:"major", area:"South", loc:"Naktala", lat:22.4822, lng:88.3680, dur:35, pop:8, crowd:"High", tags:["theme","award"], d:"Deep-south theme powerhouse — the Tollygunge–Garia corridor's must-see." },
{ i:"bosepukur-sitala", n:"Bosepukur Sitala Mandir, Kasba", cat:"major", area:"South", loc:"Kasba (Bosepukur)", lat:22.5025, lng:88.3840, dur:35, pop:8, crowd:"High", tags:["theme","folk-art"], d:"The most-awarded puja of the 2000s — folk and rural craft themes of astonishing detail." },
{ i:"bosepukur-talbagan", n:"Bosepukur Talbagan", cat:"local", area:"South", loc:"Kasba (Bosepukur)", lat:22.5012, lng:88.3855, dur:30, pop:6, crowd:"Moderate", tags:["theme","neighbourhood"], d:"Sitala Mandir's talented neighbour — the Bosepukur double is a south-east evening by itself." },
{ i:"rajdanga", n:"Rajdanga Naba Uday Sangha", cat:"major", area:"South", loc:"Rajdanga (Kasba)", lat:22.5135, lng:88.3895, dur:35, pop:7, crowd:"High", tags:["theme"], d:"Rajdanga's big stage near the Bypass connector — strong on innovation.", demo:true },
{ i:"trikon-park", n:"Santoshpur Trikon Park Sarbojanin", cat:"local", area:"South", loc:"Santoshpur", lat:22.4892, lng:88.3890, dur:20, pop:5, crowd:"Low", tags:["neighbourhood"], d:"Neighbourhood puja around the triangular park — adda, anjali queues and complete lack of pretension.", demo:true },
{ i:"lake-pally", n:"Santoshpur Lake Pally", cat:"local", area:"South", loc:"Santoshpur", lat:22.4905, lng:88.3918, dur:25, pop:6, crowd:"Moderate", tags:["neighbourhood","theme"], d:"Santoshpur's better-known name — creative themes with a community spine.", demo:true },
{ i:"survey-park", n:"Survey Park Sangha", cat:"local", area:"South", loc:"Survey Park (Santoshpur)", lat:22.4870, lng:88.3930, dur:25, pop:6, crowd:"Moderate", tags:["theme","neighbourhood"], d:"Consistently inventive mid-size puja on the Santoshpur–Bypass edge.", demo:true },
{ i:"narkelbagan", n:"Narkelbagan Sarbojanin, Garia", cat:"community", area:"South", loc:"Garia (NSC Bose Rd)", lat:22.4662, lng:88.3818, dur:20, pop:5, crowd:"Low", tags:["neighbourhood"], d:"Community-suggested listing: Garia-side para puja loved by its regulars. Details approximate — contribute corrections.", demo:true },
{ i:"briji", n:"Briji Sarbojanin, Garia", cat:"community", area:"South", loc:"Briji (Garia)", lat:22.4628, lng:88.3722, dur:20, pop:5, crowd:"Low", tags:["neighbourhood"], d:"Community-suggested listing: Briji crossing's local barowari. Details approximate — contribute corrections.", demo:true },
{ i:"patuli", n:"Patuli Sarbojanin (EM Bypass)", cat:"community", area:"South", loc:"Baishnabghata-Patuli", lat:22.4758, lng:88.3895, dur:20, pop:5, crowd:"Low", tags:["neighbourhood","township"], d:"Community-suggested listing: township puja on the Bypass edge. Details approximate — contribute corrections.", demo:true },
{ i:"maddox", n:"Maddox Square Durga Puja", cat:"local", area:"South", loc:"Ballygunge (Maddox Square)", lat:22.5220, lng:88.3548, dur:30, pop:7, crowd:"High", since:1935, tags:["hangout","adda","classic"], d:"The unofficial adda capital of Puja — half of South Kolkata spends at least one evening on this ground." },
{ i:"lake-kalibari", n:"Lake Kalibari (Southern Avenue)", cat:"local", area:"South", loc:"Southern Avenue", lat:22.5060, lng:88.3510, dur:30, pop:6, crowd:"Moderate", since:1949, tags:["serene","temple"], d:"Serene, devotional, tree-lined — the anti-theme-puja, beloved by the Southern Avenue paras.", demo:true },
{ i:"bhowanipore-75", n:"Bhowanipore 75 Palli", cat:"local", area:"South", loc:"Bhowanipore (Paddapukur)", lat:22.5362, lng:88.3490, dur:30, pop:6, crowd:"Moderate", since:1963, tags:["theme","traditional"], d:"An old Bhowanipore name that now mixes thoughtful themes with a classic protima.", demo:true },
{ i:"chakraberia", n:"Chakraberia Sarbojanin", cat:"community", area:"South", loc:"Chakraberia (Bhowanipore)", lat:22.5358, lng:88.3560, dur:20, pop:5, crowd:"Moderate", tags:["neighbourhood"], d:"Dense-para energy minutes from Elgin Road — proof you do not need a big budget for a big night.", demo:true },
{ i:"garcha-1st", n:"Garcha 1st Lane Sarbojanin", cat:"community", area:"South", loc:"Garcha (off Rashbehari)", lat:22.5145, lng:88.3578, dur:15, pop:4, crowd:"Low", tags:["lane","intimate"], d:"A tiny lane puja with outsized affection — the definition of the para celebration.", demo:true },
{ i:"vivekananda-park-ac", n:"Vivekananda Park Athletic Club", cat:"community", area:"South", loc:"Southern Avenue", lat:22.5050, lng:88.3502, dur:15, pop:4, crowd:"Low", tags:["sports-club","hangout"], d:"A sports club's modest puja beside the puchka rows of Vivekananda Park — the most Kolkata evening imaginable.", demo:true },
{ i:"azadgarh", n:"Azadgarh Sarbojanin, Regent Park", cat:"community", area:"South", loc:"Regent Park", lat:22.4792, lng:88.3552, dur:20, pop:4, crowd:"Low", tags:["neighbourhood"], d:"Community-suggested listing: Regent Park para puja near Tollygunge. Details approximate — contribute corrections.", demo:true }
],

/* ------------------------------------------------------------------ */
/* FOOD — restaurants, cabins, street rows, sweets.                    */
/* cu: cuisine tags used for matching requests.                        */
/* ------------------------------------------------------------------ */
food: [
{ n:"Arsalan", loc:"Park Circus", lat:22.5432, lng:88.3695, cu:["biryani","mughlai","kebab"], type:"restaurant", price:"₹₹", d:"The Park Circus biryani institution — expect a queue, accept it gladly." },
{ n:"Shiraz Golden Restaurant", loc:"Park Street end of Mallick Bazar", lat:22.5498, lng:88.3602, cu:["biryani","mughlai"], type:"restaurant", price:"₹₹", d:"Old-guard biryani house on the Park Circus–Park Street seam." },
{ n:"Aminia", loc:"Esplanade", lat:22.5602, lng:88.3528, cu:["biryani","mughlai"], type:"restaurant", price:"₹₹", since:1929, d:"Gentler, aromatic Kolkata biryani opposite New Market — fast enough for a pandal night." },
{ n:"Nizam's", loc:"New Market (behind)", lat:22.5595, lng:88.3508, cu:["rolls","kebab","biryani"], type:"restaurant", price:"₹₹", since:1932, d:"Birthplace-of-the-kathi-roll claimants; rolls to eat while walking." },
{ n:"Zeeshan", loc:"Park Circus", lat:22.5420, lng:88.3662, cu:["biryani","rolls","kebab"], type:"restaurant", price:"₹", d:"Late-night workhorse opposite Quest — rezala, rolls, biryani." },
{ n:"Royal Indian Hotel", loc:"Rabindra Sarani (Chitpur)", lat:22.5825, lng:88.3608, cu:["biryani","mughlai"], type:"restaurant", price:"₹₹", since:1905, d:"The century-old Chitpur biryani house — no potato purism debates, just history on a plate." },
{ n:"6 Ballygunge Place", loc:"Ballygunge", lat:22.5262, lng:88.3685, cu:["bengali","thali"], type:"restaurant", price:"₹₹₹", d:"Classic Bengali spread in a heritage house — book ahead on Puja days." },
{ n:"Bhojohori Manna", loc:"Gariahat", lat:22.5208, lng:88.3662, cu:["bengali"], type:"restaurant", price:"₹₹", d:"Home-style Bengali cooking; the Gariahat outlet sits inside the pandal belt." },
{ n:"Oh! Calcutta", loc:"Elgin", lat:22.5428, lng:88.3558, cu:["bengali"], type:"restaurant", price:"₹₹₹", d:"Polished Bengali classics — a comfortable sit-down for a family Puja dinner." },
{ n:"Kasturi", loc:"New Market (Mustaque Ahmed St)", lat:22.5610, lng:88.3520, cu:["bengali","dhakai"], type:"restaurant", price:"₹", d:"Dhakai Bengali hole-in-the-wall — kochu, chhana, bhetki; cash-era charm." },
{ n:"Balaram Mullick & Radharaman Mullick", loc:"Bhowanipore", lat:22.5382, lng:88.3505, cu:["sweets","mishti"], type:"sweets", price:"₹", since:1885, d:"Baked rosogolla and mishti doi — the dessert stop your parents already know." },
{ n:"Girish Chandra Dey & Nakur Chandra Nandy", loc:"Hedua", lat:22.5882, lng:88.3678, cu:["sweets","mishti"], type:"sweets", price:"₹", since:1844, d:"The sandesh standard since 1844 — pocket-sized shop, mountain-sized reputation." },
{ n:"Ganguram (Park Mansions)", loc:"Park Street", lat:22.5548, lng:88.3510, cu:["sweets","mishti"], type:"sweets", price:"₹", d:"Dependable mishti and savouries at the Park Street corner." },
{ n:"Mitra Cafe", loc:"Shobhabazar", lat:22.5968, lng:88.3682, cu:["cabin","cutlet","continental"], type:"cabin", price:"₹₹", since:1910, d:"Brain chop, kabiraji and diamond fish fry in the north's most famous cabin." },
{ n:"Allen Kitchen", loc:"Shobhabazar", lat:22.5945, lng:88.3698, cu:["cabin","cutlet"], type:"cabin", price:"₹", since:1890, d:"The prawn cutlet (chingrir chop) of legend; tiny, quick, essential." },
{ n:"Paramount", loc:"College Street", lat:22.5738, lng:88.3632, cu:["sherbet","cafe"], type:"cafe", price:"₹", since:1918, d:"Syrup sherbets in a time-capsule shop — daab sarbat between pandals." },
{ n:"Indian Coffee House", loc:"College Street", lat:22.5732, lng:88.3628, cu:["cafe","snacks"], type:"cafe", price:"₹", tags:["hangout"], d:"The adda cathedral — coffee, cutlets and conversation under the fans." },
{ n:"Putiram", loc:"College Street", lat:22.5742, lng:88.3638, cu:["bengali","breakfast","kochuri"], type:"cabin", price:"₹", d:"Morning kochuri-cholar dal institution; cash, queue, no regrets." },
{ n:"Favourite Cabin", loc:"Surya Sen Street", lat:22.5802, lng:88.3648, cu:["cafe","snacks","tea"], type:"cabin", price:"₹", d:"Freedom-fighter-era tea cabin — cheap, fast, full of stories." },
{ n:"Dacre's Lane (street row)", loc:"Esplanade", lat:22.5648, lng:88.3508, cu:["street","chinese","stew"], type:"street", price:"₹", d:"Office-para street food alley — Chitto Babur dokan stews to quick chowmein." },
{ n:"Vivekananda Park puchka row", loc:"Southern Avenue", lat:22.5055, lng:88.3505, cu:["street","puchka","chaat"], type:"street", price:"₹", tags:["hangout"], d:"The puchka pilgrimage — an evening here is itself a Puja ritual for many." },
{ n:"Kusum Rolls", loc:"Park Street", lat:22.5520, lng:88.3528, cu:["rolls"], type:"street", price:"₹", d:"Many locals' definitive kathi roll — eat on the pavement, like everyone." },
{ n:"Anadi Cabin", loc:"Jawaharlal Nehru Road", lat:22.5458, lng:88.3478, cu:["cabin","mughlai-parota"], type:"cabin", price:"₹", since:1925, d:"Mughlai parota with mutton — a century-old Exide-side ritual." },
{ n:"Tiretti morning market", loc:"Tiretti / Poddar Court", lat:22.5670, lng:88.3578, cu:["chinese","breakfast","street"], type:"street", price:"₹", d:"Old Chinatown breakfast — momos, sausages, soup dumplings. Mornings only." },
{ n:"Flurys", loc:"Park Street", lat:22.5535, lng:88.3515, cu:["cafe","continental","bakery"], type:"cafe", price:"₹₹₹", since:1927, d:"The tearoom of record — rum balls and window seats on Park Street." },
{ n:"Peter Cat", loc:"Park Street", lat:22.5530, lng:88.3518, cu:["continental","chelo-kebab"], type:"restaurant", price:"₹₹₹", d:"Chelo kebab under red lamps — a Puja-eve institution since 1975." },
{ n:"Trincas", loc:"Park Street", lat:22.5525, lng:88.3515, cu:["continental"], type:"restaurant", price:"₹₹₹", d:"Live-music-era survivor; a nostalgia dinner for the parents' generation." },
{ n:"Golbari", loc:"Shyambazar", lat:22.6012, lng:88.3722, cu:["dhaba","kosha-mangsho"], type:"dhaba", price:"₹", since:1920, d:"The round house of kosha mangsho — dark, spicy, non-negotiable.", demo:true },
{ n:"Balwant Singh Eating House", loc:"Bhowanipore (S.P. Mukherjee Rd)", lat:22.5402, lng:88.3520, cu:["dhaba","chai","doodh-cola"], type:"dhaba", price:"₹₹", d:"All-night chai and doodh-cola — the pandal-hopper's fuel station." },
{ n:"Azad Hind Dhaba", loc:"Ballygunge Circular Road", lat:22.5292, lng:88.3628, cu:["dhaba","north-indian"], type:"dhaba", price:"₹₹", d:"Butter-dal and tandoori rotis at highway-dhaba soul, city-centre location." },
{ n:"Jai Hind Dhaba", loc:"Ballygunge", lat:22.5308, lng:88.3638, cu:["chinese","dhaba"], type:"dhaba", price:"₹₹", d:"Late-night chilli chicken and fried rice after the Gariahat round." },
{ n:"Bedwin", loc:"Gariahat", lat:22.5205, lng:88.3668, cu:["biryani","mughlai"], type:"restaurant", price:"₹", d:"The south's beloved budget biryani — fast, filling, inside the pandal belt.", demo:true },
{ n:"Maharaja", loc:"Southern Avenue", lat:22.5098, lng:88.3508, cu:["bengali","breakfast","kochuri"], type:"cabin", price:"₹", d:"Morning kochuri and jilipi opposite the lake side — start a south trail here." },
{ n:"Govinda's (ISKCON)", loc:"Albert Road", lat:22.5230, lng:88.3575, cu:["veg","thali"], type:"restaurant", price:"₹₹", veg:true, d:"Peaceful vegetarian thali — a palate reset between heavy stops." },
{ n:"Blue Sky Cafe", loc:"Sudder Street", lat:22.5570, lng:88.3552, cu:["cafe","continental"], type:"cafe", price:"₹₹", d:"Backpacker-ghetto balcony cafe — pancakes at midnight if the night runs long." }
],

/* ------------------------------------------------------------------ */
/* TRANSIT                                                             */
/* ------------------------------------------------------------------ */
metro: [
{ n:"Shyambazar", lat:22.6012, lng:88.3735, line:"Blue" },
{ n:"Shobhabazar Sutanuti", lat:22.5958, lng:88.3698, line:"Blue" },
{ n:"Girish Park", lat:22.5872, lng:88.3668, line:"Blue" },
{ n:"Mahatma Gandhi Road", lat:22.5792, lng:88.3612, line:"Blue" },
{ n:"Central", lat:22.5728, lng:88.3598, line:"Blue" },
{ n:"Chandni Chowk", lat:22.5665, lng:88.3558, line:"Blue" },
{ n:"Esplanade", lat:22.5648, lng:88.3518, line:"Blue" },
{ n:"Park Street", lat:22.5545, lng:88.3515, line:"Blue" },
{ n:"Maidan", lat:22.5492, lng:88.3510, line:"Blue" },
{ n:"Rabindra Sadan", lat:22.5418, lng:88.3470, line:"Blue" },
{ n:"Netaji Bhavan", lat:22.5372, lng:88.3472, line:"Blue" },
{ n:"Jatin Das Park", lat:22.5300, lng:88.3458, line:"Blue" },
{ n:"Kalighat", lat:22.5185, lng:88.3458, line:"Blue" },
{ n:"Rabindra Sarobar", lat:22.5112, lng:88.3442, line:"Blue" },
{ n:"Mahanayak Uttam Kumar", lat:22.4968, lng:88.3448, line:"Blue" },
{ n:"Netaji", lat:22.4868, lng:88.3465, line:"Blue" },
{ n:"Masterda Surya Sen", lat:22.4830, lng:88.3535, line:"Blue" },
{ n:"Gitanjali (Naktala)", lat:22.4815, lng:88.3640, line:"Blue" },
{ n:"Kavi Nazrul (Garia)", lat:22.4715, lng:88.3732, line:"Blue" },
{ n:"Shahid Khudiram (Briji)", lat:22.4648, lng:88.3718, line:"Blue" },
{ n:"Kavi Subhash (New Garia)", lat:22.4705, lng:88.3872, line:"Blue" },
{ n:"Sealdah (Green)", lat:22.5668, lng:88.3718, line:"Green" },
{ n:"Phoolbagan (Green)", lat:22.5720, lng:88.3880, line:"Green" },
{ n:"Salt Lake Stadium (Green)", lat:22.5752, lng:88.4012, line:"Green" },
{ n:"Bengal Chemical (Green)", lat:22.5780, lng:88.4095, line:"Green" },
{ n:"City Center (Green)", lat:22.5865, lng:88.4170, line:"Green" },
{ n:"Central Park (Green)", lat:22.5902, lng:88.4218, line:"Green" },
{ n:"Karunamoyee (Green)", lat:22.5858, lng:88.4058, line:"Green" },
{ n:"Salt Lake Sector V (Green)", lat:22.5800, lng:88.4300, line:"Green" },
{ n:"Majerhat (Purple)", lat:22.5018, lng:88.3258, line:"Purple" },
{ n:"Behala Chowrasta (Purple)", lat:22.4952, lng:88.3140, line:"Purple" },
{ n:"Taratala (Purple)", lat:22.5120, lng:88.3185, line:"Purple" }
],

rail: [
{ n:"Howrah Junction", lat:22.5850, lng:88.3428, lines:["Howrah main"], major:true },
{ n:"Sealdah", lat:22.5678, lng:88.3705, lines:["Sealdah main","Sealdah south"], major:true },
{ n:"Kolkata (Chitpur) Terminal", lat:22.6012, lng:88.3842, lines:["Terminal"], major:true },
{ n:"Dum Dum Junction", lat:22.6205, lng:88.3798, lines:["Sealdah main","Chord"] },
{ n:"Bidhannagar Road", lat:22.5725, lng:88.3835, lines:["Chord"] },
{ n:"Ultadanga Road", lat:22.5885, lng:88.3892, lines:["Chord"] },
{ n:"Sir Gurudas Banerjee Halt (Beliaghata)", lat:22.5655, lng:88.3918, lines:["Chord"] },
{ n:"Park Circus", lat:22.5445, lng:88.3738, lines:["Sealdah south"] },
{ n:"Ballygunge Junction", lat:22.5295, lng:88.3725, lines:["Sealdah south"] },
{ n:"Dhakuria", lat:22.5105, lng:88.3658, lines:["Sealdah south"] },
{ n:"Jadavpur", lat:22.4985, lng:88.3728, lines:["Sealdah south"] },
{ n:"Baghajatin", lat:22.4842, lng:88.3758, lines:["Sealdah south"] },
{ n:"Garia", lat:22.4728, lng:88.3772, lines:["Sealdah south"] },
{ n:"Sonarpur Junction", lat:22.4408, lng:88.3898, lines:["Sealdah south"] },
{ n:"Lake Gardens", lat:22.5040, lng:88.3562, lines:["Sealdah south (Budge Budge)"] },
{ n:"Tollygunge", lat:22.5035, lng:88.3498, lines:["Sealdah south (Budge Budge)"] },
{ n:"New Alipore", lat:22.4915, lng:88.3365, lines:["Sealdah south (Budge Budge)"] },
{ n:"Majerhat", lat:22.5015, lng:88.3245, lines:["Sealdah south (Budge Budge)"] }
],

/* ------------------------------------------------------------------ */
/* SAFETY                                                              */
/* ------------------------------------------------------------------ */
hospitals: [
{ n:"Medical College Kolkata", lat:22.5722, lng:88.3605, type:"Govt" },
{ n:"NRS Medical College", lat:22.5658, lng:88.3715, type:"Govt" },
{ n:"R.G. Kar Medical College", lat:22.6042, lng:88.3775, type:"Govt" },
{ n:"SSKM / IPGMER Hospital", lat:22.5398, lng:88.3422, type:"Govt" },
{ n:"Calcutta National Medical College", lat:22.5468, lng:88.3718, type:"Govt" },
{ n:"Belle Vue Clinic", lat:22.5442, lng:88.3448, type:"Private" },
{ n:"AMRI Hospital, Dhakuria", lat:22.5110, lng:88.3618, type:"Private" },
{ n:"Peerless Hospital", lat:22.4802, lng:88.3938, type:"Private" },
{ n:"CMRI (Alipore)", lat:22.5278, lng:88.3295, type:"Private" },
{ n:"Woodlands Hospital (Alipore)", lat:22.5312, lng:88.3338, type:"Private" },
{ n:"B.M. Birla Heart Research", lat:22.5302, lng:88.3322, type:"Private" },
{ n:"Desun Hospital (EM Bypass)", lat:22.5145, lng:88.4012, type:"Private" },
{ n:"Medica Superspecialty (Mukundapur)", lat:22.4985, lng:88.4038, type:"Private" },
{ n:"KPC Medical College (Jadavpur)", lat:22.4998, lng:88.3778, type:"Private" },
{ n:"B.P. Poddar Hospital (New Alipore)", lat:22.4895, lng:88.3305, type:"Private" },
{ n:"ILS Hospital (Dum Dum)", lat:22.6235, lng:88.3795, type:"Private" }
],

police: [
{ n:"Kolkata Police HQ, Lalbazar", lat:22.5688, lng:88.3505 },
{ n:"Shyampukur PS", lat:22.6005, lng:88.3665 },
{ n:"Burtolla PS", lat:22.5905, lng:88.3645 },
{ n:"Amherst Street PS", lat:22.5808, lng:88.3665 },
{ n:"Bowbazar PS", lat:22.5680, lng:88.3598 },
{ n:"Muchipara PS", lat:22.5608, lng:88.3678 },
{ n:"Taltala PS", lat:22.5545, lng:88.3645 },
{ n:"Maniktala PS", lat:22.5885, lng:88.3765 },
{ n:"Phoolbagan PS", lat:22.5725, lng:88.3835 },
{ n:"Lake Town PS", lat:22.6065, lng:88.4025 },
{ n:"Bidhannagar (South) PS", lat:22.5815, lng:88.4125 },
{ n:"Bhowanipore PS", lat:22.5365, lng:88.3495 },
{ n:"Ballygunge PS", lat:22.5275, lng:88.3635 },
{ n:"Gariahat PS", lat:22.5198, lng:88.3645 },
{ n:"Lake PS", lat:22.5065, lng:88.3595 },
{ n:"Charu Market PS", lat:22.5015, lng:88.3545 },
{ n:"Tollygunge PS", lat:22.4995, lng:88.3465 },
{ n:"Jadavpur PS", lat:22.4975, lng:88.3705 },
{ n:"Kasba PS", lat:22.5065, lng:88.3815 },
{ n:"Netaji Nagar PS", lat:22.4785, lng:88.3635 },
{ n:"Garia PS", lat:22.4695, lng:88.3795 },
{ n:"Behala PS", lat:22.4925, lng:88.3115 },
{ n:"New Alipore PS", lat:22.4945, lng:88.3305 }
],

/* ------------------------------------------------------------------ */
/* MARKETS & ATTRACTIONS                                               */
/* ------------------------------------------------------------------ */
markets: [
{ n:"New Market (S.S. Hogg)", lat:22.5605, lng:88.3505, kind:"market", d:"The 1874 maze — bandhani, bakeries, and bargaining cardio." },
{ n:"Gariahat Market", lat:22.5200, lng:88.3665, kind:"market", d:"Sari-and-everything bazaar running along the pandal belt." },
{ n:"Hatibagan Market", lat:22.5980, lng:88.3720, kind:"market", d:"North Kolkata's petticoat-lane — star-marked sarees and adda." },
{ n:"College Street Boi Para", lat:22.5738, lng:88.3635, kind:"market", d:"The world's largest second-hand book market — buy a Puja annual." },
{ n:"Burrabazar", lat:22.5785, lng:88.3505, kind:"market", d:"Wholesale everything; enter with patience, exit with bargains." },
{ n:"Kumartuli idol quarter", lat:22.6000, lng:88.3605, kind:"attraction", d:"Walk the artisans' lanes where the goddesses are born." },
{ n:"Victoria Memorial", lat:22.5448, lng:88.3426, kind:"attraction", d:"The marble dome — most visitors cross it between pandal zones." },
{ n:"Maidan & Fort William edge", lat:22.5490, lng:88.3470, kind:"attraction", d:"The city's lungs; balloon-sellers and dusk breeze." },
{ n:"Prinsep Ghat", lat:22.5522, lng:88.3378, kind:"attraction", d:"River, bridge, columns — the golden-hour break of choice." },
{ n:"Millennium Park", lat:22.5730, lng:88.3445, kind:"attraction", d:"Riverfront promenade near Babughat." },
{ n:"Babughat", lat:22.5685, lng:88.3455, kind:"attraction", d:"Historic ghat; on Dashami the immersions pass here." },
{ n:"Bagbazar Ghat", lat:22.6045, lng:88.3625, kind:"attraction", d:"North Kolkata's great immersion ghat and riverside adda." },
{ n:"Rabindra Sarobar (the Lakes)", lat:22.5115, lng:88.3445, kind:"attraction", d:"Water, birdsong and joggers — the south's green pause." },
{ n:"Kalighat Temple", lat:22.5200, lng:88.3418, kind:"attraction", d:"One of the 51 Shakti Peethas — the neighbourhood takes its name from Her." },
{ n:"South City Mall", lat:22.5020, lng:88.3625, kind:"market", d:"Air-conditioned regroup point with food court and cabs." },
{ n:"Quest Mall", lat:22.5395, lng:88.3655, kind:"market", d:"Park Circus landmark mall — easy landmark for pickups." },
{ n:"Mani Square (EM Bypass)", lat:22.5795, lng:88.3985, kind:"market", d:"Bypass-side mall near the Salt Lake edge." },
{ n:"City Centre, Salt Lake", lat:22.5868, lng:88.4095, kind:"market", d:"The township's hangout square — kiosks, coffee, crowds." },
{ n:"Acropolis Mall (Kasba)", lat:22.5145, lng:88.3935, kind:"market", d:"Kasba landmark on the Bypass connector." },
{ n:"Lake Mall (Rashbehari)", lat:22.5115, lng:88.3455, kind:"market", d:"Kalighat-side mall near Rabindra Sarobar." }
],

/* ------------------------------------------------------------------ */
/* EVENTS & SEASONAL EXPERIENCES (indicative, seasonal patterns)       */
/* ------------------------------------------------------------------ */
events: [
{ n:"Kumartuli idol-makers walk", where:"Kumartuli", lat:22.6000, lng:88.3605, when:"Pre-Puja weeks", kind:"heritage", d:"Watch the kumors build the goddesses — straw frames to painted eyes. Go morning." },
{ n:"Mahalaya tarpan at the ghats", where:"Babughat / Bagbazar Ghat", lat:22.5685, lng:88.3455, when:"Mahalaya dawn", kind:"ritual", d:"Thousands gather at the river before sunrise to invite the goddess home." },
{ n:"Bonedi bari thakur darshan", where:"Sovabazar–Pathuriaghata belt", lat:22.5965, lng:88.3662, when:"Shashthi–Dashami afternoons", kind:"heritage", d:"A self-guided trail of aristocratic house pujas — afternoons are calmest." },
{ n:"Sandhi Puja", where:"Major pandals citywide", lat:22.5762, lng:88.3638, when:"Ashtami–Navami junction (night)", kind:"ritual", d:"The 108-lamp climax at the meeting of the two tithis — arrive early for space." },
{ n:"Dhunuchi naach evenings", where:"Community pandals citywide", lat:22.5135, lng:88.3485, when:"Ashtami & Navami nights", kind:"culture", d:"Incense-burner dancing to the dhak — best at para pujas where anyone may join." },
{ n:"Sindoor khela", where:"Bonedi baris & big barowaris", lat:22.5965, lng:88.3662, when:"Dashami afternoon", kind:"ritual", d:"Married women bid the goddess farewell in vermilion — Sovabazar Rajbari is iconic." },
{ n:"Bhashan processions", where:"Towards Babughat & Bagbazar Ghat", lat:22.6045, lng:88.3625, when:"Dashami evening", kind:"spectacle", d:"Trucks, drums and dancing as the idols travel to the river." }
],

/* ------------------------------------------------------------------ */
/* LANDMARKS — used as start / end points and NL anchors               */
/* ------------------------------------------------------------------ */
landmarks: [
{ n:"Howrah Station", aliases:["howrah","howrah station","howrah jn","haora"], lat:22.5850, lng:88.3428, kind:"station" },
{ n:"Sealdah Station", aliases:["sealdah","sealdah station"], lat:22.5678, lng:88.3705, kind:"station" },
{ n:"Kolkata Terminal (Chitpur)", aliases:["chitpur","kolkata terminal","koaa"], lat:22.6012, lng:88.3842, kind:"station" },
{ n:"Esplanade / Dharmatala", aliases:["esplanade","dharmatala","dharmatala","new market","tipu sultan"], lat:22.5645, lng:88.3515, kind:"hub" },
{ n:"Park Street", aliases:["park street","park st","mother teresa sarani"], lat:22.5540, lng:88.3515, kind:"hub" },
{ n:"Camac Street", aliases:["camac"], lat:22.5495, lng:88.3505, kind:"hub" },
{ n:"Salt Lake (Karunamoyee)", aliases:["salt lake","saltlake","karunamoyee","bidhannagar"], lat:22.5858, lng:88.4058, kind:"hub" },
{ n:"Sector V", aliases:["sector v","sector 5","salt lake sector v","technopolis"], lat:22.5800, lng:88.4300, kind:"hub" },
{ n:"New Town (Axis Mall)", aliases:["new town","rajarhat","axis mall"], lat:22.6150, lng:88.4630, kind:"hub" },
{ n:"Kolkata Airport (CCU)", aliases:["airport","dum dum airport","ccu","netaji subhas airport"], lat:22.6520, lng:88.4465, kind:"hub" },
{ n:"Garia More", aliases:["garia","garia more","garia crossing"], lat:22.4697, lng:88.3792, kind:"hub" },
{ n:"Kavi Nazrul Metro (Garia)", aliases:["kavi nazrul","garia metro"], lat:22.4715, lng:88.3732, kind:"station" },
{ n:"Tollygunge (Mahanayak Metro)", aliases:["tollygunge","mahanayak","tollygunge metro"], lat:22.4968, lng:88.3448, kind:"hub" },
{ n:"Jadavpur 8B", aliases:["jadavpur","8b","jadavpur university","8b bus stand"], lat:22.4985, lng:88.3710, kind:"hub" },
{ n:"Behala Chowrasta", aliases:["behala","behala chowrasta","behala crossing"], lat:22.4952, lng:88.3140, kind:"hub" },
{ n:"Barisha", aliases:["barisha","barisha club"], lat:22.4845, lng:88.3095, kind:"hub" },
{ n:"Shyambazar 5-Point", aliases:["shyambazar","shyam bazar","five point"], lat:22.6010, lng:88.3730, kind:"hub" },
{ n:"Dum Dum Station", aliases:["dum dum","dumdum","dum dum jn"], lat:22.6205, lng:88.3798, kind:"station" },
{ n:"Lake Town", aliases:["lake town","laketown"], lat:22.6058, lng:88.4035, kind:"hub" },
{ n:"Kalighat", aliases:["kalighat","kalighat metro","kalighat temple"], lat:22.5195, lng:88.3450, kind:"hub" },
{ n:"Gariahat Crossing", aliases:["gariahat","gariahat crossing","ballygunge phari","ballygunge","ballygunge phari crossing"], lat:22.5195, lng:88.3665, kind:"hub" },
{ n:"Dhakuria (Dakshinapan)", aliases:["dhakuria","dakshinapan"], lat:22.5100, lng:88.3650, kind:"hub" },
{ n:"New Alipore", aliases:["new alipore"], lat:22.4965, lng:88.3325, kind:"hub" },
{ n:"Alipore Zoo", aliases:["alipore","zoo","alipore zoo"], lat:22.5330, lng:88.3315, kind:"hub" },
{ n:"Kasba", aliases:["kasba","bosepukur"], lat:22.5050, lng:88.3840, kind:"hub" },
{ n:"Patuli (EM Bypass)", aliases:["patuli","baishnabghata"], lat:22.4755, lng:88.3890, kind:"hub" },
{ n:"Santoshpur", aliases:["santoshpur"], lat:22.4895, lng:88.3895, kind:"hub" },
{ n:"Kankurgachi", aliases:["kankurgachi","cit road"], lat:22.5790, lng:88.3905, kind:"hub" },
{ n:"Ultadanga", aliases:["ultadanga","ultadanga crossing"], lat:22.5925, lng:88.3845, kind:"hub" },
{ n:"Phoolbagan", aliases:["phoolbagan","phoolbagan kaku"], lat:22.5715, lng:88.3865, kind:"hub" },
{ n:"College Street (Coffee House)", aliases:["college street","coffee house","boi para","college sq","college square area"], lat:22.5735, lng:88.3630, kind:"hub" },
{ n:"Kumartuli", aliases:["kumartuli","kumortuli","kumor para","idol quarter"], lat:22.5998, lng:88.3608, kind:"hub" },
{ n:"Sovabazar", aliases:["sovabazar","sova bazar","shobhabazar","shobha bazar"], lat:22.5965, lng:88.3665, kind:"hub" },
{ n:"Hatibagan", aliases:["hatibagan","hati bagan"], lat:22.5985, lng:88.3725, kind:"hub" },
{ n:"Maniktala", aliases:["maniktala","manicktala"], lat:22.5880, lng:88.3770, kind:"hub" },
{ n:"Burrabazar (MG Road)", aliases:["burrabazar","bara bazar","barabazar","mg road","mahatma gandhi road"], lat:22.5790, lng:88.3565, kind:"hub" },
{ n:"Hazra Crossing", aliases:["hazra","hazra crossing"], lat:22.5310, lng:88.3470, kind:"hub" },
{ n:"Exide Crossing", aliases:["exide","exide crossing"], lat:22.5440, lng:88.3505, kind:"hub" },
{ n:"Rabindra Sadan", aliases:["rabindra sadan","nandan"], lat:22.5418, lng:88.3468, kind:"hub" },
{ n:"Southern Avenue (Vivekananda Park)", aliases:["southern avenue","vivekananda park"], lat:22.5055, lng:88.3505, kind:"hub" },
{ n:"Chetla", aliases:["chetla"], lat:22.5155, lng:88.3370, kind:"hub" },
{ n:"Rashbehari Crossing", aliases:["rashbehari","rasbehari","rashbehari avenue"], lat:22.5145, lng:88.3445, kind:"hub" },
{ n:"Naktala", aliases:["naktala"], lat:22.4825, lng:88.3680, kind:"hub" },
{ n:"Baghajatin", aliases:["baghajatin"], lat:22.4845, lng:88.3755, kind:"hub" },
{ n:"Regent Park", aliases:["regent park"], lat:22.4800, lng:88.3560, kind:"hub" },
{ n:"Bagbazar", aliases:["bagbazar","baghbazar","bag bazar"], lat:22.6045, lng:88.3665, kind:"hub" },
{ n:"Sonarpur", aliases:["sonarpur"], lat:22.4410, lng:88.3898, kind:"station" },
{ n:"EM Bypass (Science City)", aliases:["science city","em bypass","bypass"], lat:22.5398, lng:88.3955, kind:"hub" },
{ n:"Chingrighata", aliases:["chingrighata"], lat:22.5680, lng:88.3985, kind:"hub" }
]

};

/* Convenience: everything with coordinates, for proximity searches. */
DB._geoIndex = null;
