import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-card',
  imports: [CommonModule],
  template: `
    <div class="card" [class.card-elevated]="elevated">
      <div class="card-header" *ngIf="title">
        <h3 class="card-title">{{ title }}</h3>
      </div>
      <div class="card-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .card-elevated {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }

    .card-header {
      padding: 20px 24px;
      border-bottom: 1px solid #e5e7eb;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .card-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: white;
      letter-spacing: -0.02em;
    }

    .card-content {
      padding: 24px;
    }

    @media (max-width: 768px) {
      .card-header {
        padding: 16px 20px;
      }

      .card-content {
        padding: 20px;
      }

      .card-title {
        font-size: 1.125rem;
      }
    }
  `]
})
export class CardComponent {
  @Input() title?: string;
  @Input() elevated = false;
}
