'uses strict';

function rollDie(sides) {
    return Math.ceil(Math.random()*sides);
}
module.exports.rollDie = rollDie;

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
module.exports.d6 = d6;

function d6d6(dm, maxValue, minValue) {
    if (!dm) {
        dm = 0;
    }
    return adjustValue(rollDie(6) + rollDie(6) + dm, maxValue, 12, minValue, 0);
}
module.exports.d6d6 = d6d6;

function d6d6d6(dm, maxValue, minValue) {
    if (!dm) {
        dm = 0;
    }
    return adjustValue(rollDie(6) + rollDie(6) + rollDie(6) + dm, maxValue, 18, minValue, 0);
}
module.exports.d6d6d6 = d6d6d6;

