'use-strict'

function addLine(){
    createLine({ x: 0, y: 0 })
    document.querySelector('.txt-input').value = ''
    renderLine()
}