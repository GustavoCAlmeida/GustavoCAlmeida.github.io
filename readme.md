# 🌐 Portfólio Profissional — Gustavo Cruz de Almeida

[![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-e2261a?logo=github&style=flat-square)](https://gustavocalmeida.github.io)
[![W3C Compliant](https://img.shields.io/badge/W3C-HTML5%20%26%20CSS3-success?style=flat-square)](#-validações-e-conformidade)
[![Acessibilidade](https://img.shields.io/badge/WCAG-2.2%20AA%20Compliant-blue?style=flat-square)](#-acessibilidade-wcag-22-aa)
[![Metodologia](https://img.shields.io/badge/Metodologia-Mobile--First%20Estrito-black?style=flat-square)](#-arquitetura-mobile-first)
[![Licença](https://img.shields.io/badge/Licen%C3%A7a-MIT-yellow.svg?style=flat-square)](LICENSE)

Portfólio pessoal e currículo web moderno, responsivo e de alta performance desenvolvido para **Gustavo Cruz de Almeida**, estudante do curso **Técnico em Informática pelo SENAC São Paulo**, com foco em desenvolvimento de software e criação de interfaces web modernas e acessíveis.

---

## 📌 Visão Geral e Identidade Visual

O projeto foi concebido a partir de referências visuais contemporâneas (inspirado na proposta estética do portfólio de referência com contraste marcante, tipografia de grande impacto e microinterações fluidas), adaptando toda a linguagem para a identidade pessoal de Gustavo.

### 🎨 Paleta de Cores & Design Tokens
- **Azul Primário (`#007acc`):** Cor de destaque, tecnologia e energia visual (Hero, divisores e botões de ação).
- **Preto Obsidiana (`#0b0f17` e `#121824`):** Fundo de alta densidade e contraste para os cards e seções técnicas.
- **Off-White Suave (`#f4f7fb`):** Contraste limpo e moderno para seções textuais (Sobre Mim) e corpo dos cartões.
- **Dourado Spark (`#ffcb2b`):** Acentos visuais em estrelas separadoras, ícones e destaques.

### 🔤 Tipografia
- **Títulos e Display:** `Bebas Neue` (condensada, impactante e moderna).
- **Corpo e Navegação:** `Montserrat` (pesos 400 a 900, excelente legibilidade em pequenas telas).

---

## 🚀 Tecnologias Obrigatórias e Arquitetura

O projeto foi construído **exclusivamente com tecnologias nativas**, sem o uso de frameworks pesados (React, Vue, Tailwind CSS em tempo de execução, Bootstrap ou jQuery) nem bibliotecas de animação externas como GSAP:

- **HTML5 Semântico:** Marcação estrutural W3C padrão (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
- **CSS3 Puro (Mobile-First Estrito):**
  - Estilização base projetada inicialmente para dispositivos móveis (`320px` a `480px`).
  - Adaptações para telas maiores através de **Media Queries estritamente com `min-width`** (`480px`, `768px`, `1024px`, `1440px`).
  - Efeitos de profundidade e animações nativas via `@keyframes` e transições aceleradas por hardware (`transform` e `opacity`).
- **JavaScript Vanilla (ES6+):**
  - Manipulação modular e assíncrona do DOM.
  - Implementação de `IntersectionObserver` para rastreamento de seção ativa no menu.
  - Menu drawer mobile com foco acessível e fechamento via tecla `ESC`.
  - Abas interativas de stack compatíveis com padrões WAI-ARIA.
  - Cursor personalizado direto e preciso, sem círculos ou anéis de atraso em volta do ponteiro.
  - Atualização automática do ano de copyright (`new Date().getFullYear()`).

---

## ♿ Acessibilidade (WCAG 2.2 Nível AA)

- **Skip Link:** Atalho invisível (`#conteudo-principal`) revelado pelo foco do teclado para leitores de tela.
- **Contraste de Cores:** Relação de contraste superior a **4.5:1** em todos os textos sobre fundos sólidos.
- **Navegação por Teclado:** Foco visível consistente (`:focus-visible`) com realce dourado de 3px em todos os links e botões.
- **WAI-ARIA Apropriado:** Uso contextual de `aria-expanded`, `aria-controls`, `aria-selected`, `role="tablist"` e `role="tabpanel"`.
- **Prevenção de Movimento (`prefers-reduced-motion`):** Desativação de loops, rotações e animações automáticas para usuários sensíveis a movimento.
- **Áreas de Toque:** Elementos interativos com dimensões mínimas de 44x44px para telas sensíveis ao toque.

---

## 🔍 SEO & GEO (Generative Engine Optimization)

- **Hierarquia de Títulos:** Um único `<h1>` na página e estrutura ordenada de `<h2>` a `<h4>`.
- **Metatags Open Graph & Twitter Cards:** Configuração completa para compartilhamento em redes sociais e apps de mensagens.
- **Dados Estruturados (JSON-LD):** Esquema Schema.org mapeando entidades `Person`, `WebSite`, `ProfilePage` e competências técnicas (`knowsAbout`).
- **Indexação:** Inclusão de `robots.txt` e `sitemap.xml`.

---

## 📂 Estrutura de Arquivos

```text
gustavo/
│
├── index.html            # Estrutura semântica completa em HTML5
│
├── css/
│   └── style.css         # Folha de estilos Mobile-First pura com variáveis CSS
│
├── js/
│   └── script.js         # Lógica Vanilla JS (Menu, Abas ARIA, Observer, Cursor)
│
├── assets/
│   ├── images/           # Diretório para fotos e prints de projetos
│   └── icons/            # Ícones e recursos visuais complementares
│
├── favicon.svg           # Ícone do site com monograma GA
├── robots.txt            # Diretivas para mecanismos de busca
├── sitemap.xml           # Mapa do site para indexação
└── README.md             # Esta documentação
```

---

## ⚙️ Como Personalizar Seu Portfólio

Todos os pontos personalizáveis contam com alertas e comentários no código:

1. **Informações e Redes Sociais:**
   - No `index.html`, revise os links de LinkedIn e GitHub no cabeçalho, seção sobre e rodapé.
   - Atualize a URL canônica com o seu domínio final no `<link rel="canonical">`.
2. **Currículo em PDF:**
   - Coloque o seu arquivo PDF na pasta `assets/` e aponte o botão `btnBaixarCurriculo` no `index.html` para `assets/curriculo-gustavo.pdf`.
3. **Novos Projetos:**
   - Na `<section id="projetos">`, duplique o elemento `<article class="card-projeto">` e adicione a imagem em `assets/images/`, o link do repositório no GitHub e a URL da demonstração.
4. **Formulário de Contato:**
   - Se desejar receber mensagens diretamente por um serviço externo gratuito, configure o atributo `action` do `<form>` com serviços como [Formspree](https://formspree.io/) ou [Getform](https://getform.io/).

---

## 🚀 Como Publicar

### No GitHub Pages (Recomendado):
1. Crie um repositório no seu GitHub (exemplo: `portfolio` ou `gustavocalmeida.github.io`).
2. Envie os arquivos do projeto:
   ```bash
   git init
   git add .
   git commit -m "feat: portfólio profissional Mobile-First completo"
   git branch -M main
   git remote add origin https://github.com/GustavoCAlmeida/portfolio.git
   git push -u origin main
   ```
3. No GitHub, acesse **Settings > Pages**.
4. Em **Branch**, selecione `main` e a pasta `/ (root)`.
5. Clique em **Save**. O site estará disponível em instantes!

---

## 📊 Relatório Final de Validação

| Critério | Status | Detalhes da Verificação |
| :--- | :---: | :--- |
| **Padrão W3C HTML5** | ✅ Aprovado | Marcação semântica válida, sem tags depreciadas, IDs únicos e hierarquia de títulos coerente. |
| **Padrão W3C CSS3** | ✅ Aprovado | Sintaxe válida, propriedades CSS padronizadas, sem hacks legados. |
| **Metodologia Mobile-First** | ✅ Aprovado | Base mobile implementada com progressão exclusiva por `@media (min-width: ...)`. |
| **Acessibilidade WCAG 2.2 AA** | ✅ Aprovado | Skip link presente, contraste > 4.5:1, navegação por teclado e suporte a movimento reduzido. |
| **Desempenho & Core Web Vitals** | ✅ Aprovado | Sem scripts externos bloqueantes (`defer`), SVGs otimizados e zero dependências pesadas. |
| **Validação W3C Oficial Online** | ⏳ Pendente | Requer submissão da URL pública após publicação no validador `validator.w3.org`. |
| **Google PageSpeed Insights** | ⏳ Pendente | Requer auditoria da URL hospedada em `pagespeed.web.dev` após deploy online. |

---

## 👨‍💻 Autor

- **Gustavo Cruz de Almeida**
- LinkedIn: [gustavo-cruz-de-almeida](https://www.linkedin.com/in/gustavo-cruz-de-almeida-a4a92a388)
- GitHub: [@GustavoCAlmeida](https://github.com/GustavoCAlmeida)