import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { Experience, Education } from '../../models/portfolio.models';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="experience-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header">
          <span class="section-tag">// Professional Track</span>
          <h2 class="section-title">Career Milestones &amp; Academic Credentials</h2>
          <p class="section-subtitle">
            Hands-on enterprise engineering experience in C#, ASP.NET Core, and Microsoft SQL Server, 
            backed by formal technical engineering education.
          </p>
        </div>

        <!-- Mode Toggle Tabs (Experience vs Education) -->
        <div class="track-toggle-wrap">
          <button 
            class="track-tab-btn" 
            [class.active]="activeTab === 'experience'"
            (click)="activeTab = 'experience'">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <span>Work Experience ({{ experiences.length }})</span>
          </button>

          <button 
            class="track-tab-btn" 
            [class.active]="activeTab === 'education'"
            (click)="activeTab = 'education'">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
            <span>Education &amp; Credentials ({{ educations.length }})</span>
          </button>
        </div>

        <!-- Timeline Container -->
        <div class="timeline-container">
          <div class="timeline-spine"></div>

          <!-- Work Experience Tab Content -->
          <div *ngIf="activeTab === 'experience'">
            <div *ngFor="let exp of experiences" class="timeline-item">
              <!-- Timeline Glowing Node -->
              <div class="timeline-node">
                <div class="node-pulse"></div>
              </div>

              <!-- Timeline Content Card -->
              <div class="timeline-card glass-panel">
                <div class="card-header-row">
                  <div>
                    <h3 class="role-title">{{ exp.role }}</h3>
                    <div class="company-sub">
                      <span class="company-name">{{ exp.company }}</span>
                      <span class="company-sep">•</span>
                      <span class="company-loc">{{ exp.location }}</span>
                    </div>
                  </div>
                  <div class="period-pill">
                    {{ exp.period }}
                  </div>
                </div>

                <p class="role-description">{{ exp.description }}</p>

                <!-- Key Achievements List -->
                <div class="achievements-box" *ngIf="exp.highlights">
                  <div class="achievements-heading">Core Impact &amp; Deliverables</div>
                  <ul class="achievements-list">
                    <li *ngFor="let item of getHighlights(exp.highlights)">
                      <span class="bullet-arrow">▹</span>
                      <span>{{ item }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Tech Stack Row -->
                <div class="exp-tech-row" *ngIf="exp.techStack">
                  <span class="stack-label">Technologies:</span>
                  <span class="stack-val">{{ exp.techStack }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Education Tab Content -->
          <div *ngIf="activeTab === 'education'">
            <div *ngFor="let edu of educations" class="timeline-item">
              <div class="timeline-node">
                <div class="node-pulse cyan-node"></div>
              </div>

              <div class="timeline-card glass-panel">
                <div class="card-header-row">
                  <div>
                    <h3 class="role-title">{{ edu.institution }}</h3>
                    <div class="company-sub">
                      <span class="company-name">{{ edu.degree }}</span>
                      <span class="company-sep">•</span>
                      <span class="company-loc">{{ edu.fieldOfStudy }}</span>
                    </div>
                  </div>
                  <div class="period-pill cyan-pill">
                    {{ edu.period }}
                  </div>
                </div>

                <div class="edu-grade-row" *ngIf="edu.grade">
                  <span class="grade-badge">{{ edu.grade }}</span>
                </div>

                <!-- Academic Skills Highlight -->
                <div class="achievements-box" *ngIf="edu.skills">
                  <div class="achievements-heading">Key Coursework &amp; Competencies</div>
                  <div class="edu-skills-tags">
                    <span *ngFor="let s of getSkillsList(edu.skills)" class="edu-skill-pill">
                      {{ s }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .experience-section {
      padding: 100px 0;
      position: relative;
    }
    .track-toggle-wrap {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-bottom: 48px;
    }
    .track-tab-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 12px 24px;
      border-radius: var(--radius-full);
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-size: 0.92rem;
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition-smooth);
    }
    .track-tab-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      color: var(--text-primary);
    }
    .track-tab-btn.active {
      background: linear-gradient(135deg, var(--accent-indigo), var(--accent-violet));
      color: #ffffff;
      border-color: transparent;
      box-shadow: 0 4px 20px rgba(99, 102, 241, 0.35);
    }
    .timeline-container {
      position: relative;
      max-width: 920px;
      margin: 0 auto;
      padding-left: 36px;
    }
    .timeline-spine {
      position: absolute;
      left: 10px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(180deg, var(--accent-indigo) 0%, var(--accent-cyan) 60%, transparent 100%);
    }
    .timeline-item {
      position: relative;
      margin-bottom: 36px;
    }
    .timeline-node {
      position: absolute;
      left: -36px;
      top: 24px;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .node-pulse {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--accent-indigo);
      border: 2px solid #ffffff;
      box-shadow: 0 0 12px var(--accent-indigo);
    }
    .node-pulse.cyan-node {
      background: var(--accent-cyan);
      box-shadow: 0 0 12px var(--accent-cyan);
    }
    .timeline-card {
      padding: 32px;
      border-radius: var(--radius-lg);
    }
    .card-header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 14px;
      flex-wrap: wrap;
      gap: 12px;
    }
    .role-title {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 4px;
    }
    .company-sub {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.92rem;
      color: var(--text-secondary);
    }
    .company-name {
      color: #c7d2fe;
      font-weight: 600;
    }
    .period-pill {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      padding: 5px 12px;
      background: rgba(99, 102, 241, 0.12);
      border: 1px solid rgba(99, 102, 241, 0.3);
      border-radius: var(--radius-full);
      color: #a5b4fc;
      font-weight: 600;
    }
    .period-pill.cyan-pill {
      background: rgba(6, 182, 212, 0.12);
      border-color: rgba(6, 182, 212, 0.3);
      color: #67e8f9;
    }
    .role-description {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.65;
      margin-bottom: 18px;
    }
    .achievements-box {
      background: rgba(12, 16, 26, 0.6);
      border-radius: var(--radius-md);
      padding: 16px 20px;
      margin-bottom: 18px;
      border: 1px solid var(--border-subtle);
    }
    .achievements-heading {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--accent-cyan);
      margin-bottom: 10px;
      font-weight: 600;
    }
    .achievements-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .achievements-list li {
      display: flex;
      align-items: baseline;
      gap: 8px;
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }
    .bullet-arrow {
      color: var(--accent-indigo);
      font-weight: bold;
    }
    .exp-tech-row {
      font-size: 0.82rem;
      display: flex;
      gap: 8px;
      color: var(--text-muted);
    }
    .stack-label {
      font-weight: 600;
      color: #94a3b8;
    }
    .stack-val {
      font-family: var(--font-mono);
      color: #cbd5e1;
    }
    .edu-grade-row {
      margin-bottom: 14px;
    }
    .grade-badge {
      display: inline-block;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
      color: #10b981;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 3px 10px;
      border-radius: var(--radius-sm);
    }
    .edu-skills-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .edu-skill-pill {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      padding: 4px 10px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: #94a3b8;
    }
    @media (max-width: 640px) {
      .timeline-container {
        padding-left: 28px;
      }
      .timeline-node {
        left: -28px;
      }
      .card-header-row {
        flex-direction: column;
      }
      .track-toggle-wrap {
        flex-direction: column;
      }
    }
  `]
})
export class ExperienceComponent implements OnInit {
  private portfolioService = inject(PortfolioService);

  activeTab: 'experience' | 'education' = 'experience';
  experiences: Experience[] = [];
  educations: Education[] = [];

  ngOnInit(): void {
    this.portfolioService.getPortfolioData().subscribe(data => {
      this.experiences = data.experiences;
      if (data.educations) {
        this.educations = data.educations;
      }
    });
  }

  getHighlights(str: string): string[] {
    if (!str) return [];
    return str.split('|').map(s => s.trim());
  }

  getSkillsList(str: string): string[] {
    if (!str) return [];
    return str.split(',').map(s => s.trim());
  }
}
