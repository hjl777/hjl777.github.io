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
  collaboration?: string;
  description: string;
  metrics?: { label: string; value: string }[];
  stack: string[];
  links?: { label: string; href: string }[];
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
  icon: 'mail' | 'github' | 'linkedin' | 'scholar';
}

// -----------------------------------------------------------------------------
// PROFILE
// -----------------------------------------------------------------------------
export const profile = {
  name: 'Hojae Lee',
  nameKr: '이호재',
  role: 'Applied AI Scientist · Healthcare AI Researcher',
  affiliation:
    'Biomedical Engineering Research Center, Asan Medical Center',
  location: 'Seoul, Republic of Korea',
  email: 'iceanon1@gmail.com',
  cvUrl: '/cv.pdf',
  avatarUrl: '/portrait.png',
  shortBio:
    'Researcher bridging a rigorous mathematical foundation with applied medical AI — quantitative coronary angiography, clinical outcome prediction, and LLM hallucination mitigation in scientific Q&A.',
  longBio: [
    'I am an applied AI researcher at the Biomedical Engineering Research Center, Asan Medical Center, where I build deep learning pipelines for quantitative coronary angiography (QCA), 2D→3D vascular geometry reconstruction for TAVI planning, and clinician-facing decision-support systems.',
    'I hold a B.S. in Mathematics from Korea University and an M.S. in Pharmacy (Pharmaceutical Big Data Analysis) from Kyung Hee University, where I developed and externally validated ML risk prediction models for neurodegenerative, cardiovascular, and diabetic-retinopathy outcomes in Type 2 Diabetes.',
    'As a fully-funded MSIT scholar, I worked jointly with researchers at the University of Toronto and MIT on mitigating hallucinations of LLMs over scientific Q&A — combining Parameter-Efficient Fine-Tuning, Soft Prompting, and Knowledge-Graph-based RAG to embed domain constraints into model outputs.',
    'Across two years I have authored or co-authored 21 SCI/SCIE peer-reviewed papers (6 co-first, 1 corresponding) in venues including The Lancet Regional Health, JMIR, JAMA Network Open, and Scientific Reports.',
  ],
  interests: [
    'Quantitative Coronary Angiography',
    'Clinical Outcome Prediction',
    'Epidemiology & XAI',
    'LLM Fine-tuning · PEFT · RAG',
    'Multimodal Medical AI',
  ],
  education: [
    {
      degree: 'M.S. in Pharmacy — Pharmaceutical Big Data Analysis',
      org: 'Kyung Hee University',
      period: '2023 – 2025',
      detail: 'Thesis on ML-based suicidal-ideation prediction (3 cohorts)',
    },
    {
      degree: 'Visiting Student — Mechanical & Industrial Eng.',
      org: 'University of Toronto',
      period: 'Jan – Jul 2024',
      detail: 'Fully-funded MSIT (IITP) Fellowship',
    },
    {
      degree: 'B.S. in Mathematics',
      org: 'Korea University',
      period: '2016 – 2023',
    },
  ],
  highlights: [
    { label: 'Peer-reviewed papers (SCI/SCIE)', value: '21' },
    { label: 'Co-first author', value: '6' },
    { label: 'Corresponding author', value: '1' },
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
    links: { publisher: 'https://doi.org/10.1016/j.lanwpc.2024.101329' },
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
    links: { publisher: 'https://www.jmir.org/' },
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
    selected: true,
    badge: 'Corresponding author',
    citations: 16,
    abstract:
      'Nationwide serial analysis of adolescent smoking prevalence (KYRBS, 2005–2022), quantifying the impact of the 2015 tobacco tax hike and the COVID-19 pandemic on age- and sex-specific trajectories.',
    links: { publisher: 'https://www.nature.com/srep/' },
  },
  {
    id: 'pub-scirep-atopic-2024',
    title:
      'National prevalence of atopic dermatitis in Korean adolescents from 2009 to 2022',
    authors:
      'M Kattih*, **H Lee***, H Jo*, J Jeong, H Kim, J Park, H Yang, A Nguyen, HJ Kim, et al.',
    venue: 'Scientific Reports',
    year: 2024,
    month: 'May',
    kind: 'Journal',
    selected: true,
    badge: 'Co-first author',
    citations: 6,
    abstract:
      'A 13-year nationally representative serial study of atopic-dermatitis prevalence in Korean adolescents, with sub-population trends and pandemic-era shifts.',
    links: { publisher: 'https://www.nature.com/srep/' },
  },
  {
    id: 'pub-jmir-suicidality-2024',
    title:
      'Machine Learning–Based Prediction of Suicidality in Adolescents with Allergic Rhinitis: Derivation and Validation in 2 Independent Nationwide Cohorts',
    authors:
      '**H Lee**, JK Cho, J Park, H Lee, G Fond, L Boyer, HJ Kim, S Park, W Cho, et al.',
    venue: 'Journal of Medical Internet Research',
    year: 2024,
    kind: 'Journal',
    selected: true,
    citations: 33,
    abstract:
      'Derived a tree-ensemble suicidality risk model in adolescents with allergic rhinitis and externally validated it on an independent nationwide cohort, with calibration and SHAP-based feature attribution.',
    links: { publisher: 'https://www.jmir.org/' },
  },
  {
    id: 'pub-scirep-cvd-2024',
    title:
      'Prediction model for cardiovascular disease in patients with diabetes using machine learning derived and validated in two independent Korean cohorts',
    authors:
      'H Sang, **H Lee**, M Lee, J Park, S Kim, HG Woo, M Rahmati, A Koyanagi, et al.',
    venue: 'Scientific Reports',
    year: 2024,
    kind: 'Journal',
    selected: true,
    citations: 29,
    abstract:
      'A gradient-boosted CVD risk model for diabetic patients, derived and externally validated across two independent Korean cohorts with clinician-interpretable XAI outputs.',
    links: { publisher: 'https://www.nature.com/srep/' },
  },
  {
    id: 'pub-jmir-suicidal-thinking-2024',
    title:
      'Machine Learning–Based Prediction of Suicidal Thinking in Adolescents by Derivation and Validation in 3 Independent Worldwide Cohorts',
    authors:
      'H Kim, Y Son, **H Lee**, J Kang, A Hammoodi, Y Choi, HJ Kim, H Lee, et al.',
    venue: 'Journal of Medical Internet Research',
    year: 2024,
    kind: 'Journal',
    citations: 30,
    abstract:
      'Algorithm development and tri-cohort external validation (Korea, Norway, USA) of an ML model for adolescent suicidal ideation — the basis of the author’s M.S. thesis.',
    links: { publisher: 'https://www.jmir.org/' },
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
    links: { publisher: 'https://www.jmir.org/' },
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
      '**H Lee**, J Park, M Lee, HJ Kim, M Kim, R Kwon, SW Lee, A Koyanagi, et al.',
    venue: 'International Archives of Allergy and Immunology',
    year: 2024,
    kind: 'Journal',
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
    id: 'proj-llm',
    title: 'Mitigating LLM Hallucinations in Scientific Q&A',
    subtitle: 'PEFT · Soft Prompting · KG-RAG',
    collaboration: 'with University of Toronto & MIT (MSIT-funded)',
    description:
      'A research stack to reduce factual drift of LLMs over scientific Q&A: Parameter-Efficient Fine-Tuning (PEFT) and Soft Prompting that match full-FT performance with <1% of parameters, plus Knowledge-Graph-based RAG that injects domain-specific physical-science constraints into model outputs.',
    metrics: [
      { label: 'FT params', value: '<1%' },
      { label: 'Domain', value: 'Sci Q&A' },
      { label: 'Method', value: 'PEFT + KG-RAG' },
    ],
    stack: ['Python', 'PyTorch', 'LLMs', 'PEFT', 'KG-RAG', 'HuggingFace'],
  },
  {
    id: 'proj-stent-marker',
    title: 'End-to-End Coronary Vessel Analysis for Stent-Marker Localization',
    subtitle: 'Deep-learning segmentation · Mask refinement · Diameter profiling',
    description:
      'An end-to-end pipeline I built from scratch for stent-marker localization on 2D coronary angiograms. I trained a deep-learning segmentation model over the three coronary trees (RCA / LAD / LCX) and refined the predicted masks, then used the cleaned vessel geometry with OCR-derived calibration (pixel→mm) to auto-detect points of bifurcation, measure vessel-wall diameter at multiple cross-sections, classify main vessel vs. side branch, and generate per-branch diameter profile diagrams.',
    metrics: [
      { label: 'Segmentation', value: 'DL-trained' },
      { label: 'Vessels', value: 'RCA · LAD · LCX' },
      { label: 'Targets', value: 'POB · Diameter' },
    ],
    stack: ['Python', 'PyTorch', 'OpenCV', 'scikit-image', 'pytesseract'],
  },
  {
    id: 'proj-outcomes',
    title: 'Clinical Outcome Prediction at Population Scale',
    subtitle: 'Nationwide ML risk models · XAI · external validation',
    description:
      'Derivation and external validation of ML risk models for neurodegenerative, cardiovascular, and diabetic-retinopathy outcomes in T2D patients, across two independent Korean cohorts. Standardized clinical ML pipeline (curation → features → benchmarking → calibration → external validation) with SHAP-based clinician-interpretable outputs.',
    metrics: [
      { label: 'Outcomes', value: 'Neuro · CVD · DR' },
      { label: 'Cohorts', value: '2 (external)' },
      { label: 'XAI', value: 'SHAP' },
    ],
    stack: ['Python', 'R', 'XGBoost', 'scikit-learn', 'SHAP', 'SAS'],
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
      'Build and deploy QCA analysis pipelines with clinician QA interfaces, improving measurement consistency and reviewer efficiency.',
      'Prototype 2D→3D vascular geometry reconstruction from routine angiographic sequences for TAVI planning.',
      'Develop semi-automated catheter / wire tracking systems on angiographic video with SAM 2-assisted segmentation.',
      'Integrate structured clinical variables with imaging model outputs for clinician-facing decision support.',
    ],
  },
  {
    role: 'ML Engineer',
    org: 'Independent Research Team — Private Academy',
    location: 'Seoul, KR',
    period: '2025.01 – Present',
    bullets: [
      'Engineer a multi-agent LLM pipeline for curriculum-aligned mathematics problem generation with Human-in-the-Loop validation and RAG.',
      'Build an AI-assisted workflow for reading/grammar item generation and QC — choice-set consistency, distractor validity, automated rationale generation.',
    ],
  },
  {
    role: 'Joint AI Researcher (Fully-funded MSIT/IITP Scholar)',
    org: 'University of Toronto & MIT',
    location: 'Toronto, CA · Cambridge, MA',
    period: '2023.12 – 2024.06',
    bullets: [
      'Mitigated hallucinations of LLMs over complex scientific Q&A datasets in cross-functional research teams.',
      'Implemented PEFT and Soft Prompting techniques, matching full fine-tuning performance with <1% of parameters.',
      'Applied Knowledge-Graph-based RAG to embed domain-specific physical-science constraints, boosting factual accuracy.',
    ],
  },
  {
    role: 'M.S. Researcher',
    org: 'Kyung Hee University — Center for Digital Health',
    location: 'Seoul, KR',
    period: '2023.01 – 2025.02',
    bullets: [
      'Developed and externally validated ML risk-prediction models for neurodegenerative, cardiovascular, and diabetic-retinopathy outcomes in T2D, across two independent Korean cohorts.',
      'Standardized end-to-end clinical ML pipelines with SHAP-based XAI outputs for clinician interpretability.',
      'Led nationwide time-series analyses of adolescent health behaviors (2005–2022), quantifying epidemiological trends and policy impacts.',
      'Authored / co-authored 21 peer-reviewed papers; built reproducible code-first reporting environments (Python / R).',
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
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=o2RGCNQAAAAJ',    icon: 'scholar' },
];
