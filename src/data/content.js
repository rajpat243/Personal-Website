// Single source of truth for site content. Pages read from here so copy
// changes never require touching layout/animation code.

import uconnImg from '../assets/img/uconn.png'
import planeImg from '../assets/img/plane.png'
import clothesImg from '../assets/img/clothes.png'
import owlImg from '../assets/img/Owl.png'

export const profile = {
  name: 'Raj Patel',
  location: 'Hartford, CT',
  headline: 'Data Engineer @ Travelers',
  tagline:
    'Data Engineer building ETL/ELT pipelines and bringing AI into enterprise analytics.',
  // Rotating words shown in the home hero.
  roles: [
    'Data Engineering',
    'Software Development',
    'Artificial Intelligence',
    'Forward Deployed',
    'Machine Learning',
  ],
}

export const about = {
  summary:
    "B.S. in Computer Science (concentration in Software Engineering & Development) from the University of Connecticut. Data Engineer at Travelers, designing data pipelines that power business analytics and integrating AI into enterprise applications. Comfortable across the stack — from ETL/ELT and data architecture to backend services and machine learning — with a strong foundation in software development and testing. I also work hands-on with LLMs and am deeply interested in the entire AI space — it's where I'm most excited to keep learning and growing.",
}

export const skills = [
  {
    category: 'Programming',
    items: [
      'Python (Pandas, NumPy, Matplotlib)',
      'SQL (MySQL, PostgreSQL)',
      'NoSQL (MongoDB)',
      'JavaScript / TypeScript',
      'C++',
      'HTML / CSS',
    ],
  },
  {
    category: 'Frameworks & Libraries',
    items: ['dbt', 'Spark', 'React.js', 'Node.js', 'Flask', 'REST APIs', 'Pytest', 'JUnit', 'Qlik Sense'],
  },
  {
    category: 'Cloud & Tools',
    items: [
      'AWS (Glue, Lambda, S3, EC2, Bedrock)',
      'Snowflake',
      'Databricks',
      'Azure AD',
      'Docker',
      'CI/CD',
      'Git / GitHub / GitLab',
      'VS Code',
      'Postman',
    ],
  },
  {
    category: 'Methodologies',
    items: [
      'ETL/ELT pipeline design',
      'Data architecture',
      'System design',
      'OOP',
      'SDLC',
      'Agile',
      'Scrum',
      'Kanban',
    ],
  },
]

export const experience = [
  {
    role: 'Data Engineer',
    company: 'Travelers Insurance',
    location: 'Hartford, CT',
    period: 'Jun 2025 – Present',
    current: true,
    points: [
      'Designed and maintained ETL/ELT pipelines with dbt to ingest and transform data into Qlik Sense applications, enabling business partners to rapidly onboard new features and data sources.',
      'Built and deployed a Model Context Protocol (MCP) server integrating Claude AI into Qlik Sense applications, enabling natural-language querying of enterprise data assets and accelerating analyst workflows.',
      'Collaborated with business stakeholders to define data requirements, translate them into data models, and deliver scalable data architecture aligned with governance and security policies.',
      'Developed and optimized pipelines supporting real-time analytics dashboards, improving data freshness and reliability for downstream Qlik Sense consumers.',
    ],
  },
  {
    role: 'Embedded Software Engineering Intern',
    company: 'General Dynamics Electric Boat',
    location: 'Groton, CT',
    period: 'Jun 2024 – Jan 2025',
    points: [
      'Developed and tested C++ utilities to validate embedded system functionality, applying structured unit test plans to ensure data accuracy, reliability, and compliance with system requirements.',
      'Conducted data-driven analysis of test results using Python and SQL, identifying performance gaps and delivering insights that improved system stability prior to integration.',
      'Collaborated in an Agile environment using Git, JIRA, and Confluence for version control and reproducible test documentation.',
    ],
  },
  {
    role: 'Construction Seva Volunteer',
    company: 'BAPS Swaminarayan Akshardham',
    location: 'Robbinsville, NJ',
    period: 'May 2023 – Aug 2023',
    points: [
      'Took a deliberate pause from my career to dedicate the summer to seva (selfless volunteer service) — joining the effort to complete the mandir and help fulfill the wish of my guru, His Holiness Mahant Swami Maharaj, on a project far bigger than myself.',
      'Joined more than 12,500 volunteers from around the world who built BAPS Swaminarayan Akshardham — the largest Hindu mandir in the United States and the largest Hindu temple outside India in the modern era — across its 183-acre campus.',
      'Assisted in stone placing during construction, helping assemble a structure built from roughly two million cubic feet of hand-carved stone.',
      'Supported landscaping and irrigation across the grounds, helping ready the 183-acre site ahead of its grand inauguration in October 2023.',
    ],
  },
  {
    role: 'End User IT Intern',
    company: 'iConnect',
    location: 'Remote',
    period: 'May 2022 – Aug 2022',
    points: [
      'Assisted in the successful migration of OSU Wexner Medical Center user data to the Azure cloud.',
    ],
  },
]

