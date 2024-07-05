import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection, getDocs } from 'firebase/firestore';


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBj3EmeODzfrJYOV7XMepP3v1ZWgc767i8",
    authDomain: "openai-75c43.firebaseapp.com",
    projectId: "openai-75c43",
    storageBucket: "openai-75c43.appspot.com",
    messagingSenderId: "972256077227",
    appId: "1:972256077227:web:2735c614bc712d5f529eee",
    measurementId: "G-BCF1BM6S5P"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
// Initialize Firebase analytics (optional)
const analytics = getAnalytics(app);
const db = getFirestore(app);
// Global variable to store fetched questions
let numberOfQuestions = 15;
let randomQuestions = [];
let userResponses = []; // Array to store user responses

// Function to fetch 10 random questions from Firestore
async function fetchRandomQuestions() {
    try {
        // Fetch all documents from the 'questions' collection
        const querySnapshot = await getDocs(collection(db, 'questions'));
        const allQuestions = [];

        // Populate an array with all documents' data
        querySnapshot.forEach(doc => {
            allQuestions.push(doc.data());
        });

        // Check if there are at least 10 questions available
        if (allQuestions.length < 10) {
            console.log(`Error: Not enough questions available. Found ${allQuestions.length}.`);
            return [];
        }

        // Randomly select 10 unique questions
        const selectedQuestions = [];
        const usedIndexes = new Set();
        
        while (selectedQuestions.length < numberOfQuestions) {
            const randomIndex = Math.floor(Math.random() * allQuestions.length);

            // Ensure the selected question hasn't been used before
            if (!usedIndexes.has(randomIndex)) {
                selectedQuestions.push(allQuestions[randomIndex]);
                usedIndexes.add(randomIndex);
            }
        }

        randomQuestions = selectedQuestions; // Store questions globally
        return selectedQuestions;
    } catch (error) {
        console.error('Error fetching random questions:', error);
        return [];
    }
}

// Function to display a question by index
function displayQuestion(index) {
    if (randomQuestions.length > 0 && index >= 0 && index < randomQuestions.length) {
        const questionData = randomQuestions[index];
        const question = questionData['Question Text'];
        const options = questionData.Options;
        const category = questionData['Client Needs Area'];
        console.log(randomQuestions[index]);
        const questioNumber = index + 1;
        const displayText = questioNumber + ". " + question;
        const questionProgressText = questioNumber + " of " + randomQuestions.length;
        document.getElementById('randomQuestion').textContent = displayText;
        document.getElementById('questionProgress').textContent = questionProgressText;
        document.getElementById('category').textContent = category;
        
        const optionsContainer = document.getElementById('optionsContainer');
        optionsContainer.innerHTML = ''; // Clear previous options

        // Retrieve user response for the current question
        const userResponse = getUserResponse(questionData.QuestionID);

        // Create radio buttons for each option
        options.forEach((option, optionIndex) => {
            const optionId = `option_${questioNumber}_${optionIndex}`;
            const radioInput = document.createElement('input');
            radioInput.setAttribute('type', 'radio');
            radioInput.setAttribute('id', optionId);
            radioInput.setAttribute('name', `options_${questioNumber}`); // Unique name for each question's options
            radioInput.setAttribute('value', option);

            // Check if this option was previously selected by the user
            if (userResponse && userResponse === option) {
                radioInput.checked = true;
            }

            // Check if user has submitted answer, then disable the radio buttons
            if (userResponses.some(response => response.questionId === questionData.QuestionID)) {
                radioInput.disabled = true;
                const correctAnswer = randomQuestions[currentIndex]['Correct Answer'];
                const explanation = randomQuestions[currentIndex]['Explanation'];
                const explanation1 = randomQuestions[currentIndex]['Incorrect Explanation 1'];
                const explanation2 = randomQuestions[currentIndex]['Incorrect Explanation 2'];
                const explanation3 = randomQuestions[currentIndex]['Incorrect Explanation 3'];
            
            
                const correctAnswerDiv = document.getElementById('correctAnswer');
                if (userResponse.response === correctAnswer) {
                    correctAnswerDiv.textContent = 'Correct!';
                    correctAnswerDiv.style.color = 'green'; // Set correct answer color to green
                    correctAnswerDiv.innerHTML += `<br><span style="color: green">${explanation}</span><br>`;
                    correctAnswerDiv.innerHTML += `<span style="color: red">${explanation1}<br>${explanation2}<br>${explanation3}</span>`;
                } else {
                    correctAnswerDiv.textContent = 'Incorrect!';
                    correctAnswerDiv.style.color = 'red'; // Set incorrect answer color to red
                    correctAnswerDiv.innerHTML += `<br><span style="color: green">Correct Answer: ${correctAnswer}</span>`;
                    correctAnswerDiv.innerHTML += `<br><span style="color: green">${explanation}</span><br>`;
                    correctAnswerDiv.innerHTML += `<span style="color: red">${explanation1}<br>${explanation2}<br>${explanation3}</span>`;
                }
            }
            else{

                document.getElementById('correctAnswer').textContent = '';
            }

            const label = document.createElement('label');
            label.setAttribute('for', optionId);
            label.textContent = option;

            // Append radio button and label to container
            optionsContainer.appendChild(radioInput);
            optionsContainer.appendChild(label);
            optionsContainer.appendChild(document.createElement('br')); // Line break
        });
         // Clear hints and correct answer divs
         document.getElementById('hints').textContent = '';
 
         // Reset hint index when displaying a new question
         document.getElementById('hints').dataset.hintIndex = 0;
    }
}

