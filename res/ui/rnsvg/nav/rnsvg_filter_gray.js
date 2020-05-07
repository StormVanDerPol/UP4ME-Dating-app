import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function RNSVG_filter_gray() {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 18 18">
            <G fill="#D8D8D8" fillRule="nonzero">
                <Path d="M1.628 15H.75a.75.75 0 100 1.5h.878A2.25 2.25 0 003.75 18H6a2.25 2.25 0 002.122-1.5h9.128a.75.75 0 100-1.5H8.122A2.25 2.25 0 006 13.5H3.75A2.25 2.25 0 001.628 15zM6 15a.75.75 0 110 1.5H3.75a.75.75 0 110-1.5H6zM3.878 8.25H.75a.75.75 0 100 1.5h3.128A2.25 2.25 0 006 11.25h2.25a2.25 2.25 0 002.122-1.5h6.878a.75.75 0 100-1.5h-6.878a2.25 2.25 0 00-2.122-1.5H6a2.25 2.25 0 00-2.122 1.5zm4.372 0a.75.75 0 110 1.5H6a.75.75 0 110-1.5h2.25zM9.878 1.5H.75a.75.75 0 100 1.5h9.128A2.25 2.25 0 0012 4.5h2.25A2.25 2.25 0 0016.372 3h.878a.75.75 0 100-1.5h-.878A2.25 2.25 0 0014.25 0H12a2.25 2.25 0 00-2.122 1.5zm4.372 0a.75.75 0 110 1.5H12a.75.75 0 110-1.5h2.25z" />
            </G>
        </Svg>
    )
}

export default RNSVG_filter_gray
