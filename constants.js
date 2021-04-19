'uses strict';

function iaSurfaceData() {
    let data = {};
    data['B0'] = -1;
    data['B5'] = -1;
    data['A0'] = 1;
    data['A5'] = 1;
    data['F0'] = 2;
    data['F5'] = 2;
    data['G0'] = 3;
    data['G5'] = 4;
    data['K0'] = 5;
    data['K5'] = 5;
    data['M0'] = 6;
    data['M5'] = 7; 
    return data;
}

function ibSurfaceData() {
    let data = {};
    data['B0'] = -1;
    data['B5'] = -1;
    data['A0'] = -1;
    data['A5'] = -1;
    data['F0'] = -1;
    data['F5'] = -1;
    data['G0'] = -1;
    data['G5'] = 1;
    data['K0'] = 3;
    data['K5'] = 4;
    data['M0'] = 5;
    data['M5'] = 6;
    return data;
}

function iiSurfaceData() {
    let data = {};
    data['B0'] = -1;
    data['B5'] = -1;
    data['A0'] = -1;
    data['A5'] = -1;
    data['F0'] = -1;
    data['F5'] = -1;
    data['G0'] = -1;
    data['G5'] = -1;
    data['K0'] = -1;
    data['K5'] = 1;
    data['M0'] = 3;
    data['M5'] = 5; 
    return data;
}

function iiiSurfaceData() {
    let data = {};
    data['B0'] = -1;
    data['B5'] = -1;
    data['A0'] = -1;
    data['A5'] = -1;
    data['F0'] = -1;
    data['F5'] = -1;
    data['G0'] = -1;
    data['G5'] = -1;
    data['K0'] = -1;
    data['K5'] = -1;
    data['M0'] = 3;
    data['M5'] = 4;
    return data;
}

function ivSurfaceData() {
    let data = {};
    data['B0'] = -1;
    data['B5'] = -1;
    data['A0'] = -1;
    data['A5'] = -1;
    data['F0'] = -1;
    data['F5'] = -1;
    data['G0'] = -1;
    data['G5'] = -1;
    data['K0'] = -1;
    data['K5'] = -1;
    data['M0'] = 3;
    data['M5'] = 4; 
    return data;
}

function vSurfaceData() {
    let data = {};
    data['B0'] = -1;
    data['B5'] = -1;
    data['A0'] = -1;
    data['A5'] = -1;
    data['F0'] = -1;
    data['F5'] = -1;
    data['G0'] = -1;
    data['G5'] = -1;
    data['K0'] = -1;
    data['K5'] = -1;
    data['M0'] = 3;
    data['M5'] = 4; 
    return data;
}

function viSurfaceData() {
    let data = {};
    data['B0'] = -1;
    data['B5'] = -1;
    data['A0'] = -1;
    data['A5'] = -1;
    data['F0'] = -1;
    data['F5'] = -1;
    data['G0'] = -1;
    data['G5'] = -1;
    data['K0'] = -1;
    data['K5'] = -1;
    data['M0'] = -1;
    data['M5'] = -1; 
    return data;
}

function dSurfaceData() {
    let data = {};
    data['B0'] = -1;
    data['B5'] = -1;
    data['A0'] = -1;
    data['A5'] = -1;
    data['F0'] = -1;
    data['F5'] = -1;
    data['G0'] = -1;
    data['G5'] = -1;
    data['K0'] = -1;
    data['K5'] = -1;
    data['M0'] = -1;
    data['M5'] = -1;
    data['L'] = -1;
    data['T'] = -1;
    data['Y'] = -1;
    return data;
}

function surfaceData() {
    let data = {};
    data['Ia'] = iaSurfaceData();
    data['Ib'] = ibSurfaceData();
    data['II'] = iiSurfaceData();
    data['III'] = iiiSurfaceData();
    data['IV'] = ivSurfaceData();
    data['V'] = vSurfaceData();
    data['VI'] = viSurfaceData();
    data['D'] = dSurfaceData();
    return data;
}
module.exports.surfaceData = surfaceData;