// Function to save user response for the current question
function saveUserResponse() {
    const selectedOption = document.querySelector(`input[name="options_${currentIndex + 1}"]:checked`);

    if (!selectedOption) {
        return; // No response selected
    }

    const userResponse = selectedOption.value;
    const questionId = randomQuestions[currentIndex].QuestionID;
    const correctAnswer = randomQuestions[currentIndex]['Correct Answer'];
    const isCorrect = (userResponse === correctAnswer);


    // Check if the response already exists in the userResponses array
    const existingResponseIndex = userResponses.findIndex(response => response.QuestionID === questionId);

    if (existingResponseIndex !== -1) {
        // Update existing response
        userResponses[existingResponseIndex].response = userResponse;
        userResponses[existingResponseIndex].isCorrect = isCorrect;
    } else {
        // Add new response
        userResponses.push({ questionId, response: userResponse,isCorrect });
    }

    console.log('User responses:', userResponses);

    // Save userResponses array to localStorage
    localStorage.setItem('userResponses', JSON.stringify(userResponses));

    // Disable radio buttons after submitting
    const radioInputs = document.querySelectorAll(`input[name="options_${currentIndex + 1}"]`);
    radioInputs.forEach(input => {
        input.disabled = true;
    });
}

// Function to retrieve user response for a specific question
function getUserResponse(questionId) {
    const storedResponses = JSON.parse(localStorage.getItem('userResponses')) || [];
    const userResponse = storedResponses.find(response => response.questionId === questionId);
    return userResponse ? userResponse.response : null;
}

// Display the first question initially
fetchRandomQuestions().then(() => {
    displayQuestion(0);
});

// Function to show the next question
function showNextQuestion() {
    
    currentIndex++;
    if (currentIndex >= randomQuestions.length) {
        currentIndex = 0; // Loop back to the first question
    }
    displayQuestion(currentIndex);
}

// Function to show the previous question
function showPreviousQuestion() {
    
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = randomQuestions.length - 1; // Loop to the last question
    }
    displayQuestion(currentIndex);
}

