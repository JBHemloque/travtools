'uses strict';

const sysgenlib = require('./sysgenlib.js');
const dice = require('./dice.js');

const AAVERI = 'Aaveri';
const MIXED = 'Mixed;'
const PWEZA = 'Pweza';
const TERRAN = 'Terran';

const ALLEGIANCES = [MIXED, AAVERI, PWEZA, TERRAN];
const PURE_ALLEGIANCES = [AAVERI, PWEZA, TERRAN];

const AAVERI_NAMES = [
    'Abran',
    'Adiil',
    'Ahull',
    'Alak Erath',
    'Amanesh',
    'Amarl',
    'Aniik',
    'Anis',
    'Ankatch',
    'Annith',
    'Aris',
    'Arscar',
    'Arushim',
    'Bani',
    'Cabar',
    'Cale',
    'Caly',
    'Chuie',
    'Cinnrith',
    'Coloos',
    'Distul',
    'Doshi',
    'Drillou',
    'Edon',
    'Ersen',
    'Eshemeli',
    'Gedith',
    'Gisheth',
    'Harrikesh',
    'Husni',
    'Hykhra',
    'Inon Inon',
    'Inor',
    'Inoresh',
    'Irardh',
    'Keshesh',
    'Ketrani',
    'Khadi',
    'Khirinsh',
    'Khitaris',
    'Khova',
    'Kiraku',
    'Mani',
    'Mekyio',
    'Meshose',
    'Metri',
    'Micere',
    'Mihenalu',
    'Morphi',
    'Mycia',
    'Nihi',
    'Nobi',
    'Okan',
    'Oran',
    'Orthear',
    'Paktaki',
    'Pyri Borgh',
    'Rhave',
    'Saiyani',
    'Sarta',
    'Satai',
    'Sicia',
    'Sopa',
    'Spathuesh',
    'Sycha',
    'Syri',
    'Teni',
    'Threme',
    'Ticianim',
    'Treeniea',
    'Tura',
    'Urenkesh',
    'Vanni',
    'Vano',
    'Varga',
    'Vilgi',
    'Vilgish',
    'Wuuhi',
    'Zachi',
    'Zarbiketh',
    'Zeri',
    'Ziamelth',
    'Zini',
];
var aaveriNames = [];
for (var i = 0; i < AAVERI_NAMES.length; i++) {
    aaveriNames.push(AAVERI_NAMES[i]);
}

const PWEZA_NAMES = [
    'Waterhome',
    'Dry Head',
    'Bright Star',
    'Heavy Weather',
    'Lifebox',
    'Falling water',
    'Star Bright',
    'Cold Wind',
    'Farhome',
    'Darkstar',
    'Secret Melody',
    'Yeva Osipova',
    'Leontiy',
    'Kozlov',
    'Afanasiia',
    'Zaytseva',
    'Gavriil',
    'Novikov',
    'Salih Samara',
    'Shamira Akel',
    'Omair Bashir',
    'Asjad Husain',
    'Lachapelle',
    'Sauvageau',
    'Plamondon',
    'Nishant',
    'Isha',
    'Rahul Mall',
    'Beniamino',
    'Sawaya Shig',
    'Kishimoto',
    'Kiyabu',
    'Gwon Chul',
    'Kyuang',
    'Yuan Yue',
    'Meirong',
    'Qin Wei',
    'Cai Zihao',
    'Bahena',
    'Favela',
    'Emigdio',
    'Savala',
    'Hasina Mada',
    'Adia Muraty',
    'Mwinyi Suha',
    'Kaisa Kamar',
    'Nyimbo Ayim',
    'Mazhar',
    'Derya',
    'Akay',
    'Gweneth',
    'Brin',
    'Niamh',
    'Bebinn',
    'Tayet',
    'Hu',
    'Shu',
    'Edana',
    'Fridtjof',
    'Nyx',
    'Than',
    'Maleagant',
    'Githinji',
    'Ozul',
    'Aerona',
    'Torvia',
    'Skana',
    'Zeenu',
    'Vekmoku',
    'Thorek',
    'Shora',
    'Celeen',
    'Ultcka',
    'Kinina',
    'Rearckia',
    'Kranya',
    'Khania',
    'Ulge lorn',
    'Ganu',
    'Talrian',
    'Mor-arot',
    'Zarotamia',
    'Meldide',
    'Pergash',
    'Gallro',
    'Medkesh',
    'Fhlonea',
    'Moninus',
    'Laurok',
    'Paxtuna',
    'Kyjur',
    'Trihon',
    'Korduros',
    'Oainyar',
    'Valyorro',
    'Cydora',
    'Trisrica',
    'Tencku',
    'Thraos',
    'Tencphemus',
    'Iscdos',
    'Ariethro',
    'Plyarot',
    'Veconia',
    'Firak',
    'Tylarn',
    'Zaro',
    'Aegmaid',
    'Paxsmos',
    'Tenmeter',
    'Vethrillian',
    'Hiivia',
    'Vulai',
    'Etherra'
];
var pwezaNames = [];
for (var i = 0; i < PWEZA_NAMES.length; i++) {
    pwezaNames.push(PWEZA_NAMES[i]);
}

