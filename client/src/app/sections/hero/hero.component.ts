import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Canvas3dComponent } from '../../components/canvas-3d/canvas-3d.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, Canvas3dComponent],
  template: `
    <section id="hero" class="hero-section">
      <div class="container hero-container">
        <!-- Left Hero Content -->
        <div class="hero-content">
          <div class="hero-status-badge">
            <span class="badge-live-pulse"></span>
            <span>Junior Software Developer • ThinkerSteps Technologies</span>
          </div>

          <h1 class="hero-title">
            Engineering Scalable <br>
            <span class="gradient-text">C#, .NET &amp; SQL Server</span> Systems.
          </h1>

          <p class="hero-description">
            Software Developer specializing in 
            <strong class="text-highlight">ASP.NET Core</strong>, 
            <strong class="text-highlight">C#</strong>, 
            <strong class="text-highlight">Entity Framework Core</strong>, and 
            <strong class="text-highlight">Microsoft SQL Server</strong>, building robust RESTful APIs 
            and modern <strong class="text-highlight">Angular</strong> web applications.
          </p>

          <!-- Core Stack Badges -->
          <div class="hero-stack-chips">
            <span class="stack-chip">C#</span>
            <span class="stack-chip">ASP.NET Core</span>
            <span class="stack-chip">Entity Framework</span>
            <span class="stack-chip">Microsoft SQL Server</span>
            <span class="stack-chip">REST APIs</span>
            <span class="stack-chip">Angular 19</span>
            <span class="stack-chip">OOP Design</span>
            <span class="stack-chip">Git &amp; GitHub</span>
          </div>

          <!-- Hero Action CTAs -->
          <div class="hero-cta-group">
            <a href="#projects" class="btn-primary">
              <span>View Featured Projects</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#contact" class="btn-secondary">
              <span>Initiate Contact</span>
            </a>
          </div>

          <!-- Hero Quick Metrics -->
          <div class="hero-metrics">
            <div class="metric-item">
              <div class="metric-number">BTech'24</div>
              <div class="metric-label">Engineering Graduate</div>
            </div>
            <div class="metric-divider"></div>
            <div class="metric-item">
              <div class="metric-number">1.5+ Yrs</div>
              <div class="metric-label">Dev Experience</div>
            </div>
            <div class="metric-divider"></div>
            <div class="metric-item">
              <div class="metric-number">100%</div>
              <div class="metric-label">Code Dedication</div>
            </div>
          </div>
        </div>

        <!-- Right 3D Visual Hologram Deck -->
        <div class="hero-visual">
          <div class="canvas-card glass-panel">
            <app-canvas-3d></app-canvas-3d>
            <div class="canvas-tag">
              <span class="tag-dot"></span>
              <span>Procedural 3D Quantum Engine (Three.js)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding: 130px 0 80px 0;
      position: relative;
    }
    .hero-container {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      align-items: center;
      gap: 48px;
    }
    .hero-content {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .hero-status-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.25);
      border-radius: var(--radius-full);
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: #c7d2fe;
      width: fit-content;
    }
    .hero-title {
      font-size: clamp(2.4rem, 4.5vw, 3.8rem);
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.03em;
    }
    .hero-description {
      font-size: 1.12rem;
      color: var(--text-secondary);
      line-height: 1.7;
      max-width: 580px;
    }
    .text-highlight {
      color: #e2e8f0;
      font-weight: 600;
    }
    .hero-stack-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .stack-chip {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      padding: 4px 10px;
      border-radius: var(--radius-sm);
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-subtle);
      color: #94a3b8;
    }
    .hero-cta-group {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-top: 8px;
    }
    .hero-metrics {
      display: flex;
      align-items: center;
      gap: 28px;
      margin-top: 18px;
      padding-top: 24px;
      border-top: 1px solid var(--border-subtle);
    }
    .metric-item {
      display: flex;
      flex-direction: column;
    }
    .metric-number {
      font-family: var(--font-display);
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--text-primary);
      background: linear-gradient(135deg, #ffffff 40%, #818cf8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .metric-label {
      font-size: 0.8rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .metric-divider {
      width: 1px;
      height: 36px;
      background: var(--border-subtle);
    }
    .hero-visual {
      position: relative;
      width: 100%;
    }
    .canvas-card {
      position: relative;
      width: 100%;
      height: 520px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at center, rgba(19, 25, 41, 0.8) 0%, rgba(12, 16, 26, 0.95) 100%);
    }
    .canvas-tag {
      position: absolute;
      bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: #94a3b8;
      background: rgba(7, 9, 14, 0.75);
      border: 1px solid var(--border-subtle);
      padding: 6px 12px;
      border-radius: var(--radius-full);
      backdrop-filter: blur(8px);
    }
    .tag-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent-cyan);
      box-shadow: 0 0 6px var(--accent-cyan);
    }
    @media (max-width: 980px) {
      .hero-container {
        grid-template-columns: 1fr;
        text-align: center;
      }
      .hero-content {
        align-items: center;
      }
      .hero-description {
        margin: 0 auto;
      }
      .hero-stack-chips {
        justify-content: center;
      }
      .hero-cta-group {
        justify-content: center;
      }
      .hero-metrics {
        justify-content: center;
      }
      .canvas-card {
        height: 420px;
      }
    }
  `]
})
export class HeroComponent {}
