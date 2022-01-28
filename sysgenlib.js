'uses strict';

var tradeCodes = require('./tradecodes.js');

var constants = require('./constants.js');

var dice = require('./dice.js');

const REDUCING_FACTOR = 10;

const MAX_TECH = 12;

const STAR = 'Star';
const PLANET = 'Planet';
const PLANETOID_BELT = 'Planetoid Belt';
const GAS_GIANT = 'Gas Giant';
const LGG = 'Large Gas Giant';
const SGG = 'Small Gas Giant';
const EMPTY = 'Empty';
const MAIN_WORLD = 'Main World';

const starportData = ['+', '-', 'A', 'A', 'A', 'B', 'B', 'C', 'C', 'D', 'E', 'E', 'X'];
const spaceportData = ['Y', 'Y', 'Y', 'H', 'G', 'G', 'F'];

const stellarClassData = ['B', 'B', 'A', 'M', 'M', 'M', 'M', 'M', 'K', 'G', 'G', 'F', 'F'];
const stellarSizeData = ['Ia', 'Ib', 'II', 'III', 'IV', 'VI', 'D', 'V', 'V', 'V', 'V', 'V', 'V'];

const companionClassData = ['O', 'B', 'A', 'F', 'F', 'G', 'G', 'K', 'K', 'M', 'M', 'M', 'M'];
const companionSizeData = ['Ia', 'Ib', 'II', 'III', 'IV', 'V', 'V', 'V', 'V', 'VI', 'D', 'D', 'D'];

