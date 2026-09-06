import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { Project } from '../../models/portfolio.models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="projects-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header">
          <span class="section-tag">// Featured Architecture</span>
          <h2 class="section-title">Production Systems &amp; Engineering Vault</h2>
          <p class="section-subtitle">
            Engineered with modern architectural paradigms: CQRS, microservices, 
            zero-trust security, real-time WebSockets, and modern Angular.
          </p>
        </div>

        <!-- Category Filters -->
        <div class="filter-pills">
          <button 
            *ngFor="let cat of categories" 
            class="filter-pill"
            [class.active]="selectedCategory === cat"
            (click)="setCategory(cat)">
            {{ cat }}
          </button>
        </div>

        <!-- Project Cards Grid -->
        <div class="projects-grid">
          <article 
            *ngFor="let project of filteredProjects" 
            class="project-card glass-panel">
            <div class="card-glow-bar"></div>
            
            <div class="card-body">
              <div class="card-meta">
                <span class="category-pill">{{ project.category }}</span>
                <span class="featured-indicator" *ngIf="project.isFeatured">Featured Architecture</span>
              </div>

              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-tagline">{{ project.tagline }}</p>
              
              <p class="project-desc">{{ project.description }}</p>

              <!-- Architecture Highlights Box -->
              <div class="arch-box" *ngIf="project.architectureNotes">
                <div class="arch-title">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  <span>System Architecture Highlight</span>
                </div>
                <p class="arch-text">{{ project.architectureNotes }}</p>
              </div>

              <!-- Tech Stack Tags -->
              <div class="tech-tags">
                <span 
                  *ngFor="let tech of getTechList(project.techStack)" 
                  class="tech-tag">
                  {{ tech }}
                </span>
              </div>

              <!-- Links / CTAs -->
              <div class="project-actions">
                <a 
                  [href]="project.githubUrl || 'https://github.com'" 
                  target="_blank" 
                  rel="noopener" 
                  class="project-link-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span>Source Code</span>
                </a>
                <a 
                  [href]="project.liveUrl || 'https://github.com'" 
                  target="_blank" 
                  rel="noopener" 
                  class="project-link-btn highlight">
                  <span>Live System</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects-section {
      padding: 100px 0;
      position: relative;
    }
    .filter-pills {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      margin-bottom: 48px;
    }
    .filter-pill {
      padding: 8px 18px;
      border-radius: var(--radius-full);
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-size: 0.88rem;
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition-smooth);
    }
    .filter-pill:hover {
      background: rgba(255, 255, 255, 0.08);
      color: var(--text-primary);
    }
    .filter-pill.active {
      background: linear-gradient(135deg, var(--accent-indigo), var(--accent-violet));
      color: #ffffff;
      border-color: transparent;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
    }
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(540px, 1fr));
      gap: 30px;
    }
    .project-card {
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      border-radius: var(--radius-lg);
    }
    .card-glow-bar {
      height: 3px;
      width: 100%;
      background: linear-gradient(90deg, var(--accent-indigo), var(--accent-cyan), var(--accent-violet));
    }
    .card-body {
      padding: 32px;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .card-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    .category-pill {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--accent-cyan);
      background: rgba(6, 182, 212, 0.1);
      border: 1px solid rgba(6, 182, 212, 0.25);
      padding: 4px 10px;
      border-radius: var(--radius-full);
      font-weight: 600;
    }
    .featured-indicator {
      font-size: 0.75rem;
      color: var(--accent-amber);
      font-weight: 600;
    }
    .project-title {
      font-size: 1.45rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 6px;
    }
    .project-tagline {
      font-size: 0.95rem;
      color: #a5b4fc;
      margin-bottom: 16px;
      font-weight: 500;
    }
    .project-desc {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.65;
      margin-bottom: 20px;
    }
    .arch-box {
      background: rgba(12, 16, 26, 0.7);
      border-left: 3px solid var(--accent-indigo);
      padding: 12px 16px;
      border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      margin-bottom: 20px;
    }
    .arch-title {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.76rem;
      font-family: var(--font-mono);
      color: #c7d2fe;
      font-weight: 600;
      margin-bottom: 4px;
      text-transform: uppercase;
    }
    .arch-text {
      font-size: 0.86rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }
    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
      margin-top: auto;
      margin-bottom: 24px;
    }
    .tech-tag {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      padding: 4px 9px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: #94a3b8;
    }
    .project-actions {
      display: flex;
      gap: 12px;
      padding-top: 18px;
      border-top: 1px solid var(--border-subtle);
    }
    .project-link-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 18px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--text-secondary);
      transition: var(--transition-smooth);
    }
    .project-link-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      color: var(--text-primary);
      border-color: rgba(255, 255, 255, 0.2);
    }
    .project-link-btn.highlight {
      background: rgba(99, 102, 241, 0.12);
      border-color: rgba(99, 102, 241, 0.3);
      color: #a5b4fc;
    }
    .project-link-btn.highlight:hover {
      background: var(--accent-indigo);
      color: #ffffff;
      border-color: transparent;
    }
    @media (max-width: 768px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProjectsComponent implements OnInit {
  private portfolioService = inject(PortfolioService);

  allProjects: Project[] = [];
  filteredProjects: Project[] = [];
  categories: string[] = ['All Systems', 'Full Stack', '.NET Core', 'Angular & UI', 'Cloud & Microservices'];
  selectedCategory = 'All Systems';

  ngOnInit(): void {
    this.portfolioService.getPortfolioData().subscribe(data => {
      this.allProjects = data.projects;
      this.filterProjects();
    });
  }

  setCategory(cat: string): void {
    this.selectedCategory = cat;
    this.filterProjects();
  }

  private filterProjects(): void {
    if (this.selectedCategory === 'All Systems') {
      this.filteredProjects = this.allProjects;
    } else {
      this.filteredProjects = this.allProjects.filter(p => p.category === this.selectedCategory);
    }
  }

  getTechList(techStackString: string): string[] {
    if (!techStackString) return [];
    return techStackString.split(',').map(s => s.trim());
  }
}
