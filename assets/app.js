/* ───────────────────────────────────────────────────────
   Shared shell logic — runs on every page.
   Each page sets <body data-page="about|experience|...">
   ─────────────────────────────────────────────────────── */

const PAGES = [
  { id: 'about',        file: 'about.html',          crumb: 'about.md',          title: 'about.md' },
  { id: 'experience',   file: 'experience.html',     crumb: 'experience.tsx',    title: 'experience.tsx' },
  { id: 'education',    file: 'education.html',      crumb: 'education.json',    title: 'education.json' },
  { id: 'skills',       file: 'skills.html',         crumb: 'skills.yaml',       title: 'skills.yaml' },
  { id: 'devops',       file: 'devops.html',         crumb: 'devops.sh',         title: 'devops.sh' },
  { id: 'ai',           file: 'ai.html',             crumb: 'ai.md',             title: 'ai.md' },
  { id: 'contact-sec',  file: 'contact.html',        crumb: 'contact.ts',        title: 'contact.ts' },
];

const I18N = {
  pt: {
    'dl': '.pdf',
    'nav.about': 'about.md',
    'nav.exp': 'experience.tsx',
    'nav.edu': 'education.json',
    'nav.skills': 'skills.yaml',
    'nav.contact': 'contact.ts',
    'hero.role': '> Desenvolvedor Full Stack · DevOps',
    'hero.bio': 'Engenheiro de software focado em construir sistemas distribuídos confiáveis e pipelines de entrega contínua. Trabalho na interseção entre desenvolvimento e infraestrutura, automatizando o que pode ser automatizado e observando o resto.',
    'hero.cta': './contratar()',
    'hero.status': 'aberto a novas oportunidades',
    'about.c1': 'Resumo do perfil. Últimos 5 anos construindo produtos',
    'about.c2': 'em escala — do frontend ao kubernetes.',
    'sec.exp': 'experience',
    'sec.devops': 'devops focus',
    'sec.ai': 'ai · como eu realmente uso',
    'dv.hero.title': 'Onde eu realmente vivo.',
    'dv.hero.desc': 'Passo a maior parte dos dias entre YAML, Terraform HCL e painéis do Grafana. Construo plataformas internas onde deploy é um "git push" e rollback é um clique. Abaixo, um terminal com comandos reais do meu dia-a-dia.',
    'dv.m1': 'deploy time ↓',
    'dv.m2': 'infra cost ↓',
    'dv.m3': 'uptime SLO',
    'dv.launch': 'abrir terminal',
    'dv.pipes': 'pipelines · últimas 24h',
    'dv.try': 'experimente estes comandos',
    'page.prev': 'anterior',
    'page.next': 'próximo',
    'sec.edu': 'education',
    'sec.skills': 'skills',
    'sec.contact': 'contact',
    'tag.exp': '// git log --career --source=linkedin',
    'tag.edu': '// formação acadêmica',
    'tag.skills': '// stack atual',
    'outline.h': 'resumo',
    'outline.exp': '5 anos de experiência',
    'outline.open': 'aberto a propostas',
    'edu1.type': 'Bacharelado',
    'edu1.period': 'ago de 2021 — ago de 2024',
    'edu2.type': 'Ensino Médio Técnico',
    'ai.w1.t': 'Code review pré-PR',
    'ai.w1.p': 'Colo o diff no Claude antes de abrir PR. Ele pega edge-cases, nullability e padrões que meu cérebro às 18h já perdeu.',
    'ai.w2.t': 'Testes & fixtures',
    'ai.w2.p': '"Gera table-driven tests para essa função, cobrindo inputs vazios, limites e unicode." Revejo, ajusto, committo.',
    'ai.w3.t': 'IaC & YAML hell',
    'ai.w3.p': 'Terraform, Helm, k8s manifests. IA é excelente pra traduzir intent em sintaxe correta. Eu valido, faço plan e aplico.',
    'ai.w4.t': 'Debug de stack trace',
    'ai.w4.p': 'Colo um erro obscuro + contexto mínimo. Claude aponta causa provável, sugere métricas pra olhar e filtro de logs.',
    'ai.w5.t': 'Docs & ADRs',
    'ai.w5.p': 'Rascunho READMEs, runbooks e ADRs com IA. Entrego bullets, ela vira prosa; eu polio o tom e os detalhes técnicos.',
    'ai.w6.t': 'Rubber-duck arquitetural',
    'ai.w6.p': 'Descrevo o problema, peço 3 abordagens com trade-offs. Serve como sparring antes de discutir com o time.',
    'ai.w7.t': 'Shell & one-liners',
    'ai.w7.p': '"awk pra somar coluna 3 de um tsv, agrupando por coluna 1". O tipo de comando que eu só escreveria 1x ao ano.',
    'ai.w8.t': 'Refactor de bloco grande',
    'ai.w8.p': 'Função de 300 linhas com 4 responsabilidades? Peço split sugerido e testes antes do refactor. Então executo passo a passo.',
    'ai.r1.b': 'Nunca segredos no prompt.',
    'ai.r1.t': 'Tokens, chaves e PII ficam fora. Uso placeholders e restrinjo escopo.',
    'ai.r2.b': 'Sempre revisar o diff.',
    'ai.r2.t': 'Nada chega ao main sem ser lido linha por linha. IA não assume PRs no meu lugar.',
    'ai.r3.b': 'Testes são meu detector de mentira.',
    'ai.r3.t': 'Se passa nos testes (meus, não os da IA), eu confio. Se não, pergunto de novo.',
    'ai.r4.b': 'Contexto > prompt bonito.',
    'ai.r4.t': 'Colar arquivos reais, schema e erro exato vale mais que engenharia de prompt.',
    'ai.r5.b': 'Dados sensíveis ficam locais.',
    'ai.r5.t': 'Código proprietário ou cliente sensível? LLM local (Ollama) ou nada.',
    'ai.r6.b': 'Fundamentals vêm primeiro.',
    'ai.r6.t': 'IA acelera quem sabe o que está fazendo. Não pulo estudos porque "a IA resolve".',
    'skills.lang': 'languages',
    'skills.be': 'backend',
    'skills.fe': 'frontend',
    'skills.mobile': 'mobile',
    'skills.infra': 'infra & devops',
    'skills.db': 'databases',
    'ai.badge': 'LLMs no loop',
    'ai.h3': 'IA é ferramenta, não substituto. Uso como um par sênior que nunca dorme — revisando código, escrevendo testes e acelerando o tedioso.',
    'ai.p': 'Minha filosofia: delegar o que é repetitivo, pedir segunda opinião no que é crítico, e sempre revisar antes de commitar. O diff final é meu.',
    'ai.s1': 'mais rápido em boilerplate',
    'ai.s2': 'diffs revisados por humano',
    'ai.s3': 'LLMs em rotação',
    'ai.s4': 'segredos em prompts',
    'ai.work.h': 'onde a IA entra no meu fluxo',
    'ai.stack.h': 'stack de IA que uso',
    'ai.rules.h': 'como eu uso IA com responsabilidade',
    'contact.title': 'Vamos construir algo.',
    'contact.desc': 'Aberto a posições remote-first em engenharia de plataforma, SRE e arquitetura cloud. Respondo em até 24h.',
    'sb.live': 'live',
    'sb.ln': 'Ln 1, Col 1',
    'toast.copied': '✓ email copiado para o clipboard',
    'toast.pdf': '✓ currículo.pdf · download iniciado',
  },
  en: {
    'dl': '.pdf',
    'nav.about': 'about.md',
    'nav.exp': 'experience.tsx',
    'nav.edu': 'education.json',
    'nav.skills': 'skills.yaml',
    'nav.contact': 'contact.ts',
    'hero.role': '> Full Stack Developer · DevOps',
    'hero.bio': 'Software engineer focused on building reliable distributed systems and continuous delivery pipelines. I work at the intersection of development and infrastructure — automating what can be automated and observing the rest.',
    'hero.cta': './hire()',
    'hero.status': 'open to new opportunities',
    'about.c1': 'Profile summary. Last 5 years building products',
    'about.c2': 'at scale — from frontend to kubernetes.',
    'sec.exp': 'experience',
    'sec.devops': 'devops focus',
    'sec.ai': 'ai · how I actually use it',
    'dv.hero.title': 'Where I actually live.',
    'dv.hero.desc': 'I spend most days between YAML, Terraform HCL and Grafana dashboards. I build internal platforms where deploy is a "git push" and rollback is one click. Below, a terminal with real commands from my day-to-day.',
    'dv.m1': 'deploy time ↓',
    'dv.m2': 'infra cost ↓',
    'dv.m3': 'uptime SLO',
    'dv.launch': 'open terminal',
    'dv.pipes': 'pipelines · last 24h',
    'dv.try': 'try these commands',
    'sec.edu': 'education',
    'sec.skills': 'skills',
    'sec.contact': 'contact',
    'page.prev': 'previous',
    'page.next': 'next',
    'tag.exp': '// git log --career --source=linkedin',
    'tag.edu': '// academic background',
    'tag.skills': '// current stack',
    'outline.h': 'outline',
    'outline.exp': '5 yrs experience',
    'outline.open': 'open to offers',
    'edu1.type': "Bachelor's",
    'edu1.period': 'Aug 2021 — Aug 2024',
    'edu2.type': 'Technical High School',
    'ai.w1.t': 'Pre-PR code review',
    'ai.w1.p': 'I paste the diff into Claude before opening the PR. It catches edge-cases, nullability and patterns my 6pm brain has already lost.',
    'ai.w2.t': 'Tests & fixtures',
    'ai.w2.p': '"Generate table-driven tests for this function, covering empty inputs, edge cases and unicode." I review, adjust, commit.',
    'ai.w3.t': 'IaC & YAML hell',
    'ai.w3.p': 'Terraform, Helm, k8s manifests. AI excels at translating intent into correct syntax. I validate, run plan and apply.',
    'ai.w4.t': 'Stack trace debugging',
    'ai.w4.p': 'I paste an obscure error plus minimal context. Claude points at the likely root cause, suggests metrics to watch and log filters.',
    'ai.w5.t': 'Docs & ADRs',
    'ai.w5.p': 'I draft READMEs, runbooks and ADRs with AI. I hand it bullets, it returns prose; I polish tone and technical details.',
    'ai.w6.t': 'Architectural rubber-ducking',
    'ai.w6.p': 'I describe the problem, ask for 3 approaches with trade-offs. Works as sparring before discussing with the team.',
    'ai.w7.t': 'Shell & one-liners',
    'ai.w7.p': '"awk to sum column 3 of a tsv, grouped by column 1." The kind of command I would only write once a year.',
    'ai.w8.t': 'Large-block refactor',
    'ai.w8.p': '300-line function with 4 responsibilities? I ask for a suggested split and tests before the refactor, then execute step by step.',
    'ai.r1.b': 'Never secrets in the prompt.',
    'ai.r1.t': 'Tokens, keys and PII stay out. I use placeholders and restrict scope.',
    'ai.r2.b': 'Always review the diff.',
    'ai.r2.t': 'Nothing lands on main without being read line by line. AI does not ship PRs for me.',
    'ai.r3.b': 'Tests are my lie detector.',
    'ai.r3.t': "If it passes the tests (mine, not the AI's), I trust it. Otherwise, I ask again.",
    'ai.r4.b': 'Context > pretty prompt.',
    'ai.r4.t': 'Pasting real files, schema and the exact error beats prompt engineering.',
    'ai.r5.b': 'Sensitive data stays local.',
    'ai.r5.t': 'Proprietary code or sensitive client? Local LLM (Ollama) or nothing.',
    'ai.r6.b': 'Fundamentals come first.',
    'ai.r6.t': 'AI accelerates those who know what they are doing. I do not skip studying because "AI will solve it".',
    'skills.lang': 'languages',
    'skills.be': 'backend',
    'skills.fe': 'frontend',
    'skills.mobile': 'mobile',
    'skills.infra': 'infra & devops',
    'skills.db': 'databases',
    'ai.badge': 'LLMs in the loop',
    'ai.h3': 'AI is a tool, not a replacement. I use it like a senior pair that never sleeps — reviewing code, writing tests and accelerating the tedious bits.',
    'ai.p': 'My philosophy: delegate the repetitive, get second opinions on the critical, and always review before committing. The final diff is mine.',
    'ai.s1': 'faster on boilerplate',
    'ai.s2': 'human-reviewed diffs',
    'ai.s3': 'LLMs in rotation',
    'ai.s4': 'secrets in prompts',
    'ai.work.h': 'where AI fits in my flow',
    'ai.stack.h': 'AI stack I use',
    'ai.rules.h': 'how I use AI responsibly',
    'contact.title': "Let's build something.",
    'contact.desc': 'Open to remote-first roles in platform engineering, SRE and cloud architecture. I reply within 24h.',
    'sb.live': 'live',
    'sb.ln': 'Ln 1, Col 1',
    'toast.copied': '✓ email copied to clipboard',
    'toast.pdf': '✓ resume.pdf · download started',
  }
};