const TERRAN_NAMES = [
    'Wei Xia',
    'Hai Zhe',
    'Shanyuan',
    'Cui Guang',
    'Xiang',
    'Aiguo',
    'Jiaying',
    'Tonalea',
    'Dennehotso',
    'Cameron',
    'Montcuq',
    'Orance',
    'Helvete',
    'Troia',
    'Bell End',
    'Sasmuan',
    'Bugyi',
    'Aiea',
    'Nevermind',
    'Forlorn',
    'Armstrong',
    'Aurora',
    'Inferno',
    'Requiem',
    'Medusa',
    'Galena',
    'Covenant',
    'La Paz',
    'Vernier',
    'Paradise',
    'Maricopa',
    'Carpathia',
    'Blue Glass',
    'Tora Bora',
    'Cinnabar',
    'Avalon',
    'Hermes',
    'Ellis',
    'Botany Bay',
    'Kingsland',
    'Okavango',
    'Paulo',
    'Alicia',
    'Crater',
    'Stark',
    'Fromme',
    'Heissbath',
    'Elysia',
    'Amaterasu',
    'Shungen',
    'Cousteau',
    'Serurier',
    'Kwantung',
    'Blessing',
    'Nasser',
    'King',
    'Blossom',
    'Dragons Rest',
    'Wasphome',
    'Anytime',
    'Shadowfen',
    'Ironforge',
    'Bournemouth',
    'Pitmerden',
    'Zalfari',
    'Darkwell',
    'Caerfyrddin',
    'Shipton',
    'Beggars Hole',
    'Arkney',
    'Haran',
    'Romsey',
    'Woodpine',
    'Ely',
    'Swordbreak',
    'Bredon',
    'Crossroads',
    'Dragontail',
    'Snowbush',
    'Highsummer',
    'Valhaven'
];
var terranNames = [];
for (var i = 0; i < TERRAN_NAMES.length; i++) {
    terranNames.push(TERRAN_NAMES[i]);
}



function determineAllegiance(upp) {
    if (upp.population == 0) {
        return null;
    }
    // console.log('+++determineAllegiance(' + JSON.stringify(upp) + ')');
    // There are some preferences around worlds with breathable atmospheres
    if (sysgenlib.isHabitable(upp)) {
        // Pweza prefer water worlds and other races don't like them as much
        if (upp.hydrographics >= 9) {
            if (dice.d6() > 3) {
                return PWEZA;
            }
        }
        // Aaveri have no problem with dry worlds
        if (upp.hydrographics <= 2) {
            if (dice.d6() > 3) {
                return AAVERI;
            }
        }        
    }
    return getAllegiance(ALLEGIANCES);
}
module.exports.determineAllegiance = determineAllegiance;

function getAllegiance(allegianceSet) {
    return allegianceSet[dice.rollDie(allegianceSet.length)-1];
}

function getName(names) {
    // console.log('+++getName(' + JSON.stringify(names) + ')');
    if (names.length == 0) {
        return null;
    }

    let i = dice.rollDie(names.length)-1;
    // console.log('i = ' + i);
    let name = names[i];
    // console.log('name = ' + name);

    // Pull out the name so we don't use it again
    names.splice(i, 1);

    // console.log('---getName(' + JSON.stringify(names) + ')');
    return name;
}

function getNameValuesFromAllegiance(allegiance) {
    let values = [];
    switch (allegiance) {
        case AAVERI:
            values = aaveriNames;
            break;
        case PWEZA:
            values = pwezaNames;
            break;
        case TERRAN:
            values = terranNames;
            break;
        case MIXED:
            values = getNameValuesFromAllegiance(getAllegiance(PURE_ALLEGIANCES));
            break;
    }
    return values;
}

function getNameFromAllegiance(allegiance) {
    return getName(getNameValuesFromAllegiance(allegiance));
}
module.exports.getNameFromAllegiance = getNameFromAllegiance;