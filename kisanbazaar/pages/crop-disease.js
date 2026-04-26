// ── KisanBazaar Crop Disease Detector JS ──────────────────────────
// Disease database with symptom matching engine

const CDD_DB = {
    tomato: {
        symptoms: ['Yellow leaves', 'Brown or black spots', 'White powdery coating', 'Wilting plant', 'Curling leaves', 'Fruit rot', 'Dark lesions on stem', 'Mosaic pattern on leaves'],
        diseases: {
            'Early Blight': { match: ['Brown or black spots', 'Dark lesions on stem', 'Yellow leaves'], severity: 'Moderate', icon: '🍂', pathogen: 'Alternaria solani (Fungus)', desc: 'Fungal disease causing dark concentric spots on older leaves.', symptoms: ['Dark brown spots with yellow halos on lower leaves', 'Concentric ring (target-board) pattern', 'Stem lesions near soil level', 'Premature leaf drop'], risks: ['Spreads fast in warm humid weather 24–29°C', 'Overhead irrigation worsens spread', 'Can cause 50–80% yield loss if untreated'], treatment: [{ t: 'Remove Infected Leaves', d: 'Immediately remove and destroy all affected lower leaves. Do not compost.' }, { t: 'Apply Mancozeb Fungicide', d: 'Spray Mancozeb 75% WP @ 2g/litre every 7–10 days from bottom leaves upward.' }, { t: 'Improve Air Circulation', d: 'Prune inner branches and stake plants upright to reduce trapped humidity.' }, { t: 'Mulch the Soil', d: 'Apply 5–7cm straw mulch around base to prevent soil splash onto leaves.' }], prevention: ['Use resistant varieties like Pusa Ruby', 'Rotate crops every 2–3 years', 'Use drip irrigation instead of overhead watering', 'Apply copper fungicide before rainy season'], conf: 88 },
            'Late Blight': { match: ['Brown or black spots', 'Wilting plant', 'Fruit rot'], severity: 'High', icon: '⚠️', pathogen: 'Phytophthora infestans (Oomycete)', desc: 'Highly destructive disease causing rapid plant collapse in cool wet conditions.', symptoms: ['Water-soaked dark patches on leaves', 'White fuzzy mold on leaf undersides', 'Firm dark rot on fruit', 'Entire plant can collapse within days'], risks: ['Spreads extremely fast in cool 10–20°C wet weather', 'Airborne spores infect neighbor farms', 'Can destroy entire fields within 1 week'], treatment: [{ t: 'Emergency Isolation', d: 'Remove and burn severely infected plants immediately to prevent spread.' }, { t: 'Metalaxyl Fungicide', d: 'Apply Metalaxyl + Mancozeb (Ridomil Gold) @ 2.5g/litre every 5–7 days.' }, { t: 'Stop Overhead Irrigation', d: 'Switch completely to drip irrigation and improve field drainage.' }, { t: 'Border Spraying', d: 'Also spray neighboring healthy plants as a preventive measure.' }], prevention: ['Plant certified disease-free seeds', 'Avoid planting in poorly drained areas', 'Spray preventively before rain periods', 'Use resistant varieties like Arka Vikas'], conf: 84 },
            'Powdery Mildew': { match: ['White powdery coating', 'Curling leaves'], severity: 'Low', icon: '🌫️', pathogen: 'Leveillula taurica (Fungus)', desc: 'Fungal disease coating leaves with white powder, reducing photosynthesis.', symptoms: ['White powdery patches on upper leaf surface', 'Leaves curl upward', 'Yellowing of affected areas', 'Starts on older leaves first'], risks: ['Common in dry weather with humid nights', 'Reduces fruit quality and size', 'Spreads through wind'], treatment: [{ t: 'Sulfur Spray', d: 'Apply wettable sulfur @ 3g/litre water on both sides of leaves every 10 days.' }, { t: 'Neem Oil Treatment', d: 'Mix 5ml neem oil + 2ml liquid soap per litre water. Spray weekly.' }, { t: 'Remove Heavy Infections', d: 'Cut and dispose of badly infected leaves to reduce spore load.' }, { t: 'Potassium Bicarbonate', d: 'Spray 1% potassium bicarbonate solution to alter leaf pH against fungus.' }], prevention: ['Ensure good plant spacing for air circulation', 'Avoid excess nitrogen fertilizer', 'Water in morning so leaves dry before night', 'Use resistant tomato varieties'], conf: 79 },
            'Mosaic Virus': { match: ['Mosaic pattern on leaves', 'Curling leaves', 'Yellow leaves'], severity: 'Moderate', icon: '🦠', pathogen: 'Tomato Mosaic Virus (TMV)', desc: 'Viral disease spread by aphids causing mottled discoloration and stunted growth.', symptoms: ['Yellow-green mosaic/mottled pattern on leaves', 'Leaf curling and distortion', 'Stunted plant growth', 'Reduced and malformed fruits'], risks: ['No cure — management only', 'Spreads through aphids and contact', 'Can affect entire crop if aphids not controlled'], treatment: [{ t: 'Remove Infected Plants', d: 'Uproot and burn infected plants immediately. Wear gloves.' }, { t: 'Control Aphids', d: 'Spray Imidacloprid 17.8% SL @ 0.5ml/litre to kill aphid vectors.' }, { t: 'Mineral Oil Spray', d: 'Apply light mineral oil spray to reduce aphid feeding and virus transmission.' }, { t: 'Disinfect Tools', d: 'Soak pruning tools in 10% bleach solution between each plant.' }], prevention: ['Use virus-resistant/TMV-tolerant varieties', 'Control aphid population regularly', 'Use reflective mulches to repel aphids', 'Wash hands before handling plants'], conf: 75 }
        }
    },
    potato: {
        symptoms: ['Brown or black spots', 'Dark lesions on stem', 'Yellowing leaves', 'Wilting', 'White mold underneath leaves', 'Scab on tubers', 'Holes in leaves', 'Purple discoloration'],
        diseases: {
            'Late Blight': { match: ['Brown or black spots', 'Dark lesions on stem', 'Wilting', 'White mold underneath leaves'], severity: 'High', icon: '⚠️', pathogen: 'Phytophthora infestans (Oomycete)', desc: 'Most devastating potato disease, historically responsible for the Irish Famine.', symptoms: ['Dark water-soaked patches on leaves', 'White mold on undersides in humid conditions', 'Brown rot spreading through tubers', 'Stems turn black and collapse'], risks: ['Can destroy entire field in 7–10 days', 'Spreads via rain splash and wind', 'Cool wet weather accelerates spread dramatically'], treatment: [{ t: 'Destroy Infected Haulm', d: 'Cut and burn all infected foliage immediately. Harvest remaining tubers quickly.' }, { t: 'Metalaxyl Fungicide', d: 'Apply Metalaxyl + Mancozeb @ 2.5g/litre every 5 days during outbreak.' }, { t: 'Copper Oxychloride', d: 'Spray copper oxychloride 50% WP @ 3g/litre as protectant spray.' }, { t: 'Improve Drainage', d: 'Ensure proper field drainage and hill up mounds to protect tubers.' }], prevention: ['Plant certified seed potatoes', 'Use resistant varieties like Kufri Jyoti', 'Avoid excess nitrogen', 'Spray preventively before rainy season'], conf: 86 },
            'Early Blight': { match: ['Brown or black spots', 'Yellowing leaves'], severity: 'Moderate', icon: '🍂', pathogen: 'Alternaria solani (Fungus)', desc: 'Common fungal disease affecting older leaves with characteristic target-board spots.', symptoms: ['Dark brown concentric spots on lower leaves', 'Yellow halo around spots', 'Leaf drop from bottom upward', 'Tubers may show shallow dark lesions'], risks: ['Reduces tuber yield by 20–30%', 'Worsens in warm humid weather', 'Spreads through infected crop debris'], treatment: [{ t: 'Mancozeb Spray', d: 'Apply Mancozeb 75% WP @ 2g/litre every 10 days from first sign.' }, { t: 'Remove Infected Leaves', d: 'Pick and destroy infected lower leaves to reduce spread.' }, { t: 'Balanced Fertilization', d: 'Ensure adequate potassium — deficiency increases susceptibility.' }, { t: 'Chlorothalonil Application', d: 'Rotate with Chlorothalonil @ 2g/litre to prevent fungicide resistance.' }], prevention: ['Rotate crops with cereals for 2+ years', 'Use disease-free certified seed', 'Maintain potassium nutrition', 'Avoid overhead irrigation'], conf: 81 },
            'Common Scab': { match: ['Scab on tubers'], severity: 'Low', icon: '🥔', pathogen: 'Streptomyces scabies (Bacteria)', desc: 'Bacterial disease causing rough corky patches on potato skin.', symptoms: ['Rough scabby patches on tuber skin', 'Pitted or raised lesions on surface', 'Brown corky tissue underneath', 'Foliage looks completely normal'], risks: ['Primarily cosmetic — tubers still edible', 'Reduces market value significantly', 'Worsens in dry, alkaline soil conditions'], treatment: [{ t: 'Acidify Soil', d: 'Apply sulfur to lower soil pH below 5.2. Common scab is suppressed in acidic soil.' }, { t: 'Seed Treatment', d: 'Treat seed pieces with Thiram @ 2.5g/kg before planting.' }, { t: 'Consistent Irrigation', d: 'Maintain consistent soil moisture especially 2–6 weeks after tuber initiation.' }, { t: 'Remove Infected Tubers', d: 'Sort and discard heavily infected tubers at harvest. Do not use as seed.' }], prevention: ['Use scab-resistant varieties', 'Maintain soil moisture during tuber bulking', 'Avoid lime application near planting time', 'Rotate with non-host crops like cereals'], conf: 77 }
        }
    },
    wheat: {
        symptoms: ['Orange or rust colored pustules', 'Yellow stripes on leaves', 'White powdery coating', 'Lodging (plants falling over)', 'Brown spots on leaves', 'Black smut on grains', 'Yellowing', 'Stunted growth'],
        diseases: {
            'Yellow Rust': { match: ['Yellow stripes on leaves', 'Yellowing', 'Stunted growth'], severity: 'High', icon: '🟡', pathogen: 'Puccinia striiformis (Fungus)', desc: 'One of the most damaging wheat diseases worldwide causing characteristic yellow striped pustules.', symptoms: ['Bright yellow-orange stripes parallel to leaf veins', 'Powdery yellow pustules that rub off on fingers', 'Leaves turn yellow then brown and die', 'Severely infected plants become stunted'], risks: ['Can cause 70% yield loss in severe cases', 'Spreads rapidly in cool 10–15°C moist weather', 'Wind carries spores over hundreds of km'], treatment: [{ t: 'Propiconazole Fungicide', d: 'Apply Propiconazole 25% EC @ 0.1% immediately at first sign. Very effective.' }, { t: 'Tebuconazole Spray', d: 'Apply Tebuconazole 250 EW @ 1ml/litre as alternative or rotation fungicide.' }, { t: 'Early Sowing Adjustment', d: 'In affected areas, shift to early sowing dates to escape peak disease period.' }, { t: 'Alert Neighbors', d: 'Inform neighboring farmers — disease spreads fast across fields via wind.' }], prevention: ['Use resistant varieties like HD-2967, WH-711', 'Avoid late sowing in affected regions', 'Apply balanced NPK — avoid excess nitrogen', 'Monitor from tillering stage onward'], conf: 89 },
            'Stem Rust': { match: ['Orange or rust colored pustules', 'Lodging (plants falling over)'], severity: 'High', icon: '🟠', pathogen: 'Puccinia graminis (Fungus)', desc: 'Devastating disease causing brick-red pustules on stems that weaken and lodge plants.', symptoms: ['Brick-red to orange oval pustules on stems and leaves', 'Pustules rupture releasing red-brown spore powder', 'Stems weaken and plants lodge (fall over)', 'Grain shrivels severely affecting yield'], risks: ['Can cause 100% yield loss in severe epidemics', 'Thrives in warm 15–25°C moist weather', 'Ug99 race is of serious global concern'], treatment: [{ t: 'Emergency Fungicide', d: 'Apply Propiconazole or Trifloxystrobin + Tebuconazole immediately. Time is critical.' }, { t: 'Support Lodged Crops', d: 'Erect fallen stems if possible to prevent further grain loss.' }, { t: 'Early Harvest', d: 'If infection is severe, harvest early to save whatever grain has filled.' }, { t: 'Field Hygiene', d: 'Destroy volunteer wheat plants that harbor rust between seasons.' }], prevention: ['Plant rust-resistant varieties like PBW-343', 'Eliminate barberry bushes near fields (alternate host)', 'Early sowing to avoid late-season epidemic', 'Regular field scouting from jointing stage'], conf: 85 },
            'Powdery Mildew': { match: ['White powdery coating', 'Yellowing'], severity: 'Moderate', icon: '🌫️', pathogen: 'Blumeria graminis (Fungus)', desc: 'Fungal disease forming white powdery patches that reduce photosynthesis and grain filling.', symptoms: ['White-grey powdery patches on upper leaf surface', 'Yellowing of infected leaf tissue', 'Reduced flag leaf area', 'Florets may be infected reducing grain set'], risks: ['Yield loss up to 25% in severe cases', 'Thrives in cool humid weather', 'Dense crop canopy greatly favors spread'], treatment: [{ t: 'Propiconazole Spray', d: 'Apply Propiconazole 25% EC @ 0.1% at flag leaf stage and again at ear emergence.' }, { t: 'Sulfur Dusting', d: 'Apply wettable sulfur @ 25kg/ha as economical option in mild cases.' }, { t: 'Reduce Crop Density', d: 'Avoid excess seeding rate — dense canopies trap moisture and favor disease.' }, { t: 'Silicon Application', d: 'Foliar spray of silicon 2g/litre strengthens cell walls against fungal penetration.' }], prevention: ['Use mildew-resistant varieties', 'Avoid excess nitrogen fertilizer', 'Maintain optimal plant density', 'Early sowing reduces disease pressure'], conf: 78 }
        }
    },
    rice: {
        symptoms: ['Diamond shaped lesions on leaves', 'Brown leaf spots', 'Sheath discoloration', 'Yellow leaves', 'Dead tillers', 'Purple discoloration on leaves', 'Water-soaked patches', 'Narrow brown lesions on leaves'],
        diseases: {
            'Rice Blast': { match: ['Diamond shaped lesions on leaves', 'Dead tillers', 'Brown leaf spots'], severity: 'High', icon: '💥', pathogen: 'Magnaporthe oryzae (Fungus)', desc: 'Most important rice disease worldwide causing diamond-shaped lesions and neck rot.', symptoms: ['Diamond/spindle shaped lesions with gray center and brown border', 'Lesions on neck cause neck rot and empty panicles', 'Infected panicle neck turns brown and breaks', 'Dead tillers (deadheart) in vegetative stage'], risks: ['Can cause 70–80% yield loss in severe neck blast', 'Favored by cool nights, high nitrogen, water stress', 'Spreads rapidly via wind-carried spores'], treatment: [{ t: 'Tricyclazole Fungicide', d: 'Apply Tricyclazole 75% WP @ 0.6g/litre at first sign. Repeat after 10–12 days.' }, { t: 'Isoprothiolane', d: 'Spray Isoprothiolane 40% EC @ 1.5ml/litre — excellent for neck blast at booting stage.' }, { t: 'Reduce Nitrogen', d: 'Reduce nitrogen application immediately — high N dramatically increases blast severity.' }, { t: 'Water Management', d: 'Maintain 5cm standing water in field to reduce leaf wetness duration.' }], prevention: ['Use blast-resistant varieties like Swarna, IR-64', 'Split nitrogen doses — never apply all at once', 'Treat seeds with Carbendazim @ 2g/kg', 'Maintain proper plant spacing for air circulation'], conf: 87 },
            'Sheath Blight': { match: ['Sheath discoloration', 'Water-soaked patches', 'Yellow leaves'], severity: 'Moderate', icon: '🌾', pathogen: 'Rhizoctonia solani (Fungus)', desc: 'Common soil-borne disease causing oval lesions on leaf sheaths in irrigated rice.', symptoms: ['Oval or irregular greenish-gray lesions on leaf sheath', 'Lesions have brown margins and gray-white centers', 'Affected leaves dry out and die progressively', 'Disease progresses from lower to upper sheaths'], risks: ['Yield loss 20–50% in severe cases', 'Favored by high temperature 28–32°C and high humidity', 'Dense planting dramatically increases severity'], treatment: [{ t: 'Hexaconazole Spray', d: 'Apply Hexaconazole 5% EC @ 2ml/litre at tillering and panicle initiation stages.' }, { t: 'Validamycin', d: 'Spray Validamycin 3% L @ 2ml/litre — very effective against Rhizoctonia sheath blight.' }, { t: 'Reduce Plant Density', d: 'Reduce seed rate to avoid dense canopy. Remove weeds that increase field humidity.' }, { t: 'Avoid Excess Nitrogen', d: 'Split nitrogen application. Excess N increases lodging and disease severity.' }], prevention: ['Use tolerant varieties', 'Reduce seed rate for better plant spacing', 'Drain fields periodically to harden plants', 'Deep plough and incorporate crop residues after harvest'], conf: 82 },
            'Brown Spot': { match: ['Brown leaf spots', 'Narrow brown lesions on leaves', 'Yellow leaves'], severity: 'Moderate', icon: '🟤', pathogen: 'Bipolaris oryzae (Fungus)', desc: 'Fungal disease causing brown oval spots on leaves.', symptoms: ['Oval to circular brown spots with yellow halo on leaves', 'Spots may have gray center in severe cases', 'Seedlings can be killed in seed beds', 'Grain discoloration causing pecky rice'], risks: ['Severe in soils with nutrient deficiency especially K and Mg', 'Causes grain discoloration reducing market value', 'Worsens in drought-stressed crops'], treatment: [{ t: 'Mancozeb Spray', d: 'Apply Mancozeb 75% WP @ 2g/litre or Iprobenfos @ 1.5ml/litre at first sign.' }, { t: 'Potassium Fertilizer', d: 'Apply potassium @ 60kg K2O/ha — deficiency is the major predisposing factor.' }, { t: 'Seed Treatment', d: 'Treat seeds with Thiram + Carbendazim @ 1.5g + 1g per kg seed before sowing.' }, { t: 'Maintain Water Level', d: 'Maintain proper water level to reduce drought stress that predisposes plants.' }], prevention: ['Use disease-free certified seeds', 'Maintain soil fertility especially potassium and silicon', 'Balance irrigation — avoid drought stress periods', 'Deep plough to bury infected debris'], conf: 79 }
        }
    },
    maize: {
        symptoms: ['Large elongated tan lesions on leaves', 'Gray oval spots on leaves', 'Orange rust pustules', 'Stalk softening and rot', 'Ear with mold', 'Stunted growth', 'Yellowing leaves', 'White streaks on leaves'],
        diseases: {
            'Northern Leaf Blight': { match: ['Large elongated tan lesions on leaves', 'Yellowing leaves', 'Stunted growth'], severity: 'Moderate', icon: '🌽', pathogen: 'Exserohilum turcicum (Fungus)', desc: 'Common fungal disease causing large cigar-shaped tan lesions on maize leaves.', symptoms: ['Long 5–15cm elliptical tan or gray-green lesions on leaves', 'Lesions have wavy irregular margins', 'Start on lower leaves and move upward', 'Severe infection causes entire leaf death and crop loss'], risks: ['Yield loss 30–50% if infection before tasseling', 'Cool 18–27°C moist weather strongly favors disease', 'Can affect seed viability if severe'], treatment: [{ t: 'Mancozeb Spray', d: 'Apply Mancozeb 75% WP @ 2g/litre at first sign, repeat every 10–14 days.' }, { t: 'Propiconazole', d: 'Apply Propiconazole 25% EC @ 1ml/litre for better systemic protection.' }, { t: 'Potassium Fertilizer', d: 'Ensure adequate potassium nutrition to reduce susceptibility to disease.' }, { t: 'Remove Field Debris', d: 'After harvest, incorporate or burn crop debris to reduce inoculum in soil.' }], prevention: ['Plant resistant hybrids', 'Crop rotation with non-host crops like soybean or wheat', 'Balanced fertilization with adequate potassium', 'Early planting to escape peak disease pressure period'], conf: 84 },
            'Maize Rust': { match: ['Orange rust pustules', 'Yellowing leaves'], severity: 'Low', icon: '🟠', pathogen: 'Puccinia sorghi (Fungus)', desc: 'Common rust disease causing small brick-red pustules on leaves.', symptoms: ['Small circular to elongated rust-colored pustules on leaves', 'Pustules mainly on upper leaf surface', 'Surrounding tissue turns yellow', 'Severely infected leaves dry out prematurely'], risks: ['Usually minor on most modern hybrids', 'Yield loss up to 15% in susceptible varieties only', 'Spreads rapidly in cool wet weather conditions'], treatment: [{ t: 'Propiconazole Spray', d: 'Apply Propiconazole 25% EC @ 1ml/litre if more than 25% of upper leaves affected.' }, { t: 'Regular Scouting', d: 'Scout fields regularly — early intervention is most cost-effective.' }, { t: 'Remove Affected Leaves', d: 'In small fields, remove and destroy heavily infected leaves early in season.' }, { t: 'Potassium Application', d: 'Adequate potassium improves disease tolerance naturally in the plant.' }], prevention: ['Plant rust-resistant hybrids', 'Early planting avoids peak infection period', 'Avoid excess nitrogen fertilizer', 'Practice crop rotation annually'], conf: 76 }
        }
    },
    cotton: {
        symptoms: ['Upward curling of leaves', 'Sudden wilting', 'Boll rotting', 'Yellow leaves', 'Angular dark spots on leaves', 'Stem darkening at base', 'Stunted bushy growth', 'Pink colored boll worms visible'],
        diseases: {
            'Cotton Leaf Curl Virus': { match: ['Upward curling of leaves', 'Stunted bushy growth', 'Yellow leaves'], severity: 'High', icon: '🦠', pathogen: 'Cotton Leaf Curl Virus (CLCuV)', desc: 'Devastating viral disease spread by whiteflies causing upward leaf curling and severe stunting.', symptoms: ['Upward curling and rolling of leaves', 'Thickening of leaf veins (enation development)', 'Stunted bushy plant appearance throughout', 'Reduced and deformed bolls with no fibre'], risks: ['Can cause 100% yield loss in severe cases', 'Management only through vector control methods', 'Major problem across Punjab and Haryana districts'], treatment: [{ t: 'Control Whiteflies', d: 'Spray Imidacloprid 17.8% SL @ 0.5ml/litre to kill whitefly vectors immediately.' }, { t: 'Remove Infected Plants', d: 'Uproot severely infected plants and bury or burn them far from field.' }, { t: 'Thiamethoxam Application', d: 'Apply Thiamethoxam 25% WG @ 0.4g/litre as systemic insecticide against whiteflies.' }, { t: 'Yellow Sticky Traps', d: 'Install 8–10 yellow sticky traps per acre to monitor and capture whiteflies.' }], prevention: ['Plant tolerant varieties — check state agriculture department recommendations', 'Avoid late planting — later crops are far more affected', 'Use reflective silver mulch to repel whiteflies at seedling stage', 'Manage weeds that serve as alternative hosts for whiteflies'], conf: 85 },
            'Bacterial Blight': { match: ['Angular dark spots on leaves', 'Yellow leaves', 'Boll rotting'], severity: 'Moderate', icon: '🦠', pathogen: 'Xanthomonas axonopodis (Bacteria)', desc: 'Bacterial disease causing angular water-soaked spots on leaves and stem cankers.', symptoms: ['Angular water-soaked spots on leaves becoming dark brown', 'Dark brown to black stem and boll lesions', 'Boll infection causing internal rot', 'Infected bolls do not open properly — fibre loss'], risks: ['Spreads rapidly in rain splash and wind', 'Causes heavy boll shedding reducing yield drastically', 'Lint contamination reduces fibre quality and market price'], treatment: [{ t: 'Copper Oxychloride Spray', d: 'Apply copper oxychloride 50% WP @ 3g/litre immediately on first sign.' }, { t: 'Streptomycin + Copper', d: 'Mix Streptomycin sulfate 90% @ 150ppm + copper oxychloride for better control.' }, { t: 'Remove Infected Parts', d: 'Prune and destroy heavily infected branches — do not leave in field.' }, { t: 'Reduce Humidity', d: 'Improve field drainage and completely stop overhead irrigation.' }], prevention: ['Use disease-free certified seeds from reliable source', 'Treat seeds with Carboxin @ 2g/kg before sowing', 'Avoid working in fields when leaves are wet', 'Balanced NPK fertilization — avoid excess nitrogen'], conf: 80 }
        }
    },
    grape: {
        symptoms: ['White powdery coating on leaves', 'Oily yellow spots on leaves', 'Dark sunken spots on berries', 'Berry shrivel and rot', 'Leaf spots with yellow halo', 'Shoot wilting', 'Yellowing between veins', 'Vine stunted'],
        diseases: {
            'Powdery Mildew': { match: ['White powdery coating on leaves', 'Dark sunken spots on berries'], severity: 'Moderate', icon: '🌫️', pathogen: 'Erysiphe necator (Fungus)', desc: 'Most economically important grape disease worldwide coating all green parts with white powder.', symptoms: ['White gray powdery growth on leaves, shoots and berries', 'Infected berries crack exposing seeds early', 'Leaves distort and curl at margins', 'Stunted shoot and tendril growth'], risks: ['Can destroy 100% of crop if uncontrolled', 'Thrives in warm dry conditions 20–27°C', 'Spreads rapidly in dense unpruned canopy'], treatment: [{ t: 'Wettable Sulfur', d: 'Apply sulfur 80% WP @ 3g/litre every 7–10 days from bud burst. Most effective choice.' }, { t: 'Myclobutanil Fungicide', d: 'Apply systemic fungicide Myclobutanil or Tebuconazole @ 1ml/litre for severe infections.' }, { t: 'Canopy Management', d: 'Severely prune to open canopy for air circulation and sunlight penetration immediately.' }, { t: 'Potassium Bicarbonate', d: 'Spray 1% potassium bicarbonate solution as organic alternative every 7 days.' }], prevention: ['Open training systems for better airflow', 'Remove mummified berries and infected shoots in winter', 'Apply dormant sulfur spray before budbreak every year', 'Start fungicide program very early from pea-size berry stage'], conf: 88 },
            'Downy Mildew': { match: ['Oily yellow spots on leaves', 'Shoot wilting', 'Berry shrivel and rot'], severity: 'High', icon: '💧', pathogen: 'Plasmopara viticola (Oomycete)', desc: 'Destructive disease causing oily spots on leaves and cottony white growth on leaf undersides.', symptoms: ['Oily yellow-green oil spots on upper leaf surface', 'White cottony growth on leaf undersides in humid weather', 'Infected shoots, tendrils curl and die back', 'Berries turn brown and shrivel (brown rot stage)'], risks: ['Can cause complete crop failure in wet years', 'Thrives in warm wet weather above 10°C', 'Spreads extremely rapidly through rain splash'], treatment: [{ t: 'Metalaxyl + Mancozeb', d: 'Apply Metalaxyl 8% + Mancozeb 64% WP @ 2.5g/litre immediately on first sign.' }, { t: 'Bordeaux Mixture', d: 'Spray Bordeaux mixture 1% or copper hydroxide @ 3g/litre every 7 days.' }, { t: 'Fosetyl-Aluminum', d: 'Apply Fosetyl-Al @ 2.5g/litre as systemic option for severe infection.' }, { t: 'Remove Infected Material', d: 'Remove and destroy all infected leaves and berries to reduce spore load in vineyard.' }], prevention: ['Choose vineyard sites with good natural air drainage', 'Open canopy training systems reduce disease dramatically', 'Avoid overhead irrigation especially at evening', 'Apply Bordeaux mixture preventively 2 weeks before expected rains'], conf: 83 }
        }
    },
    mango: {
        symptoms: ['Dark sunken spots on fruit', 'White powdery coating on flowers', 'Abnormal flower bunching', 'Black sooty coating on leaves', 'Brown spots on leaves', 'Fruit rotting from stem end', 'Gum oozing from stem', 'Yellowing and leaf drop'],
        diseases: {
            'Anthracnose': { match: ['Dark sunken spots on fruit', 'Brown spots on leaves', 'Fruit rotting from stem end'], severity: 'Moderate', icon: '🥭', pathogen: 'Colletotrichum gloeosporioides (Fungus)', desc: 'Most common mango disease causing dark sunken spots on fruits especially post-harvest.', symptoms: ['Dark brown to black sunken spots on fruit skin', 'Spots enlarge rapidly after harvest', 'Flower blight reducing fruit set in season', 'Leaf spots with irregular dark margins'], risks: ['Major cause of post-harvest losses in markets', 'Latent infection — symptoms appear only after harvest', 'Favored by warm humid conditions during flowering'], treatment: [{ t: 'Carbendazim Spray', d: 'Apply Carbendazim 50% WP @ 1g/litre from flowering, repeat every 15 days.' }, { t: 'Copper Fungicide', d: 'Spray copper oxychloride 50% WP @ 3g/litre during flowering and fruit development.' }, { t: 'Hot Water Dip Post-Harvest', d: 'Dip harvested fruits in hot water @ 52°C for 5 minutes to kill latent infections.' }, { t: 'Orchard Sanitation', d: 'Remove and destroy fallen infected fruits and leaves from ground regularly.' }], prevention: ['Prune trees annually for good canopy air circulation', 'Spray preventively at panicle emergence stage', 'Use copper fungicide before monsoon rains arrive', 'Harvest at proper maturity and handle fruit carefully to avoid wounds'], conf: 82 },
            'Powdery Mildew': { match: ['White powdery coating on flowers', 'Yellowing and leaf drop'], severity: 'Moderate', icon: '🌫️', pathogen: 'Oidium mangiferae (Fungus)', desc: 'Fungal disease causing white powdery coating on young leaves, flowers and small fruits.', symptoms: ['White powdery coating on inflorescence and young leaves', 'Infected flowers and small fruits drop prematurely', 'Severe infection drastically reduces fruit set', 'Leaves show white patches especially on new growth'], risks: ['Can cause 70–80% loss in fruit set if severe', 'Favored by cool dry weather during flowering season', 'Critical window is at flower initiation — cannot miss'], treatment: [{ t: 'Sulfur Spray', d: 'Apply wettable sulfur 80% WP @ 2g/litre from panicle emergence every 10 days.' }, { t: 'Triadimefon', d: 'Apply Triadimefon 25% WP @ 0.5g/litre for systemic control of severe infections.' }, { t: 'Dinocap (Karathane)', d: 'Apply Dinocap @ 1ml/litre — very effective specifically against mango powdery mildew.' }, { t: 'Prune Dense Canopy', d: 'Open up dense canopy by pruning to improve air circulation and sunlight penetration.' }], prevention: ['Spray preventively from panicle initiation every season', 'Prune for open well-ventilated canopy', 'Avoid overhead irrigation completely during flowering', 'Monitor weather closely — spray before dry spells during bloom period'], conf: 80 }
        }
    },
    onion: {
        symptoms: ['Purple centered spots on leaves', 'White fluffy growth on leaves', 'Rotting at bulb base', 'Soft rot of neck', 'Leaf tips dying back', 'Yellowing and drooping leaves', 'Bulb soft and smelly', 'White fungal growth at bulb base'],
        diseases: {
            'Purple Blotch': { match: ['Purple centered spots on leaves', 'Leaf tips dying back', 'Yellowing and drooping leaves'], severity: 'Moderate', icon: '🧅', pathogen: 'Alternaria porri (Fungus)', desc: 'Important onion disease causing purple-centered lesions on leaves and seed stalks.', symptoms: ['Small white spots with purple center on leaves', 'Lesions enlarge with yellow to purple halo', 'Infected leaves dry from tip downward', 'Seed stalk collapse in severe cases'], risks: ['Major problem in warm humid weather above 25°C', 'Can devastate bulb yield and quality severely', 'Spreads rapidly through air after rainfall'], treatment: [{ t: 'Mancozeb Spray', d: 'Apply Mancozeb 75% WP @ 2g/litre every 7–10 days from first sign.' }, { t: 'Iprodione', d: 'Apply Iprodione 50% WP @ 2g/litre for better control of Alternaria blight.' }, { t: 'Remove Infected Leaves', d: 'Clip and remove severely infected leaf tips to reduce spread in field.' }, { t: 'Improve Drainage', d: 'Ensure proper field drainage channels and avoid any water stagnation.' }], prevention: ['Use disease-free seeds and sets from certified source', 'Treat seeds with Thiram @ 2.5g/kg before sowing', 'Avoid overhead irrigation — use drip instead', 'Rotate with non-allium crops for minimum 2 years'], conf: 81 },
            'Basal Rot': { match: ['Rotting at bulb base', 'Soft rot of neck', 'Yellowing and drooping leaves'], severity: 'High', icon: '🔴', pathogen: 'Fusarium oxysporum (Fungus)', desc: 'Soil-borne disease causing rotting at the base of bulb and complete root death.', symptoms: ['Yellowing and wilting of leaves from tip downward', 'Pink to red discoloration at bulb base on cutting', 'Roots turn pink and die completely', 'Entire plant collapses at base when pulled'], risks: ['Soil-borne — persists in soil for many years', 'Spreads through infected soil water and contaminated bulbs', 'Hot soil temperatures 25–32°C strongly favor disease'], treatment: [{ t: 'Carbendazim Soil Drench', d: 'Drench soil with Carbendazim 50% WP @ 1g/litre around plant base immediately.' }, { t: 'Remove Infected Plants', d: 'Uproot and destroy infected plants including surrounding soil — do not spread.' }, { t: 'Trichoderma Application', d: 'Apply Trichoderma viride @ 5g/kg seed or 2.5kg/ha soil application for biocontrol.' }, { t: 'Avoid Root Wounding', d: 'Minimize root damage during intercultivation — wounds are primary entry points.' }], prevention: ['Treat bulbs and seeds with Trichoderma before planting', 'Use raised beds for better drainage and aeration', 'Long crop rotation 3+ years away from all allium crops', 'Solarize soil with clear polythene before planting in affected fields'], conf: 78 }
        }
    },
    chilli: {
        symptoms: ['Upward leaf rolling and distortion', 'Dark sunken spots on fruit', 'White powdery coating on leaves', 'Water-soaked lesions on stem', 'Yellowing leaves', 'Fruit with soft rot', 'Seedlings collapsing at base', 'Yellow green mosaic on leaves'],
        diseases: {
            'Chilli Leaf Curl Virus': { match: ['Upward leaf rolling and distortion', 'Yellowing leaves', 'Yellow green mosaic on leaves'], severity: 'High', icon: '🦠', pathogen: 'Chilli Leaf Curl Virus (ChLCV)', desc: 'Viral disease spread by thrips and mites causing severe leaf distortion and plant stunting.', symptoms: ['Upward curling and rolling of leaves into tight rolls', 'Leaf surface becomes rough and puckered', 'Stunted bushy plant appearance', 'Flower and fruit drop'], risks: ['No cure - Management only', 'Yield loss 80-100%', 'Spreads through vectors'], treatment: [{ t: 'Control Vectors', d: 'Spray Imidacloprid 17.8% SL @ 0.5ml/litre to kill vectors.' }, { t: 'Remove Infected', d: 'Immediately remove and burn infected plants.' }], prevention: ['Use virus-free seedlings', 'Use sticky traps', 'Manage weeds'], conf: 84 },
            'Anthracnose': { match: ['Dark sunken spots on fruit', 'Yellowing leaves', 'Fruit with soft rot'], severity: 'Moderate', icon: '🌶️', pathogen: 'Colletotrichum capsici (Fungus)', desc: 'Fungal disease causing sunken spots on fruits.', symptoms: ['Circular sunken water-soaked spots on fruits', 'Spots turn dark with pink spores', 'Fruit rot'], risks: ['30-50% post-harvest loss', 'Accelerates in humid weather'], treatment: [{ t: 'Fungicide Spray', d: 'Apply Carbendazim 50% WP @ 1g/litre.' }, { t: 'Remove Infected', d: 'Pick and destroy infected fruits.' }], prevention: ['Use treated seeds', 'Avoid overhead irrigation', 'Improve drainage'], conf: 80 }
        }
    },
    apple: {
        symptoms: ['Brown spots on leaves', 'Velvety spots on fruit', 'Withered blossoms', 'Orange spots on leaves'],
        diseases: {
            'Apple Scab': { match: ['Brown spots on leaves', 'Velvety spots on fruit'], severity: 'Moderate', icon: '🍎', pathogen: 'Venturia inaequalis (Fungus)', desc: 'Fungal disease affecting leaves and fruit.', symptoms: ['Olive-green to brown velvety spots', 'Fruit becomes cracked and deformed'], risks: ['Reduces fruit quality', 'Defoliation'], treatment: [{ t: 'Fungicide', d: 'Apply Captan or Mancozeb.' }], prevention: ['Prune for airflow', 'Remove fallen leaves'], conf: 85 }
        }
    },
    banana: {
        symptoms: ['Yellow streaks on leaves', 'Leaves turning brown and wilting', 'Black spots on fruit'],
        diseases: {
            'Sigatoka': { match: ['Yellow streaks on leaves', 'Leaves turning brown and wilting'], severity: 'High', icon: '🍌', pathogen: 'Mycosphaerella fijiensis (Fungus)', desc: 'Fungal disease causing leaf spots.', symptoms: ['Yellow streaks', 'Necrotic spots'], risks: ['Significant yield reduction'], treatment: [{ t: 'Oil-based Fungicide', d: 'Apply mineral oil mixed with fungicide.' }], prevention: ['Improve drainage', 'Remove infected leaves'], conf: 82 }
        }
    },
    bean: {
        symptoms: ['Rust colored pustules', 'Sunken brown spots on pods', 'Yellowing leaves'],
        diseases: {
            'Bean Rust': { match: ['Rust colored pustules'], severity: 'Moderate', icon: '🫘', pathogen: 'Uromyces appendiculatus (Fungus)', desc: 'Fungal disease causing rust spots.', symptoms: ['Small reddish-brown pustules'], risks: ['Defoliation'], treatment: [{ t: 'Sulfur Spray', d: 'Apply sulfur or Chlorothalonil.' }], prevention: ['Crop rotation', 'Resistant varieties'], conf: 80 }
        }
    },
    cabbage: {
        symptoms: ['V-shaped yellow lesions', 'Blackening of leaf veins', 'Stinking soft rot'],
        diseases: {
            'Black Rot': { match: ['V-shaped yellow lesions', 'Blackening of leaf veins'], severity: 'High', icon: '🥬', pathogen: 'Xanthomonas campestris', desc: 'Serious bacterial disease.', symptoms: ['V-shaped yellowing on leaf margins'], risks: ['Systemic infection'], treatment: [{ t: 'Copper Spray', d: 'Apply copper-based bactericide.' }], prevention: ['Certified seeds', '3-year rotation'], conf: 87 }
        }
    },
    carrot: {
        symptoms: ['Small dark spots with yellow halos', 'Leaves curling and dying', 'White powdery coating'],
        diseases: {
            'Leaf Blight': { match: ['Small dark spots with yellow halos', 'Leaves curling and dying'], severity: 'Moderate', icon: '🥕', pathogen: 'Alternaria dauci', desc: 'Fungal leaf spot.', symptoms: ['Small brown-black spots'], risks: ['Reduces root size'], treatment: [{ t: 'Fungicide', d: 'Apply Iprodione.' }], prevention: ['Crop rotation', 'Proper spacing'], conf: 83 }
        }
    },
    cauliflower: {
        symptoms: ['V-shaped yellow lesions', 'Black veins', 'White downy growth on leaves'],
        diseases: {
            'Downy Mildew': { match: ['White downy growth on leaves'], severity: 'Moderate', icon: '🥦', pathogen: 'Peronospora parasitica', desc: 'Fungal disease.', symptoms: ['Light green to yellow spots'], risks: ['Reduces curd quality'], treatment: [{ t: 'Metalaxyl', d: 'Apply Metalaxyl + Mancozeb.' }], prevention: ['Air circulation', 'Avoid overhead watering'], conf: 81 }
        }
    },
    cucumber: {
        symptoms: ['White powdery coating', 'Yellow spots turning brown', 'Wilting vines'],
        diseases: {
            'Powdery Mildew': { match: ['White powdery coating'], severity: 'Low', icon: '🥒', pathogen: 'Podosphaera xanthii', desc: 'Fungal coating.', symptoms: ['White powder on upper leaves'], risks: ['Reduces yield'], treatment: [{ t: 'Sulfur', d: 'Apply wettable sulfur.' }], prevention: ['Resistant hybrids', 'Full sun'], conf: 89 }
        }
    },
    eggplant: {
        symptoms: ['Sunken brown spots', 'Yellowing and wilting', 'Stunted growth'],
        diseases: {
            'Phomopsis Blight': { match: ['Sunken brown spots'], severity: 'Moderate', icon: '🍆', pathogen: 'Phomopsis vexans', desc: 'Fungal disease.', symptoms: ['Circular brown spots on leaves/fruit'], risks: ['Fruit rot'], treatment: [{ t: 'Copper Spray', d: 'Apply copper oxychloride.' }], prevention: ['Clean seeds', 'Remove debris'], conf: 78 }
        }
    },
    groundnut: {
        symptoms: ['Brown circular spots', 'Orange rust pustules', 'Yellowing leaves'],
        diseases: {
            'Leaf Spot': { match: ['Brown circular spots'], severity: 'Moderate', icon: '🥜', pathogen: 'Cercospora arachidicola', desc: 'Common fungal disease.', symptoms: ['Dark brown spots with yellow halos'], risks: ['Defoliation'], treatment: [{ t: 'Carbendazim', d: 'Apply Carbendazim 50% WP.' }], prevention: ['Crop rotation', 'Seed treatment'], conf: 84 }
        }
    },
    lettuce: {
        symptoms: ['Yellow spots with white mold underneath', 'Mosaic pattern on leaves', 'Wilting'],
        diseases: {
            'Downy Mildew': { match: ['Yellow spots with white mold underneath'], severity: 'Moderate', icon: '🥗', pathogen: 'Bremia lactucae', desc: 'Fungal disease.', symptoms: ['Pale green/yellow spots'], risks: ['Reduces marketability'], treatment: [{ t: 'Mancozeb', d: 'Apply Mancozeb fungide.' }], prevention: ['Avoid overcrowding', 'Morning watering'], conf: 82 }
        }
    },
    pear: {
        symptoms: ['Velvety brown spots', 'Black withered blossoms', 'Fruit cracking'],
        diseases: {
            'Pear Scab': { match: ['Velvety brown spots', 'Fruit cracking'], severity: 'Moderate', icon: '🍐', pathogen: 'Venturia pirina', desc: 'Fungal disease.', symptoms: ['Olive-brown spots'], risks: ['Fruit deformation'], treatment: [{ t: 'Captan', d: 'Apply Captan fungide.' }], prevention: ['Pruning', 'Fallen leaf removal'], conf: 86 }
        }
    },
    pepper: {
        symptoms: ['Small water-soaked spots', 'Upward curling of leaves', 'Yellowing'],
        diseases: {
            'Bacterial Spot': { match: ['Small water-soaked spots'], severity: 'High', icon: '🫑', pathogen: 'Xanthomonas', desc: 'Bacterial infection.', symptoms: ['Small irregular dark spots'], risks: ['Fruit loss'], treatment: [{ t: 'Copper + Streptomycin', d: 'Apply copper mixed with streptomycin.' }], prevention: ['Balanced NPK', 'Healthy transplants'], conf: 81 }
        }
    },
    soybean: {
        symptoms: ['Reddish-brown rust spots', 'Yellow mosaic pattern', 'Brown spots with halos'],
        diseases: {
            'Soybean Rust': { match: ['Reddish-brown rust spots'], severity: 'High', icon: '🫛', pathogen: 'Phakopsora pachyrhizi', desc: 'Fast-spreading fungus.', symptoms: ['Small tan to reddish brown lesions'], risks: ['Complete defoliation'], treatment: [{ t: 'Triazole Fungicide', d: 'Apply Tebuconazole.' }], prevention: ['Early planting', 'Monitoring'], conf: 88 }
        }
    },
    strawberry: {
        symptoms: ['Purple spots on leaves', 'Fruit with gray mold', 'White powdery coating'],
        diseases: {
            'Gray Mold': { match: ['Fruit with gray mold'], severity: 'High', icon: '🍓', pathogen: 'Botrytis cinerea', desc: 'Fungal fruit rot.', symptoms: ['Gray fuzzy growth on berries'], risks: ['Kills fruit'], treatment: [{ t: 'Remove infected fruit', d: 'Remove and destroy immediately.' }, { t: 'Fungicide', d: 'Apply Fludioxonil.' }], prevention: ['Mulching', 'Proper spacing'], conf: 85 }
        }
    }
};

