'uses strict';

const sysgenlib = require('./sysgenlib.js');
const dice = require('./dice.js');
var allegiances = require('./allegiances.js');

const fs = require('fs');

const popOverride = [
    {
        // A
        min: 0,
        max: 0,
        step: 0,
    },
    {
        // B
        min: 0,
        max: 0,
        step: 0,
    },
    {
        // C
        min: 0,
        max: 0,
        step: 0,
    },
    {
        // D
        min: 0,
        max: 0,
        step: 0,
    },
    {
        // E
        min: 0,
        max: 60,
        step: 10,
    },
    {
        // F
        min: 10,
        max: 60,
        step: 10,
    },
    {
        // G
        min: 20,
        max: 60,
        step: 10,
    },
    {
        // H
        min: 10,
        max: 60,
        step: 10,
    },
    {
        // I
        min: 60,
        max: 100,
        step: 0,
    },
    {
        // J
        min: 60,
        max: 100,
        step: 0,
    },
    {
        // K
        min: 60,
        max: 100,
        step: 0,
    },
    {
        // L
        min: 60,
        max: 100,
        step: 0,
    },
    {
        // M
        min: 70,
        max: 100,
        step: 0,
    },
    {
        // N
        min: 70,
        max: 100,
        step: 0,
    },
    {
        // O
        min: 70,
        max: 100,
        step: 0,
    },
    {
        // P
        min: 70,
        max: 100,
        step: 0,
    }
];
module.exports.popOverride = popOverride;

const BROWN_DWARFS_PER_SIX_STARS = 1;

const DENSITY_RIFT = 0;
const DENSITY_SPARSE = 1;
const DENSITY_SCATTERED = 2;
const DENSITY_STANDARD = 3;
const DENSITY_DENSE = 4;

const DENSITY = DENSITY_SCATTERED;

const ROGUE = 'Rogue';

const subsectors = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
module.exports.subsectors = subsectors;
const colStart = [1, 9, 17, 25, 1, 9, 17, 25, 1, 9, 17, 25, 1, 9, 17, 25];
const rowStart = [1, 1, 1, 1, 11, 11, 11, 11, 21, 21, 21, 21, 31, 31, 31, 31];

function genCoords(subsector) {
    let coords = [];
    for (var col = 0; col < 8; col++) {
        for (var row = 0; row < 10; row++) {
            let coord = {
                coord: (col+colStart[subsector]).toString().padStart(2, 0) +
                (row+rowStart[subsector]).toString().padStart(2, 0),
                row: row+rowStart[subsector],
                col: col+colStart[subsector],
                ssRow: row,
                ssCol: col
            }
            coords.push(coord);
        }
    }
    return coords;
}

function riftHasStar() {
    return (dice.d6d6() >= 12);
}

function sparseHasStar() {
    return (dice.d6() >= 6);
}

function scatteredHasStar() {
    return (dice.d6() >= 5);
}

function standardHasStar() {
    return (dice.d6() >= 4);
}

function denseHasStar() {
    return (dice.d6() >= 3);
}

function riftHasBrownDwarf() {    
    return ((dice.d6d6() >= 12) && (dice.d6() <= BROWN_DWARFS_PER_SIX_STARS));
}

function sparseHasBrownDwarf() {
    return ((dice.d6() >= 6) && (dice.d6() <= BROWN_DWARFS_PER_SIX_STARS));
}

function scatteredHasBrownDwarf() {
    return ((dice.d6() >= 5) && (dice.d6() <= BROWN_DWARFS_PER_SIX_STARS));
}

function standardHasBrownDwarf() {
    return ((dice.d6() >= 4) && (dice.d6() <= BROWN_DWARFS_PER_SIX_STARS));
}

function denseHasBrownDwarf() {
    return ((dice.d6() >= 3) && (dice.d6() <= BROWN_DWARFS_PER_SIX_STARS));
}

function hasStar(density) {
    switch (density) {
        case DENSITY_RIFT:
            return riftHasStar();
        case DENSITY_SPARSE:
            return sparseHasStar();
        case DENSITY_SCATTERED:
            return scatteredHasStar();
        case DENSITY_STANDARD:
            return standardHasStar();
        case DENSITY_DENSE:
            return denseHasStar();
    }
    return standardHasStar();
}

