'uses strict';

const args = require('minimist')(process.argv.slice(2), {
    string: ['upp', 'starport', 'pop'],
    boolean: ['help', 'verbose', 'salvaging', 'qualitySensors', 'navalBase', 'scoutBase'],
    alias: {
        b: 'scoutBase',
        h: 'help',
        n: 'navalBase',
        p: 'pop',
        q: 'qualitySensors',
        s: 'starport',        
        v: 'verbose'
    }
});

function showHelp() {
    console.log('solo -- roll a solo encounter');
    console.log('--------');
    console.log('-b             scout base in system');
    console.log('-h             display this help');
    console.log('-n             naval base in system');
    console.log('-p [P]         population code in system');
    console.log('-q             salvaging with military or scout ship sensors');    
    console.log('-s [S]         starport of class [S] in system');
    console.log('--salvaging    salvaging with normal sensors');
    console.log('-v             verbose mode');
    process.exit(0);
}

const FUGATIVES = 'Fugitives from imperial law, they need a new ship...';
const DEBRIS = 'Debris and wreckage from the rolled ship';
const RADIO_SILENCE = 'Radio silence';
const IGNORE_POLITE = 'Ignores you, but polite';
const INFO_WORLD = 'Asks for info on world you\'ve just left';
const HELP_REPAIR = 'Asks for help with a repair';
const HOSTILE_SUSPICIOUS = 'Crew are hostile and suspicious, warning you away';
const MEDICAL_EMERGENCY = 'Medical emergency, they have no doctor or supplies';
const SUSPECT_PIRACY = 'Thinks you are a pirate, based on rumor';
const SUSPECT_RIVAL = 'Thinks you are from rival company, warns you away';
const DOCTOR_EMERGENCY = 'Medical emergency, their doctor is ill!';
const VIOLENT_CREWMAN = 'Requires assistance with violent crewman';
const DEBRIS_ORE = 'Refined ore in space from that ship. But no ship.';
const HIJACKED = 'Hijacked vessel, unusual trajectory/call signs';
const MISSING_SHIP = 'Transport matches a ship that went missing last year';
const DEBRIS_CARGO = 'Cargo in space from that ship. But no ship.';
const SCOUT_DISTRESS = 'Scout in distress; it has returned from a failed mission';
const SCOUT_WARN = 'Warns you away from danger';
const SCOUT_SURVEY_MOON = 'On way to map a moon'
const SCOUT_SURVEY_SPACE = 'Mapping local anomalies';
const SCOUT_NAV_BEACON = 'Launching a nav beacon';
const SCOUT_FRIENDLY = 'Friendly hail, ask about world you have come from';
const SCOUT_WANTS_LOGS = 'Asks for your sensor logs';
const SCOUT_MAP_JUMP_WAKES = 'Mapping jump wakes, stay clear';
const SCOUT_SEARCH_RESCUE = 'Performing search and rescue operation';
const MILITARY_WARN_SUSPECT = 'Warns you of an unidentified ship in this system';
const MILITARY_SECURITY_CHECK = 'Security checks';
const MILITARY_BOARDING = 'Boarding';
const MILITARY_WARN_PIRACY = 'Warns you of piracy in this system';
const MILITARY_CREW_WANTED = 'One of your crew is wanted and may be identified during a security check';

function frontierReaction() {
    const reactions = [
        FUGATIVES,
        FUGATIVES,
        FUGATIVES,
        DEBRIS,
        DEBRIS,
        RADIO_SILENCE,
        RADIO_SILENCE,
        IGNORE_POLITE,
        INFO_WORLD,
        INFO_WORLD,
        HELP_REPAIR,
        HOSTILE_SUSPICIOUS,
        HOSTILE_SUSPICIOUS,
        MEDICAL_EMERGENCY,
        MEDICAL_EMERGENCY,
        MEDICAL_EMERGENCY
    ];

    console.log(reactions[dice.d6d6d6(-3)]);
}

