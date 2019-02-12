const generateRandomColor = () => `#${(((1 << 24) * Math.random()) | 0).toString(16)}`

// receives array of current colors and checks if generated color was already taken
const getNewUserColor = currentColors => {
    const newColor = generateRandomColor()

    if (currentColors.includes(newColor)) {
        return getNewUserColor(currentColors)
    }

    return newColor
}

// utility function used to get dominant color
const mode = arr =>
    arr.reduce(
        (current, item) => {
            if (item) {
                const val = (current.numMapping[item] = (current.numMapping[item] || 0) + 1)
                if (val > current.greatestFreq) {
                    current.greatestFreq = val
                    current.mode = item
                }
            }
            return current
        },
        { mode: null, greatestFreq: -Infinity, numMapping: {} },
    ).mode

module.exports = {
    getNewUserColor,
    mode,
}