function iaInnerData() {
    let data = {};
    data['B0'] = 8;
    data['B5'] = 7;
    data['A0'] = 7;
    data['A5'] = 7;
    data['F0'] = 6;
    data['F5'] = 6;
    data['G0'] = 7;
    data['G5'] = 7;
    data['K0'] = 7;
    data['K5'] = 7;
    data['M0'] = 8;
    data['M5'] = 8; 
    return data;
}

function ibInnerData() {
    let data = {};
    data['B0'] = 8;
    data['B5'] = 6;
    data['A0'] = 5;
    data['A5'] = 5;
    data['F0'] = 5;
    data['F5'] = 4;
    data['G0'] = 4;
    data['G5'] = 5;
    data['K0'] = 5;
    data['K5'] = 6;
    data['M0'] = 6;
    data['M5'] = 7;
    return data;
}

function iiInnerData() {
    let data = {};
    data['B0'] = 7;
    data['B5'] = 5;
    data['A0'] = 3;
    data['A5'] = 2;
    data['F0'] = 2;
    data['F5'] = 2;
    data['G0'] = 2;
    data['G5'] = 2;
    data['K0'] = 2;
    data['K5'] = 3;
    data['M0'] = 4;
    data['M5'] = 6; 
    return data;
}

function iiiInnerData() {
    let data = {};
    data['B0'] = 7;
    data['B5'] = 5;
    data['A0'] = 1;
    data['A5'] = 1;
    data['F0'] = 1;
    data['F5'] = 1;
    data['G0'] = 1;
    data['G5'] = 1;
    data['K0'] = 1;
    data['K5'] = 1;
    data['M0'] = 2;
    data['M5'] = 4;
    return data;
}

function ivInnerData() {
    let data = {};
    data['B0'] = 7;
    data['B5'] = 3;
    data['A0'] = 1;
    data['A5'] = 0;
    data['F0'] = 0;
    data['F5'] = 0;
    data['G0'] = 0;
    data['G5'] = 0;
    data['K0'] = 0;
    data['K5'] = 0;
    data['M0'] = 0;
    data['M5'] = 0; 
    return data;
}

function vInnerData() {
    let data = {};
    data['B0'] = 6;
    data['B5'] = 3;
    data['A0'] = 0;
    data['A5'] = 0;
    data['F0'] = 0;
    data['F5'] = 0;
    data['G0'] = 0;
    data['G5'] = 0;
    data['K0'] = 0;
    data['K5'] = 0;
    data['M0'] = 0;
    data['M5'] = 0; 
    return data;
}

function viInnerData() {
    let data = {};
    data['B0'] = 0;
    data['B5'] = 0;
    data['A0'] = 0;
    data['A5'] = 0;
    data['F0'] = 0;
    data['F5'] = 0;
    data['G0'] = 0;
    data['G5'] = 0;
    data['K0'] = 0;
    data['K5'] = 0;
    data['M0'] = 0;
    data['M5'] = 0;
    return data;
}

function dInnerData() {
    let data = {};
    data['B'] = 0;
    data['A'] = 0;
    data['F'] = 0;
    data['G'] = 0;
    data['K'] = 0;
    data['M'] = 0;
    data['L'] = 0;
    data['T'] = 0;
    data['Y'] = 0;
    return data;
}

function innerData() {
    let data = {};
    data['Ia'] = iaInnerData();
    data['Ib'] = ibInnerData();
    data['II'] = iiInnerData();
    data['III'] = iiiInnerData();
    data['IV'] = ivInnerData();
    data['V'] = vInnerData();
    data['VI'] = viInnerData();
    data['D'] = dInnerData();
    return data;
}
module.exports.innerData = innerData;

