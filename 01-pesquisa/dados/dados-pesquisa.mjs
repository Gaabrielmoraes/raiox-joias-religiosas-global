// Dados consolidados da pesquisa (Joias religiosas de presente de família, US). Tudo veio das
// coletas em dados/*.json; o que não foi medido carrega o motivo.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const DADOS = path.dirname(fileURLToPath(import.meta.url));
export const RAIZ = path.dirname(DADOS);
const lerJson = f => { try { return JSON.parse(fs.readFileSync(path.join(DADOS, f), 'utf8')); } catch { return null; } };

export const build = lerJson('build.json');
export const matriz = lerJson('matriz-ativos.json');
export const bench = lerJson('benchmark-setor.json');
export const voz = lerJson('voz-mercado.json');
export const demanda = lerJson('demanda-termos.json');
export const anatomiaCr = lerJson('anatomia-criativos.json') || { criativos: [] };
export const manifesto = (() => { try { return JSON.parse(fs.readFileSync(path.join(RAIZ, 'paginas', 'criativos', 'manifesto.json'), 'utf8')); } catch { return { criativos: [] }; } })();

function trafego() {
  const out = {};
  for (const d of fs.readdirSync(DADOS)) if (d.startsWith('trafego-') && fs.statSync(path.join(DADOS, d)).isDirectory()) {
    const o = lerJson(path.join(d, 'trafego-similarweb.json'));
    if (o) for (const [k, v] of Object.entries(o)) if (v && v.status === 'OK') out[k] = v;
  }
  return out;
}
export const TRAF = trafego();
const numK = s => { if (!s) return null; const m = String(s).match(/([\d.]+)\s*([KM]?)/i); if (!m) return null; return Number(m[1]) * (m[2].toUpperCase() === 'M' ? 1e6 : m[2].toUpperCase() === 'K' ? 1e3 : 1); };

const CONV = 0.0186;      // IRP ago/2026, Fashion Clothing & Accessories (substituto de joias)
const CPA_PCT = 0.0906;

