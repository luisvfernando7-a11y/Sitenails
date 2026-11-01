# Helena Morelin — Cílios e Sobrancelhas

Site comercial estático em HTML, CSS e JavaScript, sem dependências de produção. Preserva os 11 procedimentos, valores, fotos, apresentação e regras do HTML original fornecido. A localização Ourinhos/SP já constava no link de mapa original; não foram acrescentados horários de funcionamento.

## Desenvolvimento e publicação

Use Node.js 22 e npm. Execute `npm ci`, `npm run build`, `npm run lint` e `npm test`. Para visualizar, sirva `dist/` com um servidor HTTP, por exemplo `python3 -m http.server 4173 --directory dist`.

Na Vercel: Framework **Other**, Build Command **npm run build**, Output Directory **dist**, Install Command **npm ci**, Root Directory **.**. `vercel.json` define o build e os headers. Nenhuma variável de ambiente é necessária.

## Organização

- `index.html`: conteúdo semântico e catálogo pré-renderizado, acessível sem JavaScript.
- `catalog.js`: procedimentos, preços, descrições e imagens com dimensões.
- `config.js`: contatos e URLs de WhatsApp/Maps.
- `app.js`: menu e formulário local que prepara mensagem no WhatsApp.
- `styles.css`: identidade visual, responsividade e foco.
- `assets/`: 18 fotos extraídas do original em WebP, qualidade 90.
- `scripts/build.js`: atualiza o catálogo no HTML e gera `dist/`.
- `tests/site.test.js`: integridade dos preços, assets, links e política de privacidade.

Não há backend, analytics, pixels, cookies de aplicação ou armazenamento de informações pessoais. Google Fonts é o único recurso externo carregado antes de clicar em links. O formulário abre uma mensagem para revisão no WhatsApp; não confirma atendimento. A mensagem e os dados pessoais ficam na URL do WhatsApp, conforme o funcionamento desse serviço, e não são enviados à hospedagem deste site.

Canonical, og:url e sitemap devem ser adicionados quando o domínio definitivo for confirmado. `robots.txt` permite indexação sem anunciar um sitemap inexistente. Configure uma imagem Open Graph com URL absoluta nesse mesmo momento.

## Acabamento final

Identidade final: lilás escuro `#51365F`, lavanda `#80638E`, rosa suave `#E8C9D9`, off-white `#FAF7F5`, grafite `#302936` e branco `#FFFFFF`. Header mantém geometria e comportamento recuperados de `fe5df86`. Hero, agendamento e rodapé trazem o lilás; leitura e catálogo usam superfícies claras. O rosa complementa os avisos e as bordas, sem dominar toda a página.

Catálogo com 11 procedimentos em duas categorias reais, links entre categorias, fotografias preservadas, cards brancos e blocos de preços em off-white. Serifada com peso 500 para títulos, sem itálico excessivo; Inter para leitura, preços e controles. Somente duas famílias de fontes.

Contraste: branco sobre lilás **10,28:1**, branco sobre lavanda **5,13:1**, grafite sobre off-white **13,16:1** e grafite sobre rosa suave **9,22:1**. Inventário dos dados e checksums das fotos em `docs/commercial-inventory.md`.

Projeto Vercel existente: **helena-morelin**, endereço de produção **https://helena-morelin.vercel.app**. Publicação inicial confirmada como READY; refinamentos devem atualizar esse mesmo projeto.

## Validação realizada

Build, sintaxe JavaScript e testes automatizados de integridade e lógica de interação aprovados. Fotos verificadas em uma folha de contato. O ambiente inicial bloqueou abertura de sockets do servidor local e inicialização do Chrome. Assim, testes visuais em 320, 375, 390, 768, 1024 e 1440 px, interação real do menu/formulário, auditoria automatizada de acessibilidade e medição Lighthouse permanecem pendentes. Não foi confirmada a disponibilidade das contas externas nem a titularidade do número, apenas a consistência com os dados fornecidos.
