# Graph Report - . (2026-07-14)

## Corpus Check

- Corpus is ~21,746 words - fits in a single context window. You may not need a graph.

## Summary

- 410 nodes · 648 edges · 43 communities (17 shown, 26 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)

- Admin Content Actions
- Home Content API
- Institutional Prospectus
- Admin Anexos Ouvidoria
- Anexos Gestao UI
- NPM Dependencies
- Ouvidoria Config UI
- Husky Lint Tooling
- TypeScript Config
- Transparencia Relatorios
- CASCA Brand Logo
- Documentos Filtrados UI
- Institutional Certifications
- Admin Auth Layout
- Root Typography Layout
- DB Check Script JS
- Database Seed Script
- DB Check Script TS
- Shell Path Helper
- Hero Section Component
- Navbar Navigation
- Home Schema Types
- ESLint Config
- Husky Applypatch Hook
- Husky Commit Msg Hook
- Husky Post Applypatch
- Husky Post Checkout
- Husky Post Commit
- Husky Post Merge
- Husky Post Rewrite
- Husky Pre Applypatch
- Husky Pre Auto GC
- Husky Pre Commit
- Husky Pre Merge Commit
- Husky Pre Push
- Husky Pre Rebase
- Husky Prepare Commit Msg
- Next.js Config
- PostCSS Config
- Hero Form Types
- Relatorio Form Types

## God Nodes (most connected - your core abstractions)

1. `withDb()` - 35 edges
2. `RespostaPadrao` - 27 edges
3. `C.A.S.C.A. — Centro de Atendimento Social à Criança e ao Adolescente` - 21 edges
4. `compilerOptions` - 16 edges
5. `Projetos realizados` - 10 edges
6. `Certificações institucionais C.A.S.C.A.` - 9 edges
7. `scripts` - 8 edges
8. `buscarCidades()` - 8 edges
9. `HomePage()` - 8 edges
10. `C.A.S.C.A circular logo` - 8 edges

## Surprising Connections (you probably didn't know these)

- `GET()` --calls--> `buscarOuvidoriaConfigAdmin()` [EXTRACTED]
  src/app/api/auth/ouvidoria-config/route.ts → src/actions/page-action.admin.ouvidoria.config.ts
- `buscarCidades()` --calls--> `withDb()` [EXTRACTED]
  src/actions/page-action.admin.gerir-anexos.ts → src/lib/prisma.ts
- `GET()` --calls--> `buscarCidades()` [EXTRACTED]
  src/app/api/auth/anexos/get.ts → src/actions/page-action.admin.gerir-anexos.ts
- `POST()` --calls--> `adicionarAnexo()` [EXTRACTED]
  src/app/api/auth/anexos/post.ts → src/actions/page-action.admin.gerir-anexos.ts
- `POST()` --calls--> `adicionarAnexo()` [EXTRACTED]
  src/app/api/auth/anexos/route.ts → src/actions/page-action.admin.gerir-anexos.ts

## Import Cycles

- None detected.

## Hyperedges (group relationships)

- **Central egg emblem with children and C.A.S.C.A text** — public_logo2_egg_shell, public_logo2_boy_figure, public_logo2_girl_figure, public_logo2_casca_text [EXTRACTED 1.00]

## Communities (43 total, 26 thin omitted)

### Community 0 - "Admin Content Actions"

Cohesion: 0.09
Nodes (22): adicionarCertificacao(), excluirCertificacao(), adicionarClassificacao(), buscarClassificacoes(), excluirClassificacao(), adicionarRelatorio(), excluirRelatorio(), salvarConteudoHome() (+14 more)

### Community 1 - "Home Content API"

Cohesion: 0.08
Nodes (22): buscarCertificacoes(), buscarConteudoHome(), GET(), itensNavegacao, Contato(), formatFacebook(), formatInstagram(), getFacebookUrl() (+14 more)

### Community 2 - "Institutional Prospectus"

Cohesion: 0.07
Nodes (44): ASEC — Associação pela Saúde Emocional da Criança, Atendimento psicológico em grupos, Atividades desenvolvidas, Centro de Abordagem Social — Casa de Passagem (24h), CONDECA, Conselho Tutelar, Contato C.A.S.C.A. (Bom Jesus 61, e-mail, site, redes, telefone), Apresentação / Prospecto C.A.S.C.A. (+36 more)

### Community 3 - "Admin Anexos Ouvidoria"