const brownDwarfClassData = ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'L', 'L', 'T', 'T', 'T', 'Y', 'Y'];
const companionBrownDwarfClassData = ['L', 'L', 'L', 'T', 'T', 'T', 'T', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'];

const gasGiantQtyData = [0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5];
const planetoidQtyData = [3, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1,];

const maxOrbitsSizeDMData = [8, 8, 8, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const maxOrbitsClassDMData = [0, 0, 0, -4, -4, -4, -4, -4, -2, 0, 0, 0, 0]

const surfaceData = constants.surfaceData();
const innerData = constants.innerData();
const habitableData = constants.habitableData();
const jumpLimitData = constants.jumpLimitData();
const luminosityData = constants.luminosityData();

const orbitDistance = ['0.2 AU', '0.4 AU', '0.7 AU', '1.0 AU', '1.6 AU', '2.8 AU', '5.2 AU',
     '10 AU', '19.6 AU', '38.8 AU', '77.2 AU', '154 AU', '307.4 AU', '614.8 AU', '1229.2 AU', '2458 AU'];

const ringOrbitDistance = [1, 1, 1, 2, 2, 3];
const closeCompanionOrbitDistance = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const farCompanionOrbitDistance = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65];
const extremeCompanionOrbitDistance = [75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325];

const subordinateGovernmentData = [0, 0, 1, 2, 3, 6, 6];

const innerPlanetAtmosphere = [0, 1, 1, 'A', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'C'];
const innerPlanetTags = ['', '', '', '', '', '', '', '', '', '', '', '', ''];

const outerPlanetAtmosphere = [0, 0, 1, 1, 1, 'A', 'A', 'B', 'B', 'B', 'C', 'B', 'C'];
const outerPlanetTags = ['', '', '', '', '', '', '', '', '', 'Cl', 'Cl', '', ''];

const satelliteNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const capturedPlanets = [1, 1, 2, 2, 3, 3, 3];
const emptyOrbits = [1, 1, 2, 3, 3, 3, 3, 3];

const habitableAtmosphere = [5, 6, 8];
const habitableHydrographics = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const semiHabitableAtmosphere = [2, 3, 4, 5, 6, 7, 8, 9, 13, 14, 15];
const semiHabitableHydrographics = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const maxAuForOrbit = [0.3, 0.55, 0.85, 1.3, 2.2, 4, 7.4, 14.8, 29.2, 58, 115.6, 230.8, 461, 922, 1844, 3687, 7373, 14747, 29491, 59000];

function rollDie(sides) {
    return dice.rollDie(sides);
}

function d6(dm, maxValue, minValue) {
    return dice.d6(dm, maxValue, minValue);
}

function d6d6(dm, maxValue, minValue) {
    return dice.d6d6(dm, maxValue, minValue);
}

function toHexString(val) {
    return val.toString(16).toUpperCase();
}

function uppToString(upp) {
    let size = 'S';
    if ((upp.size == 'S') || (upp.size == 'R')) {
        size = upp.size;
    } else {
        size = toHexString(upp.size);
    }
    return upp.starport 
        + size 
        + toHexString(upp.atmosphere)
        + toHexString(upp.hydrographics) 
        + toHexString(upp.population) 
        + toHexString(upp.government) 
        + toHexString(upp.lawLevel) 
        + '-' + toHexString(upp.techLevel);
}
module.exports.uppToString = uppToString;

function hasSystem() {
    return d6() > 3;
}

function starport() {    
    return starportData[d6d6()];
}
module.exports.starport = starport;

function navalBase(starport) {
    switch (starport) {
        case 'A':
        case 'B':
            return d6d6() > 7;      
    }
    return false;
}
module.exports.navalBase = navalBase;

function scoutBase(starport) {
    let dm = 0;
    switch (starport) {
        case 'A':
            dm = -3;
            break;
        case 'B':
            dm = -2;
            break;
        case 'C':
            dm = -1;
            break;
        case 'E':
        case 'X':
            return false;
    }
    return d6d6(dm) > 6;
}
module.exports.scoutBase = scoutBase;

function hasGG(forceGG, forceNoGG) {
    if (forceGG) {       
        return true;
    } else if (forceNoGG) { 
        return false;
    }
    return d6d6() < 10;
}

function hasPlanetoids() {
    return d6d6() < 7;
}

function uppStruct(sport, siz, atm, hyd, pop, gov, law, techLevel, tags, remarks) {
    if (!tags) {
        tags = [];
    }
    if (!remarks) {
        remarks = '';
    }
    return {
        starport: sport,
        size: siz,
        atmosphere: atm,
        hydrographics: hyd,
        population: pop,
        government: gov,
        lawLevel: law,
        techLevel: techLevel,
        tags: tags,
        remarks
    };
}

function applyReducing(atm) {
    if (semiHabitableAtmosphere.includes(atm)) {
        if (rollDie(REDUCING_FACTOR) > 1) {
            atm = 10;
        }
    }
    return atm;
}

function generateAtmosphere(size, inner, outer) {
    let atmDM = -7+size;
    if (inner || outer) {
        atmDM -= 2;
    }
    let atm = d6d6(atmDM);
    if (size == 0) {
        atm = 0;
    }
    if ((size < 4) && (atm > 1)) {
        atm = 1;
    }
    return atm;
}

function generateHydrographics(size, atm, inner, outer) {
    let hydDM = -7+atm;
    if (outer) {
        hydDM -= 4;
    }
    if (atm < 2) {
        hydDM -= 4;
    }
    if (atm > 9) {
        hydDM -= 4;
    }
    let hyd = d6d6(hydDM);
    if (size < 2) {
        hyd = 0;
    }
    if (inner) {
        hyd = 0;
    }
    return hyd;
}

function generateMainWorldTags(upp) {
    let tags = [];
    if (tradeCodes.isAg(upp)) {
        tags.push('Ag');
    }
    if (tradeCodes.isAs(upp)) {
        tags.push('As');
    }
    if (tradeCodes.isBa(upp)) {
        tags.push('Ba');
    }
    if (tradeCodes.isDe(upp)) {
        tags.push('De');
    }
    if (tradeCodes.isFl(upp)) {
        tags.push('Fl');
    }
    if (tradeCodes.isGa(upp)) {
        tags.push('Ga');
    }
    if (tradeCodes.isHi(upp)) {
        tags.push('Hi');
    }
    if (tradeCodes.isHt(upp)) {
        tags.push('Ht');
    }
    if (tradeCodes.isIc(upp)) {
        tags.push('Ic');
    }
    if (tradeCodes.isIn(upp)) {
        tags.push('In');
    }
    if (tradeCodes.isLo(upp)) {
        tags.push('Lo');
    }
    if (tradeCodes.isLt(upp)) {
        tags.push('Lt');
    }
    if (tradeCodes.isNa(upp)) {
        tags.push('Na');
    }
    if (tradeCodes.isNi(upp)) {
        tags.push('Ni');
    }
    if (tradeCodes.isPo(upp)) {
        tags.push('Po');
    }
    if (tradeCodes.isRi(upp)) {
        tags.push('Ri');
    }
    if (tradeCodes.isWa(upp)) {
        tags.push('Wa');
    }
    if (tradeCodes.isVa(upp)) {
        tags.push('Va');
    }
    return tags;
}

function populateSecondaryWorld(mainWorldUPP, upp, inner, outer) {
    let popDM = -4;
    if (inner | outer) {
        popDM -= 5;
    }
    switch (upp.atmosphere) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 7:
        case 9:
        case 10:
        case 11:
        case 12:
            popDM -= 2;
            break;
    }
    let pop = 0;
    let gov = 0;
    let law = 0;
    let techLevel = 0;
    if (mainWorldUPP) {
        pop = d6d6(popDM);
        if (pop >= mainWorldUPP.population) {
            pop = mainWorldUPP.population - 1;
        }
        if (mainWorldUPP.population == 0) {
            pop = 0;
        }
        let govDM = 0;
        if (mainWorldUPP.government >= 7) {
            govDM = 2;
        }
        gov = subordinateGovernmentData[d6(govDM)];
        if (mainWorldUPP.government == 6) {
            gov = 6;
        }
        law = d6(mainWorldUPP.lawLevel - 3, 15);
        techLevel = mainWorldUPP.techLevel - 1;
        if (techLevel < 0) {
            techLevel = 0;
        }
    }

    let tags = [];
    if (inner) {
        upp.atmosphere = innerPlanetAtmosphere[upp.atmosphere];
        tags.push(innerPlanetTags[upp.atmosphere]);        
    }
    if (outer) {
        upp.atmosphere = outerPlanetAtmosphere[upp.atmosphere];
        tags.push(outerPlanetTags[upp.atmosphere]);
    }

    // @@todo - subordinate facilities
    let sportDM = 0;
    if (pop >= 6) {
        sportDM +=2;
    }
    if (pop == 1) {
        sportDM -= 2;
    }
    let sport = spaceportData[d6(sportDM)];
    if (pop == 0) {
        sport = 'Y';
        law = 0;
        gov = 0;
        techLevel = 0;
    }
    
    upp = uppStruct(
        sport, 
        upp.size, 
        upp.atmosphere, 
        upp.hydrographics, 
        pop, 
        gov, 
        law, 
        techLevel, 
        [], 
        upp.remarks);
    upp.tags = generateMainWorldTags(upp);
    return upp;
}
module.exports.populateWorld = populateWorld;

