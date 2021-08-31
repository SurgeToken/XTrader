import {Box, Button, Text} from "grommet";
import {useRecoilState} from "recoil";
import state from "../state/state";

import React from "react";

export default function SurgeFunds() {
    const [timeTillClaim, ] = useRecoilState(state.walletFundsTimeTillClaim);
    const [claimableBNB, ] = useRecoilState(state.walletFundsClaimableBNB);
    let time = timeTillClaim + " Seconds until next claim";
    let currentClaim = claimableBNB + " BNB"
    return (
        <Box direction={"row"} gap={"small"} align={"center"} alignContent={"between"}>
            <Button
                disabled={!(timeTillClaim <= 0)}
                size="medium"
                label={"claim: " + currentClaim}
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