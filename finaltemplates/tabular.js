function load_cloze_dropdown(randomQuestions,index){
    const $questionDiv = $('#question');
    const questionHtml = ` <div class="row align-items-start">
        <div class="col-md-6" id="exampause1">
            <p style="font-weight: bold;" id="text_instruction"></p>
            <p id="data_instruction"></p>
            <p>item 1 of 1</p>
            <ul class="nav nav-tabs mt-4" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="hpi-tab" data-toggle="tab" href="#notes" role="tab" aria-controls="hpi" aria-selected="true">Nurse's Note</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="notes-tab" data-toggle="tab" href="#vitalsigns" role="tab" aria-controls="notes" aria-selected="false">Vital Signs</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="notes-tab" data-toggle="tab" href="#orders" role="tab" aria-controls="notes" aria-selected="false">Orders</a>
                </li>
            </ul>
            <div class="tab-content mt-3" id="myTabContent">
                <div class="tab-pane fade show active" id="notes" role="tabpanel" aria-labelledby="hpi-tab">
                    <p id="data_nursesnote"></p>
                </div>
                <div class="tab-pane fade" id="vitalsigns" role="tabpanel" aria-labelledby="notes-tab">
                    <p id="data_vitalsigns"></p>
                </div>
                <div class="tab-pane fade" id="orders" role="tabpanel" aria-labelledby="notes-tab">
                    <p id="data_orders"></p>
                </div>
            </div>
        </div>
        <div class="col-md-6 vertical-line" id="exampause2">
            <div class="right-column">
                <p><i class="fa fa-chevron-right"></i> Complete the following sentences by choosing from the list of options</p>
                <div id="dropdown_question">
                    <!-- Placeholder for question text with dropdowns dynamically inserted -->
                </div>
            </div>
        </div>
    </div>`;

        $questionDiv.html(questionHtml);

        const questionData = randomQuestions;
        const instruction = questionData['instruction'];
        const question = questionData['question'];
        const nursesnote = questionData['nurses_note'];
        const vitalsigns = questionData['vital_signs'];
        const dropdown1 = questionData.dropdown1;
        const dropdown2 = questionData.dropdown2;
        const dropdown3 = questionData.dropdown3;
        const questioNumber = index + 1;
        const orders = questionData['orders'];
        const explanation = questionData['explanation'];
        const questionText = constructQuestionText(questionData);
        const questionNumber = index + 1;
        const displayText = questionNumber + ". The following scenario applies to the next 1 items";
        $('#data_nursesnote').text(nursesnote);
        $('#data_vitalsigns').text(vitalsigns);
        $('#data_orders').text(orders);
        $('#text_instruction').text(displayText);
        $('#data_instruction').text(instruction);
        // Construct the question text with placeholders replaced by select elements
        
        $('#dropdown_question').html(questionText);

        // Populate dropdown options for dropdown 1
        populateDropdownOptions('dropdown1', dropdown1);

        // Populate dropdown options for dropdown 2
        populateDropdownOptions('dropdown2', dropdown2);

        // Populate dropdown options for dropdown 3
        populateDropdownOptions('dropdown3', dropdown3);

        // Set initial answer to blank
        $('#correct_count').text('');
        $('#explanation').text('');
}

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