function populateWorld(upp, pop, sport) {
    // console.log('populateWorld(upp, ' + pop + ', ' + sport + ')');
    if (pop == null) {
        pop = d6d6(-2);
        // console.log('gen pop ' + pop);
    }
    let gov = d6d6(-7+pop);
    let law = d6d6(-7+gov, 15);
    let techDM = 0;
    switch (sport) {
        case 'A':
            techDM += 6;
            break;
        case 'B':
            techDM += 4;
            break
        case 'C':
            techDM += 2;
            break;
        case 'X':
            techDM -= 4;
            break;
    }
    switch (upp.size) {
        case 0:
        case 1:
            techDM += 2;
            break;
        case 2:
        case 3:
        case 4:
            techDM += 1;
            break;
    }
    if (upp.atmosphere < 4) {
        techDM += 1;
    }
    if (upp.atmosphere > 9) {
        techDM += 1;
    }
    switch (upp.hydrographics) {
        case 9:
            techDM += 1;
            break;
        case 10:
            techDM += 2;
            break;
    }
    switch (pop) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            techDM += 1;
            break;
        case 9:
            techDM += 2;
            break;
        case 10:
            techDM += 4;
            break;
    }
    switch (gov) {
        case 0:
        case 5:
            techDM += 1;
            break;
        case 13:
            techDM -= 2;
            break;
    }
    let techLevel = d6(techDM, MAX_TECH, 0);
    if (pop == 0) {
        gov = 0;
        law = 0;
        techLevel = 0;
        sport = 'X';
    }
    
    upp = uppStruct(
        sport, 
        upp.size, 
        upp.atmosphere, 
        upp.hydrographics, 
        pop, 
        gov, 
        law, 
        techLevel, 
        [], 
        upp.remarks);
    upp.tags = generateMainWorldTags(upp);
    return upp;
}
module.exports.populateWorld = populateWorld;

function generateMainWorld(pop, reducing) {
    let sport = starport();
    if (pop == 0) {
        sport = 'X';
    }
    let siz = d6d6(-2);
    let atm = generateAtmosphere(siz, false, false);
    if (reducing) {
        atm = applyReducing(atm);
    }
    let hyd = generateHydrographics(siz, atm, false, false);
    let upp = uppStruct(sport, siz, atm, hyd, 0, 0, 0, 0, [], MAIN_WORLD);
    upp = populateWorld(upp, pop, sport);
    // console.log('New UPP ' + JSON.stringify(upp));
    return upp;
}
module.exports.generateMainWorld = generateMainWorld;

function generateSecondaryWorld(star, orbit, inner, outer, mainWorldUPP, reducing) {
    let sizDM = -2;
    switch (orbit) {
        case 0:
            sizDM -= 5;
            break;
        case 1:
            sizDM -= -4;
            break;
        case 2:
            sizDM -= 2;
            break;
    }
    if (star.stellarClass.startsWith('M')) {
        sizDM -= 2;
    }
    let siz = d6d6(sizDM);
    let atm = generateAtmosphere(siz, inner, outer, reducing);
    let hyd = generateHydrographics(siz, atm, inner, outer);
    if (siz <= 0) {
        siz = 'S';
    }
    if (reducing) {
        atm = applyReducing(atm);
    }
    let upp = uppStruct('Y', siz, atm, hyd, 0, 0, 0, 0, []);
    upp = populateSecondaryWorld(mainWorldUPP, upp, inner, outer);
    return upp;
}

function generateSatelliteWorld(primary, inner, outer, mainWorldUPP, reducing) {
    let siz = 0;
    // Size is allowed to be negative...
    if (primary == 'Large Gas Giant') {
        siz = d6d6() - 4;
    } else if (primary == 'Small Gas Giant') {
        siz = d6d6() - 6;
    } else {
        let psize = primary.size;
        if (isNaN(psize)) {
            psize = 0;
        }
        siz = psize - d6();
    }
    let atm = generateAtmosphere(siz, inner, outer);
    let hyd = generateHydrographics(siz, atm, inner, outer);
    if (siz == 0) {
        siz = 'R';
    } else if (siz < 0) {
        siz = 'S';
    }
    if (reducing) {
        atm = applyReducing(atm);
    }
    let upp = uppStruct('Y', siz, atm, hyd, 0, 0, 0, 0, []);
    upp = populateSecondaryWorld(mainWorldUPP, upp, inner, outer);
    return upp;
}

function numStars() {
    let val = d6d6();
    if (val == 12) {
        return 3;
    }
    if (val < 8) {
        return 1;
    }
    return 2;
}

function starWithData(stellarClass, luminosity) {
    return {
        type: STAR,
        stellarClass: stellarClass,
        size: null,
        luminosity: luminosity
    };
}
module.exports.starWithData = starWithData;

function star(stellarClass, size) {
    const subBrightnessData = ['0', '0', '0', '0', '5', '5', '5'];
    // No B0-F0VI, no K5-M5IV
    const forbiddenVI = ['B0', 'B5', 'A0', 'A5', 'F0'];
    const forbiddenIV = ['K5', 'M0', 'M5'];
    let sclass = stellarClass + subBrightnessData[d6()];
    if ((size == 'IV') && (forbiddenIV.includes(sclass))) {
        size = 'V';
    }
    if ((size == 'VI') && (forbiddenVI.includes(sclass))) {
        size = 'V';
    }
    let sc = stellarClass + subBrightnessData[d6()];
    if (size == 'D') {
        // Dwarves have no size
        sc = stellarClass;
    }
    let luminosity = luminosityData[size][sc];
    let star = starWithData(stellarClass + size, luminosity);
    star.size = size;
    return star;
}