function industrialReaction() {
    const reactions = [
        SUSPECT_PIRACY,
        SUSPECT_PIRACY,
        SUSPECT_PIRACY,
        SUSPECT_RIVAL,
        SUSPECT_RIVAL,
        RADIO_SILENCE,
        DOCTOR_EMERGENCY,
        IGNORE_POLITE,
        IGNORE_POLITE,
        INFO_WORLD,
        HELP_REPAIR,
        VIOLENT_CREWMAN,
        VIOLENT_CREWMAN,
        DEBRIS_ORE,
        HIJACKED,
        HIJACKED
    ];

    console.log(reactions[dice.d6d6d6(-3)]);
}

function transportSpecialReaction() {
    const reactions = [
        SUSPECT_PIRACY,
        SUSPECT_PIRACY,
        SUSPECT_PIRACY,
        MISSING_SHIP,
        MISSING_SHIP,
        RADIO_SILENCE,
        DOCTOR_EMERGENCY,
        IGNORE_POLITE,
        IGNORE_POLITE,
        INFO_WORLD,
        HELP_REPAIR,
        VIOLENT_CREWMAN,
        VIOLENT_CREWMAN,
        DEBRIS_CARGO,
        HIJACKED,
        HIJACKED
    ];

    console.log(reactions[dice.d6d6d6(-3)]);
}

function scoutReaction() {
    const reactions = [
        SCOUT_DISTRESS,
        SCOUT_DISTRESS,
        SCOUT_DISTRESS,
        SCOUT_WARN,
        SCOUT_WARN,
        SCOUT_SURVEY_MOON,
        SCOUT_SURVEY_SPACE,
        SCOUT_NAV_BEACON,
        SCOUT_NAV_BEACON,
        SCOUT_FRIENDLY,
        IGNORE_POLITE,
        SCOUT_WANTS_LOGS,
        SCOUT_MAP_JUMP_WAKES,
        HELP_REPAIR,
        SCOUT_SEARCH_RESCUE,
        SCOUT_SEARCH_RESCUE
    ];

    console.log(reactions[dice.d6d6d6(-3)]);
}

function militaryReaction() {
    const reactions = [
        MILITARY_WARN_SUSPECT,
        MILITARY_WARN_SUSPECT,
        MILITARY_WARN_SUSPECT,
        MILITARY_WARN_SUSPECT,
        HELP_REPAIR,
        INFO_WORLD,
        RADIO_SILENCE,
        IGNORE_POLITE,
        IGNORE_POLITE,
        SCOUT_WANTS_LOGS,
        MILITARY_SECURITY_CHECK,
        MILITARY_BOARDING,
        MILITARY_WARN_PIRACY,
        MILITARY_WARN_PIRACY,
        MILITARY_CREW_WANTED,
        MILITARY_CREW_WANTED
    ];

    console.log(reactions[dice.d6d6d6(-3)]);
}

const ORE_CARRIER = 'Ore Carrier 1000';
const MINING_SHIP = 'Mining Ship 600';
const TANKER = 'Tanker Tender 1000';
const MINING_CUTTER = 'Mining Cutter';
const TYPE_J = 'Type J Seeker';
const LAB_SHIP = 'Lab Ship 400';
const SALVAGE_CRUISER = 'Salvage Cruiser 2000';
const MOBILE_HOSPITAL = 'Mobile Teaching Hospital 200';
function industrialShip() {
    const ships = [
        ORE_CARRIER,
        ORE_CARRIER,
        ORE_CARRIER,
        MINING_SHIP,
        TANKER,
        MINING_CUTTER,
        TYPE_J,
        LAB_SHIP,
        SALVAGE_CRUISER,
        SALVAGE_CRUISER,
        MOBILE_HOSPITAL
    ];

    console.log(ships[dice.d6d6(-2)]);
}

