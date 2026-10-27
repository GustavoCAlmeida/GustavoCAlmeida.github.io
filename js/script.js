/**
 * ==========================================================================
 * PORTFÓLIO PROFISSIONAL — GUSTAVO ALMEIDA
 * JavaScript Vanilla (ES6+) — Sem Dependências Externas
 * Padrões: WCAG 2.2 AA (Acessibilidade), Performance Nativa, Segurança
 * ==========================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initMenuMobile();
  initHeaderRolagem();
  initObserverSecoesAtivas();
  initAbasStack();
  initCursorCustomizado();
  initBotaoVoltarTopo();
  initAnoAtual();
  initFormularioContato();
});

/**
 * --------------------------------------------------------------------------
 * 1. CONTROLE DO MENU MOBILE (ACESSIBILIDADE + TRAP DE FOCO)
 * --------------------------------------------------------------------------
 */
function initMenuMobile() {
  const botaoHamburger = document.getElementById('botaoHamburger');
  const menuMobile = document.getElementById('menuMobileDrawer');
  const overlayMenu = document.getElementById('overlayMenu');
  const linksMobile = document.querySelectorAll('.link-mobile');

  if (!botaoHamburger || !menuMobile || !overlayMenu) return;

  function abrirMenu() {
    botaoHamburger.classList.add('aberto');
    botaoHamburger.setAttribute('aria-expanded', 'true');
    botaoHamburger.setAttribute('aria-label', 'Fechar menu de navegação');
    menuMobile.classList.add('aberto');
    menuMobile.setAttribute('aria-hidden', 'false');
    overlayMenu.classList.add('ativo');
    document.body.style.overflow = 'hidden';

    // Foco no primeiro link após abrir
    const primeiroLink = menuMobile.querySelector('a, button');
    if (primeiroLink) {
      setTimeout(() => primeiroLink.focus(), 150);
    }
  }

  function fecharMenu() {
    botaoHamburger.classList.remove('aberto');
    botaoHamburger.setAttribute('aria-expanded', 'false');
    botaoHamburger.setAttribute('aria-label', 'Abrir menu de navegação');
    menuMobile.classList.remove('aberto');
    menuMobile.setAttribute('aria-hidden', 'true');
    overlayMenu.classList.remove('ativo');
    document.body.style.overflow = '';
  }

  botaoHamburger.addEventListener('click', () => {
    const estaAberto = botaoHamburger.classList.contains('aberto');
    if (estaAberto) {
      fecharMenu();
    } else {
      abrirMenu();
    }
  });

  overlayMenu.addEventListener('click', fecharMenu);

  linksMobile.forEach(link => {
    link.addEventListener('click', fecharMenu);
  });

  // Fechar no teclado (tecla ESC) e gerenciamento de foco (Trap)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuMobile.classList.contains('aberto')) {
      fecharMenu();
      botaoHamburger.focus();
    }

    if (e.key === 'Tab' && menuMobile.classList.contains('aberto')) {
      const elementosFocaveis = menuMobile.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
      if (elementosFocaveis.length === 0) return;

      const primeiro = elementosFocaveis[0];
      const ultimo = elementosFocaveis[elementosFocaveis.length - 1];

      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    }
  });
}

/**
 * --------------------------------------------------------------------------
 * 2. COMPORTAMENTO DO CABEÇALHO NA ROLAGEM
 * --------------------------------------------------------------------------
 */
