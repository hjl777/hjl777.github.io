// =============================================================================
// Central content file — edit anything here to update the site.
// Sources: Academic CV (May 2026), Google Scholar (user=o2RGCNQAAAAJ), profile README.
// =============================================================================

export type PublicationKind = 'Journal' | 'Conference' | 'Preprint';

export interface Publication {
  id: string;
  title: string;
  authors: string;          // Use ** around author name to bold (e.g., "**H Lee**").
  venue: string;
  year: number;
  month?: string;
  kind: PublicationKind;
  selected?: boolean;
  abstract?: string;
  links?: {
    pdf?: string;
    code?: string;
    publisher?: string;
    arxiv?: string;
  };
  badge?: string;           // e.g. "Co-first author", "Corresponding author", "Top-tier"
  citations?: number;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  period?: string;          // e.g. "2025 – 2026"
  status?: string;          // e.g. "Deployed", "Ongoing", "Published"
  featured?: boolean;       // Shown in the home "Selected Works" section; the
                            // rest appear only on the /projects index page.
  mediaFit?: 'cover' | 'contain'; // 'contain' for charts/graphs — rendered on a
                            // white background with inner padding instead of
                            // being cropped to fill the 16:10 frame.
  collaboration?: string;
  description: string;
  metrics?: { label: string; value: string }[];
  stack: string[];
  links?: { label: string; href: string }[];
  // Detail-page gallery (route: #/project/<id>). Click opens a lightbox
  // showing the image with its short caption.
  gallery?: { src: string; alt: string; caption: string }[];
}

export interface ExperienceItem {
  role: string;
  org: string;
  location?: string;
  period: string;
  bullets: string[];
}

export interface ContactLink {
  label: string;
  href: string;
  icon: 'mail' | 'github' | 'linkedin' | 'scholar' | 'orcid';
}

export interface NewsItem {
  date: string;       // ISO YYYY-MM
  text: string;
  href?: string;
  title?: string;     // Optional headline — used by the spotlight callout.
  highlight?: boolean; // Render as the spotlight banner instead of a timeline row.
}

// -----------------------------------------------------------------------------
// PROFILE
// -----------------------------------------------------------------------------
export const profile = {
  name: 'Hojae Lee',
  nameKr: '이호재',
  role: 'Healthcare AI Researcher — Medical Imaging · LLM Reliability · Clinical ML',
  affiliation: '',
  location: 'Seoul, Republic of Korea',
  email: 'iceanon1@gmail.com',
  cvUrl: '/cv.pdf',
  avatarUrl: '/portrait.png',
  // One-line research thesis — used as the animated hero headline.
  thesis: 'Connecting what a model decides with why a clinician can trust it.',
  // Two-sentence hero bio — the stats and credibility bar above it carry the
  // numbers, so this stays prose-light.
  shortBio:
    'I build coronary imaging pipelines and LLM reliability systems for clinical contexts — where a mis-measured vessel or a hallucinated fact can change a treatment decision. Mathematics background (Korea University); seeking an environment — graduate program, research lab, or industry team — to pursue these questions at depth.',
  // One-line proof bar rendered under the hero stats — proper nouns over adjectives.
  credibility: [
    'The Lancet Regional Health',
    'JAMA Network Open',
    'JMIR',
    'Scientific Reports',
    'MIT',
    'University of Toronto',
    'Asan Medical Center',
  ],
  longBio: [
    'My research focuses on two problems where wrong answers have clinical consequences: automated coronary vessel analysis, where a mis-measured diameter can alter a treatment decision, and LLM reliability in medical Q&A, where a hallucinated fact can mislead a clinician. Both problems share a common question: how do you make a learned system behave as if it understands the rules, not just the patterns?',
    'I have authored 25 SCI/SCIE papers (6 co-first, 1 corresponding, 404 citations, h-index 12) in venues including The Lancet Regional Health, JMIR, and Scientific Reports — published within two years of graduate research at Kyung Hee University\'s Center for Digital Health and Asan Medical Center.',
    'In 2024, selected as a fully-funded MSIT/IITP government fellow, I conducted applied AI research at the University of Toronto and MIT — implementing `PEFT` and soft prompting to match fine-tuning accuracy at 0.78–0.94% of the parameter cost (200k vs. 20–25M trainable parameters), and extending the system with a physics ontology-based `KG-RAG` pipeline grounded in Chain-of-Knowledge.',
    'Across both problems my method is the same: rather than reaching for the newest technique, I first ask whether it actually fits the problem, then verify it with experiments. My mathematics background is the engine of this — it lets me reason about *why* a model\'s output should be trusted, not just whether it scores well. I am seeking a research environment where I can pursue these questions at depth.',
  ],
  // Research-approach statement (Pranav-style "how I work" block).
  approach: [
    'I treat a new method as a hypothesis, not a default. Before adopting the latest architecture I check whether it fits the actual constraint — then settle the question with an experiment rather than a citation.',
    'My training in mathematics is what makes this rigorous: it lets me read the mechanics of an `XAI` method like `SHAP` and judge how far an output can be trusted, instead of taking a saliency map at face value.',
    'And I build for the clinic. A radiologist asks whether a measurement is clinically valid; I ask why the model produced it. Holding both views at once — and connecting them — is, to me, the real work of an explainable-AI researcher.',
  ],
  interests: [
    'Quantitative Coronary Angiography',
    'Clinical Outcome Prediction',
    'Mental Health & Addiction Risk Modeling',
    'Epidemiology & XAI',
    'LLM Fine-tuning · PEFT · KG-RAG',
    'Knowledge Graphs & Schema Design',
    'Multimodal Medical AI',
  ],
  education: [
    {
      degree: 'M.S. — Computational Health & Biomedical Data Science',
      org: 'Kyung Hee University (School of Pharmacy)',
      period: '2023 – 2025',
      detail: 'Thesis: ML-based suicidal ideation prediction validated across 3 independent worldwide cohorts · GPA 4.25/4.5',
    },
    {
      degree: 'Applied AI Program',
      org: 'University of Toronto',
      period: 'Jan – Jul 2024',
      detail: 'Hosted by Dept. of Mechanical & Industrial Engineering',
    },
    {
      degree: 'B.S. in Mathematics',
      org: 'Korea University',
      period: '2016 – 2023',
    },
  ],
  highlights: [
    { label: 'SCI/SCIE Papers', value: '25' },
    { label: 'Citations', value: '404' },
    { label: 'h-index', value: '12' },
  ],
};

