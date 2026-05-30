A complete blueprint for amritanka.github.io — a professional senior developer portfolio built with Eleventy 3 + GitHub Pages, featuring dark/light mode, GitHub project integration, and a mature tech-focused design system.

Header & navigation preview
amritanka.dev
Home
Projects
Blog / Docs
About
Contact


5 pages — structure & content
Home
Hero — name, title, one-line value prop, CTA buttons
Skills matrix — grouped by category (Backend, Frontend, DevOps, AI)
Featured projects strip — 3 pinned cards
Latest blog posts — 2 recent articles
GitHub activity widget
Projects
Filter bar — by tech tag (Java, React, AI, etc.)
Project cards — title, description, tech badges, GitHub link, live demo link
Each project = one projects/name.md file
Auto-fetches GitHub stars & language via JS
Detail page with full description, screenshots, architecture notes

Blog / Docs
Category filters — Tutorial, Deep Dive, Opinion, AI, DevOps
Article cards — reading time, date, tags, cover image
Article layout — TOC sidebar, code highlighting, copy button
Each post = posts/slug.md with front matter
Syntax highlighting via Prism.js (Java, TS, YAML, JSON)
About
Professional photo + bio paragraph
Career timeline — role, company, year
Certifications & education section
Download CV button
Social links — GitHub, LinkedIn, X/Twitter

Contact
Contact form — name, email, message, send button
Powered by Formspree (free, no backend needed)
Direct email + LinkedIn links displayed clearly
Availability status badge — "Open to opportunities"


Technology stack
Eleventy 3
Static site generator — fast, flexible, Nunjucks templates
GitHub Pages
Free hosting — auto-deploys on every push to main
GitHub Actions
CI/CD pipeline — build → deploy on every commit
Design system — mature & professional
Dark/light mode via CSS variables and prefers-color-scheme. Inter or Geist font. Monospace accent for code snippets. Neutral palette (zinc/slate) with a single accent color (blue or indigo). No gradients, no animations — clean, readable, senior-developer tone. Inspired by Linear, Vercel, and Raycast docs.

Folder structure
amritanka.github.io/
├── _includes/layouts/   ← base.html, post.html, project.html
├── _includes/components/ ← header.html, footer.html, nav.html
├── assets/css/          ← style.css, dark.css, syntax.css
├── assets/js/           ← theme.js, filter.js, github.js
├── projects/            ← spring-boot-app.md, n8n-agent.md...
├── posts/               ← microservices-guide.md, spring-ai.md...
├── index.njk            ← Home page
├── projects.njk         ← Projects index
├── blog.njk             ← Blog/Docs index
├── about.njk            ← About page
├── contact.njk          ← Contact page
├── .eleventy.js         ← Config
└── .github/workflows/  ← gh-pages.yml

Skills — grouped for the homepage matrix
Backend / Java
Core Java
Java Advanced
Spring Boot
Spring AI
Microservices
Design Patterns
Frontend / Full-Stack
JavaScript
TypeScript
Node.js
React
AI / Automation
Gen AI
LLM
Agentic AI
Spring AI
n8n Workflow
AI Agent Creation
GitHub Copilot
Cloud / DevOps
DevOps
Azure Cloud
GitHub Actions
CI/CD

How to add a project — front matter template
--- (projects/spring-ai-assistant.md)
title: "Spring AI Assistant"
date: 2026-03-15
description: "LLM-powered chat assistant built with Spring AI and Azure OpenAI"
tags: ["Spring Boot", "Spring AI", "Azure", "LLM"]
github: "https://github.com/amritanka/spring-ai-assistant"
demo: "https://demo-url.com"
featured: true
status: "active"
---
Deployment — 6 steps to go live
1
Create GitHub repo named amritanka.github.io
Must match your username exactly. Push all project files to main branch.
2
Add .github/workflows/gh-pages.yml
Uses actions/checkout@v4, setup-node@v4 (Node 20), npm ci, npm run build, then actions/deploy-pages@v4. Source set to GitHub Actions in repo settings.
3
Set pathPrefix: "/" in .eleventy.js
Root domain — not a subdirectory. ESM config: export default async function(config)
4
Enable GitHub Pages in repo Settings → Pages
Source: GitHub Actions. This is the same setup that works for Aryan's blog.
5
Add .nojekyll file to root
Prevents GitHub Pages from running Jekyll over Eleventy's output.
6
Push → Actions builds → site live in ~90 seconds
Every future push to main auto-redeploys. Add content by creating posts/ and projects/ markdown files.

Special features worth building
Dark / light mode
Toggle stored in localStorage. CSS class .dark on <html>. All colors via CSS variables — one switch changes everything. No flash on page load.
Live GitHub data
Fetch public GitHub API at client-side load. Show real star counts, last commit date, and primary language on each project card. No API key needed for public repos.
Project / post filtering
Vanilla JS tag filter. Click a tech badge to show only matching projects or posts. No framework needed — just data-tags attributes and CSS show/hide.
Syntax highlighting
Prism.js loaded via CDN. Supports Java, TypeScript, YAML, Dockerfile, JSON. Each code block gets a copy button via small vanilla JS snippet.