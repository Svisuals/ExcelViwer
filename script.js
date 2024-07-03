document.addEventListener("DOMContentLoaded", function() {
    // Código existente para troca de seções e criação de gráficos

    // Dados para a curva S (progresso das atividades)
    const progressoData = [
        { data: "08 set 23", percentual: 0 },
        { data: "01 nov 23", percentual: 58 },
        { data: "12 set 23", percentual: 100 },
        { data: "12 set 23", percentual: 100 },
        { data: "10 set 23", percentual: 100 },
        { data: "10 set 23", percentual: 100 },
        { data: "01 nov 23", percentual: 54 },
        { data: "16 out 23", percentual: 78 },
        { data: "27 set 23", percentual: 100 },
        { data: "17 set 23", percentual: 100 },
        { data: "27 set 23", percentual: 100 },
        { data: "16 out 23", percentual: 0 },
    ];

    // Função para criar o gráfico de curva S
    function createSplineChart(data, containerID) {
        const container = d3.select(containerID);
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
        const width = parseInt(container.style("width")) - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Escalas
        const x = d3.scalePoint()
            .domain(data.map(d => d.data))
            .range([0, width])
            .padding(0.5);

        const y = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0]);

        // Gerador de curva S
        const line = d3.line()
            .x(d => x(d.data))
            .y(d => y(d.percentual))
            .curve(d3.curveMonotoneX);

        // Adicionando a linha de curva S
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);

        // Eixos
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y).ticks(10));

        // Rótulo do eixo y
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Progresso (%)");
    }

    // Chamando a função para criar o gráfico de curva S
    createSplineChart(progressoData, "#execucao-atividades");
});
