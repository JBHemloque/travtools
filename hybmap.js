'uses strict';

const hex = require('./hextransform.js');
const sysgenlib = require('./sysgenlib.js');
const secgenlib = require('./secgenlib.js');
const dice = require('./dice.js');
const fs = require('fs');

const REDUCING = true;

function lumFromBoloMag(mag) {
    return Math.pow(2.512, 4.83-mag);
}

function habZoneFromBoloMag(mag) {
    let qrLum = Math.pow(lumFromBoloMag(mag), 0.25);
    let au = Math.pow((288 * qrLum) / 288, 2);
    return au;
}

function createSystem(stellarClass, boloMag) {
    let primary = sysgenlib.starWithData(stellarClass, lumFromBoloMag(boloMag));
    // @@todo - work out a good DM for this
    let maxOrbits = dice.d6d6(0);
    let surface = 0;
    let minOrbit = 0;
    let habZone = sysgenlib.habZoneOrbitFromAu(habZoneFromBoloMag(boloMag));
    return sysgenlib.newSystem(primary, maxOrbits, surface, minOrbit, habZone);
}

function addCompanionStarToSystem(system, stellarClass, boloMag) {
    var companion = sysgenlib.starWithData(stellarClass, lumFromBoloMag(boloMag));
    sysgenlib.addCompanionStar(companion, system);
    return system;
}

// function finishSystem(system, upp, forceGG, forceNoGG, reducing) {
function finishSystem(system) {
    return sysgenlib.finishSystem(system, null, false, false, REDUCING);
}

function getHygName(item) {
    if (item.proper) {
        return item.proper;
    }
    if (item.hd) {
        return 'HD ' + item.hd;
    }
    if (item.hr) {
        return 'HR ' + item.hr;
    }
    if (item.hip) {
        return 'HIP ' + item.hip;
    }
    if (item.gl) {
        return 'Gliese ' + item.gl;
    }
    return item.bf;
}

function starStruct(name, absMag, spectClass) {
    return {
        name: name,
        absMag: absMag,
        spectClass: spectClass
    };
}

function createItemForStar(name, coord, point, absMag, spectClass) {
    var item = {
        name: name,
        stars: [],
        companions: [],
        coord: coord,
        point: point,
        absMag: absMag,
        spectClass: spectClass
    };
    item.stars.push(starStruct(name, absMag, spectClass));
    return item;
}

function addCompanionToItem(item, name, absMag, spectClass) {
    if (absMag < item.absMag) {
        item.name = name;
        item.absMag = absMag;
        item.spectClass = spectClass;
    }
    item.stars.push(starStruct(name, absMag, spectClass));
    // Re-create the companions array
    item.companions = [];
    for (var star in item.stars) {
        if (item.stars[star].name !== item.name) {
            item.companions.push(item.stars[star]);
        }
    }
    return item;
}

function createSystemFromItem(item) {
    // Hyg
    // var name = getName(item);
    // var X = item.x;
    // var Y = item.y;
    // var Z = item.z;
    // var spect = item.spect;
    // var absMag = item.absmag;
    // System
    var system = createSystem(item.spectClass, item.absMag);
    for (var i in item.companions) {
        var companion = item.companions[i];
        system = addCompanionStarToSystem(system, companion.spectClass, companion.absMag);
    }
    system = finishSystem(system);
    return system;
}

const SUBSECTOR_WIDTH = 8;
const SUBSECTOR_HEIGHT = 10;
const subsectorXOffset = [0, 8, 16, 24, 0, 8, 16, 24, 0, 8, 16, 24, 0, 8, 16, 24];
const subsectorYOffset = [0, 0, 0, 0, 10, 10, 10, 10, 20, 20, 20, 20, 30, 30, 30, 30];

function filterSubsector(items, subsector) {
    let minX = subsectorXOffset[subsector] + 1;
    let maxX = minX + SUBSECTOR_WIDTH;
    let minY = subsectorYOffset[subsector] + 1;
    let maxY = minY + SUBSECTOR_HEIGHT;
    var subsector = [];
    for (let coord in items) {
        if (pointInWindowCoords(items[coord].point, minX, maxX, minY, maxY)) {
            subsector.push(coord);
        }
    }
    return subsector.sort();
}

const WINDOW_X_MIN = 1;
const WINDOW_X_MAX = 32;
const WINDOW_Y_MIN = 1;
const WINDOW_Y_MAX = 40;

function pointInWindowCoords(point, minX, maxX, minY, maxY) {
    if (point.x >= maxX) {
        return false;
    }
    if (point.x <= minX) {
        return false;
    }
    if (point.y >= maxY) {
        return false;
    }
    if (point.y <= minY) {
        return false;
    }
    return true;
}

function pointInWindow(point) {
    return pointInWindowCoords(point, WINDOW_X_MIN, WINDOW_X_MAX, WINDOW_Y_MIN, WINDOW_Y_MAX);
}

function filterAndPrintSubsector(compiled, systems, i) {
    var subsector = filterSubsector(compiled, i);
    secgenlib.printSubSectorHeader("Core", secgenlib.subsectors[i], console);
    for (let i in subsector) {
        var coord = subsector[i];
        var system = systems[coord];
        var name = compiled[coord].name;
        // if ((name.startsWith('45 Bo')) || (name.startsWith('BD+23'))) {
        //     var codes = '';
        //     for (var index = 0; index < name.length; index++) {
        //         codes += name.charCodeAt(index);
        //         codes += ' ';
        //     }
        //     console.log(name + ' codes: ' + codes);
        // }
        secgenlib.generateAndWriteSystemLine(name, coord, system.mainWorldUPP, system, null);
    }
}

function compileMapData(map) {
    var compiled = {};
    for (var i = 0; i < map.length; i++) {
// for (var i = 0; i < 10; i++) {
        var name = map[i]['Display Name'];
        var point = hex.transformToGlobalHex(map[i].Xg, map[i].Yg, map[i].Zg);
        // Exclude anything with a Z over 10
        var z = Math.abs(map[i].Zg);
        // if (z <= 6) {
        if ((z > 6) && map[i]['Proper Name']) {
            if (pointInWindow(point)) {
                var coord = hex.toSectorCode(point);
                var absMag = parseFloat(map[i].AbsMag);
                var rawSC = map[i]['Spectral Class'];
                var spect = rawSC.toUpperCase().split('/')[0].split('-')[0].split('...')[0];
                var item = createItemForStar(name, coord, point, absMag, spect);
                var ci = compiled[coord];
                if (ci) {
                    addCompanionToItem(ci, name, absMag, spect);
                } else {
                    compiled[coord] = item;
                }
            }
        }
    }
    return compiled;
}

const WRITE_SYSTEMS = true;

function generateSystems(compiled) {
    var systems = {};
    for (let coord in compiled) {
        var item = compiled[coord];
        var system = createSystemFromItem(item);
        systems[coord] = system;
        if (WRITE_SYSTEMS) {
            let fileConsole = new console.Console(fs.createWriteStream('./' + item.name + '.csv'));
            sysgenlib.printSystem(item.name, system, fileConsole);
        }
        // sysgenlib.printSystem(item.name, system, console);
    }
    return systems;
}

// const map = require('../hygdata_v3.json');
const map = require('../HabHYG.json');

var compiled = compileMapData(map);
var systems = generateSystems(compiled);

secgenlib.printFileHeader(console);
for (var i = 0; i < 16; i++) {
    filterAndPrintSubsector(compiled, systems, i);
}