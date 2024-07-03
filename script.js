document.addEventListener('DOMContentLoaded', function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';

    input.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const csv = e.target.result;
                const data = parseCSV(csv); // Função para analisar o CSV
                renderTable(data); // Função para renderizar os dados na tabela
            };
            reader.readAsText(file);
        }
    });

    // Função para analisar o CSV
    function parseCSV(csv) {
        const lines = csv.split('\n');
        const headers = lines[0].trim().split('\t'); // Assuming tab-separated values

        const data = [];
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
                const values = line.split('\t');
                const row = {};
                headers.forEach((header, index) => {
                    row[header] = values[index];
                });
                data.push(row);
            }
        }

        return data;
    }

    // Função para renderizar os dados na tabela
    function renderTable(data) {
        const tbody = document.getElementById('corpo-tabela');
        tbody.innerHTML = ''; // Limpa o conteúdo atual da tabela

        data.forEach(item => {
            const tr = document.createElement('tr');

            // Exemplo de como acessar e inserir os dados nas células da tabela
            tr.innerHTML = `
                <td>${item['Tarefas']}</td>
                <td>${item['ID']}</td>
                <td>${item['Previto']}</td>
                <td>${item['Duração']}</td>
                <td>${item['inicio']}</td>
                <td>${item['Término']}</td>
                <td>${item['Progresso']}</td>
                <td>${item['Progresso']}</td>
                <td>${item['inicio']}</td>
                <td>${item['Término']}</td>
            `;

            tbody.appendChild(tr);
        });
    }

    // Adiciona o input de arquivo ao corpo do documento
    document.body.appendChild(input);
});
