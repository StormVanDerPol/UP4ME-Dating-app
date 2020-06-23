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

function RNSVG_matches_gray_notif() {
    return (
        <Svg width={29} height={26} viewBox="0 0 29 26">
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
                    d="M19.89 3c-1.247 0-2.392.39-3.4 1.158-.967.736-1.611 1.675-1.99 2.357-.379-.682-1.023-1.62-1.99-2.357A5.498 5.498 0 009.11 3C5.625 3 3 5.806 3 9.527c0 4.02 3.277 6.77 8.237 10.935.843.707 1.797 1.508 2.79 2.363a.724.724 0 00.946 0c.993-.855 1.947-1.656 2.79-2.364C22.723 16.298 26 13.547 26 9.527 26 5.807 23.374 3 19.89 3z"
                    fill="#D8D8D8"
                />
                <Circle fill="url(#prefix__a)" cx={24.5} cy={4.5} r={4.5} />
            </G>
        </Svg>
    )
}

export default RNSVG_matches_gray_notif
