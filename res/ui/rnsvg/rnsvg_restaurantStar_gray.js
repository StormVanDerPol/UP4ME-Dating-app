import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function RNSVG_restaurant_star_gray() {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 13 12">
            <Path
                d="M12.966 4.535a.685.685 0 00-.595-.458L8.62 3.749 7.135.404A.692.692 0 006.5 0a.692.692 0 00-.635.404L4.38 3.75l-3.753.328a.686.686 0 00-.594.458.65.65 0 00.202.707l2.836 2.396-.836 3.548c-.061.26.044.53.269.687a.708.708 0 00.758.032L6.5 10.042l3.235 1.863a.71.71 0 00.76-.032.654.654 0 00.269-.687l-.837-3.548 2.836-2.396a.65.65 0 00.203-.707z"
                fill="#ccc"
                fillRule="evenodd"
            />
        </Svg>
    )
}

export default RNSVG_restaurant_star_gray
