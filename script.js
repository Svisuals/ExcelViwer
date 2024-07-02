document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');

    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');
    const forgotPasswordError = document.getElementById('forgot-password-error');

    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    const forgotPasswordContainer = document.getElementById('forgot-password-container');
    const siteContent = document.getElementById('site-content');

    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const showForgotPassword = document.getElementById('show-forgot-password');
    const showLoginFromForgot = document.getElementById('show-login-from-forgot');

    const users = {};

    showRegister.addEventListener('click', function(event) {
        event.preventDefault();
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    });

    showLogin.addEventListener('click', function(event) {
        event.preventDefault();
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    showForgotPassword.addEventListener('click', function(event) {
        event.preventDefault();
        loginContainer.style.display = 'none';
        forgotPasswordContainer.style.display = 'block';
    });

    showLoginFromForgot.addEventListener('click', function(event) {
        event.preventDefault();
        forgotPasswordContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (users[username] && users[username] === password) {
            loginContainer.style.display = 'none';
            siteContent.style.display = 'block';
        } else {
            loginError.style.display = 'block';
        }
    });

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newUsername = document.getElementById('new-username').value;
        const newPassword = document.getElementById('new-password').value;

        if (users[newUsername]) {
            registerError.style.display = 'block';
        } else {
            users[newUsername] = newPassword;
            registerContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        }
    });

    forgotPasswordForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const forgotUsername = document.getElementById('forgot-username').value;

        if (users[forgotUsername]) {
            alert('A funcionalidade de recuperação de senha ainda não está implementada.');
        } else {
            forgotPasswordError.style.display = 'block';
        }
    });

    // Dados para os gráficos
    const execucaoData = [
        { status: "Planejada", value: 120 },
        { status: "Iniciada", value: 10 },
        { status: "Finalizada", value: 5

    ];

    const statusData = [
        { status: "Em dia", value: 70 },
        { status: "Antecipada", value: 5 },
        { status: "Em atraso", value: 30 }
    ];

    // Função para gerar gráfico
    function generateChart(containerId, data, title) {
        const container = d3.select(containerId);
        const width = container.node().getBoundingClientRect().width;
        const height = 200;

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
            .attr("x", d => x(d.status))
            .attr("y", d => y(d.value))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.value));

        const label = svg.selectAll(".label")
            .data(data)
            .enter().append("text")
            .attr("class", "label")
            .attr("x", d => x(d.status) + x.bandwidth() / 2)
            .attr("y", d => y(d.value) - 5)
            .attr("text-anchor", "middle")
            .text(d => d.value);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .attr("font-size", "16px")
            .attr("font-weight", "bold")
            .text(title);
    }

    generateChart("#execucao-chart", execucaoData, "Execução das atividades");
    generateChart("#status-chart", statusData, "Status das atividades");
});
