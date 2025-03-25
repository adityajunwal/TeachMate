function handleLogin() {
    event.preventDefault();

    const user = {
        tid: "CSEfac101",
        pass: "101"
    };

    const tid = document.getElementById("teacher-id").value;
    const pass = document.getElementById("teacher-password").value;

    console.log(tid);
    console.log(pass);

    if (tid === user.tid && pass === user.pass) {
        document.getElementById("output").innerText =
            "Success!";
        window.location.href = "Dashboard/DashBoard.html";
    } else {
        console.log("Invalid!");

        document.getElementById("output").innerText =
            "The Teacher ID and password are literally written above DAWG! What are you doing?! 🤦‍♂️";
    }
}
