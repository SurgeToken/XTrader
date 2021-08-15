import React, {createContext, useEffect, useState} from "react";

import {atom} from "recoil";

const holdings = atom({
        key: 'holdings',
        default: {}
    }
)

const connected = atom({
    key: "connected",
    default: false
})

const account = atom({
    key: "account",
    default: ''
})

const contracts = atom({
    key: "contracts",
    default: {}
})

const object = atom({
    key: "object",
    default: null
})

export default {holdings, connected, account, object, contracts};
