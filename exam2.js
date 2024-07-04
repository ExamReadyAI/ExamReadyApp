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

function loadQuestions(collection) {

    // Generate a random document ID
    const randomDocId = db.collection(collection).doc().id; // Order by document ID (AutoID)

    return db.collection(collection)
             .orderBy(firebase.firestore.FieldPath.documentId()) // Order by document ID (AutoID)
             .startAt(randomDocId) // Start at the random document ID
             .limit(15) // Limit to 15 documents
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


// Call the function on document ready
$(document).ready(function() {

    loadQuestions('close_drop_down_2').then((response) => {

        response.forEach((doc) => {

            const questions = doc.data;
            console.log(questions);
            // $('#data').append('<p>' + doc.id + ' => ' + questions['Question instruction'] + '</p>');
            // alert(questions['QuestionID']);
            
        });

    });

});

