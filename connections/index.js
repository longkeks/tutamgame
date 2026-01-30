let blocks = document.querySelectorAll(".block");
let submitButton = document.getElementById("submit-btn");
let categories = document.querySelectorAll(".category");
const blockStrings = [];
let totalAttempts = document.getElementById("attempts");
let attemptsUpdate = 0;
let gameNotification = document.getElementById("notification");

const huongDanOpen = document.getElementById("huongdan-open");
const huongDanContainer = document.getElementById("huongdan_container");
const huongDanClose = document.getElementById("huongdan-close");

huongDanOpen.addEventListener("click", () =>{
  huongDanContainer.classList.add("open");
});
huongDanClose.addEventListener("click", () =>{
  huongDanContainer.classList.remove("open");
});

blocks.forEach(block =>{
  blockStrings.push(block.innerText)
})
const maxActive = 4;
blocks.forEach(block => {
    block.addEventListener("click", function() {
        const activeButtons = document.querySelectorAll(".block.active");
        const isActive = this.classList.contains("active");
        if (isActive) {
            this.classList.remove("active");
            if (activeButtons.length === 4){
              submitButton.classList.remove("active2");
            }
        } else if (activeButtons.length < maxActive) {
            this.classList.add("active");
            if (activeButtons.length === 3){
              submitButton.classList.add("active2");
            }
        } else {
          gameNotification.textContent = "Bạn chỉ có thể chọn 4 ô thôi!"
        }

    });
});
let categoryOneAnswers = ["Chạm", "Thấy", "Nghe", "Cảm"];
let categoryTwoAnswers = ["Lắng", "Thấu", "Mở", "Trao"];
let categoryThreeAnswers = ["Như", "Thức", "Can", "Nhĩ"];
let categoryFourAnswers = ["Thiện", "Ngã", "Thực", "Tâm"];
function wrongChoice() {
  attemptsUpdate = attemptsUpdate + 1;
  totalAttempts.textContent = attemptsUpdate;
  gameNotification.textContent = "Sai rồi! Thử lại nhe."
}
let correctCategories = 0;
function gameOver() {
  if (correctCategories === 4) {
    gameNotification.textContent = gameNotification.textContent + "\nChúc mừng bạn đã thắng!"
  }
}
submitButton.addEventListener("click", function(){
  const activeBlocks = document.querySelectorAll(".block.active")
  const isSubmitActive = submitButton.classList.contains("active2")
  const selectedBlocks =[];
  const totalCategories = [];
  categories.forEach(selectCategory=>{
    const categoryString = selectCategory.innerText;
    totalCategories.push(categoryString)
  })
  activeBlocks.forEach(selectBlock=>{
    const blockString = selectBlock.innerText;
    selectedBlocks.push(blockString);
  })
function compareTwoArrays(arr1, arr2) {
  if (arr1.length !== arr2.length)
    return false;

  return arr1.every((element, index) => {
    return element === arr2[index]
  });
}
  if (isSubmitActive){
    if(compareTwoArrays(selectedBlocks,categoryOneAnswers)){
      activeBlocks.forEach(block=>{
        block.classList.add("correct");
        block.classList.remove("active");
      }); 
      categories[0].classList.add("correct2");
      submitButton.classList.remove("active2");
      correctCategories = correctCategories + 1;
      gameNotification.textContent = "Bạn đã đoán Động từ cảm nhận!";
      gameOver();
    } else if (compareTwoArrays(selectedBlocks,categoryTwoAnswers)){
      activeBlocks.forEach(block=>{
        block.classList.add("correct");
        block.classList.remove("active");
      }); 
      categories[1].classList.add("correct2");
      submitButton.classList.remove("active2");
      correctCategories = correctCategories + 1;
      gameNotification.textContent = "Bạn đã đoán Trạng thái sự tử tế!";
      gameOver();
    } else if (compareTwoArrays(selectedBlocks,categoryThreeAnswers)){
      activeBlocks.forEach(block=>{
        block.classList.add("correct");
        block.classList.remove("active");
      }); 
      categories[2].classList.add("correct2");
      submitButton.classList.remove("active2");
      correctCategories = correctCategories + 1;
      gameNotification.textContent = "Bạn đã đoán Những từ bắt đầu với chữ Tâm!";
      gameOver();
    } else if (compareTwoArrays(selectedBlocks,categoryFourAnswers)){
      activeBlocks.forEach(block=>{
        block.classList.add("correct");
        block.classList.remove("active");
      }); 
      categories[3].classList.add("correct2");
      submitButton.classList.remove("active2");
      correctCategories = correctCategories + 1;
      gameNotification.textContent = "Bạn đã đoán Tên triển lãm!";
      gameOver();
    } else {
      wrongChoice();
    }
  } else {
    gameNotification.textContent = "Bạn phải chọn đủ 4 ô.";
  }
})
