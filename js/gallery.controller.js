'use-strict'

function renderGallery(){
    var strHTML = ''

    gImgs.map(img => strHTML+= `<img class="grid-item" src="${img.url}" alt="${img.id}" onclick="replaceMeme(${img.id})">`)

    document.querySelector('.imgs').innerHTML = strHTML
}

function replaceMeme(idx){
    resetMeme()
    replaceImg(idx)
    renderCanvas()
    document.querySelector('.editor').style.display = 'block'
    document.querySelector('.gallery').style.display = 'none'
}