function hasBrownDwarf(density) {
    switch (density) {
        case DENSITY_RIFT:
            return riftHasBrownDwarf();
        case DENSITY_SPARSE:
            return sparseHasBrownDwarf();
        case DENSITY_SCATTERED:
            return scatteredHasBrownDwarf();
        case DENSITY_STANDARD:
            return standardHasBrownDwarf();
        case DENSITY_DENSE:
            return denseHasBrownDwarf();
    }
    return standardHasBrownDwarf();
}

function hasRoguePlanet(density) {
    // The density of rogue planets is the same as stars
    return hasStar(density);
}

function getPBG(upp, system) {
    let b = 0;
    let g = 0;
    for (var orbit = 0; orbit < system.orbits.length; orbit++) {
        let item = system.orbits[orbit];
        switch (item.type) {
            case 'Planetoid Belt': 
                b++;
                break;
            case 'Gas Giant':
                g++;
                break;
        }
    }
    let p = 0;
    if (upp) {
        p = dice.rollDie(10)-1;
        if (upp.population <= 0) {
            p = 0;
        } else if (upp.population == 10) {
            p = 1;
        }
    }    
    
    let PBG = p.toString() + b.toString() + g.toString();
    return PBG;
}

function hasScoutBase(upp) {
    let sport = 'X';
    if (upp) {
        sport = upp.starport;
    }
    let dm = 0;
    switch (sport) {
        case 'A':
            dm = -3;
            break;
        case 'B':
            dm = -2;
            break;
        case 'C':
            dm = -1;
            break;
        case 'D':
            break;
        case 'E':
            return false;
            break;
        case 'X':
            return false;
            break;
    }
    let val = dice.d6d6(dm);
    return (val >= 7);
}

function hasNavalBase(upp) {
    let sport = 'X';
    if (upp) {
        sport = upp.starport;
    }
    let dm = 0;
    switch (sport) {
        case 'A':
            break;
        case 'B':
            break;
        case 'C':
            return false;
            break;
        case 'D':
            return false;
            break;
        case 'E':
            return false;
            break;
        case 'X':
            return false;
            break;
    }
    let val = dice.d6d6(dm);
    return (val >= 8);
}

function getConsole(con) {
    if (!con) {
        return console;
    }
    return con;
}

const HEX_LENGTH = 4;
const NAME_LENGTH = 16;
const UWP_LENGTH = 9;
const REMARKS_LENGTH = 16;
const IX_LENGTH = 5;
const EX_LENGTH = 7;
const CX_LENGTH = 6;
const NOBILITY_LENGTH = 5;
const BASE_LENGTH = 2;
const ZONE_LENGTH = 1;
const PBG_LENGTH = 3;
const WORLDS_LENGTH = 2;
const ALLEGIANCE_LENGTH = 2;
const STELLAR_LENGTH = 7;

function trimAndPad(value, length, pad) {
    return value.toString().substr(0, length).padEnd(length, pad);
}

// Hex  Name        UWP       Remarks          {Ix}  (Ex)    [Cx]   N     B Z PBG W  A  Stellar
// ---- ----------- --------- ---------------- ----- ------- ------ ----- - - --- -- -- -------
// 0133 Emape       B564500-B Ag Ni Pr Da                                 N A 503 6  Im M0 V   
function _printFileLine(hex, name, uwp, remarks, ix, ex, cx, nobility, base, zone, pbg, worlds, allegiance, stellar, pad, con) {
    con.log(
        trimAndPad(hex, HEX_LENGTH, pad) + ' ' +
        trimAndPad(name, NAME_LENGTH, pad) + ' ' +
        trimAndPad(uwp, UWP_LENGTH, pad) + ' ' +
        trimAndPad(remarks, REMARKS_LENGTH, pad) + ' ' +
        trimAndPad(ix, IX_LENGTH, pad) + ' ' +
        trimAndPad(ex, EX_LENGTH, pad) + ' ' +
        trimAndPad(cx, CX_LENGTH, pad) + ' ' +
        trimAndPad(nobility, NOBILITY_LENGTH, pad) + ' ' +
        trimAndPad(base, BASE_LENGTH, pad) + ' ' +
        trimAndPad(zone, ZONE_LENGTH, pad) + ' ' +
        trimAndPad(pbg, PBG_LENGTH, pad) + ' ' +
        trimAndPad(worlds, WORLDS_LENGTH, pad) + ' ' +
        trimAndPad(allegiance, ALLEGIANCE_LENGTH, pad) + ' ' +
        trimAndPad(stellar, STELLAR_LENGTH, pad)
        );
}

