export const MemeMath = {
    roundTwoDecimals: (num) => {

        return Math.round((num + Number.EPSILON) * 100) / 100

    }
}