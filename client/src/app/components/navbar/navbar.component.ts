import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="navbar-wrapper" [class.scrolled]="isScrolled">
      <div class="navbar-container">
        <!-- Logo -->
        <a href="#hero" class="brand-logo">
          <div class="logo-box">
            <span class="logo-brackets">&lt;</span>
            <span class="logo-name">Nitin.P</span>
            <span class="logo-slash">/&gt;</span>
          </div>
          <div class="logo-badge">
            <span class="badge-live-pulse"></span>
            <span class="badge-text">Available</span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="desktop-nav">
          <a href="#hero" class="nav-link">Home</a>
          <a href="#about" class="nav-link">About</a>
          <a href="#projects" class="nav-link">Projects</a>
          <a href="#experience" class="nav-link">Experience</a>
          <a href="#testimonials" class="nav-link">Reviews</a>
          <a href="Nitin_Pimpalkar_Resume.pdf" download="Nitin_Pimpalkar_Resume.pdf" target="_blank" class="nav-link nav-resume-btn" title="Download Nitin's Resume">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Resume</span>
          </a>
          <a href="#contact" class="nav-link nav-contact-btn">
            <span>Connect</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </nav>

        <!-- Mobile Menu Toggle Button -->
        <button class="mobile-toggle" (click)="toggleMobileMenu()" aria-label="Toggle navigation">
          <div class="hamburger" [class.active]="isMobileMenuOpen">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div class="mobile-menu" [class.open]="isMobileMenuOpen">
        <a href="#hero" (click)="closeMobileMenu()" class="mobile-link">Home</a>
        <a href="#about" (click)="closeMobileMenu()" class="mobile-link">About</a>
        <a href="#projects" (click)="closeMobileMenu()" class="mobile-link">Projects</a>
        <a href="#experience" (click)="closeMobileMenu()" class="mobile-link">Experience</a>
        <a href="#testimonials" (click)="closeMobileMenu()" class="mobile-link">Reviews</a>
        <a href="Nitin_Pimpalkar_Resume.pdf" download="Nitin_Pimpalkar_Resume.pdf" target="_blank" (click)="closeMobileMenu()" class="mobile-link mobile-resume">📄 Download Resume (PDF)</a>
        <a href="#contact" (click)="closeMobileMenu()" class="mobile-link mobile-contact">Get In Touch</a>
      </div>
    </header>
  `,
  styles: [`
    .navbar-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      padding: 18px 0;
      transition: var(--transition-smooth);
    }
    .navbar-wrapper.scrolled {
      padding: 12px 0;
      background: rgba(7, 9, 14, 0.75);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-subtle);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    .navbar-container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 1.15rem;
    }
    .logo-box {
      display: flex;
      align-items: center;
      padding: 6px 12px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
    }
    .logo-brackets, .logo-slash {
      color: var(--accent-indigo);
    }
    .logo-name {
      color: var(--text-primary);
      margin: 0 2px;
    }
    .logo-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.72rem;
      padding: 4px 10px;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: var(--radius-full);
      color: #6ee7b7;
    }
    .desktop-nav {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(16, 22, 38, 0.6);
      padding: 6px 10px;
      border-radius: var(--radius-full);
      border: 1px solid var(--border-subtle);
      backdrop-filter: blur(12px);
    }
    .nav-link {
      padding: 8px 18px;
      color: var(--text-secondary);
      font-size: 0.9rem;
      font-weight: 500;
      border-radius: var(--radius-full);
      transition: var(--transition-smooth);
    }
    .nav-link:hover {
      color: var(--text-primary);
      background: rgba(255, 255, 255, 0.06);
    }
    .nav-contact-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      background: linear-gradient(135deg, var(--accent-indigo), var(--accent-violet));
      color: #ffffff !important;
      font-weight: 600;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);
    }
    .nav-contact-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
    }
    .nav-resume-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.4);
      color: #34d399 !important;
      font-weight: 600;
    }
    .nav-resume-btn:hover {
      background: rgba(16, 185, 129, 0.22);
      border-color: #34d399;
      color: #ffffff !important;
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
    }
    .mobile-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
    }
    .hamburger {
      width: 24px;
      height: 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .hamburger span {
      display: block;
      height: 2px;
      width: 100%;
      background: var(--text-primary);
      border-radius: 2px;
      transition: var(--transition-snappy);
    }
    .hamburger.active span:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    .hamburger.active span:nth-child(2) {
      opacity: 0;
    }
    .hamburger.active span:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
    .mobile-menu {
      display: none;
      flex-direction: column;
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-subtle);
      padding: 20px 24px;
      gap: 14px;
    }
    .mobile-menu.open {
      display: flex;
    }
    .mobile-link {
      font-size: 1rem;
      color: var(--text-secondary);
      padding: 8px 0;
    }
    .mobile-link:hover {
      color: var(--text-primary);
    }
    .mobile-resume {
      color: #34d399;
      font-weight: 600;
    }
    .mobile-contact {
      color: var(--accent-indigo);
      font-weight: 600;
    }
    @media (max-width: 860px) {
      .desktop-nav {
        display: none;
      }
      .mobile-toggle {
        display: block;
      }
    }
  `]
})
export class NavbarComponent {
  isScrolled = false;
  isMobileMenuOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 40;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
