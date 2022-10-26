'use-strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMemeImg()
    // TODO: Add resize Canvad
    resizeCanvas()

    var currLine = getCuurLine()
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
function renderMemeImg() {
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

/**
 * Draw the img on the canvas
 */
function renderMeme(img) {
    var currLine = getCuurLine()
    
    var canvasHeight = (img.height * gElCanvas.width) / img.width
    gElCanvas.height = canvasHeight
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

    drawText(currLine.txt, gElCanvas.width / 2, currLine.size)
}

/**
 * Input Enter Text Changed
 * @param {*} ev 
 */
function textInputChanged(ev) {
    var txt = ev.value
    setLineTxt(txt)
    renderMemeImg()
}

/**
 * Draw current text on canvas
 * @param {*} text 
 * @param {*} x 
 * @param {*} y 
 */
function drawText(text, x, y) {
    var currLine = getCuurLine()

    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = currLine.color

    gCtx.textAlign = "center"
    gCtx.font = `${currLine.size}px Impact`
    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}