const MODAL_DATA = {
  exp1: {
    pt: {
      file: 'experience/cloudops-solutions.md',
      title: 'Desenvolvedor Full Stack Sênior / DevOps',
      sub: 'CloudOps Solutions · 2024 — presente · Remoto',
      body: `
        <p>Liderança técnica de uma plataforma multi-tenant de orquestração cloud para clientes enterprise no setor financeiro e varejista.</p>
        <div class="key-v"><span class="k">stack:</span><span>Go · TypeScript · K8s · Terraform</span></div>
        <div class="key-v"><span class="k">cloud:</span><span>AWS (EKS, RDS, S3) · GCP (GKE)</span></div>
        <div class="key-v"><span class="k">time:</span><span>8 engenheiros</span></div>
        <h4 style="color:var(--text); font-family:var(--mono); margin-top:20px;">Principais entregas</h4>
        <ul>
          <li>Redução de <b style="color:var(--accent-bright)">78%</b> no tempo médio de deploy (45min → 9min) com pipeline GitOps usando ArgoCD.</li>
          <li>Corte de <b style="color:var(--accent-bright)">~35%</b> em custos de infra migrando workloads stateless para spot instances com fallback automático.</li>
          <li>Implementação de tracing distribuído end-to-end (OpenTelemetry → Tempo) para todos os 40+ microsserviços.</li>
          <li>Autoria da RFC de multi-tenancy que hoje sustenta os 40+ tenants isolados por namespace e network policy.</li>
        </ul>`
    },
    en: {
      file: 'experience/cloudops-solutions.md',
      title: 'Senior Full Stack Developer / DevOps',
      sub: 'CloudOps Solutions · 2024 — present · Remote',
      body: `
        <p>Tech lead of a multi-tenant cloud orchestration platform for enterprise clients in finance and retail.</p>
        <div class="key-v"><span class="k">stack:</span><span>Go · TypeScript · K8s · Terraform</span></div>
        <div class="key-v"><span class="k">cloud:</span><span>AWS (EKS, RDS, S3) · GCP (GKE)</span></div>
        <div class="key-v"><span class="k">team:</span><span>8 engineers</span></div>
        <h4 style="color:var(--text); font-family:var(--mono); margin-top:20px;">Key deliveries</h4>
        <ul>
          <li><b style="color:var(--accent-bright)">78%</b> reduction in mean deploy time (45min → 9min) via a GitOps pipeline on ArgoCD.</li>
          <li><b style="color:var(--accent-bright)">~35%</b> infra cost cut by migrating stateless workloads to spot instances with automatic fallback.</li>
          <li>End-to-end distributed tracing (OpenTelemetry → Tempo) across all 40+ microservices.</li>
          <li>Authored the multi-tenancy RFC that now backs 40+ tenants isolated by namespace and network policy.</li>
        </ul>`
    }
  },
  exp2: {
    pt: {
      file: 'experience/fintech-labs.md',
      title: 'Desenvolvedor Full Stack',
      sub: 'Fintech Labs · 2022 — 2024 · São Paulo',
      body: `
        <p>Engenharia do núcleo de pagamentos instantâneos para uma fintech regulada pelo Banco Central, atendendo ~1.2M usuários ativos.</p>
        <div class="key-v"><span class="k">stack:</span><span>Node.js · React · PostgreSQL · Kafka</span></div>
        <div class="key-v"><span class="k">escala:</span><span>12k TPS peak · 99.97% success</span></div>
        <h4 style="color:var(--text); font-family:var(--mono); margin-top:20px;">Destaques</h4>
        <ul>
          <li>Arquitetura event-sourcing com Kafka + outbox pattern para garantia de entrega em transações financeiras.</li>
          <li>Dashboard interno em React para o time de ops monitorar conciliação em tempo real.</li>
          <li>Integração homologada com o DICT do SPB.</li>
        </ul>`
    },
    en: {
      file: 'experience/fintech-labs.md',
      title: 'Full Stack Developer',
      sub: 'Fintech Labs · 2022 — 2024 · São Paulo',
      body: `
        <p>Core engineering on instant payments for a Central Bank-regulated fintech serving ~1.2M MAU.</p>
        <div class="key-v"><span class="k">stack:</span><span>Node.js · React · PostgreSQL · Kafka</span></div>
        <div class="key-v"><span class="k">scale:</span><span>12k TPS peak · 99.97% success</span></div>
        <h4 style="color:var(--text); font-family:var(--mono); margin-top:20px;">Highlights</h4>
        <ul>
          <li>Event-sourcing architecture with Kafka + outbox pattern for delivery guarantees on financial transactions.</li>
          <li>Internal React dashboard letting ops monitor reconciliation in real time.</li>
          <li>Homologated integration with Brazil's payment directory (DICT).</li>
        </ul>`
    }
  },
  exp3: {
    pt: {
      file: 'experience/startupx.md',
      title: 'Desenvolvedor Backend',
      sub: 'StartupX · 2021 — 2022 · Recife',
      body: `
        <p>Primeiro backend dedicado da empresa, responsável por retirar a dívida técnica acumulada em 4 anos de MVP.</p>
        <h4 style="color:var(--text); font-family:var(--mono); margin-top:20px;">Resultados</h4>
        <ul>
          <li>Latência p95 de <b style="color:var(--err)">1200ms</b> → <b style="color:var(--accent-bright)">180ms</b> após reescrita em Node.js.</li>
          <li>CI/CD no GitLab com gates de qualidade (lint, testes, coverage &gt; 70%).</li>
          <li>Cobertura de testes subiu de ~10% para 68% em 6 meses.</li>
        </ul>`
    },
    en: {
      file: 'experience/startupx.md',
      title: 'Backend Developer',
      sub: 'StartupX · 2021 — 2022 · Recife',
      body: `
        <p>First dedicated backend hire, tasked with removing technical debt from 4 years of MVP mode.</p>
        <h4 style="color:var(--text); font-family:var(--mono); margin-top:20px;">Outcomes</h4>
        <ul>
          <li>p95 latency <b style="color:var(--err)">1200ms</b> → <b style="color:var(--accent-bright)">180ms</b> after Node.js rewrite.</li>
          <li>GitLab CI/CD with quality gates (lint, tests, coverage &gt; 70%).</li>
          <li>Test coverage grew from ~10% to 68% in 6 months.</li>
        </ul>`
    }
  },
  exp4: {
    pt: {
      file: 'experience/agencia-digital.md',
      title: 'Desenvolvedor Júnior',
      sub: 'Agência Digital · 2020 — 2021 · Recife',
      body: `
        <p>Primeira posição full-time. Ciclo rápido de entrega para clientes de varejo, cosmetics e serviços locais.</p>
        <ul>
          <li>20+ projetos entregues em 12 meses.</li>
          <li>Introduzi o uso de Git e PRs em um time que commitava direto no FTP.</li>
          <li>Escola dura: aprendi que &ldquo;pronto&rdquo; é melhor que &ldquo;perfeito&rdquo;.</li>
        </ul>`
    },
    en: {
      file: 'experience/agencia-digital.md',
      title: 'Junior Developer',
      sub: 'Agência Digital · 2020 — 2021 · Recife',
      body: `
        <p>First full-time role. Fast delivery cycles for retail, cosmetics and local services.</p>
        <ul>
          <li>20+ projects shipped in 12 months.</li>
          <li>Introduced Git and PRs to a team that was committing straight to FTP.</li>
          <li>Hard school: I learned that &ldquo;done&rdquo; beats &ldquo;perfect&rdquo;.</li>
        </ul>`
    }
  }
};

