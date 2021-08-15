import React, {createContext, useEffect, useState} from "react";

import Wallet from "../common/wallet";
import {atom} from "recoil";

export const holdings = atom(
    {
        key: 'holdings',
        default: {}
    }
)

export const connected = atom({
    key: "connected",
    default: false
})

export const account = atom({
    key: "account",
    default: ''
})

export default {holdings, connected, account};
