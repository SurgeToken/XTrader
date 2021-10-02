import {Box, Button, Text, Layer, Heading, Stack, Anchor} from "grommet";
import {useRecoilState} from "recoil";
import state from "../state/state";
import {FormClose, StatusCritical, StatusGood} from "grommet-icons";

import React, {useContext, useState} from "react";
import {WalletContext} from "../context/context";

function claimBNB(wallet, setMessage, setStatus) {
    const surgeFundContract = wallet.SurgeFundsContract;
    surgeFundContract.claim().then(
        (receipt) => {
            console.log('success', receipt);
            setMessage(<Anchor color={"white"} href={`https://bscscan.com/tx/${receipt.transactionHash}`} target={"_blank"}
                               label={`Transaction ${status ? "succeeded" : "failed"} click here for more details`}/>)
            setStatus(true)
            // alert('success: '+ success.message)
        },
        (error) => {
            // console.error('error', error);
            if (error.receipt === undefined)
                setMessage(<Text>{error.message}</Text>);
            else
                setMessage(<Anchor color={"white"} href={`https://bscscan.com/tx/${error.receipt.transactionHash}`} target={"_blank"}
                                   label={`Transaction ${status ? "succeeded" : "failed"} click here for more details`}/>)
            setStatus(false)
        }
    )
}

export default function SurgeFund({contracts}) {
    const [timeTillClaim, ] = useRecoilState(state.walletFundsTimeTillClaim);
    const [claimableBNB, ] = useRecoilState(state.walletFundsClaimableBNB);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(false);
    const {wallet} = useContext(WalletContext);
    let time = `Next Claim: ${timeTillClaim} sec`
    let currentClaim = claimableBNB + " BNB"
    return (
        <Box direction={"row"} gap={"small"} align={"center"} alignContent={"between"}>
            <Button
                // disabled={!(timeTillClaim <= 0)}
                size="medium"
                label={"Surge Fund" }
                onClick={() => setOpen(true)}
            />
            {open && (
                <Layer
                    // full={full}
                    // position={position}
                    // onClickOutside={onClose}
                    // onEsc={onClose}
                    background={{color: "black", opacity: 100}}

                    position={"center"}
                    onClickOutside={() => setOpen(false)}
                >
                    <Box
                        fill
                        align={"center"}
                        justify={"center"}
                    >
                        <Box
                            small round
                            pad={"medium"}
                            background={"spaceBlue"}
                            align={"center"}
                            elevation={"large"}
                            style={{border: "solid 1px #21BBB1"}}>
                            <Heading level={3} margin={"small"}>
                                Surge Fund
                            </Heading>
                            <Box gap={"medium"} align={"center"}>
                            <Text textAlign={"center"}>
                                Surge Fund is a charitable fund created for the victims of the August 16th attack on SurgeBNB.
                                Once per day, victims of the attack can click the claim button below to claim BNB from the fund, permitting there are funds available to claim.

                            </Text>
                            <Button
                                disabled={!(timeTillClaim <= 0)}
                                size="medium"
                                label={parseInt(timeTillClaim) > 0 ? currentClaim : "claim: " + parseFloat(claimableBNB).toFixed(8) + " BNB" }
                                onClick={() => claimBNB(wallet, setMessage, setStatus)}/>

                            </Box>
                        </Box>
                    </Box>
                </Layer>)}
                                {message && (
                                    <Layer
                                        position="bottom"
                                        modal={false}
                                        margin={{vertical: 'medium', horizontal: 'small'}}
                                        onEsc={() => setMessage('')}
                                        responsive={false}
                                        plain
                                    >
                                        <Box
                                            align="center"
                                            direction="row"
                                            gap="small"
                                            justify="between"
                                            round="medium"
                                            elevation="medium"
                                            pad={{vertical: 'xsmall', horizontal: 'small'}}
                                            background={status ? "status-ok" : "status-critical"}
                                        >
                                            <Box align="center" direction="row" gap="xsmall">
                                                {status ? <StatusGood/> : <StatusCritical/>}
                                                <Text>
                                                    {message}
                                                </Text>
                                            </Box>
                                            <Button icon={<FormClose/>} onClick={() => setMessage('')} plain/>
                                        </Box>
                                    </Layer>
                                )}

                            {/*<Button alignSelf="end" icon={<FormClose />} onClick={onClose} />*/}
                            {/*<Text>Hi, I am a Layer!</Text>*/}



        </Box>
    )
}
