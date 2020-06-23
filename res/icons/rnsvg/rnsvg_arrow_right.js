import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function RNSVG_arrow_right() {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 7 13">
            <Path
                d="M1 0l6 6.5L1 13l-1-1.083L5 6.5 0 1.083 1 0z"
                fill="#9B9B9B"
                fillRule="evenodd"
            />
        </Svg>
    )
}

export default RNSVG_arrow_right
