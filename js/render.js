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
    mute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="m17 9 4 6M21 9l-4 6"/></svg>',
    som: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>',
    pf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-8 9"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z"/></svg>'
  };

  function parceriaCerimonial(CE, cliente) {
    var wa = waDigits(CE.whatsapp), ig = String(CE.instagram || "").replace(/^@/, "").trim();
    var msg = "Olá, " + CE.nome.split(" ")[0] + "! Vim pelo orçamento da Durães Fotografia" + (cliente ? " (" + cliente + ")" : "") + " e gostaria de saber mais sobre o cerimonial.";
    var tel = String(CE.whatsapp || "").replace(/\D/g, "").replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    return '<section class="cerim" id="parceria"><div class="wrap">' +
      '<div class="sec-head"><h2 class="script">Nossa parceria</h2><p>Durães Fotografia + ' + esc(CE.empresa) + "</p></div>" +
      '<div class="cerim-card"><figure><img src="' + img(CE.foto) + '" alt="Equipe da ' + esc(CE.empresa) + ' com os noivos"></figure>' +
      '<div class="cerim-txt"><div class="cerim-id"><img src="' + img(CE.logo) + '" alt="Logo ' + esc(CE.empresa) + '"><div><b>' + esc(CE.empresa) + "</b><span>Cerimonial com " + esc(CE.nome) + "</span></div></div>" +
      (CE.textos || []).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") +
      ((CE.destaques || []).length ? "<ul>" + CE.destaques.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" : "") +
      '<div class="cerim-contato">' + (tel ? "<span>WhatsApp " + esc(tel) + "</span>" : "") + (CE.email ? '<a href="mailto:' + esc(CE.email) + '">' + esc(CE.email) + "</a>" : "") +
      (ig ? '<a href="https://www.instagram.com/' + esc(ig) + '" target="_blank" rel="noopener">@' + esc(ig) + "</a>" : "") + "</div>" +
      (wa ? '<a class="btn dark" href="https://wa.me/' + wa + "?text=" + encodeURIComponent(msg) + '" target="_blank" rel="noopener">' + ICON.wa + "Falar com a " + esc(CE.nome.split(" ")[0]) + "</a>" : "") +
      "</div></div></div></section>";
  }

  /* ---------- Monte o seu pacote ---------- */
  function num(v) { return parseFloat(String(v == null ? "" : v).replace(/\./g, "").replace(",", ".")); }
  function brl(n) { return n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function semAcento(s) { return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim(); }
  function monteHtml(d, cliente) {
    var MO = window.MONTE; if (!MO || d.montar === false) return "";
    var lista = (MO.servicos || {})[d.modelo] || []; if (!lista.length) return "";
    return '<section class="monte" id="monte"><div class="wrap"><div class="sec-head"><h2 class="script">Monte o seu pacote</h2>' +
      "<p>Prefere algo do seu jeito? Escolha os serviços e a cidade do evento, e a gente monta a proposta para você.</p></div>" +
      '<div class="mo-card"><fieldset class="mo-svcs"><legend>O que você quer?</legend>' +
      lista.map(function (s, i) {
        var v = num(s.valor);
        return '<label class="mo-svc"><input type="checkbox" value="' + i + '"><span class="mo-box" aria-hidden="true"></span><span class="mo-n">' + esc(s.nome) + "</span>" +
          (isNaN(v) ? "" : '<span class="mo-v">R$ ' + esc(brl(v)) + "</span>") + "</label>";
      }).join("") + "</fieldset>" +
      '<div class="mo-city"><label for="mo-cidade">Cidade do evento</label><input id="mo-cidade" list="mo-cidades" autocomplete="off" placeholder="Digite a cidade (SP)"' + (d.local ? ' value="' + esc(d.local) + '"' : "") + '>' +
      '<datalist id="mo-cidades"></datalist><p class="mo-dist" id="mo-dist" aria-live="polite"></p></div>' +
      '<div class="mo-sum" id="mo-sum" aria-live="polite"></div>' +
      '<button class="btn dark mo-send" type="button" id="mo-send" disabled>' + ICON.wa + "Enviar para a Durães</button>" +
      '<p class="mo-note">Os valores são estimados. A equipe confirma tudo com você pelo WhatsApp.</p></div></div></section>';
  }
  function ligarMonte(el, d, cliente) {
    var MO = window.MONTE, sec = el.querySelector("#monte"); if (!sec || !MO) return;
    var lista = MO.servicos[d.modelo] || [], cid = window.CIDADES_SP || [];
    var input = sec.querySelector("#mo-cidade"), dl = sec.querySelector("#mo-cidades"), out = sec.querySelector("#mo-dist");
    var sum = sec.querySelector("#mo-sum"), btn = sec.querySelector("#mo-send");
    dl.innerHTML = cid.map(function (c) { return '<option value="' + esc(c[0]) + '">'; }).join("");
    var origem = cid.filter(function (c) { return c[0] === MO.origem; })[0];
    function km(c) {
      if (!origem || !c) return null;
      var R = 6371, r = Math.PI / 180, dLa = (c[1] - origem[1]) * r, dLo = (c[2] - origem[2]) * r;
      var a = Math.sin(dLa / 2) * Math.sin(dLa / 2) + Math.cos(origem[1] * r) * Math.cos(c[1] * r) * Math.sin(dLo / 2) * Math.sin(dLo / 2);
      return Math.round(2 * R * Math.asin(Math.sqrt(a)) * (MO.fatorEstrada || 1.25));
    }
    function cidade() { var n = semAcento(input.value); return cid.filter(function (c) { return semAcento(c[0]) === n; })[0] || null; }
    function faixa(k) { var f = MO.faixas || []; for (var i = 0; i < f.length; i++) if (k <= f[i].ate) return f[i]; return f[f.length - 1] || null; }
    function estado() {
      var sel = Array.prototype.slice.call(sec.querySelectorAll(".mo-svc input:checked")).map(function (i) { return lista[+i.value]; });
      var c = cidade(), k = c ? km(c) : null, fx = k == null ? null : faixa(k);
      var taxaTxt = "", taxaVal = 0, taxaOk = true;
      if (k != null && fx) {
        if (fx.consulta) { taxaTxt = "deslocamento sob consulta"; taxaOk = false; }
        else if (fx.taxa === 0) taxaTxt = "sem taxa de deslocamento";
        else if (fx.taxa == null || isNaN(num(fx.taxa))) { taxaTxt = "taxa de deslocamento a combinar"; taxaOk = false; }
        else { taxaVal = num(fx.taxa); taxaTxt = "taxa de deslocamento R$ " + brl(taxaVal); }
      }
      out.textContent = !input.value.trim() ? "" : !c ? "Escolha uma cidade da lista." :
        (k < 5 ? "Mesma cidade da nossa equipe · " : "Aprox. " + k + " km de " + MO.origem + " · ") + taxaTxt;
      var todosComValor = sel.length && sel.every(function (s) { return !isNaN(num(s.valor)); });
      var total = sel.reduce(function (t, s) { return t + (num(s.valor) || 0); }, 0) + taxaVal;
      sum.innerHTML = !sel.length ? "Escolha pelo menos um serviço." :
        "<b>" + sel.length + (sel.length > 1 ? " serviços escolhidos" : " serviço escolhido") + "</b>" +
        (todosComValor ? '<span class="mo-total">Total estimado: R$ ' + brl(total) + (k != null && !taxaOk ? " + deslocamento" : "") + "</span>" : "");
      btn.disabled = !sel.length;
      return { sel: sel, c: c, k: k, taxaTxt: taxaTxt, total: todosComValor ? total : null, taxaOk: taxaOk };
    }
    sec.addEventListener("change", estado); input.addEventListener("input", estado);
    btn.addEventListener("click", function () {
      var e = estado(); if (!e.sel.length) return;
      var msg = "Olá! Vim pela proposta da Durães Fotografia" + (cliente ? " (" + cliente + ")" : "") + " e montei o meu pacote:\n" +
        e.sel.map(function (s) { return "• " + s.nome; }).join("\n") +
        (d.data ? "\n\nData: " + d.data : "") +
        (e.c ? "\nCidade do evento: " + e.c[0] + (e.k >= 5 ? " (aprox. " + e.k + " km)" : "") : (input.value.trim() ? "\nCidade do evento: " + input.value.trim() : "")) +
        (e.total != null ? "\nValor estimado: R$ " + brl(e.total) + (e.c && !e.taxaOk ? " + deslocamento" : "") : "") +
        "\n\nPode montar o orçamento para mim?";
      window.open(waLink(msg), "_blank", "noopener");
    });
    estado();
  }

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
    var CE = window.CERIMONIALISTA;
    var MI = window.MIDIA || {}, temVideos = (MI.modelos || []).indexOf(d.modelo) > -1;
    var partner = (d.parceria === true && CE) ? parceriaCerimonial(CE, cliente) : (P.nome && P.nome.trim()) ?
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

      (temVideos && MI.trabalhos && MI.trabalhos.length ? '<section class="vids" data-vid><div class="wrap"><div class="sec-head"><h2 class="script">Nossos trabalhos em vídeo</h2><p>Toque em um vídeo para ouvir com som.</p></div><div class="reels">' +
        MI.trabalhos.map(function (v) {
          return '<div class="reel"><video data-src="videos/' + esc(v.arquivo) + '.mp4" poster="videos/' + esc(v.arquivo) + '.jpg" muted loop playsinline preload="none"></video><span class="rtag">' + esc(v.titulo || "") + '</span><span class="snd" aria-hidden="true">' + ICON.mute + "</span></div>";
        }).join("") + "</div></div></section>" : "") +

      '<section class="gallery"><div class="wrap"><div class="sec-head"><h2 class="script">Nosso olhar</h2><p>Alguns momentos que já eternizamos.</p></div><div class="masonry">' +
      T.galeria.map(function (k) { return '<img src="' + img(k) + '" alt="Foto de trabalho da Durães Fotografia" loading="lazy">'; }).join("") +
      "</div></div></section>" +

      '<section class="packages" id="pacotes"><div class="wrap"><div class="sec-head"><h2 class="script">Investimento</h2><p>' +
      (pks.length > 1 ? "Escolha o pacote que combina com o seu dia." : "O pacote pensado para o seu dia.") + "</p></div>" +
      '<div class="pk-grid n' + Math.min(Math.max(pks.length, 1), 3) + '">' + pkHtml + "</div>" +
      (d.nota ? '<p class="pay-note">' + esc(d.nota) + "</p>" : "") + "</div></section>" +

      monteHtml(d, cliente) +

      partner +

      (T.depoimento === false ? "" : (temVideos && MI.depoimentos && MI.depoimentos.length) ?
        '<section class="testi testi-v" data-vid><div class="wrap"><div class="sec-head"><h2 class="script">Depoimento' + (MI.depoimentos.length > 1 ? "s" : "") + '</h2><p>Quem viveu esse dia com a gente conta como foi.</p></div><div class="dep-grid n' + Math.min(MI.depoimentos.length, 3) + '">' +
        MI.depoimentos.map(function (k) { return '<video src="videos/' + esc(k) + '.mp4" poster="videos/' + esc(k) + '.jpg" controls playsinline preload="none"></video>'; }).join("") +
        "</div></div></section>" :
      '<section class="testi"><figure><img src="' + img(T.fotoDepoimento || "couple") + '" alt=""></figure><div class="txt"><h2 class="script">Depoimento</h2><blockquote>' +
      "<p>Agradeço pelo seu trabalho e da equipe que se dedicou a noite toda pra tá ali registrando os momentos. Obrigada por fazer parte do meu sonho.</p>" +
      "<p>Vocês foram incríveis. Muito obrigada por tudo! Deus abençoe sempre o trabalho de vocês, e que venham muitos e muitos trabalhos na carreira de vocês. Sucesso sempre, porque vocês merecem!</p>" +
      "</blockquote><cite>" + esc(T.autorDepoimento || "Noiva atendida pela Durães Fotografia") + "</cite></div></section>") +

      '<section class="cta"><img src="' + img(T.fotoFinal || "party") + '" alt=""><div class="wrap"><h2 class="script">Pronto para eternizar o seu grande dia?</h2>' +
      "<p>Vamos marcar uma conversa para alinhar cada detalhe e tirar todas as dúvidas.</p>" +
      '<div class="btns"><a class="btn solid" href="' + esc(waLink(ctaMsg)) + '" target="_blank" rel="noopener">' + (hasWa ? ICON.wa + "Falar no WhatsApp" : ICON.ig + "Falar no Instagram") + "</a></div>" +
      '<img class="logo" src="' + img("logo") + '" alt="Durães Fotografia"><div class="sub">' + esc(T.subtitulo || "Fotografia de casamentos e eventos") + '</div>' +
      '<div class="socials"><a href="https://www.instagram.com/' + esc(C.INSTAGRAM) + '" target="_blank" rel="noopener">' + ICON.ig + "@" + esc(C.INSTAGRAM.toUpperCase()) + "</a>" +
      '<a href="https://www.facebook.com/' + esc(C.FACEBOOK) + '" target="_blank" rel="noopener">' + ICON.fb + "/" + esc(C.FACEBOOK.toUpperCase()) + "</a>" +
      ((MI.portfolio || C.PORTFOLIO) ? '<a href="' + esc(MI.portfolio || C.PORTFOLIO) + '" target="_blank" rel="noopener">' + ICON.pf + "PORTFÓLIO</a>" : "") + "</div>" +
      (d.validade ? '<div class="valid">Proposta válida até ' + esc(d.validade) + "</div>" : "") +
      "</div></section>";
    ligarVideos(el);
    ligarMonte(el, d, cliente);
  };

  /* Vídeos: somem se o arquivo não existir; os de trabalhos tocam mudos ao aparecer
     e, ao tocar, ligam o som (pausando os outros). */
  function ligarVideos(el) {
    var todos = el.querySelectorAll("[data-vid] video");
    todos.forEach(function (v) {
      v.addEventListener("error", function () {
        var box = v.closest(".reel") || v;
        var sec = v.closest("[data-vid]");
        box.remove();
        if (sec && !sec.querySelector("video")) sec.remove();
      });
    });
    var reels = el.querySelectorAll(".reel video");
    function carregar(v) { if (!v.getAttribute("src") && v.dataset.src) v.src = v.dataset.src; }
    var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
      es.forEach(function (e) { var v = e.target; if (e.isIntersecting) { carregar(v); if (v.muted) v.play().catch(function () {}); } else v.pause(); });
    }, { threshold: 0.35 }) : null;
    reels.forEach(function (v) {
      if (io) io.observe(v); else carregar(v);
      v.parentNode.addEventListener("click", function () {
        var ligar = v.muted;
        todos.forEach(function (o) { if (o !== v) { o.muted = true; o.parentNode.classList && o.parentNode.classList.remove("on"); if (!o.closest(".reel")) o.pause(); } });
        carregar(v); v.muted = !ligar ? true : false;
        v.parentNode.classList.toggle("on", ligar);
        v.parentNode.querySelector(".snd").innerHTML = ligar ? ICON.som : ICON.mute;
        if (ligar) v.currentTime = 0;
        v.play().catch(function () {});
      });
    });
    el.querySelectorAll(".testi-v video").forEach(function (v) {
      v.addEventListener("play", function () { reels.forEach(function (r) { r.muted = true; r.parentNode.classList.remove("on"); r.parentNode.querySelector(".snd").innerHTML = ICON.mute; }); });
    });
  }
  window.renderUtil = { esc: esc, img: img, waDigits: waDigits };
})();
