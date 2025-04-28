document.querySelector("#btnRegister").addEventListener("click", register);

async function register() {
    const name = document.querySelector("#inputName").value;
    const email = document.querySelector("#inputEmail").value;    
    const password = document.querySelector("#inputPassword").value;
    const birth = document.querySelector("#inputBirth").value;
    if (email == "" || password == "" || name == "" || birth == "") {
        alert("Preencha todos os campos");
        return;
    }

    const dataRegister = {
        name,
        email,
        password,
        birth
    }

    const reply = await fetch("http://localhost:8080/user/register",{
        method: "POST",
        headers:{"content-type": "application/json"},
        body: JSON.stringify(dataRegister)
    });

    
    if( reply.status!=201){
        alert("Email ou senha invalidos");
        return
    }
    alert("Usuário cadastrado com sucesso");
    window.location.href = "login.html";
}

