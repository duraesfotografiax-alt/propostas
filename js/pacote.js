/* ===========================================================
   MONTE O SEU PACOTE — DURÃES FOTOGRAFIA
   O cliente escolhe os serviços e a cidade do evento na
   proposta; ao enviar, cai no WhatsApp com tudo listado.

   valor: preço do serviço (ex.: "800,00"). Deixe null para
          não mostrar preço daquele serviço.
   Se TODOS os serviços escolhidos tiverem valor, a proposta
   mostra o total estimado. Senão, mostra só a lista.
   =========================================================== */
window.MONTE = {
  origem: "Artur Nogueira",       // cidade de onde a equipe sai
  fatorEstrada: 1.25,             // linha reta x 1,25 ≈ distância por estrada

  // Taxa de deslocamento por distância (ida, aproximada)
  // taxa: "150,00" = valor | 0 = sem taxa | null = "a combinar"
  faixas: [
    { ate: 40,   taxa: 0 },
    { ate: 100,  taxa: null },
    { ate: 200,  taxa: null },
    { ate: 9999, taxa: null, consulta: true }   // acima disso: sob consulta
  ],

  servicos: {
    casamento: [
      { nome: "Fotografia da cerimônia", valor: null },
      { nome: "Fotografia da festa", valor: null },
      { nome: "Making of da noiva", valor: null },
      { nome: "Making of do noivo", valor: null },
      { nome: "Ensaio pré-wedding", valor: null },
      { nome: "Filmagem dos melhores momentos", valor: null },
      { nome: "Filmagem teaser", valor: null },
      { nome: "Filmagem completa", valor: null }
    ],
    civil: [
      { nome: "Fotografia do cartório", valor: null },
      { nome: "Ensaio após a cerimônia", valor: null },
      { nome: "Fotografia da comemoração", valor: null },
      { nome: "Filmagem dos melhores momentos", valor: null },
      { nome: "Filmagem teaser", valor: null }
    ],
    quinze: [
      { nome: "Fotografia da festa", valor: null },
      { nome: "Making of da debutante", valor: null },
      { nome: "Ensaio pré-15", valor: null },
      { nome: "Filmagem dos melhores momentos", valor: null },
      { nome: "Filmagem teaser", valor: null },
      { nome: "Filmagem completa", valor: null }
    ],
    infantil: [
      { nome: "Fotografia da festa", valor: null },
      { nome: "Ensaio temático", valor: null },
      { nome: "Filmagem dos melhores momentos", valor: null }
    ],
    evento: [
      { nome: "Fotografia do evento", valor: null },
      { nome: "Filmagem dos melhores momentos", valor: null },
      { nome: "Filmagem completa", valor: null },
      { nome: "Cobertura para redes sociais (stories no dia)", valor: null }
    ]
  }
};
