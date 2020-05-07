import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function RNSVG_profile_colour() {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 17 20">
            <Defs>
                <LinearGradient
                    x1="99.651%"
                    y1="49.651%"
                    x2=".349%"
                    y2="49.651%"
                    id="prefix__a"
                >
                    <Stop stopColor="#FEA15A" offset="0%" />
                    <Stop stopColor="#D100A3" offset="100%" />
                </LinearGradient>
            </Defs>
            <Path
                d="M8.502 0c2.224 0 4.027 1.936 4.027 4.325 0 1.563-.773 2.933-1.93 3.693 1.474.47 2.813 1.442 3.889 2.847 1.578 2.061 2.466 4.908 2.51 8.038-.827.492-4.262.63-8.498.63h-.383c-4.055-.009-7.25-.164-8.115-.64.047-3.127.934-5.969 2.51-8.028C3.59 9.46 4.928 8.487 6.404 8.015c-1.157-.759-1.928-2.128-1.928-3.69C4.476 1.936 6.279 0 8.502 0z"
                fill="url(#prefix__a)"
                fillRule="evenodd"
            />
        </Svg>
    )
}

export default RNSVG_profile_colour
