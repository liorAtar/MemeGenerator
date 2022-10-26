'use-strict'

let gElCanvas
let gCtx
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    
    addListeners()
    renderCanvas()
    initialPos()
    // TODO: Add resize Canvad

    var currLine = getCurrLine()
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
    img.src = `../img/${currMeme.selectedImgId}.jpg` // Set the img src to the img file we read
    img.onload = onImageReady.bind(null, img)
}

function initialPos() {
    currLine = getCurrLine()
    currLine.pos.x = gElCanvas.width / 2
    currLine.pos.y = currLine.size
}

/**
 * Draw the img on the canvas
 */
function renderMeme(img) {
    var currLine = getCurrLine()

    var canvasHeight = (img.height * gElCanvas.width) / img.width
    gElCanvas.height = canvasHeight
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    
    drawText(currLine.txt, currLine.pos.x, currLine.pos.y)
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
    var currLine = getCurrLine()

    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = currLine.color

    gCtx.textAlign = "center"
    gCtx.font = `${currLine.size}px Impact`
    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function renderLine() {
    //Get the props we need from the circle 
    const { pos, txt} = getCurrLine()
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
    console.log('Im from onDown')
    //Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    setCurrLineDrag(true)
    //Save the pos we start from 
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    console.log('Im from onMove')
    const { isDrag } = getCurrLine()
    if (!isDrag) return
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
    console.log('Im from onUp')
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