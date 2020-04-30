import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function RNSVG_location_profile() {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 12 14">
            <Path
                d="M6 1c2.762 0 5 2.131 5 4.76 0 1.753-1.667 4.5-5 8.24-3.333-3.74-5-6.487-5-8.24C1 3.131 3.238 1 6 1zm.014 2.21c-1.282 0-2.322.99-2.322 2.212 0 1.22 1.04 2.21 2.322 2.21 1.283 0 2.323-.99 2.323-2.21 0-1.221-1.04-2.211-2.323-2.211z"
                strokeWidth={0.719}
                stroke="#FFF"
                fill="none"
                fillRule="evenodd"
            />
        </Svg>
    )
}

export default RNSVG_location_profile