function printFileHeader(con) {
    con = getConsole(con);
    _printFileLine('Hex', 'Name', 'UWP', 'Remarks', '{Ix}', '(Ex)', '[Cx]', 'N', 'B', 'Z', 'PBG', 'W', 'A', 'Stellar', ' ', con);
    _printFileLine('-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', con);
}
module.exports.printFileHeader = printFileHeader;

function printSubSectorHeader(name, sector, con) {
    con = getConsole(con);
    con.log('#');
    con.log('#SUB-SECTOR: ' + name + ' SECTOR: ' + sector);
    _printFileLine('#Hex', 'Name', 'UWP', 'Remarks', '{Ix}', '(Ex)', '[Cx]', 'N', 'B', 'Z', 'PBG', 'W', 'A', 'Stellar', ' ', con);
    _printFileLine('#-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', con);
}
module.exports.printSubSectorHeader = printSubSectorHeader;

function printSystem(name, coord, upp, bases, tags, zone, system, pbg, allegiance, con) {
    con = getConsole(con);
    let sclass = ROGUE;
    if (system.stars > 0) {
        sclass = sysgenlib.printStellarClass(system.primary.stellarClass, system.primary.size)
    }
    // Hex, Name, UWP, Remarks, Base, Zone, PBG, Worlds, Allegiance, Stellar
    _printFileLine(
        coord,
        name,
        sysgenlib.uppToString(upp), 
        tags,
        '',
        '',
        '',
        '',
        bases.toString(),
        zone,
        pbg, 
        sysgenlib.worldCount(system),
        allegiance,
        sclass,
        ' ',
        con);
}

function generateAndWriteSystemLine(name, coord, upp, system, allegiance) {
    let pbg = getPBG(upp, system);
    let sb = hasScoutBase(upp);
    let nb = hasNavalBase(upp);
    let bases = '';
    if (nb) {
        bases += 'N';
    }
    if (sb) {
        bases += 'S';
    }

    if (!allegiance) {
        allegiance = '';
    }
    // We don't do zone
    let zone = '';
    let tags = [];
    if (upp) {
        tags = upp.tags.join(' ');
    }
    printSystem(name, coord, upp, bases, tags, zone, system, pbg, allegiance);
}
module.exports.generateAndWriteSystemLine = generateAndWriteSystemLine;

function getPopOverride(coord, popOverride) {
    let pop = null;
    if (popOverride) {
        if (popOverride.max == 0) {
            pop = 0;
        } else {
            // The chance for normal pop is (row * step) + min, up to max.
            let chance = (coord.ssRow * popOverride.step) + popOverride.min;
            if (chance > popOverride.max) {
                chance = popOverride.max;
            }
            // console.log('Coord ' + coord.coord + ' chance: ' + chance);
            if (dice.rollDie(100) > chance) {
                pop = 0;
            }
        }
    }
    return pop;
}

