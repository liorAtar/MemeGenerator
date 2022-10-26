'use-strict'

function addLine(){
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