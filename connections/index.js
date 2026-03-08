let blockNames = ["Chạm","Thấy","Nghe","Cảm","Lắng","Thấu","Mở","Trao","Tử","Tế","Từ","Tâm"]
let categoryNames = ["Động từ cảm nhận","Hình thái của điều tử tế","Tên triển lãm"]
let categoryAnswers = ["Chạm - Thấy - Nghe - Cảm", "Lắng - Thấu - Mở - Trao", "Tử - Tế - Từ - Tâm"]
let categoryOne = "Động từ cảm nhận"
let categoryOneAnswers = ["Chạm","Thấy","Nghe","Cảm"]
let categoryTwo = "Hình thái của điều tử tế"
let categoryTwoAnswers = ["Lắng","Thấu","Mở","Trao"]
let categoryThree = "Tên triển lãm"
let categoryThreeAnswers = ["Tử","Tế","Từ","Tâm"]
let submitButton = document.getElementById("submit-btn")
let correctCategories = 0

let huongDanButton = document.getElementById("huongdan-btn")
let huongDanContainer = document.getElementById("huongdan-container")
let huongDanClose = document.getElementById("huongdan-close")

let gameOver = false
let wrongNotification = document.getElementById("wrong-notification")

let winNotification = document.getElementById("win-container")

let score = document.getElementById("score")
let gameScore = 0

let finalScore = document.getElementById("final-score")

let wrongCount = 0

let isCategoryOneCorrect = false
let isCategoryTwoCorrect = false
let isCategoryThreeCorrect = false

let hintsContainer = document.getElementById("hints-container")
let hints = document.getElementById("hints")

score.innerText = "Số lần gửi đáp án: "+ gameScore

huongDanButton.addEventListener('click',()=>{
        huongDanContainer.classList.remove("hidden")
})
huongDanClose.addEventListener('click', ()=>{
    huongDanContainer.classList.add("hidden")
})


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffleArray(blockNames)
for (let i = 0; i < blockNames.length; i++) {
    const gameBoard = document.getElementById("board-container")
    block = document.createElement("div")
    block.classList.add("block")
    block.id = blockNames[i]
    block.innerText = blockNames[i]
    gameBoard.appendChild(block)
}
function setBlockPositions() {
    for (i = 0 ; i < 4 ; i++) {
        let blockName = blockNames[i]
        block = document.getElementById(blockName)
        block.style.left = i*88
        block.style.top = 0
    }
    for (i = 4 ; i < 8 ; i++) {
        let blockName = blockNames[i]
        block = document.getElementById(blockName)
        block.style.left = (i-4)*88
        block.style.top = 50
    }
    for (i = 8 ; i < 12 ; i++) {
        let blockName = blockNames[i]
        block = document.getElementById(blockName)
        block.style.left = (i-8)*88
        block.style.top = 100
    }
} setBlockPositions()
function generateCategories() {
    const gameBoard = document.getElementById("board-container")
    for (i=0;i<3;i++){
        categoryAnswer = document.createElement("div")
        categoryAnswer.id = categoryAnswers[i]
        categoryAnswer.classList.add("category-answer")
        categoryAnswer.innerText = categoryAnswers[i]
        category = document.createElement("div")
        category.classList.add("category")
        category.classList.add("hidden")
        category.id = categoryNames[i]
        category.innerText = categoryNames[i]
        gameBoard.appendChild(category)
        category.appendChild(categoryAnswer)
    }
} generateCategories()

function handleBlockClicks() {
    let blocks = document.querySelectorAll(".block")
    blocks.forEach(block => {
        block.addEventListener("click", ()=>{
            activeBlocks = document.querySelectorAll(".block.active")
            if (block.classList.contains("active")){
                block.classList.remove("active")
                submitButton.classList.remove("enabled")
            } else {
                if (activeBlocks.length < 4) {
                    block.classList.add("active")
                    if (activeBlocks.length === 3) {
                        submitButton.classList.add("enabled")
                    }
                } else {
                    window.alert("Chỉ được chọn 4")
                }
            }
        })
    })
} handleBlockClicks()
submitButton.addEventListener('click', ()=>{
    if (!submitButton.classList.contains("enabled")) {
        window.alert("Bạn phải chọn 4!")
    } else {
        checkAnswers()
        gameScore = gameScore + 1
        score.innerText = "Số lần gửi đáp án: "+ gameScore
    }
})
const haveSameContents = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  const sortedArr1 = [...arr1].sort();
  const sortedArr2 = [...arr2].sort();
  return sortedArr1.every((element, index) => element === sortedArr2[index]);
}

