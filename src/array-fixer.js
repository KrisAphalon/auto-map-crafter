import * as COLOR from './color-constants.json'

/**
 * Extends array, doubling the edges
 * @param array
 */
function extendArray(array)
{
    // using slice() to make true duplicate
    array.unshift(array[0].slice())
    array.unshift(array[0].slice())
    array.push(array[array.length - 1].slice())
    array.push(array[array.length - 1].slice())

    for (let i = 0; i < 2; i++)
    {
        for (let j = 0; j < array.length; j++)
        {
            array[j].unshift(array[j][0])
            array[j].push(array[j][array[j].length - 1])
        }
    }
}


/**
 * Shrinks array, removing edges from it
 * @param array
 */
function shrinkArray(array)
{
    array.shift()
    array.shift()
    array.pop()
    array.pop()
    for (let i = 0; i < 2; i++)
    {
        for (let j = 0; j < array.length; j++)
        {
            array[j].shift()
            array[j].pop()
        }
    }
}

let currentEqual = [1, 2]

function eql(one, two)
{
    for (const number of currentEqual)
    {
        if (one === number) one = currentEqual[0]
        if (two === number) two = currentEqual[0]
    }
    return one === two
}

export function fixArray(array)
{
    const eqlArr = [
        [3, 4],
        [2, 3],
        [1, 2],
        [0, 1]
    ]
    extendArray(array)
    for (let i = 0; i < COLOR.COLOR_ARRAY.length - 1; i++)
    {
        currentEqual = eqlArr[i]
        for (let j = 0; j * 4 < array.length - 3; j = j + 0.5)
        {
            for (let k = 0; k * 4 < array[0].length - 3; k = k + 0.5)
            {
                const x = k * 4
                const y = j * 4

                // 0 1 2 3
                // 4 5 6 7
                // 8 9 a b
                // c d e f

                fixDoubleEdges(array, y, x)
                fixLonelyMiddle(array, y, x)
                fixHalfMiddle(array, y, x)
            }
        }
    }
    shrinkArray(array)
}

function fixDoubleEdges(array, row, column)
{
    // if 4 == 5 && 8 == 9
    if (eql(array[row][column + 1], array[row + 1][column + 1]) && eql(array[row][column + 2], array[row + 1][column + 2]))
    {
        if (!eql(array[row][column + 1], array[row][column + 2]))
        {
            array[row][column + 2] = array[row][column + 1]
            array[row + 1][column + 2] = array[row][column + 1]
        }
    }
    // if 1 == 5 && 2 == 6
    if (eql(array[row + 1][column], array[row + 1][column + 1]) && eql(array[row + 2][column], array[row + 2][column + 1]))
    {
        if (!eql(array[row + 1][column], array[row + 2][column]))
        {
            array[row + 2][column] = array[row + 1][column]
            array[row + 2][column + 1] = array[row + 1][column]
        }
    }
    // if 6 == 7 && a == b
    if (eql(array[row + 2][column + 1], array[row + 3][column + 1]) && eql(array[row + 2][column + 2], array[row + 3][column + 2]))
    {
        if (!eql(array[row + 2][column + 1], array[row + 2][column + 2]))
        {
            array[row + 2][column + 2] = array[row + 2][column + 1]
            array[row + 3][column + 2] = array[row + 2][column + 1]
        }
    }
    // if a == e && 9 == d
    if (eql(array[row + 2][column + 2], array[row + 2][column + 3]) && eql(array[row + 1][column + 2], array[row + 1][column + 3]))
    {
        if (!eql(array[row + 2][column + 2], array[row + 1][column + 2]))
        {
            array[row + 1][column + 2] = array[row + 2][column + 2]
            array[row + 1][column + 3] = array[row + 2][column + 2]
        }
    }
}

function fixLonelyMiddle(array, row, column)
{
    const equalToTopLeft = eql(array[row + 1][column + 1], array[row + 1][column + 2])
        + eql(array[row + 1][column + 1], array[row + 2][column + 1])
        + eql(array[row + 1][column + 1], array[row + 2][column + 2])
    if (equalToTopLeft === 0)
    {
        array[row + 1][column + 1] = array[row + 1][column + 2]
    }
    else if (equalToTopLeft === 2)
    {
        array[row + 1][column + 2] = array[row + 1][column + 1]
        array[row + 2][column + 1] = array[row + 1][column + 1]
        array[row + 2][column + 2] = array[row + 1][column + 1]
    }
}

function fixHalfMiddle(array, row, column)
{
    const equalToTopLeft = eql(array[row + 1][column + 1], array[row + 1][column + 2])
        + eql(array[row + 1][column + 1], array[row + 2][column + 1])
        + eql(array[row + 1][column + 1], array[row + 2][column + 2])

    const min = Math.min(
        array[row + 1][column + 1],
        array[row + 1][column + 2],
        array[row + 2][column + 1],
        array[row + 2][column + 2]
    )

    if (equalToTopLeft === 1)
    {
        array[row + 1][column + 1] = min
        array[row + 1][column + 2] = min
        array[row + 2][column + 1] = min
        array[row + 2][column + 2] = min
    }
}


export function fixDrasticColorShift(array)
{
    const check = [
        [-1, -1],
        [-1, 0],
        [-1, 2],
        [0, -1],
        [0, 2],
        [2, -1],
        [2, 0],
        [2, 2]
    ]

    for (let i = 1; i < array.length - 1; i+= 2)
    {
        for (let j = 1; j < array[0].length - 1; j+= 2)
        {
            for (let k = 0; k < check.length; k++)
            {
                if (array[i][j] - array[i + check[k][0]][j + check[k][1]] > 1)
                {
                    const newColor = Math.round((array[i + check[k][0]][j + check[k][1]] + array[i][j]) / 2)
                    array[i][j] = newColor
                    array[i + 1][j] = newColor
                    array[i][j + 1] = newColor
                    array[i + 1][j + 1] = newColor
                    break
                }
            }
        }
    }
}