const MERC_CRUISER = 'Mercenary Cruiser 800';
const LIGHT_PATROL_CRAFT = 'Light Patrol Craft 200';
const CLOSE_ESCORT = 'Close Escort 400';
const PATROL_CRUISER = 'Patrol Cruiser 400';
const FLEET_COURIER = 'Fleet Courier 400';
const BATTLECRUISER = 'Battlecruiser';
const DESTROYER_ESCORT = 'Destroyer Escort';
const SDB = 'SDB';
const FLEET_SQUADRON = 'Fleet Squadron in transit';
function militaryShip() {
    const ships = [
        MERC_CRUISER,
        MERC_CRUISER,
        MERC_CRUISER,
        LIGHT_PATROL_CRAFT,
        CLOSE_ESCORT,
        PATROL_CRUISER,
        FLEET_COURIER,
        BATTLECRUISER,
        DESTROYER_ESCORT,
        SDB,
        FLEET_SQUADRON
    ];

    console.log(ships[dice.d6d6(-2)]);
}

const FAT_CORSAIR = 'Fat Corsair 400';
const EMERGENCY_RESPONSE = 'Emergency Response Boat 100';
const PERSONAL_TRANSPORT = 'Personal Transport 100';
const EXPRESS_COURIER = 'Express Courier 200';
const MERCHANT_COURIER = 'Merchant Courier 100';
const YACHT = 'Yacht';
const SMALL_CRAFT = 'Small craft (private)';
const SAFARI_SHIP = 'Safari Ship 200';
function specialShip() {
    const ships = [
        FAT_CORSAIR,
        EMERGENCY_RESPONSE,
        PERSONAL_TRANSPORT,
        EXPRESS_COURIER,
        MERCHANT_COURIER,
        YACHT,
        SMALL_CRAFT,
        SMALL_CRAFT,
        LAB_SHIP,
        SAFARI_SHIP,
        SAFARI_SHIP
    ];

    console.log(ships[dice.d6d6(-2)]);
}

const MERCHANT_200 = 'Merchant 200';
const FAT_TRADER = 'Fat Trader 400';
const FRONTIER_TRADER = 'Frontier Trader 400';
const MERCHANT_300 = 'Merchant 300';
const SMALL_CRAFT_SPA = 'Small craft (SPA)';
const SMALL_CRAFT_CORP = 'Small craft (Corporate)';
const MODULAR_MERCHANT_400 = 'Modular Starship 400';
const FAR_TRADER = 'Far Trader 200';
const SMALL_CRAFT_INDY = 'Small Craft (Industrial/Science)';
const FREE_TRADER = 'Free Trader 200';
const LIGHT_TRANSPORT = 'Light Transport 200';
function smallTransport() {
    const ships = [
        MERCHANT_200,
        FAT_TRADER,
        FAT_TRADER,
        FRONTIER_TRADER,
        MERCHANT_300,
        SMALL_CRAFT_SPA,
        SMALL_CRAFT_CORP,
        MODULAR_MERCHANT_400,
        FAR_TRADER,
        SMALL_CRAFT_INDY,
        FAT_TRADER,
        FREE_TRADER,
        SMALL_CRAFT,
        LIGHT_TRANSPORT,
        FAR_TRADER,
        MERCHANT_300
    ];

    console.log(ships[dice.d6d6d6(-3)]);
}

const LONG_LINER = 'Long Liner 1000';
const FREIGHTER = 'Freighter 3000';
const BULK_HAULER = 'Bulk Cargo Hauler 5000';
const SUBSIDIZED_LINER = 'Subsidized Liner 600';
const MERCHANT_TRANSPORT = 'Merchant Transport 500';
const CARGO_CARRIER = 'Cargo Carrier 1000';
const FRONTIER_TRANSPORT = 'Frontier Transport 2000';
function largeTransport() {
    const ships = [
        LONG_LINER,
        LONG_LINER,
        LONG_LINER,
        FREIGHTER,
        BULK_HAULER,
        SUBSIDIZED_LINER,
        MERCHANT_TRANSPORT,
        CARGO_CARRIER,
        FRONTIER_TRANSPORT,
        ORE_CARRIER,
        ORE_CARRIER
    ];

    console.log(ships[dice.d6d6(-2)]);
}

