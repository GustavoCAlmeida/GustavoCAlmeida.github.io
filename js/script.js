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
 * 5. CURSOR CUSTOMIZADO (DESKTOPS COM FINE-POINTER) — SEM CÍRCULO ENVOLTA
 * --------------------------------------------------------------------------
 */
function initCursorCustomizado() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  // Garante que o círculo em volta do cursor não seja exibido
  if (cursorRing) {
    cursorRing.remove();
  }

  if (!cursorDot) return;

  // Verifica se o dispositivo tem suporte a mouse de precisão e animações ativas
  const temMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefereReducaoMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!temMouse || prefereReducaoMovimento) {
    cursorDot.style.display = 'none';
    return;
  }

  window.addEventListener('mousemove', (e) => {
    cursorDot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
  }, { passive: true });
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
 * 8. VALIDAÇÃO E ENVIO DO FORMULÁRIO DE CONTATO (WEB3FORMS / EMAIL)
 * --------------------------------------------------------------------------
 */
function initFormularioContato() {
  const form = document.getElementById('formContato');
  const statusMsg = document.getElementById('formStatusMsg');
  const btnSubmit = document.getElementById('btnEnviarContato') || form?.querySelector('button[type="submit"]');

  if (!form || !statusMsg) return;

  // =========================================================================
  // 👉 COLE SUA ACCESS KEY DO WEB3FORMS AQUI:
  // Obtenha sua chave gratuita em: https://web3forms.com/
  // =========================================================================
  const WEB3FORMS_ACCESS_KEY = "c8f20ed5-bb30-4978-bcd1-0bcdf9fd4587";

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('campoNome');
    const email = document.getElementById('campoEmail');
    const mensagem = document.getElementById('campoMensagem');

    if (!nome || !email || !mensagem) return;

    // Validação básica de campos obrigatórios
    if (!nome.value.trim() || !email.value.trim() || !mensagem.value.trim()) {
      statusMsg.className = 'form-status-msg erro';
      statusMsg.style.display = 'block';
      statusMsg.textContent = 'Por favor, preencha todos os campos obrigatórios antes de enviar.';
      statusMsg.focus();
      return;
    }

    // Validação de formato de e-mail via regex padrão
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.value.trim())) {
      statusMsg.className = 'form-status-msg erro';
      statusMsg.style.display = 'block';
      statusMsg.textContent = 'Por favor, informe um endereço de e-mail válido.';
      email.focus();
      return;
    }

    // Alerta se a chave ainda não tiver sido configurada
    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "SUA_ACCESS_KEY_AQUI") {
      statusMsg.className = 'form-status-msg erro';
      statusMsg.style.display = 'block';
      statusMsg.innerHTML = `
        <strong>Chave não configurada!</strong> Cole sua Access Key do Web3Forms no topo da função no arquivo <code>js/script.js</code>.<br>
        Enquanto isso, você pode enviar diretamente por e-mail:
        <a href="mailto:gustavo.calmeida4@senacsp.edu.br?subject=Contato%20via%20Portfolio%20-%20${encodeURIComponent(nome.value.trim())}&body=${encodeURIComponent(mensagem.value.trim())}" style="text-decoration: underline; font-weight: bold; color: inherit; display: inline-block; margin-top: 6px;">
          Clique aqui para abrir no seu cliente de e-mail &rarr;
        </a>
      `;
      statusMsg.focus();
      return;
    }

    // Feedback visual: desabilitar botão e mostrar status de carregamento
    const textoOriginalBotao = btnSubmit.innerHTML;
    btnSubmit.disabled = true;
    btnSubmit.style.opacity = '0.7';
    btnSubmit.style.cursor = 'not-allowed';
    btnSubmit.innerHTML = `
      <span>Enviando mensagem...</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="icone-girando" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-linecap="round"></path>
      </svg>
    `;

    statusMsg.className = 'form-status-msg';
    statusMsg.style.display = 'none';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: nome.value.trim(),
          email: email.value.trim(),
          message: mensagem.value.trim(),
          from_name: 'Portfólio - Gustavo Almeida',
          subject: `Nova mensagem de contato recebida de ${nome.value.trim()}`
        })
      });

      const resultado = await response.json();

      if (response.status === 200 && resultado.success) {
        statusMsg.className = 'form-status-msg sucesso';
        statusMsg.style.display = 'block';
        statusMsg.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contato com você.';
        form.reset();
        statusMsg.focus();
      } else {
        throw new Error(resultado.message || 'Erro ao enviar mensagem.');
      }
    } catch (erro) {
      statusMsg.className = 'form-status-msg erro';
      statusMsg.style.display = 'block';
      statusMsg.textContent = 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde ou me contate via LinkedIn.';
      statusMsg.focus();
    } finally {
      btnSubmit.disabled = false;
      btnSubmit.style.opacity = '';
      btnSubmit.style.cursor = '';
      btnSubmit.innerHTML = textoOriginalBotao;
    }
  });
}

