import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function RNSVG_arrow_back() {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 8 14">
            <Path
                d="M6.587 14L0 7l6.587-7L8 1.503 2.827 7 8 12.498 6.587 14z"
                fill="#C8C7CC"
                fillRule="evenodd"
            />
        </Svg>
    )
}

export default RNSVG_arrow_back