let currentLang  = localStorage.getItem('cv.lang')  || 'pt';
let currentTheme = localStorage.getItem('cv.theme') || 'dark';

function pageIndex() {
  const id = document.body.dataset.page || 'about';
  return PAGES.findIndex(p => p.id === id);
}

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('cv.lang', lang);
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n;
    if (I18N[lang][k]) el.textContent = I18N[lang][k];
  });
  const flag = document.getElementById('lang-flag');
  const lbl  = document.getElementById('lang-label');
  if (flag) flag.textContent = lang === 'pt' ? '🇧🇷' : '🇺🇸';
  if (lbl)  lbl.textContent  = lang.toUpperCase();
  if (document.getElementById('exp-list')) renderExperience();
}

function applyTheme(theme) {
  currentTheme = theme;
  localStorage.setItem('cv.theme', theme);
  document.body.dataset.theme = theme;
  const ti = document.getElementById('theme-icon');
  const tl = document.getElementById('theme-label');
  if (!ti || !tl) return;
  if (theme === 'dark') {
    ti.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    tl.textContent = 'dark';
  } else {
    ti.innerHTML = '<circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>';
    tl.textContent = 'light';
  }
}

function setupShellNav() {
  const id = document.body.dataset.page;

  document.querySelectorAll('.tab[data-tab]').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === id);
  });
  document.querySelectorAll('.sb-item[data-goto]').forEach(s => {
    s.classList.toggle('active', s.dataset.goto === id);
  });

  document.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', () => {
      const target = PAGES.find(p => p.id === el.dataset.goto);
      if (target) window.location.href = target.file;
    });
  });
  document.querySelectorAll('.tab[data-tab]').forEach(t => {
    t.addEventListener('click', () => {
      const target = PAGES.find(p => p.id === t.dataset.tab);
      if (target) window.location.href = target.file;
    });
  });
}

