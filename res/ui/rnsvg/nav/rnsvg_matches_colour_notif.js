import * as React from "react"
import Svg, {
    Defs,
    LinearGradient,
    Stop,
    G,
    Path,
    Circle,
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function RNSVG_matches_colour_notif() {
    return (
        <Svg width={29} height={26} viewBox="0 0 29 26">
            <Defs>
                <LinearGradient
                    x1="4.234%"
                    y1="49.961%"
                    x2="101.246%"
                    y2="49.961%"
                    id="prefix__a"
                >
                    <Stop stopColor="#D626E7" offset="0%" />
                    <Stop stopColor="#FFAC01" offset="100%" />
                </LinearGradient>
                <LinearGradient
                    x1="99.651%"
                    y1="49.651%"
                    x2=".349%"
                    y2="49.651%"
                    id="prefix__b"
                >
                    <Stop stopColor="#FEA15A" offset="0%" />
                    <Stop stopColor="#D100A3" offset="100%" />
                </LinearGradient>
            </Defs>
            <G fill="none" fillRule="evenodd">
                <Path
                    d="M16.89 0c-1.247 0-2.392.39-3.4 1.158-.967.736-1.611 1.675-1.99 2.357-.379-.682-1.023-1.62-1.99-2.357A5.498 5.498 0 006.11 0C2.625 0 0 2.806 0 6.527c0 4.02 3.277 6.77 8.237 10.935.843.707 1.797 1.508 2.79 2.363a.724.724 0 00.946 0c.993-.855 1.947-1.656 2.79-2.364C19.723 13.298 23 10.547 23 6.527 23 2.807 20.374 0 16.89 0z"
                    transform="translate(3 3)"
                    fill="url(#prefix__a)"
                />
                <Circle fill="url(#prefix__b)" cx={24.5} cy={4.5} r={4.5} />
            </G>
        </Svg>
    )
}

export default RNSVG_matches_colour_notif
