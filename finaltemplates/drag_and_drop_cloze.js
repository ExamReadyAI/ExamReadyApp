function load_drag_and_drop_cloze(){
    const $questionDiv = $('#question');
    const questionHtml = ` <div class="row">      
    <div class="col-md-5 offset-md-1">                   
        <p class="mb-4" id="left-side-question"></p>          
        <p>Item 1 of 1</p>         
        <ul class="nav nav-tabs" id="myTab" role="tablist" >              
            <li class="nav-item" role="presentation">                  
                <a class="nav-link active" id="tab1-tab" data-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true">Nurse's Notes</a>              
            </li>                      
        </ul>          
        <div class="tab-content" id="myTabContent" style="border-left:1px solid #dee2e6;border-right:1px solid #dee2e6;border-bottom:1px solid #dee2e6;padding:1em;">              
            <div class="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">                 
                <!-- tab 1 content -->             
            </div>              
            <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">                 
                <!-- tab 1 content -->             
                </div>              
            <div class="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">                 
                <!-- tab 1 content -->             
            </div>          
        </div>       
    </div>     
    <div class="col-md-5">           
        <p id="right-side-question">Drag one (1) condition and two (2) client findings to fill in each blank of the following sentence</p>          
        <p id="question-instruction" class="mb-4 font-weight-bold"></p>                   
        <!-- left side col content/layout -->           
        <div class="row">             
            <div class="col-md-4">                 
                <!-- <h2>Drop Zone</h2> -->                 
                <ul id="drop-zone1" class="list-group mb-4 h-5 p-2" style="min-height:60px;background:#E8F1F7;border:1px solid #E8F1F7;">                     
                    <p class="text-center mt-2" style="color:#999;"><i>Drag your answer here</i></p>                 
                </ul>                   
                <!-- <h2>Draggable Items</h2> -->                  
                <ul id="draggable-items1" class="list-group">                     
                    <li class="list-group-item" data-id="1">
                        <i class="fas fa-bars"></i> Item 1</li>                     
                    <li class="list-group-item" data-id="2">
                        <i class="fas fa-bars"></i> Item 2</li>                     
                    <li class="list-group-item" data-id="3">
                    <i class="fas fa-bars"></i> Item 3</li>                 
                </ul>             
            </div>             
            <div class="col-md-4">                 
                <!-- <h2>Drop Zone</h2> -->                 
                    <ul id="drop-zone2" class="list-group mb-4 h-5 p-2" style="min-height:60px;background:#E8F1F7;border:1px solid #E8F1F7;">                     
                    <p class="text-center mt-2" style="color:#999;"><i>Drag your answer here</i></p>                 
                </ul>                   
                <!-- <h2>Draggable Items</h2> -->                  
                    <ul id="draggable-items2" class="list-group">                     
                    <li class="list-group-item" data-id="1"><i class="fas fa-bars"></i> Item 1</li>                     
                    <li class="list-group-item" data-id="2"><i class="fas fa-bars"></i> Item 2</li>                     
                    <li class="list-group-item" data-id="3"><i class="fas fa-bars"></i> Item 3</li>                 
                </ul>             
            </div>             
            <div class="col-md-4">                 
                <!-- <h2>Drop Zone</h2> -->                 
                    <ul id="drop-zone3" class="list-group mb-4 h-5 p-2" style="min-height:60px;background:#E8F1F7;border:1px solid #E8F1F7;">                     
                    <p class="text-center mt-2" style="color:#999;"><i>Drag your answer here</i></p>                 
                </ul>                   <!-- <h2>Draggable Items</h2> -->                  
                <ul id="draggable-items3" class="list-group">                     
                    <li class="list-group-item" data-id="1"><i class="fas fa-bars"></i> Item 1</li>                     
                    <li class="list-group-item" data-id="2"><i class="fas fa-bars"></i> Item 2</li>                     
                    <li class="list-group-item" data-id="3"><i class="fas fa-bars"></i> Item 3</li>                 
                </ul>             
            </div>         
        </div>      
    </div> 
</div>`;

        $questionDiv.html(questionHtml);
}