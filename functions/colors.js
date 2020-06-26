export const invertRGB = ({ r, g, b }) => {

    if (r <= 255)
        r = 255 - r;

    if (g <= 255)
        g = 255 - g

    if (b <= 255)
        b = 255 - b;

    return { r, g, b }
}

export const rnRGB = ({ r, g, b }) => {
    return `rgb(${r}, ${g}, ${b})`
}