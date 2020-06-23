import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function RNSVG_filter_colour() {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 18 18">
            <Defs>
                <LinearGradient x1="50%" y1="99.302%" x2="50%" y2="0%" id="prefix__a">
                    <Stop stopColor="#FEA15A" offset="0%" />
                    <Stop stopColor="#D100A3" offset="100%" />
                </LinearGradient>
                <LinearGradient x1="50%" y1="99.302%" x2="50%" y2="0%" id="prefix__b">
                    <Stop stopColor="#FEA15A" offset="0%" />
                    <Stop stopColor="#D100A3" offset="100%" />
                </LinearGradient>
            </Defs>
            <G fillRule="nonzero" fill="none">
                <Path
                    d="M3 1.628V.75a.75.75 0 10-1.5 0v.878A2.25 2.25 0 000 3.75V6c0 .98.626 1.813 1.5 2.122v9.128a.75.75 0 101.5 0V8.122A2.25 2.25 0 004.5 6V3.75A2.25 2.25 0 003 1.628zM3 6a.75.75 0 11-1.5 0V3.75a.75.75 0 111.5 0V6zM9.75 3.878V.75a.75.75 0 10-1.5 0v3.128A2.25 2.25 0 006.75 6v2.25c0 .98.626 1.813 1.5 2.122v6.878a.75.75 0 101.5 0v-6.878a2.25 2.25 0 001.5-2.122V6a2.25 2.25 0 00-1.5-2.122zm0 4.372a.75.75 0 11-1.5 0V6a.75.75 0 111.5 0v2.25z"
                    fill="url(#prefix__a)"
                    transform="rotate(-90 9 9)"
                />
                <Path
                    d="M16.5 9.878V.75a.75.75 0 10-1.5 0v9.128A2.25 2.25 0 0013.5 12v2.25c0 .98.626 1.813 1.5 2.122v.878a.75.75 0 101.5 0v-.878A2.25 2.25 0 0018 14.25V12a2.25 2.25 0 00-1.5-2.122zm0 4.372a.75.75 0 11-1.5 0V12a.75.75 0 111.5 0v2.25z"
                    fill="url(#prefix__b)"
                    transform="rotate(-90 9 9)"
                />
            </G>
        </Svg>
    )
}

export default RNSVG_filter_colour
