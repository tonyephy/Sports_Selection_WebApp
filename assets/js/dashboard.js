// Load user data from localStorage
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Display username, sport, interests, and coach comments
if (currentUser) {
    document.getElementById('welcomeMessage').innerText = `Welcome, ${currentUser.username}`;
    document.getElementById('currentSport').innerText = currentUser.selectedSport || 'No sport selected';

    const interestsList = document.getElementById('interestsList');
    interestsList.innerHTML = '';  // Clear previous interests
    if (currentUser.interests && currentUser.interests.length > 0) {
        currentUser.interests.forEach(interest => {
            const li = document.createElement('li');
            li.innerText = interest;
            interestsList.appendChild(li);
        });
    } else {
        interestsList.innerHTML = '<li>No interests selected</li>';
    }

    document.getElementById('coachRating').innerText = currentUser.coachRating || 'N/A';
    document.getElementById('coachComments').innerText = currentUser.coachComment || 'No comments yet.';
}

// Change Interests button
document.getElementById('changeInterestsBtn').addEventListener('click', function() {
    window.location.href = 'interests-selection.html';
});

// Change Sport button
document.getElementById('changeSportBtn').addEventListener('click', function() {
    window.location.href = 'sport-selection.html';
});

// Account Details button
document.getElementById('accountDetailsBtn').addEventListener('click', function() {
    alert(`
    Username: ${currentUser.username}
    Phone: ${currentUser.phone || 'Not provided'}
    Age: ${currentUser.age || 'Not provided'}
    Gender: ${currentUser.gender || 'Not provided'}
    Disabilities: ${currentUser.disabilities || 'None'}
    Selected Interests: ${currentUser.interests.length > 0 ? currentUser.interests.join(', ') : 'No interests selected'}
    Selected Sport: ${currentUser.selectedSport || 'No sport selected'}
    `);
});

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
});

// Display existing profile picture if available
const profilePic = document.getElementById('profilePic');
if (currentUser.profilePic) {
    profilePic.src = currentUser.profilePic;
}

// Show file input when 'Edit Profile Picture' button is clicked
document.getElementById('editProfilePicBtn').addEventListener('click', function() {
    document.getElementById('profilePicInput').click();
});

// Handle profile picture upload
document.getElementById('profilePicInput').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = function() {
            const imgDataUrl = reader.result;

            // Set the profile picture in the UI
            profilePic.src = imgDataUrl;

            // Save the image to the current user's data in localStorage
            currentUser.profilePic = imgDataUrl;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        };
        reader.readAsDataURL(file); // Convert the file to a base64 URL
    }
});
