import * as React from "react"
import Svg, {
    Defs,
    LinearGradient,
    Stop,
    Ellipse,
    G,
    Use,
    Path,
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title, filter */

function RNSVG_match_no() {
    return (
        <Svg width={58} height={58} viewBox="0 0 58 58">
            <Defs>
                <LinearGradient
                    x1="99.651%"
                    y1="49.651%"
                    x2=".349%"
                    y2="49.651%"
                    id="prefix__c"
                >
                    <Stop stopColor="#FEA15A" offset="0%" />
                    <Stop stopColor="#D100A3" offset="100%" />
                </LinearGradient>
                <Ellipse id="prefix__b" cx={24.839} cy={25} rx={24.839} ry={25} />
            </Defs>
            <G fill="none" fillRule="evenodd">
                <G transform="translate(4 2)">
                    <Use fill="#000" filter="url(#prefix__a)" xlinkHref="#prefix__b" />
                    <Use fill="#FFF" xlinkHref="#prefix__b" />
                </G>
                <Path
                    d="M24.839 20.01l-5.397-5.432a2.93 2.93 0 00-4.16-.004 2.977 2.977 0 00.003 4.187l5.397 5.433-5.397 5.432a2.977 2.977 0 00-.004 4.187 2.93 2.93 0 004.16-.004l5.398-5.432 5.397 5.432a2.93 2.93 0 004.16.004 2.977 2.977 0 00-.004-4.187l-5.397-5.432 5.397-5.433a2.977 2.977 0 00.004-4.187 2.93 2.93 0 00-4.16.004l-5.397 5.432z"
                    fill="url(#prefix__c)"
                    transform="translate(4 2)"
                />
            </G>
        </Svg>
    )
}

export default RNSVG_match_no
