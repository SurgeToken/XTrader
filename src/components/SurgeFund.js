import {Box, Button, Text} from "grommet";
import {useRecoilState} from "recoil";
import state from "../state/state";

import React, {useContext} from "react";
import {WalletContext} from "../context/context";

function claimBNB(wallet) {
    const surgeFundContract = wallet.SurgeFundsContract;
    surgeFundContract.claim().then(
        (success) => {
            console.log('success');
        }
    )
}

export default function SurgeFund({contracts}) {
    const [timeTillClaim, ] = useRecoilState(state.walletFundsTimeTillClaim);
    const [claimableBNB, ] = useRecoilState(state.walletFundsClaimableBNB);
    const {wallet} = useContext(WalletContext);
    let time = `Next Claim: ${timeTillClaim} sec`
    let currentClaim = claimableBNB + " BNB"
    return (
        <Box direction={"row"} gap={"small"} align={"center"} alignContent={"between"}>
            <Button
                disabled={!(timeTillClaim <= 0)}
                size="medium"
                label={"claim: " + parseFloat(claimableBNB).toFixed(8) + " BNB"}
                onClick={() => claimBNB(wallet)}
            />
            <Text >{time
                // timeTillClaim <= 0 ? "You can claim now!" :
                //     (timeTillClaim > 86400 ? timeTillClaim/86400 + " Days":
                //             timeTillClaim === 86400 ? timeTillClaim/86400 + " Day":
                //                 timeTillClaim >= 3600 ? timeTillClaim/3600 + " Hours":
                //                     timeTillClaim >= 60 ? timeTillClaim/60 + " Minutes":
                //                         timeTillClaim + " Seconds"+ " until next claim"
                //     )
            }</Text>
        </Box>
    )
}
