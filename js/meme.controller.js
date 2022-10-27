'use-strict'

let gSelectedTab = 'home'
let gElCanvas
let gCtx
let gInitPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    document.querySelector('.gallery').style.display = 'none'

    resizeCanvas()

    addListeners()
    renderCanvas()

    // RECT
    gInitPos = { x: 0, y: 0 }
    initialPos()
    renderGallery()
}

function setSelectedTab(ev, selectedTabs) {
    console.log(selectedTabs)

    switch (selectedTabs) {
        case 'Home':
            document.querySelector('.editor').style.display = 'flex'
            document.querySelector('.gallery').style.display = 'none'
            break
        case 'Gallery':
            document.querySelector('.gallery').style.display = 'block'
            document.querySelector('.editor').style.display = 'none'
            break
        case 'About':
            break
    }
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
    img.src = gImgs[currMeme.selectedImgId - 1].url // Set the img src to the selected img file
    img.onload = onImageReady.bind(null, img)
}

function initialPos() {
    // RECT
    const currLine = getCurrLine()
    currLine.pos.x = 0
    currLine.pos.y = 0
}

/**
 * Draw the img on the canvas
 */
function renderMeme(img) {
    var meme = getMeme()
    var canvasHeight = (img.height * gElCanvas.width) / img.width 
    gElCanvas.height = canvasHeight
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

    meme.lines.map(line => drawText(line))
}

/**
 * Input Enter Text Changed
 * @param {*} ev 
 */
function textInputChanged(ev) {
    const txt = ev.value
    setCurrLineTxt(txt)
    renderCanvas()
}

/**
 * Draw current text on canvas
 * @param {*} text 
 * @param {*} x 
 * @param {*} y 
 */
function drawText({ txt, pos, size, color, stroke, font, align }) {
    // const currLine = getCurrLine()
    gCtx.lineWidth = 1
    gCtx.strokeStyle = stroke
    gCtx.fillStyle = color

    gCtx.textAlign = align
    gCtx.font = `${size}px ${font}`

    var lineHeight = size * 1.286;
    gCtx.fillText(txt, pos.x + (gElCanvas.width / 2), pos.y + lineHeight / 2 + (size / 3)) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, pos.x + (gElCanvas.width / 2), pos.y + lineHeight / 2 + (size / 3)) // Draws (strokes) a given text at the given (x, y) position.
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(pos.x, pos.y, gElCanvas.width, lineHeight);
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
    const currLine = getCurrLine()
    //Draw the circle
    drawText(currLine)
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

    const lineIdx = isClicked(ev)
    if (lineIdx < 0) return
    const pos = getEvPos(ev)
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
        return pos.x > line.pos.x && pos.x < line.pos.x + gElCanvas.width &&
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
