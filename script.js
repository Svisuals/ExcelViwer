// Função para gerar os gráficos com D3.js
function generateCharts(data) {
    // Lógica para gerar os gráficos usando D3.js
    // Exemplo básico de gráfico de barras
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 300 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg1 = d3.select("#chart1")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Exemplo de dados
    const dados = [
        { categoria: "Categoria A", valor: 30 },
        { categoria: "Categoria B", valor: 50 },
        { categoria: "Categoria C", valor: 20 }
    ];

    // Escala para o eixo x
    const x = d3.scaleBand()
        .domain(dados.map(d => d.categoria))
        .range([0, width])
        .padding(0.1);

    // Escala para o eixo y
    const y = d3.scaleLinear()
        .domain([0, d3.max(dados, d => d.valor)])
        .nice()
        .range([height, 0]);

    // Adiciona barras ao gráfico
    svg1.selectAll(".bar")
        .data(dados)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.categoria))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.valor))
        .attr("height", d => height - y(d.valor));

    // Adiciona eixos
    svg1.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    svg1.append("g")
        .call(d3.axisLeft(y));

    // Segundo gráfico
    const svg2 = d3.select("#chart2")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Exemplo de dados para o segundo gráfico
    const dados2 = [
        { categoria: "Categoria X", valor: 10 },
        { categoria: "Categoria Y", valor: 40 },
        { categoria: "Categoria Z", valor: 50 }
    ];

    // Escala para o eixo x do segundo gráfico
    const x2 = d3.scaleBand()
        .domain(dados2.map(d => d.categoria))
        .range([0, width])
        .padding(0.1);

    // Escala para o eixo y do segundo gráfico
    const y2 = d3.scaleLinear()
        .domain([0, d3.max(dados2, d => d.valor)])
        .nice()
        .range([height, 0]);

    // Adiciona barras ao segundo gráfico
    svg2.selectAll(".bar")
        .data(dados2)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x2(d.categoria))
        .attr("width", x2.bandwidth())
        .attr("y", d => y2(d.valor))
        .attr("height", d => height - y2(d.valor));

    // Adiciona eixos ao segundo gráfico
    svg2.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x2));

    svg2.append("g")
        .call(d3.axisLeft(y2));
}

// Função para atualizar os gráficos com novos dados
function updateCharts(data) {
    // Lógica para atualizar os gráficos usando D3.js
    // Exemplo básico de atualização de dados
    const svg1 = d3.select("#chart1").select("svg");
    const svg2 = d3.select("#chart2").select("svg");

    // Exemplo de novos dados
    const novosDados = [
        { categoria: "Nova Categoria A", valor: 20 },
        { categoria: "Nova Categoria B", valor: 40 },
        { categoria: "Nova Categoria C", valor: 40 }
    ];

    // Atualiza a escala de y do primeiro gráfico com base nos novos dados
    const y = d3.scaleLinear()
        .domain([0, d3.max(novosDados, d => d.valor)])
        .nice()
        .range([height, 0]);

    // Atualiza as barras do primeiro gráfico com os novos dados
    svg1.selectAll(".bar")
        .data(novosDados)
        .transition()
        .duration(500)
        .attr("y", d => y(d.valor))
        .attr("height", d => height - y(d.valor));

    // Segundo gráfico
    const novosDados2 = [
        { categoria: "Nova Categoria X", valor: 30 },
        { categoria: "Nova Categoria Y", valor: 20 },
        { categoria: "Nova Categoria Z", valor: 50 }
    ];

    // Atualiza a escala de y do segundo gráfico com base nos novos dados
    const y2 = d3.scaleLinear()
        .domain([0, d3.max(novosDados2, d => d.valor)])
        .nice()
        .range([height, 0]);

    // Atualiza as barras do segundo gráfico com os novos dados
    svg2.selectAll(".bar")
        .data(novosDados2)
        .transition()
        .duration(500)
        .attr("y", d => y2(d.valor))
        .attr("height", d => height - y2(d.valor));
}

// Simulação de atualização de dados a partir de eventos no cronograma
// Suponha que aqui haja alguma lógica para alterar os dados nas tabelas
// e depois chamar a função updateCharts com os novos dados
document.addEventListener("DOMContentLoaded", function() {
    // Simulação de atualização de dados ao carregar a página
    const dadosIniciais = [
        { categoria: "Categoria A", valor: 30 },
        { categoria: "Categoria B", valor: 50 },
        { categoria: "Categoria C", valor: 20 }
    ];
    
    generateCharts(dadosIniciais);

    // Simulação de alteração de dados (por exemplo, ao editar a tabela)
    setTimeout(() => {
        const novosDados = [
            { categoria: "Nova Categoria A", valor: 20 },
            { categoria: "Nova Categoria B", valor: 40 },
            { categoria: "Nova Categoria C", valor: 40 }
        ];

        updateCharts(novosDados);
    }, 3000); // Simula uma atualização após 3 segundos
});
