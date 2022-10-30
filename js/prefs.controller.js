'use-strict'

function addLine() {
    const meme = getMeme()

    if(meme.lines.length === 0) createLine({ x: 0, y: 0 })
    else if(meme.lines.length === 1) createLine({ x: 0, y: gElCanvas.height - (40 * 1.286) })
    else if(meme.lines.length > 1) createLine({ x: 0, y: (gElCanvas.height / 2) - (40 * 1.286 /2) })
    
    renderLine()
    document.querySelector('.txt-input').value = ''
    document.querySelector('.txt-input').placeholder = 'Enter Text'
}

function moveDown() {
    moveCurrLine(0, 5)
    renderCanvas()
}

function moveUp() {
    moveCurrLine(0, -5)
    renderCanvas()
}

function nextLine() {
    const meme = getMeme()
    if (meme.lines.length > 0) {
        if (meme.lines.length <= meme.selectedLineIdx + 1) {
            setCurrLine(0)
        } else {
            setCurrLine(meme.selectedLineIdx + 1)
        }

        renderCanvas()
        document.querySelector('.txt-input').value = ''
        document.querySelector('.txt-input').placeholder = getCurrLine().txt
    }
}

function deleteSelectedLine() {
    const meme = getMeme()
    if (meme.lines.length > 0) {
        deleteLine(meme.selectedLineIdx)
        setCurrLine(0)
        renderCanvas()
    }
}

function sizeUpText() {
    sizeUp()
    renderCanvas()
}

function sizeDownText() {
    sizeDown()
    renderCanvas()
}

function alignLeft() {
    alignCurrLine('right')
    renderCanvas()
}

function alignCenter() {
    alignCurrLine('center')
    renderCanvas()
}

function alignRight() {
    alignCurrLine('left')
    renderCanvas()
}

function changeFont(ev) {
    const font = ev.value
    if (font === "Impact" || font === "Ariel") {
        updateCurrLineFont(font)
        renderCanvas()
    }
}

function resetValue(ev) {
    ev.value = ''
}

function changeStroke(ev) {
    const color = ev.value
    updateCurrLineStroke(color)
    renderCanvas()
}

function changeColor(ev) {
    const color = ev.value
    updateCurrLineColor(color)
    renderCanvas()
}

function showEditorOne() {
    document.querySelector('.editor-content-txt').style.opacity = 1
    document.querySelector('.editor-content-stickers').style.opacity = 0
    document.querySelector('.editor-content-stickers').style.top = '-100%'
}

function showEditorTwo() {
    document.querySelector('.editor-content-txt').style.opacity = 0
    document.querySelector('.editor-content-txt').style.top = '-100%'
    document.querySelector('.editor-content-stickers').style.opacity = 1
}
