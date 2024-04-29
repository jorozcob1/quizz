document.addEventListener('DOMContentLoaded', () => {

    const questions = [{
            question: 'What is the purpose of a constructor in JavaScript?',
            answers: [
                { text: 'To create a new object', correct: true },
                { text: 'To modify an existing object', correct: false },
                { text: 'To delete an object', correct: false },
                { text: 'To loop through an object', correct: false }
            ]
        },
        {
            question: 'What is the result of 2 + "2" in JavaScript?',
            answers: [
                { text: '4', correct: false },
                { text: '22', correct: true },
                { text: 'NaN', correct: false },
                { text: 'Error', correct: false }
            ]
        },
        {
            question: 'What is the difference between let and var in JavaScript?',
            answers: [
                { text: 'There is no difference', correct: false },
                { text: 'let has block scope, var has function scope', correct: true },
                { text: 'let is used for constants, var is used for variables', correct: false },
                { text: 'let is used in the browser, var is used in Node.js', correct: false }
            ]
        },
        {
            question: 'What is the purpose of the Array.map() method in JavaScript?',
            answers: [
                { text: 'To add elements to an array', correct: false },
                { text: 'To remove elements from an array', correct: false },
                { text: 'To transform each element of an array', correct: true },
                { text: 'To sort the elements of an array', correct: false }
            ]
        },
        {
            question: 'What is the result of typeof null in JavaScript?',
            answers: [
                { text: 'object', correct: true },
                { text: 'null', correct: false },
                { text: 'undefined', correct: false },
                { text: 'string', correct: false }
            ]
        },
        {
            question: 'What is the purpose of the fetch() function in JavaScript?',
            answers: [
                { text: 'To perform AJAX requests', correct: true },
                { text: 'To manipulate the DOM', correct: false },
                { text: 'To create a new object', correct: false },
                { text: 'To add event listeners', correct: false }
            ]
        },
        // Add more questions here
        {
            question: 'What is the most popular programming language?',
            answers: [
                { text: 'Java', correct: false },
                { text: 'Python', correct: true },
                { text: 'C++', correct: false },
                { text: 'JavaScript', correct: false }
            ]
        },
        {
            question: 'What is the purpose of a callback function in JavaScript?',
            answers: [
                { text: 'To handle asynchronous operations', correct: true },
                { text: 'To define CSS styles', correct: false },
                { text: 'To create loops', correct: false },
                { text: 'To validate form inputs', correct: false }
            ]
        },
        {
            question: 'What is the result of 10 % 3 in JavaScript?',
            answers: [
                { text: '1', correct: true },
                { text: '3', correct: false },
                { text: '0', correct: false },
                { text: '10', correct: false }
            ]
        },
        {
            question: 'What is the purpose of the reduce() method in JavaScript?',
            answers: [
                { text: 'To filter elements in an array', correct: false },
                { text: 'To find the maximum value in an array', correct: false },
                { text: 'To combine all elements of an array into a single value', correct: true },
                { text: 'To reverse the order of elements in an array', correct: false }
            ]
        }
    ];

    const questionContainer = document.querySelector('.question');
    const timerDisplay = document.querySelector('.timer');
    const scoreDisplay = document.querySelector('.score');

    let currentQuestionIndex = 0; // Start at the first question
    let score = 0; // Initialize score

    // Initially display the first question only
    displayQuestion(currentQuestionIndex);

    function displayQuestion(index) {
        const currentQuestion = questions[index];
        questionContainer.innerHTML = ''; // Clear previous question

        const questionElement = document.createElement('p');
        questionElement.textContent = currentQuestion.question;
        questionContainer.appendChild(questionElement);

        const answerList = document.createElement('ul');
        currentQuestion.answers.forEach(answer => {
            const answerItem = document.createElement('li');
            answerItem.classList.add('answer');
            answerItem.dataset.correct = answer.correct;
            answerItem.textContent = answer.text;
            answerList.appendChild(answerItem);
        });
        questionContainer.appendChild(answerList);

        questionContainer.classList.add('visible');
        if (index === questions.length - 1) {
            timerDisplay.textContent = 'Time left: --'; // No iniciar el temporizador para la última pregunta
            timerDisplay.style.color = 'black'; // Resetear color a negro
        } else {
            startTimer();
        }
    }

    function startTimer() {
        // Cancel any existing timer before starting a new one
        if (window.currentTimer) {
            clearInterval(window.currentTimer);
        }

        let timeLeft = 30; // 30 seconds for each question
        timerDisplay.textContent = `Time left: ${timeLeft}s`;
        timerDisplay.style.color = 'black'; // Reset color to black

        window.currentTimer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time left: ${timeLeft}s`;

            if (timeLeft <= 0) {
                clearInterval(window.currentTimer);
                questionContainer.classList.remove('visible');
                if (currentQuestionIndex < questions.length - 1) {
                    currentQuestionIndex++;
                    displayQuestion(currentQuestionIndex);
                } else {
                    timerDisplay.textContent = `Time left: 0s`; // Set timer to 0
                    alert(`Quiz completed! Your score: ${score}/${questions.length}`);
                }
            } else if (timeLeft <= 6) {
                timerDisplay.style.color = timerDisplay.style.color === 'red' ? 'black' : 'red';
            }
        }, 1000);
    }


    questionContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('answer')) {
            const selectedAnswer = event.target;
            const isCorrect = selectedAnswer.dataset.correct === "true";
            selectedAnswer.style.backgroundColor = isCorrect ? 'lightgreen' : 'salmon';
            if (isCorrect) score++;

            const allAnswers = questionContainer.querySelectorAll('.answer');
            allAnswers.forEach(answer => {
                answer.style.pointerEvents = 'none';
            });

            setTimeout(() => {
                questionContainer.classList.remove('visible');
                if (currentQuestionIndex < questions.length - 1) {
                    currentQuestionIndex++;
                    displayQuestion(currentQuestionIndex);
                } else {
                    alert(`Quiz completed! Your score: ${score}/${questions.length}`);
                }
            }, 1000);
        }
    });

    // Button to reset the quiz
    document.querySelector('#reset').addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        displayQuestion(currentQuestionIndex);
    });

});