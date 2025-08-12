document.addEventListener('DOMContentLoaded', () => {
    const wordText = document.querySelector('.word');
    const hintText = document.querySelector('.hint');
    const refreshBtn = document.querySelector('.refresh-word');
    const checkBtn = document.querySelector('.check-word');
    const inputField = document.querySelector('input');
    const timeText = document.querySelector('.time');

    // Modal Elements
    const successModal = document.getElementById('successModal');
    const gameOverModal = document.getElementById('gameOverModal');
    const correctWordText = document.getElementById('correctWordText');
    const continueBtn = document.getElementById('continueBtn');
    const playAgainBtn = document.getElementById('playAgainBtn');
    const exitBtnSuccess = document.getElementById('exitBtnSuccess');
    const exitBtnGameOver = document.getElementById('exitBtnGameOver');

    // Read the isGuest status from the body's data attribute
    const isGuest = document.body.dataset.isGuest === 'true';

    let correctWord, timer;

    // --- Modal Functions ---
    const showSuccessModal = () => {
        clearInterval(timer); // Stop the timer
        if(successModal) successModal.classList.remove('hidden');
    };

    const showGameOverModal = () => {
        clearInterval(timer); // Stop the timer
        if(correctWordText) correctWordText.textContent = `"${correctWord.toUpperCase()}"`;
        if(gameOverModal) gameOverModal.classList.remove('hidden');
    };

    const hideModals = () => {
        if(successModal) successModal.classList.add('hidden');
        if(gameOverModal) gameOverModal.classList.add('hidden');
    };

    // --- Game Timer ---
    const timerInit = (maxTime) => {
        clearInterval(timer);
        timer = setInterval(() => {
            if (maxTime > 0) {
                maxTime--;
                if(timeText) timeText.innerHTML = `Time Left: <span><b>${maxTime}</b>s</span>`;
            } else {
                showGameOverModal(); // Show game over modal when time is out
            }
        }, 1000);
    }

    // --- Main Game Logic ---
    const game = () => {
        hideModals(); // Hide any open modals
        // Ensure words array is available
        if (typeof words === 'undefined' || words.length === 0) {
            console.error("Words array is not defined or is empty.");
            return;
        }
        let random = words[Math.floor(Math.random() * words.length)];
        let wordArr = random.word.split('');

        for (let i = wordArr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [wordArr[i], wordArr[j]] = [wordArr[j], wordArr[i]]; // Swap letters
        }

        if(wordText) wordText.innerHTML = wordArr.join('');
        if(hintText) hintText.innerHTML = `Hint: <span class="font-medium text-slate-700">${random.hint}</span>`;
        correctWord = random.word.toLowerCase();

        if(inputField) {
            inputField.setAttribute('placeholder', 'Enter the correct word');
            inputField.setAttribute('maxlength', correctWord.length);
            inputField.value = '';
        }

        timerInit(30);
    };

    game(); // Start the first game

    // --- Event Listeners ---
    if(refreshBtn) refreshBtn.addEventListener('click', game);

    if(checkBtn) checkBtn.addEventListener('click', () => {
        if(!inputField) return;
        let inputWord = inputField.value.toLowerCase().trim();

        if (!inputWord) {
            console.log("Please enter a word.");
            return;
        }

        if (inputWord === correctWord) {
            showSuccessModal();
        } else {
            showGameOverModal();
        }
    });

    // --- Modal Button Logic ---
    if(continueBtn) continueBtn.addEventListener('click', game);
    if(playAgainBtn) playAgainBtn.addEventListener('click', game);

    // This function now handles the redirect logic based on player status
    const handleExit = () => {
        if (isGuest) {
            window.location.href = '/guest/home'; // Guests go to the main homepage
        } else {
            window.location.href = '/user/home'; // Logged-in users go to their dashboard
        }
    };

    if(exitBtnSuccess) exitBtnSuccess.addEventListener('click', handleExit);
    if(exitBtnGameOver) exitBtnGameOver.addEventListener('click', handleExit);
});
