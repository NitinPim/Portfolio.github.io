import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { Testimonial } from '../../models/portfolio.models';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="testimonials" class="testimonials-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header">
          <span class="section-tag">// Peer Validations</span>
          <h2 class="section-title">Leadership &amp; Architecture Endorsements</h2>
          <p class="section-subtitle">
            What engineering leaders, architects, and collaborators say about our working dynamic.
          </p>
        </div>

        <!-- Testimonial Cards Grid -->
        <div class="testimonials-grid">
          <div *ngFor="let item of testimonials" class="testimonial-card glass-panel">
            <!-- Stars Rating -->
            <div class="stars-row">
              <span *ngFor="let star of [1,2,3,4,5]" class="star-icon">★</span>
            </div>

            <!-- Quote Text -->
            <blockquote class="quote-text">
              "{{ item.content }}"
            </blockquote>

            <!-- Author Bio Row -->
            <div class="author-row">
              <div class="avatar-initials">
                {{ item.avatarInitials }}
              </div>
              <div class="author-meta">
                <div class="author-name">{{ item.author }}</div>
                <div class="author-role">{{ item.role }} • {{ item.company }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials-section {
      padding: 100px 0;
      position: relative;
    }
    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 28px;
    }
    .testimonial-card {
      padding: 32px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-radius: var(--radius-lg);
    }
    .stars-row {
      display: flex;
      gap: 4px;
      margin-bottom: 18px;
    }
    .star-icon {
      color: #fbbf24;
      font-size: 1.15rem;
    }
    .quote-text {
      font-size: 0.96rem;
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 24px;
      font-style: italic;
    }
    .author-row {
      display: flex;
      align-items: center;
      gap: 14px;
      padding-top: 18px;
      border-top: 1px solid var(--border-subtle);
    }
    .avatar-initials {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent-indigo), var(--accent-cyan));
      color: #ffffff;
      font-weight: 700;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    }
    .author-name {
      font-size: 0.98rem;
      font-weight: 700;
      color: var(--text-primary);
    }
    .author-role {
      font-size: 0.82rem;
      color: var(--text-muted);
    }
    @media (max-width: 640px) {
      .testimonials-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class TestimonialsComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  testimonials: Testimonial[] = [];

  ngOnInit(): void {
    this.portfolioService.getPortfolioData().subscribe(data => {
      this.testimonials = data.testimonials;
    });
  }
}
