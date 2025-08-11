// document.addEventListener('DOMContentLoaded', () => {
//   const quizBox = document.querySelector('.quiz-box');
//   if (!quizBox) return console.error('Quiz box not found!');

//   const timeCountElem = quizBox.querySelector('.timer .timer_sec');
//   if (!timeCountElem) return console.error('Timer element not found!');

//   const startBtn = document.querySelector('.start_btn button');
//   const infoBox = document.querySelector('.info_box');
//   const exitBtn = infoBox.querySelector('.buttons .quit');
//   const continueBtn = infoBox.querySelector('.buttons .restart');
//   const optionList = quizBox.querySelector('.option_list');
//   const nextBtn = quizBox.querySelector('.next_btn');
//   const totalQueElem = quizBox.querySelector('.total_que strong.text-blue-600');
//   const resultBox = document.querySelector('.result_box');
//   const restartBtn = resultBox.querySelector('.buttons1 .restart');
//   const quitBtn = resultBox.querySelector('.buttons1 .quit');

//   let currentQuestion = 0;
//   let score = 0;
//   let timer;
//   let timerValue = 15;
//   let timerLineInterval;
//   let timeLineWidth = 0;
//   const timeLineMaxWidth = quizBox.querySelector('header .time_line').offsetWidth || 550;

//   // Show total questions count
//   const totalQuestionsCount = 5; // Or questions.length if available
//   const totalQueSpans = quizBox.querySelectorAll('.total_que strong.text-blue-600');
//   if (totalQueSpans.length >= 2) {
//     totalQueSpans[1].textContent = totalQuestionsCount;
//   }

//   startBtn.addEventListener('click', () => {
//     startBtn.parentElement.classList.add('opacity-0', 'pointer-events-none');
//     infoBox.classList.add('activeinfo');
//   });

//   exitBtn.addEventListener('click', () => {
//     infoBox.classList.remove('activeinfo');
//     startBtn.parentElement.classList.remove('opacity-0', 'pointer-events-none');
//   });

//   continueBtn.addEventListener('click', () => {
//     infoBox.classList.remove('activeinfo');
//     quizBox.classList.add('activeQuiz');
//     showQuestion(currentQuestion);
//     updateQuestionCounter(currentQuestion + 1);
//     startTimer(timerValue);
//     startTimerLine(0);
//   });

//   nextBtn.addEventListener('click', () => {
//     currentQuestion++;
//     if (currentQuestion < totalQuestionsCount) {
//       showQuestion(currentQuestion);
//       updateQuestionCounter(currentQuestion + 1);
//       resetTimer();
//       startTimer(timerValue);
//       resetTimerLine();
//       startTimerLine(0);
//       nextBtn.classList.add('hidden');
//     } else {
//       showResult();
//     }
//   });

//   restartBtn.addEventListener('click', () => {
//     resultBox.classList.remove('activeResult');
//     quizBox.classList.add('activeQuiz');
//     currentQuestion = 0;
//     score = 0;
//     showQuestion(currentQuestion);
//     updateQuestionCounter(1);
//     resetTimer();
//     startTimer(timerValue);
//     resetTimerLine();
//     startTimerLine(0);
//     nextBtn.classList.add('hidden');
//   });

//   quitBtn.addEventListener('click', () => {
//     window.location.reload();
//   });

//   function showQuestion(index) {
//     // Assuming you have a global `questions` array defined somewhere
//     const questionObj = questions[index];
//     if (!questionObj) return;

//     const queText = quizBox.querySelector('.que_text span');
//     queText.textContent = questionObj.numb + '. ' + questionObj.question;

//     optionList.innerHTML = '';
//     questionObj.options.forEach(option => {
//       const optionBtn = document.createElement('div');
//       optionBtn.className = 'option';
//       optionBtn.textContent = option;
//       optionList.appendChild(optionBtn);

//       optionBtn.addEventListener('click', () => optionSelected(optionBtn, questionObj.answer));
//     });
//   }

//   function optionSelected(selectedOption, correctAnswer) {
//     clearInterval(timer);
//     clearInterval(timerLineInterval);

//     const allOptions = optionList.querySelectorAll('.option');
//     allOptions.forEach(option => {
//       option.classList.add('disabled');
//       if (option.textContent === correctAnswer) {
//         option.classList.add('correct');
//         option.insertAdjacentHTML('beforeend', '<div class="icon tick"><i class="fas fa-check"></i></div>');
//       }
//     });