function companionOrbit(maxOrbit, dm) {
    let val = d6d6(dm);
    let orbit = 0;
    switch (val) {
        case 0:
        case 1:
        case 2:
        case 3:
            orbit = 0;
            break;
        case 4:
            orbit = 1;
            break;
        case 5:
            orbit = 2;
            break;
        case 6:
            orbit = 3;
            break;
        case 7:
            orbit = d6(4);
            break;
        case 8:
            orbit = d6(5);
            break;
        case 9:
            orbit = d6(6);
            break;
        case 10:
            orbit = d6(7);
            break;
        case 11:
            orbit = d6(8);
            break;
        case 12:
            orbit = -1;
            break;
    }
    if (orbit > maxOrbit) {
        orbit = -1;
    }
    return orbit;
}

function orbitItem(distance, item, minOrbit) {
    let od = orbitDistance[distance+minOrbit];
    if (!od) {
        od = 'Far';
    }
    let newItem = {...item, ...{ distance: od }};
    return newItem;
}

function habZoneOrbitFromAu(au) {
    for (var orbit = 0; orbit < maxAuForOrbit.length; orbit++) {
        if (au < maxAuForOrbit[orbit]) {
            return orbit;
        }
    }
    return -1;
}
module.exports.habZoneOrbitFromAu = habZoneOrbitFromAu;

function placeInOrbit(system, item, orbit, minOrbit) {
    if (orbit >= 0) {
        system.orbits[orbit] = orbitItem(orbit, item, minOrbit);
        system.orbitsRemaining--;
    } else {
        system.orbits.push(orbitItem(orbit, item, minOrbit));
    }
}

function findEmptyOrbit(system) {
    let orbit = rollDie(system.orbitsRemaining)-1;
    for (var i = 0; i < system.maxOrbits; i++) {
        if (!system.orbits[i]) {
            orbit--;
            if (orbit == 0) {
                return i;
            }
        }
    }
    // Stick on another orbit at the end
    system.maxOrbits++;
    system.orbits.push(undefined);
    return system.maxOrbits-1;
}

function _world(type, upp, satellites) {
    if (!satellites) {
        satellites = [];
    }
    return {
        type: type,
        world: upp,
        satellites: satellites
    };
}

function world(upp, satellites) {
    return _world(PLANET, upp, satellites);
}

function gasGiant(type, satellites) {
    return _world(GAS_GIANT, type, satellites);
}

function planetoidBelt() {
    return { type: PLANETOID_BELT };
}

function emptyOrbit() {
    return { type: EMPTY };
}

function gasGiantSatelliteOrbit(size) {
    let val = d6d6();
    let orbit = closeCompanionOrbitDistance[d6d6(-2)];
    if (8 <= val < 12 ) {
        orbit = farCompanionOrbitDistance[d6d6(-2)];
    } else if (val == 12) {
        orbit = extremeCompanionOrbitDistance[d6d6(-2)];
    }
    if (size == 'R') {
        orbit = ringOrbitDistance[d6(-1)];
    }
    return orbit;
}

function terrestrialSatelliteOrbit(size) {
    let val = d6d6();
    let orbit = closeCompanionOrbitDistance[d6d6(-2)];
    if (8 <= val) {
        orbit = farCompanionOrbitDistance[d6d6(-2)];
    }
    if (size == 'R') {
        orbit = ringOrbitDistance[d6(-1)];
    }
    return orbit;
}

function createOrbits(count) {
    let orbits = [];
    for (var i = 0; i < count; i++) {
        orbits[i] = undefined;
    }
    return orbits;
}

function generateCompanionStar(primaryClassRoll, primarySizeRoll, brownDwarf) {
    if (brownDwarf) {
        return star(companionBrownDwarfClassData[d6d6(primaryClassRoll)], 'D');
    }
    return star(
        companionClassData[d6d6(primaryClassRoll)],
        companionSizeData[d6d6(primarySizeRoll)]
        );
}