const SURVEYOR = 'Surveyor 400';
const TYPE_S = 'Type S Scout/Courier';
const FAST_SCOUT = 'Fast Scout 100';
const MODULAR_SCOUT = 'Modular Scout 200';
function scoutShip() {
    const ships = [
        SURVEYOR,
        SURVEYOR,
        SURVEYOR,
        TYPE_S,
        FAST_SCOUT,
        TYPE_S,
        TYPE_S,
        MODULAR_SCOUT,
        TYPE_S,
        TYPE_S,
        MODULAR_SCOUT
    ];

    console.log(ships[dice.d6d6(-2)]);
}

const CARGO_POD = 'Cargo pod/escape ball';
const DERELICT_VESSEL = 'Derelict Vessel';
const PIRATE_SQUADRON = 'Pirate Squadron';
const ASTEROID_HERMET = 'Asteroid Hermet';
function frontier() {
    const ships = [
        CARGO_POD,
        DERELICT_VESSEL,
        MINING_SHIP,
        TYPE_S,
        FAT_CORSAIR,
        SURVEYOR,
        FAR_TRADER,
        PATROL_CRUISER,
        FRONTIER_TRADER,
        TYPE_J,
        TYPE_S,
        SAFARI_SHIP,
        CLOSE_ESCORT,
        PIRATE_SQUADRON,
        FAST_SCOUT,
        ASTEROID_HERMET
    ];

    console.log(ships[dice.d6d6d6(-3)]);
}

function displayEncounter(encounter, isEncounter) {
    if (encounter) {
        if (isEncounter) {
            console.log('Encountered ship!');
        }
        encounter.ship();
        if (isEncounter) {
            encounter.reaction();
        }
        console.log('');
    }
}

function majorRouteEncounter(pop, navalBase, scoutBase, starport, isEncounter, force) {
    if (args['verbose']) {
        console.log('+++majorRouteEncounter(' + pop.toString() + ', ' + navalBase.toString() + ', '
         + scoutBase.toString() + ', ' + starport + ', ' + isEncounter.toString() + ', ' + force.toString() + ')');
    }

    const encounters = {
        5: {
            ship: scoutShip,
            reaction: scoutReaction
        },
        6: {
            ship: specialShip,
            reaction: transportSpecialReaction
        },
        7: {
            ship: smallTransport,
            reaction: transportSpecialReaction
        },
        8: {
            ship: largeTransport,
            reaction: transportSpecialReaction
        },
        9: {
            ship: industrialShip,
            reaction: industrialReaction
        },
        10: {
            ship: militaryShip,
            reaction: militaryReaction
        },
        11: {
            ship: largeTransport,
            reaction: transportSpecialReaction
        },
        12: {
            ship: militaryShip,
            reaction: militaryReaction
        },
        13: {
            ship: largeTransport,
            reaction: transportSpecialReaction
        },
        14: {
            ship: specialShip,
            reaction: transportSpecialReaction
        }
    }

    let dm = 0;
    if (pop >= 8) {
        dm += 1;
    }
    if (navalBase) {
        dm += 1;
    }
    if (scoutBase) {
        dm -= 1;
    }
    if (starport == 'C') {
        dm -= 1;
    }
    let val = dice.d6d6(dm);
    if (args['verbose']) {
        console.log('Rolled ' + val.toString());
    }

    let encounter = encounters[val];
    if (force) {
        while (!encounter) {
            val = dice.d6d6(dm);
            if (args['verbose']) {
                console.log('Rolled ' + val.toString());
            }
            encounter = encounters[val];
        }
    }
    if (args['verbose']) {
        console.log('encounter: ' + JSON.stringify(encounter));
    }
    displayEncounter(encounter, isEncounter);

    if (args['verbose']) {
        console.log('---majorRouteEncounter(' + pop.toString() + ', ' + navalBase.toString() + ', '
         + scoutBase.toString() + ', ' + starport + ', ' + isEncounter.toString() + ', ' + force.toString() + ')');
    }
}