function checkGameStatus() {
    if (correctCategories === 3) {
        gameOver = true
        winNotification.classList.remove("hidden")
        finalScore.innerText = "Số lần gửi đáp án: "+ gameScore
    }
}

function giveHint() {
    wrongCount = 0
    hintsContainer.classList.remove("hidden")
    if (!isCategoryOneCorrect) {
        hints.innerText = "Chạm và Cảm có vẻ liên quan"
    } else if (!isCategoryTwoCorrect) {
        hints.innerText = "Mở và Trao có vẻ liên quan"
    }
}

function checkAnswers() {

    activeBlocks = document.querySelectorAll(".block.active")
    activeBlocksText = []
    activeBlocks.forEach(block=>{
        activeBlocksText.push(block.innerText)
    })

    blocksInCorrectRow = []
    currentTotalBlocks = document.querySelectorAll(".block")
    currentTotalBlocks.forEach(block =>{
        const inlineCSS = block.style.cssText
        if (inlineCSS.includes("top: "+ (correctCategories*50).toString())){
            blocksInCorrectRow.push(block)
        } 
    })
    console.log(blocksInCorrectRow)
    function swapPositions() {
        for (i=0;i<4;i++){
            for (e=0;e<4;e++){
                if (blocksInCorrectRow[i] === activeBlocks [e]){
                    blocksInCorrectRow.splice(i,1)
                }
            }
        }
            console.log(blocksInCorrectRow)

        activeBlocks.forEach(block=>{
            const inlineCSS = block.style.cssText
            if (!inlineCSS.includes("top: "+(correctCategories*50).toString())){
                tempStyle = block.style.cssText
                block.style.cssText = blocksInCorrectRow[0].style.cssText
                blocksInCorrectRow[0].style.cssText = tempStyle
                blocksInCorrectRow.splice(0,1)
            }
        })

        console.log(blocksInCorrectRow)
    }

    if (haveSameContents(activeBlocksText, categoryOneAnswers)) {
        setTimeout(() => {
            swapPositions(activeBlocks,blocksInCorrectRow)
        }, 300)

        console.log("correct category one")
        setTimeout(() => {
            category = document.getElementById("Động từ cảm nhận")
            activeBlocks.forEach(block=>{
                block.classList.add("hidden")
                block.classList.remove("active")
            })
            submitButton.classList.remove("enabled")
            category.style.top = correctCategories*50
            category.classList.remove("hidden")
            isCategoryOneCorrect = true
            correctCategories = correctCategories + 1
        }, 1200)
        setTimeout(() => {
            checkGameStatus()
        }, 2000);

    } else if (haveSameContents(activeBlocksText, categoryTwoAnswers)) {
        setTimeout(() => {
            swapPositions(activeBlocks,blocksInCorrectRow)
        }, 300)

        console.log("correct category two")
        setTimeout(() => {
            category = document.getElementById("Hình thái của điều tử tế")
            activeBlocks.forEach(block=>{
                block.classList.add("hidden")
                block.classList.remove("active")
            })
            submitButton.classList.remove("enabled")
            category.style.top = correctCategories*50
            category.classList.remove("hidden")
            isCategoryTwoCorrect = true
            correctCategories = correctCategories + 1
        }, 1200)
        setTimeout(() => {
            checkGameStatus()
        }, 2000);

    } else if (haveSameContents(activeBlocksText, categoryThreeAnswers)) {
        setTimeout(() => {
            swapPositions(activeBlocks,blocksInCorrectRow)
        }, 300)

        console.log("correct category three")
        setTimeout(() => {
            category = document.getElementById("Tên triển lãm")
            activeBlocks.forEach(block=>{
                block.classList.add("hidden")
                block.classList.remove("active")
            })
            submitButton.classList.remove("enabled")
            category.style.top = correctCategories*50
            category.classList.remove("hidden")
            isCategoryThreeCorrect = true
            correctCategories = correctCategories + 1
        }, 1200)
        setTimeout(() => {
            checkGameStatus()
        }, 2000);

    } else {
        activeBlocks.forEach(block=>{
            block.classList.remove("active")
        })
        submitButton.classList.remove("enabled")
        wrongNotification.classList.remove("hidden")
        setTimeout(() => {
            wrongNotification.classList.add("hidden")
            wrongCount = wrongCount + 1
            if (wrongCount === 2){
                giveHint()
            }
        }, 1000);

        console.log("wrong")
    }
}

console.log(blockNames)