function generateStellarSystem(upp, brownDwarf) {
    // Generate the number of stars
    let stars = numStars();
    // Generate the star DM
    let dm = 0;
    if (upp) {
        if (upp.population > 7) {
            // console.log('Adding primary population DM');
            dm = 5;
        }
        if ((4 <= upp.atmosphere) && (upp.atmosphere <= 9)) {
            // console.log('Adding primary atmosphere DM');
            dm = 5;
        }
    }    
    // Primary
    let primaryClassRoll = d6d6(dm);
    let stellarClass = stellarClassData[primaryClassRoll];
    let primarySizeRoll = d6d6(dm);
    let size = stellarSizeData[primarySizeRoll];
    if (brownDwarf) {
        stellarClass = brownDwarfClassData[primaryClassRoll];
        size = 'D';
    }
    // stellarClass = 'F';
    // size = 'V';
    // console.log('Primary ' + stellarClass + ' ' + size + ' DM: ' + dm);
    let primary = star(stellarClass, size);
    // Max orbits
    let maxOrbitsDM = maxOrbitsClassDMData[primaryClassRoll] + maxOrbitsSizeDMData[primarySizeRoll];
    let maxOrbits = d6d6(maxOrbitsDM);
    // Find the surface of the star, the minimum orbit, and the habitable zone
    let surface = surfaceData[primary.size][primary.stellarClass];
    let minOrbit = innerData[primary.size][primary.stellarClass];
    let habZone = habitableData[primary.size][primary.stellarClass];
    // Now generate the initial system data
    let system = newSystem(primary, maxOrbits, surface, minOrbit, habZone);

    // Companion stars?
    if (stars >= 2) {
        let companion = generateCompanionStar(primaryClassRoll, primarySizeRoll, brownDwarf);
        addCompanionStar(companion, system);
        if (stars == 3) {
            let val = companionOrbit(maxOrbits, 4);
            // if (val == orbit) {
            //     val = -1;
            // }
            companion = generateCompanionStar(primaryClassRoll+4, primarySizeRoll+4, brownDwarf);
            addCompanionStarToOrbit(companion, system, val);
        }
    }
    return system;
}
module.exports.generateStellarSystem = generateStellarSystem;

function addCompanionStarToOrbit(companion, system, orbit) {
    system.stars += 1;
    placeInOrbit(system, companion, orbit, system.minOrbit);
    return system;
}
module.exports.addCompanionStarToOrbit = addCompanionStarToOrbit;

function addCompanionStar(companion, system) {
    let orbit = companionOrbit(system.maxOrbits);
    addCompanionStarToOrbit(companion, system, orbit);
    return system;
}
module.exports.addCompanionStar = addCompanionStar;

function newSystem(primary, maxOrbits, surface, minOrbit, habZone) {
    let system = {
        stars: 1,
        primary: primary,
        surface: surface,
        minOrbit: minOrbit,
        maxOrbits: maxOrbits,
        orbitsRemaining: maxOrbits,
        habZone: habZone
    };
    system['orbits'] = createOrbits(system.maxOrbits);
    return system;
}
module.exports.newSystem = newSystem;

function generateGasGiant(ggOrbit, habZone, upp, reducing) {
    // @@todo - classes of gas giants?
    let ggType = LGG;
    let ggSatDM = 0;
    if (rollDie(2) == 2) {
        ggType = SGG;
        let ggSatDM = -4;
    }
    let satCount = d6d6(ggSatDM);
    // Generate satellites
    let sats = [];
    // generateSatelliteWorld(primary, inner, outer, mainWorldUPP)
    let inner = (ggOrbit < habZone);
    let outer = (ggOrbit > habZone);
    for (var i = 0; i < satCount; i++) {
        let sat = generateSatelliteWorld(ggType, inner, outer, upp, reducing);
        let orbit = gasGiantSatelliteOrbit(sat.size);
        sats.push({
            orbit: orbit,
            world: sat
        })
    }
    sats.sort(function(a, b) {
        return a.orbit - b.orbit;
    });
    return gasGiant(ggType, sats)
}

function generateSatellites(inner, outer, upp, reducing) {
    // Generate satellites
    let sats = [];
    let satCount = d6(-3);
    // generateSatelliteWorld(primary, inner, outer, mainWorldUPP)
    for (var i = 0; i < satCount; i++) {
        let sat = generateSatelliteWorld(upp, inner, outer, upp, reducing);
        let orbit = terrestrialSatelliteOrbit(sat.size);
        sats.push({
            orbit: orbit,
            world: sat
        })
    }
    sats.sort(function(a, b) {
        return a.orbit - b.orbit;
    });
    return sats;
}

