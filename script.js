const lista = document.getElementById("listaTarefas");
const adicionar = document.getElementById("adicionar");

// Atualiza os números das tarefas
function atualizarNumeros() {
    const tarefas = document.querySelectorAll(".tarefa");
    const feitas = document.querySelectorAll(
        ".tarefa input:checked"
    );

    document.getElementById("pendentes").textContent =
        tarefas.length - feitas.length;

    document.getElementById("concluidas").textContent =
        4 + feitas.length;
}

// Marcar tarefa como concluída
lista.addEventListener("change", function(evento) {
    if (evento.target.type === "checkbox") {
        const tarefa = evento.target.closest(".tarefa");

        tarefa.classList.toggle(
            "concluida",
            evento.target.checked
        );

        atualizarNumeros();
    }
});

// Adicionar uma nova tarefa
adicionar.addEventListener("click", function() {
    const nome = prompt("Digite o nome da tarefa:");

    if (nome === null || nome.trim() === "") {
        return;
    }

    const data = prompt("Digite o prazo da tarefa:");

    const tarefa = document.createElement("label");
    tarefa.className = "tarefa";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const informacoes = document.createElement("div");

    const titulo = document.createElement("strong");
    titulo.textContent = nome;

    const descricao = document.createElement("p");
    descricao.textContent = "Nova atividade";

    const prazo = document.createElement("span");
    prazo.textContent = data || "Sem prazo";

    informacoes.appendChild(titulo);
    informacoes.appendChild(descricao);

    tarefa.appendChild(checkbox);
    tarefa.appendChild(informacoes);
    tarefa.appendChild(prazo);

    lista.appendChild(tarefa);

    atualizarNumeros();
});

// Botão para mostrar todas as tarefas
document.getElementById("verTodas").addEventListener("click", function() {
    alert("Todas as atividades estão sendo exibidas.");
});

// Botão do menu
document.getElementById("menu").addEventListener("click", function() {
    alert("Menu do OrganizaEstudo");
});

// Notificações
document.getElementById("sino").addEventListener("click", function() {
    alert("Você não tem novas notificações.");
});

// Botões inferiores
document.querySelectorAll("footer button").forEach(function(botao) {
    botao.addEventListener("click", function() {
        document.querySelectorAll("footer button").forEach(function(item) {
            item.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        if (botao.textContent !== "Início") {
            alert("Você selecionou: " + botao.textContent);
        }
    });
});