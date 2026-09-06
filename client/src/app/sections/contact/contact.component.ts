import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { ContactRequest } from '../../models/portfolio.models';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="contact-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header">
          <span class="section-tag">// Communications Hub</span>
          <h2 class="section-title">Initiate Transmission &amp; Collaboration</h2>
          <p class="section-subtitle">
            Whether you have a strategic architectural challenge, project inquiry, or leadership role, 
            reach out directly.
          </p>
        </div>

        <div class="contact-grid">
          <!-- Left Column: Direct Info -->
          <div class="contact-info glass-panel">
            <h3 class="info-title">Direct Connection Points</h3>
            <p class="info-desc">
              Messages submitted here are dispatched directly to the 
              <strong>.NET 10 Web API</strong> and securely stored in 
              <strong>Microsoft SQL Server</strong>.
            </p>

            <div class="channel-list">
              <div class="channel-item">
                <div class="channel-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <div class="channel-label">Direct Email</div>
                  <a href="mailto:nitinpimpalkar17@gmail.com" class="channel-val">nitinpimpalkar17&#64;gmail.com</a>
                </div>
              </div>

              <div class="channel-item">
                <div class="channel-icon" style="background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.3); color: #34d399;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <div class="channel-label">Phone &amp; WhatsApp</div>
                  <a href="tel:+918357093103" class="channel-val">+91 8357093103</a>
                </div>
              </div>

              <div class="channel-item">
                <div class="channel-icon cyan">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <div class="channel-label">Location &amp; Availability</div>
                  <div class="channel-val">Butibori, Nagpur, India - 441108 • Remote Worldwide</div>
                </div>
              </div>

              <div class="channel-item">
                <div class="channel-icon purple">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                <div>
                  <div class="channel-label">LinkedIn Profile</div>
                  <a href="https://www.linkedin.com/in/nitin-pimpalkar-45a401220/" target="_blank" rel="noopener" class="channel-val">linkedin.com/in/nitin-pimpalkar</a>
                </div>
              </div>

              <div class="channel-item">
                <div class="channel-icon" style="background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); color: #f8fafc;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </div>
                <div>
                  <div class="channel-label">GitHub Repositories</div>
                  <a href="https://github.com/NitinPim" target="_blank" rel="noopener" class="channel-val">github.com/NitinPim</a>
                </div>
              </div>
            </div>

            <!-- Terminal Status Card -->
            <div class="api-status-box">
              <div class="status-header">
                <span class="status-dot"></span>
                <span>.NET 10 API &amp; MS SQL Server Database</span>
              </div>
              <p class="status-sub">Ready to persist message records to DB.</p>
            </div>
          </div>

          <!-- Right Column: Interactive Contact Form -->
          <div class="contact-form-card glass-panel">
            <form (ngSubmit)="onSubmit()" #contactForm="ngForm" class="form-container">
              <!-- Success Notification Alert -->
              <div *ngIf="successMessage" class="alert success-alert">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>{{ successMessage }}</span>
              </div>

              <!-- Error Notification Alert -->
              <div *ngIf="errorMessage" class="alert error-alert">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{{ errorMessage }}</span>
              </div>

              <!-- Name Field -->
              <div class="form-group">
                <label for="name" class="form-label">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  [(ngModel)]="formData.name" 
                  required 
                  placeholder="e.g. Alex Morgan"
                  class="form-input">
              </div>

              <!-- Email Field -->
              <div class="form-group">
                <label for="email" class="form-label">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  [(ngModel)]="formData.email" 
                  required 
                  placeholder="alex@company.com"
                  class="form-input">
              </div>

              <!-- Subject Field -->
              <div class="form-group">
                <label for="subject" class="form-label">Subject / Purpose</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  [(ngModel)]="formData.subject" 
                  placeholder="e.g. Architecture Consultation / Enterprise Role"
                  class="form-input">
              </div>

              <!-- Message Field -->
              <div class="form-group">
                <label for="message" class="form-label">Message Details</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4" 
                  [(ngModel)]="formData.message" 
                  required 
                  placeholder="Describe your technical requirements, goals, or role..."
                  class="form-input form-textarea"></textarea>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit" 
                [disabled]="isSubmitting || !formData.name || !formData.email || !formData.message"
                class="btn-primary submit-btn">
                <span *ngIf="!isSubmitting">Transmit Message</span>
                <span *ngIf="isSubmitting">Dispatching to SQL Server...</span>
                <svg *ngIf="!isSubmitting" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      padding: 100px 0;
      position: relative;
    }
    .contact-grid {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      gap: 36px;
      align-items: start;
    }
    .contact-info {
      padding: 36px;
      display: flex;
      flex-direction: column;
      border-radius: var(--radius-lg);
    }
    .info-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 12px;
    }
    .info-desc {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.65;
      margin-bottom: 28px;
    }
    .channel-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 32px;
    }
    .channel-item {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .channel-icon {
      width: 44px;
      height: 44px;
      border-radius: var(--radius-md);
      background: rgba(99, 102, 241, 0.12);
      border: 1px solid rgba(99, 102, 241, 0.3);
      color: var(--accent-indigo);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .channel-icon.cyan {
      background: rgba(6, 182, 212, 0.12);
      border-color: rgba(6, 182, 212, 0.3);
      color: var(--accent-cyan);
    }
    .channel-icon.purple {
      background: rgba(139, 92, 246, 0.12);
      border-color: rgba(139, 92, 246, 0.3);
      color: var(--accent-violet);
    }
    .channel-label {
      font-size: 0.76rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-family: var(--font-mono);
    }
    .channel-val {
      font-size: 0.95rem;
      color: var(--text-primary);
      font-weight: 500;
    }
    .channel-val:hover {
      color: var(--accent-indigo);
    }
    .api-status-box {
      background: rgba(12, 16, 26, 0.8);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 16px;
    }
    .status-header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: #6ee7b7;
      margin-bottom: 4px;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent-emerald);
      box-shadow: 0 0 8px var(--accent-emerald);
    }
    .status-sub {
      font-size: 0.82rem;
      color: var(--text-muted);
    }
    .contact-form-card {
      padding: 36px;
      border-radius: var(--radius-lg);
    }
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .alert {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 18px;
      border-radius: var(--radius-md);
      font-size: 0.9rem;
      line-height: 1.4;
    }
    .success-alert {
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.4);
      color: #6ee7b7;
    }
    .error-alert {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #fca5a5;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .form-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #cbd5e1;
    }
    .form-input {
      width: 100%;
      padding: 13px 16px;
      background: rgba(7, 9, 14, 0.75);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-size: 0.95rem;
      transition: var(--transition-smooth);
      outline: none;
    }
    .form-input:focus {
      border-color: var(--accent-indigo);
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.25);
    }
    .form-textarea {
      resize: vertical;
      min-height: 110px;
    }
    .submit-btn {
      width: 100%;
      padding: 14px;
      margin-top: 8px;
    }
    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
    }
    @media (max-width: 860px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactComponent {
  private portfolioService = inject(PortfolioService);

  formData: ContactRequest = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  onSubmit(): void {
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.portfolioService.submitContact(this.formData).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        if (res.success) {
          this.successMessage = res.message;
          this.formData = { name: '', email: '', subject: '', message: '' };
        } else {
          this.errorMessage = res.message || 'Something went wrong. Please try again.';
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = 'Could not connect to API server. Please try again later.';
      }
    });
  }
}
