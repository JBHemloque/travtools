'uses strict';

const args = require('minimist')(process.argv.slice(2), {
    string: ['name', 'subsector'],
    boolean: ['help', 'version', 'verbose', 'brownDwarfs', 'deathWorld', 'excludeFusors', 'starName', 'writeSystems', 'populate', 'overridePopulation', 'allegiances', 'reducing', 'rogue'],
    alias: {
        a: 'allegiances',
        b: 'brownDwarfs',
        d: 'extended',
        e: 'excludeFusors',
        h: 'help',
        n: 'name',
        o: 'overridePopulation',
        p: 'populate',
        r: 'reducing',
        s: 'writeSystems',
        v: 'verbose'
    }
});

const secgen = require('./secgenlib.js');

function showHelp() {
    console.log('secgen -- generate a modified classic Traveller sector');
    console.log('Note: I have updated star and atmosphere generation rules');
    console.log('Usage: secgen -n [name of sector]');
    console.log('--------');
    console.log('-a              generate allegiances and world names');
    console.log('-b              generate brown dwarfs');
    console.log('-d              extended system generation - generate a sector without favoring main worlds');
    console.log('-e              exclude fusing stars (O-M class)');
    console.log('-h              display this help');
    console.log('-n [name]       name of sector');
    console.log('-o              override population with curve');
    console.log('-p              populate the sector');
    console.log('-r              majority of breathable worlds should have reducing (A) atmospheres');
    console.log('--rogue         include rogue worlds');
    console.log('-s              generate system files as csvs');
    console.log('--starName      name systems after their primary star type (debugging)');
    console.log('--subsector [#] generate a single subsector (1-15)')
    console.log('-v              verbose mode');
    console.log('--version   display the version of travtools');
    process.exit(0);
}

var constants = require('./constants.js');

function showVersion() {
    console.log('travtools version ' + constants.version);
    process.exit(0);
}

if (args['version']) {
    showVersion();
}

if (args['help']) {
    showHelp();
}

if (args['verbose']) {
    console.log('args:');
    console.log(JSON.stringify(args));
}

let name = args['name'];
if (!name) {
    showHelp();
}

secgen.printFileHeader();
if (args['subsector']) {
    let subsector = parseInt(args['subsector']);
    let override = null;
    if (args['overridePopulation']) {
        override = secgen.popOverride[subsector];
    }
    secgen.generateSingleSubsector(name, subsector, override, args);
} else {
    for (var i = 0; i < secgen.subsectors.length; i++) {
        let override = null;
        if (args['overridePopulation']) {
            override = secgen.popOverride[i];
        }
        secgen.generateSingleSubsector(name, i, override, args);
    }
}
