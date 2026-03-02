# C.A.S.C.A - Centro de Atendimento Social à Criança e ao Adolescente

Este é o projeto oficial do C.A.S.C.A, construído com [Next.js](https://nextjs.org/) (App Router), React, Tailwind CSS e [Prisma](https://www.prisma.io/) com PostgreSQL. O sistema abriga o website institucional, portal de transparência e o painel administrativo.

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/en/) (v20+ recomendado)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) e Docker Compose (para o banco de dados local e ambiente de produção)
- [Git](https://git-scm.com/)

---

## 🛠 Ambientes de Desenvolvimento (Local)

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd casca
```

### 2. Configurar as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto, baseado em um possível `.env.example`, ou configure as variáveis necessárias:

```env
# Exemplo de .env
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

_Nota: Para rodar localmente, o `DATABASE_URL` deve apontar para o container do Docker Compose._

### 3. Subir o Banco de Dados Local

Utilizamos o Docker Compose para provisionar o PostgreSQL local rapidamente:

```bash
# Sobe apenas o serviço do postgres em background
docker compose up -d postgres
```

### 4. Instalar as Dependências

```bash
npm install
```

### 5. Configurar o Banco de Dados (Prisma)

Com o banco de dados rodando e as dependências instaladas, precisamos criar as tabelas e popular os dados iniciais.

Sincronizar o schema com o banco de dados:

```bash
npx prisma db push
```

Popular o banco de dados com os dados predefinidos (Seed):

```bash
npx prisma db seed
```

> **Atenção:** O comando de seed está configurado para deletar os registros antigos e recriar com os dados base atualizados (projetos, atividades, conteúdo da home, etc).

### 6. Executar o Servidor de Desenvolvimento

Agora você pode iniciar o servidor Next.js:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

---

## 🚀 Ambiente de Produção

Para rodar o projeto em produção, utilizamos Docker para containerizar a aplicação (Next.js) e um proxy reverso (Nginx).

### 1. Variáveis de Ambiente para Produção

Certifique-se de que o `.env` de produção contém as URLs corretas (banco externo, senhas fortes) e o domínio configurado (se usado pelo middleware).

```env
NODE_ENV=production
DATABASE_URL="<Sua_URL_do_Postgres_Producao>"
```

### 2. Subir os Containers de Produção

O Docker Compose está configurado para construir a imagem Docker (via `Dockerfile.prod`) e orquestrar os serviços.

```bash
docker compose up -d --build
```

Isso iniciará:

- A aplicação Next.js (serviço `inscricoes-creche`)
- O servidor Nginx (serviço `nginx`) expondo a porta 80.
- (Opcional) O banco local, se não estiver usando um banco gerenciado externo.

### 4. Manutenção de Banco em Produção

Caso necessite rodar migrações ou seeds na infraestrutura do Docker de produção, nós adicionamos um container "ferramenta" (`migrator`) no Compose que permite rodar comandos Prisma pontuais, usando o target `builder` no Dockerfile.

Para rodar comandos ad-hoc no ambiente de produção:

```bash
# Rodar push no banco de produção (Cuidado!)
docker compose run --rm migrator npx prisma db push

# Rodar seed no banco de produção
docker compose run --rm migrator npx prisma db seed
```

---

## 🗄️ Comandos Úteis do Prisma (Manutenção)

Trabalhando com o Prisma ORM, aqui estão os comandos mais comuns do dia a dia:

- **Atualizar o Client Prisma** (Sempre que alterar o `schema.prisma`):

  ```bash
  npx prisma generate
  ```

- **Visualizar o Banco de Dados (Prisma Studio)**:
  Abra uma interface gráfica para ver o conteúdo das tabelas:

  ```bash
  npx prisma studio
  ```

- **Criar Migrações Formais** (Recomendado para produção):
  ```bash
  npx prisma migrate dev --name <nome_da_migracao>
  ```
  _(Se você não estiver usando migrações estritas, continue usando `db push` para prototipagem)._

---

## 🏗️ Estrutura do Projeto (Principais Diretórios)

- `/src/app` - Rotas e páginas do Next.js (App Router).
- `/src/components` - Componentes React reutilizáveis de UI.
- `/src/actions` - Server Actions do Next.js (lógica de negócios e chamadas Prisma).
- `/prisma` - Arquivos do Prisma ORM (`schema.prisma` e `seed.ts`).
- `/public` - Arquivos estáticos (imagens, ícones).

---

## 🤝 Contribuindo

1. Crie uma branch para sua feature ou correção de bug.
2. Certifique-se de que o código passa no linter e formatação:
   ```bash
   npm run lint
   npm run format
   ```
3. O projeto faz uso do Husky + Commitlint, portanto, use mensagens de commit no padrão Conventional Commits (ex: `feat: adiciona nova tabela`, `fix: corrige erro no formulário`).
4. Abra um Pull Request detalhando suas alterações.
