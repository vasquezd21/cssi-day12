let googleUser;

window.onlaod = (event) => {
    // Use thi to retain user state between html pages.
    firebase.auth().oAuthStateChanged((user) => {
        if(user) {
            googleUser = user;
            getNotes(googleUser.uid);
        } else {
            window.loction = 'index.html'; // If not logged in, navigate back to login page
        }
    });
};

const getNotes = (userId) => {
    console.log("logged in as user" + userId);
    // get access to all the current user's notes
    const dbRef = firebase.database().ref(`users/${userId}`);
    dbRef.on('value', (snapshot) => {
        console.log(snapshot.val());
    })
        //2. Display them on the page
}

const renderData = (data) => {
    console.log(data);
    for(let key in data) {
        const note = data[key];
        const destination = document.querySelector("#app")

        destination.innerHTML = note.text;
    }
};

const createCard = (note) => {
    return ` <div class="column is-one-quarter>
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                         ${note.title} 
                         </p>                    
                    </header> 
                    <div class="card-content">
                        <div class="content">
                            ${note.text}
                        </div>
                    </div>
                </div>
            <div> `;
}