Cohesion: 0.11
Nodes (21): adicionarAnexo(), adicionarCidade(), buscarAnexos(), excluirAnexo(), excluirCidade(), buscarOuvidoriaConfigAdmin(), atualizarStatusManifestacao(), buscarManifestacoes() (+13 more)

### Community 4 - "Anexos Gestao UI"

Cohesion: 0.08
Nodes (7): AnexoFlat, TipoClassificacao, ICONE_CLASSIFICACAO, TipoAdminDashboard, TipoAnexo, TipoCidade, TipoCertificacao

### Community 5 - "NPM Dependencies"

Cohesion: 0.08
Nodes (24): dependencies, lucide-react, next, prisma, @prisma/client, react, react-dom, zod (+16 more)

### Community 6 - "Ouvidoria Config UI"

Cohesion: 0.13
Nodes (11): salvarOuvidoriaConfig(), buscarOuvidoriaConfig(), GET(), POST(), Estado, Erros, Props, OuvidoriaPage() (+3 more)

### Community 7 - "Husky Lint Tooling"

Cohesion: 0.10
Nodes (19): husky.sh script, devDependencies, @commitlint/cli, @commitlint/config-conventional, eslint, eslint-config-next, eslint-config-prettier, husky (+11 more)

### Community 8 - "TypeScript Config"

Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 9 - "Transparencia Relatorios"

Cohesion: 0.21
Nodes (6): buscarCidades(), buscarRelatorios(), GET(), GET(), TransparenciaPage(), TipoRelatorio

### Community 10 - "CASCA Brand Logo"

Cohesion: 0.38
Nodes (10): Stylized boy child icon, C.A.S.C.A circular logo, C.A.S.C.A brand text, Child-focused brand identity, Black egg/shell outline, Stylized girl child icon, Orange-to-pink gradient border, Shell as protection/nurture metaphor (+2 more)

### Community 11 - "Documentos Filtrados UI"

Cohesion: 0.24
Nodes (6): Anexo, ano(), contem(), DocumentosFiltrados(), ICONE, Props

### Community 12 - "Institutional Certifications"

Cohesion: 0.22
Nodes (9): CEBAS nº 71000 (Educação), Certificações institucionais C.A.S.C.A., CMAS nº 011/2006, CMDCA nº 005/2005, CRCE nº 1380/2013, SEDS/PS nº 7472/2010, Utilidade Pública Estadual Lei nº 15.493, Utilidade Pública Federal nº 3.016 (+1 more)

### Community 13 - "Admin Auth Layout"

Cohesion: 0.57
Nodes (5): sairPainelAdmin(), validarSenhaAdmin(), verificarAcesso(), AdminLayout(), navItems

### Community 14 - "Root Typography Layout"

Cohesion: 0.40
Nodes (3): lato, metadata, rubik

## Ambiguous Edges - Review These

- `Prefeitura de Pindamonhangaba` → `São José dos Pinhais` [AMBIGUOUS]
  Apresentação C.A.S.C.A.pdf · relation: conceptually_related_to
- `C.A.S.C.A circular logo` → `Social/educational organization purpose` [AMBIGUOUS]
  public/logo2.jpg · relation: conceptually_related_to
- `Child-focused brand identity` → `Social/educational organization purpose` [AMBIGUOUS]
  public/logo2.jpg · relation: conceptually_related_to

## Knowledge Gaps

- **112 isolated node(s):** `husky.sh script`, `{ PrismaClient }`, `prisma`, `prisma`, `eslintConfig` (+107 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Prefeitura de Pindamonhangaba` and `São José dos Pinhais`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `C.A.S.C.A circular logo` and `Social/educational organization purpose`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Child-focused brand identity` and `Social/educational organization purpose`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `prisma` connect `NPM Dependencies` to `Admin Anexos Ouvidoria`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `RespostaPadrao` connect `Admin Content Actions` to `Home Content API`, `Admin Anexos Ouvidoria`, `Anexos Gestao UI`, `Ouvidoria Config UI`, `Transparencia Relatorios`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **Are the 9 inferred relationships involving `C.A.S.C.A. — Centro de Atendimento Social à Criança e ao Adolescente` (e.g. with `Projeto Abordagem e Acolhimento` and `Projeto Amigos do Zip`) actually correct?**
  _`C.A.S.C.A. — Centro de Atendimento Social à Criança e ao Adolescente` has 9 INFERRED edges - model-reasoned connections that need verification._
- **What connects `husky.sh script`, `{ PrismaClient }`, `prisma` to the rest of the system?**
  _115 weakly-connected nodes found - possible documentation gaps or missing edges._
