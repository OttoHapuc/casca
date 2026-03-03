import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const data = {
  Conteudo: [
    {
      id: 1,
      slug: 'principal',
      dados: {
        hero: {
          badge: 'Desde 2004 transformando vidas',
          titulo: 'CENTRO DE ATENDIMENTO SOCIAL À CRIANÇA E AO ADOLESCENTE',
          subtitulo: '',
          imagemFundo: 'https://casca.tatyverri.com/assets/images/fundadores-713x535.png',
        },
        sobre: {
          titulo: 'NOSSA RAZÃO DE EXISTIR',
          pilares: [
            {
              desc: 'Proporcionar atendimentos às crianças, aos adolescentes e famílias em situações de vulnerabilidade social e contribuir no fortalecimento de vínculos familiares e convivência comunitária para a reintegração dos mesmos na sociedade.\n',
              imagem: '',
              titulo: 'Missão',
            },
            {
              desc: 'Queremos ser reconhecido pela excelência nos serviços prestados e acolhimento às crianças, aos adolescentes e suas famílias.\nDessa forma, torna-se referência de entidade sem fins lucrativos, através de sua solidez e transparência.\n\n\n',
              imagem:
                'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop',
              titulo: 'Visão',
            },
            {
              desc: 'Nossos atendimentos são baseados na ética, amor, compreensão, diálogo, respeito e sensibilidade.',
              imagem:
                'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2070&auto=format&fit=crop',
              titulo: 'Valores',
            },
          ],
          paragrafos: [
            'Após a realização de uma coleta de dados, no município de Tremembé - SP, junto ao Conselho tutelar e da Vara da Infância e Juventude, que um grupo de ativistas sociais, formados por assistentes sociais, psicólogos, advogados e contadores; resolveram se juntar para combater o constante crescimento do número de crianças e adolescentes em situação de risco relacionados a violência doméstica e social causados pela ausência de políticas públicas.',
            'Assim surgiu a ONG C.A.S.C.A. Centro de Atendimento Social à Criança e ao Adolescente, em 18 de agosto de 2004, com o objetivo de proporcionar atendimentos às crianças, aos adolescentes e famílias em situações de vulnerabilidade social e  contribuir no fortalecimento de vínculos familiares e convivência comunitária para a reintegração dos mesmos na sociedade.',
          ],
          imagemDestaque:
            'https://images.unsplash.com/photo-1524069290683-0457abfe42c3?q=80&w=2070&auto=format&fit=crop',
        },
        contato: {
          badge: 'Participe da Nossa Causa',
          email: 'contato@casca.tatyverri.com',
          titulo: 'Toda ajuda transforma um futuro.',
          endereco: 'Bom Jesus, 61 - Centro - Tremembé/SP',
          descricao: 'Transforme a vida de crianças e adolescentes em Tremembé.',
          imagemFundo: '',
        },
        projetos: {
          lista: [
            {
              id: 'proj1',
              imagem: 'https://casca.tatyverri.com/assets/images/projeto-felix-626x470.png',
              titulo: 'Projeto FÉLIX',
              detalhes:
                'Esse projeto visa realizar a inclusão digital de crianças e adolescentes em situação de vulnerabilidade social. Contribuindo com a formação profissional dos\nalunos, proporcionando conhecimentos imprescindíveis para a fase de desenvolvimento dos participantes, tirando-os da ociosidade. Um projeto  em parceria com a Unimed Taubaté.',
              parceiros: '',
              resultados: '',
            },
            {
              id: 'a4c9dda7-c307-42b2-9026-133d60bf486f',
              imagem: '',
              titulo: 'PROJETO CONTRATURNO ESCOLAR',
              detalhes:
                ' Atendimento a 402 alunos do 3º ao 5º ano do Ensino Público com Serviço de Reforço Escolar.',
              parceiros: 'Prefeitura de Pindamonhangaba',
              resultados:
                'Contribuindo para o desenvolvimento de atividades de leitura/ escrita/ matemática/ atividades lúdicas no contraturno) ajudando assim nas dificuldades de aprendizagem, com apoio técnico, gerenciamento e execução de atividades, ações e serviços',
            },
            {
              id: 'f1db0d3f-1347-429f-9840-2897d16a4da8',
              imagem: '',
              titulo: 'PROJETO DE EDUCAÇÃO INTEGRAL',
              detalhes:
                'Oferecer atendimento pedagógico integral a crianças de zero a três anos e onze meses de idade, matriculadas nas Unidades de Creches de Pindamonhangaba/SP',
              parceiros: 'Prefeitura de Pindamonhangaba',
              resultados:
                'Contribuindo para o desenvolvimento Cognitivo e Social com atividades que promovem a estimulação do raciocínio lógico, linguagem, socializações.',
            },
            {
              id: '3524a492-028d-4d93-813c-a4549bfa1330',
              imagem: '',
              titulo: 'PROJETO AMIGOS DO ZIP',
              detalhes:
                'Ensinar educação emocional de forma lúdica a crianças na faixa de seis e sete anos de idade, auxiliando-as a lidar com as dificuldades do dia a dia, a identificar e a falar sobre seus sentimentos, explorando as várias maneiras de lidar com eles, objetivando um crescimento saudável emocionalmente.',
              parceiros: 'ASEC - Associação pela Saúde Emocional da Criança',
              resultados:
                'Com base no feedback dos pais dos participantes; nos foi relatado a melhora no comportamento de seus filhos no lar e com os colegas de escola. O projeto foi concluído com êxito.',
            },
            {
              id: '5b5b2c50-c38f-4ed4-93e3-2322e1a39bdb',
              imagem: '',
              titulo: 'PROJETO GERAÇÃO DE RENDA VIDA NOVA',
              detalhes:
                'Capacitar jovens para o mercado de trabalho (menor aprendiz), oferecendo conhecimento e ferramentas para sua jornada  profissional tornando-os protagonistas e gerando renda de forma autônoma.\n',
              parceiros: 'Governo do Estado de São Paulo com o apoio do CONDECA',
              resultados:
                'Além da capacitação técnica, os jovens oportunizaram: visita técnica em uma empresa multinacional americana; participação em palestras e dinâmicas. Dos alunos, 33% foram inseridos no mercado de trabalho do município.',
            },
            {
              id: '88ba1273-1909-4cc5-8378-a85d50ab5e44',
              imagem: '',
              titulo: 'PROJETO SALÃO ESCOLA DE EMPREENDEDORES',
              detalhes:
                'Capacitar profissionalmente adolescentes na área da estética e beleza na perspectiva de prepara-los para inserção ao mercado de trabalho e/ou despertar-los  para a importância do empreendedorismo como propulsor do protagonismo juvenil e o fortalecimento da autoestima, visando a geração de renda familiar.',
              parceiros: 'CONDECA',
              resultados:
                'Projeto em Andamento; com objetivos de capacitar adolescentes, em 3 segmentos da estética: Auxiliar de Salão, manicure/pedicure e designer de sobrancelhas.',
            },
            {
              id: 'f06493dd-c85b-49ad-879a-c092f05d89ba',
              imagem: '',
              titulo: 'PROJETO CASA LAR',
              detalhes:
                'Serviço de acolhimento institucional na modalidade Casa Lar para crianças e adolescentes de 0 a 17 anos,  vítimas de violência.\nCaracterísticas:\nMedida excepcional e provisória\nAmbiente seguro e acolhedor\nEquipe multidisciplinar\nIntegração com SUAS, ECA e órgãos competentes',
              parceiros: 'Prefeitura Municipal de Caçapava',
              resultados: 'Resultados...',
            },
            {
              id: 'f22e1a7d-fe79-4ccd-b169-d47b55f55abc',
              imagem: '',
              titulo: 'PROJETO ABORDAGEM E ACOLHIMENTO',
              detalhes:
                'Acolhimento humanizado e reintegração social para pessoas em situação de rua e migrantes em Caçapava.\nCaracterísticas:\nCentro de Abordagem Social - Casa de Passagem\n(24h)\nAlimentação, banho e acompanhamento\npsicossocial\nOperação Inverno para períodos mais frios\nAções integradas com GCM e Polícia Militar',
              parceiros: 'Prefeitura Municipal de Caçapava',
              resultados: 'Resultados...',
            },
            {
              id: '7b1f6cae-f15e-4d82-946c-0732b1dca297',
              imagem: '',
              titulo: 'PROJETO SEMENTES DA INCLUSÃO',
              detalhes:
                'Objetivos:\nSistema estruturado de apoio escolar inclusivo para crianças e estudantes com necessidades especiais, atendendo aproximadamente 3.680 estudantes,\nsendo 1.980 com TEA.\nCaracterísticas:\nAvaliação e planejamento individualizado\nFormação e capacitação continuada\nPráticas pedagógicas inclusivas\nSistema de acompanhamento em três níveis',
              parceiros: 'São José dos Pinhais',
              resultados: 'Resultados...',
            },
          ],
          titulo: 'Projetos em destaque',
          descricao: '',
          imagemFundo: 'https://casca.tatyverri.com/assets/images/projeto-vida-nova-492x369.png',
        },
        atividades: {
          lista: [
            {
              id: 'atv1',
              ordem: '01',
              imagem: '',
              titulo: 'Atendimento psicológico',
              descricao: 'Atendimento individudal ou em grupo',
            },
            {
              id: 'atv2',
              ordem: '02',
              imagem: '',
              titulo: 'Atividades educacionais',
              descricao:
                'Facilitando e participando da inclusão de crianças e adolescentes nas escolas\n\n',
            },
            {
              id: 'atv3',
              ordem: '03',
              imagem: '',
              titulo: 'Atividades de Entretenimento ',
              descricao:
                'Atividades de entretenimento através de palestras socioeducativas com o objetivo de reconhecer a sua autoestima, seus direitos e seus deveres.',
            },
            {
              id: '1da3947d-a9f4-43f7-9cff-bdf3f07b0e9f',
              ordem: '04',
              imagem: '',
              titulo: 'Oficinas ocupacionais',
              descricao: 'Nossas oficinas tem como proposta a geração de rende para os jovens',
            },
            {
              id: 'ea86018a-7426-4892-9ad5-43ba50e82628',
              ordem: '05',
              imagem: '',
              titulo: 'Social e Esporte',
              descricao: 'Atividades sociais e esportivas.',
            },
          ],
          titulo: 'Atividades desenvolvidas',
          descricao:
            'Entre as atividades do C.A.S.C.A. estão os atendimentos as crianças, aos adolescentes e as suas famílias, com equipes multidisciplinar e interdisciplinar',
          imagemFundo: 'https://casca.tatyverri.com/assets/images/atividades-722x446.png',
        },
      },
      criadoEm: '2026-02-22T07:44:49.640Z',
      atualizadoEm: '2026-02-25T15:10:28.557Z',
    },
  ],
  Relatorio: [
    {
      id: 'cmlzrz3v50000kxgwn06te7go',
      titulo: 'Tste',
      data: '2026-01-01T03:00:00.000Z',
      categoria: 'Transparência',
      arquivoUrl: 'https://proexc.ufu.br/sites/proexc.ufu.br/files/media/document//pdf-exemplo.pdf',
      criadoEm: '2026-02-23T22:55:42.930Z',
      atualizadoEm: '2026-02-23T22:55:42.930Z',
    },
  ],
  Atividade: [],
  Projeto: [],
  Certificacao: [
    {
      id: 'cmlzpudfn0002kx8syuiepxyz',
      titulo: '\tUtilidade Publica Municipal',
      imagemUrl:
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSh_PxnZ9gBvXa5pNL-7nssqU72nLha2NPzLGFcMxgWfU-cvroy',
      criadoEm: '2026-02-23T21:56:02.820Z',
      deletadoEm: null,
    },
    {
      id: 'cmlzrxoqr0001kxe4qyym7p0r',
      titulo: 'Utilidade publica Estado',
      imagemUrl:
        'https://upload.wikimedia.org/wikipedia/commons/1/1a/Bras%C3%A3o_do_estado_de_S%C3%A3o_Paulo.svg',
      criadoEm: '2026-02-23T22:54:36.675Z',
      deletadoEm: null,
    },
    {
      id: 'cmm22kwxt0000um7w8z3sxc54',
      titulo: 'Utilidade Pública Federall nº 3.016',
      imagemUrl: 'https://www.novafriburgo.rj.leg.br/imagens/brasao-republica.png/image',
      criadoEm: '2026-02-25T13:28:08.146Z',
      deletadoEm: null,
    },
    {
      id: 'cmm22n44g0001um7wxwnpy400',
      titulo: 'CMAS nº 011/2006',
      imagemUrl:
        'https://www.vargemgrandepaulista.sp.gov.br/site/wp-content/uploads/2017/07/logo_cmas.png',
      criadoEm: '2026-02-25T13:29:51.504Z',
      deletadoEm: null,
    },
    {
      id: 'cmm22vo7w0002um7wuufoifik',
      titulo: 'CMDCA nº 005/2005',
      imagemUrl:
        'https://tangara.sc.gov.br/uploads/sites/450/2022/07/1819517_resize_1000_10001.jpg',
      criadoEm: '2026-02-25T13:36:30.050Z',
      deletadoEm: null,
    },
    {
      id: 'cmm22wzzm0003um7wvyjqw1jj',
      titulo: 'CEBAS nº 71000',
      imagemUrl: 'https://cdn.unasp.br/home/2020/01/15065303/logo-cebas-300x166.png',
      criadoEm: '2026-02-25T13:37:32.703Z',
      deletadoEm: null,
    },
    {
      id: 'cmm230x900004um7w4f2n3ycd',
      titulo: 'CRCE nº 1380/2013',
      imagemUrl:
        'https://upload.wikimedia.org/wikipedia/commons/1/1a/Bras%C3%A3o_do_estado_de_S%C3%A3o_Paulo.svg',
      criadoEm: '2026-02-25T13:40:35.749Z',
      deletadoEm: null,
    },
    {
      id: 'cmm236cba0005um7w6sj1e6f0',
      titulo: 'SEDS/PS nº7472/2010',
      imagemUrl:
        'https://media.licdn.com/dms/image/v2/C4D0BAQFT-2SBi2WTxw/company-logo_200_200/company-logo_200_200/0/1677858073714/desenvolvimentosocialsp_logo?e=2147483647&v=beta&t=R7TAa5UEG0fiMHflsq2-2AZmUko-I1SwsnxdNKs7LQE',
      criadoEm: '2026-02-25T13:44:48.442Z',
      deletadoEm: null,
    },
  ],
  Cidade: [
    {
      id: 'cmlzrbv970004kx8s8zl0o4ch',
      nome: 'Pindamonhangaba',
      criadoEm: '2026-02-23T22:37:38.683Z',
      deletadoEm: null,
    },
    {
      id: 'cmm0z6hnj0000jm04rdwl8nin',
      nome: 'Pinda - Projeto 1',
      criadoEm: '2026-02-24T19:05:10.880Z',
      deletadoEm: null,
    },
    {
      id: 'cmm0z6pw90000jr04ifdiffty',
      nome: 'Pinda - Projeto 2',
      criadoEm: '2026-02-24T19:05:21.562Z',
      deletadoEm: null,
    },
  ],
  Anexo: [
    {
      id: 'cmlzrzfrh0002kxgwo1xnf486',
      titulo: 'Teste',
      arquivoUrl: 'https://proexc.ufu.br/sites/proexc.ufu.br/files/media/document//pdf-exemplo.pdf',
      classificacao: 'Balanço',
      cidadeId: 'cmlzrbv970004kx8s8zl0o4ch',
      criadoEm: '2026-02-23T22:55:58.349Z',
      deletadoEm: null,
    },
  ],
  Classificacao: [
    {
      id: 'cmlzrvlg40000kxe4w71wk22l',
      nome: 'Balanço',
      criadoEm: '2026-02-23T22:52:59.093Z',
      deletadoEm: null,
    },
  ],
  Ouvidoria: [
    {
      id: 1,
      planilhaUrl: 'https://script.google.com/macros/s/AKfycbz7iyA83aoJFSh8eKaOuyS8qeMkwW3u1ioKmdcpsRVFGdpN3UD3VPJRSNrroXTgZ0NilA/exec',
      campos: {
        anonimo: { enabled: true, required: true, label: 'Deseja se identificar?' },
        nome: { enabled: true, required: false, label: 'Nome completo' },
        cidadeServico: { enabled: true, required: true, label: 'Cidade/Serviço' },
        dataOcorrido: { enabled: true, required: false, label: 'Data do ocorrido' },
        descricao: { enabled: true, required: true, label: 'Descreva a situação' },
        persiste: { enabled: true, required: false, label: 'O problema persiste?' },
        desejaRetorno: { enabled: true, required: true, label: 'Deseja receber retorno?' }
      },
      tipo: {
        enabled: true,
        required: true,
        label: 'Tipo de manifestação',
        options: ['Reclamação', 'Sugestão', 'Elogio', 'Solicitação', 'Denúncia']
      },
      meioContato: {
        enabled: true,
        required: false,
        label: 'Meio de contato preferencial',
        options: ['E-mail', 'Telefone']
      }
    }
  ]
}