// -----------------------------------------------------------------------------
// PUBLICATIONS
// 21+ peer-reviewed papers. Selected = featured on default view.
// Bold the author with ** … **.
// -----------------------------------------------------------------------------
export const publications: Publication[] = [
  {
    id: 'pub-lancet-ckm-2025',
    title:
      'Long-term trends in the prevalence of cardiovascular-kidney-metabolic syndrome in South Korea, 2011–2021: a representative longitudinal serial study',
    authors:
      'Y Yim, JE Lee, Y Son, S Kim, **H Lee**, S Lee, W Jang, H Cho, et al.',
    venue: 'The Lancet Regional Health – Western Pacific',
    year: 2025,
    month: 'Jan',
    kind: 'Journal',
    selected: true,
    badge: 'Top-tier',
    citations: 39,
    abstract:
      'A nationally representative longitudinal serial study (KNHANES, 2011–2021) quantifying decade-long trends in cardiovascular-kidney-metabolic syndrome across age, sex, and socioeconomic strata in South Korea.',
    links: { publisher: 'https://www.thelancet.com/journals/lanwpc/article/PIIS2666-6065(25)00011-2/fulltext' },
  },
  {
    id: 'pub-jmir-neurodeg-2024',
    title:
      'Machine Learning–Based Prediction of Neurodegenerative Disease in Patients With Type 2 Diabetes by Derivation and Validation in 2 Independent Korean Cohorts',
    authors:
      'H Sang*, **H Lee***, J Park, S Kim, HG Woo, A Koyanagi, L Smith, S Lee, et al.',
    venue: 'Journal of Medical Internet Research',
    year: 2024,
    month: 'Oct',
    kind: 'Journal',
    selected: true,
    badge: 'Co-first author',
    citations: 9,
    abstract:
      'Derived and externally validated gradient-boosted and survival models for incident neurodegenerative disease in T2D patients across two independent Korean cohorts, with SHAP-based clinician-interpretable outputs.',
    links: { publisher: 'https://www.jmir.org/2024/1/e56922/' },
  },
  {
    id: 'pub-scirep-cvd-2024',
    title:
      'Prediction model for cardiovascular disease in patients with diabetes using machine learning derived and validated in two independent Korean cohorts',
    authors:
      'H Sang*, **H Lee***, M Lee, J Park, S Kim, HG Woo, M Rahmati, A Koyanagi, et al.',
    venue: 'Scientific Reports',
    year: 2024,
    kind: 'Journal',
    selected: true,
    badge: 'Co-first author',
    citations: 29,
    abstract:
      'A gradient-boosted CVD risk model for diabetic patients, derived and externally validated across two independent Korean cohorts with clinician-interpretable XAI outputs.',
    links: { publisher: 'https://www.nature.com/articles/s41598-024-63798-y' },
  },
  {
    id: 'pub-scirep-smoking-2024',
    title:
      'National prevalence of smoking among adolescents at tobacco tax increase and COVID-19 pandemic in South Korea, 2005–2022',
    authors:
      'S Hong*, S Woo*, S Kim, J Park, M Lee, S Kim, A Koyanagi, L Smith, … **H Lee¶**, DK Yon¶',
    venue: 'Scientific Reports',
    year: 2024,
    month: 'Apr',
    kind: 'Journal',
    badge: 'Corresponding author',
    citations: 16,
    abstract:
      'Nationwide serial analysis of adolescent smoking prevalence (KYRBS, 2005–2022), quantifying the impact of the 2015 tobacco tax hike and the COVID-19 pandemic on age- and sex-specific trajectories.',
    links: { publisher: 'https://www.nature.com/articles/s41598-024-58446-4' },
  },
  {
    id: 'pub-scirep-atopic-2024',
    title:
      'National prevalence of atopic dermatitis in Korean adolescents from 2009 to 2022',
    authors:
      'M Kattih*, **H Lee***, H Jo*, J Jeong*, H Kim*, J Park, H Yang, A Nguyen, HJ Kim, et al.',
    venue: 'Scientific Reports',
    year: 2024,
    month: 'May',
    kind: 'Journal',
    selected: true,
    badge: 'Co-first author',
    citations: 6,
    abstract:
      'A 13-year nationally representative serial study of atopic-dermatitis prevalence in Korean adolescents, with sub-population trends and pandemic-era shifts.',
    links: { publisher: 'https://www.nature.com/articles/s41598-024-62475-4' },
  },
  {
    id: 'pub-jmir-suicidality-2024',
    title:
      'Machine Learning–Based Prediction of Suicidality in Adolescents with Allergic Rhinitis: Derivation and Validation in 2 Independent Nationwide Cohorts',
    authors:
      '**H Lee***, JK Cho*, J Park*, H Lee*, G Fond, L Boyer, HJ Kim, S Park, W Cho, et al.',
    venue: 'Journal of Medical Internet Research',
    year: 2024,
    kind: 'Journal',
    selected: true,
    badge: 'Co-first author',
    citations: 33,
    abstract:
      'Derived a tree-ensemble suicidality risk model in adolescents with allergic rhinitis and externally validated it on an independent nationwide cohort, with calibration and SHAP-based feature attribution.',
    links: { publisher: 'https://www.jmir.org/2024/1/e51473' },
  },
  {
    id: 'pub-jmir-suicidal-thinking-2024',
    title:
      'Machine Learning–Based Prediction of Suicidal Thinking in Adolescents by Derivation and Validation in 3 Independent Worldwide Cohorts',
    authors:
      'H Kim*, Y Son*, **H Lee***, J Kang, A Hammoodi, Y Choi, HJ Kim, H Lee, et al.',
    venue: 'Journal of Medical Internet Research',
    year: 2024,
    kind: 'Journal',
    badge: 'Co-first author',
    citations: 30,
    abstract:
      'Algorithm development and tri-cohort external validation (Korea, Norway, USA) of an ML model for adolescent suicidal ideation — the basis of the author’s M.S. thesis.',
    links: { publisher: 'https://www.jmir.org/2024/1/e55913' },
  },
  {
    id: 'pub-jmir-substance-2025',
    title:
      'Machine Learning–Based Prediction of Substance Use in Adolescents in Three Independent Worldwide Cohorts',
    authors:
      'S Kim, H Kim, S Kim, **H Lee**, A Hammoodi, Y Choi, HJ Kim, L Smith, et al.',
    venue: 'Journal of Medical Internet Research',
    year: 2025,
    month: 'Feb',
    kind: 'Journal',
    citations: 9,
    abstract:
      'Cross-national ML prediction of adolescent substance use, derived and validated across three independent worldwide cohorts.',
    links: { publisher: 'https://www.jmir.org/2025/1/e62805' },
  },
  {
    id: 'pub-jmir-medinfo-retinopathy-2025',
    title:
      'Development and Validation of a Machine Learning Algorithm for Predicting Diabetes Retinopathy in Patients With Type 2 Diabetes',
    authors:
      'S Kim, J Park, Y Son, **H Lee**, S Woo, M Lee, H Lee, H Sang, DK Yon, et al.',
    venue: 'JMIR Medical Informatics',
    year: 2025,
    kind: 'Journal',
    citations: 10,
  },
  {
    id: 'pub-eclinicalmed-aih-2023',
    title:
      'Global incidence and prevalence of autoimmune hepatitis, 1970–2022: a systematic review and meta-analysis',
    authors:
      'JW Hahn, HR Yang, JS Moon, JY Chang, K Lee, GA Kim, M Rahmati, … **H Lee**, et al.',
    venue: 'EClinicalMedicine (The Lancet Group)',
    year: 2023,
    kind: 'Journal',
    citations: 111,
  },
  {
    id: 'pub-jtravelmed-mpox-2023',
    title:
      'Viral load dynamics and shedding kinetics of mpox infection: a systematic review and meta-analysis',
    authors:
      'H Kim, R Kwon, **H Lee**, SW Lee, M Rahmati, A Koyanagi, L Smith, MS Kim, et al.',
    venue: 'Journal of Travel Medicine',
    year: 2023,
    kind: 'Journal',
    citations: 51,
  },
  {
    id: 'pub-jama-hygiene-2023',
    title:
      'Hand and Oral Hygiene Practices of South Korean Adolescents Before and During the COVID-19 Pandemic',
    authors:
      'J Oh, M Lee, **H Lee**, H Yang, J Park, M Rahmati, A Koyanagi, L Smith, et al.',
    venue: 'JAMA Network Open',
    year: 2023,
    kind: 'Journal',
    citations: 35,
  },
  {
    id: 'pub-ajp-depression-2023',
    title:
      'National trends in depression and suicide attempts and COVID-19 pandemic-related factors, 1998–2021: A nationwide study in South Korea',
    authors:
      'J Kang, J Park, **H Lee**, M Lee, S Kim, A Koyanagi, L Smith, MS Kim, et al.',
    venue: 'Asian Journal of Psychiatry',
    year: 2023,
    kind: 'Journal',
    citations: 31,
  },
  {
    id: 'pub-scirep-htn-2023',
    title:
      'Trends in hypertension prevalence, awareness, treatment, and control in South Korea, 1998–2021: a nationally representative serial study',
    authors:
      'M Lee, **H Lee**, J Park, HJ Kim, R Kwon, SW Lee, S Kim, A Koyanagi, et al.',
    venue: 'Scientific Reports',
    year: 2023,
    kind: 'Journal',
    citations: 19,
  },
  {
    id: 'pub-scirep-ra-2023',
    title:
      'National trends in rheumatoid arthritis and osteoarthritis prevalence in South Korea, 1998–2021',
    authors:
      'J Park, M Lee, **H Lee**, HJ Kim, R Kwon, H Yang, SW Lee, S Kim, et al.',
    venue: 'Scientific Reports',
    year: 2023,
    kind: 'Journal',
    citations: 18,
  },
  {
    id: 'pub-iaai-rhinitis-2024',
    title:
      'National Trends in Allergic Rhinitis and Chronic Rhinosinusitis and COVID-19 Pandemic-Related Factors in South Korea, from 1998 to 2021',
    authors:
      '**H Lee***, J Park*, M Lee, HJ Kim, M Kim, R Kwon, SW Lee, A Koyanagi, et al.',
    venue: 'International Archives of Allergy and Immunology',
    year: 2024,
    kind: 'Journal',
    badge: 'Co-first author',
    citations: 14,
  },
  {
    id: 'pub-wjp-cannabis-2025',
    title:
      'Global prevalence of cannabis and amphetamine/methamphetamine use among adolescents in 47 countries: a population-based study from WHO database',
    authors:
      'Y Son, S Hong, Y Yim, S Kim, **H Lee**, K Lee, HJ Kim, H Jo, J Park, J Oh, et al.',
    venue: 'World Journal of Pediatrics',
    year: 2025,
    kind: 'Journal',
    citations: 11,
  },
  {
    id: 'pub-wjp-contraception-2024',
    title:
      'National trends in sexual intercourse and usage of contraception among Korean adolescents',
    authors:
      'JH Lee, M Lee, **H Lee**, J Park, S Kim, A Koyanagi, L Smith, MS Kim, et al.',
    venue: 'World Journal of Pediatrics',
    year: 2024,
    kind: 'Journal',
    citations: 10,
  },
  {
    id: 'pub-ajp-family-2024',
    title:
      'Longitudinal trends in depression, suicidal ideation, and suicide attempts by family structure in South Korean adolescents, 2009–2022',
    authors:
      'S Park, Y Yim, M Lee, **H Lee**, J Park, JH Lee, S Woo, T Kim, J Kang, et al.',
    venue: 'Asian Journal of Psychiatry',
    year: 2024,
    kind: 'Journal',
    citations: 10,
  },
  {
    id: 'pub-ajp-sleep-2024',
    title:
      'National trends in sleep sufficiency and sleep time among adolescents, including the late-COVID-19 pandemic, 2009–2022',
    authors:
      'JH Lee, M Lee, **H Lee**, J Park, S Woo, S Kim, A Koyanagi, L Smith, et al.',
    venue: 'Asian Journal of Psychiatry',
    year: 2024,
    kind: 'Journal',
    citations: 9,
  },
  {
    id: 'pub-jmv-longcovid-2024',
    title:
      'Risks of cutaneous immune-related adverse events in long COVID: multinational cohort studies in South Korea, Japan, and the UK',
    authors:
      'H Kim, S Kyung, J Park, **H Lee**, M Lee, L Smith, M Rahmati, JY Shin, et al.',
    venue: 'Journal of Medical Virology',
    year: 2024,
    kind: 'Journal',
    citations: 7,
  },
  {
    id: 'pub-acta-smoking-2025',
    title:
      'Temporal changes in smoking prevalence among adolescents across 23 countries',
    authors:
      'S Hong, Y Son, M Lee, J Park, **H Lee**, H Lee, H Lee, H Kim, E Dragioti, et al.',
    venue: 'Acta Paediatrica',
    year: 2025,
    kind: 'Journal',
    citations: 6,
  },
  {
    id: 'pub-scirep-liposuction-2024',
    title:
      'Predictive model for abdominal liposuction volume in patients with obesity using machine learning in a longitudinal multi-center study in Korea',
    authors:
      'H Sang, J Park, S Kim, M Lee, **H Lee**, SH Lee, DK Yon, SY Rhee',
    venue: 'Scientific Reports',
    year: 2024,
    kind: 'Journal',
    citations: 5,
  },
  {
    id: 'pub-heliyon-thyroid-2024',
    title:
      'National trends in thyroid disease and COVID-19 pandemic-related factors, 1998–2021: A nationwide representative study in South Korea',
    authors:
      'K Lee, J Park, M Lee, **H Lee**, Y Son, H Kim, J Kang, Y Choi, SY Rhee, et al.',
    venue: 'Heliyon',
    year: 2024,
    kind: 'Journal',
    citations: 2,
  },
];

