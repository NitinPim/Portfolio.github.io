import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="about-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header">
          <span class="section-tag">// Engineering DNA</span>
          <h2 class="section-title">Architectural Mastery &amp; Expertise</h2>
          <p class="section-subtitle">
            A look under the hood: bridging high-performance distributed backend architectures 
            with pixel-perfect reactive client experiences.
          </p>
        </div>

        <!-- Bento Grid Layout -->
        <div class="bento-grid">
          <!-- Bento Card 1: Core Philosophy -->
          <div class="bento-card bento-hero glass-panel">
            <div class="bento-inner">
              <div class="card-icon-badge">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 class="bento-title">Full-Lifecycle Engineering</h3>
              <p class="bento-text">
                I design and build enterprise-grade software from initial domain-driven modeling to 
                high-availability cloud deployment. My development process emphasizes clean separation 
                of concerns, high-performance database querying, and reactive state management.
              </p>
              <div class="bento-code-snippet">
                <div class="snippet-header">
                  <span class="snippet-dot red"></span>
                  <span class="snippet-dot yellow"></span>
                  <span class="snippet-dot green"></span>
                  <span class="snippet-file">Architecture.cs</span>
                </div>
                <pre><code>public record Result&lt;T&gt;(bool IsSuccess, T? Value, string? Error);
