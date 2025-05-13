# Studio Ghibli Films Explorer - README

## 📌 Visão Geral

Aplicação React que consome a API do Studio Ghibli para exibir filmes com funcionalidades de filtro, marcação e anotações pessoais.

## 🛠 Tecnologias Utilizadas

- **React** com TypeScript  
- **Vite** como build tool  
- **Axios** para requisições HTTP  
- **React Router** para navegação  
- **Context API** para gerenciamento de estado global  
- **Tailwind CSS** para desenvolver o CSS
- **React Toastify** para notificações  

## ✨ Funcionalidades Implementadas

### ✅ Obrigatórios
- Listagem de filmes com:  
  - Título, imagem, ano, duração  
  - Sinopse, diretor, produtor  
  - Nota de avaliação  
- Marcar/desmarcar como assistido  
- Marcar/desmarcar como favorito  
- Filtro por título  
- Filtro por sinopse  
- Anotações pessoais com avaliação por estrelas (1-5)  
- Filtros por:  
  - Assistido/Favorito  
  - Com anotação  
  - Número de estrelas  
- Ordenação por:  
  - Título (A-Z/Z-A)  
  - Duração  
  - Avaliação pessoal  
  - Nota de avaliação 

### 💎 Desejáveis
- Desenvolvido com TypeScript
- Responsividade básica
- Persistência local dos dados  
- Notificações Toast para ações  
- Separação clara de componentes/services  
- Uso de Context API para estado global  
- Estilização com Styled-components  

## 🚀 Como Executar

1. **Clone o repositório**  
   ```bash
   $ git clone git@github.com:kauancarniel/frontend-challenge-truckpag.git
   $ cd ghibli-films-explorer

2. **Instalar dependências**
   ```bash
  $ npm install
  ou
  $ yarn install

3. **Iniciar servidor de desenvolvimento**
   ```bash
  $ npm run dev
  ou
  $ yarn dev