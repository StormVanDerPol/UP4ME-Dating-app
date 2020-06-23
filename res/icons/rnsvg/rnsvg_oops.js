import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, Text, TSpan } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function RNSVG_oops() {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 215 67">
            <Defs>
                <LinearGradient x1="100%" y1="50%" x2="0%" y2="50%" id="prefix__a">
                    <Stop stopColor="#FFCF93" offset="0%" />
                    <Stop stopColor="#D100A3" offset="100%" />
                </LinearGradient>
            </Defs>
            <Text
                transform="translate(-52 -115)"
                fill="url(#prefix__a)"
                fillRule="evenodd"
                fontFamily="Quicksand-Light_Medium, Quicksand"
                fontSize={72}
                fontWeight={400}
            >
                <TSpan x={49.3} y={167}>
                    {"Oops..!"}
                </TSpan>
            </Text>
        </Svg>
    )
}

export default RNSVG_oops