// -----------------------------------------------------------------------------
// PROJECTS — drawn from CV Research & Professional Experience.
// -----------------------------------------------------------------------------
export const projects: Project[] = [
  {
    id: 'proj-stent-marker',
    title: 'End-to-End Coronary Vessel Analysis for Stent-Marker Localization',
    subtitle: 'Deep-learning segmentation · Mask refinement · Diameter profiling',
    period: '2025 – 2026',
    status: 'Deployed',
    featured: true,
    description:
      "End-to-end QCA pipeline built from scratch at Asan Medical Center — one of Asia's largest cardiac intervention centers. Performs sub-pixel vessel boundary segmentation across all three coronary trees (RCA / LAD / LCX), extracts centerlines and bifurcation points automatically, and generates per-branch diameter profiles with OCR-calibrated pixel-to-mm conversion. Pipeline outputs were validated against Murray's Law — the governing equation for vascular branching — yielding R² > 0.8 across 1,190+ vessel samples. This validation was only possible because of a B.S. Mathematics background applied directly to clinical engineering.",
    metrics: [
      { label: 'Validation', value: "Murray's Law R² > 0.8" },
      { label: 'Sample size', value: 'n > 1,190 vessels' },
      { label: 'Coverage',   value: 'RCA · LAD · LCX' },
    ],
    stack: ['Python', 'PyTorch', 'OpenCV', 'scikit-image', 'pytesseract'],
    gallery: [
      {
        src: '/projects/qca-angiogram.png',
        alt: 'QCA pipeline output on a 2D coronary angiogram with segmentation overlay and diameter profile',
        caption:
          'Full pipeline output on a routine 2D angiogram: automated vessel-boundary segmentation (cyan), centerline extraction (yellow), bifurcation detection with proximal/distal reference points (P1–P3, B1), and the resulting per-branch diameter profile with 1 / 2 / 3 mm reference measurements — everything a reviewer needs on one screen.',
      },
      {
        src: '/projects/qca-murrays-law.png',
        alt: "Murray's Law validation scatter plot of the QCA pipeline",
        caption:
          "Murray's Law validation of the QCA pipeline — predicted vs. measured branch diameters across 1,190+ vessel samples (R² > 0.8). The governing equation of vascular branching, used as an independent mathematical check on the segmentation.",
      },
    ],
  },
  {
    id: 'proj-llm',
    title: 'Mitigating LLM Hallucinations in Scientific Q&A',
    subtitle: 'PEFT · Soft Prompting · KG-RAG',
    period: '2023 – 2024',
    status: 'Completed',
    featured: true,
    mediaFit: 'contain',
    collaboration: 'MIT (6.2410 ChatTutor) & University of Toronto — MSIT/IITP Government Fellowship',
    description:
      'Reduced factual hallucination in LLMs deployed for university-level physics Q&A (MIT ChatTutor, 6.2410). Core constraint: the solution had to be efficient enough for the service to self-host. Implemented PEFT + soft prompting to match full fine-tuning accuracy using only 0.78–0.94% of trainable parameters (200k vs. 20–25M). Extended with a physics ontology mapped to Chain-of-Knowledge KG-RAG baseline — embedding symbolic domain constraints directly into generation. Evaluated on ScienceQA and SciQ.',
    metrics: [
      { label: 'Param reduction', value: '0.78–0.94% of FT cost' },
      { label: 'Datasets',        value: 'ScienceQA · SciQ' },
      { label: 'RAG baseline',    value: 'Chain-of-Knowledge' },
    ],
    stack: ['Python', 'PyTorch', 'LLMs', 'PEFT', 'KG-RAG', 'HuggingFace'],
    gallery: [
      {
        src: '/projects/llm-performance.png',
        alt: 'Model accuracy comparison on ScienceQA and SciQ benchmarks',
        caption:
          'Model accuracy on ScienceQA and SciQ benchmarks. The soft-prompt model (200k trainable params = 0.78–0.94% of full fine-tuning cost) matches or exceeds all baselines except the full fine-tuned model — validating the efficiency-accuracy tradeoff at the core of this project.',
      },
    ],
  },
  {
    id: 'proj-defines',
    title: 'DEFINES — Hallucination Suppression in Multimodal Math Reasoning',
    subtitle: 'Multi-agent VLM · LangGraph · Knowledge-graph retrieval',
    period: '2025 – Present',
    status: 'Ongoing',
    featured: true,
    collaboration: 'DEFINES LAB — Independent Research (continuation of the UofT/MIT work)',
    description:
      'An ongoing independent extension of the Toronto/MIT hallucination research into the multimodal mathematics domain. A LangGraph-based multi-agent workflow pairs domain-specialized problem generation with knowledge-graph-based structured retrieval to constrain a VLM toward verifiable reasoning, with a self-built PyTorch OCR pipeline feeding the system. The research powers DEFINES, a live AI problem-bank platform for Korean mathematics teachers — scanned test papers are OCR-digitized into clean LaTeX, then AI agents generate variations and step-by-step solutions.',
    links: [{ label: 'Live — defines-lab.com (Korean)', href: 'https://defines-lab.com/' }],
    metrics: [
      { label: 'Orchestration', value: 'Multi-agent' },
      { label: 'Retrieval',     value: 'KG-structured' },
      { label: 'Status',        value: 'Ongoing' },
    ],
    stack: ['Python', 'PyTorch', 'LangGraph', 'VLM', 'Knowledge Graphs', 'OCR'],
    gallery: [
      {
        src: '/projects/defines-home.png',
        alt: 'DEFINES Math landing page — an AI partner for Korean mathematics teachers',
        caption:
          'The live platform at defines-lab.com: “an AI partner for math teachers.” A scanned test paper becomes a searchable problem DB — the Input Scan → AI Processing → Output flow shown here is the production face of the research pipeline.',
      },
      {
        src: '/projects/defines-extract.png',
        alt: 'DEFINES problem-extraction workspace: upload, detection/OCR, save to personal DB',
        caption:
          'The problem-extraction workspace, powered by the self-built PyTorch OCR pipeline: teachers upload a test-paper image or PDF, problem regions are auto-detected, each problem is OCR-converted to clean LaTeX, and the results are saved to a personal problem DB.',
      },
      {
        src: '/projects/defines-problems.png',
        alt: 'DEFINES problem-bank explorer with source tree of national mock exams and school exams',
        caption:
          'The problem-bank explorer: problems are organized by source (KICE mock exams and CSAT, school exams by region) and by curriculum unit — the structured organization that the knowledge-graph retrieval layer is built on.',
      },
    ],
  },
  {
    id: 'proj-outcomes',
    title: 'Clinical Outcome Prediction at Population Scale',
    subtitle: 'Nationwide ML risk models · XAI · external validation',
    period: '2023 – 2025',
    status: 'Published',
    mediaFit: 'contain',
    description:
      'Derivation and external validation of ML risk models for neurodegenerative, cardiovascular, and diabetic-retinopathy outcomes in T2D patients, across two independent Korean cohorts. Standardized clinical ML pipeline (curation → features → benchmarking → calibration → external validation) with SHAP-based clinician-interpretable outputs.',
    metrics: [
      { label: 'Outcomes', value: 'Neuro · CVD · DR' },
      { label: 'Cohorts', value: '2 (external)' },
      { label: 'XAI', value: 'SHAP' },
    ],
    stack: ['Python', 'R', 'XGBoost', 'scikit-learn', 'SHAP', 'SAS'],
    gallery: [
      {
        src: '/projects/neuro-architecture.jpg',
        alt: 'Model architecture: EMR dataset through tenfold AdaBoost cross-validation with external NIA-cohort validation',
        caption:
          'The standardized pipeline, shown for the neurodegenerative-disease model (JMIR, 2024): an EMR dataset trains a tenfold cross-validated AdaBoost ensemble (mean AUROC 82%), then is confirmed on an entirely separate NIA cohort from two other hospitals (AUROC 83%). This derive-then-externally-validate structure is reused across all three outcomes.',
      },
      {
        src: '/projects/cvd-roc.jpg',
        alt: 'Random-forest ROC curves across tenfold cross-validation, mean AUC 0.83',
        caption:
          'Discrimination of the cardiovascular-disease risk model (Scientific Reports, 2024): random-forest ROC across tenfold cross-validation, mean AUC 0.83 ± 0.02, holding to 0.72 on the independent external cohort — one of the three outcomes modelled with this pipeline.',
      },
      {
        src: '/projects/cvd-importance.jpg',
        alt: 'Top-15 random-forest feature importances for cardiovascular-disease prediction',
        caption:
          'Top-15 feature importances from the same model — creatinine, HbA1c, and liver-enzyme ranges lead, and the fact that the *range* (fluctuation) of these labs outranks their baseline values is the kind of clinician-interpretable signal the XAI layer is built to surface.',
      },
    ],
  },
];

