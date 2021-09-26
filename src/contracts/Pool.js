import {Contract} from "./Contract";
import abi from './abi/PcsPoolABI.json';
export default ({address}) => {
    return class pool extends Contract({address:address, abi: abi}) {

        async getReserves() {
            return this.methods.getReserves().call();
        }
    }
}