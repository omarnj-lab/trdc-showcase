import React, { useRef, useState, useEffect, useCallback } from 'react';
import './App.css';

const BASE = process.env.PUBLIC_URL || '';

/* ─────────────────────────────────────
   DATA
   ───────────────────────────────────── */
const slides = [
  {
    title: 'Pearl',
    fullTitle: 'Pearl: A Multimodal Culturally-Aware Arabic Instruction Dataset',
    description:
      'A groundbreaking multimodal Arabic dataset with 309K examples spanning 10 culturally significant domains across Arab nations. Features PEARL, PEARL-LITE, and PEARL-X benchmarks with reasoning-focused alignment enhancing cultural grounding in MLLMs.',
    arabicDesc:
      'مجموعة بيانات عربية متعددة الوسائط تحتوي على 309 آلاف مثال، تمتد عبر 10 مجالات ذات أهمية ثقافية',
    link: 'https://aclanthology.org/2025.findings-emnlp.1254.pdf',
    venue: 'EMNLP 2025',
    venueType: 'emnlp',
    collaborators: ['UBC University'],
    tags: ['Multimodal', 'Cultural AI', 'Dataset'],
    color: '#6C5CE7',
    accent: '#A29BFE',
    icon: 'diamond',
  },
  {
    title: 'NileChat',
    fullTitle: 'NileChat: Towards Linguistically Diverse and Culturally Aware LLMs',
    description:
      'A culturally-aligned synthetic pre-training framework using realistic character descriptions, local contexts, and community values. NileChat is a 3B-parameter Egyptian/Moroccan dialect LLM that outperforms comparable Arabic models and rivals larger ones.',
    arabicDesc:
      'إطار للتدريب المبدئي الاصطناعي المتوافق ثقافيًا، يعتمد على أوصاف واقعية للشخصيات وسياقات محلية',
    link: 'https://aclanthology.org/2025.emnlp-main.556.pdf',
    venue: 'EMNLP 2025',
    venueType: 'emnlp',
    collaborators: ['UBC University'],
    tags: ['LLM', 'Dialect', 'Cultural'],
    color: '#00B894',
    accent: '#55EFC4',
    icon: 'chat',
  },
  {
    title: 'Arabic Style Transfer',
    fullTitle: 'Descriptive Author Tokens for Transparent Arabic Authorship Style Transfer',
    description:
      'Explores how to reproduce Arabic writing styles of well-known authors using fine-grained linguistic representations, enhancing understanding and interpretation in literary style analysis.',
    arabicDesc:
      'إعادة إنتاج الأساليب الكتابية العربية إلى أساليب مؤلفين معروفين باستخدام تمثيلات لغوية دقيقة',
    link: 'https://aclanthology.org/2025.arabicnlp-sharedtasks.8.pdf',
    venue: 'ArabicNLP 2025',
    venueType: 'arabicnlp',
    collaborators: ['Prince Sultan University'],
    tags: ['NLP', 'Style Transfer', 'First Place'],
    color: '#FDCB6E',
    accent: '#FFEAA7',
    icon: 'trophy',
    isRanked: true,
    rankNote: 'Ranked 1st in ArabicNLP Shared Task',
  },
  {
    title: 'Islamic Inheritance CoT',
    fullTitle: 'CoT for Islamic Inheritance Reasoning',
    description:
      'Introduces a Chain-of-Thought prompting approach for Islamic inheritance reasoning, significantly improving model accuracy in complex legal reasoning tasks without additional training.',
    arabicDesc: 'أسلوب توجيه سلسلة التفكير للاستدلال في المواريث الإسلامية',
    link: 'https://aclanthology.org/2025.arabicnlp-sharedtasks.120.pdf',
    venue: 'ArabicNLP 2025',
    venueType: 'arabicnlp',
    collaborators: ['Prince Sultan University'],
    tags: ['Reasoning', 'Legal AI', 'CoT'],
    color: '#E17055',
    accent: '#FAB1A0',
    icon: 'scale',
  },
  {
    title: 'Hate to Hope',
    fullTitle: 'From Hate to Hope — Boosting Arabic Text Classification',
    description:
      'Develops a BERT-based system for hate speech and hope speech classification, achieving strong performance through data augmentation, preprocessing, and fine-tuning strategies for Arabic social media text.',
    arabicDesc: 'نظام قائم على نموذج BERT العربي لتصنيف خطاب الكراهية وخطاب الأمل',
    link: 'https://aclanthology.org/2025.arabicnlp-sharedtasks.78.pdf',
    venue: 'ArabicNLP 2025',
    venueType: 'arabicnlp',
    collaborators: ['Prince Sultan University'],
    tags: ['Classification', 'BERT', 'Social Media'],
    color: '#0984E3',
    accent: '#74B9FF',
    icon: 'heart',
  },
  {
    title: 'Readability Embeddings',
    fullTitle: 'Readability of Embeddings — Training Neural Readability Classifiers on BAREC',
    description:
      'Presents a neural approach to Arabic text readability assessment using embeddings from the BAREC dataset, achieving competitive accuracy through lightweight and efficient models suitable for educational applications.',
    arabicDesc:
      'منهج عصبي لتقييم قابلية قراءة النص العربي باستخدام تضمينات من مجموعة بيانات BAREC',
    link: 'https://aclanthology.org/2025.arabicnlp-sharedtasks.38.pdf',
    venue: 'ArabicNLP 2025',
    venueType: 'arabicnlp',
    collaborators: ['Prince Sultan University'],
    tags: ['Readability', 'Education', 'Embeddings'],
    color: '#00CEC9',
    accent: '#81ECEC',
    icon: 'book',
  },
  {
    title: 'Quranic Whisper',
    fullTitle: "Adapting Whisper-large-v3 for Qur'anic Recitation Mispronunciation Detection",
    description:
      'Adapts the Whisper-large-v3 model for detecting mispronunciations in Quranic recitation, achieving strong phoneme-level accuracy and recall, paving the way for advanced pronunciation feedback systems.',
    arabicDesc: 'مواءمة نموذج Whisper لاكتشاف الأخطاء في نطق تلاوة القرآن',
    link: 'https://aclanthology.org/2025.arabicnlp-sharedtasks.64.pdf',
    venue: 'ArabicNLP 2025',
    venueType: 'arabicnlp',
    collaborators: ['Prince Sultan University'],
    tags: ['Speech', 'Whisper', 'Pronunciation'],
    color: '#6C5CE7',
    accent: '#A29BFE',
    icon: 'mic',
  },
  {
    title: 'ARCADE',
    fullTitle: 'ARCADE: A City-Scale Corpus for Fine-Grained Arabic Dialect Tagging',
    description:
      'The first Arabic audio resource focused on city-level dialect identification, built from real radio clips across 58 cities in 19 countries. Enriched with multi-label annotations (dialect, speech type, emotion, classification validity), making it a powerful benchmark for multi-task learning and fine-grained Arabic dialect models.',
    arabicDesc:
      'تقدم الورقة مجموعة بيانات ARCADE كأول مورد صوتي عربي يركز على تمييز اللهجات بدقة على مستوى المدن، اعتمادًا على مقاطع إذاعية حقيقية من 58 مدينة في 19 دولة.',
    link: 'https://arxiv.org/pdf/2601.02209',
    venue: 'ArXiv / Journal',
    venueType: 'arxiv',
    collaborators: ['Prince Sultan University'],
    tags: ['Dialect', 'Audio', 'Dataset', '58 Cities'],
    color: '#E84393',
    accent: '#FD79A8',
    icon: 'radio',
    resources: [{ label: 'Dataset', url: 'https://huggingface.co/datasets/riotu-lab/ARCADE-full' }],
  },
  {
    title: 'Alexandria',
    fullTitle: 'Alexandria: A Multi-Domain Dialectal Arabic Machine Translation Dataset for Culturally Inclusive and Linguistically Diverse LLMs',
    description:
      'A large-scale benchmark for Arabic dialect machine translation covering 13 countries and 11 domains at city-level granularity. Features multi-turn dialogue scenarios with gender and speaker metadata, enabling deeper evaluation of translation models and LLMs while revealing persistent challenges in Arabic dialectal diversity.',
    arabicDesc:
      'تقدم الورقة مجموعة بيانات Alexandria كمرجع واسع النطاق موجّه لتحسين الترجمة الآلية للهجات العربية، مع تغطية 13 دولة و11 مجالًا حيويًا وبمستوى دقة يصل إلى المدينة.',
    link: 'https://arxiv.org/pdf/2601.13099',
    venue: 'ACL 2026',
    venueType: 'acl',
    collaborators: ['UBC University'],
    tags: ['Translation', 'Dialect', 'LLM', '13 Countries'],
    color: '#00B894',
    accent: '#55EFC4',
    icon: 'globe',
  },
  {
    title: 'AraModernBERT',
    fullTitle: 'AraModernBERT: Transtokenized Initialization and Long-Context Encoder Modeling for Arabic',
    description:
      'A modern adaptation of ModernBERT for Arabic with transtokenized initialization and long-context support up to 8,192 tokens. Achieves notable improvements in language modeling and Arabic NLU tasks (reasoning, abuse detection, NER), highlighting the importance of adapting modern architectures for Arabic-like languages.',
    arabicDesc:
      'تقدم الورقة نموذج AraModernBERT كتكيف حديث لمعمارية ModernBERT للغة العربية، مع تحسينات جوهرية عبر التهيئة بالتوكننة المحوّلة ودعم السياق الطويل حتى 8192 رمزًا.',
    link: 'https://aclanthology.org/2026.abjadnlp-1.39.pdf',
    venue: 'AbjadNLP @ EACL 2026',
    venueType: 'eacl',
    collaborators: ['Namaa Community'],
    tags: ['BERT', 'Encoder', '8K Context', 'NLU'],
    color: '#6C5CE7',
    accent: '#A29BFE',
    icon: 'cpu',
    resources: [{ label: 'Model', url: 'https://huggingface.co/NAMAA-Space/AraModernBert-Base-V1.0' }],
  },
  {
    title: 'AISA-AR Function Call',
    fullTitle: 'From Language to Action in Arabic: Reliable Structured Tool Calling via Data-Centric Fine-Tuning',
    description:
      'A practical framework enabling Arabic LLMs to execute structured tool calls reliably. Through data refinement, schema repair, and full model fine-tuning, parsing errors dropped from 87% to under 1% with major gains in call and argument accuracy — shifting challenges from structural to semantic understanding.',
    arabicDesc:
      'تقدم الورقة إطار AISA-AR-FunctionCall كنظام عملي لتمكين النماذج من تنفيذ أوامر مهيكلة بالعربية بثبات عالٍ، عبر تحسين البيانات وإصلاح المخططات وإعادة هيكلة استدعاء الأدوات.',
    link: 'https://arxiv.org/pdf/2603.16901',
    venue: 'ArXiv / EMNLP 2026',
    venueType: 'arxiv',
    collaborators: ['Pure Research'],
    tags: ['Tool Calling', 'Function Call', 'Arabic LLM'],
    color: '#E17055',
    accent: '#FAB1A0',
    icon: 'terminal',
    resources: [{ label: 'Models & Dataset', url: 'https://huggingface.co/AISA-Framework' }],
  },
  {
    title: 'AISA Architecture',
    fullTitle: 'AISA: A Unified Architecture for Agentic AI Systems',
    description:
      'A comprehensive architectural framework for designing agentic AI systems, unifying reasoning, tool execution, infrastructure, evaluation, and governance into a single coherent model. Addresses the current fragmentation in building such systems and provides a reference standard for developing more reliable and scalable agentic AI.',
    arabicDesc:
      'تقدم هذه الورقة إطارًا معماريًا متكاملًا يُسمى AISA لتنظيم وتصميم أنظمة الذكاء الاصطناعي الوكيلية، بحيث يوحد بين مكونات التفكير وتنفيذ الأدوات والبنية التحتية والتقييم والحوكمة ضمن نموذج واحد متماسك.',
    link: 'https://zenodo.org/records/18161880/preview/AISA%20(3).pdf?include_deleted=0',
    venue: 'Zenodo / EMNLP 2026',
    venueType: 'arxiv',
    collaborators: ['Pure Research'],
    tags: ['Agentic AI', 'Architecture', 'Framework'],
    color: '#0984E3',
    accent: '#74B9FF',
    icon: 'layers',
    resources: [{ label: 'Models & Dataset', url: 'https://huggingface.co/AISA-Framework' }],
  },
];

