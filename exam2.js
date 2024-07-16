// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBj3EmeODzfrJYOV7XMepP3v1ZWgc767i8",
    authDomain: "openai-75c43.firebaseapp.com",
    projectId: "openai-75c43",
    storageBucket: "openai-75c43.appspot.com",
    messagingSenderId: "972256077227",
    appId: "1:972256077227:web:2735c614bc712d5f529eee",
    measurementId: "G-BCF1BM6S5P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();
var qanswer = '';
var sanswer = '';

function loadQuestions(collection) {

    // Generate a random document ID
    const randomDocId = db.collection(collection).doc().id; // Order by document ID (AutoID)
    const question_template = $('#question_template').val();

    $('#answerbtn').hide();

    return db.collection(collection, question_template)
             .where('template_type', '==', question_template) // Filter by question_template field
             .orderBy(firebase.firestore.FieldPath.documentId()) // Order by document ID (AutoID)
             .startAt(randomDocId) // Start at the random document ID
             .limit(5) // Limit to 15 documents
             .get()
             .then((querySnapshot) => {
                 let docs = [];
                 querySnapshot.forEach((doc) => {
                     docs.push({ id: doc.id, data: doc.data() });
                 });
                //  console.log(querySnapshot.size);
                 return docs;
             })
             .catch((error) => {
                 console.log("Error getting documents: ", error);
                 return [];
             });
}

function loadQuestionTemplate(collection, questiontemplate) {
    return db.collection(collection)
             .where('type', '==', questiontemplate) // Filter by question_template field
             .get()
             .then((querySnapshot) => {
                 let template = [];
                 querySnapshot.forEach((doc) => {
                    template.push({ id: doc.id, data: doc.data() });
                 });
                 return template;
             })
             .catch((error) => {
                 console.log("Error getting documents: ", error);
                 return [];
             });
}

function initQuestions(){
    loadQuestions('questions_db').then((response) => {

        // const questions = doc.data;
        const questions = response[0].data;
        console.log(questions['template_type']);
        // console.log(questions);

        // Call the function and load question template
        loadQuestionTemplate('question_templates', questions['template_type'])
        .then((template) => {
        
            // console.log(response[0].data['Question Template']);
            // response.forEach((doc) => {

                console.log(template[0].data.template);
                console.log(questions['answers']);
                $('#question-template-box').html(template[0].data.template);
                $('#answerbtn').show();
                qanswer = questions['answers'];

                if( questions['template_type'] == 'fill_in_the_blank' ){

                    $('#left-side-question').html(questions['leftside_question_prompt']);
                    // $('#question-instruction').html(questions['explanation']);

                }
                else if( questions['template_type'] == 'multi_response_select_n' ){

                    $('#left-side-question').html(questions['leftside_question_prompt']);
                    
                    
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


                    $('#right-side-question').html(questions['rightside_question']);

                    // String to be exploded
                    var options = questions['checkbox_options'];

                    // Explode the string
                    var optionsArray = options.split('|');
                    
                    // Target the container
                    var $container = $('#check-box-multiple-choice');
                    
                    $container.html('');
                    // Iterate over the array and create checkboxes
                    $.each(optionsArray, function(index, value) {
                        var checkboxHtml = '<div class="form-group form-check"><input type="checkbox" value="' + value + '" class="form-check-input" id="option' + (index + 1) + '"><label class="form-check-label" for="option' + (index + 1) + '">' + value + '</label></div>';
                        $container.append(checkboxHtml);
                    });

                }
                else if( questions['template_type'] == 'multi_response_select_all' ){

                    $('#left-side-question').html(questions['leftside_question_prompt']);
                    
                    
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


                    $('#right-side-question').html(questions['rightside_question']);

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



                // else if( questions['template_type'] == 'multiple_choice_multiple_response' ){

                //    // console.log("Retrieved documents:", template[0].data.template);
    
                //    $('#question-template-box').html(template[0].data.template);
                //    $('#left-side-question').html(questions['Left-side Question Prompt']);
                //    $('#tab1-tab').html('Nurse\' Notes' );
                //    $('#tab2-tab').html('Vital Signs');
                //    $('#tab3-tab').hide();
                //    $('#tab1').html(questions['Nurse\'s Note']);
                //    $('#tab2').html(questions['Vital Signs']);
                //    $('#tab3').hide();

                //    $('#question-instruction').html(questions['Question Instruction']);
                   

                //    var multiple_choice_array = questions['Answer Choices'].split('\n').map(function(item) {
                //        return item.trim();
                //    });

                //    // Container for the checkboxes
                //    var multiple_checkbox = $('<div id="check-box-multiple-choice"></div>');

                //    // Loop through the array and generate the HTML structure for each checkbox
                //    multiple_choice_array.forEach(function(item, index) {
                //        var formGroup = $('<div class="form-group form-check"></div>');
                //        var checkBox = $('<input type="checkbox" class="form-check-input" id="check' + (index + 1) + '">');
                //        var label = $('<label class="form-check-label" for="check' + (index + 1) + '">' + item + '</label>');
                       
                //        formGroup.append(checkBox);
                //        formGroup.append(label);
                //        multiple_checkbox.append(formGroup);
                //    });
                //    // console.log(multiple_choice_array);
                //    $('#check-box-multiple-choice').html(multiple_checkbox);

                // }
                // else if( questions['template_type'] == 'close_drop_down_2' ){

                //     $('#question-template-box').html(template[0].data.template);
                //     $('#left-side-question').html(questions['Left-side Question prompt']);
                //     $('#tab1-tab').html('Nurse\' Notes' );
                //     $('#tab2-tab').html('Vital Signs');
                //     $('#tab3-tab').html('Orders');
                //     $('#tab1').html(questions['Nurses\' Note']);
                //     $('#tab2').html(questions['Vital Signs']);
                //     $('#tab3').html(questions['Orders']);

                //     $('#right-side-question').html(questions['Right-side Question Prompt']);
                //     $('#question-instruction').html(questions['Question instruction']);


                //     //------------------ row1 ------------------
                //     var array = questions['Medication'].split('\n').map(function(item) {
                //         return item.trim();
                //     });

                //     // Container for the checkboxes
                //     var container = $('<tr></tr>');

                //     // Loop through the array and generate the HTML structure for each checkbox
                //     array.forEach(function(item, index) {
                //         var th = $('<th scope="col">' + item + '</th>');
                //         container.append(th);
                //     });
                //     // console.log(multiple_choice_array);
                //     //  $('#row1').html(container);
                //     //------------------ end row1 ------------------

                // }
                
            // });
        })
        .catch((error) => {
            console.error("Error fetching documents:", error);
        });

    });

}


// Call the function on document ready
$(document).ready(function() {

    initQuestions();

    $('#nextButton').click(function(){
        $('#question-template-box').html('<div class="d-flex align-items-center justify-content-center" style="height:400px ;"><img src="assets/img/loader.gif" alt=""></div>');
        initQuestions();
    });

    $(document).on("click", "#submitAnswer", function () {

        
        sanswer = $('#anwer-val').val();
        if( qanswer == sanswer ){
            alert('answer is correct!');
        }

    });

    
});

