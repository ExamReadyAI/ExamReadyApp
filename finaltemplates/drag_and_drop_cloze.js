function load_drag_and_drop_cloze(){
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
        <p id="right-side-question"><img src="assets/img/icons/solid/Vector.png"><span class="rightquestion">Drag one (1) condition and two (2) client findings to fill in each blank of the following sentence</span></p>          
        <p id="question-instruction" class="mb-4 font-weight-bold"></p>                   
        <!-- left side col content/layout -->           
        <div class="row">             
            <div class="col-md-4">                 
                <!-- <h2>Drop Zone</h2> -->                 
                <ul id="drop-zone1" class="list-group mb-4 h-5 p-2" style="min-height:60px;background:#E8F1F7;border:1px solid #E8F1F7;">                     
                    <p class="text-center mt-2" style="color:#999;"><i>Drag your answer here</i></p>                 
                </ul>                  
            </div>             
            <div class="col-md-4">                 
                <!-- <h2>Drop Zone</h2> -->                 
                    <ul id="drop-zone2" class="list-group mb-4 h-5 p-2" style="min-height:60px;background:#E8F1F7;border:1px solid #E8F1F7;">                     
                    <p class="text-center mt-2" style="color:#999;"><i>Drag your answer here</i></p>                 
                </ul>                
            </div>             
            <div class="col-md-4">                 
                <!-- <h2>Drop Zone</h2> -->                 
                    <ul id="drop-zone3" class="list-group mb-4 h-5 p-2" style="min-height:60px;background:#E8F1F7;border:1px solid #E8F1F7;">                     
                    <p class="text-center mt-2" style="color:#999;"><i>Drag your answer here</i></p>                 
                </ul>               
            </div>  
            <div class="rows">
                    <div class="col-md-4 cards">
                      <div class="card droppable-card">
                        <div class="card-header text-center font-weight-bold databox">
                          Condition
                        </div>
                        <div class="card-body">
                          <div class="box_data" data-original-parent="card1" draggable="true">item 1</div>
                          <div class="box_data" data-original-parent="card1" draggable="true">item 2</div>
                          <div class="box_data" data-original-parent="card1" draggable="true">item 3</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4 cards">
                      <div class="card droppable-card">
                        <div class="card-header text-center font-weight-bold databox">
                          Clinical Finding
                        </div>
                        <div class="card-body">
                          <div class="box_data" data-original-parent="card2" draggable="true">item 1</div>
                          <div class="box_data" data-original-parent="card2" draggable="true">item 2</div>
                          <div class="box_data" data-original-parent="card2" draggable="true">item 3</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4 cards">
                      <div class="card droppable-card">
                        <div class="card-header text-center font-weight-bold databox">
                          Clinical Finding
                        </div>
                        <div class="card-body">
                          <div class="box_data" data-original-parent="card3" draggable="true">item 4</div>
                          <div class="box_data" data-original-parent="card3" draggable="true">item 5</div>
                          <div class="box_data" data-original-parent="card3" draggable="true">item 6</div>
                        </div>
                      </div>
                    </div>
                  </div>   
                  </div>    
                  </div>
        </div>      
    </div> 
</div>`;

        $questionDiv.html(questionHtml);
}