// Domain-Driven, Clean Architecture, CQRS, Zero Compromise.</code></pre>
              </div>
            </div>
          </div>

          <!-- Bento Card 2: Core Stack Orbit -->
          <div class="bento-card bento-skills glass-panel">
            <div class="bento-inner">
              <div class="card-icon-badge purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <h3 class="bento-title">Technical Competency Matrix</h3>
              <div class="skills-cluster">
                <div class="skill-category">
                  <span class="cat-label">Backend &amp; API</span>
                  <div class="cat-tags">
                    <span class="tag-badge">.NET 10 / 8</span>
                    <span class="tag-badge">ASP.NET Core</span>
                    <span class="tag-badge">C# 13</span>
                    <span class="tag-badge">EF Core</span>
                    <span class="tag-badge">REST / GraphQL</span>
                  </div>
                </div>
                <div class="skill-category">
                  <span class="cat-label">Frontend &amp; UI</span>
                  <div class="cat-tags">
                    <span class="tag-badge">Angular 19</span>
                    <span class="tag-badge">TypeScript</span>
                    <span class="tag-badge">RxJS / Signals</span>
                    <span class="tag-badge">Three.js</span>
                    <span class="tag-badge">Tailwind / CSS3</span>
                  </div>
                </div>
                <div class="skill-category">
                  <span class="cat-label">Data &amp; Cloud</span>
                  <div class="cat-tags">
                    <span class="tag-badge">MS SQL Server</span>
                    <span class="tag-badge">Redis Caching</span>
                    <span class="tag-badge">Docker</span>
                    <span class="tag-badge">Azure Cloud</span>
                    <span class="tag-badge">CI/CD Pipelines</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bento Card 3: Global Collaboration -->
          <div class="bento-card bento-geo glass-panel">
            <div class="bento-inner">
              <div class="card-icon-badge cyan">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <h3 class="bento-title">Global Availability</h3>
              <p class="bento-text">
                Flexible across US, European, and Asian time zones with asynchronous agility 
                and rigorous documentation practices.
              </p>
              <div class="geo-status-pill">
                <span class="badge-live-pulse"></span>
                <span>Active &amp; Ready for Deployment</span>
              </div>
            </div>
          </div>

          <!-- Bento Card 4: Quick Copy Action Card -->
          <div class="bento-card bento-connect glass-panel">
            <div class="bento-inner center-text">
              <div class="card-icon-badge green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <h3 class="bento-title">Let's Build Together</h3>
              <p class="bento-text">Have a challenging architectural problem or project in mind?</p>
              
              <div class="bento-actions">
                <button class="copy-email-btn" (click)="copyEmail()">
                  <span *ngIf="!isCopied">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <span>Copy Primary Email</span>
                  </span>
                  <span *ngIf="isCopied" class="copied-feedback">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Copied to Clipboard!</span>
                  </span>
                </button>

                <a href="Nitin_Pimpalkar_Resume.pdf" download="Nitin_Pimpalkar_Resume.pdf" target="_blank" class="download-resume-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span>Download Resume (PDF)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-section {
      padding: 100px 0;
      position: relative;
    }
    .bento-grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 24px;
    }
    .bento-card {
      padding: 32px;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .bento-hero {
      grid-column: span 7;
    }
    .bento-skills {
      grid-column: span 5;
    }
    .bento-geo {
      grid-column: span 6;
    }
    .bento-connect {
      grid-column: span 6;
    }
    .card-icon-badge {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-md);
      background: rgba(99, 102, 241, 0.12);
      border: 1px solid rgba(99, 102, 241, 0.3);
      color: var(--accent-indigo);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }
    .card-icon-badge.purple {
      background: rgba(139, 92, 246, 0.12);
      border-color: rgba(139, 92, 246, 0.3);
      color: var(--accent-violet);
    }
    .card-icon-badge.cyan {
      background: rgba(6, 182, 212, 0.12);
      border-color: rgba(6, 182, 212, 0.3);
      color: var(--accent-cyan);
    }
    .card-icon-badge.green {
      background: rgba(16, 185, 129, 0.12);
      border-color: rgba(16, 185, 129, 0.3);
      color: var(--accent-emerald);
    }
    .bento-title {
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 12px;
      color: var(--text-primary);
    }
    .bento-text {
      color: var(--text-secondary);
      font-size: 0.96rem;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .bento-code-snippet {
      background: rgba(7, 9, 14, 0.85);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 14px 18px;
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: #a5b4fc;
      overflow-x: auto;
    }
    .snippet-header {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    .snippet-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .snippet-dot.red { background: #ef4444; }
    .snippet-dot.yellow { background: #f59e0b; }
    .snippet-dot.green { background: #10b981; }
    .snippet-file {
      margin-left: 8px;
      font-size: 0.72rem;
      color: var(--text-muted);
    }
    .skills-cluster {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .skill-category {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .cat-label {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #a5b4fc;
    }
    .cat-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .tag-badge {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      padding: 4px 9px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: var(--text-secondary);
    }
    .geo-status-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 8px 16px;
      background: rgba(6, 182, 212, 0.1);
      border: 1px solid rgba(6, 182, 212, 0.3);
      border-radius: var(--radius-full);
      font-size: 0.84rem;
      color: #67e8f9;
      font-weight: 500;
    }
    .center-text {
      text-align: center;
      align-items: center;
      display: flex;
      flex-direction: column;
    }
    .bento-actions {
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
      margin-top: 12px;
      width: 100%;
    }
    .copy-email-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 12px 24px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: var(--transition-smooth);
      width: 100%;
      max-width: 260px;
    }
    .copy-email-btn:hover {
      background: rgba(99, 102, 241, 0.15);
      border-color: var(--accent-indigo);
      transform: translateY(-2px);
    }
    .download-resume-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 11px 20px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.4);
      border-radius: var(--radius-md);
      color: #34d399;
      font-weight: 600;
      font-size: 0.88rem;
      text-decoration: none;
      transition: var(--transition-smooth);
      width: 100%;
      max-width: 260px;
    }
    .download-resume-btn:hover {
      background: rgba(16, 185, 129, 0.22);
      border-color: #34d399;
      color: #ffffff;
      transform: translateY(-2px);
      box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
    }
    .copied-feedback {
      color: var(--accent-emerald);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    @media (max-width: 960px) {
      .bento-hero, .bento-skills, .bento-geo, .bento-connect {
        grid-column: span 12;
      }
    }
  `]
})
export class AboutComponent {
  isCopied = false;

  copyEmail(): void {
    const email = 'nitinpimpalkar17@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 3000);
    });
  }
}