export const education = {
  school: 'University of Connecticut — Storrs',
  degree: 'B.S. Computer Science, Concentration in Software Engineering & Development',
  date: 'May 2025',
  gpa: '3.70 / 4.00',
  coursework: [
    'Artificial Intelligence',
    'Data Structures & Algorithms',
    'Object-Oriented Programming',
    'Principles of Databases',
    'Cloud Computing',
    'Mobile Application Development',
  ],
  activities: [
    'Youth Coordinator, BAPS Swaminarayan Sanstha — organize and lead activities that empower young adults to deepen their understanding of religion, Hindu culture, and values.',
    'Active volunteer-leader with BAPS Charities — help lead the annual community Walkathon, mobilizing volunteers to raise funds and awareness for local nonprofits, and help facilitate ongoing service events including health fairs, blood drives, food and clothing drives, and environmental cleanups.',
  ],
}

export const certifications = [
  { name: 'AWS Certified Developer – Associate', issued: 'May 2026' },
  { name: 'AWS Certified Data Engineer – Associate', issued: 'May 2026' },
  { name: 'AWS Certified AI Practitioner', issued: 'Jan 2026' },
  { name: 'AWS Certified Cloud Practitioner', issued: 'Nov 2025' },
]

export const projects = [
  {
    title: 'AI-Powered Onboarding Assistant',
    context: 'Hackathon · Sept 2025',
    image: null,
    points: [
      'Built an AI onboarding platform that uses prior employee data to recommend role-appropriate permissions and SailPoint identity groups, reducing manual provisioning overhead.',
      "Trained an AWS Bedrock Agent Core agent on synthetic employee and permissions data for natural-language Q&A, surfacing accurate access policies for new hires and team-switchers without IT escalation.",
      "Integrated structured data pipelines to ingest, process, and query employee identity records as the agent's knowledge base.",
    ],
    tech: ['AWS Bedrock Agent Core', 'Python', 'REST APIs', 'Data Pipelines'],
    github: null,
  },
  {
    title: 'Real-Time Shark Tracking & Classification System',
    context: 'Aug 2024 – May 2025 · UConn Senior Design',
    image: owlImg,
    points: [
      "Engineered real-time data pipelines using the ClusterDuck Protocol to transmit maritime sensor/movement data into OWL's cloud-based Data Management System.",
      'Built and trained a CNN classifier (sharks vs. non-shark aquatic animals) achieving 85% accuracy on shark images and 80% overall.',
      'Optimized the inference pipeline for edge deployment on the Coral Dev Board for real-time on-device classification.',
    ],
    tech: ['Python', 'TensorFlow', 'CNN', 'TensorFlow Lite', 'Coral Dev Board', 'ClusterDuck Protocol'],
    github: 'https://github.com/rajpat243/visual-shark-tracking',
  },
  {
    title: 'The Clothes Exchange',
    context: 'Jun 2025 – Jul 2025',
    image: clothesImg,
    points: [
      'MERN-stack online clothing store: browse, cart, user login, and secure Stripe checkout, with a K-Nearest Neighbors (KNN) model recommending similar products by price, description, and type.',
    ],
    tech: ['MERN Stack', 'KNN', 'Stripe'],
    github: 'https://github.com/rajpat243/Online-Clothes-Store',
  },
  {
    title: 'Airline Reservation System',
    context: 'Mar 2024 – May 2024 · UConn',
    image: planeImg,
    points: [
      'Airline reservation system to add/search flights and find itineraries between airports filtered by lowest cost, earliest arrival, shortest flight time, and most comfort.',
    ],
    tech: ['C++', 'UI'],
    github: 'https://github.com/rajpat243/Airline-Reservation-system',
  },
  {
    title: 'College Course Registration Clone',
    context: 'Sep 2023 – Dec 2023 · UConn',
    image: uconnImg,
    points: [
      'Course registration site with a Vue.js frontend and an AWS backend (Lambda + DynamoDB) connected via a REST API for responsive, scalable data storage and retrieval.',
    ],
    tech: ['Vue.js', 'AWS Lambda', 'DynamoDB', 'REST API'],
    github: 'https://github.com/rajpat243/College-registration-clone',
  },
]

export const contact = {
  email: 'rajpat243@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rajpat243/',
  github: 'https://github.com/rajpat243',
  resume: `${import.meta.env.BASE_URL}Data_Resume.pdf`,
}

export const stats = [
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 5, suffix: '', label: 'Featured Projects' },
  { value: 4, suffix: '', label: 'AWS Certifications' },
  { value: 8, suffix: '+', label: 'Languages & Tools' },
]
