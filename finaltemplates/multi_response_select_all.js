function load_multi_response_select_all(questions,index){
    const $questionDiv = $('#question');
    const questionHtml = ` <div class="row">                       
                    <div class="col-md-6">                                                    
                    <p class="mb-4" id="left-side-question"></p>
                    <p class="itemsof">item 1 of 1</p>                                            
                    <ul class="nav nav-tabs selectn" id="questionsTab" role="tablist" >                                               
                    <li class="nav-item" role="presentation">                                                          
                    <a class="nav-link active" id="tab1-tab" data-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true">Tab1
                    </a>                                               
                    </li>                                               
                    <li class="nav-item" role="presentation">                                                           
                    <a class="nav-link" id="tab2-tab" data-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false">Tab2
                    </a>                                               
                    </li>                                               
                    <li class="nav-item" role="presentation">                                                           
                    <a class="nav-link" id="tab3-tab" data-toggle="tab" href="#tab3" role="tab" aria-controls="tab3" aria-selected="false">Tab3
                    </a>                                               
                    </li>                                   
                    <li class="nav-item" role="presentation">                                                           
                    <a class="nav-link" id="tab4-tab" data-toggle="tab" href="#tab4" role="tab" aria-controls="tab3" aria-selected="false">Tab4
                    </a>                                               
                    </li>                                   
                    </ul>                                                
                    <div class="tab-content" id="myTabContent" style="border-left:1px solid #dee2e6;border-right:1px solid #dee2e6;border-bottom:1px solid #dee2e6;padding:1em;">                          
                    <div class="tab-pane fade show active mytabs" id="tab1" role="tabpanel" aria-labelledby="tab1-tab"></div>                                               
                    <div class="tab-pane fade mytabs" id="tab2" role="tabpanel" aria-labelledby="tab2-tab"></div>                                  
                    <div class="tab-pane fade mytabs" id="tab3" role="tabpanel" aria-labelledby="tab3-tab"></div>                                  
                    <div class="tab-pane fade mytabs" id="tab4" role="tabpanel" aria-labelledby="tab4-tab"></div>                                   
                    </div>                                
                    </div>          
                    <div class="col-md-6 vertical-line" id="exampause2">
                    <div class="right-column">                                            
                    <p  class="font-weight-bold"><img src="assets/img/icons/solid/Vector.png"><span class="rightquestion" id="right-side-question"> </span></p>                                                           
                    <p id="question-instruction" class="mb-4 font-weight-bold"></p>                                                     
                    <div id="check-box-multiple-choice">                                               
                    <div class="form-group form-check">                                                           
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">                                                           
                    <label class="form-check-label" for="exampleCheck1">Option 1</label>                                               
                    </div>                                               
                    <div class="form-group form-check">                                                           
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">                                                           
                    <label class="form-check-label" for="exampleCheck1">Option 2</label>                                               
                    </div>                                   
                    </div>                                                                                                    
                    </div> 
                    </div>          
                    </div>`;

        $questionDiv.html(questionHtml);
        const questionNumber = index+1;
        const displayText = questions['left_side_question_prompt'];
        $('#left-side-question').html(displayText);
                    
                    
                    if( questions['triage_note'] != '' ){
                        $('#tab1-tab').show();
                        $('#tab1-tab').html('Triage Note');
                        $('#tab1').html(questions['triage_note']);
                    }
                    else{
                        $('#tab1-tab').hide();
                    }

                    if( questions['diagnostic_results'] != '' ){
                        $('#tab2-tab').show();
                        $('#tab2-tab').html('Diagnostics Result');
                        $('#tab1').html(questions['diagnostic_results']);
                    }
                    else{
                        $('#tab2-tab').hide();
                    }

                    if( questions['nurses_notes'] != '' ){
                        $('#tab3-tab').show();
                        $('#tab3-tab').html('Nurses Notes');
                        $('#tab3').html(questions['nurses_notes']);
                    }
                    else{
                        $('#tab3-tab').hide();
                    }

                    if( questions['progress_notes'] != '' ){
                        $('#tab4-tab').show();
                        $('#tab4-tab').html('Progress Notes');
                        $('#tab4').html(questions['progress_notes']);
                    }
                    else{
                        $('#tab4-tab').hide();
                    }


                    $('#right-side-question').html(questions['right_side_question']);

                    // String to be exploded
                    var options = questions['checkbox_options'];

                    // Explode the string
                    var optionsArray = options.split('|');
                    
                    // Target the container
                    var $container = $('#check-box-multiple-choice');
                    
                    $container.html('');
                    // Iterate over the array and create checkboxes
                    $.each(optionsArray, function(index, value) {
                        var checkboxId = 'option' + (index + 1); // Unique ID for each checkbox
                        var checkboxHtml = '<div class="form-group form-check"><input type="checkbox" class="form-check-input" id="${checkboxId}"><label class="form-check-label" for="${checkboxId}">' + value + '</label></div>';
                        $container.append(checkboxHtml);
                    });
}