/* ─────────────────────────────────────
   ICONS
   ───────────────────────────────────── */
const icons = {
  diamond: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.7 10.3l8.6 10.4a1 1 0 001.4 0l8.6-10.4a1 1 0 00.1-1.2L18.4 4a1 1 0 00-.8-.5H6.4a1 1 0 00-.8.5L2.6 9.1a1 1 0 00.1 1.2z" />
      <path d="M2 10h20M12 3.5L9 10l3 11M12 3.5l3 6.5-3 11" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18" />
      <path d="M4 4h16v6a8 8 0 01-16 0V4zM12 18v4M8 22h8" />
    </svg>
  ),
  scale: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M4 7l4-4 4 4M12 7l4-4 4 4" />
      <path d="M4 7c0 4 4 6 4 6s4-2 4-6M12 7c0 4 4 6 4 6s4-2 4-6" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      <path d="M8 7h8M8 11h6" />
    </svg>
  ),
  mic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
      <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
    </svg>
  ),
  radio: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.9 19.1A13 13 0 012 12M8.8 15.2A7 7 0 016.7 12M12 12h.01" />
      <path d="M19.1 19.1A13 13 0 0022 12M15.2 15.2A7 7 0 0017.3 12" />
      <path d="M4.9 4.9A13 13 0 002 12M8.8 8.8A7 7 0 006.7 12" />
      <path d="M19.1 4.9A13 13 0 0122 12M15.2 8.8A7 7 0 0117.3 12" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  cpu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </svg>
  ),
  terminal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 17l6-5-6-5M12 19h8" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
};

/* ─────────────────────────────────────
   APP
   ───────────────────────────────────── */
/* ─────────────────────────────────────
   PRODUCTS DATA
   ───────────────────────────────────── */
const products = [
  {
    id: 'tuwaiqai',
    name: 'TuwaiqAI',
    tagline: 'Local Private LLM',
    icon: 'robot',
    color: '#6C5CE7',
    accent: '#A29BFE',
    description:
      'Local private LLM and Chatbot UI running projects of Tuwaiq Academy. A fully on-premise AI assistant ensuring data privacy and security.',
    arabicDesc:
      'نموذج لغوي محلي وخاص مع واجهة محادثة لمشاريع أكاديمية طويق، يضمن خصوصية البيانات بالكامل.',
    useCases: [
      'Suggesting Bootcamps and Programs Names',
      'Create Challenges for Flagyard and Cyber Security Projects',
    ],
    media: { type: 'video', src: `${BASE}/tuwaiqai-demo.mp4` },
  },
  {
    id: 'aidoc',
    name: 'Tuwaiq AIDoc Analyzer',
    tagline: 'Document Quality Evaluator',
    icon: 'doc',
    color: '#00B894',
    accent: '#55EFC4',
    description:
      'AI-powered tool for evaluating educational documents (PDFs). Uses Google Gemini to analyze documents across 13 criteria with actionable recommendations.',
    arabicDesc:
      'أداة ذكية لتقييم جودة المستندات التعليمية باستخدام الذكاء الاصطناعي عبر 13 معيارًا مع توصيات عملية.',
    features: [
      {
        icon: 'settings',
        title: 'Evaluation Modes',
        desc: 'Standard, enhanced (with detailed justifications), comparative (multiple documents), and batch processing',
      },
      {
        icon: 'chart',
        title: '13 Evaluation Criteria',
        desc: 'Curriculum mapping, learning objectives, instructional design, technical accuracy, assessment strategy, language/style, accessibility, multimedia, and more',
      },
      {
        icon: 'output',
        title: 'Rich Outputs',
        desc: 'Scores, page references, text snippets, issue prioritization, actionable recommendations, and cross-reference analysis',
      },
    ],
    media: { type: 'image', src: `${BASE}/aidoc-screenshot.png` },
  },
  {
    id: 'tuwaiqai-chat',
    name: 'TuwaiqAI Chat',
    tagline: 'TuwAIQ-Instruct-20B',
    icon: 'robot',
    color: '#E17055',
    accent: '#FAB1A0',
    description:
      'A full-featured AI chat interface powered by TuwAIQ-Instruct-20B model. Supports Arabic and English conversations with data analysis, translation, content writing, and concept explanation — all running locally.',
    arabicDesc:
      'واجهة محادثة ذكية تعمل بنموذج TuwAIQ-Instruct-20B تدعم العربية والإنجليزية مع تحليل البيانات والترجمة وكتابة المحتوى وشرح المفاهيم.',
    useCases: [
      'Data Analysis & Key Insights Extraction',
      'Arabic to English Translation',
      'Concept Explanation in Simple Terms',
    ],
    media: { type: 'image', src: `${BASE}/tuwaiqAi.jpg` },
  },
  {
    id: 'amrni',
    name: 'آمرني — Amrni',
    tagline: 'Arabic Function Calling App',
    icon: 'robot',
    color: '#6C5CE7',
    accent: '#A29BFE',
    description:
      'A mobile AI assistant that executes real-world Arabic commands through structured function calling. Ask for prayer times, currency conversion, Zakat calculation, Qibla direction, and more — all in natural Arabic.',
    arabicDesc:
      'مساعد ذكي على الجوال ينفذ أوامر عربية حقيقية عبر استدعاء الأدوات المهيكل — أوقات الصلاة، تحويل العملات، حساب الزكاة، اتجاه القبلة والمزيد.',
    useCases: [
      'Prayer Times by City',
      'Currency Conversion & Zakat Calculation',
      'Qibla Direction & Daily Assistants',
    ],
    media: { type: 'image', src: `${BASE}/FunctionCall_app.jpg` },
  },
  {
    id: 'smart-auditor',
    name: 'المدقق الذكي',
    tagline: 'AI Internal Audit Agent',
    icon: 'doc',
    color: '#0984E3',
    accent: '#74B9FF',
    description:
      'An intelligent auditing platform with 7 AI agents for financial document analysis. Supports Benford\'s Law, duplicate detection, unusual timing analysis, rounded numbers detection, transaction splitting, segregation of duties, and outlier detection.',
    arabicDesc:
      'منصة تدقيق ذكية تضم 7 وكلاء ذكاء اصطناعي لتحليل المستندات المالية — قانون بنفورد، كشف التكرارات، التوقيت غير المعتاد، الأرقام المقربة، تجزئة المعاملات، فصل المهام، والقيم الشاذة.',
    features: [
      {
        icon: 'chart',
        title: '7 Audit Agents',
        desc: "Benford's Law, Duplicate Detection, Unusual Timing, Rounded Numbers, Transaction Splitting, Segregation of Duties, Outliers",
      },
      {
        icon: 'settings',
        title: 'Multi-Model Support',
        desc: 'Works with local models (Qwen 2.5) and OpenAI — upload PDF, CSV, or Excel files for instant analysis',
      },
      {
        icon: 'output',
        title: 'Comprehensive Audit',
        desc: 'One-click full audit across all 7 agents with 230+ record analysis and detailed findings',
      },
    ],
    media: { type: 'image', src: `${BASE}/internal_audit.jpg` },
  },
  {
    id: 'aisa-functioncall',
    name: 'AISA-AR-FunctionCall-Think',
    tagline: 'Arabic Reasoning Model',
    icon: 'robot',
    color: '#00CEC9',
    accent: '#81ECEC',
    description:
      'A reasoning-augmented Arabic structured tool calling model with near-perfect accuracy. Features 100% Think-Before-Call rate, covers 5 Arabic dialects, and produces explicit decision traces for interpretable Arabic AI agents.',
    arabicDesc:
      'نموذج استدعاء أدوات عربي مع استدلال معزز بدقة شبه مثالية — يدعم 5 لهجات عربية مع تتبع قرارات صريح لأنظمة الذكاء الاصطناعي التفسيرية.',
    useCases: [
      'Near-Perfect Argument F1 & Zero Hallucination',
      'Covers 5 Arabic Dialects',
      'Explicit Decision Traces for Interpretable AI',
    ],
    media: { type: 'image', src: `${BASE}/arafunctioncalling_model.png` },
    resources: [{ label: 'HuggingFace', url: 'https://huggingface.co/AISA-Framework/AISA-AR' }],
  },
];

