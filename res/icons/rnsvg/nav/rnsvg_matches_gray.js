import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function RNSVG_matches_gray() {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 23 20">
            <Path
                d="M16.89 0c-1.247 0-2.392.39-3.4 1.158-.967.736-1.611 1.675-1.99 2.357-.379-.682-1.023-1.62-1.99-2.357A5.498 5.498 0 006.11 0C2.625 0 0 2.806 0 6.527c0 4.02 3.277 6.77 8.237 10.935.843.707 1.797 1.508 2.79 2.363a.724.724 0 00.946 0c.993-.855 1.947-1.656 2.79-2.364C19.723 13.298 23 10.547 23 6.527 23 2.807 20.374 0 16.89 0z"
                fill="#D8D8D8"
                fillRule="evenodd"
            />
        </Svg>
    )
}

export default RNSVG_matches_gray
