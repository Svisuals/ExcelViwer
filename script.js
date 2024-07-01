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

    const execucaoData = [
        { status: "Planejada", value: 100 },
        { status: "Iniciada", value: 0 },
        { status: "Finalizada", value: 0 }
    ];

    const statusData = [
        { status: "Em dia", value: 60 },
        { status: "Antecipada", value: 0 },
        { status: "Em atraso", value: 40 }
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
            .call(d3.axisLeft(y).ticks(10));
    }

    createBarChart(execucaoData, "#execucao-atividades");
    createBarChart(statusData, "#status-atividades");
});
