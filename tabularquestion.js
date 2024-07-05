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

// Global variable to store correct answers
let correctAnswers = {};

let numberOfQuestions = 1;
let randomQuestions = [];

// Function to fetch 10 random questions from Firestore
async function fetchRandomQuestions() {
    try {
        // Fetch all documents from the 'questions' collection
        const querySnapshot = await getDocs(collection(db, 'questions2'));
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
        console.log(randomQuestions);
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
        const instruction = questionData['instruction'];
        const question = questionData['question'];
        const nursesnote = questionData['nurses note'];
        const vitalsigns = questionData['vitalsigns'];
        const dropdown1 = questionData.dropdown1;
        const dropdown2 = questionData.dropdown2;
        const dropdown3 = questionData.dropdown3;
        const dropdown1answer = questionData['dropdown1answer'];
        const dropdown2answer = questionData['dropdown2answer'];
        const dropdown3answer = questionData['dropdown3answer'];

        const category = questionData['clientneedarea'];
        const orders = questionData['orders'];

        // Store correct answers
        correctAnswers[questionText] = {
            dropdown1: dropdown1answer,
            dropdown2: dropdown2answer,
            dropdown3: dropdown3answer
        };

        $('#data_nursesnote').text(nursesnote);
        $('#data_vitalsigns').text(vitalsigns);
        $('#data_orders').text(orders);
        $('#data_instruction').text(instruction);
        // Construct the question text with placeholders replaced by select elements
        const questionText = constructQuestionText(questionData);
        $('#dropdown_question').html(questionText);

        // Populate dropdown options for dropdown 1
        populateDropdownOptions('dropdown1', dropdown1);

        // Populate dropdown options for dropdown 2
        populateDropdownOptions('dropdown2', dropdown2);

        // Populate dropdown options for dropdown 3
        populateDropdownOptions('dropdown3', dropdown3);

    }

        
}
function checkAnswers() {
    let correctCount = 0;

    Object.keys(correctAnswers).forEach(questionText => {
        console.log(`Question: "${questionText}"`);

        // Log selected answers
        const selected1 = $('#dropdown1').val();
        const selected2 = $('#dropdown2').val();
        const selected3 = $('#dropdown3').val();
        console.log('Selected Answers:', selected1, selected2, selected3);

        // Log correct answers
        const correct1 = correctAnswers[questionText].dropdown1;
        const correct2 = correctAnswers[questionText].dropdown2;
        const correct3 = correctAnswers[questionText].dropdown3;
        console.log('Correct Answers:', correct1, correct2, correct3);

        // Check each answer individually and increment correctCount
        if (selected1 === correct1) {
            correctCount++;
            console.log('Answer 1 is correct.');
        }
        if (selected2 === correct2) {
            correctCount++;
            console.log('Answer 2 is correct.');
        }
        if (selected3 === correct3) {
            correctCount++;
            console.log('Answer 3 is correct.');
        }
    });

    // Display the final correct count
    $('#correct_count').text(`Correct Answers: ${correctCount}`);
}


// Event listener for submit button
$('#submit_answer_button').click(checkAnswers);

"The nurse should administer the ceftriaxone in the client’s [drop dow 1] to prevent [drop down 2]. The nurse should obtain a prescription for [drop down 3] cream to apply before the injection to decrease the child’s pain."
// Function to construct the question text with placeholders replaced by select elements
function constructQuestionText(questionData) {
    let questionText = questionData.question; // Assuming 'question' field holds the question text
    questionText = questionText.replace(/\[dropdown1\]/g, '<select id="dropdown1" class="form-control mb-2"></select>');
    questionText = questionText.replace(/\[dropdown2\]/g, '<select id="dropdown2" class="form-control mb-2"></select>');
    questionText = questionText.replace(/\[dropdown3\]/g, '<select id="dropdown3" class="form-control mb-2"></select>');
    return questionText;
}

// Function to populate dropdown options dynamically
function populateDropdownOptions(dropdownId, options) {
    const dropdownSelect = $(`#${dropdownId}`);
    dropdownSelect.empty(); // Clear previous options

    // Add a default option or placeholder text
    dropdownSelect.append($('<option disabled selected></option>').text('Select an option'));

    // Populate dropdown with options
    options.forEach(option => {
        dropdownSelect.append($('<option></option>').text(option));
    });
}

// Display the first question initially
fetchRandomQuestions().then(() => {
    displayQuestion(0);
});
