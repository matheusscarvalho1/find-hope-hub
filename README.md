# 🚀 Find Hope Hub

**Find Hope Hub** é uma plataforma de utilidade pública desenvolvida para auxiliar na localização de pessoas desaparecidas. O projeto centraliza informações, facilita o envio de novas pistas e oferece uma interface moderna e intuitiva para conectar famílias e cidadãos a dados públicos em tempo real.



## 🛠️ Stack Tecnológica (2025)

A aplicação utiliza as tecnologias mais recentes do ecossistema **React**, focando em performance, tipagem rigorosa e manutenibilidade:

- **React 19**: Aproveitando as novas capacidades de concorrência e otimização de renderização.
- **Vite 7**: Ambiente de build ultra-rápido para uma experiência de desenvolvimento superior.
- **TypeScript**: Garantia de segurança de tipos em toda a aplicação.
- **Tailwind CSS v4**: Motor de estilização de alto desempenho para layouts responsivos.
- **shadcn/ui**: Componentes de interface acessíveis e consistentes.
- **React Router v7**: Gerenciamento de rotas com suporte a *Lazy Loading* e *Error Boundaries*.
- **Vitest & Testing Library**: Suite de testes focada em qualidade de software.
- **Zod & React Hook Form**: Validação de dados robusta e gerenciamento de formulários.

---

## ⚙️ Decisões de Arquitetura e UX

### ⚡ Performance com Vite 7
A escolha pelo **Vite** garante que a aplicação seja leve e possua um tempo de carregamento extremamente baixo, essencial para usuários que podem estar acessando a plataforma via dispositivos móveis em situações de urgência.

### 🧩 Experiência do Usuário e Validação
Para o campo de "Data do Ocorrido", optei pela implementação de um **Date Picker** nativo:
- **Precisão**: Elimina inconsistências de formato comuns em máscaras de texto.
- **Confiabilidade**: Os dados são validados via **Zod** antes do envio, garantindo integridade total ao consumir a API.

### 🛡️ Resiliência no Upload de Arquivos
Para evitar falhas de rede e erros de servidor (HTTP 500) com arquivos volumosos, implementei travas de segurança no *Client-Side*:
- Limite de **2 arquivos por formulário**.
- Filtro por extensões específicas (JPEG, PNG, PDF, DOCX).
- Feedback imediato via **Sonner (Toasts)** para garantir que o usuário saiba exatamente o status de sua submissão.

---

## 🎯 Funcionalidades Principais

- **Busca em Tempo Real**: Filtros dinâmicos integrados à API para localização rápida de registros.
- **Dashboard de Registros**: Visualização clara com tags de status (*Desaparecido* ou *Localizado*).
- **Envio de Informações**: Formulário validado para registro de novas pistas e anexos.
- **Acessibilidade & Responsividade**: Interface adaptada para qualquer tamanho de tela (Mobile, Tablet e Desktop).
- **Tratamento de Erros**: Páginas dedicadas para estados de erro (404 e 500) e estados de carregamento (*Skeleton Loaders*).

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js v24.12.0 ou superior.

### 1. Instalação Local
```bash
# Clone o projeto
git clone git@github.com:matheusscarvalho1/find-hope-hub.git

# Acesse o diretório
cd find-hope-hub

# Instale as dependências
npm install

# Inicie em modo de desenvolvimento
npm run dev
Use o código com cuidado.

Acesse: http://localhost:5173
2. Docker (Produção)
bash
# Build da imagem
docker build -t find-hope-hub .

# Execução do container
docker run -p 3000:3000 find-hope-hub
Use o código com cuidado.

Acesse: http://localhost:3000
📁 Estrutura de Pastas
bash
src/
├─ assets/     # Recursos estáticos (imagens, ícones)
├─ components/ # UI Components (Atoms/Molecules) e shadcn
├─ interface/  # Tipagens e Interfaces TS
├─ lib/        # Configurações de API (Axios) e Utilitários
├─ pages/      # Views e Páginas da Aplicação
├─ tests/      # Suite de testes Vitest
└─ App.tsx     # Configuração de Rotas e Providers
Use o código com cuidado.

🔧 Comandos Disponíveis
npm run dev: Servidor de desenvolvimento.
npm run build: Build de produção otimizado.
npm run preview: Visualiza o build de produção localmente.
npm run test: Execução de testes unitários.
npm run lint: Verificação de padrões de código via ESLint.

---

## 👤 Autor
**Matheus de Souza Carvalho**
- 📧 [matheusdocarvalho@gmail.com](mailto:matheusdocarvalho@gmail.com)
- 📱 +55 65 99207-9383
- 🔗 [GitHub](github.com)

---