// ── STATE ──────────────────────────────────────────────────────────
let cddCrop = '';
let cddSymptoms = [];
let cddLastResult = null;
let cddLastCropLabel = '';

// ── CROP SELECT ────────────────────────────────────────────────────
function cddSelCrop(btn, crop) {
    document.querySelectorAll('.cdd-crop-btn').forEach(b => b.classList.remove('sel'));
    btn.classList.add('sel');
    cddCrop = crop;
    cddSymptoms = [];
    cddBuildSymptoms(crop);
    cddCheckReady();
}

function cddBuildSymptoms(crop) {
    const wrap = document.getElementById('cdd-sym-wrap');
    const grid = document.getElementById('cdd-sym-grid');
    grid.innerHTML = '';
    const list = CDD_DB[crop] ? CDD_DB[crop].symptoms : [];
    list.forEach(s => {
        const b = document.createElement('button');
        b.className = 'cdd-sym-btn';
        b.textContent = s;
        b.onclick = function () { cddToggleSym(this, s); };
        grid.appendChild(b);
    });
    wrap.style.display = 'block';
}

function cddToggleSym(btn, sym) {
    btn.classList.toggle('sel');
    if (btn.classList.contains('sel')) cddSymptoms.push(sym);
    else cddSymptoms = cddSymptoms.filter(x => x !== sym);
    cddCheckReady();
}