function initHeaderRolagem() {
  const cabecalho = document.getElementById('cabecalhoPrincipal');
  if (!cabecalho) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 40) {
          cabecalho.classList.add('rolado');
        } else {
          cabecalho.classList.remove('rolado');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * --------------------------------------------------------------------------
 * 3. OBSERVER DE SEÇÃO ATIVA NA NAVEGAÇÃO (INTERSECTION OBSERVER)
 * --------------------------------------------------------------------------
 */
function initObserverSecoesAtivas() {
  const secoes = document.querySelectorAll('section[id], header[id]');
  const linksNav = document.querySelectorAll('.nav-item-link, .link-mobile');

  if (secoes.length === 0 || linksNav.length === 0) return;

  const opcoes = {
    root: null,
    rootMargin: '-25% 0px -65% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        linksNav.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('ativo');
            link.setAttribute('aria-current', 'page');
          } else {
            link.classList.remove('ativo');
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, opcoes);

  secoes.forEach(secao => observer.observe(secao));
}

/**
 * --------------------------------------------------------------------------
 * 4. ABAS INTERATIVAS DA SEÇÃO STACK / HABILIDADES (WAI-ARIA COMPLIANT)
 * --------------------------------------------------------------------------
 */
function initAbasStack() {
  const botoesAbas = document.querySelectorAll('.aba-stack-btn');
  const paineisAbas = document.querySelectorAll('.painel-stack-conteudo');

  if (botoesAbas.length === 0 || paineisAbas.length === 0) return;

  function selecionarAba(botaoAlvo) {
    const idAlvo = botaoAlvo.getAttribute('aria-controls');

    botoesAbas.forEach(btn => {
      btn.setAttribute('aria-selected', 'false');
      btn.setAttribute('tabindex', '-1');
    });

    paineisAbas.forEach(painel => {
      painel.classList.remove('ativo');
      painel.hidden = true;
    });

    botaoAlvo.setAttribute('aria-selected', 'true');
    botaoAlvo.setAttribute('tabindex', '0');

    const painelCorrespondente = document.getElementById(idAlvo);
    if (painelCorrespondente) {
      painelCorrespondente.classList.add('ativo');
      painelCorrespondente.hidden = false;
    }
  }

  botoesAbas.forEach((botao, indice) => {
    botao.addEventListener('click', () => selecionarAba(botao));

    // Navegação acessível por setas do teclado (Esquerda/Direita/Home/End)
    botao.addEventListener('keydown', (e) => {
      let proximoIndice;

      if (e.key === 'ArrowRight') {
        proximoIndice = (indice + 1) % botoesAbas.length;
        botoesAbas[proximoIndice].focus();
        selecionarAba(botoesAbas[proximoIndice]);
      } else if (e.key === 'ArrowLeft') {
        proximoIndice = (indice - 1 + botoesAbas.length) % botoesAbas.length;
        botoesAbas[proximoIndice].focus();
        selecionarAba(botoesAbas[proximoIndice]);
      } else if (e.key === 'Home') {
        botoesAbas[0].focus();
        selecionarAba(botoesAbas[0]);
      } else if (e.key === 'End') {
        botoesAbas[botoesAbas.length - 1].focus();
        selecionarAba(botoesAbas[botoesAbas.length - 1]);
      }
    });
  });
}

/**
 * --------------------------------------------------------------------------
 * 5. CURSOR CUSTOMIZADO COM SEGUIÇÃO SUAVE (DESKTOP FINE-POINTER)
 * --------------------------------------------------------------------------
 */
function initCursorCustomizado() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  if (!cursorDot || !cursorRing) return;

  // Verifica se o dispositivo tem suporte a mouse de precisão e animações ativas
  const temMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefereReducaoMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!temMouse || prefereReducaoMovimento) {
    cursorDot.style.display = 'none';
    cursorRing.style.display = 'none';
    return;
  }

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  }, { passive: true });

  function animarRing() {
    // Interpolação linear suave (lerp)
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animarRing);
  }

  requestAnimationFrame(animarRing);

  // Efeito de expansão nos elementos interativos
  const alvosInterativos = document.querySelectorAll('a, button, input, textarea, [role="button"], [role="tab"]');
  alvosInterativos.forEach(alvo => {
    alvo.addEventListener('mouseenter', () => cursorRing.classList.add('ativo'));
    alvo.addEventListener('mouseleave', () => cursorRing.classList.remove('ativo'));
  });
}

/**
 * --------------------------------------------------------------------------
 * 6. BOTÃO VOLTAR AO TOPO
 * --------------------------------------------------------------------------
 */
function initBotaoVoltarTopo() {
  const btnTopo = document.getElementById('btnVoltarTopo');
  if (!btnTopo) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 450) {
          btnTopo.classList.add('visivel');
        } else {
          btnTopo.classList.remove('visivel');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  btnTopo.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * --------------------------------------------------------------------------
 * 7. ATUALIZAÇÃO AUTOMÁTICA DO ANO NO RODAPÉ
 * --------------------------------------------------------------------------
 */
function initAnoAtual() {
  const elementoAno = document.getElementById('anoAtual');
  if (elementoAno) {
    elementoAno.textContent = new Date().getFullYear();
  }
}

/**
 * --------------------------------------------------------------------------
 * 8. VALIDAÇÃO ACESSÍVEL DO FORMULÁRIO DE CONTATO
 * --------------------------------------------------------------------------
 */
function initFormularioContato() {
  const form = document.getElementById('formContato');
  const statusMsg = document.getElementById('formStatusMsg');

  if (!form || !statusMsg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('campoNome');
    const email = document.getElementById('campoEmail');
    const mensagem = document.getElementById('campoMensagem');

    if (!nome || !email || !mensagem) return;

    // Validação básica de campos
    if (!nome.value.trim() || !email.value.trim() || !mensagem.value.trim()) {
      statusMsg.className = 'form-status-msg erro';
      statusMsg.textContent = 'Por favor, preencha todos os campos obrigatórios antes de enviar.';
      statusMsg.focus();
      return;
    }

    // Validação de formato de e-mail via regex padrão
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.value.trim())) {
      statusMsg.className = 'form-status-msg erro';
      statusMsg.textContent = 'Por favor, informe um endereço de e-mail válido.';
      email.focus();
      return;
    }

    // Feedback claro sem simular envio falso sem backend
    statusMsg.className = 'form-status-msg sucesso';
    statusMsg.innerHTML = `
      <strong>Mensagem pronta para envio!</strong><br>
      Como este é um portfólio estático, você pode enviar diretamente para meu e-mail através do link:<br>
      <a href="mailto:gustavo.calmeida4@senacsp.edu.br?subject=Contato%20via%20Portfolio%20-%20${encodeURIComponent(nome.value.trim())}&body=${encodeURIComponent(mensagem.value.trim())}" style="text-decoration: underline; font-weight: bold; color: inherit; display: inline-block; margin-top: 6px;">
        Clique aqui para abrir no seu aplicativo de e-mail &rarr;
      </a>
    `;

    form.reset();
  });
}
