# Projeto Nympla

O projeto consiste em um sistema de gerenciamento de eventos e usuários semelhante ao site Sympla. O sistema irá possibilitar a inscrição em eventos, cadastro e login de usuários, autenticação e autorização, geração de comprovantes de inscrição, check-in de usuários, entre outras funcionalidades.

# Design

Sugestão de design das principais telas do projeto.

![alt text](image.png)

# Dev Log

**Aula 03 - 18/03 (terça)**

- [x] Criação da pasta **repositories** e implementação das classes para acesso ao banco de dados postgres. Download da dependencia **dotenv** para gerenciar as informações de variáveis de ambiente.
  - [x] Criação do PgDatabase.js
  - [x] Criação do UserRepository.js
  - [x] Criação da base de dados chamada **nympla** no PgAdmin
  - [x] Criação da tabela **users** e inserido alguns usuários (sqls na pasta Database)
  - [x] Implementação da funcionalidade de listar todos os usuários
  - [x] Criação do arquivo **.env** que guarda a url de conexao do banco. **OBS:** o arquivo .env não é carregado para o github, devendo o aluno criar na basta Back-end do seu projeto local.

**Aula 02 - 18/03 (terça)**

- [x] Criação das pastas **entities** e **services**
  - [x] Criação do User.js
  - [x] Criação do UserService.js
  - [x] Atualização do UserControler.js

**Aula 01 - 17/03 (segunda)**

- [x] Definição da estrutura do projeto e download das dependências **express** e **pg**
  - [x] Criação do Server.js
  - [x] Criação do Routes.js
  - [x] Criação do UserControler.js