function generateStarSystem(name, coordStruct, popOverride, args, brownDwarf) {
    let coord = coordStruct.coord;
    let pop = getPopOverride(coordStruct, popOverride);
    let upp = sysgenlib.generateMainWorld(pop);
    if (args['deathWorld'] || brownDwarf) {
        upp = null;
    }
    let system = sysgenlib.generateSystem(upp, false, false, brownDwarf, args['reducing']);
    if (!upp) {
        upp = system.mainWorldUPP;
        if (args['populate']) {
            let mainWorld = sysgenlib.getMainWorld(system);
            if (mainWorld) {
                upp = mainWorld.world;
                let sport = sysgenlib.starport();
                upp = sysgenlib.populateWorld(upp, pop, sport);
                if (system.mainWorldUPP) {
                    system.mainWorldUPP = upp;
                }
                if (mainWorld) {
                    mainWorld.world = upp;
                }
            }
        }
    }
    let allegiance = null;
    let sclass = sysgenlib.printStellarClass(system.primary.stellarClass, system.primary.size)
    let sysName = systemName(name, coord, sclass, args);

    if (args['allegiances'] && (upp)) {
        // console.log('Calculating allegiance...');
        allegiance = allegiances.determineAllegiance(upp);
        // console.log('Allegiance: ' + allegiance);
        if (allegiance) {
            let genName = allegiances.getNameFromAllegiance(allegiance);
            // console.log('Name: ' + genName);
            if (genName) {
                sysName = genName;
            }
        }
    }
    
    if (args['writeSystems']) {
        let fileConsole = new console.Console(fs.createWriteStream('./' + sysName + '.csv'));
        sysgenlib.printSystem(sysName, system, fileConsole);
    }
    generateAndWriteSystemLine(sysName, coord, upp, system, allegiance);
}
module.exports.generateStarSystem = generateStarSystem;

function systemName(name, coord, override, args) {
    let sname = name;
    if (args['starName']) {
        sname = override;
    }
    return sname + '-' + coord; 
}

function generateRoguePlanet(name, coordStruct, popOverride, args) {
    let coord = coordStruct.coord;
    let system = sysgenlib.generateRogueWorld();
    upp = system.mainWorldUPP;
    // Todo: Populate rogues?
    // if (args['populate']) {
    //     let mainWorld = sysgenlib.getMainWorld(system);
    //     if (mainWorld) {
    //         upp = mainWorld.world;
    //         let sport = sysgenlib.starport();
    //         upp = sysgenlib.populateWorld(upp, pop, sport);
    //         if (system.mainWorldUPP) {
    //             system.mainWorldUPP = upp;
    //         }
    //         if (mainWorld) {
    //             mainWorld.world = upp;
    //         }
    //     }
    // }

    let allegiance = null;
    let sysName = systemName(name, coord, ROGUE, args);

    if (args['allegiances'] && (upp)) {
        // console.log('Calculating allegiance...');
        allegiance = allegiances.determineAllegiance(upp);
        // console.log('Allegiance: ' + allegiance);
        if (allegiance) {
            let genName = allegiances.getNameFromAllegiance(allegiance);
            // console.log('Name: ' + genName);
            if (genName) {
                sysName = genName;
            }
        }
    }
    
    if (args['writeSystems']) {
        let fileConsole = new console.Console(fs.createWriteStream('./' + sysName + '.csv'));
        sysgenlib.printSystem(sysName, system, fileConsole);
    }
    generateAndWriteSystemLine(sysName, coord, upp, system, allegiance);
}
module.exports.generateRoguePlanet = generateRoguePlanet;

function generateSingleSubsector(name, subsector, popOverride, args) {
    let subName = name + ' ' + subsectors[subsector];
    printSubSectorHeader(subName, name);
    let coords = genCoords(subsector);
    for (var i = 0; i < coords.length; i++) {
        // console.log('Checking ' + JSON.stringify(coords[i]) + '...');
        if (hasStar(DENSITY)) {
            // console.log('Has star!');
            if (!args['excludeFusors']) {
                generateStarSystem(name, coords[i], popOverride, args, false);
            }
        } else if ((args['brownDwarfs']) && (hasBrownDwarf(DENSITY))) {
            // console.log('Has brown dwarf!');
            generateStarSystem(name, coords[i], popOverride, args, true);
        } else if ((args['rogue']) && (hasRoguePlanet(DENSITY))) {
            // console.log('Has rogue world!');
            generateRoguePlanet(name, coords[i], popOverride, args)
        }
    }
}
module.exports.generateSingleSubsector = generateSingleSubsector;
