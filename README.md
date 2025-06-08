# 🆘 Salvaê
 é uma aplicação web desenvolvida para auxiliar em **situações de emergência**. Com funcionalidades que vão desde o **reporte de incidentes** até o **acesso à previsão do tempo** e **rotas de evacuação**, o sistema visa oferecer suporte rápido e prático para usuários em risco.

## 📁 Estrutura do Projeto
src/
├── app/
| ├── FAQ/ # Página de FAQ para dúvidas frequentes
| ├── Instrução/ # Página para instrução de Emergências
│ ├── meteorologia/ # Página com previsão do tempo
│ ├── noticias/ # Página de notícias
│ ├── reporte/ # Página de formulário para reportar incidentes
│ ├── sobre/ # Informações sobre o sistema
│ ├── globals.css # Estilos globais
│ ├── layout.tsx # Layout base da aplicação
│ └── page.tsx # Página inicial
├── components/
│ ├── footer.tsx # Rodapé
│ ├── header.tsx # Cabeçalho com menu de navegação
│ ├── IncidentForm.tsx # Formulário reutilizável de incidentes
│ ├── MapClient.tsx # Componente de mapa com rotas
│ └── painel.tsx # Painel de informações

Como instalar e rodar o projeto
Clone o repositório:
git clone <link do github>
cd salvae

Instale as dependências:
npm install
# ou
yarn install

Execute o projeto em modo de desenvolvimento:
npm run dev
# ou
yarn dev

Acesse http://localhost:3000 no navegador.

## Funcionalidades

- ✅  Reporte de incidentes com data e hora
- 📍  Rotas de evacuação com mapa e nomes de ruas
- 🌦️  Meteorologia em tempo real
- 📰  Notícias atualizadas
- ✅  Sistema de Cadastro e login
- ✅  Interface amigável e Responsiva (celular, tablet e desktop)

Como contribuir
Fork este repositório.

Crie uma branch (git checkout -b feature/sua-feature).

Commit suas mudanças (git commit -m 'Adiciona nova feature').

Push para a branch (git push origin feature/sua-feature).

Abra um Pull Request.

Licença
Este projeto está licenciado sob a MIT License.

## Autor do desenvolvimento 
Turma 1TDSPA
Fabio H S Eduardo - RM560416
Gabriel WU - RM560210
Renato Kenji - RM559810

## Link do video: https://www.youtube.com/watch?v=UE-QyXw8DFw

## Link do Vercel: https://gs-front-salvae-git-main-tdspa1s-projects.vercel.app

## Contato: [trabalhotdspa@hotmail.com]

