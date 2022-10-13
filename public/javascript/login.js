async function loginFormHandler(event) {
    event.preventDefault();

    //update if different ids used in handlebars
    const email = document.querySelector('#inputEmail').value.trim();
    const password = document.querySelector('#inputPassword').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard/');
        } else {
            alert(response.statusText);
        }
    }
}


//update if different classes used in handlebars
document.querySelector('#sign-in').addEventListener('click', loginFormHandler);
