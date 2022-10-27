function downloadMeme() {
    gIsDownloadOn = true
    // renderCanvas()
    const imgContent = gElCanvas.toDataURL('image/jpeg')// image/jpeg the default format
    document.querySelector('.download').href = imgContent
    gIsDownloadOn = false
    // renderCanvas()
}
