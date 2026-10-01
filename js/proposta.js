/* Página que o cliente abre: proposta.html?c=codigo-da-proposta */
(function () {
  var C = window.CONFIG, app = document.getElementById("app"), esc = window.renderUtil.esc;
  var slug = new URLSearchParams(location.search).get("c");

  function estado(msg, comBotao) {
    var wa = window.renderUtil.waDigits(C.WHATSAPP);
    app.innerHTML = '<div class="state"><div class="in"><img class="logo" src="img/logo.png" alt="Durães Fotografia"><p>' + esc(msg) + "</p>" +
      (comBotao ? '<a class="btn" href="' + (wa ? "https://wa.me/" + wa : "https://www.instagram.com/" + C.INSTAGRAM) + '" target="_blank" rel="noopener">Falar com a gente</a>' : "") +
      "</div></div>";
  }
  if (!slug) { estado("Este link está incompleto. Peça um novo link para a nossa equipe.", true); return; }
  if (!window.supabase || C.SUPABASE_URL.indexOf("http") !== 0) { estado("O site ainda não foi configurado (veja o LEIA-ME).", false); return; }

  var sb = window.supabase.createClient(C.SUPABASE_URL, C.SUPABASE_KEY);

  sb.auth.getSession().then(function (r) {
    var logado = !!(r.data && r.data.session);
    // Vocês logados: lê direto, sem contar visualização.
    // Cliente: usa a função pública, que conta a visualização.
    var req = logado
      ? sb.from("propostas").select("dados").eq("slug", slug).maybeSingle().then(function (x) { return { data: x.data && x.data.dados, error: x.error }; })
      : sb.rpc("ver_proposta", { p_slug: slug });
    return req.then(function (res) {
      if (res.error) throw res.error;
      if (!res.data) { estado("Não encontramos esta proposta. Fale com a gente que enviamos uma atualizada.", true); return; }
      window.renderProposta(app, res.data);
      if (logado) {
        var bar = document.createElement("div");
        bar.className = "admin-bar";
        bar.innerHTML = 'Visualização da equipe (não conta como visita) · <a href="index.html">Voltar ao painel</a>';
        document.body.appendChild(bar);
      }
    });
  }).catch(function () {
    estado("Não foi possível carregar a proposta agora. Verifique a internet e tente de novo.", true);
  });
})();
