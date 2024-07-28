function loadMultipleSingleResponseTemplate(randomQuestions,index){
    const $questionDiv = $('#question');
    const questionHtml = ` <div><img src="assets/img/icons/solid/Vector.png" id="singleresponseicon"><span id="randomQuestion"></span></div><br>
        <div id="optionsContainer"></div>`;

        $questionDiv.html(questionHtml);
            const questionData = randomQuestions;
            const question = questionData['question_text'];
            const options = questionData.options;
            const questionIcon = ``;
            const displayText = questionIcon + " " + question;
            $('#randomQuestion').text(displayText);
            
            const optionsContainer = document.getElementById('optionsContainer');
            optionsContainer.innerHTML = ''; // Clear previous options
    
    
            // Create radio buttons for each option
            options.forEach((option, optionIndex) => {
                
                const optionId = `option_${index}_${optionIndex}`;
                const radioInput = document.createElement('input');
                radioInput.setAttribute('type', 'radio');
                radioInput.setAttribute('id', optionId);
                radioInput.setAttribute('name', `options_${index}`); // Unique name for each question's options
                radioInput.setAttribute('value', option);
    
                const label = document.createElement('label');
                label.setAttribute('for', optionId);
                label.textContent = option;
    
                // Append radio button and label to container
                optionsContainer.appendChild(radioInput);
                optionsContainer.appendChild(label);
                optionsContainer.appendChild(document.createElement('br')); // Line break
            });;
        
}