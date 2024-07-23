function load_drop_down_table(randomQuestions,index){
    const $questionDiv = $('#question');
    const questionHtml = ` <div class="row">          
  <div class="col-md-5 offset-md-1">                           
      <p class="mb-4 font-weight-bold" id="left-side-question"></p>                   
      <ul class="nav nav-tabs" id="myTab" role="tablist" >                          
          <li class="nav-item" role="presentation">                                  
              <a class="nav-link active" id="tab1-tab" data-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true">Tab1</a>                          
          </li>                          
          <li class="nav-item" role="presentation">                                  
              <a class="nav-link" id="tab2-tab" data-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false">Tab2</a>                          
          </li>                          
          <li class="nav-item" role="presentation">                                
              <a class="nav-link" id="tab3-tab" data-toggle="tab" href="#tab3" role="tab" aria-controls="tab3" aria-selected="false">Tab3</a>                        
          </li>                  
      </ul>                  
      <div class="tab-content" id="myTabContent" style="border-left:1px solid #dee2e6;border-right:1px solid #dee2e6;border-bottom:1px solid #dee2e6;padding:1em;">                          
          <div class="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab"></div>                          
          <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab"></div>                          <div class="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab"></div>                  
      </div>          
  </div>          
  <div class="col-md-5">                   
      <p id="right-side-question"></p>                  
      <p id="question-instruction" class="mb-4 font-weight-bold"></p>                   
      <table class="table table-bordered table-striped">                          
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
</div>`;

        $questionDiv.html(questionHtml);
}