function finishSystem(system, upp, forceGG, forceNoGG, reducing) {
    let primary = system.primary;
    // Find the surface of the star, the minimum orbit, and the habitable zone
    let surface = system.surface;
    let minOrbit = system.minOrbit;
    let habZone = system.habZone;

    // Captured planets
    // @@todo - write me... Do I care? Do captured planets add anything?
    let cpDM = 0;
    if ((primary.stellarClass == 'B') || (primary.stellarClass == 'A')) {
        cpDM = 1;
    }
    // Empty orbits
    // if (d6(cpDM) >= 5) {
        let empty = emptyOrbits[d6(cpDM)];
        for (var i = 0; i < empty; i++) {
            let o = d6d6();
            if ((system.orbits.length > o) && (system.orbits[o] == undefined)) {
                placeInOrbit(system, emptyOrbit(), o, minOrbit);
            }
        }
    // }

    // Presence, quantity, and orbits of gas giants
    if (hasGG(forceGG, forceNoGG)) {
        let count = gasGiantQtyData[d6d6()];
        if (count > system.orbitsRemaining) {
            count = system.orbitsRemaining;
        }
        system.orbitsRemaining -= count;
        // The book 6 rules say GGs can only exist in habitable and outer zones
        // But we now know that hot jupiters are a thing, so...
        while(count > 0) {
            let ggOrbit = findEmptyOrbit(system);
            placeInOrbit(system, generateGasGiant(ggOrbit, habZone, upp, reducing), ggOrbit, minOrbit);
            count--;
        }
    }

    // Place main world in habitable zone
    //      (it can be a moon of another planet if the hab zone is occupied)
    // We're doing this before the planetoid belts despite what book 6 says, because
    // we also want the main world in the hab zone
    if (upp) {
        if (!system.orbits[habZone]) {
            system.orbitsRemaining--;
            // Generate satellites
            let sats = generateSatellites(false, false, upp, reducing);
            placeInOrbit(system, world(upp, sats), habZone, minOrbit);
        } else {
            if (!system.orbits[habZone].satellites) {
                system.orbits[habZone].satellites = [];
                system.orbits[habZone].satellites.push({ 
                    world: upp,
                    orbit: gasGiantSatelliteOrbit() 
                })
            } else {
                let satOrbit = rollDie(system.orbits[habZone].satellites.length)-1;
                while(system.orbits[habZone].satellites[satOrbit].world.size == 'R') {
                    satOrbit++;
                }
                system.orbits[habZone].satellites[satOrbit].world = upp;
            }
        }
    }

    // Presence, quantity, and orbits of planetoid belts
    if (hasPlanetoids()) {
        let count = planetoidQtyData[d6d6()];
        if (count > system.orbitsRemaining) {
            count = system.orbitsRemaining;
        }
        system.orbitsRemaining -= count;
        while(count > 0) {
            placeInOrbit(system, planetoidBelt(), findEmptyOrbit(system), minOrbit);
            count--;
        }
    }

    // Generate worlds for the other orbits
    // generateSecondaryWorld(star, orbit, inner, outer, mainWorldUPP)
    for (let orbit = 0; orbit < system.orbits.length; orbit++) {
        if (!system.orbits[orbit]) {
            let inner = (orbit < habZone);
            let outer = (orbit > habZone);
            let secondary = generateSecondaryWorld(primary, orbit, inner, outer, upp, reducing);
            // Generate satellites
            let sats = generateSatellites(inner, outer, secondary, reducing);
            placeInOrbit(
                system, 
                world(
                    secondary,
                    sats,
                ),
                orbit, 
                minOrbit);
        }
    }

    // @@ todo generate bodies in companion stars

    // @@todo detect main world, if we otherwise don't have one...
    if (!upp) {
        let aWorld = findMainWorld(system, habZone, minOrbit);
        system.mainWorldUPP = aWorld.world;
    }

    return system;
}
module.exports.finishSystem = finishSystem;

// Generates a system structure, given an existing UPP
function generateSystem(upp, forceGG, forceNoGG, brownDwarf, reducing) {
    let system = generateStellarSystem(upp, brownDwarf);
    return finishSystem(system, upp, forceGG, forceNoGG, reducing);
}
module.exports.generateSystem = generateSystem;

// Generates a rogue world
function generateRogueWorld() {
    // Call it a 50/50 chance of generating a gas giant or rocky planet
    if (d6(-3) > 0) {
        // Rocky world
        let sport = 'X';
        let siz = d6d6(-2);
        let atm = generateAtmosphere(siz, false, true);
        // All rogue planets are reducing
        atm = applyReducing(atm);
        let hyd = generateHydrographics(siz, atm, false, true);
        let upp = uppStruct(sport, siz, atm, hyd, 0, 0, 0, 0, [], MAIN_WORLD);
        let sats = generateSatellites(false, true, upp, true);
        return {
            stars: 0,
            orbits: [
                world(upp, sats)
            ],
            mainWorldUPP: upp
        }
    } else {
        // Gas giant
        let gg = generateGasGiant(1, 0, null, true);
        let upp = gg.satellites[gg.satellites.length-1].world;
        upp.starport = 'X';
        return {
            stars: 0,
            orbits: [
                gg
            ],
            mainWorldUPP:upp
        }
    }
}
module.exports.generateRogueWorld = generateRogueWorld;

// Generates a system structure, given an existing UPP
function generateSystemFromHybData(hyb) {

    let system = generateStellarSystem(upp, brownDwarf);
    return finishSystem(system, upp, forceGG, forceNoGG, reducing);
}
module.exports.generateSystem = generateSystem;