function frontierRouteEncounter(pop, navalBase, scoutBase, starport, isEncounter, force) {
    if (args['verbose']) {
        console.log('+++frontierRouteEncounter(' + pop.toString() + ', ' + navalBase.toString() + ', ' 
            + scoutBase.toString() + ', ' + starport + ', ' + isEncounter.toString() + ', ' + force.toString() + ')');
    }

    const encounters = {
        9: {
            ship: frontier,
            reaction: frontierReaction
        }, 
        10: {
            ship: smallTransport,
            reaction: transportSpecialReaction
        },
        11: {
            ship: militaryShip,
            reaction: militaryReaction
        },
        12: {
            ship: industrialShip,
            reaction: industrialReaction
        },
        13: {
            ship: largeTransport,
            reaction: transportSpecialReaction
        }
    }

    let dm = 0;
    if (pop >= 6) {
        dm += 1;
    }
    if (starport == 'X') {
        dm -= 1;
    }
    let val = dice.d6d6(dm);
    if (args['verbose']) {
        console.log('Rolled ' + val.toString());
    }

    let encounter = encounters[val];
    if (force) {
        while (!encounter) {
            val = dice.d6d6(dm);
            if (args['verbose']) {
                console.log('Rolled ' + val.toString());
            }
            encounter = encounters[val];
        }
    }
    if (args['verbose']) {
        console.log('encounter: ' + JSON.stringify(encounter));
    }
    displayEncounter(encounter, isEncounter);

    if (args['verbose']) {
        console.log('---frontierRouteEncounter(' + pop.toString() + ', ' + navalBase.toString() + ', '
         + scoutBase.toString() + ', ' + starport + ', ' + isEncounter.toString() + ', ' + force.toString() + ')');
    }
}

function salvaging(qualitySensors, pop, navalBase, scoutBase, starport) {
    if (args['verbose']) {
        console.log('+++salvaging(' + qualitySensors.toString() + ')');
    }

    let target = 2;
    if (qualitySensors) {
        target += 1;
    }
    let val = dice.d6d6();
    if (args['verbose']) {
        console.log('Rolled ' + val.toString());
    }

    let gotOne = (val <= target);
    if (gotOne) {
        console.log('Found salvage!');
        encounter(pop, navalBase, scoutBase, starport, false, true);        
    }

    if (args['verbose']) {
        console.log('---salvaging(' + qualitySensors.toString() + ')');
    }
}

function encounter(pop, navalBase, scoutBase, starport, isEncounter, force) {
    if (args['verbose']) {
        console.log('+++encounter(' + pop.toString() + ', ' + navalBase.toString() + ', '
         + scoutBase.toString() + ', ' + starport + ', ' + isEncounter.toString() + ', ' + force.toString() + ')');
    }
    
    switch (starport) {
        case 'A':
            // Fall-through
        case 'B':
            // Fall-through
        case 'C':
            majorRouteEncounter(pop, navalBase, scoutBase, starport, isEncounter, force);
            break;
        case 'D':
            // Fall-through
        case 'E':
            // Fall-through
        case 'X':
            // Fall-through
        default:
            frontierRouteEncounter(pop, navalBase, scoutBase, starport, isEncounter, force);
            break;
    }
    if (args['verbose']) {
        console.log('encounter(' + pop.toString() + ', ' + navalBase.toString() + ', '
         + scoutBase.toString() + ', ' + starport + ', ' + isEncounter.toString() + ', ' + force.toString() + ')');
    }
}

var dice = require('./dice.js');

if (args['help']) {
    showHelp();
}

if (args['verbose']) {
    console.log('args:');
    console.log(JSON.stringify(args));
}

let starport = 'X';
if (args['starport']) {
    starport = args['starport'];
}

let pop = 0;
if (args['pop']) {
    pop = parseInt(args['pop'], 16);
}

// If we are salvaging, do that
if ((args['salvaging']) || (args['qualitySensors'])) {
    salvaging(args['qualitySensors'], pop, args['navalBase'], args['scoutBase'], starport);
}
encounter(pop, args['navalBase'], args['scoutBase'], starport, true, false);
