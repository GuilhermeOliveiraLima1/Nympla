document.querySelector("#search").addEventListener("click", getEvents);

async function onLoadPage(){
    const reply = await fetch("http://localhost:8080/auth/admin",{
        method: "POST",
        headers:{Authorization: "Bearer " + window.localStorage.getItem("token")},
    });

    const token = window.localStorage.getItem("token");
    if (!token || reply.status != 200) {
        alert("Sua sessão expirou!");
        window.location.href = "login.html";
        return;
    }
    const tokenPayload = token.split('.')[1];
    const payload = JSON.parse(atob(tokenPayload));
    
    const userName = payload.userName;
    document.querySelector("h2").innerHTML ="Bem Vindo(a) " + userName;
    getEvents();
}

async function getEvents() {
    const name = document.querySelector("#searchInput").value;
    const gridElement = document.querySelector("#gridContainer");
    
    const token = window.localStorage.getItem("token");
    if (!token) {
        alert("Sua sessão expirou!");
        window.location.href = "login.html";
        return;
    }
    
    try {
        let data;
        if (name === "") {
            data = await fetch("http://localhost:8080/event/all");
        } else {
            data = await fetch(`http://localhost:8080/event/${encodeURIComponent(name)}`);
        }
        
        const result = await data.json();
        const events = result.events;

        gridElement.innerHTML = "";

        if (!events || events.length === 0) {
            gridElement.innerHTML = '<div class="col-12"><p class="text-center py-4">Sem eventos disponíveis</p></div>';
            return;
        }

        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            
            const startDate = new Date(event.date_start);
            const endDate = new Date(event.date_end);
            
            const options = { 
                weekday: 'long', 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            
            const formattedStart = startDate.toLocaleDateString('pt-BR', options);
            const formattedEnd = endDate.toLocaleDateString('pt-BR', options);
            
            const card = document.createElement("div");
            card.className = "col";
            card.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${event.image_url}" class="card-img-top" alt="${event.title}" 
                        style="height: 140px; object-fit: cover;"
                        onerror="this.src='https://via.placeholder.com/400x200?text=Evento'">
                    <div class="card-body">
                        <h5 class="card-title">${event.title}</h5>
                        <p class="card-text text-muted small">
                            <strong>Início:</strong> ${formattedStart}<br>
                            <strong>Término:</strong> ${formattedEnd}<br>
                        </p>
                        <p class="card-text text-muted small">${event.description}</p>
                    </div>
                    <div class="card-footer  bg-dark">
                        <button class="btn btn-primary w-100 " value="${event.id}" onclick="getRegistered(this.value)">Inscritos</button>
                        <button class="btn btn-danger w-100 mt-2" value="${event.id}" onclick="deleteEvent(this.value)">Excluir</button>
                    </div>
                </div>
            `;
            gridElement.appendChild(card);
        }
    } catch (error) {
        console.error("Erro:", error);
        gridElement.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger">
                    <p class="mb-0">Erro ao carregar eventos</p>
                    <small class="mb-0">${error.message}</small>
                </div>
            </div>
        `;
    }
}

async function getRegistered(id) {
    
    const response = await fetch(`http://localhost:8080/admin/subscriptions/${id}`,{
        method: "GET",
        headers:{Authorization: "Bearer " + window.localStorage.getItem("token")},
    });
    
    const data = await response.json();    
    const gridElement = document.querySelector("#registeredList");

    gridElement.innerHTML = "";
    
    if (data.subscriptions.length == 0) {
        gridElement.innerHTML = '<div class="col-12"><p class="text-center py-4">Sem inscritos</p></div>';
        new bootstrap.Modal(document.getElementById('registeredModal')).show();
        return;
    }
    
    for (let i = 0; i < data.subscriptions.length; i++) {
        const subscription = data.subscriptions[i];

        
        const card = document.createElement("div");
        card.className = "col";
        card.innerHTML = `
            <div class="card mb-3 shadow-sm">
            <div class="card-body">
            <h5 class="card-title">${subscription.user_name}</h5>
            <p class="card-text">
                <strong>Número de inscrição:</strong> ${subscription.id}<br>
                <strong>Check-in:</strong> ${subscription.check_in === 'pending' ? 'Pendente' : 'Feito'}
            </p>
            </div>
            </div>
        `;
        gridElement.appendChild(card);
    }
    new bootstrap.Modal(document.getElementById('registeredModal')).show();
}

async function deleteEvent(id) {
    const result = await Swal.fire({
        title: 'Deletar evento inscrição?',
        text: "Você deseja deletar esse evento?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim excluir!',
        cancelButtonText: 'Manter evento'
    });

    if (!result.isConfirmed) {
        return; 
    }
    const response = await fetch(`http://localhost:8080/admin/event/delete/${id}`,{
        method: "DELETE",
        headers:{Authorization: "Bearer " + window.localStorage.getItem("token")},
    });
    
    const data = await response.json();  
    
    if (data.error) {
        alert(data.error);
    }  
    
    getEvents();
}

async function logout() {

    const result = await Swal.fire({
        title: 'Deseja encerrar sessão?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim!',
        cancelButtonText: 'Não'
    });

    
    if (!result.isConfirmed) {
        return; 
    }

    window.localStorage.removeItem("token");  
    window.location.href = "login.html";
}