// -----------------------------------------------------------------------------
// EXPERIENCE TIMELINE
// -----------------------------------------------------------------------------
export const experience: ExperienceItem[] = [
  {
    role: 'Researcher',
    org: 'Asan Medical Center — Biomedical Engineering Research Center',
    location: 'Seoul, KR',
    period: '2025.03.01 – 2026.02.28',
    bullets: [
      'Improved QCA measurement consistency and reviewer efficiency — built and deployed analysis pipelines with clinician-facing QA interfaces.',
      'Enabled 3D vascular geometry for TAVI planning from routine 2D angiographic sequences via 2D→3D reconstruction prototyping.',
      'Developed semi-automated catheter / wire tracking systems on routine 2D angiographic sequences with MEDSAM 2-assisted segmentation.',
      'Integrated structured clinical variables with imaging model outputs for clinician-facing decision support.',
    ],
  },
  {
    role: 'Independent Researcher',
    org: 'DEFINES LAB — Independent Research',
    location: 'Seoul, KR',
    period: '2025.03 – Present',
    bullets: [
      'Extending the Toronto/MIT hallucination work to multimodal math reasoning — LangGraph multi-agent workflow with KG-based structured retrieval to suppress VLM hallucination.',
      'Implemented a self-built PyTorch OCR pipeline for document-to-structured-input conversion.',
      'Engineer a Human-in-the-Loop pipeline for curriculum-aligned mathematics problem generation and reading/grammar item QC (choice-set consistency, distractor validity, automated rationale).',
    ],
  },
  {
    role: 'Joint AI Researcher (Fully-funded MSIT/IITP Scholar)',
    org: 'University of Toronto & MIT',
    location: 'Toronto, CA · Cambridge, MA',
    period: '2023.12 – 2024.06',
    bullets: [
      'Matched full fine-tuning accuracy with <1% of trainable parameters (~200k vs. 20–25M) via PEFT and soft prompting.',
      'Boosted factual accuracy on complex scientific Q&A by embedding physics-ontology constraints through KG-RAG.',
      'Mitigated LLM hallucination in cross-functional research teams across scientific Q&A datasets.',
    ],
  },
  {
    role: 'M.S. Researcher',
    org: 'Kyung Hee University — Center for Digital Health',
    location: 'Seoul, KR',
    period: '2023.01 – 2025.02',
    bullets: [
      'Authored / co-authored 21 peer-reviewed papers within two years; built reproducible code-first reporting environments (Python / R).',
      'Externally validated ML risk-prediction models across two independent Korean cohorts — neurodegenerative, cardiovascular, and diabetic-retinopathy outcomes in T2D.',
      'Standardized end-to-end clinical ML pipelines with SHAP-based XAI outputs for clinician interpretability.',
      'Led nationwide time-series analyses of adolescent health behaviors (2005–2022), quantifying epidemiological trends and policy impacts.',
    ],
  },
  {
    role: 'NLP Researcher Intern',
    org: 'MEDIAZEN',
    location: 'Seoul, KR',
    period: '2021.06 – 2022.01',
    bullets: [
      'Engineered text-dataset preprocessing pipelines and structured input generation in Python for a commercial Korean chatbot system.',
    ],
  },
];

