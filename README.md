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

Restauração visual baseada no primeiro commit do repositório, `30a3c3f`. O CSS do hero com foto de fundo, do header e do catálogo em linhas alternadas foi recuperado dessa versão. Sem painéis sobre a foto, sem mosaico no hero e sem os cards de catálogo adicionados posteriormente. A fotografia e seu enquadramento original (`object-position: 40% 22%`) foram preservados.

Paleta solicitada: roxo principal `#432B53`, roxo secundário `#62456E`, off-white `#FAF7F3`, rosa de detalhe `#D9B2C8`, grafite `#302536` e branco `#FFFFFF`. O roxo predomina; avisos usam off-white com texto grafite. Sobreposições neutras discretas no hero mantêm a fotografia visível e dão suporte ao texto claro.

Preservados os dados e textos comerciais atuais, preços autorizados, formulário, normalização de telefone, navegação acessível, WhatsApp contextual, política de privacidade, imagens WebP locais com dimensões e testes posteriores. A aplicação de Lash lifting e Brow lamination permanece em R$ 90,00. Inventário comercial: `docs/commercial-inventory.md`.

Projeto Vercel existente: **helena-morelin**, endereço de produção **https://helena-morelin.vercel.app**. Publicação inicial confirmada como READY; refinamentos devem atualizar esse mesmo projeto.

## Validação realizada

Build, sintaxe JavaScript e testes automatizados de integridade e lógica de interação aprovados. Fotos verificadas em uma folha de contato. O ambiente inicial bloqueou abertura de sockets do servidor local e inicialização do Chrome. Assim, testes visuais em 320, 375, 390, 768, 1024 e 1440 px, interação real do menu/formulário, auditoria automatizada de acessibilidade e medição Lighthouse permanecem pendentes. Não foi confirmada a disponibilidade das contas externas nem a titularidade do número, apenas a consistência com os dados fornecidos.
