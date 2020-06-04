import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function RNSVG_restaurant_fav_heart() {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 12 11">
            <Defs>
                <LinearGradient
                    x1="6.439%"
                    y1="49.961%"
                    x2="96.902%"
                    y2="49.961%"
                    id="prefix__a"
                >
                    <Stop stopColor="red" offset="0%" />
                    <Stop stopColor="#F28D71" offset="100%" />
                </LinearGradient>
            </Defs>
            <Path
                d="M8.813.5c-.537 0-1.028.179-1.462.527-.443.355-.735.81-.909 1.14L6 3.005l-.442-.84c-.174-.329-.466-.784-.91-1.14A2.287 2.287 0 003.189.5a2.51 2.51 0 00-1.902.86C.79 1.917.5 2.7.5 3.59c0 2.096 1.702 3.492 4.129 5.64.367.324.778.689 1.533 1.076.429-.386.84-.75 1.21-1.077C9.797 7.082 11.5 5.686 11.5 3.59c0-.888-.29-1.671-.786-2.23A2.51 2.51 0 008.812.5z"
                fill="url(#prefix__a)"
                stroke="url(#prefix__a)"
                fillRule="evenodd"
            />
        </Svg>
    )
}

export default RNSVG_restaurant_fav_heart
