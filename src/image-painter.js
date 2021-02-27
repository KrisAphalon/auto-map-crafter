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
    const min = Math.min(
        tileData[0],
        tileData[1],
        tileData[2],
        tileData[3]
    )
    const max = Math.max(
        tileData[0],
        tileData[1],
        tileData[2],
        tileData[3]
    )

    //console.log(min)

    const lowerColor = COLOR.COLOR_ARRAY[min].toLowerCase()
    const higherColor = COLOR.COLOR_ARRAY[max].toLowerCase()

    const num = arrayToBinary(tileData, max)
    switch (num)
    {
        case 8:
        {
            return `res/img/${higherColor}1.png`
        }
        case 12:
        {
            return `res/img/${higherColor}2.png`
        }
        case 4:
        {
            return `res/img/${higherColor}3.png`
        }
        case 10:
        {
            return `res/img/${higherColor}4.png`
        }
        case 15:
        {
            return `res/img/${higherColor}5.png`
        }
        case 5:
        {
            return `res/img/${higherColor}6.png`
        }
        case 2:
        {
            return `res/img/${higherColor}7.png`
        }
        case 3:
        {
            return `res/img/${higherColor}8.png`
        }
        case 1:
        {
            return `res/img/${higherColor}9.png`
        }
        case 0:
        {
            return `res/img/${lowerColor}5.png`
        }
        case 14:
        {
            return `res/img/${higherColor}10.png`
        }
        case 13:
        {
            return `res/img/${higherColor}11.png`
        }
        case 11:
        {
            return `res/img/${higherColor}12.png`
        }
        case 7:
        {
            return `res/img/${higherColor}13.png`
        }
        default:
        {
            return ``
        }
    }
}

export function paintTileImage(ctx, x, y, tileWidth, imagePath)
{
    const img = new Image()
    img.onload = function ()
    {
        ctx.drawImage(img, x * tileWidth, y * tileWidth, tileWidth, tileWidth)
    }
    img.src = imagePath
}

export function paintRawImage(ctx, array, tileWidth)
{
    for (let i = 0; i < array.length; i++)
    {
        for (let j = 0; j < array[i].length; j++)
        {
            const colorName = COLOR.COLOR_NAMES[COLOR.COLOR_ARRAY[array[i][j]]]
            const colors = COLOR.COLOR_RGB[colorName]
            ctx.fillStyle = `rgb(${colors[0]},${colors[1]},${colors[2]})`
            ctx.fillRect(j * tileWidth / 2, i * tileWidth / 2, tileWidth / 2, tileWidth / 2)
        }
    }
}

export function paintImage(ctx, array, tileWidth)
{
    for (let i = 0; i < array.length / 2; i++)
    {
        for (let j = 0; j < array[i].length / 2; j++)
        {
            const w = i * 2
            const h = j * 2
            const path = getTileImagePath([
                array[w][h], array[w][h + 1],
                array[w + 1][h], array[w + 1][h + 1]
            ])
            paintTileImage(ctx, j, i, tileWidth, path)
        }
    }
}
