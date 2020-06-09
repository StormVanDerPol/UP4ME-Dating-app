import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function RNSVG_locatieding() {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 131 38">
            <Defs>
                <LinearGradient x1="100%" y1="50%" x2="0%" y2="50%" id="prefix__a">
                    <Stop stopColor="#F5CA23" offset="0%" />
                    <Stop stopColor="#F5C423" offset="23.325%" />
                    <Stop stopColor="#F5A623" offset="100%" />
                </LinearGradient>
            </Defs>
            <Path
                d="M116.653 0C124.577 0 131 6.423 131 14.347c0 7.924-6.423 14.347-14.347 14.347l-42.383-.001L65.5 38l-8.77-9.307H14.347C6.423 28.694 0 22.272 0 14.348S6.423 0 14.347 0h102.306z"
                fill="url(#prefix__a)"
                fillRule="evenodd"
            />
        </Svg>
    )
}

export default RNSVG_locatieding
