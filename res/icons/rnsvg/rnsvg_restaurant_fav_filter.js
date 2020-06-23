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

function RNSVG_restaurant_fav_filter() {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 25 25">
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
                <LinearGradient
                    x1="6.439%"
                    y1="49.961%"
                    x2="96.902%"
                    y2="49.961%"
                    id="prefix__b"
                >
                    <Stop stopColor="red" offset="0%" />
                    <Stop stopColor="#F28D71" offset="100%" />
                </LinearGradient>
            </Defs>
            <G transform="translate(1 1)" fill="none" fillRule="evenodd">
                <Path
                    d="M13.813 7.5c-.537 0-1.028.179-1.462.527-.443.355-.735.81-.909 1.14l-.442.839-.442-.84c-.174-.329-.466-.784-.91-1.14a2.287 2.287 0 00-1.46-.526 2.51 2.51 0 00-1.902.86C5.79 8.917 5.5 9.7 5.5 10.59c0 2.096 1.702 3.492 4.129 5.64.367.324.778.689 1.533 1.076.429-.386.84-.75 1.21-1.077 2.426-2.147 4.128-3.543 4.128-5.64 0-.888-.29-1.671-.786-2.23a2.51 2.51 0 00-1.902-.859z"
                    stroke="url(#prefix__a)"
                />
                <Circle stroke="url(#prefix__b)" cx={11.5} cy={11.5} r={11.5} />
            </G>
        </Svg>
    )
}

export default RNSVG_restaurant_fav_filter
