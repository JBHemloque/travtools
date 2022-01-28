'uses strict';

const args = require('minimist')(process.argv.slice(2), {
    string: ['upp', 'name'],
    boolean: ['help', 'verbose', 'forceGG', 'forceNoGG', 'deathWorld', 'reducing', 'rogue'],
    alias: {
        d: 'deathWorld',
        h: 'help',
        v: 'verbose',
        g: 'forceGG',
        n: 'name',
        r: 'reducing',
        u: 'upp'
    }
});

function showHelp() {
    console.log('sysgen -- generate modified classic Traveller book 6 worlds');
    console.log('Note: I have updated star and atmosphere generation rules');
    console.log('--------');
    console.log('-d          generate a system without favoring main worlds');
    console.log('--forceNoGG force no gas giants in this system');
    console.log('-h          display this help');
    console.log('-g          force gas giants in this system');
    console.log('-n [name]   name the system');
    console.log('-r          majority of breathable worlds should have reducing (A) atmospheres');
    console.log('--rogue     generate rogue world');
    console.log('-u [UPP]    upp used for this system (will generate one if not supplied)');
    console.log('-v          verbose mode');
    process.exit(0);
}

var sysgenlib = require('./sysgenlib.js');

function parseUPP(upp) {
    return uppStruct(
        upp.charAt(0), 
        parseInt(upp.charAt(1), 16),
        parseInt(upp.charAt(2), 16),
        parseInt(upp.charAt(3), 16),
        parseInt(upp.charAt(4), 16),
        parseInt(upp.charAt(5), 16),
        parseInt(upp.charAt(6), 16),
        parseInt(upp.charAt(8), 16));
}

if (args['help']) {
    showHelp();
}

if (args['verbose']) {
    console.log('args:');
    console.log(JSON.stringify(args));
}

let name = 'Unnamed';
let upp = sysgenlib.generateMainWorld(0, args['reducing']);
if (args['upp']) {
    let item = parseUPP(args['upp']);
    upp = {...item, ...{ remarks: 'Main World' }};
    if (args['verbose']) {
        console.log(JSON.stringify(upp));
    } 
}
if (args['name']) {
    name = args['name'];
}

if (args['deathWorld']) {
    upp = undefined;
}

// console.log('generated a upp: ' + JSON.stringify(upp));
let system = sysgenlib.generateSystem(upp, args['forceGG'], args['forceNoGG'], false, args['reducing']);
if (args['rogue']) {
    system = sysgenlib.generateRogueWorld();
}

sysgenlib.printSystem(name, system, console);
