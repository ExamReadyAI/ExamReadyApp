function load_highlight_table(randomQuestions,index){
    const $questionDiv = $('#question');
    const questionHtml = ` <div class="row mb-3">
            <div class="col">
                <p id="question_prompt"></p>
                <p class="click-to-specify"><span class="mr-2">&#8594;</span>Click to specify findings.</p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th style="width: 25%;">Assessment</th>
                            <th style="width: 75%;">Finding</th>
                        </tr>
                    </thead>
                    <tbody id="assessmentTableBody">
                    </tbody>
                </table>
            </div>
        </div>`;

        $questionDiv.html(questionHtml);

        const questionData = randomQuestions;
        const questionprompt = questionData['left_side_question_prompt'];
        const correctanswer = questionData.answer;
        const assessment = questionData['assessment'];
        const finding = questionData['finding'];
        const questioNumber = index + 1;
        const displayText = questioNumber + ". " + questionprompt;
        // const questionText = constructQuestionText(questionData);
        $('#question_prompt').text(displayText);

        createHighlightTableQuestion(questionData);

        $(document).on('mouseup', () => {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const selectedText = range.toString();
                if (selectedText.length > 0) {
                    const parentElement = range.commonAncestorContainer;
                    if ($(parentElement).closest('table').length) {
                        const span = $('<span>').addClass('highlight')[0];
                        range.surroundContents(span);
                        selection.removeAllRanges();
                    }
                }
            }
        });
}
function createHighlightTableQuestion(questionData){
    const tableBody = document.getElementById('assessmentTableBody');
    const assessment = questionData['assessment'];
    const finding = questionData['finding'];
    assessment.forEach((assess, index) => {
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');
        cell1.innerText = assess;
        cell2.innerHTML = finding[index];
        row.appendChild(cell1);
        row.appendChild(cell2);
        tableBody.appendChild(row);
    });
}