import functor from './functor.js'
import lang from './lang.js'
import base from './base.js'
import flatobj from './flatobj.js'
import intersection from './intersection.js'
import parser from './parser.js'
import di from './di.js'
import logger from './logger.js'
import deep from './deep.js'

var util = {
    ...lang,
    ...functor,
    ...base,
    ...parser,
    ...deep,
    flatobj,
    intersection,
    di,
    logger
}

export default util
export {
    logger
}

