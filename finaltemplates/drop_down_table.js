function load_drop_down_table(randomQuestions,index){
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
       <p style="font-weight: bold;"><img src="assets/img/icons/solid/Vector.png"><span class="rightquestion" id="right-side-question"> The nurse contacts the physician regarding the client's assessment in the ICU  Select the anticipated physician orders from each of the following categories. Each category must have one (1) response option selected.</span></p>                  
      <p id="question-instruction" class="mb-4 font-weight-bold"></p>                   
      <table class="table table-bordered table-no-vertical-lines">                          
          <thead id="row1">                                
              <tr>                                      
                  <th scope="col">Physician order</th>                                      
                  <th scope="col">Potential intervention</th>                                            
              </tr>                          
              </thead>                          
              <tbody>                             
                  <tr>                                      
                      <td>lumbar puncture</td>                                          
                      <td>
                          <select class="form-control" id="exampleFormControlSelect1">                                                  
                              <option>1</option>                                                  
                              <option>2</option>                                                  
                              <option>3</option>                                                  
                              <option>4</option>                                                  
                              <option>5</option>                                            
                          </select>                     
                      </td>                                     
                  </tr>                                
                  <tr>                                      
                      <td>ketorolac</td>                                      
                      <td>
                          <select class="form-control" id="exampleFormControlSelect1">                                                  
                              <option>1</option>                                                  
                              <option>2</option>                                                  
                              <option>3</option>                                                  
                              <option>4</option>                                                  
                              <option>5</option>                                            
                          </select>                     
                      </td>                                                           
                  </tr>                                
                  <tr>                                      
                      <td>ceftriaxone</td>                                     
                      <td><select class="form-control" id="exampleFormControlSelect1">                                              
                          <option>1</option>                                              
                          <option>2</option>                                              
                          <option>3</option>                                              
                          <option>4</option>                                              
                          <option>5</option>                                        
                      </select>                 
                  </td>                                                 
              </tr>                      
          </tbody>                    
      </table>    
      </div>               
  </div>  
  </div>
</div>`;

        $questionDiv.html(questionHtml);
}