const wordText = document.querySelector('.word');
const hintText = document.querySelector('.hint');
const refresh = document.querySelector('.refresh-word');
const check = document.querySelector('.check-word');
const input = document.querySelector('input');
const timeText = document.querySelector('.time');

let correctWord, timer;

const timerInit = (maxTime) => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            timeText.innerHTML = `Time Left: <span><b>${maxTime}</b>s</span>`;
        } else {
            clearInterval(timer);
            alert(`Time Out! "${correctWord.toUpperCase()}" is the correct word!`);
            game();
        }
    }, 1000);
}

const game = () => {
    let random = words[Math.floor(Math.random() * words.length)];
    let wordArr = random.word.split('');

    for (let i = wordArr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = wordArr[i];
        wordArr[i] = wordArr[j];
        wordArr[j] = temp;
    }

    wordText.innerHTML = wordArr.join('');
    hintText.innerHTML = random.hint;
    correctWord = random.word.toLowerCase();

    input.setAttribute('placeholder', 'Enter the correct word');
    input.setAttribute('maxlength', correctWord.length);
    input.value = '';

    timerInit(30);
};

game();

refresh.addEventListener('click', game);

check.addEventListener('click', () => {
    let inputWord = input.value.toLowerCase();

    if (!inputWord) {
        alert(`Please enter a word before submitting.`);
    } else if (inputWord === correctWord) {
        alert(`Well done! "${correctWord.toUpperCase()}" is the correct word!`);
        game();
    } else {
        alert(`Oops! "${inputWord.toUpperCase()}" is incorrect. The correct word was: "${correctWord.toUpperCase()}".`);
    }

    input.value = '';
});

