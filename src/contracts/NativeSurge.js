import {Token} from "./Token";

class NativeSurge extends Token(require('./abi/NativeSurge_metadata.json')) {
    constructor(addressOfContract, addressOfSender) {
        super(addressOfContract, addressOfSender);
    }

}
