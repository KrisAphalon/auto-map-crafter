import * as COLOR from './color-constants.json'

function getColorName(r, g, b, a)
{
    for (const color in COLOR.COLOR_RGB)
    {
        let t = 0
        if (COLOR.COLOR_RGB[color][0] - r <= 5 && -5 <= COLOR.COLOR_RGB[color][0] - r) t++
        if (COLOR.COLOR_RGB[color][1] - g <= 5 && -5 <= COLOR.COLOR_RGB[color][1] - g) t++
        if (COLOR.COLOR_RGB[color][2] - b <= 5 && -5 <= COLOR.COLOR_RGB[color][2] - b) t++

        if (t === 3)
            return color
    }
    return COLOR.COLOR_NAMES.SEA
}

function getTileColor(ctx, x, y, width)
{
    const data = ctx.getImageData(
        x * width,
        y * width,
        width,
        width
    )
    const color = data.data

    const pixelColors = {
        VOID: 0,
        SEA: 0,
        SAND: 0,
        GRASS: 0,
        CLIFF: 0
    }


    for (let i = 0; i < color.length; i = i + 4)
    {
        pixelColors[getColorName(color[i], color[i + 1], color[i + 2], color[i + 3])] += 1
    }

    let max = ''
    let maxNumber = 0
    for (const color in pixelColors)
    {
        if (pixelColors[color] > maxNumber)
        {
            max = color
            maxNumber = pixelColors[color]
        }
    }

    return max
}


export function convertImage(ctx, tileWidth)
{
    const height = ctx.canvas.height
    const width = ctx.canvas.width

    const tileArr = []
    for (let i = 0; i < height * 2 / tileWidth; i++)
    {
        tileArr[i] = []
        for (let j = 0; j < width * 2 / tileWidth; j++)
        {
            tileArr[i][j] = COLOR.COLOR_NUMBERS[getTileColor(ctx, j, i, tileWidth / 2)]
        }
    }
    return tileArr
}
