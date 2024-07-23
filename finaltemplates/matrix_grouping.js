function load_multiple_response_grouping(randomQuestions,index){
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
                    <a class="nav-link" id="notes-tab" data-toggle="tab" href="#edorders" role="tab" aria-controls="notes" aria-selected="false">ED Orders</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="notes-tab" data-toggle="tab" href="#diagnosticresult" role="tab" aria-controls="notes" aria-selected="false">Diagnostic Results</a>
                </li>
            </ul>
            <div class="tab-content mt-3" id="myTabContent">
                <div class="tab-pane fade show active" id="notes" role="tabpanel" aria-labelledby="hpi-tab">
                    <p id="data_nursesnote"></p>
                </div>
                <div class="tab-pane fade" id="edorders" role="tabpanel" aria-labelledby="notes-tab">
                    <p id="data_edorders"></p>
                </div>
                <div class="tab-pane fade" id="diagnosticresult" role="tabpanel" aria-labelledby="notes-tab">
                    <p id="data_diagnosticresult"></p>
                </div>
            </div>
        </div>
        <div class="col-md-6 vertical-line" id="exampause2">
            <div class="right-column">
                <p style="font-weight: bold;"><i class="fa fa-chevron-right"></i> The nurse contacts the physician regarding the client's assessment in the ICU  Select the anticipated physician orders from each of the following categories. Each category must have one (1) response option selected. Each category may have more than one (1) response option selected.</p>
                <div id="matrix_question">
                    <!-- Placeholder for question text with matrix template -->
                    <table class="table table-bordered table-no-vertical-lines">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Potential Orders</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
    </div>`;

        $questionDiv.html(questionHtml);

        const questionData = randomQuestions;
        const questionprompt = questionData['left_side_question_prompt'];
        const nursesnote = questionData['nurses_notes'];
        const edorders = questionData['ed_orders'];
        const diagnosticresults = questionData['diagnostic_results'];
        const questioNumber = index + 1;
        const displayText = questioNumber + ". The following scenario applies to the next 1 items";
        // const questionText = constructQuestionText(questionData);
        $('#data_nursesnote').text(nursesnote);
        $('#data_edorders').text(edorders);
        $('#data_diagnosticresult').text(diagnosticresults);
        $('#data_instruction').text(questionprompt);
        $('#text_instruction').text(displayText);
        
        createMatrixQuestionTable2(randomQuestions);
}

// Function to dynamically create the matrix question table
function createMatrixQuestionTable2(randomQuestions) {
    const tbody = $('.table-no-vertical-lines tbody');
    tbody.empty(); // Clear existing rows

    // Define the arrays for each category
    const arrays = {
        'Laboratory': randomQuestions.laboratory,
        'Medications': randomQuestions.medications,
        'Miscellaneous': randomQuestions.miscellaneous
    };

    // Loop through categories and create rows
    randomQuestions.category.forEach((category, index) => {
        // Add a category row
        const categoryRow = $('<tr>');

        // Column for Category
        const categoryCell = $('<td>').text(category);
        categoryRow.append(categoryCell);

        // Column for Items
        const itemsCell = $('<td>');

        // Get the correct array for the current category
        const itemsArray = arrays[category] || [];

        // Add checkboxes for each item in the current category
        itemsArray.forEach((item) => {
            const checkboxContainer = $('<div class="checkbox-container">');

            const checkbox = $('<input>').attr({
                type: 'checkbox',
                id: item,
                name: `question${index + 1}`,
                value: item
            });

            const label = $('<label>').attr('for', item).text(item);

            checkboxContainer.append(checkbox).append(label);
            itemsCell.append(checkboxContainer);
        });

        categoryRow.append(itemsCell);

        // Append row to table body
        tbody.append(categoryRow);
    });
}
