document.addEventListener("DOMContentLoaded", function() {
    const atividades = [
        {"nome": "Atividade 1", "progresso": 0, "previsto": "2024-07-01", "realizado": ""},
        {"nome": "Atividade 2", "progresso": 20, "previsto": "2024-07-05", "realizado": ""},
        {"nome": "Atividade 3", "progresso": 100, "previsto": "2024-07-10", "realizado": "2024-07-08"},
        {"nome": "Atividade 4", "progresso": 50, "previsto": "2024-07-15", "realizado": ""},
        {"nome": "Atividade 5", "progresso": 100, "previsto": "2024-07-20", "realizado": "2024-07-22"},
        {"nome": "Atividade 6", "progresso": 0, "previsto": "2024-07-25", "realizado": ""},
        {"nome": "Atividade 7", "progresso": 80, "previsto": "2024-07-30", "realizado": ""},
        {"nome": "Atividade 8", "progresso": 100, "previsto": "2024-08-01", "realizado": "2024-07-30"},
        {"nome": "Atividade 9", "progresso": 40, "previsto": "2024-08-05", "realizado": ""},
        {"nome": "Atividade 10", "progresso": 100, "previsto": "2024-08-10", "realizado": "2024-08-09"}
    ];

    // Função para criar a tabela de atividades
    function createAtividadesTable() {
        const tableBody = document.querySelector('#atividades-table tbody');
        tableBody.innerHTML = ''; // Limpa o conteúdo atual da tabela

        atividades.forEach((atividade, index) => {
            const row = document.createElement('tr');

            // Coluna de nome da atividade
            const nomeCell = document.createElement('td');
            nomeCell.textContent = atividade.nome;
            row.appendChild(nomeCell);

            // Coluna de atual %
            const progressoCell = document.createElement('td');
            const progressoInput = document.createElement('input');
            progressoInput.type = 'number';
            progressoInput.value = atividade.progresso;
            progressoInput.addEventListener('input', () => {
                // Atualiza o valor no objeto de atividades
                atividades[index].progresso = parseInt(progressoInput.value);
            });
            progressoCell.appendChild(progressoInput);
            row.appendChild(progressoCell);

            // Coluna de previsto
            const previstoCell = document.createElement('td');
            previstoCell.textContent = atividade.previsto;
            row.appendChild(previstoCell);

            // Coluna de realizado
            const realizadoCell = document.createElement('td');
            realizadoCell.textContent = atividade.realizado || '-';
            row.appendChild(realizadoCell);

            tableBody.appendChild(row);
        });
    }

    // Chama a função para criar a tabela inicialmente
    createAtividadesTable();
});