function setupPager() {
  const idx = pageIndex();
  const prev = document.getElementById('page-prev');
  const next = document.getElementById('page-next');
  const counter = document.getElementById('page-counter');
  if (counter) counter.innerHTML = `<span class="cur-n">${idx + 1}</span> / ${PAGES.length}`;
  if (prev) {
    const atStart = idx <= 0;
    prev.classList.toggle('disabled', atStart);
    if (atStart) prev.removeAttribute('href');
    else        prev.href = PAGES[idx - 1].file;
  }
  if (next) {
    const atEnd = idx >= PAGES.length - 1;
    next.classList.toggle('disabled', atEnd);
    if (atEnd) next.removeAttribute('href');
    else      next.href = PAGES[idx + 1].file;
  }
}

function toast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._to);
  t._to = setTimeout(() => t.classList.remove('show'), 2200);
}

function setupActions() {
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) langBtn.addEventListener('click', () => applyLang(currentLang === 'pt' ? 'en' : 'pt'));

  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', () => applyTheme(currentTheme === 'dark' ? 'light' : 'dark'));

  const dlBtn = document.getElementById('dl-cv');
  if (dlBtn) dlBtn.addEventListener('click', () => toast(I18N[currentLang]['toast.pdf']));

  const copy = document.getElementById('copy-email');
  if (copy) copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('davi@davi.one');
      toast(I18N[currentLang]['toast.copied']);
    } catch { toast('davi@davi.one'); }
  });
}

