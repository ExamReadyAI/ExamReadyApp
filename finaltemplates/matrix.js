function load_matrix_multiple_choice(randomQuestions,index){
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
            </ul>
            <div class="tab-content mt-3" id="myTabContent">
                <div class="tab-pane fade show active" id="notes" role="tabpanel" aria-labelledby="hpi-tab">
                    <p id="data_nursesnote"></p>
                </div>
            </div>
        </div>
        <div class="col-md-6 vertical-line" id="exampause2">
            <div class="right-column">
                <p style="font-weight: bold;"><i class="fa fa-chevron-right"></i> For each potential intervention, click to specify if it's essential or contraindicated. </p>
                <div id="matrix_question">
                    <!-- Placeholder for question text with matrix template -->
                    <table class="table table-bordered table-no-vertical-lines">
                        <thead>
                            <tr>
                                <th>Intervention</th>
                                <th>Essential</th>
                                <th>Contraindicated</th>
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
    const questioninstruction = questionData['question_instruction'];
    const questionprompt = questionData['question_prompt'];
    const nursesnote = questionData['nurses_note'];
    const questionNumber = index + 1;
    const displayText = questionNumber + ". The following scenario applies to the next 1 items";
    const intervention = questionData.intervention;
    const correctanswer = questionData.correctanswer;
    // const questionText = constructQuestionText(questionData);
    $('#data_nursesnote').text(nursesnote);
    $('#data_instruction').text(questionprompt);
    $('#text_instruction').text(displayText);
    $('#correct_count').text('');
    $('#explanation').text('');
    createMatrixQuestionTable();
}
// Function to dynamically create the matrix question table
function createMatrixQuestionTable() {
    const tbody = $('.table-no-vertical-lines tbody');
    tbody.empty(); // Clear existing rows

    // Loop through interventions and create rows
    randomQuestions[currentIndex].intervention.forEach((intervention, index) => {
        const row = $('<tr>');

        // Column for Intervention
        const interventionCell = $('<td>').text(intervention);
        row.append(interventionCell);

        // Column for "Essential" radio button
        const essentialCell = $('<td>').addClass('text-right');
        const essentialRadio = $('<input>').attr({
            type: 'radio',
            name: `question${index + 1}`,
            value: 'Essential'
        });
        essentialCell.append(essentialRadio);
        row.append(essentialCell);

        // Column for "Contraindicated" radio button
        const contraindicatedCell = $('<td>').addClass('text-right');
        const contraindicatedRadio = $('<input>').attr({
            type: 'radio',
            name: `question${index + 1}`,
            value: 'Contraindicated'
        });
        contraindicatedCell.append(contraindicatedRadio);
        row.append(contraindicatedCell);

        // Append row to table body
        tbody.append(row);
    });
}