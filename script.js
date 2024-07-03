document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('body > div');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetID = link.getAttribute('href').substring(1);
            sections.forEach(section => {
                if (section.id === targetID) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });

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

    const execucaoData = [
        { status: "Planejada", value: atividades.filter(a => a.progresso === 0).length },
        { status: "Iniciada", value: atividades.filter(a => a.progresso > 0 && a.progresso < 100).length },
        { status: "Finalizada", value: atividades.filter(a => a.progresso === 100).length }
    ];

    const statusData = [
        { status: "Em dia", value: atividades.filter(a => new Date(a.realizado) <= new Date(a.previsto) || a.realizado === "").length },
        { status: "Antecipada", value: atividades.filter(a => new Date(a.realizado) < new Date(a.previsto) && a.realizado !== "").length },
        { status: "Em atraso", value: atividades.filter(a => new Date(a.realizado) > new Date(a.previsto)).length }
    ];

    function createBarChart(data, containerID) {
        const container = d3.select(containerID);
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
        const width = parseInt(container.style("width")) - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .domain(data.map(d => d.status))
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .nice()
            .range([height, 0]);

        svg.append("g")
            .selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.status))
            .attr("y", d => y(d.value))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr("fill", (d, i) => ["steelblue", "grey", "red"][i]);

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y));

        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "label")
            .attr("x", d => x(d.status) + x.bandwidth() / 2)
            .attr("y", d => y(d.value) - 5)
            .attr("text-anchor", "middle")
            .text(d => d.value);
    }

    // Gráfico de execução das atividades
    createBarChart(execucaoData, "#execucao-chart");

    // Gráfico de status das atividades
    createBarChart(statusData, "#status-chart");
});
