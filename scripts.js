// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded and ready.');

    // Function to handle dynamic form fields based on user role
    document.getElementById('role').addEventListener('change', function() {
        const role = this.value;
        const additionalFields = document.getElementById('additional-fields');
        
        additionalFields.innerHTML = ''; // Clear existing fields
        
        if (role === 'parent') {
            additionalFields.innerHTML = `
                <label for="student_id">Student ID:</label>
                <input type="text" id="student_id" name="student_id" required>
            `;
        } else if (role === 'staff') {
            additionalFields.innerHTML = `
                <label for="role_name">Role Name:</label>
                <input type="text" id="role_name" name="role_name" required>
            `;
        }
    });

    // Handle form submission via AJAX
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission

            const formData = new FormData(form);

            fetch('register.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                // Display the response from the PHP script
                const registrationFeedback = document.querySelector('#registration');
                if (registrationFeedback) {
                    registrationFeedback.innerHTML = '<p>' + data + '</p>';
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }
});
