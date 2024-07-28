function load_highlight_text(randomQuestions,index){
    const $questionDiv = $('#question');
    const questionHtml = ` <div class="row align-items-start">
        <div class="col-md-6" id="exampause1">
            <p style="font-weight: bold;" id="text_instruction"></p>
            <p id="data_instruction"></p>
            <p class="itemsof">item 1 of 1</p>
            <ul class="nav nav-tabs mt-4" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="progressnotes-tab" data-toggle="tab" href="#notes" role="tab" aria-controls="hpi" aria-selected="true">Progress Note</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="medicalhistory-tab" data-toggle="tab" href="#medicalhistory" role="tab" aria-controls="notes" aria-selected="false">Medical History</a>
                </li>
            </ul>
            <div class="tab-content mt-3" id="myTabContent">
                <div class="tab-pane fade show active" id="notes" role="tabpanel" aria-labelledby="progressnotes-tab">
                    <p id="data_progressnotes"></p>
                </div>
                <div class="tab-pane fade" id="medicalhistory" role="tabpanel" aria-labelledby="medicalhistory-tab">
                    <p id="data_medicalhistory"></p>
                </div>
            </div>
        </div>
        <div class="col-md-6 vertical-line" id="exampause2">
            <div class="right-column">
                <p style="font-weight: bold;" ><img src="assets/img/icons/solid/Vector.png"><span class="rightquestion" id="data_rightsidequestion"></span> </p>
                <div id="textchoice">
                </div>
            </div>
        </div>
    </div>`;

        $questionDiv.html(questionHtml);

        const questionData = randomQuestions;
        const questionprompt = questionData['left_side_question_prompt'];
        const rightquestionprompt = questionData['right_side_question'];
        const progressnotes = questionData['progress_notes'];
        const medicalhistory = questionData['medical_history'];
        const textchoice = questionData['text_choice'];
        const correctanswer = questionData.answer;
        
        const questioNumber = index + 1;
        const displayText = "The following scenario applies to the next 1 items";
        const explanation = questionData['explanation'];
        // const questionText = constructQuestionText(questionData);
        $('#data_progressnotes').text(progressnotes);
        $('#data_medicalhistory').text(medicalhistory);
        $('#data_instruction').text(questionprompt);
        $('#text_instruction').text(displayText);
        $('#data_rightsidequestion').text(rightquestionprompt);
        $('#textchoice').text(textchoice);


        $(document).on('mouseup', () => {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const selectedText = range.toString();
                if (selectedText.length > 0) {
                    const parentElement = range.commonAncestorContainer;
                    if ($(parentElement).closest('#textchoice').length) {
                        const span = $('<span>').addClass('highlight')[0];
                        range.surroundContents(span);
                        selection.removeAllRanges();
                    }
                }
            }
        });

}
