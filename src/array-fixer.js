import * as COLOR from './color-constants.json'

export function fixArray(array)
{
    for (let i = 0; i * 4 < array.length - 3; i = i + 0.5)
    {
        for (let j = 0; j * 4 < array[0].length - 3; j = j + 0.5)
        {
            const row = j * 4
            const column = i * 4

            // 0 1 2 3
            // 4 5 6 7
            // 8 9 a b
            // c d e f

            fixDoubleEdges(array, row, column)
            fixLonelyMiddle(array, row, column)
            fixHalfMiddle(array, row, column)
        }
    }

}

function fixDoubleEdges(array, row, column)
{
    // if 4 == 5 && 8 == 9
    if (array[row][column + 1] === array[row + 1][column + 1] && array[row][column + 2] === array[row + 1][column + 2])
    {
        if (array[row][column + 1] !== array[row][column + 2])
        {
            array[row][column + 2] = array[row][column + 1]
            array[row + 1][column + 2] = array[row][column + 1]
        }
    }
    // if 1 == 5 && 2 == 6
    if (array[row + 1][column] === array[row + 1][column + 1] && array[row + 2][column] === array[row + 2][column + 1])
    {
        if (array[row + 1][column] !== array[row + 2][column])
        {
            array[row + 2][column] = array[row + 1][column]
            array[row + 2][column + 1] = array[row + 1][column]
        }
    }
    // if 6 == 7 && a == b
    if (array[row + 2][column + 1] === array[row + 3][column + 1] && array[row + 2][column + 2] === array[row + 3][column + 2])
    {
        if (array[row + 2][column + 1] !== array[row + 2][column + 2])
        {
            array[row + 2][column + 2] = array[row + 2][column + 1]
            array[row + 3][column + 2] = array[row + 2][column + 1]
        }
    }
    // if a == e && 9 == d
    if (array[row + 2][column + 2] === array[row + 2][column + 3] && array[row + 1][column + 2] === array[row + 1][column + 3])
    {
        if (array[row + 2][column + 2] !== array[row + 1][column + 2])
        {
            array[row + 1][column + 2] = array[row + 2][column + 2]
            array[row + 1][column + 3] = array[row + 2][column + 2]
        }
    }
}

function fixLonelyMiddle(array, row, column)
{
    const equalToTopLeft = (array[row + 1][column + 1] === array[row + 1][column + 2])
        + (array[row + 1][column + 1] === array[row + 2][column + 1])
        + (array[row + 1][column + 1] === array[row + 2][column + 2])
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
    const equalToTopLeft = (array[row + 1][column + 1] === array[row + 1][column + 2])
        + (array[row + 1][column + 1] === array[row + 2][column + 1])
        + (array[row + 1][column + 1] === array[row + 2][column + 2])

    if (equalToTopLeft === 1)
    {
        array[row + 1][column + 1] = 0
        array[row + 1][column + 2] = 0
        array[row + 2][column + 1] = 0
        array[row + 2][column + 2] = 0
    }
}