async function main() {
  console.log('Limpando banco de dados atual...')
  // Delete in order to respect foreign keys
  await prisma.anexo.deleteMany()
  await prisma.cidade.deleteMany()
  await prisma.classificacao.deleteMany()
  await prisma.certificacao.deleteMany()
  await prisma.projeto.deleteMany()
  await prisma.atividade.deleteMany()
  await prisma.relatorio.deleteMany()
  await prisma.ouvidoria.deleteMany()
  await prisma.conteudo.deleteMany()

  console.log('Inserindo Conteudo...')
  for (const item of data.Conteudo) {
    await prisma.conteudo.create({ data: item })
  }

  console.log('Inserindo Classificacao...')
  for (const item of data.Classificacao) {
    await prisma.classificacao.create({ data: item })
  }

  console.log('Inserindo Cidade...')
  for (const item of data.Cidade) {
    await prisma.cidade.create({ data: item })
  }

  console.log('Inserindo Certificacao...')
  for (const item of data.Certificacao) {
    await prisma.certificacao.create({ data: item })
  }

  console.log('Inserindo Relatorio...')
  for (const item of data.Relatorio) {
    await prisma.relatorio.create({ data: item })
  }

  console.log('Inserindo Anexo...')
  for (const item of data.Anexo) {
    await prisma.anexo.create({ data: item })
  }

  console.log('Inserindo Ouvidoria...')
  for (const item of data.Ouvidoria) {
    await prisma.ouvidoria.create({ data: item })
  }

  console.log('Banco de dados semeado com sucesso com os dados do banco externo!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
