document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");

    if (!registerForm) {
        console.error("Registration form not found");
        return;
    }

    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("Form submitted");

        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");
        const nameInput = document.getElementById("name");
        const sexInput = document.getElementById("sex");
        const ageInput = document.getElementById("age");

        const username = usernameInput.value;
        const password = passwordInput.value;
        const name = nameInput.value;
        const sex = sexInput.value;
        const age = ageInput.value;

        const requestBody = new URLSearchParams({ username, password, name, sex, age });

        console.log("Request body:", requestBody);

        fetch('/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: requestBody
        })
        .then(response => {
            console.log("Server response:", response);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            if (response.redirected) {
                console.log("Redirecting manually to:", response.url);
                window.location.replace(response.url);
                return null;
            }

            return response.json();
        })
        .then(data => {
            if (data) {
                console.log("Server data:", data);
                if (data.redirect) {
                    console.log("Redirecting to:", data.redirect);
                    window.location.replace(data.redirect);
                } else {
                    console.error("Redirect not provided in the response");
                }
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    });
});
