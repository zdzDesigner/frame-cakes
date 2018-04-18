import authUpdate from './interceptor.js'
import authDestroy from './logout.js'
import { authInit, setToken, setRmemAuth, getHeaders } from './set-headers.js'

let auth = {
    init: authInit,
    update: authUpdate,
    destroy: authDestroy
}

export {
    auth,
    setToken,
    setRmemAuth,
    getHeaders
}