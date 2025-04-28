function logout() {
    window.localStorage.removeItem("token");  
    window.location.href = "login.html";
}

async function onLoadPage() {
    try {
        const token = window.localStorage.getItem("token");

        const tokenPayload = token.split('.')[1];
        const payload = JSON.parse(atob(tokenPayload));
        const userId = payload.userId;
        const userName = payload.userName;
        document.querySelector("h2").innerHTML = "Bem Vindo(a) " + userName;
        
        const response = await fetch(`http://localhost:8080/subscription/${userId}`);
        const data = await response.json();
        const subscriptions = data.subscriptions;
        
        const gridElement = document.getElementById("subscriptionsGrid");
        gridElement.innerHTML = "";
        
        if (subscriptions.length === 0) {
            gridElement.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info text-center py-4">
                        <p class="mb-0">Você não possui inscrições</p>
                    </div>
                </div>
            `;
            return;
        }
    
        for (let i = 0; i < subscriptions.length; i++) {
            const subscription = subscriptions[i];
            
            const startDate = new Date(subscription.date_start);
            const endDate = new Date(subscription.date_end);
            const dateOptions = { 
                weekday: 'long', 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric',
                hour: '2-digit', 
                minute: '2-digit'
            };
            
            const card = document.createElement("div");
            card.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${subscription.image_url}" 
                         class="card-img-top" 
                         style="height: 160px; object-fit: cover;"
                         alt="${subscription.title}"
                         onerror="this.src='https://via.placeholder.com/400x200?text=Evento'">
                    <div class="card-body">
                        <h5 class="card-title">${subscription.title}</h5>
                        <p class="card-text text-muted small mb-2">${subscription.description}</p>
                        <p class="text-muted small mb-3">
                            <strong>Início:</strong> ${startDate.toLocaleDateString('pt-BR', dateOptions)}<br>
                            <strong>Término:</strong> ${endDate.toLocaleDateString('pt-BR', dateOptions)}
                        </p>
                    </div>
                    <div class="card-footer bg-white">
                        <div class="d-grid gap-2 d-md-flex">
                            <button type="button" class="btn btn-primary flex-grow-1" onclick="comprovante()">
                                <i class="bi bi-printer"></i> Comprovante
                            </button>
                            <button type="button" class="btn btn-outline-danger flex-grow-1" value="${subscription.event_id}" onclick="unsubscribe(this.value)">
                                <i class="bi bi-x-circle" ></i> Cancelar Inscrição
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            gridElement.appendChild(card);
        };
        
    } catch (error) {
        console.error("Erro:", error);
        const gridElement = document.getElementById("subscriptionsGrid");
        if (gridElement) {
            gridElement.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger text-center py-4">
                        <p class="mb-0">Erro ao carregar inscrições</p>
                        <small>${error.message}</small>
                    </div>
                </div>
            `;
        }
    }
}

async function unsubscribe(eventId) {

    const result = await Swal.fire({
        title: 'Cancelar inscrição?',
        text: "Você deseja cancelar a inscrição neste evento?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim cancelar!',
        cancelButtonText: 'Manter inscrição'
    });

    if (!result.isConfirmed) {
        return; 
    }

    const token = window.localStorage.getItem("token");
    const tokenPayload = token.split('.')[1];
    const payload = JSON.parse(atob(tokenPayload));
    const userId = payload.userId;

    const data = {
        user_id: userId,
        event_id: Number(eventId)
    };

    const response = await fetch(`http://localhost:8080/subscription/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    });
    
    if (response.ok) {
        alert("Inscrição cancelada com sucesso!");
        onLoadPage();
    } else {
        alert("Erro ao cancelar inscrição!");
    }
}

function comprovante() {
    alert("Funcionalidade não implementada");
}