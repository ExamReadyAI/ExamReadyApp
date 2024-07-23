function load_fill_in_the_blank(randomQuestions,index){
    const $questionDiv = $('#question');
    const questionHtml = ` <div class="row">                
                <div class="col-md-12">                             
                <p id="left-side-question"></p>                           
                <p id="question-instruction" class="mb-4 font-weight-bold"></p>                            
                <p>Answer: <input type="text" name="answer" id="answer-val" autofocus>                           
                <span id="blank-text"></span>         
                </p>                      
                </div>        
                </div>`;

        $questionDiv.html(questionHtml);
        const questionNumber = index + 1;
        const displayText = questionNumber + ". " + randomQuestions['left_side_question_prompt'];
        $('#left-side-question').html(displayText);
}