function cddCheckReady() {
    document.getElementById('cdd-go-btn').disabled = !(cddCrop && cddSymptoms.length > 0);
}

// ── IMAGE UPLOAD ───────────────────────────────────────────────────
function cddHandleFile(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        document.getElementById('cdd-prev-img').src = e.target.result;
        document.getElementById('cdd-prev').style.display = 'block';
        document.getElementById('cdd-uzone').style.display = 'none';
    };
    reader.readAsDataURL(file);
}

function cddClearImg() {
    document.getElementById('cdd-prev').style.display = 'none';
    document.getElementById('cdd-uzone').style.display = 'block';
    document.getElementById('cdd-finput').value = '';
}

// Drag and drop
const cddUzone = document.getElementById('cdd-uzone');
if (cddUzone) {
    cddUzone.addEventListener('dragover', e => { e.preventDefault(); cddUzone.classList.add('over'); });
    cddUzone.addEventListener('dragleave', () => cddUzone.classList.remove('over'));
    cddUzone.addEventListener('drop', e => {
        e.preventDefault(); cddUzone.classList.remove('over');
        if (e.dataTransfer.files[0]) cddHandleFile({ files: e.dataTransfer.files });
    });
}

// ── MATCH ENGINE ──────────────────────────────────────────────────
function cddFindDisease(crop, symptoms) {
    const diseases = CDD_DB[crop].diseases;
    let best = null, bestScore = -1, bestName = '';
    for (const name in diseases) {
        const d = diseases[name];
        const score = (d.match || []).filter(m => symptoms.includes(m)).length;
        if (score > bestScore) { bestScore = score; bestName = name; best = d; }
    }
    if (!best || bestScore === 0) {
        return {
            name: 'Healthy Crop', severity: 'Healthy', icon: '✅',
            pathogen: 'None detected',
            symptoms: ['No significant disease symptoms matched', 'Plant appears visually healthy based on your selections'],
            risks: ['Continue regular monitoring every week', 'Prevention is always better than cure'],
            treatment: [
                { t: 'Keep Up Good Farm Practices', d: 'Your crop appears healthy! Continue regular watering, balanced fertilization and pest monitoring.' },
                { t: 'Weekly Scouting', d: 'Walk your field weekly and check undersides of leaves for early pest or disease signs.' }
            ],
            prevention: ['Water at base — avoid wetting leaves', 'Apply balanced NPK fertilizer fortnightly', 'Check undersides of leaves weekly for early signs', 'Remove weeds that harbor pests and diseases'],
            conf: 90
        };
    }
    return { name: bestName, ...best };
}

