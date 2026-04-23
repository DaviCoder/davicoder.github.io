# davicoder.github.io

Currículo pessoal hospedado no GitHub Pages, com visual de IDE (estilo JetBrains)
e cada aba em sua própria página estática.

## Estrutura

```
index.html              redirect → about.html
about.html              about.md
experience.html         experience.tsx (lê data/linkedin-experience.html)
education.html          education.json
skills.html             skills.yaml
devops.html             devops.sh (terminal interativo)
ai.html                 ai.md
contact.html            contact.ts

assets/
  styles.css            todos os estilos
  app.js                shell, i18n, navegação, terminal, parser do LinkedIn

data/
  linkedin-experience.html   HTML cru copiado direto do LinkedIn
```

## Atualizando a aba `experience`

A aba `experience` é renderizada em runtime a partir do HTML do seu próprio
LinkedIn, salvo em `data/linkedin-experience.html`. Para atualizar:

1. Abra seu perfil em <https://www.linkedin.com/in/davi-silva-79150815b/>
   (logado, em qualquer idioma — o parser lida com PT-BR).
2. Abra o **DevTools** (F12) e cole no console o XPath abaixo para localizar
   os blocos:

   ```
   //div[@data-testid='profile_ExperienceTopLevelSection_davi-silva-79150815b']//div[contains(@componentkey, 'entity-collection-item')]
   ```

   No DevTools, na aba **Elements**, use `Ctrl+F` e cole o XPath para destacar
   cada `<div componentkey="entity-collection-item-…">`.
3. Selecione o **container pai** que envolve todos eles (o pai imediato dos
   `componentkey="entity-collection-item-…"`), clique com o botão direito →
   **Copy → Copy outerHTML** (ou copie só os divs filhos, sem o wrapper).
4. Substitua o conteúdo de `data/linkedin-experience.html` pelo HTML copiado
   (o cabeçalho de comentário pode ficar — o parser ignora).
5. `git add . && git commit -m "chore: refresh linkedin export" && git push`.

O GitHub Pages publica em ~1 min e o `experience.html` mostra os cargos novos.

### Por que client-side parsing

Não usamos build step (Python/Node) porque:

- A LinkedIn não tem API pública pra puxar seu próprio histórico — a oficial
  só dá nome/foto/email via OAuth, e ainda exigiria backend.
- Scraper externo (Proxycurl etc.) custa US$ e viola o ToS.
- O HTML cru tem ~40 KB — irrelevante pro tamanho da página.

O JS no navegador faz `fetch('data/linkedin-experience.html')` →
`DOMParser` → extrai os campos → renderiza os cards.

### Seletores estáveis usados pelo parser

As classes CSS do LinkedIn (`_3a5099c8`, `caa4ef5c`, …) são **ofuscadas e
mudam todo deploy** — nunca dependa delas. O parser em `assets/app.js`
(`parseRoleAnchor`) só usa atributos estáveis:

| Campo                      | Seletor                                              |
|----------------------------|------------------------------------------------------|
| Wrapper de empresa         | `[componentkey^="entity-collection-item-"]`          |
| Cada cargo (uma entrada por papel) | `a[aria-label^="Editar "][href*="/edit/forms/"]` |
| Título e empresa do cargo  | parsed do `aria-label`: `Editar {TITLE} na empresa {COMPANY}` |
| ID do cargo                | `/forms/{ID}/` no `href` da âncora de edição          |
| Skills do cargo            | `a[href*="/overlay/{ID}/skill-associations-details/"]` (mesmo ID) |
| Logo da empresa            | `figure img[alt^="Logo da empresa "]`                |
| Descrição                  | `[data-testid="expandable-text-box"]` (só em wrapper de role único) |

Esses atributos são parte da semântica que a LinkedIn precisa manter pro
próprio app funcionar — bem mais resilientes que classes geradas por bundler.

#### Multi-role na mesma empresa

Quando você tem dois cargos na mesma empresa (ex.: estagiário → júnior na
OCTO), o LinkedIn agrupa tudo num único `entity-collection-item` e renderiza
os `<p>` de cada cargo intercalados. O parser identifica onde começa cada
grupo procurando `<p>`s cujo texto bate com os títulos extraídos dos
`aria-label="Editar ..."` daquele wrapper. As skills são pareadas com cada
papel pelo ID do cargo, que aparece tanto na URL de edição quanto na de
skills (`/forms/2003773795/` ↔ `/overlay/2003773795/skill-associations-details/`).

### Quando o LinkedIn quebrar o parser

Se um dia a estrutura mudar (adicionarem um `<p>` no meio, por exemplo),
abra o DevTools no `experience.html`, veja o que o parser extraiu errado e
ajuste a função `parseExperienceItem` em `assets/app.js`. Os atributos do
quadro acima são as âncoras — ajuste ordem/índices em volta deles.

## Customização visual

- Cores e tipografia: variáveis CSS no topo de `assets/styles.css`
  (`:root` para dark, `[data-theme="light"]` para light).
- Toggle de idioma e tema: chips no topo direito; estado guardado em
  `localStorage`.
- Atalhos: `Ctrl/Cmd+L` alterna idioma; `←/→` navega entre páginas.