function findMainWorld(system, habZone, minOrbit) {
    // console.log('+++findMainWorld(system, ' + habZone + ')');
    // Criteria for a main world?
    // Best: World in the hab zone with a breathable atmosphere
    // Next: World outside of the hab zone with a breathable atmosphere
    // Next: World in the hab zone with a semi-breathable atmosphere
    // Next: World outside of the hab zone with a semi-breathable atmosphere
    // Next: World in the hab zone
    // Next: Pick a world
    let aWorld = system.orbits[habZone];

    // Breathable and semi-breathable worlds in the hab zone
    let hzBreathable = null;
    let hzSemiBreathable = null;
    let hzWorld = null;
    // console.log('Checking hab zone...');
    if (aWorld) {
        if (aWorld.upp) {
            if (isHabitable(aWorld.world)) {
                // console.log('Found a breathable world');
                hzBreathable = aWorld;
            } else if (isSemiHabitable(aWorld.world)) {
                // console.log('Found a semi-breathable world');
                hzSemiBreathable = aWorld;
            }
            // console.log('Found a hab zone world...');
            hzWorld = aWorld;
        } else {
            // console.log('Checking hab zone satellites...');
            if (aWorld.satellites) {
                for (var j = 0; j < aWorld.satellites.length; j++) {
                    let sat = aWorld.satellites[j];
                    if (sat && sat.world) {
                        if (isHabitable(sat.world)) {
                            // console.log('Found a breathable world');
                            hzBreathable = sat;
                        } else if (isSemiHabitable(sat.world)) {
                            // console.log('Found a semi-breathable world');
                            hzSemiBreathable = sat;
                        }
                        // If it's not breathable, then at least look for the biggest...
                        if (hzWorld) {
                            if (hzWorld.world.size < sat.world.size) {
                                // console.log('Found a hab zone satellite...');
                                hzWorld = sat;
                            }
                        }
                    }
                }
            }
        }
    }

    // Breathable and semi-breathable worlds outside of the hab zone
    let breathable = null;
    let semiBreathable = null;
    // console.log('Checking for breathable/semi-breathable worlds outside of hab zone...');
    for (var i = 0; i < system.orbits.length; i++) {
        aWorld = system.orbits[i];
        if (aWorld) {
            if (aWorld.upp) {
                if (isHabitable(aWorld.world)) {
                    // console.log('Found a breathable world');
                    breathable = aWorld;
                } else if (isSemiHabitable(aWorld.world)) {
                    // console.log('Found a semi-breathable world');
                    semiBreathable = aWorld;
                }
            } else {
                // console.log('Checking satellites...');
                if (aWorld.satellites) {
                    for (var j = 0; j < aWorld.satellites.length; j++) {
                        let sat = aWorld.satellites[j];
                        if (sat && sat.world) {
                            if (isHabitable(sat.world)) {
                                // console.log('Found a breathable world');
                                breathable = sat;
                            } else if (isSemiHabitable(sat.world)) {
                                // console.log('Found a semi-breathable world');
                                semiBreathable = sat;
                            } 
                        }
                    }
                }                
            }
        }
    }
    
    if (hzBreathable) {
        // console.log('---findMainWorld(system, ' + habZone + ')');
        return convertToMainWorld(hzBreathable);
    }
    if (breathable) {
        // console.log('---findMainWorld(system, ' + habZone + ')');
        return convertToMainWorld(breathable);
    }
    if (hzSemiBreathable) {
        // console.log('---findMainWorld(system, ' + habZone + ')');
        return convertToMainWorld(hzSemiBreathable);
    }
    if (semiBreathable) {
        // console.log('---findMainWorld(system, ' + habZone + ')');
        return convertToMainWorld(semiBreathable);
    }
    if (hzWorld) {
        // console.log('---findMainWorld(system, ' + habZone + ')');
        return convertToMainWorld(hzWorld);
    }

    // Pick *something*. Anything.
    // If there is a planetary belt, pick that
    // console.log('findPlanetoidBelt()');
    let index = findPlanetoidBelt(system, habZone);
    // console.log('index: ' + index);
    if (index) {
        aWorld = convertToMainWorld(system.orbits[index]);
        placeInOrbit(system, aWorld, index, minOrbit);
    } else {
        // console.log('anyWorld()');
        aWorld = anyWorld(system, habZone);
    }
    if (aWorld) {
        aWorld = convertToMainWorld(aWorld);
    } else {
        // console.log('Faking a planetoid belt...');
        // Add a planetoid belt in the next orbit out
        index = system.orbits.length;
        system.maxOrbits++;
        system.emptyOrbits++;
        aWorld = convertToMainWorld(planetoidBelt());
        placeInOrbit(system, aWorld, index, minOrbit);
    }    

    // console.log('---findMainWorld(system, ' + habZone + ')');
    return aWorld;
}

function convertToMainWorld(aWorld) {
    // Convert planetoid belts to main world style belts
    if (aWorld.type == PLANETOID_BELT) {
        // console.log('Converting belt to main world...');
        let upp = uppStruct('X', 0, 0, 0, 0, 0, 0, 0, [], MAIN_WORLD);
        upp.tags = generateMainWorldTags(upp);
        aWorld = world(upp, []);
    }

    aWorld.world.starport = 'X';
    aWorld.world.remarks = MAIN_WORLD;
    aWorld.world.tags = generateMainWorldTags(aWorld.world);
    return aWorld;
}

function findPlanetoidBelt(system, habZone) {
    // Cooler is better than hotter
    for (var i = habZone; i < system.orbits.length; i++) {
        let world = system.orbits[i];
        if (world && (world.type == PLANETOID_BELT)) {
            return i;
        }
    }
    if (habZone > system.orbits.length) {
        habZone = system.orbits.length;
    }
    for (var i = 0; i < habZone; i++) {
        let world = system.orbits[i];
        if (world && (world.type == PLANETOID_BELT)) {
            return i;
        }
    }
    return null;
}

function acceptableWorld(world) {
    // console.log('+++acceptableWorld(' + JSON.stringify(world) + ')');
    if (world) {
        if (world.type == PLANET) {
            // console.log('---acceptableWorld() - planet');
            return world;
        }
        // We are explicitly doing this starting at 1, to avoid the closest moon
        if (world.satellites) {
            for (var i = 1; i < world.satellites.length; i++) {
                let sat = world.satellites[i];
                if (sat && sat.type == PLANET) {
                    // console.log('---acceptableWorld() - sat');
                    return sat;
                }
            }
        }        
    }
    // console.log('---acceptableWorld() - null');
    return null;
}

function anyWorld(system, habZone) {
    // console.log('+++anyWorld()');
    // Cooler is better than hotter
    for (var i = habZone; i < system.orbits.length; i++) {
        let world = acceptableWorld(system.orbits[i]);
        if (world) {
            // console.log('---anyWorld()');
            return world;
        }

    }
    if (habZone > system.orbits.length) {
        habZone = system.orbits.length;
    }
    for (var i = 0; i < habZone; i++) {
        let world = acceptableWorld(system.orbits[i]);
        if (world) {
            // console.log('---anyWorld()');
            return world;
        }
    }
    // console.log('---anyWorld()');
    return null;
}