function setupModal() {
  const modal = document.getElementById('modal');
  if (!modal) return;
  const body = document.getElementById('modal-body');
  const file = document.getElementById('modal-file');

  document.querySelectorAll('[data-modal]').forEach(el => {
    el.addEventListener('click', () => {
      const key = el.dataset.modal;
      const data = MODAL_DATA[key]?.[currentLang];
      if (!data) return;
      file.textContent = data.file;
      body.innerHTML = `<h3>${data.title}</h3><div class="sub">${data.sub}</div>${data.body}`;
      modal.classList.add('open');
    });
  });
  const close = () => modal.classList.remove('open');
  document.getElementById('modal-x')?.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

function setupKeyboard() {
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if ((e.metaKey || e.ctrlKey) && e.key === 'l') {
      e.preventDefault();
      applyLang(currentLang === 'pt' ? 'en' : 'pt');
      return;
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const idx = pageIndex();
      if (e.key === 'ArrowRight' && idx < PAGES.length - 1) window.location.href = PAGES[idx + 1].file;
      if (e.key === 'ArrowLeft'  && idx > 0)                 window.location.href = PAGES[idx - 1].file;
    }
  });
}

/* ───────────── DevOps terminal (only runs on devops.html) ───────────── */
const TERM_OUT = {
  boot_pt: [
    { t: 'mut', s: '╭─ zsh ─ davi@devops ─ ~/platform' },
    { t: 'mut', s: '╰─ inicializando shell interativo...' },
    { t: 'ok',  s: '✓ conectado ao cluster eks-prod-us-east-1' },
    { t: 'ok',  s: '✓ kubectl v1.29.2 · terraform v1.7.4 · helm v3.14.0' },
    { t: 'mut', s: 'digite "help" para ver os comandos disponíveis.' },
  ],
  boot_en: [
    { t: 'mut', s: '╭─ zsh ─ davi@devops ─ ~/platform' },
    { t: 'mut', s: '╰─ starting interactive shell...' },
    { t: 'ok',  s: '✓ connected to cluster eks-prod-us-east-1' },
    { t: 'ok',  s: '✓ kubectl v1.29.2 · terraform v1.7.4 · helm v3.14.0' },
    { t: 'mut', s: 'type "help" to see available commands.' },
  ],
};
const CMDS = {
  help: { cmd: 'help', out: [
    { t: 'info', s: 'comandos disponíveis:' },
    { t: 'mut',  s: '  kubectl     — listar pods do cluster de produção' },
    { t: 'mut',  s: '  terraform   — rodar terraform plan no módulo de infra' },
    { t: 'mut',  s: '  stack       — ver minha stack DevOps (cat stack.yaml)' },
    { t: 'mut',  s: '  deploy      — simular deploy GitOps em produção' },
    { t: 'mut',  s: '  metrics     — sample de métricas da plataforma' },
    { t: 'mut',  s: '  incidents   — resumo de post-mortems recentes' },
    { t: 'mut',  s: '  whoami      — sobre mim como engenheiro de plataforma' },
    { t: 'mut',  s: '  clear       — limpar terminal' },
  ]},
  whoami: { cmd: 'whoami', out: [
    { t: 'acc', s: 'davi silva — platform / devops engineer' },
    { t: 'mut', s: 'eu construo a ponte entre dev e infra. acredito em:' },
    { t: 'ok',  s: '  → everything-as-code (infra, config, policy, secrets)' },
    { t: 'ok',  s: '  → dashboards antes de alertas, alertas antes de paging' },
    { t: 'ok',  s: '  → PRs pequenas + deploy contínuo > releases grandes' },
    { t: 'ok',  s: '  → plataforma interna como produto, devs como clientes' },
  ]},
  kubectl: { cmd: 'kubectl get pods -n platform', out: [
    { t: 'hl',  s: 'NAME                              READY  STATUS    RESTARTS  AGE' },
    { t: 'mut', s: 'platform-api-7d4f9b8c-k2x4j       1/1    Running   0         4d2h' },
    { t: 'mut', s: 'platform-api-7d4f9b8c-m8n9p       1/1    Running   0         4d2h' },
    { t: 'mut', s: 'platform-api-7d4f9b8c-q7w3r       1/1    Running   1         2d4h' },
    { t: 'mut', s: 'billing-worker-5c8d2-xk9m         1/1    Running   0         6h12m' },
    { t: 'mut', s: 'auth-service-6b9f4a7d-v3k2q      1/1    Running   0         18h' },
    { t: 'mut', s: 'observability-agent-f4n2x         1/1    Running   0         12d' },
    { t: 'mut', s: 'argocd-server-8c7d9b-pzq4w        1/1    Running   0         45d' },
    { t: 'ok',  s: '✓ 7 pods ready · 0 pending · 0 errored' },
  ]},
  terraform: { cmd: 'cd infra/prod && terraform plan', out: [
    { t: 'mut',  s: 'Refreshing state... (AWS provider v5.42)' },
    { t: 'mut',  s: 'module.eks.aws_eks_cluster.main: Reading...' },
    { t: 'mut',  s: 'module.rds.aws_db_instance.primary: Reading...' },
    { t: 'info', s: 'Terraform will perform the following actions:' },
    { t: 'ok',   s: '  + module.observability.grafana_tempo (new)' },
    { t: 'warn', s: '  ~ module.eks.node_group.spot_pool (scaling 8 → 12 nodes)' },
    { t: 'ok',   s: '  + module.secrets.aws_kms_key.rotation (new)' },
    { t: 'hl',   s: 'Plan: 2 to add, 1 to change, 0 to destroy.' },
    { t: 'ok',   s: '✓ no drift detected in other resources' },
  ]},
  stack: { cmd: 'cat stack.yaml', out: [
    { t: 'acc',  s: "# davi's platform stack" },
    { t: 'mut',  s: 'orchestration:' },
    { t: 'info', s: '  containers:    Kubernetes (EKS + GKE)' },
    { t: 'info', s: '  gitops:        ArgoCD + Kustomize' },
    { t: 'info', s: '  service-mesh:  Istio (sidecar + mTLS)' },
    { t: 'mut',  s: 'infra-as-code:' },
    { t: 'info', s: '  provisioning:  Terraform + Terragrunt' },
    { t: 'info', s: '  secrets:       External Secrets Operator + AWS SM' },
    { t: 'mut',  s: 'ci-cd:' },
    { t: 'info', s: '  pipelines:     GitHub Actions' },
    { t: 'info', s: '  scanning:      Trivy + Snyk + OPA Gatekeeper' },
    { t: 'mut',  s: 'observability:' },
    { t: 'info', s: '  metrics:       Prometheus + Thanos' },
    { t: 'info', s: '  logs:          Loki + Grafana' },
    { t: 'info', s: '  traces:        Tempo + OpenTelemetry' },
    { t: 'info', s: '  on-call:       PagerDuty + Slack' },
  ]},
  deploy: { cmd: './deploy prod platform-api:v2.14.1', out: [
    { t: 'mut', s: '[1/6] authenticating with ArgoCD...' },
    { t: 'ok',  s: '      ✓ signed commit verified · slsa-provenance ok' },
    { t: 'mut', s: '[2/6] pre-deploy checks (policy, budget)...' },
    { t: 'ok',  s: '      ✓ OPA gatekeeper: 14 policies pass' },
    { t: 'mut', s: '[3/6] canary rollout 5% → 25% → 50%...' },
    { t: 'mut', s: '      traffic shift @ 5%  · error-rate 0.02% · ok' },
    { t: 'mut', s: '      traffic shift @ 25% · error-rate 0.01% · ok' },
    { t: 'mut', s: '      traffic shift @ 50% · p95 118ms       · ok' },
    { t: 'ok',  s: '      ✓ 8/8 pods healthy' },
    { t: 'mut', s: '[5/6] smoke tests + sli check...' },
    { t: 'ok',  s: '      ✓ availability 99.99% (last 5min)' },
    { t: 'ok',  s: '✓ deployed platform-api v2.14.1 in 2m 14s' },
  ]},
  metrics: { cmd: 'curl -s https://platform.internal/metrics | head', out: [
    { t: 'mut',  s: '# HELP http_requests_total Total requests' },
    { t: 'info', s: 'http_requests_total{method="GET",code="200"}   4827193' },
    { t: 'info', s: 'http_requests_total{method="POST",code="201"}   918442' },
    { t: 'info', s: 'http_requests_total{method="POST",code="500"}       173' },
    { t: 'info', s: 'http_request_duration_seconds_bucket{le="0.1"}  5612310' },
    { t: 'info', s: 'http_request_duration_seconds_bucket{le="0.5"}  5740089' },
    { t: 'info', s: 'up{service="platform-api"}                           1' },
    { t: 'ok',   s: '✓ error budget burn rate: 0.3x (healthy)' },
  ]},
  incidents: { cmd: 'cat postmortems/recent.md', out: [
    { t: 'acc',  s: '## recent postmortems' },
    { t: 'warn', s: 'INC-0138 — 2024-09 · p95 spike no auth-service' },
    { t: 'mut',  s: '   cause: pool de conexões pg insuficiente após migração' },
    { t: 'ok',   s: '   fix:   pgbouncer introduzido + hpa ajustada' },
    { t: 'warn', s: 'INC-0124 — 2024-07 · deploy falho ao promover canary' },
    { t: 'mut',  s: '   cause: flag de feature lendo redis antes do cache warm' },
    { t: 'ok',   s: '   fix:   readinessProbe customizada + warmup job' },
    { t: 'info', s: 'MTTD: 2m 40s  ·  MTTR: 12m' },
  ]},
};

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