// ── DIAGNOSE ──────────────────────────────────────────────────────
function cddDiagnose() {
    if (!cddCrop || !cddSymptoms.length) return;
    document.getElementById('cdd-up-card').style.display = 'none';
    document.getElementById('cdd-results').style.display = 'none';
    document.getElementById('cdd-loading').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Reset progress bar animation
    const fill = document.querySelector('.cdd-load-fill');
    if (fill) { fill.style.animation = 'none'; fill.offsetHeight; fill.style.animation = ''; }

    setTimeout(() => {
        const r = cddFindDisease(cddCrop, cddSymptoms);
        cddLastResult = r;
        cddLastCropLabel = cddCrop.charAt(0).toUpperCase() + cddCrop.slice(1);
        document.getElementById('cdd-loading').style.display = 'none';
        cddRenderResult(r);
    }, 2800);
}

// ── RENDER ────────────────────────────────────────────────────────
function cddRenderResult(r) {
    const div = document.getElementById('cdd-results');
    const isHealthy = r.severity === 'Healthy';
    const isHigh = r.severity === 'High';
    const bannerCls = isHealthy ? 'cdd-b-healthy' : isHigh ? 'cdd-b-severe' : 'cdd-b-disease';
    const cropCls = isHealthy ? 'cdd-ct-healthy' : isHigh ? 'cdd-ct-severe' : 'cdd-ct-disease';
    const c1 = r.conf || 80;
    const c2 = Math.max(8, c1 - 18 - Math.floor(Math.random() * 14));

    const treatHTML = (r.treatment || []).map((t, i) => `
    <div class="cdd-step">
      <div class="cdd-step-n">${i + 1}</div>
      <div class="cdd-step-c"><strong>${t.t}</strong><span>${t.d}</span></div>
    </div>`).join('');

    div.innerHTML = `
    <div class="cdd-banner ${bannerCls}">
      <div class="cdd-b-icon">${r.icon}</div>
      <div>
        <div class="cdd-crop-tag ${cropCls}">🌱 ${cddLastCropLabel}</div>
        <div class="cdd-b-name">${r.name}</div>
        <div class="cdd-b-meta">🔬 ${r.pathogen} &nbsp;·&nbsp; ⏱ Analyzed just now</div>
      </div>
    </div>

    <div class="cdd-sev">
      <div class="cdd-chip">
        <div class="cdd-chip-ico">${isHealthy ? '💚' : isHigh ? '🔴' : '🟡'}</div>
        <div><div class="cdd-chip-val">${r.severity}</div><div class="cdd-chip-lbl">Severity Level</div></div>
      </div>
      <div class="cdd-chip">
        <div class="cdd-chip-ico">🎯</div>
        <div><div class="cdd-chip-val">${c1}%</div><div class="cdd-chip-lbl">Match Confidence</div></div>
      </div>
      <div class="cdd-chip">
        <div class="cdd-chip-ico">🔍</div>
        <div><div class="cdd-chip-val">${cddSymptoms.length}</div><div class="cdd-chip-lbl">Symptoms Matched</div></div>
      </div>
    </div>

    <div class="cdd-conf">
      <div class="cdd-conf-title">Detection Confidence</div>
      <div class="cdd-cbar">
        <div class="cdd-cbar-top"><span>${r.name}</span><span>${c1}%</span></div>
        <div class="cdd-cbar-track"><div class="cdd-cbar-fill cdd-cf1" id="cdd-cb1"></div></div>
      </div>
      <div class="cdd-cbar">
        <div class="cdd-cbar-top"><span>Other possibilities</span><span>${c2}%</span></div>
        <div class="cdd-cbar-track"><div class="cdd-cbar-fill cdd-cf2" id="cdd-cb2"></div></div>
      </div>
    </div>

    <div class="cdd-info-row">
      <div class="cdd-icard">
        <div class="cdd-ic-head"><div class="cdd-ic-ico">🔍</div><div class="cdd-ic-title">Symptoms Detected</div></div>
        <ul class="cdd-ic-list">${(r.symptoms || []).map(s => `<li>${s}</li>`).join('')}</ul>
      </div>
      <div class="cdd-icard">
        <div class="cdd-ic-head"><div class="cdd-ic-ico">⚠️</div><div class="cdd-ic-title">Risk Factors</div></div>
        <ul class="cdd-ic-list">${(r.risks || []).map(s => `<li>${s}</li>`).join('')}</ul>
      </div>
    </div>

    <div class="cdd-treat">
      <div class="cdd-ic-head"><div class="cdd-ic-ico">💊</div><div class="cdd-ic-title">Treatment Plan</div></div>
      <div class="cdd-steps">${treatHTML}</div>
    </div>

    <div class="cdd-treat">
      <div class="cdd-ic-head"><div class="cdd-ic-ico">🛡️</div><div class="cdd-ic-title">Prevention Measures</div></div>
      <ul class="cdd-ic-list" style="margin-top:12px">${(r.prevention || []).map(s => `<li>${s}</li>`).join('')}</ul>
    </div>

    <div class="cdd-actions">
      <button class="cdd-btn-out" onclick="cddReset()">📷 Check Another Crop</button>
      <button class="cdd-btn-fill" onclick="cddDownload()">⬇️ Download Report</button>
    </div>`;

    div.style.display = 'block';
    setTimeout(() => {
        const b1 = document.getElementById('cdd-cb1');
        const b2 = document.getElementById('cdd-cb2');
        if (b1) b1.style.width = c1 + '%';
        if (b2) b2.style.width = c2 + '%';
    }, 350);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── RESET ─────────────────────────────────────────────────────────
function cddReset() {
    document.getElementById('cdd-results').style.display = 'none';
    document.getElementById('cdd-loading').style.display = 'none';
    document.getElementById('cdd-up-card').style.display = 'block';
    cddClearImg();
    document.querySelectorAll('.cdd-crop-btn').forEach(b => b.classList.remove('sel'));
    document.querySelectorAll('.cdd-sym-btn').forEach(b => b.classList.remove('sel'));
    document.getElementById('cdd-sym-wrap').style.display = 'none';
    cddCrop = ''; cddSymptoms = [];
    document.getElementById('cdd-go-btn').disabled = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── DOWNLOAD REPORT ───────────────────────────────────────────────
function cddDownload() {
    if (!cddLastResult) return;
    const r = cddLastResult;
    const date = new Date().toLocaleString('en-IN');
    const txt = `KisanBazaar — Crop Disease Detector Report
============================================
Date        : ${date}
Crop        : ${cddLastCropLabel}
Disease     : ${r.name}
Pathogen    : ${r.pathogen}
Severity    : ${r.severity}
Confidence  : ${r.conf}%

SYMPTOMS DETECTED:
${(r.symptoms || []).map(s => '• ' + s).join('\n')}

RISK FACTORS:
${(r.risks || []).map(s => '• ' + s).join('\n')}

TREATMENT PLAN:
${(r.treatment || []).map((t, i) => `${i + 1}. ${t.t}: ${t.d}`).join('\n')}

PREVENTION MEASURES:
${(r.prevention || []).map(s => '• ' + s).join('\n')}

--------------------------------------------
KisanBazaar Crop Disease Detector
Farm Fresh Direct | Free Tool for Indian Farmers`;

    const a = document.createElement('a');
    a.style.display = 'none';
    const blob = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = `KisanBazaar_CropReport_${cddLastCropLabel}_${r.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
}
