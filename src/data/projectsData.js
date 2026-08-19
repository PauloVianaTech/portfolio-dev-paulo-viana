/*
  GUIA DE MIDIAS
  - Imagem: nao precisa de `type`.
  - Carrossel: use `type: "carousel"` e coloque seus slides em `slides`.
  - Video: use `type: "video"`, com `src`, `poster` e `caption`.
  - A ordem de `media` e a ordem da navegacao no modal.
*/

/*
  MODELO COPIAVEL DE PROJETO
  {
    id: "nome-do-projeto",
    title: "Nome do projeto",
    category: "Development", // Development | Design | Trading
    description: "Descricao curta do projeto.",
    types: ["Frontend"],
    context: "Projeto pessoal",
    tech: ["React", "Tailwind CSS"],
    image: "/images/projeto/capa.webp", // capa usada no card
    media: [
      { src: "/images/projeto/tela-01.webp", caption: "Descricao da imagem" },
      {
        type: "carousel",
        slides: [
          { src: "/images/projeto/carrossel-01.webp", caption: "Slide 1" },
          { src: "/images/projeto/carrossel-02.webp", caption: "Slide 2" },
        ],
      },
      {
        type: "video",
        src: "/videos/projeto/demo.mp4",
        poster: "/images/projeto/demo-capa.webp",
        caption: "Demonstracao do projeto",
      },
    ],
    buttons: [
      { type: "primary", icon: "demo", label: "Ver projeto", link: "https://" },
    ],
  },
*/

/*
  OPCOES DISPONIVEIS

  types: [
    "Frontend", "Backend", "Full Stack", "E-commerce", "API",
    "Landing Page", "Dashboard", "Portfolio", "Identidade Visual",
    "Design", "UI/UX", "UI Design", "Motion Design", "Social Media",
    "Trading Indicator", "Trading Automation", "Automation"
  ]

  context: [
    "Study Project", "Client Project", "Personal Project", "Open Source", "Concept"
  ]

  tech (formas recomendadas): [
    // Desenvolvimento
    "HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js",
    "Tailwind CSS", "Node.js", "Express", "MongoDB", "PostgreSQL",
    "Supabase", "Vite", "Git", "GitHub", "Git & GitHub", "Vercel",
    "Python", "WordPress", "Elementor",
    // IA
    "OpenAI", "ChatGPT", "Claude", "Anthropic", "Gemini", "Perplexity",
    "Ollama", "DeepSeek", "Kimi", "Suno", "Runway", "Cursor", "Lovable", "Framer",
    // Design
    "Figma", "Affinity", "After Effects", "Canva", "CapCut", "DaVinci Resolve",
    "Illustrator", "InDesign", "Photoshop", "Premiere", "Premiere Pro", "OBS Studio", "Branding",
    // Trading
    "Nelogica", "Nelogica NTSL", "NTSL", "Profit Pro", "MQL5", "MetaTrader 5", "BlackArrow"
  ]

  Aliases tambem reconhecidos por tech: HTML, CSS, TailwindCSS, Node, affinity,
  canva, capcut, after-Effects, davinci-resolve, illustrator, indesign, photoshop,
  premiere, obs-studio, nelogica, profit-pro-nelogica, mql5, metatrader5, MT5,
  blackarrow-nelogica e BlackArrow Nelogica.
*/

