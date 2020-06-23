import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function RNSVG_location() {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 13 15">
            <Path
                d="M6.5 1C9.538 1 12 3.295 12 6.126c0 1.888-1.833 4.846-5.5 8.874C2.833 10.972 1 8.014 1 6.126 1 3.296 3.462 1 6.5 1zm.016 2.381c-1.41 0-2.554 1.066-2.554 2.38 0 1.316 1.143 2.382 2.554 2.382 1.41 0 2.554-1.066 2.554-2.381 0-1.315-1.143-2.381-2.554-2.381z"
                stroke="#4A4A4A"
                strokeWidth={0.805}
                fill="none"
                fillRule="evenodd"
            />
        </Svg>
    )
}

export default RNSVG_location
