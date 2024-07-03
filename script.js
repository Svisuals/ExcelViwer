function carregarCSV() {
    const fileInput = document.getElementById('input-csv');
    const tableBody = document.querySelector('#tabela-atividades tbody');

    // Limpar tabela antes de carregar novos dados
    tableBody.innerHTML = '';

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const lines = e.target.result.split('\n');
        lines.forEach(line => {
            const cells = line.split(',');
            if (cells.length === 10) { // Verificar se há 10 colunas como esperado
                const row = document.createElement('tr');

                cells.forEach(cell => {
                    const td = document.createElement('td');
                    td.textContent = cell.trim();
                    row.appendChild(td);
                });

                tableBody.appendChild(row);
            }
        });
    };

    reader.readAsText(file);
}
