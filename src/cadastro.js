// Funções de validação e lógica de cadastro
function validarNome(nome) {
  if (nome.trim().length < 3) {
    throw new Error("O nome deve ter pelo menos 3 caracteres.");
  }
  return true;
}

function validarEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    throw new Error("Email inválido.");
  }
  return true;
}

function validarSenha(senha) {
  if (senha.length < 6) {
    throw new Error("A senha deve ter pelo menos 6 caracteres.");
  }
  return true;
}

function confirmarSenha(senha, confirmacao) {
  if (senha !== confirmacao) {
    throw new Error("As senhas não coincidem.");
  }
  return true;
}

function cadastrarUsuario(nome, email, senha, confirmarSenhaInput) {
  validarNome(nome);
  validarEmail(email);
  validarSenha(senha);
  confirmarSenha(senha, confirmarSenhaInput);

  // Aqui você faria a integração com um backend real, se houver
  console.log("Usuário cadastrado:", { nome, email });
  return "Cadastro realizado com sucesso!";
}

// Interação com DOM
document
  .getElementById("cadastroForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenhaInput = document.getElementById("confirmarSenha").value;
    const statusCadastroSpan = document.getElementById("statusCadastro");

    try {
      const mensagem = cadastrarUsuario(
        nome,
        email,
        senha,
        confirmarSenhaInput
      );
      statusCadastroSpan.textContent = mensagem;
      statusCadastroSpan.style.color = "green";
    } catch (error) {
      statusCadastroSpan.textContent = "Erro: " + error.message;
      statusCadastroSpan.style.color = "red";
    }
  });