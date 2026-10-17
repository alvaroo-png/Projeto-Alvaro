
const listaPendentes = document.getElementById("listaPendentes");
const listaConcluidas = document.getElementById("listaConcluidas");
const busca = document.getElementById("buscar");
const botoesFiltro = document.querySelectorAll("[data-filtro]");

// Atualiza a quantidade de tarefas
function atualizarContagem() {
    document.getElementById("totalPendentes").textContent =
        listaPendentes.querySelectorAll(".tarefa").length;

    document.getElementById("totalConcluidas").textContent =
        listaConcluidas.querySelectorAll(".tarefa").length;
}

// Marca ou desmarca uma tarefa
document.addEventListener("change", function(evento) {
    if (evento.target.type !== "checkbox") return;

    const tarefa = evento.target.closest(".tarefa");

    if (evento.target.checked) {
        tarefa.classList.add("concluida");
        listaConcluidas.appendChild(tarefa);
    } else {
        tarefa.classList.remove("concluida");
        listaPendentes.appendChild(tarefa);
    }

    atualizarContagem();
    aplicarFiltros();
});

// Busca tarefas pelo nome
busca.addEventListener("input", aplicarFiltros);

// Seleciona um filtro
botoesFiltro.forEach(function(botao) {
    botao.addEventListener("click", function() {
        botoesFiltro.forEach(function(item) {
            item.classList.remove("selecionado");
        });

        botao.classList.add("selecionado");
        aplicarFiltros();
    });
});

// Mostra as tarefas de acordo com a busca e o filtro
function aplicarFiltros() {
    const texto = busca.value.toLowerCase();
    const filtro = document.querySelector(
        "[data-filtro].selecionado"
    ).dataset.filtro;

    document.querySelectorAll(".tarefa").forEach(function(tarefa) {
        const nome = tarefa.querySelector("strong").textContent.toLowerCase();
        const concluida = tarefa.querySelector("input").checked;
        const favorita = tarefa.dataset.favorita === "true";

        let mostrar = nome.includes(texto);

        if (filtro === "pendentes" && concluida) {
            mostrar = false;
        }

        if (filtro === "concluidas" && !concluida) {
            mostrar = false;
        }

        if (filtro === "favoritas" && !favorita) {
            mostrar = false;
        }

        tarefa.style.display = mostrar ? "flex" : "none";
    });
}

// Marca uma tarefa como favorita
document.addEventListener("click", function(evento) {
    if (!evento.target.classList.contains("favorito")) return;

    const tarefa = evento.target.closest(".tarefa");
    const favorita = tarefa.dataset.favorita === "true";

    tarefa.dataset.favorita = favorita ? "false" : "true";
    evento.target.textContent = favorita ? "☆" : "★";

    aplicarFiltros();
});

// Adiciona uma tarefa nova
document.getElementById("adicionar").addEventListener("click", function() {
    const nome = prompt("Qual é o nome da tarefa?");

    if (!nome || nome.trim() === "") return;

    const prazo = prompt("Qual é a data de entrega?") || "Sem data";

    const tarefa = document.createElement("div");
    tarefa.className = "tarefa";
    tarefa.dataset.favorita = "false";

    tarefa.innerHTML = `
        <input type="checkbox">
        <div class="informacoes">
            <strong></strong>
            <p>Nova atividade</p>
        </div>
        <div class="prazo azul">
            <span></span>
            <small>Geral</small>
        </div>
        <button class="favorito">☆</button>`;

    tarefa.querySelector("strong").textContent = nome.trim();
    tarefa.querySelector(".prazo span").textContent = prazo;

    listaPendentes.appendChild(tarefa);

    atualizarContagem();
    aplicarFiltros();
});

// Botão de filtrar
document.getElementById("filtrar").addEventListener("click", function() {
    busca.focus();
    aplicarFiltros();
});

// Botões do cabeçalho
document.getElementById("menu").addEventListener("click", function() {
    alert("Menu do OrganizaEstudo");
});

document.getElementById("sino").addEventListener("click", function() {
    alert("Você não tem novas notificações.");
});

// Outras abas
document.getElementById("calendario").addEventListener("click", function() {
    alert("A aba Calendário será desenvolvida depois.");
});

document.getElementById("relatorios").addEventListener("click", function() {
    alert("A aba Relatórios será desenvolvida depois.");
});

atualizarContagem();