import {Token} from "./Token.js";
import surgeTokenABI from "./abi/SurgeToken.json"


class SurgeToken extends Token(surgeTokenABI) {

}

export default SurgeToken;
