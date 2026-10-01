/* ===========================================================
   MODELOS DE PROPOSTA
   Cada modelo tem: nome, fotos e pacotes padrão.
   Os valores aqui são só o PONTO DE PARTIDA: em cada proposta
   vocês podem mudar tudo antes de gerar o link.
   As fotos ficam na pasta img/ (use o nome do arquivo sem .jpg).
   =========================================================== */
window.MODELOS = {
  civil: {
    nome: "Casamento civil",
    frase: "Queremos emocioná-los contando a história do dia mais importante das suas vidas.",
    fotoFrase: "civ_quote",
    subtitulo: "Fotografia de casamentos",
    galeria: ["civ_a", "civ_d", "civ_b", "pre_a", "civ_c", "civ_e", "pre_b", "pre_c"],
    fotosPacotes: ["civ_d", "civ_e", "civ_b"],
    nota: "Todos os pacotes podem ser parcelados em até 3x sem juros. Seria maravilhoso marcarmos uma reunião para eu mostrar como posso deixar o seu dia ainda mais especial e tirar todas as dúvidas da proposta.",
    pacotes: [
      { nome: "Wedding Light", sub: "Eternizando momentos",
        itens: ["Cobertura da cerimônia civil", "Fotos entregues em suporte digital"],
        inclusos: ["1 ou 2 fotógrafos", "Fotos ilimitadas", "Fotos com edição e tratamento premium", "Todas as fotos por link, com download em alta resolução"],
        valor: "298,98", parcelas: "Até 3x sem juros", destaque: false },
      { nome: "Wedding Premium", sub: "Eternizando momentos",
        itens: ["Cobertura completa do cartório", "Filmagem dos melhores momentos", "Fotos e vídeo entregues em suporte digital"],
        inclusos: ["1 fotógrafo", "1 videomaker", "Fotos ilimitadas", "Fotos com edição e tratamento premium", "Todas as fotos por link, com download em alta resolução"],
        valor: "398,98", parcelas: "Até 3x sem juros", destaque: true }
    ]
  },

  casamento: {
    nome: "Casamento",
    frase: "Queremos emocioná-los contando a história do dia mais importante das suas vidas.",
    fotoFrase: "pro_quote",
    subtitulo: "Fotografia de casamentos",
    galeria: ["w_a", "m_b", "w_b", "m_a", "w_c", "bride", "m_d", "w_d", "m_c", "m_e", "pre_a", "pre_b"],
    fotosPacotes: ["bride", "w_c", "m_b"],
    nota: "Todos os pacotes podem ser parcelados em até 6x sem juros. Seria maravilhoso marcarmos uma reunião para eu mostrar como posso deixar o seu dia ainda mais especial e tirar todas as dúvidas da proposta.",
    pacotes: [
      { nome: "Pacote Light", sub: "Eternizando momentos",
        itens: ["Fotografia da cerimônia", "Fotografia da festa", "Making of da noiva e do noivo", "Filmagem dos melhores momentos"],
        inclusos: ["1 fotógrafo", "2 videomakers", "Fotos e vídeo com edição e tratamento premium", "Fotos e vídeo enviados por link, com download em alta resolução"],
        valor: "3.520,98", parcelas: "Até 6x sem juros", destaque: true }
    ]
  },

  evento: {
    nome: "Evento",
    frase: "Queremos emocionar você contando a história de um dia que merece ser lembrado para sempre.",
    fotoFrase: "pre_c",
    autorDepoimento: "Cliente atendida pela Durães Fotografia",
    galeria: ["party", "q_a", "i_c", "pre_a", "q_g", "w_c", "i_d", "pre_b"],
    fotosPacotes: ["party", "pre_a", "m_b"],
    nota: "Todos os pacotes podem ser parcelados sem juros. Seria maravilhoso marcarmos uma reunião para eu mostrar como posso deixar o seu dia ainda mais especial e tirar todas as dúvidas da proposta.",
    pacotes: [
      { nome: "Cobertura do evento", sub: "Eternizando momentos",
        itens: ["Fotografia do evento", "Fotos entregues em suporte digital"],
        inclusos: ["1 fotógrafo", "Fotos com edição e tratamento premium", "Todas as fotos por link, com download em alta resolução"],
        valor: "", parcelas: "Até 3x sem juros", destaque: true }
    ]
  },

  quinze: {
    nome: "15 anos",
    frase: "Vamos eternizar a magia e a alegria de um dos momentos mais inesquecíveis da sua vida, criando memórias que durarão para sempre.",
    hero: "q_hero", heroColorido: true,
    fotoFrase: "q_d",
    fotoEquipe: "q_m",
    fotoDepoimento: "q_k",
    fotoFinal: "q_j",
    autorDepoimento: "Cliente atendida pela Durães Fotografia",
    subtitulo: "Fotografia de debutante",
    galeria: ["q_a", "q_g", "q_b", "q_n", "q_d", "q_f", "q_c", "q_h", "q_e", "q_i", "q_k", "q_l"],
    fotosPacotes: ["q_o", "q_c", "q_e"],
    nota: "Todos os pacotes podem ser parcelados em até 6x sem juros. Seria maravilhoso marcarmos uma reunião para eu mostrar como posso deixar o seu dia ainda mais especial e tirar todas as dúvidas da proposta.",
    pacotes: [
      { nome: "Day Premium", sub: "Eternizando momentos",
        itens: ["Fotografia completa da festa", "Making of da debutante", "Fotos entregues em suporte digital"],
        inclusos: ["2 fotógrafos", "Fotos ilimitadas", "Fotos com edição e tratamento premium"],
        valor: "1.558,98", parcelas: "Até 6x sem juros", destaque: true }
    ]
  },

  infantil: {
    nome: "Aniversário infantil",
    frase: "Cada sorriso, cada descoberta, cada pedacinho da festa: vamos eternizar esse dia para vocês reviverem sempre.",
    hero: "i_a", heroColorido: true,
    cor: "#86664F",
    fotoFrase: "i_b",
    fotoEquipe: "i_e",
    depoimento: false,
    fotoFinal: "i_e",
    subtitulo: "Eternizando momentos",
    galeria: ["i_a", "i_c", "i_d", "i_b", "i_e"],
    fotosPacotes: ["i_c", "i_d", "i_b"],
    nota: "Todos os pacotes podem ser parcelados em até 3x sem juros. Seria maravilhoso marcarmos uma reunião para eu mostrar como posso deixar o dia ainda mais especial e tirar todas as dúvidas da proposta.",
    pacotes: [
      { nome: "Day Light", sub: "Eternizando momentos",
        itens: ["Fotografia da festa", "Fotos entregues em suporte digital"],
        inclusos: ["Cobertura do evento por 4 horas", "1 fotógrafo", "Todas as fotos por link, em alta resolução"],
        valor: "540,20", parcelas: "Até 3x sem juros", destaque: false },
      { nome: "Day Premium", sub: "Eternizando momentos",
        itens: ["Fotografia", "Filmagem", "Fotos e vídeo entregues em suporte digital"],
        inclusos: ["Cobertura do evento por 4 horas", "1 fotógrafo", "1 videomaker", "Todas as fotos por link, em alta resolução"],
        valor: "658,90", parcelas: "Até 3x sem juros", destaque: true }
    ]
  }
};

/* Campos opcionais de cada modelo (se faltar, usa o padrão):
   hero, heroColorido, fotoEquipe, fotoDepoimento, fotoFinal,
   depoimento (false esconde), autorDepoimento, subtitulo, cor */
