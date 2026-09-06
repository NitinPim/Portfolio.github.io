import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer-wrapper">
      <div class="container footer-container">
        <div class="footer-top">
          <!-- Brand Info -->
          <div class="footer-brand">
            <div class="brand-logo">
              <span class="logo-brackets">&lt;</span>
              <span class="logo-name">Nitin Pimpalkar</span>
              <span class="logo-slash">/&gt;</span>
            </div>
            <p class="brand-desc">
              Junior Software Developer &amp; ASP.NET Core Specialist based in Nagpur, India. 
              Engineering robust, copyright-safe, modern web solutions with Angular &amp; .NET Core.
            </p>
            <div class="footer-socials">
              <a href="https://github.com/NitinPim" target="_blank" rel="noopener" title="GitHub" class="social-btn">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/nitin-pimpalkar-45a401220/" target="_blank" rel="noopener" title="LinkedIn" class="social-btn">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://www.instagram.com/nitin._.30/" target="_blank" rel="noopener" title="Instagram" class="social-btn">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://twitter.com/Nitinpimpalkar6" target="_blank" rel="noopener" title="Twitter / X" class="social-btn">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
            </div>
          </div>

          <!-- Quick Navigation -->
          <div class="footer-links-col">
            <span class="footer-heading">Navigation</span>
            <div class="links-list">
              <a href="#hero" class="footer-link">Home</a>
              <a href="#about" class="footer-link">About &amp; DNA</a>
              <a href="#projects" class="footer-link">Featured Vault</a>
              <a href="#experience" class="footer-link">Trajectory</a>
              <a href="#testimonials" class="footer-link">Endorsements</a>
              <a href="#contact" class="footer-link">Connect</a>
            </div>
          </div>

          <!-- Tech Highlights -->
          <div class="footer-links-col">
            <span class="footer-heading">Architecture Stack</span>
            <div class="links-list">
              <span class="tech-pill">ASP.NET Core 10</span>
              <span class="tech-pill">Angular 19 Standalone</span>
              <span class="tech-pill">Microsoft SQL Server</span>
              <span class="tech-pill">Three.js WebGL Engine</span>
              <span class="tech-pill">Entity Framework Core</span>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="copyright-text">
            © 2026 <strong class="user-highlight">Nitin Pimpalkar</strong>. All Rights Reserved. 
            Designed and engineered from scratch.
          </div>

          <!-- Back to Top Button -->
          <button (click)="scrollToTop()" class="back-to-top" aria-label="Scroll to top">
            <span>Back to top</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-wrapper {
      padding: 70px 0 36px 0;
      border-top: 1px solid var(--border-subtle);
      background: rgba(7, 9, 14, 0.95);
      position: relative;
    }
    .footer-top {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 48px;
      margin-bottom: 50px;
    }
    .brand-logo {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 1.3rem;
      margin-bottom: 12px;
    }
    .logo-brackets, .logo-slash {
      color: var(--accent-indigo);
    }
    .brand-desc {
      color: var(--text-secondary);
      font-size: 0.92rem;
      line-height: 1.6;
      max-width: 400px;
    }
    .footer-socials {
      display: flex;
      gap: 12px;
      margin-top: 18px;
    }
    .social-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition-smooth);
    }
    .social-btn:hover {
      background: var(--accent-indigo);
      color: #ffffff;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
    }
    .footer-heading {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #a5b4fc;
      margin-bottom: 16px;
      display: block;
      font-weight: 600;
    }
    .links-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .footer-link {
      color: var(--text-secondary);
      font-size: 0.88rem;
      transition: var(--transition-snappy);
    }
    .footer-link:hover {
      color: #ffffff;
      padding-left: 4px;
    }
    .tech-pill {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-muted);
    }
    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 30px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      font-size: 0.86rem;
      color: var(--text-muted);
      flex-wrap: wrap;
      gap: 16px;
    }
    .user-highlight {
      color: #f1f5f9;
    }
    .back-to-top {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-subtle);
      padding: 7px 14px;
      border-radius: var(--radius-full);
      color: var(--text-secondary);
      font-size: 0.8rem;
      cursor: pointer;
      transition: var(--transition-smooth);
    }
    .back-to-top:hover {
      background: rgba(99, 102, 241, 0.15);
      border-color: var(--accent-indigo);
      color: #ffffff;
      transform: translateY(-2px);
    }
    @media (max-width: 860px) {
      .footer-top {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FooterComponent {
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
