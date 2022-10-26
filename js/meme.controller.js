'use-strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMemeImg()
    // TODO: Add resize Canvad
    resizeCanvas()
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
    let img = new Image() // Create a new html img element
    img.src = '../img/1.jpg' // Set the img src to the img file we read
    img.onload = onImageReady.bind(null, img)
}

/**
 * Draw the img on the canvas
 */
function renderMeme(img) {
    var canvasHeight = (img.height * gElCanvas.width) / img.width
    gElCanvas.height = canvasHeight
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}