export const projectsData = [
  // DEVELOPMENT
  {
    id: "drip-store",
    title: "Drip Store",
    category: "Development",
    featured: true,
    date: "03-2026",
    status: "Completed",
    description:
      "E-commerce front-end desenvolvido com foco em responsividade, experiencia do usuario e interface moderna.E-commerce front-end desenvolvido com foco em responsividade, experiencia do usuario e interface moderna.",
    types: ["Frontend", "E-commerce", "Portfolio", "CRM", "Motion Design", "UI Design", "Mobile App", "Data Visualization"],
    context: "Study Project",
    tech: ["ChatGPT", "Python", "NestJS",  "Anthropic", "Gemini", "Canva", "Affinity", "JavaScript", "Next.js", "HTML5", "CSS3", "MongoDB", "Git & GitHub", "Vercel"],
    tags: ["Frontend", "Responsive", "UI/UX", "E-commerce"],
    role: "Frontend Developer",
    company: "Projeto academico",
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2070&auto=format&fit=crop",
    media: [
      {
        src: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2070&auto=format&fit=crop",
        caption: "Tela inicial do projeto",
      },
      {
        type: "carousel",
        slides: [
          {
            src: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=900&h=1600&auto=format&fit=crop",
            caption: "Slide 1 - conceito visual",
          },
          {
            src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=900&h=1600&auto=format&fit=crop",
            caption: "Slide 2 - detalhes do produto",
          },
          {
            src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=900&h=1600&auto=format&fit=crop",
            caption: "Slide 3 - experiencia de compra",
          },
          {
            src: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=900&h=1600&auto=format&fit=crop",
            caption: "Slide 4 - chamada final",
          },
        ],
      },
      {
        src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
        caption: "Visao geral da experiencia",
      },
      {
        src: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2070&auto=format&fit=crop",
        caption: "Tela complementar",
      },
      {
        src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
        caption: "Detalhes adicionais",
      },
      {
        src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
        caption: "Encerramento da apresentacao",
      },
    ],
    buttons: [
      {
        type: "primary",
        icon: "demo",
        label: "Live Demo",
        link: "https://github.com/PauloVianaTech/drip-store",
      },
      {
        type: "secondary",
        icon: "github",
        label: "Source Code",
        link: "https://github.com/PauloVianaTech/drip-store",
      },
    ],
  },
  {
    id: "backend-gt3",
    category: "Development",
    title: "Backend GT3",
    description: "Estrutura backend para aplicacoes web com organizacao de rotas, controllers e servicos.",
    types: ["Backend"],
    context: "Projeto de estudo",
    tech: ["Node.js", "Express"],
    link: "https://github.com/PauloVianaTech/projeto-backend-gt3",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2070&auto=format&fit=crop",
    media: [
      { src: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2070&auto=format&fit=crop", caption: "Estrutura do backend" },
      { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop", caption: "Fluxo da aplicacao" },
      { src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop", caption: "Organizacao dos recursos" },
    ],
    buttons: [
      { type: "primary", icon: "demo", label: "Live Demo", link: "https://github.com/PauloVianaTech/drip-store" },
      { type: "secondary", icon: "github", label: "Source Code", link: "https://github.com/PauloVianaTech/drip-store" },
    ],
  },

  // DESIGN
  {
    id: "social-media-design",
    category: "Design",
    title: "Social Media Design",
    description: "Projetos voltados para redes sociais, campanhas visuais e conteudo digital.",
    types: ["Social Media"],
    context: "Projeto de estudo",
    tech: ["Photoshop", "Illustrator"],
    link: "#",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=2070&auto=format&fit=crop",
    media: [
      { src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=2070&auto=format&fit=crop", caption: "Peca principal" },
      { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop", caption: "Variacao visual" },
      { src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop", caption: "Aplicacao da campanha" },
    ],
  },
  {
    id: "brand-id-v2",
    category: "Design",
    title: "Brand Identity V2",
    types: ["Brand Identity"],
    context: "Projeto de estudo",
    featured: false,
    date: "03-2026",
    status: "Completed",
    description: "Criacao de identidade visual, logos e materiais graficos.",
    tech: ["Illustrator", "Branding"],
    tags: ["Brand Identity", "UI Design"],
    role: "",
    company: "",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop",
    media: [
      { src: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop", caption: "Identidade principal" },
      { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop", caption: "Elementos da marca" },
      { src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop", caption: "Aplicacoes visuais" },
    ],
    buttons: [
      { type: "secondary", icon: "github", label: "Source Code", link: "https://github.com/PauloVianaTech/projeto-backend-gt3" },
    ],
  },

  // TRADING
  {
    id: "macd-pullback-v2",
    category: "Trading",
    title: "MACD Pullback Strategy V2",
    description: "Indicador para automacao de operacoes baseado em pullback e confirmacao de tendencia.",
    types: ["Trading Indicator"],
    context: "Projeto de estudo",
    tech: ["Nelogica NTSL", "Profit Pro"],
    link: "#",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop",
    media: [
      { src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop", caption: "Visao do indicador" },
      { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop", caption: "Parametros da estrategia" },
      { src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop", caption: "Leitura de mercado" },
    ],
  },
  {
    id: "trading-automation-v2",
    category: "Trading",
    title: "Trading Automation V2",
    description: "Projetos voltados para automacao, alertas e estrategias para mercado financeiro.",
    types: ["Automation"],
    context: "Projeto de estudo",
    tech: ["MQL5", "MetaTrader 5"],
    link: "#",
    image: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?q=80&w=2070&auto=format&fit=crop",
    media: [
      { src: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?q=80&w=2070&auto=format&fit=crop", caption: "Automacao de trading" },
      { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop", caption: "Regras de operacao" },
      { src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop", caption: "Acompanhamento da estrategia" },
    ],
  },
];
