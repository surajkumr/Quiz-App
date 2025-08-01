const questions = [
    {
        question: "What is the national flower of india?",
        answers:[
            { text: "Marigold", correct: false},
            { text: "Lotus", correct: true},
            { text: "Hibiscus", correct: false},
            { text: "Sunflower", correct: false},   
        ]
    },
    {
         question: "What is the national tree of india?",
        answers:[
            { text: "Sheesham", correct: false},
            { text: "Banyan", correct: true},
            { text: "Peepal", correct: false},
            { text: "Sandalwood", correct: false},   
        ]
    },
     {
         question: "What is the national animal of india?",
        answers:[
            { text: "Bengal Tiger", correct:true },
            { text: "Cheetha", correct: false},
            { text: "Elephant", correct: false},
            { text: "Lion", correct: false},   
        ]
    },
     {
         question: "What is the largest state in  india by area?",
        answers:[
            { text: "Rajasthan", correct:true },
            { text: "Bihar", correct: false},
            { text: "Uttarpradesh", correct: false},
            { text: "Punjab", correct: false},   
        ]
    },
];
const questionElement = document.getElementById("question");
const ansbtn = document.getElementById("ans-btn")
const nxtbtn= document.getElementById("nxt-btn")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nxtbtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansbtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}
function resetState(){
 nxtbtn.style.display = "none";
 while(ansbtn.firstChild){
    ansbtn.removeChild(ansbtn.firstChild);
 }
}
function selectAnswer(e){
    const selectedBtn= e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(ansbtn.children).forEach(button => {
        if(button.dataset.correct ==="true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    })
    nxtbtn.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nxtbtn.innerHTML = "Play Again";
    nxtbtn.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nxtbtn.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz()