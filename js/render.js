/* Monta a página da proposta a partir dos dados salvos. */
(function () {
  var C = window.CONFIG, M = window.MODELOS;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function img(k) { return "img/" + k + (k === "logo" ? ".png" : ".jpg"); }
  function lines(t) { return (t || []).filter(function (x) { return String(x).trim(); }); }
  function waDigits(n) { var d = String(n || "").replace(/\D/g, ""); if (!d) return ""; if (d.length <= 11) d = "55" + d; return d; }
  function waLink(msg) {
    var d = waDigits(C.WHATSAPP);
    return d ? "https://wa.me/" + d + "?text=" + encodeURIComponent(msg) : "https://ig.me/m/" + C.INSTAGRAM;
  }
  var ICON = {
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>',
    pf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-8 9"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z"/></svg>'
  };

  window.renderProposta = function (el, d) {
    var T = M[d.modelo] || M.civil;
    document.documentElement.style.setProperty("--taupe-deep", T.cor || "#736C57");
    var cliente = (d.cliente || "").trim();
    document.title = (cliente ? cliente + " | " : "") + "Proposta Durães Fotografia";
    var meta = [d.data, d.local].filter(function (x) { return x && String(x).trim(); })
      .map(function (x) { return "<span>" + esc(x) + "</span>"; }).join("");
    var pks = d.pacotes || [];

    var pkHtml = pks.map(function (p, i) {
      var val = (p.valor || "").trim();
      var msg = "Olá! Vi a proposta da Durães Fotografia" + (cliente ? " (" + cliente + ")" : "") +
        " e quero fechar o pacote *" + p.nome + "*" + (val ? " de R$ " + val : "") + "." +
        (d.data ? "\nData do evento: " + d.data : "") + (d.local ? "\nLocal: " + d.local : "") +
        "\nComo fazemos para reservar a data?";
      var inc = lines(p.inclusos);
      return '<article class="pk' + (p.destaque ? " hl" : "") + '">' +
        (p.destaque ? '<span class="tag">Mais escolhido</span>' : "") +
        '<div class="ph"><img src="' + img(T.fotosPacotes[i % T.fotosPacotes.length]) + '" alt=""></div>' +
        '<div class="body"><h3 class="script">' + esc(p.nome) + "</h3>" +
        (p.sub ? '<div class="sub spaced">' + esc(p.sub) + "</div>" : "") +
        "<ul>" + lines(p.itens).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
        (inc.length ? '<div class="inc"><strong>Incluso</strong><ul>' + inc.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" : "") +
        '<div class="price">' + (val ? '<div class="v"><small>R$</small>' + esc(val) + "</div>" : '<div class="v" style="font-size:1.6rem">Valor sob consulta</div>') +
        (p.parcelas ? '<div class="p">' + esc(p.parcelas) + "</div>" : "") + "</div>" +
        '<a class="btn' + (p.destaque ? "" : " solid") + '" href="' + esc(waLink(msg)) + '" target="_blank" rel="noopener">Quero este pacote</a>' +
        "</div></article>";
    }).join("");

    var team = (C.EQUIPE || []).map(function (m, i) {
      return '<div class="member"><img src="' + img("t" + (i + 1)) + '" alt="' + esc(m.nome || "Integrante da equipe") + '">' +
        (m.nome ? "<b>" + esc(m.nome) + "</b>" : "") + (m.funcao ? "<span>" + esc(m.funcao) + "</span>" : "") + "</div>";
    }).join("");

    var P = d.parceira || {}, pig = String(P.instagram || "").replace(/^@/, "").trim();
    var partner = (P.nome && P.nome.trim()) ?
      '<section class="partner"><div class="wrap card"><h2 class="script">Nossa parceria</h2><div class="name">' + esc(P.nome) + "</div>" +
      (P.funcao ? '<div class="spaced" style="color:var(--muted)">' + esc(P.funcao) + "</div>" : "") +
      (P.texto ? "<p>" + esc(P.texto) + "</p>" : "") +
      (pig ? '<a class="ig" href="https://www.instagram.com/' + esc(pig) + '" target="_blank" rel="noopener">' + ICON.ig + "@" + esc(pig) + "</a>" : "") +
      "</div></section>" : "";

    var ctaMsg = "Olá! Recebi a proposta da Durães Fotografia" + (cliente ? " (" + cliente + ")" : "") + " e gostaria de marcar uma reunião.";
    var hasWa = !!waDigits(C.WHATSAPP);

    el.innerHTML =
      '<header class="hero' + (T.heroColorido ? " colorido" : "") + '"><img src="' + img(T.hero || "hero") + '" alt=""><div class="hero-in"><img class="logo" src="' + img("logo") + '" alt="Durães Fotografia">' +
      '<div class="kind spaced">Proposta de ' + esc(T.nome.toLowerCase()) + "</div>" +
      '<h1 class="script">' + (cliente ? esc(cliente) : "Para você") + "</h1>" + (meta ? '<div class="meta">' + meta + "</div>" : "") +
      '<a class="btn" href="#pacotes">Ver pacotes</a></div><div class="scroll-cue" aria-hidden="true"></div></header>' +

      '<section class="quote"><figure><img src="' + img(T.fotoFrase) + '" alt=""></figure><blockquote>' + esc(T.frase) + "</blockquote></section>" +

      '<section class="team"><img src="' + img(T.fotoEquipe || "tux") + '" alt=""><div class="wrap"><h2 class="script">Sobre nós</h2>' +
      "<p>Sou um fotógrafo profissional apaixonado por contar histórias através das minhas lentes.</p>" +
      "<p>Junto com minha equipe talentosa, buscamos capturar momentos especiais e transformá-los em memórias duradouras. Com anos de experiência e habilidades diversificadas, trabalhamos de forma colaborativa para garantir que cada projeto seja único e atenda às expectativas dos nossos clientes.</p>" +
      "<p>Estamos comprometidos em fornecer um serviço excepcional, buscando a essência de cada ocasião e expressando-a artisticamente. Esperamos ter a oportunidade de trabalhar com você e eternizar momentos preciosos juntos.</p>" +
      '<div class="members">' + team + "</div></div></section>" +

      '<section class="gallery"><div class="wrap"><div class="sec-head"><h2 class="script">Nosso olhar</h2><p>Alguns momentos que já eternizamos.</p></div><div class="masonry">' +
      T.galeria.map(function (k) { return '<img src="' + img(k) + '" alt="Foto de trabalho da Durães Fotografia" loading="lazy">'; }).join("") +
      "</div></div></section>" +

      '<section class="packages" id="pacotes"><div class="wrap"><div class="sec-head"><h2 class="script">Investimento</h2><p>' +
      (pks.length > 1 ? "Escolha o pacote que combina com o seu dia." : "O pacote pensado para o seu dia.") + "</p></div>" +
      '<div class="pk-grid n' + Math.min(Math.max(pks.length, 1), 3) + '">' + pkHtml + "</div>" +
      (d.nota ? '<p class="pay-note">' + esc(d.nota) + "</p>" : "") + "</div></section>" +

      partner +

      (T.depoimento === false ? "" : '<section class="testi"><figure><img src="' + img(T.fotoDepoimento || "couple") + '" alt=""></figure><div class="txt"><h2 class="script">Depoimento</h2><blockquote>' +
      "<p>Agradeço pelo seu trabalho e da equipe que se dedicou a noite toda pra tá ali registrando os momentos. Obrigada por fazer parte do meu sonho.</p>" +
      "<p>Vocês foram incríveis. Muito obrigada por tudo! Deus abençoe sempre o trabalho de vocês, e que venham muitos e muitos trabalhos na carreira de vocês. Sucesso sempre, porque vocês merecem!</p>" +
      "</blockquote><cite>" + esc(T.autorDepoimento || "Noiva atendida pela Durães Fotografia") + "</cite></div></section>") +

      '<section class="cta"><img src="' + img(T.fotoFinal || "party") + '" alt=""><div class="wrap"><h2 class="script">Pronto para eternizar o seu grande dia?</h2>' +
      "<p>Vamos marcar uma conversa para alinhar cada detalhe e tirar todas as dúvidas.</p>" +
      '<div class="btns"><a class="btn solid" href="' + esc(waLink(ctaMsg)) + '" target="_blank" rel="noopener">' + (hasWa ? ICON.wa + "Falar no WhatsApp" : ICON.ig + "Falar no Instagram") + "</a></div>" +
      '<img class="logo" src="' + img("logo") + '" alt="Durães Fotografia"><div class="sub">' + esc(T.subtitulo || "Fotografia de casamentos e eventos") + '</div>' +
      '<div class="socials"><a href="https://www.instagram.com/' + esc(C.INSTAGRAM) + '" target="_blank" rel="noopener">' + ICON.ig + "@" + esc(C.INSTAGRAM.toUpperCase()) + "</a>" +
      '<a href="https://www.facebook.com/' + esc(C.FACEBOOK) + '" target="_blank" rel="noopener">' + ICON.fb + "/" + esc(C.FACEBOOK.toUpperCase()) + "</a>" +
      (C.PORTFOLIO ? '<a href="' + esc(C.PORTFOLIO) + '" target="_blank" rel="noopener">' + ICON.pf + "PORTFÓLIO</a>" : "") + "</div>" +
      (d.validade ? '<div class="valid">Proposta válida até ' + esc(d.validade) + "</div>" : "") +
      "</div></section>";
  };
  window.renderUtil = { esc: esc, img: img, waDigits: waDigits };
})();
