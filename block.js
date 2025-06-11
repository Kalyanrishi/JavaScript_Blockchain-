const hexToBinary = require("hex-to-binary");
const {Genesis_Data, MINE_RATE}= require('./config');
const cryptoHash = require('./crypto-hash');
class Block{
    constructor({timestamp,prevHash,hash,data,nonce,difficulty}) {
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
        this.nonce =nonce;
        this.difficulty = difficulty;
    }
    static genesis(){
        return new this(Genesis_Data);
    }
    static mineBlock({prevBlock,data}){
        //const timestamp = Date.now();
        let hash ,timestamp;
        const prevHash = prevBlock.hash;
        //const {difficulty}=prevBlock;
        let {difficulty} = prevBlock;

        let nonce=0;
        do{
            nonce++;
            timestamp=Date.now();  //00cdef , 00
            difficulty=Block.adjustDifficulty({
                originalBlock:prevBlock,
                timestamp,
            });
            hash=cryptoHash(timestamp,prevHash,data,nonce,difficulty);
        }while(hexToBinary(hash).substring(0,difficulty)!=='0'.repeat(difficulty));
        return new this({
            timestamp,
            prevHash,
            data,
            difficulty,
            nonce,
            hash, 
        });

    }

    static adjustDifficulty({originalBlock,timestamp}){
        const {difficulty} = originalBlock;
        if(difficulty<1) return 1;
        const difference = timestamp-originalBlock.timestamp;
        if(difference>MINE_RATE) return difficulty-1;
        return difficulty+1;

    }

    
}

const block1 = new Block({
    data:"hello",
    prevHash:"0xacb",
    hash:"0xc12",
    timestamp:"4/09/22"});


//const block2 = new Block("3/09/22","0xa12","0123","world");
//console.log(block1);
//console.log(block2);
// const genesisBlock = Block.genesis();
// console.log(genesisBlock);

// const result = Block.mineBlock({prevBlock: block1, data:"block2"});
// console.log(result);

module.exports = Block;