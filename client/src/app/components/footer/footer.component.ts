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
              <a href="https://github.com/NitinPim" target="_blank" rel="noopener" title="GitHub" class="social-btn social-github">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/nitin-pimpalkar-45a401220/" target="_blank" rel="noopener" title="LinkedIn" class="social-btn social-linkedin">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://www.instagram.com/nitin._.30/" target="_blank" rel="noopener" title="Instagram" class="social-btn social-instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://twitter.com/Nitinpimpalkar6" target="_blank" rel="noopener" title="Twitter / X" class="social-btn social-twitter">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/></svg>
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
              <a href="Nitin_Pimpalkar_Resume.pdf" download="Nitin_Pimpalkar_Resume.pdf" target="_blank" class="footer-link resume-highlight-link">Download Resume (PDF) 📄</a>
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
      width: 38px;
      height: 38px;
      border-radius: 50%;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
      text-decoration: none;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
      position: relative;
      overflow: hidden;
    }
    /* Authentic GitHub Colors */
    .social-github {
      background: #24292e;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .social-github:hover {
      background: #0d1117;
      border-color: #ffffff;
      transform: translateY(-3px) scale(1.1);
      box-shadow: 0 8px 20px rgba(255, 255, 255, 0.25);
    }
    /* Authentic LinkedIn Blue */
    .social-linkedin {
      background: #0a66c2;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .social-linkedin:hover {
      background: #004182;
      border-color: #70b5f9;
      transform: translateY(-3px) scale(1.1);
      box-shadow: 0 8px 22px rgba(10, 102, 194, 0.65);
    }
    /* Authentic Instagram Gradient */
    .social-instagram {
      background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
      border: 1px solid rgba(255, 255, 255, 0.25);
    }
    .social-instagram:hover {
      transform: translateY(-3px) scale(1.1);
      box-shadow: 0 8px 24px rgba(220, 39, 67, 0.7);
      filter: brightness(1.12);
    }
    /* Authentic Twitter / X Blue */
    .social-twitter {
      background: #1da1f2;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .social-twitter:hover {
      background: #0c85d0;
      border-color: #8ed0f8;
      transform: translateY(-3px) scale(1.1);
      box-shadow: 0 8px 22px rgba(29, 161, 242, 0.65);
    }
    .resume-highlight-link {
      color: #6ee7b7 !important;
      font-weight: 600;
    }
    .resume-highlight-link:hover {
      color: #a7f3d0 !important;
      text-decoration: underline;
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
