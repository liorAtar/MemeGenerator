'use-strict'

function addLine() {
    createLine({ x: 0, y: 0 })
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

function alignLeft(){
    alignCurrLine('right')
    renderCanvas()
}

function alignCenter(){
    alignCurrLine('center')
    renderCanvas()
}

function alignRight(){
    alignCurrLine('left')
    renderCanvas()
}