import * as COLOR from './color-constants.json'

export function fixArray(array)
{
    fixDoubleEdges(array)
}

function fixDoubleEdges(array)
{
    for (let i = 0; i * 4 < array.length - 3; i = i + 0.5)
    {
        for (let j = 0; j * 4 < array[0].length - 3; j = j + 0.5)
        {
            const w = j * 4
            const h = i * 4

            // 0 1 2 3
            // 4 5 6 7
            // 8 9 a b
            // c d e f

            // if 4 == 5 && 8 == 9
            if (array[w][h + 1] === array[w + 1][h + 1] && array[w][h + 2] === array[w + 1][h + 2])
            {
                if (array[w][h + 1] !== array[w][h + 2])
                {
                    array[w][h + 2] = array[w][h + 1]
                    array[w + 1][h + 2] = array[w][h + 1]
                }
            }
            // if 1 == 5 && 2 == 6
            if (array[w + 1][h] === array[w + 1][h + 1] && array[w + 2][h] === array[w + 2][h + 1])
            {
                if (array[w + 1][h] !== array[w + 2][h])
                {
                    array[w + 2][h] = array[w + 1][h]
                    array[w + 2][h + 1] = array[w + 1][h]
                }
            }
            // if 6 == 7 && a == b
            if (array[w + 2][h + 1] === array[w + 3][h + 1] && array[w + 2][h + 2] === array[w + 3][h + 2])
            {
                if (array[w + 2][h + 1] !== array[w + 2][h + 2])
                {
                    array[w + 2][h + 2] = array[w + 2][h + 1]
                    array[w + 3][h + 2] = array[w + 2][h + 1]
                }
            }
            // if a == e && 9 == d
            if (array[w + 2][h + 2] === array[w + 2][h + 3] && array[w + 1][h + 2] === array[w + 1][h + 3])
            {
                if (array[w + 2][h + 2] !== array[w + 1][h + 2])
                {
                    array[w + 1][h + 2] = array[w + 2][h + 2]
                    array[w + 1][h + 3] = array[w + 2][h + 2]
                }
            }
        }
    }
}