function iaHabitableData() {
    let data = {};
    data['B0'] = 13;
    data['B5'] = 12;
    data['A0'] = 12;
    data['A5'] = 12;
    data['F0'] = 12;
    data['F5'] = 11;
    data['G0'] = 12;
    data['G5'] = 12;
    data['K0'] = 12;
    data['K5'] = 12;
    data['M0'] = 12;
    data['M5'] = 12; 
    return data;
}

function ibHabitableData() {
    let data = {};
    data['B0'] = 13;
    data['B5'] = 11;
    data['A0'] = 11;
    data['A5'] = 10;
    data['F0'] = 10;
    data['F5'] = 10;
    data['G0'] = 10;
    data['G5'] = 10;
    data['K0'] = 10;
    data['K5'] = 11;
    data['M0'] = 11;
    data['M5'] = 12; 
    return data;
}

function iiHabitableData() {
    let data = {};
    data['B0'] = 12;
    data['B5'] = 11;
    data['A0'] = 9;
    data['A5'] = 8;
    data['F0'] = 8;
    data['F5'] = 8;
    data['G0'] = 8;
    data['G5'] = 8;
    data['K0'] = 9;
    data['K5'] = 9;
    data['M0'] = 10;
    data['M5'] = 11; 
    return data;
}

function iiiHabitableData() {
    let data = {};
    data['B0'] = 12;
    data['B5'] = 10;
    data['A0'] = 8;
    data['A5'] = 7;
    data['F0'] = 6;
    data['F5'] = 6;
    data['G0'] = 6;
    data['G5'] = 7;
    data['K0'] = 7;
    data['K5'] = 8;
    data['M0'] = 8;
    data['M5'] = 9;
    return data;
}

function ivHabitableData() {
    let data = {};
    data['B0'] = 12;
    data['B5'] = 9;
    data['A0'] = 7;
    data['A5'] = 6;
    data['F0'] = 6;
    data['F5'] = 5;
    data['G0'] = 5;
    data['G5'] = 5;
    data['K0'] = 4;
    data['K5'] = 4;
    data['M0'] = 3;
    data['M5'] = 2; 
    return data;
}

function vHabitableData() {
    let data = {};
    data['B0'] = 12;
    data['B5'] = 9;
    data['A0'] = 7;
    data['A5'] = 6;
    data['F0'] = 5;
    data['F5'] = 4;
    data['G0'] = 3;
    data['G5'] = 2;
    data['K0'] = 2;
    data['K5'] = 1;
    data['M0'] = 1;
    data['M5'] = 0; 
    return data;
}

function viHabitableData() {
    let data = {};
    data['B0'] = 10;
    data['B5'] = 7;
    data['A0'] = 5;
    data['A5'] = 4;
    data['F0'] = 3;
    data['F5'] = 3;
    data['G0'] = 2;
    data['G5'] = 1;
    data['K0'] = 1;
    data['K5'] = 0;
    data['M0'] = 0;
    data['M5'] = 0;
    return data;
}

function dHabitableData() {
    let data = {};
    data['B'] = 0;
    data['A'] = -1;
    data['F'] = -1;
    data['G'] = -1;
    data['K'] = -1;
    data['M'] = -1;
    data['L'] = -1;
    data['T'] = -1;
    data['Y'] = -1;
    return data;
}

function habitableData() {
    let data = {};
    data['Ia'] = iaHabitableData();
    data['Ib'] = ibHabitableData();
    data['II'] = iiHabitableData();
    data['III'] = iiiHabitableData();
    data['IV'] = ivHabitableData();
    data['V'] = vHabitableData();
    data['VI'] = viHabitableData();
    data['D'] = dHabitableData();
    return data;
}
module.exports.habitableData = habitableData;

function iaJumpLimitData() {
    let data = {};
    data['B0'] = 48.4;
    data['B5'] = 69.8;
    data['A0'] = 125.6;
    data['A5'] = 138.6;
    data['F0'] = 161.8;
    data['F5'] = 189.7;
    data['G0'] = 277.1;
    data['G5'] = 422.2;
    data['K0'] = 608.2;
    data['K5'] = 939.3;
    data['M0'] = 1364.3;
    data['M5'] = 2808.6;
    return data;
}

