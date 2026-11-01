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

Paleta definitiva: off-white `#FAF7F5`, rosa suave `#F2DCE5`, rosa antigo `#A45D80`, grafite `#382B34` e branco `#FFFFFF`. Header, hero, apresentação, agendamento e contato usam fundos claros; procedimentos usam rosa suave e cards brancos; o rodapé usa grafite. Fotografias preservadas. Os estilos foram consolidados para eliminar regras conflitantes de temas anteriores. Textos revisados, preços e regras preservados.

Contraste medido: branco sobre rosa antigo **4,71:1**, grafite sobre off-white **12,59:1** e grafite sobre rosa suave **10,33:1**. Rosa antigo não é usado em textos pequenos sobre off-white (4,42:1).

Projeto Vercel existente: **helena-morelin**, endereço de produção **https://helena-morelin.vercel.app**. Publicação inicial confirmada como READY; refinamentos devem atualizar esse mesmo projeto.

## Validação realizada

Build, sintaxe JavaScript e quatro testes automatizados de integridade aprovados. Fotos verificadas em uma folha de contato. O ambiente inicial bloqueou abertura de sockets do servidor local e inicialização do Chrome. Assim, testes visuais em 320, 375, 390, 768, 1024 e 1440 px, interação real do menu/formulário, auditoria automatizada de acessibilidade e medição Lighthouse permanecem pendentes. Não foi confirmada a disponibilidade das contas externas nem a titularidade do número, apenas a consistência com os dados fornecidos.
