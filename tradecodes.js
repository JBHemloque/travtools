'uses strict';

function isAg(upp) {
    if ((upp.atmosphere > 9) || (upp.atmosphere < 4)) {
        return false;
    }
    if ((upp.hydrographics > 8) || (upp.hydrographics < 4)) {
        return false;
    }
    if ((upp.population > 7) || (upp.population < 5)) {
        return false;
    }
    return true;
}
module.exports.isAg = isAg;

function isAs(upp) {
    if (upp.size > 0) {
        return false;
    }
    if (upp.atmosphere > 0) {
        return false;
    }
    if (upp.hydrographics > 0) {
        return false;
    }
    return (upp.size == 0);
}
module.exports.isAs = isAs;

function isBa(upp) {
    return (upp.population == 0);
}
module.exports.isBa = isBa;

function isDe(upp) {
    if (upp.atmosphere < 2) {
        return false;
    }
    if (upp.hydrographics > 0) {
        return false;
    }
    return true;
}
module.exports.isDe = isDe;

function isFl(upp) {
    if (upp.hydrographics == 0) {
        return false;
    }
    return (upp.atmosphere >= 10);
}
module.exports.isFl = isFl;

function isGa(upp) {
    if ((upp.hydrographics < 4) || (upp.hydrographics > 9)) {
        return false;
    }
    if ((upp.population < 4) || (upp.population > 8)) {
        return false;
    }
    return ((upp.atmosphere == 5) || (upp.atmosphere == 6) || (upp.atmosphere == 8));
}
module.exports.isGa = isGa;

function isHi(upp) {
    return (upp.population >= 9);
}
module.exports.isHi = isHi;

function isHt(upp) {
    return (upp.techLevel >= 12);
}
module.exports.isHt = isHt;

function isIc(upp) {
    if (upp.atmosphere > 1) {
        return false;
    }
    return (upp.hydrographics >= 1);
}
module.exports.isIc = isIc;

function isIn(upp) {
    if (upp.population < 9) {
        return false;
    }
    switch (upp.atmosphere) {
        case 0:
            return true;
        case 1:
            return true;
        case 2:
            return true;
        case 3:
            return false;
        case 4:
            return true;
        case 5:
            return false;
        case 6:
            return false;
        case 7:
            return true;
        case 8:
            return false;
        case 9:
            return true;
        case 10:
            return false;
        case 11:
            return false;
        case 12:
            return false;
    }
    return false;
}
module.exports.isIn = isIn;

function isLo(upp) {
    return ((upp.population > 0) && (upp.population < 4));
}
module.exports.isLo = isLo;

function isLt(upp) {
    return ((upp.techLevel > 0) && (upp.techLevel <= 5));
}
module.exports.isLt = isLt;

function isNa(upp) {
    if (upp.atmosphere > 3) {
        return false;
    }
    if (upp.hydrographics > 3) {
        return false;
    }
    if (upp.population < 6) {
        return false;
    }
    return true;
}
module.exports.isNa = isNa;

function isNi(upp) {
    return ((upp.population <= 6) && (upp.population >= 4));
}
module.exports.isNi = isNi;

function isPo(upp) {
    if ((upp.atmosphere > 5) || (upp.atmosphere < 2)) {
        return false;
    }
    if (upp.hydrographics > 3) {
        return false;
    }
    return true;
}
module.exports.isPo = isPo;

function isRi(upp) {
    if ((upp.population < 6) || (upp.population > 8)) {
        return false;
    }
    return ((upp.atmosphere == 6) || (upp.atmosphere == 8));
}
module.exports.isRi = isRi;

function isWa(upp) {
    return ((upp.hydrographics == 10) && (!isFl(upp)));
}
module.exports.isWa = isWa;

function isVa(upp) {
    return (upp.atmosphere == 0);
}
module.exports.isVa = isVa;