function termWrite(line, fast) {
  const body = document.getElementById('term-body');
  if (!body) return Promise.resolve();
  const el = document.createElement('span'); el.className = 'tl'; body.appendChild(el);
  const txt = line.s || ''; const cls = line.t || 'mut';
  if (fast) {
    el.innerHTML = `<span class="${cls}">${escapeHtml(txt)}</span>\n`;
    body.scrollTop = body.scrollHeight;
    return Promise.resolve();
  }
  return new Promise(r => {
    let i = 0;
    const span = document.createElement('span'); span.className = cls; el.appendChild(span);
    const tick = () => {
      if (i <= txt.length) {
        span.textContent = txt.slice(0, i);
        i += Math.max(2, Math.ceil(txt.length / 40));
        body.scrollTop = body.scrollHeight;
        setTimeout(tick, 8);
      } else {
        span.textContent = txt;
        el.appendChild(document.createTextNode('\n'));
        body.scrollTop = body.scrollHeight;
        r();
      }
    };
    tick();
  });
}

function renderPrompt() {
  const body = document.getElementById('term-body');
  if (!body) return;
  const wrap = document.createElement('span');
  wrap.className = 'tl term-input-line';
  wrap.innerHTML = `<span class="us">davi</span><span class="at">@</span><span class="acc">devops</span><span class="mut">:</span><span class="pth">~/platform</span><span class="mut">$</span>`;
  const input = document.createElement('input');
  input.type = 'text'; input.autocomplete = 'off'; input.spellcheck = false;
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const v = input.value.trim();
      input.disabled = true;
      wrap.querySelector('.cursor-term')?.remove();
      const echoed = document.createElement('span'); echoed.className = 'cmd'; echoed.textContent = ' ' + v;
      input.replaceWith(echoed);
      if (!v) { renderPrompt(); return; }
      runCommand(v);
    }
  });
  const cursor = document.createElement('span'); cursor.className = 'cursor-term';
  wrap.appendChild(document.createTextNode(' '));
  wrap.appendChild(input);
  wrap.appendChild(cursor);
  body.appendChild(wrap);
  body.scrollTop = body.scrollHeight;
  setTimeout(() => input.focus(), 30);
}

async function bootTerminal() {
  const body = document.getElementById('term-body');
  if (!body) return;
  body.innerHTML = '';
  const lines = currentLang === 'pt' ? TERM_OUT.boot_pt : TERM_OUT.boot_en;
  for (const l of lines) { await termWrite(l); await new Promise(r => setTimeout(r, 60)); }
  await termWrite({ t: 'mut', s: '' }, true);
  renderPrompt();
}

