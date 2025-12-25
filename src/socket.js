import { io } from 'socket.io-client'
import { API_ROOT } from './utils/constants'

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : API_ROOT

export const socket = io(URL)