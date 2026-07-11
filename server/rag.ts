import { Type, FunctionDeclaration } from '@google/genai';
import { PROJECTS, SKILLS, EXPERIENCES, EDUCATION, RESUME, PERSONAL_BIO } from '../src/data.js';

// Define the function declarations for the tools
const getProjectsDeclaration: FunctionDeclaration = {
  name: 'getProjects',
  description: "Retrieve the list of featured projects that Laurenta has engineered, including titles, full descriptions, technologies, and image URLs.",
  parameters: {
    type: Type.OBJECT,
    properties: {},
  }
};

const getSkillsDeclaration: FunctionDeclaration = {
  name: 'getSkills',
  description: "Retrieve Laurenta's technical skills grid, listing her expertise across frontend, backend, AI/ML, and dev tools along with competency levels (1-5).",
  parameters: {
    type: Type.OBJECT,
    properties: {},
  }
};

const getExperienceDeclaration: FunctionDeclaration = {
  name: 'getExperience',
  description: "Retrieve Laurenta's professional work experience, containing current and past employment details, roles, companies, and achievement logs.",
  parameters: {
    type: Type.OBJECT,
    properties: {},
  }
};

const getEducationDeclaration: FunctionDeclaration = {
  name: 'getEducation',
  description: "Retrieve Laurenta's formal academic credentials, degree, field of study, and institution.",
  parameters: {
    type: Type.OBJECT,
    properties: {},
  }
};

const getGithubDeclaration: FunctionDeclaration = {
  name: 'getGithub',
  description: "Retrieve Laurenta's official GitHub profile hyperlink.",
  parameters: {
    type: Type.OBJECT,
    properties: {},
  }
};

const getLinkedInDeclaration: FunctionDeclaration = {
  name: 'getLinkedIn',
  description: "Retrieve Laurenta's official LinkedIn profile hyperlink.",
  parameters: {
    type: Type.OBJECT,
    properties: {},
  }
};

const getResumeDeclaration: FunctionDeclaration = {
  name: 'getResume',
  description: "Retrieve Laurenta's professional resume highlights, certification list, and PDF download hyperlink.",
  parameters: {
    type: Type.OBJECT,
    properties: {},
  }
};

const getContactInformationDeclaration: FunctionDeclaration = {
  name: 'getContactInformation',
  description: "Retrieve Laurenta's direct contact channels, official email address, and general location information.",
  parameters: {
    type: Type.OBJECT,
    properties: {},
  }
};

// Map tool names to actual server data getters (RAG source of truth)
// Map tool names to actual server data getters (RAG source of truth)
export const toolHandlers: Record<string, () => any> = {
  getProjects: () => ({ projects: PROJECTS }),
  getSkills: () => ({ skills: SKILLS }),
  getExperience: () => ({ experience: EXPERIENCES }),
  getEducation: () => ({ education: EDUCATION }),
  getGithub: () => ({ githubUrl: PERSONAL_BIO.github }),
  getLinkedIn: () => ({ linkedinUrl: PERSONAL_BIO.linkedin }),
  getResume: () => ({ resume: RESUME }),
  getContactInformation: () => ({
    email: PERSONAL_BIO.email,
    location: PERSONAL_BIO.location,
    tagline: PERSONAL_BIO.tagline
  })
};

export const ALL_TOOLS = [{
  functionDeclarations: [
    getProjectsDeclaration,
    getSkillsDeclaration,
    getExperienceDeclaration,
    getEducationDeclaration,
    getGithubDeclaration,
    getLinkedInDeclaration,
    getResumeDeclaration,
    getContactInformationDeclaration
  ]
}];
