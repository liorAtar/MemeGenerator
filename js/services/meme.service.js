var gKeywordSearchCountMap =
    { 'funny': 0, 'trump': 0, 'cute': 0, 'baby': 0, 'akward': 0, 'animal': 0, 'happy': 0 }

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'trump'] },
    { id: 2, url: 'img/2.jpg', keywords: ['cute', 'animal'] },
    { id: 3, url: 'img/3.jpg', keywords: ['cute', 'baby', 'animal'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cute', 'animal'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'baby'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'baby'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'baby'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'akward'] },
    { id: 12, url: 'img/12.jpg', keywords: ['bad'] },
    { id: 13, url: 'img/13.jpg', keywords: ['happy'] },
    { id: 14, url: 'img/14.jpg', keywords: ['bad'] },
    { id: 15, url: 'img/15.jpg', keywords: ['bad'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'akward'] },
    { id: 17, url: 'img/17.jpg', keywords: ['bad'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny', 'bad'] },
];

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 20,
            align: 'left',
            color: 'red',
            pos: {x:0, y:0}
        }
    ]
}

function getMeme() {
  return gMeme
}

function createLine(pos) {
  var line = {
    txt: '',
    size: 20,
    align: 'left',
    color: 'red',
    pos,
    isDrag: false
  }

  gMeme.lines.push(line)
  setCurrLine(gMeme.lines.length - 1)
  // gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function getCurrLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}

function setCurrLine(idx) {
  gMeme.selectedLineIdx = idx
}

// TODO: Delete?
function isLineClicked(clickedPos) {
  const { pos } = getCurrLine()
  const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
  return distance <= getCurrLine().size
}

function setCurrLineDrag(isDrag) {
  var currLine = getCurrLine()
  currLine.isDrag = isDrag
}

function moveCurrLine(dx, dy) {
  var currLine = getCurrLine()
  currLine.pos.x += dx
  currLine.pos.y += dy
}

function setCurrLineTxt(txt){
  var currLine = getCurrLine()
  currLine.txt = txt
}