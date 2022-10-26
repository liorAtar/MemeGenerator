'use-strict'

let gElCanvas
let gCtx
let gInitPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()

    addListeners()
    renderCanvas()

    // RECT
    gInitPos = { x: 0, y: 0 }
    initialPos()
}

/**
 * Resize the canvas by container height and width
 */
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

/**
 * Render Selected img on canvas
 */
function renderCanvas() {
    loadImg(renderMeme)
}

/**
 * Load selected image
 */
function loadImg(onImageReady) {
    let currMeme = getMeme()
    let img = new Image() // Create a new html img element
    img.src = `/../img/${currMeme.selectedImgId}.jpg` // Set the img src to the img file we read
    img.onload = onImageReady.bind(null, img)
}

function initialPos() {
    // RECT
    const currLine = getCurrLine()
    currLine.pos.x = 0
    currLine.pos.y = 0

    // gInitPos = { x: gElCanvas.width / 2, y: currLine.size }
    // currLine.pos.x = gInitPos.x
    // currLine.pos.y = gInitPos.y
}

/**
 * Draw the img on the canvas
 */
function renderMeme(img) {
    var meme = getMeme()
    // var currLine = getCurrLine()

    var canvasHeight = (img.height * gElCanvas.width) / img.width
    gElCanvas.height = canvasHeight
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

    meme.lines.map(line => drawText(line.txt, line.pos.x, line.pos.y))
}

/**
 * Input Enter Text Changed
 * @param {*} ev 
 */
function textInputChanged(ev) {
    var txt = ev.value
    setCurrLineTxt(txt)
    renderCanvas()
}

/**
 * Draw current text on canvas
 * @param {*} text 
 * @param {*} x 
 * @param {*} y 
 */
function drawText(text, x, y) {
    const currLine = getCurrLine()

    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = currLine.color

    gCtx.textAlign = "center"
    gCtx.font = `${currLine.size}px Impact`

    // RECT
    // gCtx.fillRect(x, y, gElCanvas.width, currLine.size)

    var lineHeight = currLine.size * 1.286;

    gCtx.fillText(text, x + (gElCanvas.width / 2), y + lineHeight / 2 + (currLine.size / 2)) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x + (gElCanvas.width / 2), y + lineHeight / 2 + (currLine.size / 2)) // Draws (strokes) a given text at the given (x, y) position.

    gCtx.strokeRect(x, y, gElCanvas.width, lineHeight);
}

const calcFontMetrics = (ctx, text) => {
    const {
        actualBoundingBoxAscent: abba,
        actualBoundingBoxDescent: abbd,
        fontBoundingBoxAscent: fbba,
        fontBoundingBoxDescent: fbbd,
        width
    } = ctx.measureText(text);
    return {
        actualHeight: abba + abbd,
        fontHeight: fbba + fbbd,
        fontWidth: width
    };
};

function renderLine() {
    //Get the props we need from the circle 
    const { pos, txt } = getCurrLine()
    //Draw the circle
    drawText(txt, pos.x, pos.y)
}

//Handle the listeners
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev 
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    //Get the ev pos from mouse or touch
    document.body.style.cursor = 'grab'
    console.log('ev', ev)

    const pos = getEvPos(ev)
    const lineIdx = isClicked(ev)
    if (lineIdx < 0) return
    setCurrLine(lineIdx)
    console.log('entered')
    setCurrLineDrag(true)
    //Save the pos we start from 
    gStartPos = pos
    document.querySelector('.txt-input').placeholder = getCurrLine().txt
    document.querySelector('.txt-input').value = ''
}

function isClicked(ev) {
    var meme = getMeme()
    
    const pos = getEvPos(ev)

    const idx = meme.lines.findIndex(line => {
        // Check if the click coordinates are inside the bar coordinates
        return pos.x > line.pos.x && pos.x< line.pos.x + gElCanvas.width &&
        pos.y > line.pos.y && pos.y < line.pos.y + line.size
    })
    console.log('idx', idx)

    return idx
}

function onMove(ev) {
    const { isDrag } = getCurrLine()
    if (!isDrag) return
    document.body.style.cursor = 'all-scroll'
    const pos = getEvPos(ev)
    //Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveCurrLine(dx, dy)
    //Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    //The canvas is render again after every move
    renderCanvas()
}

function onUp() {
    setCurrLineDrag(false)
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    //Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}
