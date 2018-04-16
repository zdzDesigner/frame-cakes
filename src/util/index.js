import functor from './functor.js'
import base from './base.js'
import flatobj from './flatobj.js'
import intersection from './intersection.js'
import parser from './parser.js'
import di from './di.js'
import logger from './logger.js'
import redirect from './redirect.js'



var util = {
    ...functor,
    ...base,
    ...parser,
    ...redirect,
    flatobj,
    intersection,
    di,
    logger

}

export default util
export {
    logger
}

