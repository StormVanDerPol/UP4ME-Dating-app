import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function RNSVG_arrow_down() {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 13 7">
            <Path
                d="M13 1L6.5 7 0 1l1.083-1L6.5 5l5.417-5L13 1z"
                fill="#9B9B9B"
                fillRule="evenodd"
            />
        </Svg>
    )
}

export default RNSVG_arrow_down
