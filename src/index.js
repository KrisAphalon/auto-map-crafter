import {convertImage} from './image-converter'
import {paintImage, paintRawImage} from './image-painter'
import {fixArray} from './array-fixer'

const canvas = document.getElementById('CANVAS1')
const context = canvas.getContext('2d')

const img = new Image()
img.onload = function ()
{
    context.drawImage(img, 0, 0)
    const arr = convertImage(context, 32)
    console.log(arr)


    const canvas2 = document.getElementById('CANVAS2')
    const context2 = canvas2.getContext('2d')
    paintRawImage(context2, arr, 32)

    const canvas3 = document.getElementById('CANVAS3')
    const context3 = canvas3.getContext('2d')
    paintImage(context3, arr, 32)

    fixArray(arr)

    const canvas5 = document.getElementById('CANVAS5')
    const context5 = canvas5.getContext('2d')
    paintRawImage(context5, arr, 32)

    const canvas6 = document.getElementById('CANVAS6')
    const context6 = canvas6.getContext('2d')
    paintImage(context6, arr, 32)
}
img.src = 'res/input.png'


