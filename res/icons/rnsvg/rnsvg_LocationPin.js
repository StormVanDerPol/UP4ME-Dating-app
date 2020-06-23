import * as React from "react"
import Svg, {
    Defs,
    LinearGradient,
    Stop,
    G,
    Path,
    Ellipse,
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function RNSVG_LocationPin() {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 17 22">
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
                <Path
                    d="M16.61 7.895c0 2.907-2.71 7.462-8.134 13.665C3.054 15.357.342 10.802.342 7.895.342 3.535 3.984 0 8.476 0c4.493 0 8.134 3.534 8.134 7.895z"
                    fill="url(#prefix__a)"
                />
                <Ellipse fill="#FFF" cx={8.5} cy={7.333} rx={3.778} ry={3.667} />
            </G>
        </Svg>
    )
}

export default RNSVG_LocationPin