// Função que roda todos os testes unitários para o cadastro
function runUnitTests() {
  // Testes de validação de nome
  testar("UNIT - Nome válido", () => {
    if (!validarNome("João"))
      throw new Error("Esperado nome 'João' como válido");
  });

  testar("UNIT - Nome muito curto", () => {
    let erro = false;
    try {
      validarNome("Jo");
    } catch (e) {
      erro = true;
    }
    if (!erro) throw new Error("Esperado erro para nome muito curto");
  });

  // Testes de validação de email
  testar("UNIT - Email válido", () => {
    if (!validarEmail("teste@example.com"))
      throw new Error("Esperado 'teste@example.com' como email válido");
  });

  testar("UNIT - Email inválido (sem @)", () => {
    let erro = false;
    try {
      validarEmail("testeexample.com");
    } catch (e) {
      erro = true;
    }
    if (!erro) throw new Error("Esperado erro para email sem @");
  });

  testar("UNIT - Email inválido (sem domínio)", () => {
    let erro = false;
    try {
      validarEmail("teste@");
    } catch (e) {
      erro = true;
    }
    if (!erro) throw new Error("Esperado erro para email sem domínio");
  });

  // Testes de validação de senha
  testar("UNIT - Senha válida", () => {
    if (!validarSenha("senha123"))
      throw new Error("Esperado 'senha123' como senha válida");
  });

  testar("UNIT - Senha muito curta", () => {
    let erro = false;
    try {
      validarSenha("123");
    } catch (e) {
      erro = true;
    }
    if (!erro) throw new Error("Esperado erro para senha muito curta");
  });

  // Testes de confirmação de senha
  testar("UNIT - Senhas coincidentes", () => {
    if (!confirmarSenha("senha123", "senha123"))
      throw new Error("Esperado senhas coincidentes");
  });

  testar("UNIT - Senhas não coincidentes", () => {
    let erro = false;
    try {
      confirmarSenha("senha123", "senha456");
    } catch (e) {
      erro = true;
    }
    if (!erro) throw new Error("Esperado erro para senhas não coincidentes");
  });

  // Testes da função principal de cadastro
  testar("UNIT - Cadastro de usuário bem-sucedido", () => {
    const mensagem = cadastrarUsuario(
      "Maria",
      "maria@example.com",
      "senha123",
      "senha123"
    );
    if (mensagem !== "Cadastro realizado com sucesso!")
      throw new Error("Esperada mensagem de sucesso no cadastro");
  });

  testar("UNIT - Cadastro falha por senhas diferentes", () => {
    let erro = false;
    try {
      cadastrarUsuario("Pedro", "pedro@example.com", "senha123", "senhaabc");
    } catch (e) {
      erro = true;
    }
    if (!erro)
      throw new Error("Esperado erro ao tentar cadastrar com senhas diferentes");
  });
}