async function runCommand(key) {
  const body = document.getElementById('term-body');
  if (!body) return;
  let k = key;
  const norm = key.toLowerCase().split(/\s+/)[0];
  const map = { 'cat': 'stack', './deploy': 'deploy', 'curl': 'metrics', 'ls': 'help' };
  if (map[norm]) k = map[norm]; else if (CMDS[norm]) k = norm;
  if (k === 'clear') { body.innerHTML = ''; renderPrompt(); return; }
  const payload = CMDS[k] || { cmd: key, out: [{ t: 'err', s: `zsh: command not found: ${key}. digite "help".` }] };
  if (CMDS[k] && CMDS[k].cmd && CMDS[k].cmd.trim() !== key.trim()) {
    await termWrite({ t: 'mut', s: '→ ' + CMDS[k].cmd }, true);
  }
  for (const line of payload.out) {
    await termWrite(line, line.s.length > 60);
    await new Promise(r => setTimeout(r, 30));
  }
  await termWrite({ t: 'mut', s: '' }, true);
  renderPrompt();
}

function setupTerminal() {
  if (!document.getElementById('term-body')) return;

  const launch = document.getElementById('launch-term');
  if (launch) launch.addEventListener('click', () => {
    if (!window.__termInitialized) { window.__termInitialized = true; bootTerminal(); }
    else { runCommand('help'); }
  });

  document.querySelectorAll('.cmd-chip').forEach(c => {
    c.addEventListener('click', () => {
      if (!window.__termInitialized) { window.__termInitialized = true; bootTerminal(); }
      runCommand(c.dataset.run);
    });
  });

  document.getElementById('term-clear')?.addEventListener('click', () => {
    const b = document.getElementById('term-body');
    if (b) { b.innerHTML = ''; renderPrompt(); }
  });
  document.getElementById('term-restart')?.addEventListener('click', () => {
    window.__termInitialized = false;
    const b = document.getElementById('term-body'); if (b) b.innerHTML = '';
    bootTerminal();
  });

  // Auto-boot when user lands on devops page
  if (!window.__termInitialized) {
    window.__termInitialized = true;
    setTimeout(bootTerminal, 200);
  }
}

/* ───────── Experience: parse data/linkedin-experience.html ─────────
   Selectors below intentionally avoid LinkedIn's obfuscated class names
   (which change every deploy) and use stable attributes only:
   componentkey, aria-label, data-testid, href patterns. */

const TERM_PT_EN = {
  'Tempo integral': 'Full-time',
  'Meio período': 'Part-time',
  'Freelance': 'Freelance',
  'Estágio': 'Internship',
  'Autônomo': 'Self-employed',
  'Contrato': 'Contract',
  'Temporário': 'Temporary',
  'Híbrido': 'Hybrid',
  'Remoto': 'Remote',
  'Presencial': 'On-site',
  'presente': 'present',
  'o momento': 'present',
  ' anos ': ' yrs ',
  ' ano ':  ' yr ',
  ' meses': ' mo',
  ' mês':   ' mo',
};

function tr(s) {
  if (!s || currentLang !== 'en') return s;
  let out = s;
  for (const [pt, en] of Object.entries(TERM_PT_EN)) out = out.split(pt).join(en);
  // tail-only tokens (no trailing space)
  out = out.replace(/(\d+)\s+anos?$/, '$1 yrs').replace(/(\d+)\s+meses?$/, '$1 mo');
  return out;
}

let __expData = null;

async function loadExperienceFile() {
  if (__expData) return __expData;
  const res = await fetch('data/linkedin-experience.html', { cache: 'no-cache' });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const text = await res.text();
  const doc = new DOMParser().parseFromString(text, 'text/html');
  // Iterate per role anchor (handles multi-role at the same company correctly).
  const roleAnchors = [...doc.querySelectorAll('a[aria-label^="Editar "][href*="/edit/forms/"]')];
  __expData = roleAnchors.map(parseRoleAnchor).filter(Boolean);
  return __expData;
}

