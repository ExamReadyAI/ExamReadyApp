function load_drag_and_drop(randomQuestions,index){
    const $questionDiv = $('#question');
    const questionHtml = ` <div class="row align-items-start">
        <div class="col-md-6" id="exampause1">
            <p style="font-weight: bold;" id="text_instruction">The nurse in the obstetrics clinic performs an assessment on a client four weeks postpartum</p>
            <p id="data_instruction"></p>
            <p class="itemsof">item 1 of 1</p>
            <ul class="nav nav-tabs mt-4" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="hpi-tab" data-toggle="tab" href="#notes" role="tab" aria-controls="hpi" aria-selected="true">Nurse's Note</a>
                </li>
            </ul>
            <div class="tab-content mt-3" id="myTabContent">
                <div class="tab-pane fade show active" id="notes" role="tabpanel" aria-labelledby="hpi-tab">
                    <p id="data_nursesnote">1100: The client gave birth four weeks ago via cesarean section. The infant was term and had no complications. The client denies any pain and reports no fever, vaginal discharge, nausea, or vomiting. The incision was approximated with no erythema. The client was avoidant when discussing the infant, and when asked directly, the client became tearful, saying, "It has been rough, and I am not sure I can take it." The symptoms started eight days postpartum and have been persistent. The client reports sleeping more, eating less, and not feeling 'attached' to the infant, which has caused her subsequent feelings of guilt. The client denies any hallucinations, suicidal ideations, or wanting to harm any individual. She denies any thoughts of wanting to harm the infant but worries that she is inadequate. The client's partner says she has been periodically despondent and has occasional bouts of anxiety that tend to occur right before she breastfeeds. After noticing his wife's behavior, the client's partner has stayed home from work to look after the infant. Both report that she has been breastfeeding the infant regularly, without delay, which makes the client feel guilty that she does not have more of a bond with the infant. T 98° F (36.7° C) P 88 RR 16 BP 119/89. Pulse oximetry reading 98% on room air. The infant was present during the assessment and had a normal appearance, well nourished—full range of motion in all extremities with occasional crying but stopped once held.</p>
                </div>
            </div>
        </div>
        <div class="col-md-6 vertical-line" id="exampause2">
            <div class="right-column">
                <p><i class="fa fa-chevron-right"></i> Complete the diagram by dragging from the choices below to specify what condition the client is most likely experiencing, two (2) actions the nurse should take to address that condition, and two (2) parameters the nurse should monitor to assess the client's progress</p>
              
                 <div class="boxes">
                  <div class="box">Actions to Take</div>
                  <div class="box">Parameters to Monitor</div>
                  <div class="box" id="box3">Potential Conditions</div>
                  <div class="box">Actions to Take</div>
                  <div class="box">Parameters to Monitor</div>
                </div>
                  <div class="rows">
                    <div class="col-md-4 cards">
                      <div class="card droppable-card">
                        <div class="card-header text-center font-weight-bold databox">
                          Actions to Take
                        </div>
                        <div class="card-body">
                          <div class="box_data" data-original-parent="card1" draggable="true">prepare for the client to be admitted inpatient involuntarily</div>
                          <div class="box_data" data-original-parent="card1" draggable="true">recommend that the client switch to formula feeding instead of breastfeeding</div>
                          <div class="box_data" data-original-parent="card1" draggable="true">obtain an order for psychotherapy</div>
                          <div class="box_data" data-original-parent="card1" draggable="true">identify additional support systems</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4 cards">
                      <div class="card droppable-card">
                        <div class="card-header text-center font-weight-bold centerbox">
                          Potential Conditions
                        </div>
                        <div class="card-body">
                          <div class="box_data" data-original-parent="card2" draggable="true">postpartum psychosis</div>
                          <div class="box_data" data-original-parent="card2" draggable="true">postpartum depression</div>
                          <div class="box_data" data-original-parent="card2" draggable="true">postpartum blues|bipolar II disorder</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4 cards">
                      <div class="card droppable-card">
                        <div class="card-header text-center font-weight-bold databox">
                          Parameters to Monitor
                        </div>
                        <div class="card-body">
                          <div class="box_data" data-original-parent="card3" draggable="true">suicidal or homicidal ideations</div>
                          <div class="box_data" data-original-parent="card3" draggable="true">bonding with infant|the client's relationship status with their partner</div>
                          <div class="box_data" data-original-parent="card3" draggable="true">mental status during involuntarily admission</div>
                        </div>
                      </div>
                    </div>
                  </div>
                
            </div>
        </div>
    </div>`;

        $questionDiv.html(questionHtml);
        const questionNumber = index + 1;
        const displayText = "The following scenario applies to the next 1 items";
        
        $('#text_instruction').text(displayText);

        $(document).ready(function() {
            $(function() {
              $(".box_data").draggable({
                revert: "invalid", // Revert if not dropped in a valid area
                containment: "document", // Contain within the document
                scroll: false,
                start: function(event, ui) {
                  // Store the original parent element
                  ui.helper.data('originalParent', ui.helper.parent());
                }
              });
        
              $(".box").droppable({
                accept: ".box_data",
                drop: function(event, ui) {
                  if ($(this).children(".box_data").length === 0) { // Ensure only one item can be dropped
                    $(this).append(ui.helper);
                    ui.helper.css({
                      top: "0px",
                      left: "0px"
                    });
                  } else {
                    // Optional: Show some feedback that only one item is allowed
                    alert('This box can only accept one item.');
                    ui.helper.draggable('option', 'revert', true);
                  }
                }
              });
        
              $(".droppable-card").droppable({
                accept: ".box_data",
                drop: function(event, ui) {
                  var originalParent = ui.helper.data('originalParent');
                  $(this).find('.card-body').append(ui.helper);
                  ui.helper.css({
                    top: "0px",
                    left: "0px"
                  });
                }
              });
            });
        
          });
}