//     if (selectedOption.textContent === correctAnswer) {
//       score++;
//       selectedOption.classList.add('correct');
//       selectedOption.insertAdjacentHTML('beforeend', '<div class="icon tick"><i class="fas fa-check"></i></div>');
//     } else {
//       selectedOption.classList.add('incorrect');
//       selectedOption.insertAdjacentHTML('beforeend', '<div class="icon cross"><i class="fas fa-times"></i></div>');
//     }

//     nextBtn.classList.remove('hidden');
//   }

//   function startTimer(duration) {
//     let time = duration;
//     timeCountElem.textContent = time < 10 ? '0' + time : time;

//     timer = setInterval(() => {
//       time--;
//       timeCountElem.textContent = time < 10 ? '0' + time : time;
//       if (time <= 0) {
//         clearInterval(timer);
//         disableOptions();
//         nextBtn.classList.remove('hidden');
//       }
//     }, 1000);
//   }

//   function startTimerLine(startWidth) {
//     timeLineWidth = startWidth;
//     timeline.style.width = timeLineWidth + 'px';

//     timerLineInterval = setInterval(() => {
//       timeLineWidth += timeLineMaxWidth / (timerValue * 10);
//       timeline.style.width = timeLineWidth + 'px';
//       if (timeLineWidth >= timeLineMaxWidth) {
//         clearInterval(timerLineInterval);
//       }
//     }, 100);
//   }

//   function resetTimer() {
//     clearInterval(timer);
//     timeCountElem.textContent = timerValue;
//   }

//   function resetTimerLine() {
//     clearInterval(timerLineInterval);
//     timeline.style.width = '0';
//   }

//   function disableOptions() {
//     const options = optionList.querySelectorAll('.option');
//     options.forEach(option => option.classList.add('disabled'));
//   }

//   function updateQuestionCounter(index) {
//     const queNumElems = quizBox.querySelectorAll('.total_que strong.text-blue-600');
//     if (queNumElems.length >= 1) {
//       queNumElems[0].textContent = index;
//     }
//   }

//   function showResult() {
//     quizBox.classList.remove('activeQuiz');
//     resultBox.classList.add('activeResult');

//     const scoreText = resultBox.querySelector('.score_text');
//     scoreText.innerHTML = `You scored <strong>${score}</strong> out of <strong>${totalQuestionsCount}</strong>!`;
//   }
// });


