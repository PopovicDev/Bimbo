document.getElementById("emailForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    const formData = {
        name: name,
        email: email,
        phone: phone,
        message: message
    };

    fetch('/api/send-email', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        // Handle response from server (success or error)
        console.log(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });

    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("phone").value = '';
    document.getElementById("message").value = '';

    document.getElementById("form-button").innerText = 'E-MAIL SENT!';
    setTimeout(()=>{
        document.getElementById("form-button").innerText = 'SEND';
    },1500)
});