// -----------------------------------------------------------------------------
// HONORS & AWARDS (rendered inside Experience section as a side card)
// -----------------------------------------------------------------------------
export const honors: { title: string; org: string; year: string }[] = [
  {
    title: 'Ministry of Science and ICT (IITP) Fellowship',
    org: 'Government of South Korea — UofT/MIT joint program',
    year: 'Dec 2023 – Jun 2024',
  },
  {
    title: 'Best Paper Award',
    org: '5th Engineering in Biomedical and Rehabilitation & Home Conference, Japan',
    year: 'Jun 2023',
  },
  {
    title: 'AI Convergence Innovation Project Grant',
    org: 'Kyung Hee University — Chronic Disease Prediction Platform',
    year: 'May – Dec 2023',
  },
  {
    title: 'Kyung Hee University Academic Scholarships',
    org: 'Spring 2023, Fall 2023, Spring 2024',
    year: '2023 – 2024',
  },
];

// -----------------------------------------------------------------------------
// CONTACT
// -----------------------------------------------------------------------------
export const contacts: ContactLink[] = [
  { label: 'Email',          href: 'mailto:iceanon1@gmail.com',                                  icon: 'mail' },
  { label: 'GitHub',         href: 'https://github.com/hjl777',                                  icon: 'github' },
  { label: 'LinkedIn',       href: 'https://www.linkedin.com/in/lee-ho-jae-247b29266/',         icon: 'linkedin' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=o2RGCNQAAAAJ&hl=en', icon: 'scholar' },
  { label: 'ORCID',          href: 'https://orcid.org/0009-0002-1737-2540',                     icon: 'orcid' },
];

// -----------------------------------------------------------------------------
// NEWS / UPDATES — most-recent first.
// -----------------------------------------------------------------------------
export const news: NewsItem[] = [
  {
    date: '2026-05',
    highlight: true,
    title: 'Open to research opportunities',
    text: 'Seeking environments to pursue medical imaging AI, LLM reliability, and clinical decision support at depth — graduate programs, research labs, or industry teams. Always happy to discuss research fit or collaboration.',
  },
  {
    date: '2026-01',
    text: 'Completed an end-to-end DL pipeline for stent-marker localization in 2D coronary angiograms — segmentation over RCA/LAD/LCX with bifurcation detection and diameter profiling.',
  },
  {
    date: '2025-02',
    text: 'New paper out in Journal of Medical Internet Research: ML-based prediction of substance use in adolescents across three independent worldwide cohorts.',
    href: 'https://www.jmir.org/',
  },
  {
    date: '2025-01',
    text: 'Co-authored paper published in The Lancet Regional Health — Western Pacific on decade-long trends in cardiovascular-kidney-metabolic syndrome in South Korea.',
    href: 'https://doi.org/10.1016/j.lanwpc.2024.101329',
  },
  {
    date: '2024-10',
    text: 'Co-first-authored paper in JMIR on ML-based prediction of neurodegenerative disease in patients with Type 2 Diabetes (derivation + external validation in two Korean cohorts).',
    href: 'https://www.jmir.org/',
  },
  {
    date: '2024-06',
    text: 'Concluded MSIT (IITP) fellowship at the University of Toronto / MIT — worked on mitigating LLM hallucination in scientific Q&A via PEFT, soft prompting, and KG-based RAG.',
  },
  {
    date: '2024-04',
    text: 'Corresponding-author paper in Scientific Reports on national adolescent smoking prevalence in South Korea (2005–2022), covering the tobacco-tax hike and COVID-19 impact.',
    href: 'https://www.nature.com/srep/',
  },
];
