'uses strict';

const args = require('minimist')(process.argv.slice(2), {
    string: [],
    boolean: ['help', 'verbose', 'temp', 'bio', 'tags', 'full'],
    alias: {
        h: 'help',
        v: 'verbose',
        t: 'tags',
        b: 'bio',
        f: 'full'
    }
});

const tempData = [
    '+', 
    '-', 
    'Frozen', 
    'Variable cold-to-temperate', 
    'Cold', 'Cold', 
    'Temperate', 'Temperate', 'Temperate', 
    'Warm', 'Warm', 
    'Variable temperate-to-warm', 
    'Burning'];

const bioData = [
    '+', 
    '-', 
    'Biosphere remnants', 
    'Microbial life', 
    'No native biosphere', 'No native biosphere', 'No native biosphere', 
    'Immiscible biosphere', 'Immiscible biosphere', 'Immiscible biosphere', 
    'Human-miscible biosphere',
    'Hybrid biosphere', 
    'Engineered biosphere'];

const tagData = [
    'Abandoned colony',
    'Alien ruins',
    'Altered humanity',
    'Area 51',
    'Badlands world',
    'Barren world',
    'Bubble cities',
    'Capital punishment',
    'Civil war',
    'Cold war',
    'Colonized population',
    'Diseased world',
    'Eugenic cult',
    'Feral world',
    'Fluid world',
    'Flying cities',
    'Forbidden tech',
    'Freak geology',
    'Freak weather',
    'Friendly foe',
    'Gold rush',
    'Hatred',
    'Heavy industry',
    'Heavy mining',
    'Hostile biosphere',
    'Hostile space',
    'Local specialty',
    'Local tech',
    'Minimal contact',
    'Misandry/Misogyny',
    'One-face world',
    'Out of contact',
    'Outpost world',
    'Police state',
    'Pretech cultists',
    'Primitive aliens',
    'Psionics fear',
    'Psionics worship',
    'Quarantined world',
    'Radioactive world',
    'Regional hegimon',
    'Reserve',
    'Rigid culture',
    'Seagoing cities',
    'Sealed menace',
    'Sectarians',
    'Seismic instability',
    'Secret masters',
    'Symbiotes',
    'Tomb world',
    'Twilight zone world',
    'Tyranny',
    'Unbraked AI',
    'Warlords',
    'Xenophiles',
    'Xenophobes'
];

function showHelp() {
    console.log('world -- generate extra world information');
    console.log('--------');
    console.log('-h          display this help');
    console.log('--temp      generate temperature data for a main world');
    console.log('-b          generate biosphere data for a main world');
    console.log('-t          generate a set of tags for a main world');
    console.log('-f          generate a full set of temperature, biosphere, and tags for a main world');
    console.log('-v          verbose mode');
    process.exit(0);
}

function rollDie(sides) {
    return Math.ceil(Math.random()*sides);
}

function adjustValue(val, maxValue, defaultMaxValue, minValue, defaultMinValue) {
    if (!maxValue) {
        maxValue = defaultMaxValue;
    }
    if (!minValue) {
        minValue = defaultMinValue;
    }
    if (val < minValue) {
        val = minValue;
    }
    if (val > maxValue) {
        val = maxValue;
    }
    return val;
}

function d6(dm, maxValue, minValue) {
    if (!dm) {
        dm = 0;
    }
    return adjustValue(rollDie(6) + dm, maxValue, 6, minValue, 0);
}

function d6d6(dm, maxValue, minValue) {
    if (!dm) {
        dm = 0;
    }
    return adjustValue(rollDie(6) + rollDie(6) + dm, maxValue, 12, minValue, 0);
}

let temp = args['temp'];
let bio = args['bio'];
let tags = args['tags'];
let full = args['full'];

if (full) {
    temp = true;
    bio = true;
    tags = true;
}

if (args['help']) {
    showHelp();
}

if (temp) {
    console.log(tempData[d6d6()]);
}
if (bio) {
    console.log(bioData[d6d6()]);
}
if (tags) {
    let sides = tagData.length;
    console.log(tagData[rollDie(sides-1)] + ', ' + tagData[rollDie(sides-1)]);
}