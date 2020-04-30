/* global variable declarations */
let score = 0;
let currentQuestion = 0;
let questionList = [
  {
    questionText: "Which dog can yodel?",
    answers: ["Chihuahua", "Poodle", "Basenji", "Beagle"],
    correct: 2,
    image: "basenji.jpg",
  },
  {
    questionText: "What color are Dalmatian puppies when they are born?",
    answers: ["Black", "Pink", "White", "Black & White"],
    correct: 2,
    image: "dalmatian.jpg",
  },
  {
    questionText:
      "Which dog's sense of smell can be used as evidence in court?",
    answers: [
      "Basset Hound",
      "Bloodhound",
      "Afghan Hound",
      "Bluetick Coonhound",
    ],
    correct: 1,
    image: "bloodhound.jpg",
  },
  {
    questionText: "Which dog could beat a Cheetah in a long distance race?",
    answers: ["Whippet", "Greyhound", "Weimaraner", "Doberman Pinscher"],
    correct: 1,
    image: "greyhound.jpg",
  },
  {
    questionText: "Which dog has a black tongue?",
    answers: ["Vizsla", "Jack Russell Terrier", "Newfoundland", "Shar-Pei"],
    correct: 3,
    image: "sharpei.jpg",
  },
  {
    questionText: "How many eyelids do dogs have?",
    answers: ["One", "Two", "Three", "Four"],
    correct: 2,
    image: "dog-eye.jpg",
  },
  {
    questionText: "How many scent receptors does a dog's nose have?",
    answers: ["5 Million", "40 Million", "100 Million", "300 Million"],
    correct: 3,
    image: "dog-nose.jpg",
  },
];

/* function to show questionList */
function showQuestion() {
  let question = questionList[currentQuestion];

  $(".question-number").text(currentQuestion + 1);
  $(".number-correct").text(score);
  $(".quiz ").html("");
  $(".quiz ").append(`<form>
    <fieldset>
        <legend>${question.questionText}<\legend>
            
    </fieldset>
        
          <button class="submit-answer" type="submit">Submit</button>
        </form>`);

  for (let i = 0; i < question.answers.length; i++) {
    $("fieldset ")
      .append(`<input type="radio" name="answer" id="${i}" value="${i}" required>
    <label class="choice" for="${i}">${question.answers[i]}</label>
    <br>`);
  }
}

/* function to answer results */
function showResult(result) {
  let question = questionList[currentQuestion];
  let correctAnswer = question.correct;
  $(".quiz").hide();
  $(".question-number").text(currentQuestion + 1);
  $(".number-correct").text(score);
  if (result === "Correct") {
    $(".response").html(
      `<h4>${result}!</h4>
     
        <div><img src="images/${questionList[currentQuestion].image}" alt="${questionList[currentQuestion].image}"></div>
         <button class="next-question">Next</button>`
    );
  } else {
    $(".response").html(
      `<h4>${result}!</h4>
      <p>The correct answer is ${question.answers[correctAnswer]}.</p>
      
        <div><img src="images/angry-dog.jpg" alt="Angry Dog"></div>
        <button class="next-question">Next</button>`
    );
  }
  $(".response").show();
}

/* function to check answer and increment score then call function to show results */
function checkAnswer(guess) {
  let question = questionList[currentQuestion];
  if (question.correct === guess) {
    score++;
    showResult("Correct");
  } else {
    showResult("Incorrect");
  }
}

function nextQuestion() {
  $(".response").hide();
  $(".quiz").show();
  currentQuestion++;

  if (currentQuestion >= questionList.length) {
    showSummary();
  } else {
    showQuestion();
  }
}

/* function to show summary page at end of quiz */
function showSummary() {
  $(".header").hide();
  $(".quiz").hide();
  $(".progress").hide();
  $(".summary").show();
  $(".summary p").text(
    "Congratulations! You got " +
      score +
      " out of " +
      questionList.length +
      " correct!"
  );
}

/* function to restart the quiz */
function restartQuiz() {
  $(".summary").hide();
  $(".start").show();
  score = 0;
  currentQuestion = 0;
  showQuestion();
}

//starts the quiz
function makeQuiz() {
  $(".header").hide();
  $(".start a").click(function (e) {
    e.preventDefault();
    $(".start").hide();
    $(".header").show();
    $(".quiz").show();
    $(".progress").show();
    showQuestion();
  });

  /*. Event listener to pass answer to checkAnswer() */
  $(".quiz").on("submit", function (e) {
    e.preventDefault();
    let guess = parseInt($("input:checked").attr("id"));
    checkAnswer(guess);
  });

  /* Event Listener to move to next question*/
  $(".response").on("click", ".next-question", function (e) {
    nextQuestion();
  });

  /* Event listener to restart the quiz. */
  $(".summary a").click(function (e) {
    e.preventDefault();
    restartQuiz();
  });
}

$(makeQuiz);
