import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function RNSVG_magnifying_glass() {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 16 16">
            <Path
                d="M15.902 14.96l-4.648-4.648a6.3 6.3 0 001.413-3.979A6.34 6.34 0 006.333 0 6.34 6.34 0 000 6.333a6.34 6.34 0 006.333 6.334 6.3 6.3 0 003.979-1.413l4.648 4.648c.13.13.34.13.471 0l.471-.47a.333.333 0 000-.472zm-9.569-3.627c-2.757 0-5-2.242-5-5 0-2.757 2.243-5 5-5 2.758 0 5 2.243 5 5 0 2.758-2.242 5-5 5z"
                fill="#A2A2A2"
                fillRule="nonzero"
            />
        </Svg>
    )
}

export default RNSVG_magnifying_glass
