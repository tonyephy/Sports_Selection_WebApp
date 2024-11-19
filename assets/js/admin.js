// Load student list when admin clicks 'View Registered Students'
document.getElementById('showStudentsBtn').addEventListener('click', function() {
    const studentDetailsSection = document.getElementById('studentDetailsSection');
    const studentDetailsTable = document.getElementById('studentDetailsTable').querySelector('tbody');
    studentDetailsTable.innerHTML = ''; // Clear previous entries

    // Loop through localStorage to find all students
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('user_')) {
            const user = JSON.parse(localStorage.getItem(key));

            if (user.role === 'student') {
                // Create a new row for each student
                const row = document.createElement('tr');

                const usernameCell = document.createElement('td');
                usernameCell.textContent = user.username;
                row.appendChild(usernameCell);

                const phoneCell = document.createElement('td');
                phoneCell.textContent = user.phone || 'N/A';
                row.appendChild(phoneCell);

                const ageCell = document.createElement('td');
                ageCell.textContent = user.age || 'N/A';
                row.appendChild(ageCell);

                const genderCell = document.createElement('td');
                genderCell.textContent = user.gender || 'N/A';
                row.appendChild(genderCell);

                const disabilitiesCell = document.createElement('td');
                disabilitiesCell.textContent = user.disabilities || 'None';
                row.appendChild(disabilitiesCell);

                const interestsCell = document.createElement('td');
                interestsCell.textContent = user.interests.join(', ') || 'None';
                row.appendChild(interestsCell);

                const sportCell = document.createElement('td');
                sportCell.textContent = user.selectedSport || 'None';
                row.appendChild(sportCell);

                const achievementsCell = document.createElement('td');
                achievementsCell.textContent = user.achievements || 'None';
                row.appendChild(achievementsCell);

                const docsCell = document.createElement('td');
                const docsLink = user.docs ? `<a href="${user.docs}" target="_blank">View</a>` : 'None';
                docsCell.innerHTML = docsLink;
                row.appendChild(docsCell);

                studentDetailsTable.appendChild(row);
            }
        }
    }

    // Show the student details section
    studentDetailsSection.style.display = 'block';
});

// Existing form submission logic for rating and comments
document.getElementById('ratingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedStudent = document.getElementById('student').value;
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;

    // Retrieve student data from localStorage
    const studentKey = 'user_' + selectedStudent;
    let student = JSON.parse(localStorage.getItem(studentKey));

    // Update the student's rating and comment
    student.coachRating = rating;
    student.coachComment = comment;

    // Save the updated student data back to localStorage
    localStorage.setItem(studentKey, JSON.stringify(student));

    // Provide feedback to the admin
    document.getElementById('feedbackMessage').textContent = `Rating and comment for ${selectedStudent} saved successfully!`;
});

// Load student list for the rating form
window.onload = function() {
    const studentSelect = document.getElementById('student');
    studentSelect.innerHTML = ''; // Clear existing options

    // Iterate over all users in localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('user_')) {
            const user = JSON.parse(localStorage.getItem(key));
            if (user.role === 'student') {
                const option = document.createElement('option');
                option.value = user.username;
                option.textContent = user.username;
                studentSelect.appendChild(option);
            }
        }
    }
};
// Fetch and display the list of registered students
document.getElementById('showStudentsBtn').addEventListener('click', function() {
    // Simulate fetching students' data from the server
    const students = [
        { username: 'JohnDoe', phone: '123456', age: 20, gender: 'Male', disabilities: 'None', interests: 'Football, Basketball', sport: 'Football' },
        { username: 'JaneSmith', phone: '654321', age: 22, gender: 'Female', disabilities: 'None', interests: 'Swimming, Running', sport: 'Swimming' }
    ];

    const tableBody = document.getElementById('studentDetailsTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear previous rows

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.username}</td>
            <td>${student.phone}</td>
            <td>${student.age}</td>
            <td>${student.gender}</td>
            <td>${student.disabilities}</td>
            <td>${student.interests}</td>
            <td>${student.sport}</td>
            <td>None</td>
            <td>None</td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById('studentDetailsSection').style.display = 'block';
});

// Handle sport requests (fun or team)
document.addEventListener('DOMContentLoaded', function() {
    const studentRequests = [
        { username: 'JohnDoe', sport: 'Football', choice: 'Join Team', reason: 'I want to play for the school.' },
        { username: 'JaneSmith', sport: 'Swimming', choice: 'Just for Fun', reason: 'I enjoy swimming casually.' }
    ];

    const tableBody = document.getElementById('studentRequestsTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear previous rows

    studentRequests.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${request.username}</td>
            <td>${request.sport}</td>
            <td>${request.reason}</td>
            <td>${request.choice}</td>
            <td class="decision-buttons">
                <button class="accept-btn" data-username="${request.username}">Accept</button>
                <button class="deny-btn" data-username="${request.username}">Deny</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById('studentRequestsSection').style.display = 'block';

    // Handle accept/deny buttons
    document.querySelectorAll('.accept-btn').forEach(button => {
        button.addEventListener('click', function() {
            const username = this.getAttribute('data-username');
            alert(`Accepted ${username}'s request to join the team.`);
            // Handle backend logic to update the student's status as accepted
        });
    });

    document.querySelectorAll('.deny-btn').forEach(button => {
        button.addEventListener('click', function() {
            const username = this.getAttribute('data-username');
            alert(`Denied ${username}'s request to join the team.`);
            // Handle backend logic to update the student's status as denied
        });
    });
});