function isHabitable(upp) {
    return (habitableAtmosphere.includes(upp.atmosphere) 
        && habitableHydrographics.includes(upp.hydrographics));
}
module.exports.isHabitable = isHabitable;

function isSemiHabitable(upp) {
    return (semiHabitableAtmosphere.includes(upp.atmosphere) 
        && semiHabitableHydrographics.includes(upp.hydrographics));
}

function findSatelliteMainWorld(world) {
    for (var satOrbit = 0; satOrbit < world.satellites.length; satOrbit++) {
        let sat = world.satellites[satOrbit];
        if (sat.world) {
            if (sat.world.remarks == MAIN_WORLD) {
                return sat;
            }
        }
    }
    return null
}

function getMainWorld(system) {
    for (var orbit = 0; orbit < system.orbits.length; orbit++) {
        let item = system.orbits[orbit];
        switch (item.type) {
            case GAS_GIANT: {
                let sat = findSatelliteMainWorld(item);
                if (sat) {
                    return sat;
                }
            }
            break;
            case PLANET: {
                if (item.world.remarks == MAIN_WORLD) {
                    return item;
                }
                let sat = findSatelliteMainWorld(item);
                if (sat) {
                    return sat;
                }
            }
        }
    }
}
module.exports.getMainWorld = getMainWorld;

function worldCount(system) {
    let count = 0;
    for (var i = 0; i < system.orbits.length; i++) {
        switch (system.orbits[i].type) {
            case PLANETOID_BELT:
                // Fall-through
            case GAS_GIANT:
                // Fall-through
            case PLANET:
                count++;
            break;
        }
    }
    return count;
}
module.exports.worldCount = worldCount;

function printStellarClass(stellarClass, size) {
    let sep = ' ';
    if (size == 'D') {
        sep = '';
    }
    return (size) ? stellarClass + sep + size : stellarClass;
}
module.exports.printStellarClass = printStellarClass;

function printHabitableZone(habitableData) {
    if (habitableData >= 0) {
        return orbitDistance[habitableData];
    }
    return '0 AU';
}

function printStar(orbit, name, star, habZoneOrbit, con) {
    let starOrbit = 'Primary';
    if (star.distance) {
        starOrbit = star.distance;
    }
    let habZone = 'Habitable zone: ' + ((habZoneOrbit !== undefined) ? habZoneOrbit : printHabitableZone(habitableData[star.size][star.stellarClass]));
    var remarks = habZone;
    if (star.size) {
        let jumpLimit = 'Jump limit: ' + jumpLimitData[star.size][star.stellarClass] + ' AU';
        remarks = habZone + ' -- ' + jumpLimit;
    }
    con.log(starOrbit + ',,' + name + ',' + printStellarClass(star.stellarClass, star.size) + ',,' + remarks);
}

function printGasGiant(orbit, name, world, con) {
    con.log(world.distance + ',,' + name + ',' + world.world);
}

function printPlanetoidBelt(orbit, name, world, con) {
    con.log(world.distance + ',,' + name + ',' + 'Planetoid Belt');
}

function printWorld(orbit, name, world, con) {
    con.log(world.distance + ',,' + name + ',' + uppToString(world.world) + ',' 
        + world.world.tags.join(' ') + ',' + world.world.remarks);
}

function printSatellite(orbit, name, world, con) {
    con.log(',' + world.orbit + ',' + name + ',' + uppToString(world.world) + ',' 
        + world.world.tags.join(' ') + ',' + world.world.remarks);
}

function printSystem(name, system, con) {
    con.log('Orbit (AU),Satellite,Name,UPP,Tags,Remarks');
    if (system.stars > 0) {
        printStar('Primary', name + ' Prime', system.primary, system.habZone, con);
    }
    let companionCode = 'B';
    var index = 0;
    for (var orbit = 0; orbit < system.orbits.length; orbit++) {
        let item = system.orbits[orbit];
        let worldName = name + ' ' + (index + 1);
        // Rogue planets just take the system name
        if (system.stars == 0) {
            worldName = name;
        }
        switch (item.type) {
            case STAR: {
                let starName = name + ' ' + companionCode;
                companionCode = 'C';
                printStar(orbit, starName, item, null, con);
                index++;
            }
            break;
            case PLANETOID_BELT: {
                printPlanetoidBelt(orbit, worldName, item, con);
                index++;
            }
            break;
            case GAS_GIANT: {
                printGasGiant(orbit, worldName, item, con);

                for (var satOrbit = 0; satOrbit < system.orbits[orbit].satellites.length; satOrbit++) {
                    let satName = worldName + ' ' + satelliteNames[satOrbit];
                    printSatellite(satOrbit, satName, system.orbits[orbit].satellites[satOrbit], con);
                }
                index++;
            }
            break;
            case EMPTY:
                // Noop
            break;
            default: {
                printWorld(orbit, worldName, item, con);

                for (var satOrbit = 0; satOrbit < system.orbits[orbit].satellites.length; satOrbit++) {
                    let satName = worldName + ' ' + satelliteNames[satOrbit];
                    printSatellite(satOrbit, satName, system.orbits[orbit].satellites[satOrbit], con);
                }
                index++;
            }
            break;
        }
    }
}
module.exports.printSystem = printSystem;