// Stable shape: each role exposes its position ID (from /forms/{id}/), which
// also keys its skills overlay (/overlay/{id}/skill-associations-details/).
// In the current LinkedIn layout the "Editar X na empresa Y" anchor is itself
// empty (it's the "Improve with AI" button). The metadata <p>s live as siblings
// inside the wrapper; multi-role wrappers interleave several role groups, each
// starting with a <p> whose text equals the role title (from aria-label).
function parseRoleAnchor(anchor) {
  const al = anchor.getAttribute('aria-label') || '';
  const m  = al.match(/^Editar\s+(.+?)\s+na empresa\s+(.+)$/);
  let title   = m ? m[1].trim() : '';
  let company = m ? m[2].trim() : '';
  const positionId = ((anchor.getAttribute('href') || '').match(/\/forms\/(\d+)/) || [])[1] || '';

  const wrapper = anchor.closest('[componentkey^="entity-collection-item-"]');
  if (!wrapper || !title) return null;

  // Collect wrapper-level <p>s, dropping noise: skill-anchor children and the
  // "O LinkedIn me ajudou..." helper banner.
  const allPs = [...wrapper.querySelectorAll('p')].filter(p => {
    if (p.closest('a[href*="/skill-associations-details/"]')) return false;
    if (/^O LinkedIn me ajudou/i.test(p.textContent.trim())) return false;
    if (/^LinkedIn helped me get/i.test(p.textContent.trim())) return false;
    return true;
  });

  // Each role's group starts at its own title <p>. Title <p>s match aria-labels.
  const roleTitles = new Set(
    [...wrapper.querySelectorAll('a[aria-label^="Editar "]')]
      .map(a => ((a.getAttribute('aria-label') || '').match(/^Editar\s+(.+?)\s+na empresa\s+/) || [, ''])[1].trim())
      .filter(Boolean)
  );

  const titleIdx = allPs.findIndex(p => p.textContent.trim() === title);
  if (titleIdx < 0) return null;
  const nextIdx = allPs.findIndex((p, i) => i > titleIdx && roleTitles.has(p.textContent.trim()));
  const group = allPs.slice(titleIdx, nextIdx < 0 ? allPs.length : nextIdx);
  const txts  = group.map(p => p.textContent.trim());

  // Sniff each <p> by content shape: order varies between single-role
  // ("Company · Type" + location) and nested role (just "Type", no location).
  let employmentType = '', dateLine = '', locLine = '';
  for (let i = 1; i < txts.length; i++) {
    const t = txts[i];
    if (!dateLine && /\d{4}/.test(t) && /[-–]/.test(t)) { dateLine = t; continue; }
    if (!locLine && /(Brasil|Brazil|·\s*(Remoto|Remote|Híbrido|Hybrid|Presencial|On-site))/i.test(t)) {
      locLine = t; continue;
    }
    if (!employmentType) {
      const lastDot = t.lastIndexOf('·');
      if (lastDot >= 0) {
        const before = t.slice(0, lastDot).trim();
        if (!company) company = before;
        employmentType = t.slice(lastDot + 1).trim();
      } else {
        employmentType = t;
      }
    }
  }

  let startYear = '', endYear = '', endIsPresent = false, duration = '';
  const dm = dateLine.match(/^(.+?)\s*[-–]\s*(.+?)\s*·\s*(.+)$/);
  if (dm) {
    startYear = (dm[1].match(/(\d{4})/) || [, dm[1].trim()])[1];
    const endRaw = dm[2].trim();
    if (/o momento|presente|present|the present/i.test(endRaw)) endIsPresent = true;
    else endYear = (endRaw.match(/(\d{4})/) || [, endRaw])[1];
    duration = dm[3].trim();
  }

  let city = '', modality = '';
  const lm = locLine.match(/^(.+?)\s*·\s*(.+)$/);
  if (lm) { city = lm[1].split(',')[0].trim(); modality = lm[2].trim(); }
  else if (locLine) city = locLine.split(',')[0].trim();

  // Multi-role wrappers omit role-level location — fall back to a wrapper-level
  // location <p> that sits OUTSIDE all role groups (e.g. "São Paulo, Brasil").
  if (!city && !modality) {
    const groupSet = new Set(group);
    for (const p of allPs) {
      if (groupSet.has(p)) continue;
      const t = p.textContent.trim();
      if (/Brasil|Brazil/i.test(t) && !roleTitles.has(t)) {
        const lm2 = t.match(/^(.+?)\s*·\s*(.+)$/);
        if (lm2) { city = lm2[1].split(',')[0].trim(); modality = lm2[2].trim(); }
        else city = t.split(',')[0].trim();
        break;
      }
    }
  }

  // Skills paired by position ID — same numeric id appears in both URLs.
  let skills = [], skillsExtra = 0;
  if (positionId) {
    const skillAnchor = anchor.ownerDocument.querySelector(
      `a[href*="/overlay/${positionId}/skill-associations-details/"]`
    );
    if (skillAnchor) {
      let txt = skillAnchor.textContent.trim()
        .replace(/^Compet[êe]ncias:\s*/i, '')
        .replace(/^Skills:\s*/i, '');
      const sm = txt.match(/^(.+?)\s+e\s+mais\s+(\d+)\s+competência/i)
              || txt.match(/^(.+?)\s+and\s+(\d+)\s+more\s+skills?/i);
      if (sm) {
        skills = sm[1].split(',').map(s => s.trim()).filter(Boolean);
        skillsExtra = parseInt(sm[2], 10);
      } else {
        skills = txt.split(',').map(s => s.trim()).filter(Boolean);
      }
    }
  }

  // Description only safe to attach in single-role wrappers (otherwise we'd
  // assign one role's text to a sibling role).
  let desc = '';
  if (roleTitles.size === 1) {
    const w = wrapper.querySelector('[data-testid="expandable-text-box"]');
    if (w) desc = w.textContent.trim();
  }

  return { positionId, title, company, employmentType, startYear, endYear, endIsPresent,
           duration, city, modality, desc, skills, skillsExtra };
}

function renderExpItem(exp) {
  const endLabel = exp.endIsPresent
    ? (currentLang === 'en' ? 'present' : 'presente')
    : escapeHtml(exp.endYear);

  const locBits = [];
  if (exp.city)     locBits.push(escapeHtml(exp.city));
  if (exp.modality) locBits.push(escapeHtml(tr(exp.modality)));
  const locHtml = locBits.length
    ? ` <span class="loc">· ${locBits.join(' · ')}</span>`
    : '';

  const tagsArr = exp.skills.map(s => `<span class="tg">${escapeHtml(s)}</span>`);
  if (exp.skillsExtra > 0) tagsArr.push(`<span class="tg">+${exp.skillsExtra}</span>`);
  if (exp.employmentType) {
    tagsArr.push(`<span class="tg" style="border-color:var(--accent-dim);color:var(--accent-bright);">${escapeHtml(tr(exp.employmentType))}</span>`);
  }

  const descHtml = exp.desc ? `<p>${escapeHtml(exp.desc)}</p>` : '';
  const tagsHtml = tagsArr.length ? `<div class="exp-tags">${tagsArr.join('')}</div>` : '';

  return `
    <div class="exp-item">
      <div class="exp-date">
        ${escapeHtml(exp.startYear)} — ${endLabel}
        <span class="dur">${escapeHtml(tr(exp.duration))}</span>
      </div>
      <div class="exp-body">
        <h3>${escapeHtml(exp.title)}</h3>
        <div class="co">@ ${escapeHtml(exp.company)}${locHtml}</div>
        ${descHtml}
        ${tagsHtml}
      </div>
    </div>`;
}

async function renderExperience() {
  const container = document.getElementById('exp-list');
  if (!container) return;
  try {
    const data = await loadExperienceFile();
    if (!data.length) {
      container.innerHTML = `<p class="exp-error">⚠ <code>data/linkedin-experience.html</code> não tem nenhum <code>[componentkey^="entity-collection-item-"]</code>.</p>`;
      return;
    }
    container.innerHTML = data.map(renderExpItem).join('');
  } catch (err) {
    container.innerHTML = `<p class="exp-error">⚠ Falha ao carregar <code>data/linkedin-experience.html</code>: ${escapeHtml(err.message)}</p>`;
  }
}

/* ─── Init ──────────────────────────────────────────────── */
applyTheme(currentTheme);
applyLang(currentLang);
setupShellNav();
setupPager();
setupActions();
setupModal();
setupKeyboard();
setupTerminal();
renderExperience();
