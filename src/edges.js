import * as COLOR from './color-constants.json'
import {paintTileImage} from './image-painter'


function arrayToBinary(arr, key)
{
    let number = 15
    if (arr[0] === key) number -= 1
    if (arr[1] === key) number -= 2
    if (arr[2] === key) number -= 4
    if (arr[3] === key) number -= 8

    return number
}

function convertArrayToTiles(array, bottomColor)
{
    const tileArr = []
    for (let i = 0; i < array.length / 2; i++)
    {
        tileArr[i] = []
        for (let j = 0; j < array[i].length / 2; j++)
        {
            const w = i * 2
            const h = j * 2

            tileArr[i][j] = arrayToBinary([
                array[w][h], array[w][h + 1],
                array[w + 1][h], array[w + 1][h + 1]
            ], bottomColor)
        }
    }
    return tileArr
}

export function paintEdges(ctx, array, tileWidth)
{
    const tileArr = convertArrayToTiles(array, COLOR.COLOR_NUMBERS.SEA)
    for (let i = 0; i < tileArr.length; i++)
    {
        for (let j = 0; j < tileArr[i].length; j++)
        {
            switch (tileArr[i][j])
            {
                // 0 1
                // 0 1
                case 10:
                {
                    if (tileArr[i][j - 1] === 0)
                    {
                        paintTileImage(ctx, j - 1, i, tileWidth, 'res/img/water-edges/edge4.png')
                        //return
                    }
                    if (tileArr[i][j - 1] === 1 || tileArr[i][j - 1] === 4)
                    {
                        paintTileImage(ctx, j - 1, i, tileWidth, 'res/img/water-edges/edge4half.png')
                    }
                    break
                }

                // 1 1
                // 0 0
                case 3:
                {
                    if (tileArr[i + 1] && tileArr[i + 1][j] === 0)
                    {
                        paintTileImage(ctx, j, i + 1, tileWidth, 'res/img/water-edges/edge8.png')
                    }
                    if (tileArr[i + 1] && (tileArr[i + 1][j] === 4 || tileArr[i + 1][j] === 8))
                    {
                        paintTileImage(ctx, j, i + 1, tileWidth, 'res/img/water-edges/edge8half.png')
                    }
                    break
                }

                // 0 0
                // 1 1
                case 12:
                {
                    if (tileArr[i - 1] && tileArr[i - 1][j] === 0)
                    {
                        paintTileImage(ctx, j, i - 1, tileWidth, 'res/img/water-edges/edge2.png')
                    }
                    if (tileArr[i - 1] && (tileArr[i - 1][j] === 1 || tileArr[i - 1][j] === 2))
                    {
                        paintTileImage(ctx, j, i - 1, tileWidth, 'res/img/water-edges/edge2half.png')
                    }
                    break
                }

                // 1 0
                // 1 0
                case 5:
                {
                    if (tileArr[i][j + 1] === 0)
                    {
                        paintTileImage(ctx, j + 1, i, tileWidth, 'res/img/water-edges/edge6.png')
                    }
                    if (tileArr[i][j + 1] === 2 || tileArr[i][j + 1] === 8)
                    {
                        paintTileImage(ctx, j + 1, i, tileWidth, 'res/img/water-edges/edge6half.png')
                    }
                    break
                }

                // 0 0
                // 0 1
                case 8:
                {
                    if (tileArr[i][j - 1] === 0 || tileArr[i][j - 1] === 1)
                    {
                        paintTileImage(ctx, j - 1, i, tileWidth, 'res/img/water-edges/edge1.png')
                    }
                    if (tileArr[i - 1] && (tileArr[i - 1][j] === 0))
                    {
                        paintTileImage(ctx, j, i - 1, tileWidth, 'res/img/water-edges/edge1.png')
                    }
                    break
                }

                // 0 0
                // 1 0
                case 4:
                {
                    if (tileArr[i][j + 1] === 0 || tileArr[i][j + 1] === 2)
                    {
                        paintTileImage(ctx, j + 1, i, tileWidth, 'res/img/water-edges/edge3.png')
                    }
                    if (tileArr[i - 1] && tileArr[i - 1][j] === 0)
                    {
                        paintTileImage(ctx, j, i - 1, tileWidth, 'res/img/water-edges/edge3.png')
                    }
                    break
                }

                // 1 0
                // 0 0
                case 1:
                {
                    if (tileArr[i][j + 1] === 0 || tileArr[i][j + 1] === 8)
                    {
                        paintTileImage(ctx, j + 1, i, tileWidth, 'res/img/water-edges/edge9.png')
                    }
                    if (tileArr[i + 1] && tileArr[i + 1][j] === 0)
                    {
                        paintTileImage(ctx, j, i + 1, tileWidth, 'res/img/water-edges/edge9.png')
                    }
                    break
                }

                // 0 1
                // 0 0
                case 2:
                {
                    if (tileArr[i][j - 1] === 0 || tileArr[i][j - 1] === 4)
                    {
                        paintTileImage(ctx, j - 1, i, tileWidth, 'res/img/water-edges/edge7.png')
                    }
                    if (tileArr[i + 1] && tileArr[i + 1][j] === 0)
                    {
                        paintTileImage(ctx, j, i + 1, tileWidth, 'res/img/water-edges/edge7.png')
                    }
                    break
                }
            }
        }
    }
}

export function paintEdgesCliff(ctx, array, tileWidth)
{
    const tileArr = convertArrayToTiles(array, COLOR.COLOR_NUMBERS.VOID)
    for (let i = 0; i < tileArr.length; i++)
    {
        for (let j = 0; j < tileArr[i].length; j++)
        {
            switch (tileArr[i][j])
            {

                // 1 1
                // 0 0
                case 3:
                {
                    paintTileImage(ctx, j, i + 1, tileWidth, 'res/img/cliff-edges/edge8.png')
                    break
                }

                // 1 0
                // 0 0
                case 1:
                {
                    paintTileImage(ctx, j, i + 1, tileWidth, 'res/img/cliff-edges/edge9.png')
                    break
                }

                // 0 1
                // 0 0
                case 2:
                {
                    paintTileImage(ctx, j, i + 1, tileWidth, 'res/img/cliff-edges/edge7.png')
                    break
                }
            }
        }
    }
}
