'use-strict'

function onInit() {
    renderGallery()
    document.querySelector('.main-editor').style.display = 'none'
}

function renderGallery() {
    var strHTML = ''
    gImgs.map(img => strHTML += `<img class="grid-item" src="${img.url}" alt="${img.id}" onclick="replaceMeme(${img.id})">`)
    document.querySelector('.grid-container').innerHTML = strHTML
}

function replaceMeme(idx) {
    resetMeme()
    replaceImg(idx)
    renderCanvas()
    document.querySelector('.main-editor').style.display = 'flex'
    document.querySelector('.gallery').style.display = 'none'
    initMeme()
}
