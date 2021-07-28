let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const handleNoteSubmit = () => {
  // 1. Capture the form data
  const noteTitle = document.querySelector('#noteTitle');
  const noteText = document.querySelector('#noteText');
  // 2. Format the data and write it to our database
  const note = {
    title: noteTitle.value,
    text: noteText.value
  }


  // 4. Write it to our database
  const dbRef = firebase.database().ref(`users/${googleUser.uid}`)
  dbRef.push(note).then( () => {
       // 3. Clear the form so that we can write a new note
        titleElement.value = "";
        titleNote.value = "";
  })

}