// Function to submit selected answer and check correctness
function submitSelectedAnswer() {
    saveUserResponse(); // Save user response before moving to the previous question
    const selectedOption = document.querySelector(`input[name="options_${currentIndex + 1}"]:checked`);

    if (!selectedOption) {
        alert('Please select an answer.');
        return;
    }

    const selectedAnswer = selectedOption.value;
    const correctAnswer = randomQuestions[currentIndex]['Correct Answer'];
    const explanation = randomQuestions[currentIndex]['Explanation'];
    const explanation1 = randomQuestions[currentIndex]['Incorrect Explanation 1'];
    const explanation2 = randomQuestions[currentIndex]['Incorrect Explanation 2'];
    const explanation3 = randomQuestions[currentIndex]['Incorrect Explanation 3'];


    const correctAnswerDiv = document.getElementById('correctAnswer');
    if (selectedAnswer === correctAnswer) {
        correctAnswerDiv.textContent = 'Correct!';
        correctAnswerDiv.style.color = 'green'; // Set correct answer color to green
        correctAnswerDiv.innerHTML += `<br><span style="color: green">${explanation}</span><br>`;
        correctAnswerDiv.innerHTML += `<span style="color: red">${explanation1}<br>${explanation2}<br>${explanation3}</span>`;    
    } else {
        correctAnswerDiv.textContent = 'Incorrect!';
        correctAnswerDiv.style.color = 'red'; // Set incorrect answer color to red
        correctAnswerDiv.innerHTML += `<br><span style="color: green">Correct Answer: ${correctAnswer}</span>`;
        correctAnswerDiv.innerHTML += `<br><span style="color: green">${explanation}</span><br>`;
        correctAnswerDiv.innerHTML += `<span style="color: red">${explanation1}<br>${explanation2}<br>${explanation3}</span>`;
    }

    // Display explanation
    // correctAnswerDiv.innerHTML += `<br>${explanation}`;
}

// Function to get hints related to the current question
function getExamHints() {
    const narrowHint = randomQuestions[currentIndex]['Narrow Focus Hint'];
    const generalHint = randomQuestions[currentIndex]['General Hint'];

    const hintsDiv = document.getElementById('hints');

    if (!hintsDiv.dataset.hintIndex) {
        // Initialize hint index
        hintsDiv.dataset.hintIndex = 0;
    }

    // Retrieve current hint index
    let hintIndex = parseInt(hintsDiv.dataset.hintIndex);

    if (hintIndex === 0 && narrowHint) {
        hintsDiv.textContent = narrowHint;
    } else if (hintIndex === 1 && generalHint) {
        hintsDiv.textContent = generalHint;
    } else {
        alert('You have used all your hints.');
        return;
    }

    // Increment hint index
    hintsDiv.dataset.hintIndex = hintIndex + 1;
}
function calculateCorrectAnswers() {
    let correctCount = 0;

    // Iterate through userResponses array
    userResponses.forEach(response => {
        if (response.isCorrect) {
            correctCount++;
        }
    });

    return correctCount;
}
function endTest(){
    // Show end test message and hide test content
    document.getElementById('testContent').style.display = 'none';
    document.getElementById('endTestMessage').style.display = 'block';

    // Calculate and display correct answers count (replace with actual logic)
    const correctAnswers = calculateCorrectAnswers();
    const totalQuestions = numberOfQuestions; 
    const correctAnswersDisplay = document.querySelector('#endTestMessage p:nth-child(2)');
    correctAnswersDisplay.textContent = `${correctAnswers}/${totalQuestions}`;
    correctAnswersDisplay.style.color = 'green';
}

function restartTest(){
    // For demonstration, reload the page
    window.location.reload();
}
// Initial index to keep track of current question
let currentIndex = 0;

