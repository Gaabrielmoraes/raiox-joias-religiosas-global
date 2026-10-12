// Gera a entrega inteira da pesquisa Joias religiosas de presente (12 telas + 5 fichas + mockups).
// Uso: node gerar.mjs   (rodar de dentro de dados/ ou com caminho completo)
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { RAIZ, LOJAS } from './dados-pesquisa.mjs';
import * as A from './telas-a.mjs';
import * as B from './telas-b.mjs';

const SKILL = path.join(os.homedir(), '.claude', 'skills', 'raio-x', 'templates');
const PAG = path.join(RAIZ, 'paginas');
fs.mkdirSync(PAG, { recursive: true });
const w = (f, s) => fs.writeFileSync(f, s, 'utf8');

fs.copyFileSync(path.join(SKILL, 'estilo.css'), path.join(PAG, 'estilo.css'));
fs.copyFileSync(path.join(SKILL, 'exemplo-layout', 'paginas', 'app.js'), path.join(PAG, 'app.js'));

w(path.join(RAIZ, 'Pesquisa - clique aqui.html'), A.central());
w(path.join(PAG, 'demanda.html'), A.demanda());
w(path.join(PAG, 'mercados.html'), A.mercados());
w(path.join(PAG, 'concorrentes.html'), A.concorrentes());
for (const l of LOJAS) w(path.join(PAG, 'loja-' + l.slug + '.html'), A.loja(l));
w(path.join(PAG, 'anuncios.html'), A.anuncios());
w(path.join(PAG, 'estrategia.html'), B.estrategia());
w(path.join(PAG, 'plano-de-acao.html'), B.plano());
w(path.join(PAG, 'catalogo-oferta.html'), B.catalogo());
w(path.join(PAG, 'benchmark-visual.html'), B.benchmark());
w(path.join(PAG, 'identidade-visual.html'), B.identidade());
w(path.join(PAG, 'dados-fontes.html'), B.dadosFontes());
w(path.join(PAG, 'metodo.html'), B.metodo());
w(path.join(PAG, 'mockup-home.html'), B.mockupHome());
w(path.join(PAG, 'mockup-pdp.html'), B.mockupPdp());

// pasta-hub da marca: redirecionador + etapas 02-07 com LEIA-ME
const HUB = path.dirname(RAIZ);
w(path.join(HUB, 'Pesquisa - clique aqui.html'), fs.readFileSync(path.join(SKILL, 'redirect-local.html'), 'utf8'));
const ETAPAS = [['02-brief', '02-brief.txt'], ['03-marca', '03-marca.txt'], ['04-produtos', '04-produtos.txt'], ['05-loja', '05-loja.txt'], ['06-redes', '06-redes.txt'], ['07-anuncios', '07-anuncios.txt']];
for (const [dir, leia] of ETAPAS) {
  fs.mkdirSync(path.join(HUB, dir), { recursive: true });
  fs.copyFileSync(path.join(SKILL, 'leia-me', leia), path.join(HUB, dir, 'LEIA-ME.txt'));
}
console.log('entrega gerada em ' + RAIZ);
