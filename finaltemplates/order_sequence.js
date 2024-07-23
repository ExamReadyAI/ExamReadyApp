function load_order_sequence(){
    const $questionDiv = $('#question');
    const questionHtml = ` <div class="row">      
  <div class="col-md-6 offset-md-3">          
      <script src="https://cdn.jsdelivr.net/npm/sortablejs@1.14.0/Sortable.min.js"></script>          
      <p id="right-side-question"></p>           
      <div class="row">             
          <div class="col-md-12">                 
              <!-- <h2>Drop Zone</h2> -->                 
              <ul id="drop-zone" class="list-group mb-4 h-5 p-2" style="min-height:60px;background:#E8F1F7;border:1px solid #E8F1F7;">                     
              <p class="text-center mt-2" style="color:#999;"><i>Drag your answer here</i></p>                 </ul>             
          </div>             
          <div class="col-md-12">                 
              <!-- <h2>Draggable Items</h2> -->                 
                  <div id="drag-box">                     
                  <ul id="draggable-items" class="list-group">                         
                      <li class="list-group-item" data-id="1">
                          <i class="fas fa-bars"></i> Apply a tourniquet and palpate a vein for insertion
                      </li>                         
                      <li class="list-group-item" data-id="2">
                          <i class="fas fa-bars"></i> Clean the skin with approved solution|Tape and secure the IV site
                      </li>                         
                      <li class="list-group-item" data-id="3">
                          <i class="fas fa-bars"></i> Stabilize the vein below the insertion site (digital traction)
                      </li>                         
                      <li class="list-group-item" data-id="4">
                          <i class="fas fa-bars"></i> Puncture the skin and vein with the stylet
                      </li>                         
                      <li class="list-group-item" data-id="5">
                          <i class="fas fa-bars"></i> Apply pressure above the insertion site and
                      </li>                         
                      <li class="list-group-item" data-id="6">
                          <i class="fas fa-bars"></i> connect the IV tubing
                      </li>                         
                      <li class="list-group-item" data-id="7">
                          <i class="fas fa-bars"></i> Observe for blood return and advance the catheter
                      </li>                     
                  </ul>                 
              </div>             
          </div>         
      </div>               
  </div> 
</div>`;

        $questionDiv.html(questionHtml);
}