// Attaching event listener programmatically
document.addEventListener('DOMContentLoaded', function() {
    const nextButton = document.getElementById('nextButton');
    const previousButton = document.getElementById('previousButton');
    const submitAnswer = document.getElementById('submitAnswer');
    const getHints = document.getElementById('getHints');
    const endTestBtn = document.getElementById('endTestBtn');
    const pauseExamModal = document.getElementById('pauseExamModal');
    const pauseExam = document.getElementById('pauseExam');
    const elapsed = document.getElementById('elapsedTime');
    
    // const endTestModal = new bootstrap.Modal(document.getElementById('endModal'), {});
    const startNewExamBtn = document.getElementById('startNewExamBtn');
    
    if (nextButton) {
        nextButton.addEventListener('click', async function() {
            showNextQuestion();
        });
    }
    if (previousButton) {
        previousButton.addEventListener('click', async function() {
            showPreviousQuestion();
        });
    }
    if (submitAnswer) {
        submitAnswer.addEventListener('click', async function() {
            submitSelectedAnswer();
        });
    }
    if (getHints) {
        getHints.addEventListener('click', async function() {
            getExamHints();
        });
    }
    if (endTestBtn) {
        endTestBtn.addEventListener('click', async function() {
            const elapsedTimeText = formatTime(elapsedTime);
            elapsed.textContent = "Elapsed Time: " + elapsedTimeText;
            $('#endModal').modal('hide');
            resetTimer();
            endTest();
        });
    }
    if (pauseExamModal) {
        pauseExamModal.addEventListener('click', async function() {
            $('#pauseModal').modal('hide');
            document.getElementById('testContent').style.display = 'none';
            document.getElementById('pauseTextMessage').style.display = 'block';
            pauseTimer();
        });
    }
    if (pauseExam) {
        pauseExam.addEventListener('click', async function() {
            document.getElementById('testContent').style.display = 'block';
            document.getElementById('pauseTextMessage').style.display = 'none';
            resumeTimer();
        });
    }
    if (startNewExamBtn) {
        startNewExamBtn.addEventListener('click', async function() {
            restartTest();
        });
    }

    startTimer();
    $('#pauseButton').on('click', function() {
        pauseTimer();
    });
    
        // Initialize popover for settings
        $('#popoverButton').popover({
            title: 'Settings',
            content: `
                <div class="container-fluid">
                    <div class="row">
                        <div class="col">
                            <h6>Font Size</h6>
                            <button type="button" class="btn btn-outline-primary btn-sm mr-1"><i class="fas fa-search-minus"></i></button>
                            <button type="button" class="btn btn-outline-primary btn-sm mr-1"><i class="fas fa-font"></i></button>
                            <button type="button" class="btn btn-outline-primary btn-sm"><i class="fas fa-search-plus"></i></button>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col">
                            <h6>Color Theme</h6>
                            <button type="button" class="btn btn-outline-light btn-sm mr-1">White</button>
                            <button type="button" class="btn btn-outline-dark btn-sm mr-1">Black</button>
                            <button type="button" class="btn btn-outline-secondary btn-sm">Sepia</button>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col">
                            <h6>Confirm Answer Omission</h6>
                            <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" id="toggleSwitch">
                                <label class="custom-control-label" for="toggleSwitch">Turn on or off</label>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            html: true,
            placement: 'bottom'
        });
});

let timerInterval; // Variable to hold the setInterval reference
let startTime; // Variable to hold the start time
let elapsedTime = 0; // Variable to track elapsed time in seconds

// Function to format time as hh:mm:ss
function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;
    
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${secs < 10 ? '0' + secs : secs}`;
}

// Function to start the timer
function startTimer() {
    startTime = Date.now() - elapsedTime * 1000; // Subtract elapsed time from current time
    timerInterval = setInterval(updateTimer, 1000); // Start updating timer every second
}

// Function to update timer every second
function updateTimer() {
    let currentTime = Date.now();
    elapsedTime = Math.floor((currentTime - startTime) / 1000); // Calculate elapsed time in seconds
    document.getElementById('timer').textContent = formatTime(elapsedTime);
}

// Function to pause the timer
function pauseTimer() {
    clearInterval(timerInterval); // Clear the interval to stop updating the timer
}

// Function to resume the timer
function resumeTimer() {
    startTimer(); // Restart the timer from where it was paused
}
// Function to reset the timer
function resetTimer() {
    clearInterval(timerInterval); // Clear the interval to stop updating the timer
    elapsedTime = 0; // Reset elapsed time
    document.getElementById('timer').textContent = formatTime(elapsedTime); // Update timer display
    
}
