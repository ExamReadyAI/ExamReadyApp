function load_fill_in_the_blank(randomQuestions,index){
    const $questionDiv = $('#question');
    const questionHtml = ` <div class="row">                
                <div class="col-md-12">                             
                <p><img src="assets/img/icons/solid/Vector.png"><span class="rightquestion" id="left-side-question"></span></p>                           
                <p id="question-instruction" class="mb-4 font-weight-bold"></p>                            
                <p>Answer: <input type="text" name="answer" id="answer-val" autofocus>                           
                <span id="blank-text"></span>         
                </p>                      
                </div>        
                </div>`;

        $questionDiv.html(questionHtml);
        const questionNumber = index + 1;
        const displayText = randomQuestions['left_side_question_prompt'];
        $('#left-side-question').html(displayText);
}