document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selection ---
    // These selectors match the new HTML file perfectly.
    const startBtnContainer = document.querySelector('.start_btn');
    const infoBox = document.querySelector('.info_box');
    const quizBox = document.querySelector('.quiz-box');
    const resultBox = document.querySelector('.result_box');
    
    const startBtn = startBtnContainer.querySelector('button');
    const exitBtn = infoBox.querySelector('.buttons .quit');
    const continueBtn = infoBox.querySelector('.buttons .restart');
    const nextBtn = quizBox.querySelector('footer .next_btn');
    const resultRestartBtn = resultBox.querySelector('.buttons1 .restart');
    const resultQuitBtn = resultBox.querySelector('.buttons1 .quit');

    const optionList = document.querySelector('.option_list');
    const timeline = document.querySelector('header .time_line');
    const timeCount = document.querySelector('.timer .timer_sec');

    // --- State Variables ---
    let que_count = 0;
    let que_numb = 1;
    let userScore = 0;
    let counter;
    let counterLine;
    let timeValue = 15;

    // --- Icon definitions for feedback ---
    const tickIconTag = `<div class="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-green-500"><i class="fas fa-check-circle"></i></div>`;
    const crossIconTag = `<div class="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-red-500"><i class="fas fa-times-circle"></i></div>`;

    // --- Event Listeners with Correct Logic ---
    // This logic correctly uses the 'hidden' class to show/hide sections.
    startBtn.onclick = () => {
        infoBox.classList.remove('hidden');
        startBtnContainer.classList.add('hidden');
    };

    exitBtn.onclick = () => {
        infoBox.classList.add('hidden');
        startBtnContainer.classList.remove('hidden');
    };

    continueBtn.onclick = () => {
        infoBox.classList.add('hidden');
        quizBox.classList.remove('hidden');
        showQuestion(que_count);
        queCounter(que_numb);
        startTimer(timeValue);
        startTimerLine();
    };

    resultRestartBtn.onclick = () => {
        quizBox.classList.remove('hidden');
        resultBox.classList.add('hidden');
        que_count = 0;
        que_numb = 1;
        userScore = 0;
        showQuestion(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine();
        nextBtn.classList.add('hidden');
    };

    resultQuitBtn.onclick = () => window.location.reload();

    nextBtn.onclick = () => {
        if (que_count < questions.length - 1) {
            que_count++;
            que_numb++;
            showQuestion(que_count);
            queCounter(que_numb);
            clearInterval(counter);
            clearInterval(counterLine);
            startTimer(timeValue);
            startTimerLine();
            nextBtn.classList.add('hidden');
        } else {
            showResult();
        }
    };
    
    // --- Core Functions ---
    function showQuestion(index) {
        const que_text = document.querySelector('.que_text');
        que_text.innerHTML = `<span>${questions[index].numb}. ${questions[index].question}</span>`;
        
        let option_tag = '';
        for (let option of questions[index].options) {
            // This creates the options with the correct light-theme styling
            option_tag += `<div class="option relative p-4 border-2 border-gray-200 rounded-lg cursor-pointer text-gray-700 transition-all duration-200 hover:border-indigo-400 hover:bg-indigo-50"><span>${option}</span></div>`;
        }
        optionList.innerHTML = option_tag;

        const allOptions = optionList.querySelectorAll('.option');
        allOptions.forEach(option => {
            option.setAttribute('onclick', 'optionSelected(this)');
        });
    }

    // Making this function available globally so inline onclick can call it
    window.optionSelected = (answer) => {
        clearInterval(counter);
        clearInterval(counterLine);
        const userAns = answer.querySelector("span").textContent;
        const correctAns = questions[que_count].answer;
        const allOptions = optionList.children;
        
        if (userAns == correctAns) {
            userScore += 1;
            answer.classList.add('border-green-500', 'bg-green-100', 'text-green-700', 'font-semibold');
            answer.insertAdjacentHTML("beforeend", tickIconTag);
        } else {
            answer.classList.add('border-red-500', 'bg-red-100', 'text-red-700', 'font-semibold');
            answer.insertAdjacentHTML("beforeend", crossIconTag);

            // Highlight the correct answer
            for (let i = 0; i < allOptions.length; i++) {
                if (allOptions[i].querySelector("span").textContent == correctAns) {
                    allOptions[i].classList.add('border-green-500', 'bg-green-100', 'text-green-700', 'font-semibold');
                    allOptions[i].insertAdjacentHTML("beforeend", tickIconTag);
                }
            }
        }
        
        // Disable all options after selection
        for (let i = 0; i < allOptions.length; i++) {
            allOptions[i].classList.add('pointer-events-none');
        }
        
        nextBtn.classList.remove('hidden');
    };

    function showResult() {
        quizBox.classList.add('hidden');
        resultBox.classList.remove('hidden');
        const scoreText = resultBox.querySelector('.score_text');
        scoreText.innerHTML = `<span>You scored <strong class="text-indigo-600">${userScore}</strong> out of <strong class="text-indigo-600">${questions.length}</strong></span>`;
    }

    function startTimer(time) {
        counter = setInterval(timer, 1000);
        function timer() {
            timeCount.textContent = time < 10 ? `0${time}` : time;
            time--;
            if (time < 0) {
                clearInterval(counter);
                nextBtn.classList.remove('hidden');
                // Auto-select correct answer if time runs out
                window.optionSelected(optionList.children[0]); // Mock selection to trigger logic
                optionList.children[0].classList.add('pointer-events-none'); // Ensure mock is disabled
            }
        }
    }

    function startTimerLine() {
        let time = 0;
        const quizBoxWidth = quizBox.offsetWidth;
        counterLine = setInterval(() => {
            time += quizBoxWidth / (timeValue * 10); // Adjust speed based on time
            timeline.style.width = time + 'px';
            if (time >= quizBoxWidth) {
                clearInterval(counterLine);
            }
        }, 100);
    }

    function queCounter(index) {
        const bottom_ques_counter = document.querySelector('footer .total_que');
        bottom_ques_counter.innerHTML = `<span><strong class="text-indigo-600 font-bold">${index}</strong> of <strong class="text-indigo-600 font-bold">${questions.length}</strong> Questions</span>`;
    }
});