const base = [
  { slug: 'sugarspring', rev: 342, meses: 40, mix: 'imagem estática: 2 de 2 na extração e 2 dos 10 vencedores do mercado (cartão + caixa)', nome: 'Sugar Spring', dominio: 'sugarspring.co', lado: 'presente de família', modelo: 'DROPSHIP DE MARCA', veredito: 'MODELAR', nivel: 'INICIANTE', score: 11, defens: 'CONSTRUÍVEL', eixos: [2, 2, 2, 2, 1, 2],
    pageIds: ['110433308214219'], ativos: 40, historico: 40, desde: '2023-06-12', plataforma: 'Shopify', apps: 'Klaviyo, Loox, Pinterest, TikTok, ShineOn, teelaunch', social: '@officialsugarspringco, 79 mil seguidores', google: 'anuncia no Google',
    campeao: { titulo: 'To My Granddaughter - Forever Love Gift Set - SS523', preco: 59.95, de: 97, url: 'https://sugarspring.co/products/to-my-granddaughter-forever-love-gift-set-ss523', img: 'prints/sugarspring-campeao.jpg' },
    ticket: 59.95, catalogo: '250+ produtos (mediana $79,95, faixa $39,99 a $240): colares com cartão "To My Daughter / Granddaughter / Son", carteiras, mantas; inclui "To My Son, Artisan Cross on Cuban Link Chain"', fornecedorSinal: 'vendor do produto = "ShineOn Fulfillment"; teelaunch também no código; envia da Flórida, Nevada ou Michigan em 5 a 7 dias úteis',
    momento: 'estável há 3 anos: anúncio "This says it all" no ar desde 12/06/2023 (1.218 dias); sobe 1 a 3 criativos novos por semana e mantém os vencedores',
    angulos: ['This says it all. 💖', 'A Special Gift Every Granddaughter Will Love 💝', 'A Gift That Bridges the Distance 💝', 'Imagine His Priceless Smile Opening This 🥺', 'Every Dad Deserves Love & Appreciation'],
    anatomia: { big: 'Às vezes uma avó não acha as palavras: o cartão diz tudo por ela.', mec: 'Cartão de mensagem longo e emocional preso ao colar, numa caixa pronta; troca da assinatura ("Love, Grandma") no checkout.', hook: '"Sometimes as a grandmother, it\'s hard to put into words how we feel. This says it all."', presell: 'Não achado: direto à PDP.', obj: '"Vai chegar a tempo?" e "vai desbotar?", respondidas com envio dos EUA, data estimada de entrega na PDP e "never fade, rust or tarnish".' },
    cad: { dia: '~1 a 3 anúncios novos por semana (40 anúncios entre jun/2023 e out/2026)', sem: '~22 títulos distintos', dup: '~1,8x (testa mensagem, quase não duplica)', lon: '1.218 dias (desde 12/06/2023)', top: [['This says it all. 💖', '1.218 dias'], ['A Special Gift Every Granddaughter Will Love 💝', '409 dias'], ['A Gift That Bridges the Distance 💝', '399 dias']] },
    frete: 'grátis; produzido e enviado dos EUA (FL, NV, MI), 5 a 7 dias úteis + 3 a 5 dias de produção do personalizado', garantia: '"30 Day 100% Happiness Guarantee": reposição ou reembolso', prazo: 'data estimada de entrega na PDP; BNPL: Shop Pay, PayPal, Klarna/Affirm não confirmados', retorno: 'personalizado não aceita devolução; troca/reembolso por defeito; cancelamento em 24 h',
    reviews: '342 reviews verificados (piso, 12 produtos, Loox)', fraude: 'A PDP diz "OVER 355,000+ GIFTS DELIVERED" e "13,000+ 5-star store reviews"; o JSON-LD verificável soma 342. Alegação não verificada: não copie.',
    oQueCopiar: 'O formato inteiro: cartão de mensagem como foto principal, assinatura editável, caixa de mogno com LED como upgrade de +$20, data estimada de entrega na PDP e fornecedor que envia dos EUA. Falta a fé: é isso que a sua loja acrescenta.',
    naoObtido: [['Visitas', 'SimilarWeb bloqueou o IP por excesso de consultas (CloudFront) nesta coleta', 'trafego.js com 5 tentativas e pausas de 4 min'], ['Custo da ShineOn', 'tabela de preço só para lojista logado', 'WebSearch'], ['Histórico de anúncios separado', 'ALL = ACTIVE = 40', 'page_id com ACTIVE e ALL']] },
  { slug: 'worthisyou', rev: 996, meses: 22, mix: 'imagem estática: 2 de 2 na extração (cartão + caixa)', nome: 'Worth Is You', dominio: 'worthisyou.com', lado: 'presente de família', modelo: 'DROPSHIP DE MARCA', veredito: 'MODELAR', nivel: 'INICIANTE', score: 10, defens: 'CONSTRUÍVEL', eixos: [2, 2, 2, 2, 1, 1],
    pageIds: ['336902736169734'], ativos: 47, historico: 47, desde: '2024-12-07', plataforma: 'Shopify', apps: 'Loox, Pinterest, Bold', social: '@worthisyou, 1,2 mil seguidores', google: 'anuncia no Google',
    campeao: { titulo: 'To My Bonus Daughter - "My Family Forever" Love Knot Necklace Gift Set', preco: 59.95, de: null, url: 'https://worthisyou.com/products/to-my-bonus-daughter-my-family-forever-love-knot-necklace-gift-set-bd06v3', img: 'prints/worthisyou-campeao.jpg' },
    ticket: 59.95, catalogo: '73 produtos (mediana $79,95): kits "To My Grandson / Son, Artisan Cross Cuban Link Chain" ($64,95), "To My Bonus Daughter", "Daughter-in-Law"', fornecedorSinal: '"Made with Love in Florida": produção nos EUA (mesmo produto "Artisan Cross Cuban Link Chain" da Sugar Spring, sinal de catálogo de impressão sob demanda)',
    momento: 'crescendo: 47 anúncios desde junho/2026, todos ainda no ar; nicho dentro do nicho: família recomposta ("bonus daughter", "step-up dad")',
    angulos: ['Not "like" a daughter. She is one.', 'For the daughter I chose and who chose me right back.', 'Different blood. Same love.', 'With Love, Your Step-Up Dad ♥️', 'No birthday. No holiday. Just because.'],
    anatomia: { big: 'Família não é sangue: é escolha.', mec: 'Cartão com mensagem para relações que quase nenhuma loja reconhece (enteada, nora, "pai de coração").', hook: 'Frase curta que nomeia a relação: "Not \'like\' a daughter. She is one."', presell: 'Não achado.', obj: '"Ela vai entender que é sério?", respondida pela própria mensagem do cartão.' },
    cad: { dia: '~0,4 por dia (47 anúncios em 4 meses, em 4 lotes)', sem: '~13 títulos distintos', dup: '~3,6x', lon: '121 dias (desde 12/06/2026)', top: [['This one hits hard. 💔', '121 dias'], ['For the daughter I chose and who chose me right back.', '121 dias'], ['Made with Love in Florida', '121 dias']] },
    frete: 'não lido nesta rodada', garantia: 'não lida nesta rodada', prazo: 'produção nos EUA (Flórida); BNPL não detectado', retorno: 'não lido nesta rodada',
    reviews: '996 reviews verificados (piso, 12 produtos, Loox)', fraude: 'nenhuma alegação numérica encontrada nos anúncios lidos.',
    oQueCopiar: 'O kit "To My Grandson, cruz em corrente cubana" a $64,95 (o cruzamento exato de fé + família) e a ideia de nomear relações esquecidas (madrinha, enteada, nora).',
    naoObtido: [['Visitas', 'SimilarWeb bloqueou o IP (CloudFront)', 'trafego.js'], ['Política de frete e troca', 'não lida nesta rodada', 'WebFetch não executado'], ['Histórico separado', 'ALL = ACTIVE = 47', 'page_id com ACTIVE e ALL']] },
  { slug: 'wavao', rev: 4876, meses: 27, mix: 'imagem estática: 11 de 11 na extração (pulseira + cartão)', nome: 'Wavao', dominio: 'wavao.com', lado: 'fé + ocasião + família', modelo: 'DROPSHIP PURO', veredito: 'MODELAR', nivel: 'INICIANTE', score: 10, defens: 'ARBITRAGEM', eixos: [2, 1, 2, 2, 2, 1],
    pageIds: ['111282690578976'], ativos: 176, historico: 1179, desde: '2024-06-24', plataforma: 'Shopify', apps: 'Loox, Vitals, Snap, TikTok', social: 'nenhum perfil achado no site', google: 'não encontrado no Google Ads',
    campeao: { titulo: 'Religious Graduation Gift for Him – 5th Grade to College Gift with Card', preco: 21.95, de: 32.95, url: 'https://www.wavao.com/products/religious-graduation-gift-for-him-5th-grade-to-college-gift-with-card', img: 'prints/wavao-campeao.jpg' },
    ticket: 26.36, catalogo: '250+ produtos (mediana $26,36): pulseiras e colares com cartão para neto, filho, irmã ("Sisters in Christ"), formatura; também camisetas, carteiras e enfeite de luto', fornecedorSinal: 'catálogo largo e barato de fornecedor asiático (pulseiras de pedra + cartão + caixa), "Frequently Bought Together" na PDP',
    momento: 'em teste: 1.179 anúncios no histórico, 15% no ar; rajada de dezenas de anúncios em 45 min em 10/10/2026',
    angulos: ['Religious Graduation Gift for Him – 5th Grade to College Gift with Card', 'To My Sister - A Sister In Christ Is A Sister for Life - Religious Cross Bracelet', 'To My GrandSon - You Will Never Lose - Baseball', 'To My Son - Never Forget How Much I Love You - Dog Tag', 'Cross Bracelet for Women & Girls - Symbol of Faith & Love'],
    anatomia: { big: 'Uma oração de presente para cada etapa da vida dele.', mec: 'Pulseira "triple-blessed" de pedras naturais + cartão com mensagem de formatura + caixa.', hook: '"Blessed to watch him grow 🙏" com a dica: escreva sua oração no cartão.', presell: 'Não achado.', obj: 'Preço, respondido com $21,95 e kit "compre junto".' },
    cad: { dia: 'rajada: dezenas de anúncios criados em ~45 min em 10/10/2026', sem: '~12 títulos na amostra de 50', dup: '~4x', lon: '60 dias (desde 12/08/2026)', top: [['To My Granddaughter - Rest Of My Life - Blossom Knot Bracelet', '60 dias'], ['Memorial Ornament - Sleeping Angel-Wing Butterfly', '60 dias'], ['Religious Graduation Gift for Him', '2 dias (lançamento)']] },
    frete: 'não lido nesta rodada', garantia: '"24-hour response guarantee" na PDP', prazo: 'não declarado; BNPL não detectado', retorno: 'não lido nesta rodada',
    reviews: '4.876 reviews verificados (piso, 12 produtos, Loox), loja de jun/2024', fraude: '4.876 reviews em 28 meses é plausível para catálogo de 250 produtos, mas o Loox permite importar: tratar como sinal médio.',
    oQueCopiar: 'A largura de ocasiões com fé (formatura, irmã em Cristo, neto, luto) e o cartão com espaço para a oração de quem dá. Não copiar o catálogo de 250 itens nem o preço de $21,95, que não paga anúncio frio.',
    naoObtido: [['Visitas', 'SimilarWeb bloqueou o IP (CloudFront)', 'trafego.js com 5 tentativas'], ['Política de frete', 'não lida', 'WebFetch não executado'], ['Perfil social', 'nenhum link no HTML', 'coletar.mjs']] },
  { slug: 'lainly', rev: null, meses: 13, mix: 'vídeo: 8 de 8 na extração (UGC de presente)', nome: 'Lainly', dominio: 'lainly.com', lado: 'fé (autocompra e presente)', modelo: 'DROPSHIP DE MARCA', veredito: 'MODELAR', nivel: 'INICIANTE', score: 10, defens: 'CONSTRUÍVEL', eixos: [2, 1, 2, 2, 2, 1],
    pageIds: ['404837506046234'], ativos: 447, historico: 447, desde: '2025-08-26', plataforma: 'Shopify', apps: 'Klaviyo, Clarity, Bold, Snap, TikTok', social: '@lainlybrand, 31 mil seguidores', google: 'anuncia no Google',
    campeao: { titulo: 'Crown Cross Necklace', preco: 39.99, de: null, url: 'https://lainly.com/products/cross-crown-necklace', img: 'prints/lainly-campeao.jpg' },
    ticket: 39.99, catalogo: '64 produtos (mediana $39,99): colares de cruz com pérola, coroa, inicial, pedra do mês; 22 itens religiosos', fornecedorSinal: 'endereço comercial é caixa postal (Rio Rancho, NM); entrega de 7 a 15 dias úteis, típico de envio da China',
    momento: 'estável/crescendo: anúncio de presente "She\'ll Cherish This Forever" no ar há 387 dias; 447 ativos (470 em 09/10)',
    angulos: ['She\'ll Cherish This Forever', 'BUY 1 GET 2 FREE', 'Free Matching Bracelet'],
    anatomia: { big: 'Um presente de fé que ela nunca vai esquecer.', mec: 'Cruz + coroa em aço banhado, à prova d\'água, garantia vitalícia.', hook: '"She won\'t expect it, but she\'ll never forget it"', presell: 'Não achado: direto à PDP com "compre 1 leve 3" e contador.', obj: '"Vai esverdear?", respondida num FAQ sob o botão.' },
    cad: { dia: 'rajada: 50 anúncios criados no mesmo minuto em 04/10/2026', sem: '1 título na amostra de 50', dup: '~50x na amostra', lon: '387 dias (desde 18/09/2025)', top: [['She\'ll Cherish This Forever', '387 dias'], ['Free Matching Bracelet', '280 dias'], ['BUY 1 GET 2 FREE', '270 dias']] },
    frete: 'grátis; 2 a 5 dias de processamento + 7 a 15 dias úteis', garantia: 'garantia vitalícia contra escurecer/quebrar', prazo: '9 a 20 dias no total (vale a pena para presente com data só pedindo cedo)', retorno: '30 dias',
    reviews: 'contagem verificada não obtida; PDP alega "15,356 reviews"', fraude: 'A PDP diz "Loved by 87,000+ Christian Women" com a loja aberta em ago/2025. Não verificável: não copie.',
    oQueCopiar: 'O ângulo "she\'ll never forget it" e a pulseira combinando como brinde. O prazo de 9 a 20 dias é o ponto fraco para presente com data: é onde a sua loja ganha com envio dos EUA.',
    naoObtido: [['Visitas atuais', 'SimilarWeb bloqueou o IP hoje; usado o número de 09/10/2026', 'trafego.js'], ['Reviews verificados', 'sem JSON-LD', 'reviews.mjs'], ['Histórico separado', 'ALL = ACTIVE; INACTIVE = 0', 'page_id']] },
  { slug: 'lunavere', rev: 355, meses: 11, mix: 'vídeo: 5 de 5 na extração (depoimento em 1ª pessoa)', nome: 'Lunavere', dominio: 'lunavere.com', lado: 'fé (presente para ela)', modelo: 'DROPSHIP DE MARCA', veredito: 'MODELAR', nivel: 'MÉDIO', score: 8, defens: 'CONSTRUÍVEL', eixos: [2, 1, 1, 1, 1, 2],
    pageIds: ['331681860036240'], ativos: 190, historico: 748, desde: '2025-10-31', plataforma: 'Shopify', apps: 'Loox, Klarna, Shop Pay, UpCart, Clarity', social: '@trylunavere, 3,6 mil seguidores', google: 'não encontrado no Google Ads',
    campeao: { titulo: 'Pearl of Grace Necklace', preco: 60, de: 120, url: 'https://lunavere.com/products/pearl-of-grace-necklace', img: 'prints/lunavere-campeao.jpg' },
    ticket: 50, catalogo: '39 produtos (mediana $50): colares, brincos e anéis de cruz com pérola; versículo 2 Coríntios 12:9 na copy', fornecedorSinal: 'catálogo curto de joia delicada genérica com marca própria; quiz na página de entrada',
    momento: 'crescendo: 25% do que testou segue no ar; ~7 anúncios novos por dia na última semana',
    angulos: ['Grab the Perfect Gift for her in the Spring Sale 🤍', 'Final chance: Buy 1 Get 1 FREE 🤍', 'Grab the Perfect 4 Gifts for her 🤍', 'Final chance: Build your 4 piece stack 🤍 Save 50%+'],
    anatomia: { big: 'A joia de fé que faz todo mundo perguntar onde você comprou.', mec: 'Cruz com pérolas inspirada em 2 Coríntios 12:9, para usar sem tirar.', hook: 'Depoimento em vídeo: "I was at service a few weeks ago, and the woman behind me had the most gorgeous pearl and cross necklace..."', presell: 'Quiz ("lunavere-quiz") antes da PDP em parte dos anúncios.', obj: 'Preço de $60, respondido com "compre 1 leve 1" e kit de 4 peças.' },
    cad: { dia: '~7 por dia (50 anúncios entre 02/10 e 09/10/2026)', sem: '5 títulos na amostra', dup: '~10x', lon: '103 dias (desde 30/06/2026)', top: [['Grab the Perfect Gift for her in the Spring Sale 🤍', '103 dias'], ['Final chance: Buy 1 Get 1 FREE 🤍', '9 dias'], ['Grab the Perfect 4 Gifts for her 🤍', '2 dias']] },
    frete: 'não lido nesta rodada', garantia: 'não lida', prazo: 'não lido; BNPL: Klarna e Shop Pay', retorno: 'não lido',
    reviews: '355 reviews verificados (piso, 12 produtos, Loox)', fraude: 'nenhuma alegação numérica encontrada.',
    oQueCopiar: 'O depoimento "vi na igreja e perguntei onde comprou" (prova social dentro do contexto da fé) e o preço de $60 com âncora de $120. Pede vídeo em 1ª pessoa e mais verba: nível médio.',
    naoObtido: [['Visitas', 'SimilarWeb bloqueou o IP (CloudFront)', 'trafego.js'], ['Política de frete e troca', 'não lida', 'WebFetch não executado'], ['Anúncios no Google', 'não encontrado', 'gads-transparency.js']] },
];

