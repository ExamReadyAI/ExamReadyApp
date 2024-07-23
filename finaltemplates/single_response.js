function loadMultipleSingleResponseTemplate(randomQuestions,index){
    const $questionDiv = $('#question');
    const questionHtml = ` <div id="randomQuestion"></div>
        <div id="optionsContainer"></div>
        <br><br>
        <div id="hints"></div>
        <div id="correctAnswer"></div>
        <div id="explanation1"></div>
        <div id="explanation2"></div>
        <div id="explanation3"></div>`;

        $questionDiv.html(questionHtml);
            const questionData = randomQuestions;
            const question = questionData['question_text'];
            const options = questionData.options;
            const questionNumber = index + 1;
            const displayText = questionNumber + ". " + question;
            $('#randomQuestion').text(displayText);
            
            const optionsContainer = document.getElementById('optionsContainer');
            optionsContainer.innerHTML = ''; // Clear previous options
    
            // Retrieve user response for the current question
            const userResponse = getUserResponse(questionData.QuestionID);
    
            // Create radio buttons for each option
            options.forEach((option, optionIndex) => {
                const optionId = `option_${index}_${optionIndex}`;
                const radioInput = document.createElement('input');
                radioInput.setAttribute('type', 'radio');
                radioInput.setAttribute('id', optionId);
                radioInput.setAttribute('name', `options_${index}`); // Unique name for each question's options
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