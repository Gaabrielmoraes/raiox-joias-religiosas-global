// Converte a lista do coletar.mjs no formato que os revisores leem (lojas[] + decisao_mercado).
import fs from 'node:fs';
import { LOJAS } from './dados-pesquisa.mjs';
const raw = JSON.parse(fs.readFileSync('coleta-bruta/dados-brutos.json', 'utf8'));
const lista = Array.isArray(raw) ? raw : Object.values(raw);
const porDom = Object.fromEntries(lista.map(r => [r.dominio, r.coleta ? r.coleta : r]));
const TRIAGEM = { 'veinci.com': 'FORA DO ESCOPO (joia genérica; só 2 itens religiosos; anúncio em 1ª pessoa de avó vale como estudo)', 'atmastore.com': 'FORA DO ESCOPO (joia genérica)', 'theasteria.co': 'FORA DO ESCOPO (vende para a África do Sul, em rand)', 'almagems.com': 'CONTEXTO (presente de família sob demanda, 1.967 ativos, não religiosa, catálogo de piadas)', 'inifis.com': 'NÃO QUALIFICADA (cartão de família sem fé; 31 ativos)', 'avera-paris.com': 'FORA DO ESCOPO (49, não religiosa)', 'lustravera.com': 'NÃO QUALIFICADA (14 produtos, 1 religioso, loja de nov/2025)', 'taanaajewelry.com': 'NÃO LIDA (fora da Shopify; cruz com asas de anjo como presente)', 'kuevo-liora.com': 'NÃO QUALIFICADA (cartão de família sem fé)', 'myheartgift.com': 'FORA DO ESCOPO (medalhão de pet)', 'findagoodgift.com': 'NÃO QUALIFICADA (cartão de família sem fé, CJ/Printful)', 'sugarsmiles.co': 'NÃO QUALIFICADA (cartão de família sem fé)', 'hello-arlo.com': 'FORA DO ESCOPO (joia de avó sem fé, advertorial)' };
const out = {
  coletado_em: '2026-10-09', snapshot_em: '2026-10-09',
  decisao_mercado: { pais: 'Estados Unidos (US)', moeda: 'USD', idioma: 'en' },
  lojas: LOJAS.map(l => ({ slug: l.slug, nome: l.nome, dominio: l.dominio, veredito: l.veredito, modelo: l.modelo, nivel: l.nivel, defensabilidade: l.defens, anuncios_ativos: l.ativos, ativos: l.ativos, historico: l.historico, sobrevivencia_pct: l.sobrev != null ? +l.sobrev.toFixed(1) : null, produto_campeao: l.campeao.titulo, produto_campeao_url: l.campeao.url, ticket: l.ticket, trafego: l.traf ? { visitas: l.traf.visitas, snapshot: '2026-10', bounce: l.traf.bounce, paginas_visita: l.traf.pagesPerVisit, duracao: l.traf.duracao } : null, coleta: porDom[l.dominio] || null })),
  triagem: Object.entries(TRIAGEM).map(([d, motivo]) => ({ dominio: d, motivo, coleta: porDom[d] || null })),
};
fs.writeFileSync('dados-brutos.json', JSON.stringify(out, null, 2));
console.log('lojas', out.lojas.length, 'triagem', out.triagem.length, out.lojas.map(l => l.slug + ':' + (l.coleta ? 'ok' : 'SEM COLETA') + ':' + (l.trafego ? l.trafego.visitas : '-')).join(' '));
