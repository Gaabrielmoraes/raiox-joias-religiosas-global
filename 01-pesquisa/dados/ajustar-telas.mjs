// Ajustes pedidos pelo revisor (checks 9, 9c, 10): faturamento com selo, mix de formato, data do snapshot.
import fs from 'node:fs';
const rep = (f, a, b) => { const s = fs.readFileSync(f, 'utf8'); if (!s.includes(a)) { console.log('NAO ACHEI', f, a.slice(0, 70)); return; } fs.writeFileSync(f, s.split(a).join(b)); console.log('ok', f); };
const A = 'telas-a.mjs';
// ritmo: mix de formato
rep(A, "tr([td('Duplicação'), td(esc(l.cad.dup))]),", "tr([td('Duplicação'), td(esc(l.cad.dup))]), tr([td('Mix de formato'), td(esc(l.mix))]),");
// tráfego com data
rep(A, "stat({ v: esc(t.visitas), l: 'visitas/mês', d: 'medido em ' + esc(t.snapshot_coleta || '10/2026'), k: 'obs', src: 'SimilarWeb' }) +", "stat({ v: esc(t.visitas), l: 'Tráfego real (SimilarWeb · 10/2026)', d: 'coletado em ' + esc(t.snapshot_coleta || '11/10/2026'), k: 'obs', src: 'SimilarWeb · 10/2026' }) +");
// faturamento: bloco único com selo e investimento
rep(A, "sec('faturamento', '04', 'Faturamento e investimento', l.fat ? '<div class=\"grid g4\">' +\n      stat({ v: usd(l.fat), l: 'Faturamento mensal (central)', d: 'proxy: visitas x conversão do setor x ticket', k: 'inf' })",
  "sec('faturamento', '04', 'Faturamento estimado e investimento em mídia', l.fat ? '<div class=\"grid g4\">' +\n      stat({ v: usd(l.fat), l: 'Faturamento estimado mensal (central)', d: esc(l.metodoFat), k: 'inf' })");
rep(A, "note('Confiança: estimado incerto. Benchmark do setor", "note('<b>Selo de confiança do faturamento:</b> ' + esc(l.selo) + '.' + (l.visitas ? '' : ' Leia como teto de ordem de grandeza: com poucos anúncios ativos e redes pequenas, um número alto aqui indica review importado, não venda.') + ' <b>Investimento em mídia</b> = faturamento x ' + n(CPA_PCT_V, 2) + '% (CPA do setor). Benchmark do setor");
// central: faturamento por loja no ranking
rep(A, "['#', 'Loja', 'Ângulo', 'Ativos', 'Histórico', 'Visitas/mês', 'Ticket', 'Modelo', 'Momentum', 'Veredito'].map((t, i) => (i === 3 || i === 4 || i === 6) ? { t, num: true } : t)",
  "['#', 'Loja', 'Ângulo', 'Ativos', 'Histórico', 'Visitas/mês', 'Faturamento/mês (est.)', 'Ticket', 'Modelo', 'Momentum', 'Veredito'].map((t, i) => (i === 3 || i === 4 || i === 7) ? { t, num: true } : t)");
rep(A, "td(vis(l)), td(usd(l.ticket, 2), 'num'), td(esc(l.modelo)), td(esc(l.momento.split(':')[0])), td(pill(l.veredito, VER_CLS[l.veredito]))]))) +",
  "td(vis(l)), td(l.fat ? usd(l.fat) + ' <small>(' + (l.visitas ? 'visitas' : 'proxy de reviews, teto') + ')</small>' : na('sem base'), 'num'), td(usd(l.ticket, 2), 'num'), td(esc(l.modelo)), td(esc(l.momento.split(':')[0])), td(pill(l.veredito, VER_CLS[l.veredito]))]))) +");
// concorrentes: método por loja
rep(A, "td(l.fat ? 'visitas x conversão do setor x ticket ' + nat('inf') : 'não calculado: sem visitas não se estima receita')", "td(l.fat ? esc(l.metodoFat) + ' ' + nat('inf') : 'não calculado')");
rep(A, "td(l.fat ? usd(l.fat) : na('sem visitas medidas nesta coleta'), 'num')", "td(l.fat ? usd(l.fat) : na('sem base'), 'num')");
rep(A, "As outras não recebem número inventado: a escala delas está nos anúncios e nos reviews verificados.", "As outras usam o próximo degrau da cascata da skill, o proxy de reviews verificados (taxa de review de 1% a 3%), com selo \"estimado incerto\": é ordem de grandeza e teto, porque review importado infla o número (Worth Is You com 47 anúncios e $136 mil/mês é o caso mais suspeito).");
const B = 'telas-b.mjs';
rep(B, "td(l.fat ? usd(l.fat) : na('sem visitas nesta coleta'), 'num')", "td(l.fat ? usd(l.fat) + (l.visitas ? '' : ' <small>(proxy)</small>') : na('sem base'), 'num')");
rep(B, "note('Receita só é estimada quando há visitas medidas (só a Lainly nesta coleta). Para as outras, a escala está nos anúncios ativos, na longevidade e nos reviews verificados (Wavao 4.876, Worth Is You 996, Lunavere 355, Sugar Spring 342).', 'a', 'limite')", "note('Lainly: receita por visitas (SimilarWeb). Demais: proxy de reviews verificados (Wavao 4.876, Worth Is You 996, Lunavere 355, Sugar Spring 342) com taxa de 2%, faixa de 1% a 3% na ficha. É teto de ordem de grandeza, não caixa: review importado infla o número.', 'a', 'limite')");