const taicProducts = [
  {
    tabName: 'AI Model',
    title: 'Tuwaiq AI Model',
    arabicTitle: 'نموذج طويق للذكاء الاصطناعي',
    tagline: 'Arabic-First Large Language Model',
    arabicTagline: 'نموذج لغوي عربي يعمل محليًا',
    description: 'A locally-hosted, privacy-first Arabic large language model developed in-house at Tuwaiq Academy. Optimized for cultural alignment, dialect coverage, and on-premise deployment.',
    arabicDesc: 'نموذج لغوي عربي يعمل محليًا مع ضمان كامل لخصوصية البيانات، مطوّر داخل أكاديمية طويق ومُحسَّن للسياق الثقافي والتغطية اللهجية والنشر داخل المؤسسة.',
    img: `${BASE}/tuwaiqAi.jpg`,
    color: '#00CEC9',
    accent: '#81ECEC',
    status: 'Live',
    statusColor: '#2ecc71',
    meta: [
      { label: 'Type', value: 'Local LLM' },
      { label: 'Languages', value: 'Arabic / English' },
      { label: 'Deployment', value: 'On-Premise' },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="56" height="56">
        <path d="M12 2a4 4 0 00-4 4v1a4 4 0 00-3 6.86A4 4 0 008 21h8a4 4 0 003-7.14A4 4 0 0016 7V6a4 4 0 00-4-4z" />
        <path d="M9 11h6M9 15h6M12 7v8" />
      </svg>
    ),
  },
  {
    tabName: 'Document Review',
    title: 'Tuwaiq AI Review Document',
    arabicTitle: 'مدقق المستندات الذكي',
    tagline: 'AI Document Quality Evaluator',
    arabicTagline: 'مُقيّم جودة المستندات بالذكاء الاصطناعي',
    description: 'An intelligent document review platform that evaluates educational materials across 13 criteria — from curriculum mapping to accessibility — and surfaces actionable, page-referenced recommendations.',
    arabicDesc: 'منصة ذكية لمراجعة المستندات التعليمية تُقيّمها وفق 13 معيارًا — من ربط المنهج إلى إمكانية الوصول — مع توصيات عملية مرتبطة بالصفحات.',
    img: `${BASE}/aidoc-screenshot.png`,
    color: '#6C5CE7',
    accent: '#A29BFE',
    status: 'Live',
    statusColor: '#2ecc71',
    meta: [
      { label: 'Criteria', value: '13 Standards' },
      { label: 'Engine', value: 'Multimodal AI' },
      { label: 'Output', value: 'Cited Insights' },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="56" height="56">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M9 13l2 2 4-4" />
      </svg>
    ),
  },
  {
    tabName: 'AISA Framework',
    title: 'Tuwaiq AISA Framework',
    arabicTitle: 'إطار طويق AISA',
    tagline: 'Agentic AI Skills & Applications Framework',
    arabicTagline: 'إطار شامل لمهارات الذكاء الاصطناعي التوكيلي وتطبيقاته',
    description: 'An end-to-end framework that combines an agentic-AI bootcamp curriculum with deployable Arabic tool-use building blocks — datasets, models, and evaluation suites — so teams can move from training to production.',
    arabicDesc: 'إطار متكامل يجمع منهج معسكر الذكاء الاصطناعي التوكيلي مع لبنات عربية قابلة للنشر — مجموعات بيانات ونماذج ومجموعات تقييم — لينتقل الفِرق من التدريب إلى الإنتاج.',
    img: `${BASE}/1.png`,
    color: '#E17055',
    accent: '#FAB1A0',
    status: 'Live',
    statusColor: '#2ecc71',
    meta: [
      { label: 'Scope', value: 'Curriculum + Toolkit' },
      { label: 'Focus', value: 'Agentic AI' },
      { label: 'Output', value: 'Models · Datasets · Evals' },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="56" height="56">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    tabName: 'Internal Audit',
    title: 'Tuwaiq Internal Audit Model',
    arabicTitle: 'نموذج التدقيق الداخلي',
    tagline: 'AI-Powered Financial Audit Agent',
    arabicTagline: 'وكيل ذكاء اصطناعي للتدقيق الداخلي للمعاملات المالية',
    description: 'An intelligent auditing platform with seven specialized AI agents — Benford\'s Law, duplicate detection, unusual timing, rounded numbers, transaction splitting, segregation of duties, and outlier detection — running over PDF, CSV, and Excel inputs.',
    arabicDesc: 'منصة تدقيق ذكية تضم سبعة وكلاء متخصصين — قانون بنفورد، كشف التكرارات، التوقيت غير المعتاد، الأرقام المقربة، تجزئة المعاملات، فصل المهام، والقيم الشاذة — تعمل على ملفات PDF و CSV و Excel.',
    img: `${BASE}/internal_audit.jpg`,
    color: '#0984E3',
    accent: '#74B9FF',
    status: 'Live',
    statusColor: '#2ecc71',
    meta: [
      { label: 'Agents', value: '7 Specialized' },
      { label: 'Inputs', value: 'PDF · CSV · Excel' },
      { label: 'Engine', value: 'Local + OpenAI' },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="56" height="56">
        <path d="M3 3h18v4H3zM3 11h18v4H3zM3 19h12v2H3z" />
        <path d="M7 5h.01M7 13h.01M7 21h.01" />
      </svg>
    ),
  },
  {
    tabName: 'AR-FunctionCall-FT',
    title: 'AISA-AR-FunctionCall-FT',
    org: 'AISA-Framework',
    arabicTitle: 'نموذج عربي لاستدعاء الأدوات',
    tagline: 'Reliable Arabic Structured Tool Calling via Data-Centric Fine-Tuning',
    arabicTagline: 'استدعاء أدوات عربي موثوق عبر الضبط الدقيق المرتكز على البيانات',
    description: 'A fine-tuned Arabic LLM specialized in structured tool calling, built through a data-centric fine-tuning pipeline. Delivers near-perfect argument F1 with explicit decision traces and broad dialect coverage.',
    arabicDesc: 'نموذج لغوي عربي مُعاد ضبطه ومتخصص في استدعاء الأدوات المهيكل عبر مسار ضبط دقيق مرتكز على البيانات — بدقة شبه مثالية، وتتبع قرارات صريح، وتغطية واسعة للهجات.',
    img: `${BASE}/AISA-FunctionCall.png`,
    color: '#00B894',
    accent: '#55EFC4',
    status: 'Live',
    statusColor: '#2ecc71',
    meta: [
      { label: 'Type', value: 'Fine-Tuned LLM' },
      { label: 'Approach', value: 'Data-Centric FT' },
      { label: 'Argument F1', value: 'Near-Perfect' },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="56" height="56">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6M14 4l-4 16" />
      </svg>
    ),
  },
  {
    tabName: 'CyberBench',
    title: 'Tuwaiq CyberBench',
    arabicTitle: 'معيار طويق للأمن السيبراني',
    tagline: 'Cybersecurity Benchmark for Arabic LLMs',
    arabicTagline: 'معيار شامل لتقييم نماذج الذكاء الاصطناعي في الأمن السيبراني',
    description: 'A comprehensive evaluation suite for measuring how language models reason over cybersecurity tasks in Arabic and English — covering vulnerability analysis, secure code review, threat modeling, and red-team scenarios.',
    arabicDesc: 'مجموعة تقييم شاملة لقياس قدرة النماذج اللغوية على الاستدلال في مهام الأمن السيبراني بالعربية والإنجليزية — تشمل تحليل الثغرات، ومراجعة الكود الآمن، ونمذجة التهديدات، وسيناريوهات الفرق الحمراء.',
    img: null,
    color: '#FF6B6B',
    accent: '#FF8E8E',
    status: 'Coming Soon',
    statusColor: '#FFB142',
    comingSoon: true,
    meta: [
      { label: 'Status', value: 'In Development' },
      { label: 'Domain', value: 'Security AI' },
      { label: 'Release', value: 'TBA' },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="56" height="56">
        <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

function App() {
  const scrollRef = useRef(null);
  const prodScrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prodIndex, setProdIndex] = useState(0);
  const [currentView, setCurrentView] = useState('hero');
  const [lightbox, setLightbox] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('trdc-theme') || 'light');
  const [repIndex, setRepIndex] = useState(0);
  const repScrollRef = useRef(null);
  const [taicIndex, setTaicIndex] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('trdc-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  const heroVisible = currentView === 'hero';
  const activeRef = useRef(activeIndex);
  const prodRef = useRef(prodIndex);
  prodRef.current = prodIndex;
  activeRef.current = activeIndex;

  /* Track active slide */
  const updateActiveIndex = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    if (offsetWidth === 0) return;
    const idx = Math.min(Math.round(scrollLeft / offsetWidth), slides.length - 1);
    setActiveIndex(idx);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateActiveIndex, { passive: true });
    return () => el.removeEventListener('scroll', updateActiveIndex);
  }, [updateActiveIndex, heroVisible]);

  const scrollTo = useCallback((i) => {
    if (!scrollRef.current) return;
    const target = Math.max(0, Math.min(i, slides.length - 1));
    const slideWidth = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({ left: slideWidth * target, behavior: 'smooth' });
  }, []);

  /* Product slide tracking */
  const updateProdIndex = useCallback(() => {
    if (!prodScrollRef.current) return;
    const { scrollLeft, offsetWidth } = prodScrollRef.current;
    if (offsetWidth === 0) return;
    setProdIndex(Math.min(Math.round(scrollLeft / offsetWidth), products.length - 1));
  }, []);

  useEffect(() => {
    const el = prodScrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateProdIndex, { passive: true });
    return () => el.removeEventListener('scroll', updateProdIndex);
  }, [updateProdIndex, currentView]);

  const scrollProdTo = useCallback((i) => {
    if (!prodScrollRef.current) return;
    const target = Math.max(0, Math.min(i, products.length - 1));
    prodScrollRef.current.scrollTo({ left: prodScrollRef.current.offsetWidth * target, behavior: 'smooth' });
  }, []);

  const handleEnterResearch = () => {
    setCurrentView('research');
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ left: 0 });
      }
    }, 100);
  };

  const handleEnterProducts = () => {
    setCurrentView('products');
  };

  const handleEnterFrameworks = () => {
    setCurrentView('frameworks');
  };

  const handleBackToHero = () => {
    setCurrentView('hero');
  };

  /* close lightbox on Escape */
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox]);

  /* keyboard nav */
  useEffect(() => {
    if (heroVisible) return;
    const handler = (e) => {
      if (currentView === 'frameworks') return;
      if (currentView === 'research') {
        const cur = activeRef.current;
        if (e.key === 'ArrowRight') scrollTo(cur + 1);
        if (e.key === 'ArrowLeft') scrollTo(cur - 1);
      } else if (currentView === 'products') {
        const cur = prodRef.current;
        if (e.key === 'ArrowRight') scrollProdTo(cur + 1);
        if (e.key === 'ArrowLeft') scrollProdTo(cur - 1);
      } else if (currentView === 'taic') {
        if (e.key === 'ArrowRight') setTaicIndex(i => Math.min(i + 1, taicProducts.length - 1));
        if (e.key === 'ArrowLeft') setTaicIndex(i => Math.max(i - 1, 0));
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [heroVisible, currentView, scrollTo, scrollProdTo]);

  /* ── Hero / Landing Page ── */
  if (heroVisible) {
    return (
      <div className="landing">
        {/* Top Nav Bar */}
        <nav className="landing-nav">
          <div className="landing-nav-inner">
            <div className="landing-nav-brand">
              <span className="landing-nav-logo">TRDC</span>
              <span className="landing-nav-sep" />
              <span className="landing-nav-tagline">Tuwaiq R&amp;D Center</span>
            </div>

            <div className="landing-nav-links">
              <button className="landing-nav-link landing-nav-link-featured" onClick={() => setCurrentView('taic')}>
                <span className="landing-nav-link-glow" />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="16" height="16">
                  <path d="M12 2a4 4 0 00-4 4v1a4 4 0 00-3 6.86A4 4 0 008 21h8a4 4 0 003-7.14A4 4 0 0016 7V6a4 4 0 00-4-4z" />
                  <path d="M9 11h6M9 15h6M12 7v8" />
                </svg>
                <span>Tuwaiq AI Center</span>
                <span className="landing-nav-badge">NEW</span>
              </button>

              <button className="theme-toggle landing-nav-theme" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'dark' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* ─── Section 1: Hero Banner ─── */}
        <section className="hero hero-split">
          {/* Decorative blobs */}
          <div className="hero-blob hero-blob-1" />
          <div className="hero-blob hero-blob-2" />
          <div className="hero-blob hero-blob-3" />

          <div className="hero-split-inner">
            {/* Left: Text content */}
            <div className="hero-text-col">
              <div className="hero-badge">مركز طويق للأبحاث والتطوير</div>
              <h1 className="hero-title">
                <span className="hero-title-line">أبحاثنا</span>
                <span className="hero-title-accent">ومنجزاتنا</span>
              </h1>
              <p className="hero-sub">
                نقود أبحاثًا متقدمة في الذكاء الاصطناعي، ومعالجة اللغة العربية، والأنظمة الوكيلية، والرؤية الحاسوبية، والواقع المعزز — بالتعاون مع مؤسسات بحثية عالمية وشركات تقنية رائدة
              </p>

              <div className="hero-stats">
                <div className="hero-stat-card">
                  <span className="hero-stat-num">+20</span>
                  <span className="hero-stat-label">ورقة بحثية</span>
                </div>
                <div className="hero-stat-card">
                  <span className="hero-stat-num">+10</span>
                  <span className="hero-stat-label">مؤتمرات</span>
                </div>
                <div className="hero-stat-card">
                  <span className="hero-stat-num">+10</span>
                  <span className="hero-stat-label">شركاء بحثيون</span>
                </div>
                <div className="hero-stat-card">
                  <span className="hero-stat-num">+40</span>
                  <span className="hero-stat-label">مشروع طلابي</span>
                </div>
              </div>
            </div>

            {/* Right: TRDC Poster */}
            <div className="hero-image-col">
              <div className="hero-image-frame" onClick={() => setLightbox({ type: 'image', src: `${BASE}/mainbg.jpg`, title: 'مركز طويق للأبحاث والتطوير' })} style={{ cursor: 'pointer' }}>
                <img src={`${BASE}/mainbg.jpg`} alt="مركز طويق للأبحاث والتطوير" className="hero-mountain-img" />
                <div className="hero-image-hover">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-scroll-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </section>

        {/* ─── Section 2: Explore ─── */}
        <section className="landing-section">
          <div className="landing-section-inner">
            <h2 className="landing-heading">استكشف</h2>
            <p className="landing-heading-sub">Explore Our Work</p>

            <div className="explore-grid">
              <button className="explore-card" onClick={handleEnterResearch}>
                <div className="explore-card-glow" style={{ background: '#6C5CE7' }} />
                <div className="explore-card-icon" style={{ background: 'linear-gradient(135deg, #6C5CE7, #8B5CF6)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="30" height="30">
                    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                  </svg>
                </div>
                <h3 className="explore-card-title">الأوراق البحثية</h3>
                <p className="explore-card-sub">Research Papers</p>
                <span className="explore-card-count">12</span>
              </button>

              <button className="explore-card" onClick={handleEnterProducts}>
                <div className="explore-card-glow" style={{ background: '#00B894' }} />
                <div className="explore-card-icon" style={{ background: 'linear-gradient(135deg, #00B894, #55EFC4)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="30" height="30">
                    <rect x="3" y="11" width="18" height="10" rx="2" />
                    <circle cx="12" cy="5" r="2" />
                    <path d="M12 7v4M8 16h0M16 16h0" />
                  </svg>
                </div>
                <h3 className="explore-card-title">المنتجات الذكية</h3>
                <p className="explore-card-sub">AI Products</p>
                <span className="explore-card-count">6</span>
              </button>

              <button className="explore-card" onClick={handleEnterFrameworks}>
                <div className="explore-card-glow" style={{ background: '#E17055' }} />
                <div className="explore-card-icon" style={{ background: 'linear-gradient(135deg, #E17055, #FAB1A0)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="30" height="30">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h3 className="explore-card-title">الأطر البحثية</h3>
                <p className="explore-card-sub">Tuwaiq Frameworks</p>
                <span className="explore-card-count">3</span>
              </button>

              <button className="explore-card" onClick={() => setCurrentView('meta')}>
                <div className="explore-card-glow" style={{ background: '#0984E3' }} />
                <div className="explore-card-icon" style={{ background: 'linear-gradient(135deg, #0984E3, #74B9FF)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="30" height="30">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                  </svg>
                </div>
                <h3 className="explore-card-title">مشاريع ARIA مع Meta</h3>
                <p className="explore-card-sub">Meta ARIA Glasses</p>
                <span className="explore-card-count">5</span>
              </button>

              <button className="explore-card" onClick={() => setCurrentView('mawhiba')}>
                <div className="explore-card-glow" style={{ background: '#FDCB6E' }} />
                <div className="explore-card-icon" style={{ background: 'linear-gradient(135deg, #FDCB6E, #FFEAA7)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="30" height="30">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
                  </svg>
                </div>
                <h3 className="explore-card-title">أبحاث الموهوبين</h3>
                <p className="explore-card-sub">Mawhiba Research</p>
                <span className="explore-card-count">42</span>
              </button>

              <button className="explore-card" onClick={() => setCurrentView('reports')}>
                <div className="explore-card-glow" style={{ background: '#E84393' }} />
                <div className="explore-card-icon" style={{ background: 'linear-gradient(135deg, #E84393, #FD79A8)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="30" height="30">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                  </svg>
                </div>
                <h3 className="explore-card-title">الإصدارات</h3>
                <p className="explore-card-sub">Reports & Publications</p>
                <span className="explore-card-count">3</span>
              </button>
            </div>
          </div>
        </section>

        {/* ─── Section 3: Accomplishments / News ─── */}
        <section className="landing-section landing-section-alt">
          <div className="landing-section-inner">
            <h2 className="landing-heading">إنجازات ومستجدات</h2>
            <p className="landing-heading-sub">Accomplishments & News</p>

            <div className="news-grid news-grid-single">
              {/* Balsam */}
              <div className="news-card news-card-balsam" onClick={() => setLightbox({ type: 'pdf', src: `${BASE}/balsam-indicator.pdf`, title: 'Balsam Indicator' })}>
                <div className="news-balsam-logo">
                  <img src={`${BASE}/king-salman-logo.jpg`} alt="King Salman Global Academy" />
                </div>
                <div className="news-card-body">
                  <div className="news-card-badge" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>تعاون بحثي</div>
                  <h3 className="news-card-title">مجمع الملك سلمان العالمي للغة العربية</h3>
                  <h4 className="news-card-title-en">King Salman Global Academy for Arabic Language</h4>
                  <p className="news-balsam-desc">
                    مؤشر (بَلْسَم) وثيقةً معياريةً تصدر عن مجمع الملك سلمان العالمي للغة العربية لقياس أداء النماذج اللغوية العربية؛ بمؤشرات تقييم منهجية وتحليلات مقارنة تعكس مستوى كفاءتها في المهام المختلفة.
                  </p>
                  <p className="news-balsam-desc-en">
                    Balsam Indicator: A standard document to measure the performance of Arabic language models with systematic evaluation indicators and comparative analyses.
                  </p>
                  <span className="news-click-hint">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                    </svg>
                    View Document
                  </span>
                </div>
              </div>

              {/* ROR */}
              <div className="news-card news-card-balsam" onClick={() => setLightbox({ type: 'image', src: `${BASE}/ror.jpg`, title: 'ROR Registration' })}>
                <div className="news-balsam-logo" style={{ background: '#f8f8f8' }}>
                  <img src={`${BASE}/ror.jpg`} alt="ROR Registration" style={{ maxWidth: '160px' }} />
                </div>
                <div className="news-card-body">
                  <div className="news-card-badge">إنجاز</div>
                  <h3 className="news-card-title">تسجيل أكاديمية طويق في السجل العالمي</h3>
                  <h4 className="news-card-title-en">Research Organization Registry (ROR)</h4>
                  <ul className="news-card-list">
                    <li>اعتراف عالمي رسمي بالمؤسسة ضمن البنية التحتية للبحث العلمي</li>
                    <li>هوية رقمية مؤسسية معتمدة عالميًا</li>
                    <li>تمكين تتبع الأبحاث والانتماء المؤسسي بدقة</li>
                    <li>جاهزية للتكامل مع أنظمة النشر والتمويل الدولية</li>
                  </ul>
                  <p className="news-card-footer">أكاديمية طويق الآن جزء من شبكة المؤسسات البحثية الدولية</p>
                  <span className="news-click-hint">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                    </svg>
                    View Details
                  </span>
                </div>
              </div>

              {/* Accomplishments PDF */}
              <div className="news-card news-card-balsam" onClick={() => setLightbox({ type: 'pdf', src: `${BASE}/tuwaiq-accomplishments.pdf`, title: 'إنجازات أكاديمية طويق' })}>
                <div className="news-balsam-logo" style={{ background: 'linear-gradient(135deg, #1a1a3e, #2d2d5e)', padding: '28px' }}>
                  <div style={{ textAlign: 'center', color: 'white' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40" style={{ marginBottom: '8px' }}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, opacity: 0.7 }}>2025 - 2026</div>
                  </div>
                </div>
                <div className="news-card-body">
                  <div className="news-card-badge" style={{ background: 'linear-gradient(135deg, #E17055, #FAB1A0)' }}>إنجازات</div>
                  <h3 className="news-card-title">إنجازات أكاديمية طويق</h3>
                  <h4 className="news-card-title-en">Quality, Research & Innovation Department</h4>
                  <p className="news-balsam-desc">
                    ملف شامل يستعرض إنجازات إدارة الجودة والبحث والابتكار في أكاديمية طويق، يشمل مشاريع ARIA مع Meta، مشروع PulMind الحائز على الجائزة الكبرى في جنيف، والعديد من المبادرات البحثية والابتكارية.
                  </p>
                  <p className="news-balsam-desc-en">
                    Comprehensive accomplishments report covering Meta ARIA projects, PulMind (Grand Prize winner at Geneva Inventions), and research & innovation initiatives.
                  </p>
                  <span className="news-click-hint">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                    </svg>
                    View Document
                  </span>
                </div>
              </div>

              {/* HuggingFace */}
              <div className="news-card news-card-balsam news-card-hf">
                <div className="news-balsam-logo" style={{ background: 'linear-gradient(135deg, #FFD21E, #FFF0B3)', padding: '28px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <svg viewBox="0 0 120 120" width="56" height="56" style={{ marginBottom: '6px' }}>
                      <circle cx="60" cy="60" r="56" fill="#FFD21E"/>
                      <ellipse cx="40" cy="52" rx="6" ry="7" fill="#1a1a2e"/>
                      <ellipse cx="80" cy="52" rx="6" ry="7" fill="#1a1a2e"/>
                      <path d="M38 75 Q60 92 82 75" stroke="#1a1a2e" strokeWidth="5" fill="none" strokeLinecap="round"/>
                      <circle cx="33" cy="68" r="5" fill="#FF9D00" opacity="0.5"/>
                      <circle cx="87" cy="68" r="5" fill="#FF9D00" opacity="0.5"/>
                    </svg>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#1a1a2e', opacity: 0.6 }}>Coming Soon</div>
                  </div>
                </div>
                <div className="news-card-body">
                  <div className="news-card-badge" style={{ background: 'linear-gradient(135deg, #FFD21E, #FFC107)', color: '#1a1a2e' }}>قريبًا</div>
                  <h3 className="news-card-title">إطلاق حساب المركز على HuggingFace</h3>
                  <h4 className="news-card-title-en">TRDC HuggingFace Organization</h4>
                  <p className="news-balsam-desc">
                    نعلن قريبًا عن إطلاق حساب مركز طويق للأبحاث والتطوير على منصة HuggingFace، لنشر النماذج اللغوية ومجموعات البيانات والأدوات البحثية المفتوحة المصدر للمجتمع البحثي والتقني.
                  </p>
                  <p className="news-balsam-desc-en">
                    Announcing our upcoming HuggingFace organization for publishing open-source Arabic AI models, datasets, and research tools.
                  </p>
                  <span className="news-click-hint" style={{ color: '#FFC107' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                    </svg>
                    Stay Tuned
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Landing Lightbox */}
        {lightbox && (
          <div className="lightbox" onClick={() => setLightbox(null)}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              {lightbox.type === 'pdf' ? (
                <div className="lightbox-pdf-wrap">
                  <iframe src={`${lightbox.src}#view=FitH`} className="lightbox-pdf" title={lightbox.title} />
                  <a href={lightbox.src} target="_blank" rel="noopener noreferrer" className="lightbox-open-btn">
                    Open in New Tab
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </a>
                </div>
              ) : (
                <img src={lightbox.src} alt={lightbox.title} className="lightbox-img" />
              )}
            </div>
          </div>
        )}

        {/* ─── Footer ─── */}
        <footer className="landing-footer">
          <span className="landing-footer-logo">TRDC</span>
          <span className="landing-footer-sep">|</span>
          <span className="landing-footer-text">Tuwaiq Research & Development Center</span>
        </footer>
      </div>
    );
  }

  /* ── Products View ── */
  if (currentView === 'products') {
    const cp = products[prodIndex];
    return (
      <div className="showcase">
        <header className="topbar">
          <button className="topbar-back" onClick={handleBackToHero}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="topbar-brand">
            <span className="topbar-logo">TRDC</span>
            <span className="topbar-sep">|</span>
            <span className="topbar-page">AI Products</span>
          </div>
          <div className="topbar-right">
            <div className="topbar-counter">
              <span className="topbar-current">{String(prodIndex + 1).padStart(2, '0')}</span>
              <span className="topbar-of">/</span>
              <span className="topbar-total">{String(products.length).padStart(2, '0')}</span>
            </div>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              )}
            </button>
          </div>
        </header>

        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${((prodIndex + 1) / products.length) * 100}%`, background: cp.color }} />
        </div>

        {/* Nav Arrows */}
        <button className={`nav-arrow nav-prev ${prodIndex === 0 ? 'hidden' : ''}`} onClick={() => scrollProdTo(prodIndex - 1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button className={`nav-arrow nav-next ${prodIndex === products.length - 1 ? 'hidden' : ''}`} onClick={() => scrollProdTo(prodIndex + 1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
        </button>

        <div className="track" ref={prodScrollRef}>
          {products.map((p, i) => (
            <article key={p.id} className={`slide ${i === prodIndex ? 'active' : ''}`}>
              <div className="slide-watermark" style={{ color: `${p.color}0d` }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="slide-card prod-card">
                {/* LEFT — Media */}
                <div className="card-left">
                  <div className="product-media-frame" style={{ '--clr': p.color, '--acc': p.accent }} onClick={() => setLightbox({ type: p.media.type, src: p.media.src, title: p.name })}>
                    <div className="paper-glow" />
                    {p.media.type === 'video' ? (
                      <video src={p.media.src} className="product-media-el" muted playsInline preload="metadata" />
                    ) : (
                      <img src={p.media.src} alt={p.name} className="product-media-el" />
                    )}
                    <div className="paper-hover-overlay paper-click-overlay">
                      <span>{p.media.type === 'video' ? 'Play Video' : 'View Screenshot'}</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                      </svg>
                    </div>
                  </div>
                  <div className="venue-pill" style={{ background: p.color }}>
                    <span className="venue-dot" />
                    {p.tagline}
                  </div>
                </div>

                {/* RIGHT — Content */}
                <div className="card-right">
                  <div className="card-icon" style={{ background: `linear-gradient(135deg, ${p.color}, ${p.accent})` }}>
                    {p.icon === 'robot' ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
                        <rect x="3" y="11" width="18" height="10" rx="2" />
                        <circle cx="12" cy="5" r="2" />
                        <path d="M12 7v4M8 16h0M16 16h0" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                      </svg>
                    )}
                  </div>

                  <h2 className="card-title">{p.name}</h2>

                  <div className="card-tags">
                    <span className="tag" style={{ background: `${p.color}14`, color: p.color, borderColor: `${p.color}35` }}>
                      {p.tagline}
                    </span>
                  </div>

                  <p className="card-desc">{p.description}</p>
                  <p className="card-arabic">{p.arabicDesc}</p>

                  {/* Use Cases */}
                  {p.useCases && (
                    <div className="prod-section">
                      <div className="prod-section-label">Use Cases</div>
                      <div className="prod-usecases">
                        {p.useCases.map((uc, j) => (
                          <div key={j} className="prod-usecase">
                            <span className="prod-usecase-num" style={{ background: p.color }}>{j + 1}</span>
                            <span className="prod-usecase-text">{uc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  {p.features && (
                    <div className="prod-section">
                      <div className="prod-section-label">Key Features</div>
                      <div className="prod-features">
                        {p.features.map((f, j) => (
                          <div key={j} className="prod-feature">
                            <div className="prod-feature-icon" style={{ color: p.color }}>
                              {f.icon === 'settings' && (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                                  <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                                </svg>
                              )}
                              {f.icon === 'chart' && (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                                  <path d="M18 20V10M12 20V4M6 20v-6" />
                                </svg>
                              )}
                              {f.icon === 'output' && (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                  <path d="M14 2v6h6M9 15l2 2 4-4" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <div className="prod-feature-title">{f.title}</div>
                              <div className="prod-feature-desc">{f.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <nav className="dots">
          {products.map((p, i) => (
            <button key={i} className={`dot ${i === prodIndex ? 'active' : ''}`} onClick={() => scrollProdTo(i)} style={i === prodIndex ? { background: p.color } : {}}>
              <span className="dot-tip">{p.name}</span>
            </button>
          ))}
        </nav>

        <div className="kb-hint">
          <kbd>&larr;</kbd> <kbd>&rarr;</kbd> or scroll
        </div>

        {/* Lightbox */}
        {lightbox && (
          <div className="lightbox" onClick={() => setLightbox(null)}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              {lightbox.type === 'video' ? (
                <video src={lightbox.src} className="lightbox-video" controls autoPlay playsInline />
              ) : lightbox.type === 'pdf' ? (
                <div className="lightbox-pdf-wrap">
                  <iframe src={`${lightbox.src}#view=FitH`} className="lightbox-pdf" title={lightbox.title} />
                  <a href={lightbox.src} target="_blank" rel="noopener noreferrer" className="lightbox-open-btn">
                    Open in New Tab
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </a>
                </div>
              ) : (
                <img src={lightbox.src} alt={lightbox.title} className="lightbox-img" />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ── Frameworks View ── */
  if (currentView === 'frameworks') {
    return (
      <div className="frameworks-view">
        <header className="topbar">
          <button className="topbar-back" onClick={handleBackToHero}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="topbar-brand">
            <span className="topbar-logo">TRDC</span>
            <span className="topbar-sep">|</span>
            <span className="topbar-page">Frameworks</span>
          </div>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            )}
          </button>
        </header>

        <div className="fw-header">
          <h2 className="fw-title">الأطر البحثية</h2>
          <p className="fw-subtitle">Tuwaiq Research Frameworks & Bootcamp Outputs</p>
        </div>

        <div className="fw-posters">
          {[
            { src: `${BASE}/1.png`, title: 'معسكر الذكاء الاصطناعي التوكيلي', sub: 'AISA Agentic AI Bootcamp' },
            { src: `${BASE}/2.png`, title: 'من البحث إلى التطبيق', sub: 'From Research to Application' },
            { src: `${BASE}/3.png`, title: 'نموذج ذكاء اصطناعي عربي', sub: 'Arabic AI Function Calling' },
          ].map((poster, i) => (
            <div key={i} className="fw-poster-card" onClick={() => setLightbox({ type: 'image', src: poster.src, title: poster.title })}>
              <div className="fw-poster-frame">
                <img src={poster.src} alt={poster.title} className="fw-poster-img" />
                <div className="fw-poster-overlay">
                  <span className="fw-poster-zoom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                    </svg>
                  </span>
                </div>
              </div>
              <h3 className="fw-poster-title">{poster.title}</h3>
              <p className="fw-poster-sub">{poster.sub}</p>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightbox && (
          <div className="lightbox" onClick={() => setLightbox(null)}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img src={lightbox.src} alt={lightbox.title} className="lightbox-img" />
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ── Meta ARIA View ── */
  if (currentView === 'meta') {
    const metaProjects = [
      { title: 'Augmented Reality for Tourism', desc: 'Enhancing Immersive Travel and Cultural Exploration Using Project Aria Glasses', fullTitle: 'Augmented Reality for Tourism: Enhancing Immersive Travel and Cultural Exploration Using Project Aria Glasses', img: `${BASE}/project1.png`, color: '#0984E3' },
      { title: 'Real-Time Language Interpretation', desc: 'Accessibility Support for the Hearing and Speech Impaired Using Project Aria Glasses', fullTitle: 'Real-Time Language Interpretation and Accessibility Support for the Hearing and Speech Impaired Using Project Aria Glasses', img: `${BASE}/project2.png`, color: '#00B894' },
      { title: 'Pipeline Inspection & QA', desc: 'AR for Pipeline Inspection and Quality Assurance in the Oil & Gas Sector Using Project Aria Glasses', fullTitle: 'Augmented Reality for Pipeline Inspection and Quality Assurance in the Oil & Gas Sector Using Project Aria Glasses', img: `${BASE}/Project3.png`, color: '#E17055' },
      { title: 'Daily Personal Assistant', desc: 'Enhancing Quality of Life through Contextual AI Using Project Aria', fullTitle: 'Project Aria as a Daily Personal Assistant: Enhancing Quality of Life through Contextual AI', img: `${BASE}/project4.png`, color: '#6C5CE7' },
      { title: 'Smart Agriculture', desc: 'Precision Farming Using Project Aria Glasses: A Vision-Based AR Framework', fullTitle: 'Smart Agriculture and Precision Farming Using Project Aria Glasses: A Vision-Based AR Framework', img: `${BASE}/project5.png`, color: '#FDCB6E' },
    ];
    return (
      <div className="frameworks-view">
        <header className="topbar">
          <button className="topbar-back" onClick={handleBackToHero}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="topbar-brand">
            <span className="topbar-logo">TRDC</span>
            <span className="topbar-sep">|</span>
            <span className="topbar-page">Meta ARIA</span>
          </div>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            )}
          </button>
        </header>

        <div className="fw-header">
          <div className="meta-logo-row">
            <img src={`${BASE}/meta-logo.png`} alt="Meta" className="meta-collab-logo" />
          </div>
          <h2 className="fw-title" style={{ backgroundImage: 'linear-gradient(135deg, #fff, #74B9FF)' }}>Meta ARIA Glasses</h2>
          <p className="fw-subtitle">5 research papers and products in collaboration with Meta</p>
        </div>

        <div className="meta-grid">
          {metaProjects.map((p, i) => (
            <div key={i} className="meta-card" onClick={() => setLightbox({ type: 'image', src: p.img, title: p.fullTitle })}>
              <div className="meta-card-img">
                <img src={p.img} alt={p.title} />
                <div className="meta-card-overlay">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                  </svg>
                </div>
              </div>
              <div className="meta-card-body">
                <div className="meta-card-num" style={{ background: p.color }}>{i + 1}</div>
                <h3 className="meta-card-title">{p.title}</h3>
                <p className="meta-card-desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {lightbox && (
          <div className="lightbox" onClick={() => setLightbox(null)}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img src={lightbox.src} alt={lightbox.title} className="lightbox-img" />
              <p className="lightbox-caption">{lightbox.title}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ── Mawhiba View ── */
  if (currentView === 'mawhiba') {
    const mawhibaProjects = [
      { title: 'Square-Wave Frequency-Controlled LED Illumination System for Dye-Sensitized Solar Cells', tags: ['Solar Cells', 'Electronics'], icon: '⚡' },
      { title: 'Data-Driven Modeling and Real-Time Estimation of Dissipative Effects in Gyroscopic Dynamics', tags: ['Data Science', 'Physics'], icon: '📊' },
      { title: 'Photovoltaic Fault Diagnostics and Prognostics Using ML', tags: ['ML', 'Solar Energy'], icon: '🤖' },
      { title: 'ML-Driven Analysis of Multiplexed Dye Removal for Water Purification', tags: ['ML', 'Water Treatment'], icon: '💧' },
      { title: 'Water absorbability study of 3D printed polymers for drug delivery', tags: ['3D Printing', 'Biomedical'], icon: '🧬' },
      { title: 'Innovative Muscle Mentoring System with Wheelchair Sensors and Digital-Twin', tags: ['IoT', 'Healthcare'], icon: '🦽' },
      { title: 'COx Free Hydrogen from Methane Decomposition', tags: ['Clean Energy', 'Chemistry'], icon: '🔬' },
      { title: 'Smart Fracture Detection and Analysis System (FDAS)', tags: ['AI', 'Medical Imaging'], icon: '🏥' },
      { title: 'Deep Learning for Real-Time Detection of Foodborne Bacteria in Saudi Arabia', tags: ['Deep Learning', 'Food Safety'], icon: '🍽️' },
      { title: 'Photovoltaic Modules Defect Detection Using YOLO', tags: ['Computer Vision', 'Solar'], icon: '👁️' },
      { title: 'Impact of Auditory Tone on Visual Attention: Eye-Tracking in ASD vs. Typical Children', tags: ['Neuroscience', 'Eye-Tracking'], icon: '🧠' },
      { title: 'Medication Error Mortality Reduction Using ML and Pain Assessment', tags: ['Healthcare', 'ML'], icon: '💊' },
      { title: 'Federated Quantum Kernel Learning for Adversarial Fraud Detection under SAMA Standards', tags: ['Quantum Computing', 'Finance'], icon: '🔐' },
      { title: 'Using VR Technologies to Enhance Relaxation through Fractal Patterns and Binaural Beats', tags: ['VR', 'Mental Health'], icon: '🥽' },
      { title: 'ML-Enhanced Selectivity for Multiplexed Heavy Metal Detection', tags: ['ML', 'Environmental'], icon: '🌍' },
      { title: 'Smart AI-Based Adaptive Traffic Signal System with Emergency Vehicle Priority', tags: ['AI', 'Smart Cities'], icon: '🚦' },
      { title: 'Low-cost coating material for solar cells using tin nanoparticles with polyurethane', tags: ['Nanotech', 'Solar Energy'], icon: '🔬' },
      { title: 'AI-Powered ECG Analysis for Early Detection of Heart Disorders', tags: ['AI', 'Cardiology'], icon: '❤️' },
      { title: 'StuTally: Student and Crowd Management using Computer Vision', tags: ['Computer Vision', 'Education'], icon: '👥' },
      { title: 'Next-Generation Photodetectors: High-Performance Perovskite Devices', tags: ['Optics', 'Sensors'], icon: '🔭' },
      { title: 'AI for Analysing and Interpreting Ancient Thamudic Inscriptions', tags: ['AI', 'Archaeology'], icon: '🏛️' },
      { title: 'Saudi Arabia Labor Market Analysis Using Machine Learning', tags: ['Data Science', 'Economics'], icon: '📈' },
      { title: "Early Prediction of Alzheimer's Disease Using Blood Biomarkers and ML", tags: ['Healthcare', 'ML'], icon: '🧠' },
      { title: 'Aqua Well Robot Solution (AWRS)', tags: ['Robotics', 'Water'], icon: '🤖' },
      { title: 'Flexographically Printed Sensors On Face Masks for Pulmonary Pathogens Detection', tags: ['Wearable Tech', 'Healthcare'], icon: '😷' },
      { title: 'Web-Based Application for Security and Safety Improvements', tags: ['Web Dev', 'Security'], icon: '🛡️' },
      { title: 'Integrating Solar and Nuclear Power for Sustainable Energy on Mars', tags: ['Space Tech', 'Energy'], icon: '🚀' },
      { title: 'Multi-Omics Deep Learning for Early Detection of Diabetes Associated Pancreatic Cancer', tags: ['Deep Learning', 'Oncology'], icon: '🔬' },
      { title: 'DeepSense Capsule: AI-Assisted Ingestible VOC Sensor for Pancreatic Cancer Detection', tags: ['AI', 'Medical Devices'], icon: '💊' },
      { title: 'Piezoelectric Assisted Exfoliation', tags: ['Materials Science', 'Nanotech'], icon: '⚛️' },
      { title: 'Anesthetic Efficacy of Achillea Millefolium Extract for Local Anesthesia in Dentistry', tags: ['Biomedical', 'Dentistry'], icon: '🌿' },
      { title: 'Traffic Signal Timing Estimation Using AI-Enhanced LiDAR Sensors', tags: ['LiDAR', 'Smart Cities'], icon: '📡' },
      { title: 'AI-Enhanced Photobioreactor', tags: ['AI', 'Biotechnology'], icon: '🌱' },
      { title: 'Production of Hydrogen from CO2 and CH4: Modified by Nickel Catalyst', tags: ['Clean Energy', 'Chemistry'], icon: '⚗️' },
      { title: 'Automated Medical Response System in Crowded Events', tags: ['Healthcare', 'Automation'], icon: '🚑' },
      { title: 'Iron Oxide Nanoparticle-Coated Sand for Arsenic Removal from Water', tags: ['Nanotech', 'Water Treatment'], icon: '💧' },
      { title: 'Wave Resistant Fishing Boat for Wading Fishermen', tags: ['Marine Engineering', 'Safety'], icon: '⛵' },
      { title: 'Sustainable Clay Reinforced with Graphene from Palm Waste for Green Buildings', tags: ['Materials', 'Sustainability'], icon: '🏗️' },
      { title: 'Rehabilitation using EMG-based Control with Mixed Reality and Prostheses', tags: ['Mixed Reality', 'Rehabilitation'], icon: '🦾' },
      { title: 'Intelligent Photovoltaic Forecasting Using Machine Learning', tags: ['ML', 'Solar Energy'], icon: '☀️' },
      { title: 'AI to Detect Fraud in Financial Transactions', tags: ['AI', 'Finance'], icon: '💰' },
      { title: 'Two-Stage UAV for Early Detection of Red Palm Weevil Using Thermal Imaging and E-Nose', tags: ['Drones', 'Agriculture'], icon: '🚁' },
    ];
    return (
      <div className="frameworks-view">
        <header className="topbar">
          <button className="topbar-back" onClick={handleBackToHero}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="topbar-brand">
            <span className="topbar-logo">TRDC</span>
            <span className="topbar-sep">|</span>
            <span className="topbar-page">Mawhiba</span>
          </div>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            )}
          </button>
        </header>

        <div className="fw-header">
          <div className="meta-logo-row">
            <img src={`${BASE}/mawhiba-logo.png`} alt="Mawhiba" className="meta-collab-logo" />
          </div>
          <h2 className="fw-title" style={{ backgroundImage: 'linear-gradient(135deg, #fff, #FFEAA7)' }}>أبحاث الموهوبين</h2>
          <p className="fw-subtitle">42 collaborative research projects conducted with high school students</p>
        </div>

        <div className="mawhiba-grid">
          {mawhibaProjects.map((p, i) => (
            <div key={i} className="mawhiba-card">
              <span className="mawhiba-icon">{p.icon}</span>
              <h3 className="mawhiba-title">{p.title}</h3>
              <div className="mawhiba-tags">
                {p.tags.map((t, j) => (
                  <span key={j} className="mawhiba-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ── TAIC (Tuwaiq AI Center) View ── */
  if (currentView === 'taic') {
    const tp = taicProducts[taicIndex];
    return (
      <div className="taic-view" style={{ '--clr': tp.color, '--acc': tp.accent }}>
        <header className="topbar">
          <button className="topbar-back" onClick={handleBackToHero}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="topbar-brand">
            <span className="topbar-logo">TRDC</span>
            <span className="topbar-sep">|</span>
            <span className="topbar-page">Tuwaiq AI Center</span>
          </div>
          <div className="topbar-right">
            <div className="topbar-counter">
              <span className="topbar-current">{String(taicIndex + 1).padStart(2, '0')}</span>
              <span className="topbar-of">/</span>
              <span className="topbar-total">{String(taicProducts.length).padStart(2, '0')}</span>
            </div>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              )}
            </button>
          </div>
        </header>

        {/* Tab strip */}
        <div className="taic-tabs">
          <div className="taic-tabs-inner">
            {taicProducts.map((p, i) => (
              <button
                key={i}
                className={`taic-tab ${i === taicIndex ? 'active' : ''} ${p.comingSoon ? 'taic-tab-soon' : ''}`}
                onClick={() => setTaicIndex(i)}
              >
                <span className="taic-tab-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="taic-tab-name">{p.tabName}</span>
                {p.comingSoon && <span className="taic-tab-soon-dot" />}
              </button>
            ))}
            <div
              className="taic-tabs-indicator"
              style={{
                width: `calc((100% - 8px) / ${taicProducts.length})`,
                transform: `translateX(calc(${taicIndex} * 100%))`,
                background: `linear-gradient(135deg, ${tp.color}, ${tp.accent})`,
              }}
            />
          </div>
        </div>

        {/* Stage */}
        <div className="taic-stage" key={taicIndex}>
          <span className="taic-stage-watermark">{String(taicIndex + 1).padStart(2, '0')}</span>
          <div className="taic-stage-blob taic-stage-blob-1" style={{ background: tp.color }} />
          <div className="taic-stage-blob taic-stage-blob-2" style={{ background: tp.accent }} />

          <div className="taic-stage-grid">
            {/* Left — Title + copy */}
            <div className="taic-stage-text">
              <div className="taic-stage-eyebrow">
                <span
                  className="taic-stage-status-dot"
                  style={{
                    background: tp.statusColor,
                    boxShadow: `0 0 0 3px ${tp.statusColor}40`,
                  }}
                />
                {tp.status} · Tuwaiq AI Center
              </div>

              {tp.org && <div className="taic-stage-org">{tp.org}</div>}

              <h1 className="taic-stage-title">
                <span className="taic-stage-title-en" style={{ backgroundImage: `linear-gradient(135deg, ${tp.color}, ${tp.accent})` }}>
                  {tp.title}
                </span>
                <span className="taic-stage-title-ar">{tp.arabicTitle}</span>
              </h1>

              <p className="taic-stage-tagline">{tp.tagline}</p>
              <p className="taic-stage-tagline-ar">{tp.arabicTagline}</p>

              <p className="taic-stage-desc">{tp.description}</p>
              <p className="taic-stage-desc-ar">{tp.arabicDesc}</p>

              <div className="taic-stage-meta">
                {tp.meta.map((m, i) => (
                  <div key={i} className="taic-stage-meta-item">
                    <span className="taic-stage-meta-label">{m.label}</span>
                    <span className="taic-stage-meta-value">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Image / Icon */}
            <div className="taic-stage-visual">
              <div className="taic-stage-icon-bg">{tp.icon}</div>
              {tp.comingSoon ? (
                <div className="taic-stage-frame taic-stage-frame-soon">
                  <div className="taic-stage-frame-glow" />
                  <div className="taic-stage-soon-pattern" />
                  <div className="taic-stage-soon-content">
                    <div className="taic-stage-soon-icon">{tp.icon}</div>
                    <span className="taic-stage-soon-badge">Coming Soon</span>
                    <span className="taic-stage-soon-sub">قريبًا</span>
                  </div>
                </div>
              ) : (
                <div
                  className="taic-stage-frame"
                  onClick={() => setLightbox({ type: 'image', src: tp.img, title: tp.title })}
                >
                  <div className="taic-stage-frame-glow" />
                  <img src={tp.img} alt={tp.title} className="taic-stage-img" />
                  <div className="taic-stage-frame-overlay">
                    <span className="taic-stage-frame-zoom">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                      </svg>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Nav arrows */}
        <button
          className={`nav-arrow nav-prev ${taicIndex === 0 ? 'hidden' : ''}`}
          onClick={() => setTaicIndex(Math.max(0, taicIndex - 1))}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button
          className={`nav-arrow nav-next ${taicIndex === taicProducts.length - 1 ? 'hidden' : ''}`}
          onClick={() => setTaicIndex(Math.min(taicProducts.length - 1, taicIndex + 1))}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
        </button>

        {/* Dots */}
        <nav className="dots">
          {taicProducts.map((p, i) => (
            <button
              key={i}
              className={`dot ${i === taicIndex ? 'active' : ''}`}
              onClick={() => setTaicIndex(i)}
              style={i === taicIndex ? { background: p.color } : {}}
            >
              <span className="dot-tip">{p.title}</span>
            </button>
          ))}
        </nav>

        <div className="kb-hint">
          <kbd>&larr;</kbd> <kbd>&rarr;</kbd> to navigate
        </div>

        {lightbox && (
          <div className="lightbox" onClick={() => setLightbox(null)}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img src={lightbox.src} alt={lightbox.title} className="lightbox-img" />
              <p className="lightbox-caption">{lightbox.title}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ── Reports View ── */
  if (currentView === 'reports') {
    const reports = [
      {
        title: 'منهج طويق للـ Vibe Coding',
        fullTitle: 'منهج طويق للـ Vibe Coding — المنهج العملي لبناء تطبيقات الذكاء الاصطناعي',
        description: 'دليل عملي شامل يقدم منهجية Vibe Coding لبناء التطبيقات باستخدام الذكاء الاصطناعي، حيث يتحول وصف الفكرة بلغة طبيعية إلى تطبيق عملي دون الحاجة لكتابة الكود يدويًا. يهدف لتمكين غير المبرمجين من تحويل أفكارهم إلى منتجات رقمية.',
        descEn: 'A comprehensive practical guide introducing the Vibe Coding methodology — enabling anyone to build AI applications by describing ideas in natural language, without writing code manually.',
        link: `${BASE}/vibe-coding.pdf`,
        pages: '64 صفحة',
        date: '2026',
        color: '#6C5CE7',
        accent: '#A29BFE',
        tags: ['Vibe Coding', 'AI Development', 'No-Code'],
      },
      {
        title: 'تقرير التوجهات التقنية الناشئة 2026',
        fullTitle: 'تقرير التوجهات التقنية الناشئة لعام 2026 — خارطة طريق التحول الرقمي السيادي',
        description: 'تقرير استراتيجي يرصد التحولات التقنية العالمية لعام 2026 مع التركيز على السوق السعودي تحت رؤية 2030. يغطي تداخل الذكاء الاصطناعي مع لغات البرمجة، والأمن السيبراني، والبنية التحتية المتطورة، مع تحليلات قطاعية مفصلة.',
        descEn: 'A strategic report mapping emerging technology trends for 2026, focusing on Saudi Arabia\'s digital transformation under Vision 2030 — covering AI, cybersecurity, and advanced infrastructure.',
        link: `${BASE}/emerging-tech-2026.pdf`,
        pages: '44 صفحة',
        date: 'ديسمبر 2025',
        color: '#E84393',
        accent: '#FD79A8',
        tags: ['Emerging Tech', 'Vision 2030', 'Strategy'],
      },
      {
        title: 'مساهمة أكاديمية طويق في منظومة الذكاء الاصطناعي',
        fullTitle: 'مساهمة أكاديمية طويق في منظومة الذكاء الاصطناعي الوطنية — دراسة شمولية للجهود المبذولة',
        description: 'دراسة شمولية تستعرض مساهمات أكاديمية طويق في بناء منظومة الذكاء الاصطناعي الوطنية، بالتعاون مع شركاء النجاح. تغطي الجهود البحثية والتطويرية والتدريبية التي تدعم التحول الرقمي في المملكة العربية السعودية.',
        descEn: 'A comprehensive study showcasing Tuwaiq Academy\'s contributions to the national AI ecosystem, covering research, development, and training efforts supporting Saudi Arabia\'s digital transformation.',
        link: `${BASE}/tuwaiq-ai-contribution.pdf`,
        pages: '51 صفحة',
        date: '2025',
        color: '#00B894',
        accent: '#55EFC4',
        tags: ['National AI', 'Vision 2030', 'Ecosystem'],
      },
    ];
    const cr = reports[repIndex];

    return (
      <div className="showcase">
        <header className="topbar">
          <button className="topbar-back" onClick={handleBackToHero}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="topbar-brand">
            <span className="topbar-logo">TRDC</span>
            <span className="topbar-sep">|</span>
            <span className="topbar-page">الإصدارات</span>
          </div>
          <div className="topbar-right">
            <div className="topbar-counter">
              <span className="topbar-current">{String(repIndex + 1).padStart(2, '0')}</span>
              <span className="topbar-of">/</span>
              <span className="topbar-total">{String(reports.length).padStart(2, '0')}</span>
            </div>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              )}
            </button>
          </div>
        </header>

        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${((repIndex + 1) / reports.length) * 100}%`, background: cr.color }} />
        </div>

        <button className={`nav-arrow nav-prev ${repIndex === 0 ? 'hidden' : ''}`} onClick={() => { setRepIndex(repIndex - 1); repScrollRef.current?.scrollTo({ left: repScrollRef.current.offsetWidth * (repIndex - 1), behavior: 'smooth' }); }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button className={`nav-arrow nav-next ${repIndex === reports.length - 1 ? 'hidden' : ''}`} onClick={() => { setRepIndex(repIndex + 1); repScrollRef.current?.scrollTo({ left: repScrollRef.current.offsetWidth * (repIndex + 1), behavior: 'smooth' }); }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
        </button>

        <div className="track" ref={repScrollRef} onScroll={() => {
          if (!repScrollRef.current) return;
          const { scrollLeft, offsetWidth } = repScrollRef.current;
          if (offsetWidth > 0) setRepIndex(Math.min(Math.round(scrollLeft / offsetWidth), reports.length - 1));
        }}>
          {reports.map((r, i) => (
            <article key={i} className={`slide ${i === repIndex ? 'active' : ''}`}>
              <div className="slide-watermark" style={{ color: `${r.color}0d` }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="slide-card">
                {/* LEFT — PDF Preview */}
                <div className="card-left">
                  <div className="paper-frame" style={{ '--clr': r.color, '--acc': r.accent }} onClick={() => setLightbox({ type: 'pdf', src: r.link, title: r.fullTitle })}>
                    <div className="paper-glow" />
                    <iframe src={`${r.link}#view=FitH&toolbar=0`} className="paper-pdf" title={r.title} loading="lazy" />
                    <div className="paper-hover-overlay paper-click-overlay">
                      <span>عرض الإصدار</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                      </svg>
                    </div>
                  </div>

                  <div className="venue-pill" style={{ background: r.color }}>
                    <span className="venue-dot" />
                    {r.pages} — {r.date}
                  </div>
                </div>

                {/* RIGHT — Content */}
                <div className="card-right">
                  <div className="card-icon" style={{ background: `linear-gradient(135deg, ${r.color}, ${r.accent})` }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                    </svg>
                  </div>

                  <h2 className="card-title">{r.fullTitle}</h2>

                  <div className="card-tags">
                    {r.tags.map((t, j) => (
                      <span key={j} className="tag" style={{ background: `${r.color}14`, color: r.color, borderColor: `${r.color}35` }}>{t}</span>
                    ))}
                  </div>

                  <p className="card-desc">{r.description}</p>
                  <p className="card-arabic" style={{ direction: 'ltr', textAlign: 'left', borderRight: 'none', borderLeft: `2px solid var(--border-card)`, paddingRight: 0, paddingLeft: '14px' }}>{r.descEn}</p>

                  <div className="card-actions">
                    <a href={r.link} target="_blank" rel="noopener noreferrer" className="read-btn" style={{ background: `linear-gradient(135deg, ${r.color}, ${r.accent})` }}>
                      تحميل الإصدار
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <nav className="dots">
          {reports.map((r, i) => (
            <button key={i} className={`dot ${i === repIndex ? 'active' : ''}`} onClick={() => { setRepIndex(i); repScrollRef.current?.scrollTo({ left: repScrollRef.current.offsetWidth * i, behavior: 'smooth' }); }} style={i === repIndex ? { background: r.color } : {}}>
              <span className="dot-tip">{r.title}</span>
            </button>
          ))}
        </nav>

        <div className="kb-hint">
          <kbd>&larr;</kbd> <kbd>&rarr;</kbd> or scroll
        </div>

        {lightbox && (
          <div className="lightbox" onClick={() => setLightbox(null)}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <div className="lightbox-pdf-wrap">
                <iframe src={`${lightbox.src}#view=FitH`} className="lightbox-pdf" title={lightbox.title} />
                <a href={lightbox.src} target="_blank" rel="noopener noreferrer" className="lightbox-open-btn">
                  Open in New Tab
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ── Showcase ── */
  return (
    <div className="showcase">
      {/* Top Bar */}
      <header className="topbar">
        <button className="topbar-back" onClick={handleBackToHero}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="topbar-brand">
          <span className="topbar-logo">TRDC</span>
          <span className="topbar-sep">|</span>
          <span className="topbar-page">Showcase</span>
        </div>
        <div className="topbar-right">
          <div className="topbar-counter">
            <span className="topbar-current">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className="topbar-of">/</span>
            <span className="topbar-total">{String(slides.length).padStart(2, '0')}</span>
          </div>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            )}
          </button>
        </div>
      </header>

      {/* Progress bar */}
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${((activeIndex + 1) / slides.length) * 100}%`,
            background: slides[activeIndex].color,
          }}
        />
      </div>

      {/* Nav Arrows */}
      <button
        className={`nav-arrow nav-prev ${activeIndex === 0 ? 'hidden' : ''}`}
        onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <button
        className={`nav-arrow nav-next ${activeIndex === slides.length - 1 ? 'hidden' : ''}`}
        onClick={() => scrollTo(Math.min(slides.length - 1, activeIndex + 1))}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
      </button>

      {/* Slide Track */}
      <div className="track" ref={scrollRef}>
        {slides.map((s, i) => (
          <article key={i} className={`slide ${i === activeIndex ? 'active' : ''}`}>
            {/* watermark */}
            <div className="slide-watermark" style={{ color: `${s.color}0d` }}>
              {String(i + 1).padStart(2, '0')}
            </div>

            <div className="slide-card">
              {/* LEFT — preview */}
              <div className="card-left">
                <div className="paper-frame" style={{ '--clr': s.color, '--acc': s.accent }} onClick={() => setLightbox({ type: 'pdf', src: s.link, title: s.fullTitle })}>
                  <div className="paper-glow" />
                  <iframe
                    src={`${s.link}#view=FitH&toolbar=0`}
                    className="paper-pdf"
                    title={s.title}
                    loading="lazy"
                  />
                  <div className="paper-hover-overlay paper-click-overlay">
                    <span>View Paper</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                    </svg>
                  </div>
                </div>

                <div className="venue-pill" style={{ background: s.color }}>
                  <span className="venue-dot" />
                  {s.venue}
                </div>
              </div>

              {/* RIGHT — content */}
              <div className="card-right">
                <div className="card-icon" style={{ background: `linear-gradient(135deg, ${s.color}, ${s.accent})` }}>
                  {icons[s.icon]}
                </div>

                {s.isRanked && (
                  <div className="rank-badge">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {s.rankNote}
                  </div>
                )}

                <h2 className="card-title">{s.fullTitle}</h2>

                <div className="card-tags">
                  {s.tags.map((t, j) => (
                    <span key={j} className="tag" style={{ background: `${s.color}14`, color: s.color, borderColor: `${s.color}35` }}>
                      {t}
                    </span>
                  ))}
                </div>

                <p className="card-desc">{s.description}</p>

                <p className="card-arabic">{s.arabicDesc}</p>

                <div className="collab-row">
                  <div className="collab-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="15" height="15">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                    </svg>
                    Collaboration with
                  </div>
                  {s.collaborators.map((c, j) => (
                    <span key={j} className="collab-chip" style={{ borderColor: `${s.color}50`, color: s.color }}>
                      {c}
                    </span>
                  ))}
                </div>

                <div className="card-actions">
                  <a href={s.link} target="_blank" rel="noopener noreferrer" className="read-btn" style={{ background: `linear-gradient(135deg, ${s.color}, ${s.accent})` }}>
                    Read Paper
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                  {s.resources && s.resources.map((r, ri) => (
                    <a key={ri} href={r.url} target="_blank" rel="noopener noreferrer" className="resource-btn" style={{ borderColor: `${s.color}50`, color: s.color }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                      </svg>
                      {r.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Dots */}
      <nav className="dots">
        {slides.map((s, i) => (
          <button
            key={i}
            className={`dot ${i === activeIndex ? 'active' : ''}`}
            onClick={() => scrollTo(i)}
            style={i === activeIndex ? { background: s.color } : {}}
          >
            <span className="dot-tip">{s.title}</span>
          </button>
        ))}
      </nav>

      <div className="kb-hint">
        <kbd>&larr;</kbd> <kbd>&rarr;</kbd> or scroll
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {lightbox.type === 'video' ? (
              <video src={lightbox.src} className="lightbox-video" controls autoPlay playsInline />
            ) : lightbox.type === 'pdf' ? (
              <div className="lightbox-pdf-wrap">
                <iframe src={`${lightbox.src}#view=FitH`} className="lightbox-pdf" title={lightbox.title} />
                <a href={lightbox.src} target="_blank" rel="noopener noreferrer" className="lightbox-open-btn">
                  Open in New Tab
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              </div>
            ) : (
              <img src={lightbox.src} alt={lightbox.title} className="lightbox-img" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
