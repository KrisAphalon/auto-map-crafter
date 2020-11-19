import * as COLOR from './color-constants.json'

function getColorName(r, g, b, a)
{
    if (r < 20) return COLOR.COLOR_NAMES.SEA
    else return COLOR.COLOR_NAMES.SAND
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
        SEA: 0,
        SAND: 0
    }

    for (let i = 0; i < color.length; i = i + 4)
    {
        pixelColors[getColorName(color[i], color[i + 1], color[i + 2], color[i + 3])] += 1
    }

    if (pixelColors.SAND > pixelColors.SEA)
    {
        return COLOR.COLOR_NAMES.SAND
    }
    else
    {
        return COLOR.COLOR_NAMES.SEA
    }
}


export function convertImage(ctx, tileWidth)
{
    const width = ctx.canvas.width

    const tileArr = []
    for (let i = 0; i < width * 2 / tileWidth; i++)
    {
        tileArr[i] = []
        for (let j = 0; j < width * 2 / tileWidth; j++)
        {
            tileArr[i][j] = COLOR.COLOR_NUMBERS[getTileColor(ctx, j, i, tileWidth / 2)]
        }
    }
    return tileArr
}

