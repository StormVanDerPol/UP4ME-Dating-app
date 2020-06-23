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
import { View } from "react-native"
import { matchBtnStyle } from "./matchStyle"

function RNSVG_match_yes() {
    return (

        <View style={matchBtnStyle.container}>

            <Svg width={'100%'} height={'100%'} viewBox="0 0 58 58">
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
                    {/* <Ellipse id="prefix__b" cx={24.839} cy={25} rx={24.839} ry={25} /> */}
                </Defs>
                <G fill="none" fillRule="evenodd">
                    <G transform="translate(4.323 2)">
                        <Use fill="#000" filter="url(#prefix__a)" xlinkHref="#prefix__b" />
                        <Use fill="#FFF" xlinkHref="#prefix__b" />
                    </G>
                    <Path
                        d="M29.671 14.516c-1.304 0-2.5.409-3.554 1.214-1.01.772-1.684 1.756-2.08 2.471-.396-.715-1.069-1.699-2.08-2.471a5.735 5.735 0 00-3.553-1.214c-3.64 0-6.385 2.942-6.385 6.843 0 4.215 3.424 7.098 8.608 11.464.88.741 1.879 1.581 2.916 2.477a.755.755 0 00.989 0 295.297 295.297 0 012.916-2.478c5.183-4.365 8.608-7.248 8.608-11.463 0-3.901-2.745-6.843-6.385-6.843z"
                        fill="url(#prefix__c)"
                        transform="translate(4 4)"
                    />
                </G>
            </Svg>
        </View>
    )
}


export default RNSVG_match_yes
