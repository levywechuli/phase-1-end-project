document.addEventListener("DOMContentLoaded", ()=>{
const totalTime = 400;
let timeRemaining = totalTime
let score = 0;
let questions = [];


// getting elements from my html
const startBtn = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const optionContainer = document.getElementById("options-container");   
const nextBtn = document.getElementById("next-btn");
const prevBtn= document.getElementById("prev-btn");
const timeDisplay = document.getElementById("time");
const startContainer = document.getElementById("start-container");

//creating a finish button
const finishBtn = document.createElement("button");
finishBtn.id = "finish-btn";
finishBtn.innerText = "Finish";
questionContainer.appendChild(finishBtn);

startBtn.addEventListener('click', ()=>{
    startContainer.style.display = "none";
    questionContainer.style.display = 'block';
    optionContainer.style.display = "block";
    timeDisplay.style.display = "block";
    startTimer(totalTime);
    fetchQuestions()

});

function fetchQuestions(){
    
}




});