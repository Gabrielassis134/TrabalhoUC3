// Função que roda todos os testes de componente para o cadastro
function runComponentTests() {
  testar("COMPONENT - Formulário de cadastro deve estar presente", () => {
    const form = document.getElementById("cadastroForm");
    if (!form) throw new Error("Formulário de cadastro não encontrado");
  });

  testar("COMPONENT - Inputs devem aceitar valores corretamente", () => {
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const confirmarSenhaInput = document.getElementById("confirmarSenha");

    nomeInput.value = "Ana";
    emailInput.value = "ana@teste.com";
    senhaInput.value = "teste123";
    confirmarSenhaInput.value = "teste123";

    if (
      nomeInput.value !== "Ana" ||
      emailInput.value !== "ana@teste.com" ||
      senhaInput.value !== "teste123" ||
      confirmarSenhaInput.value !== "teste123"
    ) {
      throw new Error("Inputs não aceitaram os valores corretamente");
    }
  });

  testar("COMPONENT - Formulário dispara evento de submit", () => {
    const form = document.getElementById("cadastroForm");
    let chamado = false;

    const listener = (e) => {
      chamado = true;
      e.preventDefault(); // Previne o recarregamento da página durante o teste
      form.removeEventListener("submit", listener);
    };

    form.addEventListener("submit", listener);
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

    if (!chamado) throw new Error("Evento de submit não foi chamado");
  });

  testar("COMPONENT - Exibição de mensagem de sucesso no cadastro", () => {
    // Simula um cadastro bem-sucedido
    const originalCadastrarUsuario = window.cadastrarUsuario;
    window.cadastrarUsuario = (nome, email, senha, confirmarSenhaInput) => {
      return "Cadastro realizado com sucesso!";
    };

    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const confirmarSenhaInput = document.getElementById("confirmarSenha");
    const statusCadastroSpan = document.getElementById("statusCadastro");
    const form = document.getElementById("cadastroForm");

    nomeInput.value = "Teste";
    emailInput.value = "teste@sucesso.com";
    senhaInput.value = "senhateste";
    confirmarSenhaInput.value = "senhateste";

    form.dispatchEvent(new Event("submit", { bubbles: true }));

    if (statusCadastroSpan.textContent !== "Cadastro realizado com sucesso!") {
      throw new Error(
        "Mensagem de sucesso não exibida corretamente: " +
          statusCadastroSpan.textContent
      );
    }
    if (statusCadastroSpan.style.color !== "green") {
      throw new Error("Cor da mensagem de sucesso não é verde");
    }

    // Restaura a função original
    window.cadastrarUsuario = originalCadastrarUsuario;
  });

  testar("COMPONENT - Exibição de mensagem de erro no cadastro", () => {
    // Simula um erro no cadastro (ex: senhas não coincidem)
    const originalCadastrarUsuario = window.cadastrarUsuario;
    window.cadastrarUsuario = (nome, email, senha, confirmarSenhaInput) => {
      throw new Error("As senhas não coincidem.");
    };

    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const confirmarSenhaInput = document.getElementById("confirmarSenha");
    const statusCadastroSpan = document.getElementById("statusCadastro");
    const form = document.getElementById("cadastroForm");

    nomeInput.value = "Erro";
    emailInput.value = "erro@teste.com";
    senhaInput.value = "senha123";
    confirmarSenhaInput.value = "senhaabc"; // Senha diferente

    form.dispatchEvent(new Event("submit", { bubbles: true }));

    if (statusCadastroSpan.textContent !== "Erro: As senhas não coincidem.") {
      throw new Error(
        "Mensagem de erro não exibida corretamente: " +
          statusCadastroSpan.textContent
      );
    }
    if (statusCadastroSpan.style.color !== "red") {
      throw new Error("Cor da mensagem de erro não é vermelha");
    }

    // Restaura a função original
    window.cadastrarUsuario = originalCadastrarUsuario;
  });
}