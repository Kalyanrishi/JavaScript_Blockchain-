const MINE_RATE=1000; //1 sec = 1000millisex
const INITIAL_DIFECULTY =2;
const Genesis_Data ={
    timestamp: 1,
    prevHash: '0x000',
    hash: '0x123',
    difficulty: INITIAL_DIFECULTY,
    nonce: 0,
    data:[]


}
module.exports = {Genesis_Data,MINE_RATE};