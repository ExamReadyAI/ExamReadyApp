function load_matrix_multiple_response(randomQuestions,index){
    const $questionDiv = $('#question');
    const questionHtml = ` <div class="row align-items-start">
        <div class="col-md-6" id="exampause1">
            <p style="font-weight: bold;" id="text_instruction">The following scenario applies to the next 1 items</p>
            <p id="data_instruction"></p>
            <p>item 1 of 1</p>
            <ul class="nav nav-tabs mt-4" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="hpi-tab" data-toggle="tab" href="#notes" role="tab" aria-controls="hpi" aria-selected="true">Triage Note</a>
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
                <p style="font-weight: bold;"><i class="fa fa-chevron-right"></i> For each client finding below, click to specify if the finding is consistent with the disease process of hemothorax or asthma attack. Each finding may support more than one (1) disease process.</p>
                <div id="matrix_question">
                    <!-- Placeholder for question text with matrix template -->
                    <table class="table table-bordered table-no-vertical-lines">
                        <thead>
                            <tr>
                                <th>Client Findings</th>
                                <th>Hemothrax</th>
                                <th>Asthma Exacerbation</th>
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
        const nursesnote = questionData['triage_note'];
        const clientfindings = questionData.client_findings;
        const questioNumber = index + 1;
        const displayText = questioNumber + ". The following scenario applies to the next 1 items";
        
        $('#text_instruction').text(displayText);
        $('#data_nursesnote').text(nursesnote);
        $('#data_instruction').text(questionprompt);
        createMatrixQuestionTable3(randomQuestions);
}
// Function to dynamically create the matrix question table
function createMatrixQuestionTable3(randomQuestions) {
    const tbody = $('.table-no-vertical-lines tbody');
    tbody.empty(); // Clear existing rows

    // Loop through interventions and create rows
    randomQuestions.client_findings.forEach((clientfindings, index) => {
        const row = $('<tr>');

        // Column for Intervention
        const interventionCell = $('<td>').text(clientfindings);
        row.append(interventionCell);

        // Column for "Essential" radio button
        const essentialCell = $('<td>').addClass('text-right');
        const essentialRadio = $('<input>').attr({
            type: 'checkbox',
            name: `question${index + 1}`,
            value: 'yes'
        });
        essentialCell.append(essentialRadio);
        row.append(essentialCell);

        // Column for "Contraindicated" radio button
        const contraindicatedCell = $('<td>').addClass('text-right');
        const contraindicatedRadio = $('<input>').attr({
            type: 'checkbox',
            name: `question${index + 1}`,
            value: 'yes'
        });
        contraindicatedCell.append(contraindicatedRadio);
        row.append(contraindicatedCell);

        // Append row to table body
        tbody.append(row);
    });
}