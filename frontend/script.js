async function handleSignup() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    try {
        const response = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        message.innerText = data.message;
        
        if(response.status === 201) {
            message.style.color = "green";
        } else {
            message.style.color = "red";
        }
    } catch (error) {
        message.innerText = "Error: Server se connect nahi ho saka!";
    }
}



// --- LOGIN FUNCTION (Ye naya add karein) ---
async function handleLogin() {
    // Note: IDs check karlein ke login.html mein yahi hain
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const message = document.getElementById('loginMessage');

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if(response.ok) {
            // Agar login sahi ho jaye toh Dashboard par bhej do
            window.location.href = 'dashboard.html';
        } else {
            // Agar ghalat ho toh error dikhao
            message.innerText = data.message;
            message.style.color = "red";
        }
    } catch (error) {
        message.innerText = "Error: Server connection failed!";
    }
}


