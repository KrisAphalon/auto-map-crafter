import * as COLOR from './color-constants.json'

function arrayToBinary(arr, key)
{
    let number = 0
    if (arr[0] === key) number += 1
    if (arr[1] === key) number += 2
    if (arr[2] === key) number += 4
    if (arr[3] === key) number += 8

    return number
}

function getTileImagePath(tileData)
{
    const num = arrayToBinary(tileData, COLOR.COLOR_NUMBERS.SAND)
    switch (num)
    {
        case 8:
        {
            return 'res/img/sand1.png'
        }
        case 12:
        {
            return 'res/img/sand2.png'
        }
        case 4:
        {
            return 'res/img/sand3.png'
        }
        case 10:
        {
            return 'res/img/sand4.png'
        }
        case 15:
        {
            return 'res/img/sand5.png'
        }
        case 5:
        {
            return 'res/img/sand6.png'
        }
        case 2:
        {
            return 'res/img/sand7.png'
        }
        case 3:
        {
            return 'res/img/sand8.png'
        }
        case 1:
        {
            return 'res/img/sand9.png'
        }
        case 0:
        {
            return 'res/img/water5.png'
        }
        case 14:
        {
            return 'res/img/sand10.png'
        }
        case 13:
        {
            return 'res/img/sand11.png'
        }
        case 11:
        {
            return 'res/img/sand12.png'
        }
        case 7:
        {
            return 'res/img/sand13.png'
        }
        default:
        {
            return ''
        }
    }
}

function paintTileImage(ctx, x, y, tileWidth, imagePath)
{
    const img = new Image()
    img.onload = function ()
    {
        ctx.drawImage(img, x * tileWidth, y * tileWidth)
    }
    img.src = imagePath
}

export function paintRawImage(ctx, array, tileWidth)
{
    for (let i = 0; i < array.length ; i++)
    {
        for (let j = 0; j < array[i].length; j++)
        {
            const colorName = COLOR.COLOR_NAMES[COLOR.COLOR_ARRAY[array[j][i]]]
            const colors = COLOR.COLOR_RGB[colorName]
            ctx.fillStyle = `rgb(${colors[0]},${colors[1]},${colors[2]})`;
            ctx.fillRect(i * tileWidth / 2, j * tileWidth / 2, tileWidth / 2, tileWidth / 2);
        }
    }
}

export function paintImage(ctx, array, tileWidth)
{
    for (let i = 0; i < array.length / 2 ; i++)
    {
        for (let j = 0; j < array[i].length / 2; j++)
        {
            const w = j * 2
            const h = i * 2
            const path = getTileImagePath([
                array[w][h], array[w][h + 1],
                array[w + 1][h], array[w + 1][h + 1]
            ])
            paintTileImage(ctx, i, j, tileWidth, path)
        }
    }
}
