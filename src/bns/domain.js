import util from '../util'

let host = util.parseURL(location.href).host;
const primaryDomain = host.replace(/^www\./,'')

export {
	primaryDomain
}