 let currentQuestionIndex = 0;
 let timerInterval;
  const totalTime = 400;
  let timeRemaining = totalTime;
  let score = 0;
  let questions = [];

  // getting elements from my html
  const startBtn = document.getElementById("start-btn");
  const questionContainer = document.getElementById("question-container");
  const optionsContainer = document.getElementById("options-container");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");
  const timeDisplay = document.getElementById("time");
  const startContainer = document.getElementById("start-container");
 
  document.getElementById('quiz-container').style.display = "none"
  startBtn.style.display ='block'

  //creating a finish button
  const finishBtn = document.createElement("button");
  finishBtn.id = "finish-btn";
  finishBtn.innerText = "Finish";
  finishBtn.style.display = "none"
  document.getElementById("quiz-container").appendChild(finishBtn);

  startBtn.addEventListener("click", () => {
    document.getElementById('all-content').style.display = "none";
    document.getElementById('quiz-container').style.display = 'block';
    startContainer.style.display = "none";
    questionContainer.style.display = "block";
    optionsContainer.style.display = "block";
    timeDisplay.parentElement.style.display = "block";
    startTimer(totalTime);
    fetchQuestions();
  });

  function fetchQuestions() {
    fetch("http://localhost:3000/questions")
      .then((Response) => Response.json())
      .then(data => {
        questions = data;
        displayQuestion(); //display my first question
      })
      .catch(error => {
        console.error("Error fetching questions:", error);
      });
  }
  function displayQuestion() {
    const question = questions[currentQuestionIndex];
    questionContainer.innerText = question.question;
    optionsContainer.innerHTML = '';

    //my radio button options
    question.options.forEach((option, index) => {
      const radioBtn = document.createElement("input");
      radioBtn.type = "radio";
      radioBtn.name = "option";
      radioBtn.value = option;
      radioBtn.id = `option-${index}`;

      const label = document.createElement('label');
      label.htmlFor = `option-${index}`;
      label.innerText = option;

      const br = document.createElement('br');

      optionsContainer.appendChild(radioBtn);
      optionsContainer.appendChild(label);
      optionsContainer.appendChild(br);
    });

    prevBtn.style.display = currentQuestionIndex === 0 ? "none" : "inline";

    //we will have to show the next button if not the last question
    if (currentQuestionIndex === questions.length - 1) {
      nextBtn.style.display = "none";
      finishBtn.style.display = "inline";
    } else {
      nextBtn.style.display = "inline";
      finishBtn.style.display = "none";
    }
  }

  nextBtn.addEventListener('click', () => {
    const selectedOption = document.querySelector(
      'input[name="option"]:checked'
    );
    if(!selectedOption){
      alert('please select an answer.');
      return;
    }

    const selectedAnswer = selectedOption.value;
    checkAnswer(selectedAnswer, questions[currentQuestionIndex].answer);

    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      displayQuestion();
    }
  });

  //previous button

  prevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      displayQuestion();
    }
  });

  //finish button
  finishBtn.addEventListener('click', () => {
    const selectedOption = document.querySelector(
      'input[name="option"]:checked'
    );

    if(!selectedOption){
      alert('please select an answer');
      return;
    }

    const selectedAnswer = selectedOption.value;
    checkAnswer(selectedAnswer, questions[currentQuestionIndex].answer);
    endQuiz();
  });

  function checkAnswer(selected, correct) {
    if (selected === correct) {
      score++;
    }
  }
  function startTimer(duration) {
    timeRemaining = duration;
    timeDisplay.innerText = timeRemaining;

    timerInterval = setInterval(() => {
      timeRemaining--;
      timeDisplay.innerText = timeRemaining;

      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 400);
  }

  //ending the quiz

  function endQuiz() {
    clearInterval(timerInterval);
    questionContainer.style.display = 'none';
    optionsContainer.style.display = 'none';
    timeDisplay.parentElement.style.display = 'none';
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none';
    finishBtn.style.display = 'none';

    //present my final score
    const scoreContainer = document.createElement('div');
    scoreContainer.innerHTML = `<h2> Your Score: ${score} out of ${questions.length}</h2>`;
    document.getElementById(`quiz-container`).appendChild(scoreContainer);
  }