export const LOJAS = base.map(l => {
  const t = TRAF[l.dominio] || null;
  const visitas = t ? numK(t.visitas) : null;
  const sobrev = l.historico && l.historico !== l.ativos ? l.ativos / l.historico * 100 : null;
  let fat = null, fatMin = null, fatMax = null, metodoFat = null, selo = null;
  if (visitas) { fat = visitas * CONV * l.ticket; fatMin = fat * 0.5; fatMax = fat * 1.5; metodoFat = 'visitas x conversão do setor (' + (CONV * 100).toFixed(2) + '%) x ticket'; selo = 'estimado incerto (visitas medidas, conversão e ticket aplicados)'; }
  else if (l.rev) { const m = r => l.rev / r * l.ticket / l.meses; fat = m(0.02); fatMin = m(0.03); fatMax = m(0.01); metodoFat = 'proxy de reviews: ' + l.rev + ' reviews verificados ÷ 1% a 3% de taxa de review x ticket ÷ ' + l.meses + ' meses de loja'; selo = 'estimado incerto (proxy de reviews; reviews podem ter sido importados pelo Loox, o que infla o número)'; }
  return { ...l, traf: t, visitas, sobrev, fat, fatMin, fatMax, metodoFat, selo, midiaMes: fat ? fat * CPA_PCT : null };
});

