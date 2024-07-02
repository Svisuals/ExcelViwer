let users = {
    "usuario": "senha"
};

function showLogin() {
    document.getElementById('login-container').classList.add('active');
    document.getElementById('register-container').classList.remove('active');
    document.getElementById('forgot-password-container').classList.remove('active');
}

function showRegister() {
    document.getElementById('login-container').classList.remove('active');
    document.getElementById('register-container').classList.add('active');
    document.getElementById('forgot-password-container').classList.remove('active');
}

function showForgotPassword() {
    document.getElementById('login-container').classList.remove('active');
    document.getElementById('register-container').classList.remove('active');
    document.getElementById('forgot-password-container').classList.add('active');
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] && users[username] === password) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('app-container').style.display = 'block';
        showSection('cronograma');
    } else {
        alert('Usuário ou senha incorretos!');
    }
}

function register() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;

    if (username && password) {
        users[username] = password;
        alert('Registrado com sucesso! Faça login para continuar.');
        showLogin();
    } else {
        alert('Por favor, preencha todos os campos!');
    }
}

function forgotPassword() {
    const username = document.getElementById('forgot-username').value;

    if (users[username]) {
        alert(`Sua senha é: ${users[username]}`);
        showLogin();
    } else {
        alert('Usuário não encontrado!');
    }
}

function showSection(section) {
    document.getElementById('cronograma-section').style.display = 'none';
    document.getElementById('graficos-section').style.display = 'none';
    
    if (section === 'cronograma') {
        document.getElementById('cronograma-section').style.display = 'block';
        loadCronograma();
    } else if (section === 'graficos') {
        document.getElementById('graficos-section').style.display = 'block';
        generateCharts();
    }
}

function loadCronograma() {
    // Aqui você pode adicionar o código para carregar o cronograma dinamicamente, se necessário
}

function generateCharts() {
    const execucaoData = [
        { status: "Planejada", value: 100 },
        { status: "Iniciada", value: 10 },
        { status: "Finalizada", value: 2 }
    ];

    const statusData = [
        { status: "Em dia", value: 70 },
        { status: "Antecipada", value: 5 },
        { status: "Em atraso", value: 30 }
    ];

    function generateChart(containerId, data, title) {
        const container = d3.select(containerId);
        const width = container.node().getBoundingClientRect().width;
        const height = 200;

        container.selectAll("*").remove();

        const svg = container.append("svg")
            .attr("width", width)
            .attr("height", height);

        const x = d3.scaleBand()
            .domain(data.map(d => d.status))
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .nice()
            .range([height, 0]);

        const bar = svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .
