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

function RNSVG_edit() {
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
                    d="M22.124 13.247l1.595-1.54a2.216 2.216 0 013.135.054l1.088 1.127c.85.88.832 2.278-.055 3.135l-1.595 1.54-4.168-4.316zm-7.976 7.703l7.178-6.932 4.168 4.316-7.178 6.932-4.168-4.316zm-2.702 6.779l1.904-6.01 4.168 4.317-6.072 1.693z"
                    fill="#FFF"
                />
            </G>
        </Svg>
    )
}

export default RNSVG_edit