'uses strict';

// TILING_WIDTH
// |   |
//  _     _
// / \_    TILING_HEIGHT
// \_/ \  _
//   \_/
const HEX_SIZE = 1;
const TILING_WIDTH = HEX_SIZE * 3 / 2;
const TILING_HEIGHT = HEX_SIZE;

function getHexAtPoint(mpx, mpy) {
    // console.log('HEX_SIZE: ' + HEX_SIZE + ', TILING_HEIGHT: ' + TILING_HEIGHT + ', TILING_WIDTH: ' + TILING_WIDTH);
    // console.log('mpx: ' + mpx + ', mpy: ' + mpy);
    // I'm not going to pretend to know why the rest of this works.
    hx = mpx / TILING_WIDTH * 2;
    xMod = mpx % TILING_WIDTH;
    hy = mpy / TILING_HEIGHT;
    yMod = mpy % TILING_HEIGHT;

    // console.log('hx: ' + hx + ', xMod: ' + xMod + ', hy: ' + hy + ', yMod: ' + yMod);

    return {x: Math.round(hx), y: Math.round(hy)};
}
module.exports.getHexAtPoint = getHexAtPoint;

const SECTOR_WIDTH = 32;
const SECTOR_HEIGHT = 40;
const HEX_OFFSET_X = 16;
const HEX_OFFSET_Y = 20;
const INCLUDE_Z_OFFSET = true;
const EXCLUDE_Z_OFFSET_FOR_DISTANCE = 8;

function transformToGlobalHex(x, y, z) {
    xSign = (y < 0) ? 1 : -1;
    ySign = (x < 0) ? 1 : -1;
    var zOffset = INCLUDE_Z_OFFSET ? Math.abs(z/2) : 0;
    if (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) > EXCLUDE_Z_OFFSET_FOR_DISTANCE) {
        zOffset = 0;
    }
    travX = xSign * (Math.abs(y) + zOffset);
    travY = ySign * (Math.abs(x) + zOffset);
    return getHexAtPoint(HEX_OFFSET_X + travX, HEX_OFFSET_Y + travY);
}
module.exports.transformToGlobalHex = transformToGlobalHex;

function toSectorCode(point) {
    x = point.x % SECTOR_WIDTH;
    y = point.y % SECTOR_HEIGHT;
    return x.toString().padStart(2, 0) + y.toString().padStart(2, 0);
}
module.exports.toSectorCode = toSectorCode;
