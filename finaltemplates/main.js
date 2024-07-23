

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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();
// Global variable to store fetched questions
let numberOfQuestions = 14;
let randomQuestions = [];
let userResponses = []; // Array to store user responses

// Function to fetch 10 random questions from Firestore
async function fetchRandomQuestions() {
    try {
        // Fetch all documents from the 'questions' collection
        const querySnapshot = await firebase.firestore().collection('question_bank').get();
        const allQuestions = [];

        // Populate an array with all documents' data
        querySnapshot.forEach(doc => {
            allQuestions.push(doc.data());
        });

        // Check if there are at least 10 questions available
        if (allQuestions.length < numberOfQuestions) {
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
    const category = randomQuestions[index]['client_need_area'];
    const questioNumber = index + 1;
    const questionProgressText = questioNumber + " of " + randomQuestions.length;
    $('#questionProgress').text(questionProgressText);
    $('#category').text(category);
    console.log(randomQuestions[index].template_type)
    switch (randomQuestions[index].template_type) {
        case 'multiple_choice':
            loadMultipleSingleResponseTemplate(randomQuestions[index],index);
            break;
        case 'matrix_multiple_choice':
            load_matrix_multiple_choice(randomQuestions[index],index);
            break;
        case 'cloze_dropdown':
            load_cloze_dropdown(randomQuestions[index],index);
            break;
        case 'drag_and_drop':
            load_drag_and_drop(randomQuestions[index],index);
            break;
        case 'multiple_response_grouping':
            load_multiple_response_grouping(randomQuestions[index],index);
            break;
        case 'matrix_multiple_response':
            load_matrix_multiple_response(randomQuestions[index],index);
            break;
        case 'highlight_text':
            load_highlight_text(randomQuestions[index],index);
            break;
        case 'highlight_table':
            load_highlight_table(randomQuestions[index],index);
            break;
        case 'fill_in_the_blank':
            load_fill_in_the_blank(randomQuestions[index],index);
            break;
        case 'multi_response_select_n':
            load_multi_response_select_n(randomQuestions[index],index);
            break;
        case 'multi_response_select_all':
            load_multi_response_select_all(randomQuestions[index],index);
            break;
        case 'drag_and_drop_cloze':
            load_drag_and_drop_cloze(randomQuestions[index],index);
            break;
        case 'drop_down_table':
            load_drop_down_table(randomQuestions[index],index);
            break;
        case 'order_sequence':
            load_order_sequence(randomQuestions[index],index);
            break;
            
    }
}

// Function to save user response for the current question
function saveUserResponse() {
 
}

// Function to retrieve user response for a specific question
function getUserResponse(questionId) {

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
    
}

// Function to get hints related to the current question
function getExamHints() {

}
function calculateCorrectAnswers() {

}
function endTest(){
    // Show end test message and hide test content
        $('#question').hide();
        $('#submitAnswer').hide();
        $('#getHints').hide();
        $('#endTestMessage').show();
}

function restartTest(){
    // For demonstration, reload the page
    window.location.reload();
}
// Initial index to keep track of current question
let currentIndex = 0;
let timerInterval; // Variable to hold the setInterval reference
let startTime; // Variable to hold the start time
let elapsedTime = 0; // Variable to track elapsed time in seconds

$(document).ready(function() {
    $('#submit_answer_button').on('click', function() {
        handleSubmitButtonClick();
    });
    startTimer();
    $('#nextButton').on('click', function() {
        showNextQuestion();
    });
    $('#previousButton').on('click', function() {
        showPreviousQuestion();
    });
    $('#pauseExamModal').on('click', function() {
        $('#question').hide();
        $('#submitAnswer').hide();
        $('#getHints').hide();
        $('#pauseTextMessage').show();
        $('#pauseModal').modal('hide');
        pauseTimer();
    });
    $('#pauseExam').on('click', function() {
        $('#question').show();
        $('#submitAnswer').show();
        $('#getHints').show();
        $('#pauseTextMessage').hide();
        resumeTimer();
    });
    $('#endTestBtn').on('click', function() {
        const elapsedTimeText = formatTime(elapsedTime);
        $('#elapsedTime').text("Elapsed Time: " + elapsedTimeText);
        $('#endModal').modal('hide');
        resetTimer();
        endTest();
    });
    $('#startNewExamBtn').on('click', function() {
        restartTest();
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