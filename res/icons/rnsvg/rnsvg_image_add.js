import * as React from "react"
import Svg, {
    Defs,
    LinearGradient,
    Stop,
    G,
    Circle,
    Path,
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function RNSVG_image_add() {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 38 38">
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
            <G fill="none" fillRule="evenodd">
                <Circle fill="url(#prefix__a)" cx={19} cy={19} r={19} />
                <Path
                    d="M27.015 17.594h-6.609v-6.597a.995.995 0 00-.982-.997h-.846a.996.996 0 00-.984.997v6.597h-6.61a.984.984 0 00-.984.982v.85c0 .543.442.98.984.98h6.61v6.621c0 .543.441.973.984.973h.846c.543 0 .982-.43.982-.973v-6.62h6.609a.983.983 0 00.985-.98v-.851a.984.984 0 00-.985-.982z"
                    fill="#FFF"
                />
            </G>
        </Svg>
    )
}

export default RNSVG_image_add