// Economia por pedido da Given in Grace. Custos são ESTIMATIVA (sem cotação da plataforma).
export const ECON = (() => {
  const core = 49.95, custo = 16, frete = 0, taxa = core * 0.04, cpaCons = 22, cpaIrp = core * CPA_PCT;
  const bump = 14.95, bumpCusto = 4, bumpAceite = 0.30;
  const ups = 24.95, upsCusto = 6, upsAceite = 0.12;
  const aov = core + bump * bumpAceite + ups * upsAceite;
  const custoEsc = custo + bumpCusto * bumpAceite + upsCusto * upsAceite + aov * 0.04;
  const kit = core + bump, kitCusto = custo + bumpCusto;
  return {
    core, custo, frete, taxa, cpaCons, cpaIrp,
    margemCoreCons: core - custo - taxa - cpaCons,
    bump, bumpCusto, bumpAceite, ups, upsCusto, upsAceite, aov, custoEsc,
    margemEscCons: aov - custoEsc - cpaCons,
    margemEscIrp: aov - custoEsc - aov * CPA_PCT,
    kit, kitCusto, margemKitCons: kit - kitCusto - kit * 0.04 - cpaCons,
    cpaEquilibrioCore: core - custo - taxa,
  };
})();

// Calendário de datas de presente (EUA). order-by = pedir até esta data para chegar a tempo.
export const CALENDARIO = [
  ['Natal', '25/12/2026', 'teste a partir de 01/11; order-by 10/12 (envio dos EUA) ou 25/11 (envio da China)', 'avó→neta, avó→neto, filhos→mãe', 'Pearl Cross Gift Set, Grandson Cross Chain, Guardian Angel'],
  ['Black Friday / Cyber Monday', '27/11 e 30/11/2026', 'oferta de caixa LED grátis em vez de desconto no colar', 'compra antecipada de Natal', 'todos + caixa LED'],
  ['Páscoa', '28/03/2027', 'order-by 15/03', 'avó→neta, madrinha→afilhada', 'Pearl Cross, Goddaughter Cross'],
  ['Primeira Comunhão', 'abril e maio de 2027', 'order-by 3 semanas antes da cerimônia', 'madrinha→afilhada, avós', 'Goddaughter Cross Keepsake'],
  ['Dia das Mães', '09/05/2027', 'order-by 26/04', 'filhos→mãe, netos→avó', 'Guardian Angel Necklace'],
  ['Formatura', 'maio e junho de 2027', 'order-by 3 semanas antes', 'avós→neto, pais→filho', 'Grandson Cross Chain'],
  ['Dia dos Pais', '20/06/2027', 'order-by 06/06', 'filhos→pai (linha "for him", fase 2)', 'Grandson/Son Cross Chain'],
  ['Dia dos Avós (EUA)', '12/09/2027', 'order-by 29/08', 'netos→avós (inverte o presente)', 'Matching Cross Bracelet'],
  ['Batizado e luto', 'o ano todo', 'sem data fixa: é o que segura as vendas entre as datas', 'madrinha→afilhada; amigos→quem perdeu alguém', 'Goddaughter Keepsake, Memorial Angel Wing Cross'],
];

export const CONV_PCT = CONV * 100;
export const CPA_PCT_V = CPA_PCT * 100;