function ibJumpLimitData() {
    let data = {};
    data['B0'] = 27.9;
    data['B5'] = 32.6;
    data['A0'] = 46.5;
    data['A5'] = 51.2;
    data['F0'] = 54.9;
    data['F5'] = 55.8;
    data['G0'] = 78.1;
    data['G5'] = 119;
    data['K0'] = 200.9;
    data['K5'] = 364.6;
    data['M0'] = 797;
    data['M5'] = 1927.9; 
    return data;
}

function iiJumpLimitData() {
    let data = {};
    data['B0'] = 20.5;
    data['B5'] = 18.6;
    data['A0'] = 16.7;
    data['A5'] = 13;
    data['F0'] = 14.9;
    data['F5'] = 16.7;
    data['G0'] = 23.3;
    data['G5'] = 34.4;
    data['K0'] = 50.2;
    data['K5'] = 115.3;
    data['M0'] = 220.4;
    data['M5'] = 662.2; 
    return data;
}

function iiiJumpLimitData() {
    let data = {};
    data['B0'] = 14.9;
    data['B5'] = 9.3;
    data['A0'] = 5.8;
    data['A5'] = 4.3;
    data['F0'] = 4.8;
    data['F5'] = 4.8;
    data['G0'] = 6.6;
    data['G5'] = 10.2;
    data['K0'] = 14.9;
    data['K5'] = 39.1;
    data['M0'] = 212;
    data['M5'] = 334.8;
    return data;
}

function ivJumpLimitData() {
    let data = {};
    data['B0'] = 12.1;
    data['B5'] = 4.9;
    data['A0'] = 4.2;
    data['A5'] = 2.5;
    data['F0'] = 2.5;
    data['F5'] = 2.4;
    data['G0'] = 2.3;
    data['G5'] = 2.6;
    data['K0'] = 3.1;
    data['K5'] = 'illegal';
    data['M0'] = 'illegal';
    data['M5'] = 'illegal'; 
    return data;
}

function vJumpLimitData() {
    let data = {};
    data['B0'] = 9.3;
    data['B5'] = 4.1;
    data['A0'] = 3;
    data['A5'] = 1.6;
    data['F0'] = 1.6;
    data['F5'] = 1.3;
    data['G0'] = 0.96;
    data['G5'] = 0.85;
    data['K0'] = 0.84;
    data['K5'] = 0.53;
    data['M0'] = 0.51;
    data['M5'] = 0.33; 
    return data;
}

function viJumpLimitData() {
    let data = {};
    data['B0'] = 'illegal';
    data['B5'] = 'illegal';
    data['A0'] = 'illegal';
    data['A5'] = 'illegal';
    data['F0'] = 'illegal';
    data['F5'] = 1.06;
    data['G0'] = 0.96;
    data['G5'] = 0.51;
    data['K0'] = 0.37;
    data['K5'] = 0.29;
    data['M0'] = 0.24;
    data['M5'] = 0.097;
    return data;
}

function dJumpLimitData() {
    let data = {};
    data['B'] = 0;
    data['A'] = 0;
    data['F'] = 0;
    data['G'] = 0;
    data['K'] = 0;
    data['M'] = 0;
    data['L'] = 0;
    data['T'] = 0;
    data['Y'] = 0;
    return data;
}

function jumpLimitData() {
    let data = {};
    data['Ia'] = iaJumpLimitData();
    data['Ib'] = ibJumpLimitData();
    data['II'] = iiJumpLimitData();
    data['III'] = iiiJumpLimitData();
    data['IV'] = ivJumpLimitData();
    data['V'] = vJumpLimitData();
    data['VI'] = viJumpLimitData();
    data['D'] = dJumpLimitData();
    return data;
}
module.exports.jumpLimitData = jumpLimitData;