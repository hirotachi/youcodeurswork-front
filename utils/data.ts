import { htmlToText } from "html-to-text";

export const userData: TUser = {
  id: 1,
  name: "John Doe",
  email: "said@exmaple.com",
  avatar: "https://avatars3.githubusercontent.com/u/1234?s=460&v=4",
  description:
    "We’re a global team of specialists, focused on crafting world-class digital solutions for today’s modern creators",
  headline: "Canada - Edmonton",
  role: "recruiter",
  site: "http://heycusp.com/",
  social_accounts: [
    "https://www.instagram.com/heycusp",
    "https://www.twitter.com/heycusp",
  ],
};

export const jobData: TJob = {
  apply_by: "email",
  apply_to: "said@gmail.com",
  category: "programming",
  company_logo:
    "https://assets.awwwards.com/awards/job/2022/05/6273f940c3a41580492120.png",
  company_name: "CUSP COLLECTIVE INC.",
  company_site: "https://heycusp.com/",
  created_at: new Date().toISOString(),
  elapsed_time: "3 months ago",
  description: `<p><strong>OUTLINE:</strong><br><br>As our new Production Coordinator, your role is to be a swiss army knife for our Producers and Project Managers; prioritizing, guiding and producing all phases of digital-related projects including scope definition, UX/UI design, development, QA testing, handoff, and delivery.&nbsp;</p><p>We are looking for someone who embodies our values of passion, curiosity, positivity, collaboration and teamwork with a track record of delivery. You thrive in a flexible, always changing environment. Successful candidates should have 2+ years experience producing digital projects, are detail oriented, and are comfortable working independently.<br></p><p>You’ll be responsible for supporting our Producers and directors on anything from website redesigns to full-scale digital marketing campaigns for our clients worldwide. We're project-based, so we're always working with someone interesting, be it large brands like Google, Sonos, and Adidas, or international artists, musicians, and other creatives. If you like making good things better you’ll fit right in.</p><p>Read on for details! We’re looking forward to meeting you. Please note, we are only accepting Canadian candidates at this time for remote work.</p><p><br></p><p><strong>ROLES &amp; RESPONSIBILITIES:</strong></p><p></p><ul><li>Own day-to-day execution of projects, supporting our Producer team in managing project scope, timelines, budget and deliverables.</li><li>Update agendas, status reports, contact reports, invoicing summaries and BCRs</li><li>Assist with resourcing, by forecasting resource requirements</li><li>Manage your time against a diverse set of tasks across multiple productions, prioritizing &amp; executing with efficiency</li><li>Learn quickly and adapt to new technology and approaches to production. Always be solution- and execution-oriented</li><li>Develop your client management skills, with the goal of making the client experience enjoyable, predictable and collaborative</li><li>Ability to easily work with everyone and act as a liaison between designers, developers, clients and vendors.</li><li>Support and contribute to internal projects, directly managing production resources as needed (marketing activities, CUSP website, CUSP merchandise, booking travel, etc)</li></ul><p><br></p><p><strong>QUALIFICATIONS:</strong></p><p></p><ul><li>2+ years project management experience (digital + web experience preferred)</li><li>Understanding of web technologies including hardware/software, deployments, networking and security</li><li>Experience with tools such as Google Analytics, Google Tag Manager, AWS</li><li>Proven communication, organizational skills and attention to detail</li><li>Canadian residency or working visa (permanent remote position)&nbsp;</li></ul><p></p><p></p><p><strong></strong></p>`,
  id: 0,
  image:
    "https://assets.awwwards.com/awards/job/2022/05/6273f940de9fc503358884.png",
  location: "canada",
  remote: false,
  tags: ["react", "node", "javascript", "frontend", "backend"],
  technologies: ["react", "node", "javascript", "mysql", "php"],
  title: "Production Coordinator",
  type: "full-time",
  user: userData,
};

export const projectData: TProject = {
  id: 1,
  created_at: new Date().toISOString(),
  creator: userData,
  description: `<p>The Orchestre Métropolitain de Montréal was founded in 1981 on a bold gamble: that the best way to promote symphonic music is by creating strong ties with the public.</p>`,
  images: [
    "https://assets.awwwards.com/awards/submissions/2022/04/6269a5f7abf3b302035520.jpg",
  ],
  likesCount: 25,
  name: "Orchestre Métropolitain",
  repo_link: "https://orchestremetropolitain.com/",
  tags: ["music", "orchestra", "symphony", "concert"],
  technologies: ["react", "node", "javascript", "mysql", "php"],
};
// remove html tags from string

export const jobDataPreview = {
  ...jobData,
  description: htmlToText(jobData.description).slice(0, 300),
} as TJobPreview;
export const userDataPreview = userData as TUserPreview;
export const projectDataPreview = {
  ...projectData,
  technologies: projectData.technologies.slice(0, 3),
} as TProjectPreview;
