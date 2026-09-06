import { Component, ElementRef, ViewChild, inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Floating Chat Trigger Button -->
    <div class="chatbot-trigger-wrap" *ngIf="!isOpen">
      <button class="chatbot-fab" (click)="toggleChat()" aria-label="Open AI Assistant">
        <div class="fab-pulse"></div>
        <svg class="fab-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span class="fab-badge">AI</span>
      </button>
      <div class="fab-tooltip">Ask Nitin's AI Assistant</div>
    </div>

    <!-- Interactive Chat Window Modal -->
    <div class="chat-window glass-panel" [class.active]="isOpen" [class.maximized]="isMaximized">
      <!-- Header -->
      <div class="chat-header">
        <div class="chat-header-info">
          <div class="bot-avatar">
            <img src="nitinphoto.jpg" alt="Nitin Pimpalkar" class="bot-avatar-img">
            <span class="avatar-status"></span>
          </div>
          <div>
            <div class="bot-name">Nitin's Portfolio Assistant</div>
            <div class="bot-status">Powered by .NET 10 API • Online</div>
          </div>
        </div>
        <div class="chat-header-actions">
          <button class="chat-header-btn" (click)="toggleMaximize()" [title]="isMaximized ? 'Restore normal size' : 'Maximize chat'" [attr.aria-label]="isMaximized ? 'Restore size' : 'Maximize chat'">
            <svg *ngIf="!isMaximized" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
            <svg *ngIf="isMaximized" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <polyline points="4 14 10 14 10 20"></polyline>
              <polyline points="20 10 14 10 14 4"></polyline>
              <line x1="14" y1="10" x2="21" y2="3"></line>
              <line x1="10" y1="14" x2="3" y2="21"></line>
            </svg>
          </button>
          <button class="chat-header-btn" (click)="toggleChat()" aria-label="Close Chat" title="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- Messages Body Area -->
      <div class="chat-body" #scrollContainer>
        <div *ngFor="let msg of messages" class="message-row" [class.user-row]="msg.sender === 'user'">
          <div class="message-bubble" [class.user-bubble]="msg.sender === 'user'">
            <div class="message-text" [innerHTML]="formatMessage(msg.text)"></div>
            <div class="message-time">{{ msg.timestamp }}</div>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div *ngIf="isTyping" class="message-row">
          <div class="message-bubble typing-bubble">
            <div class="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Suggestion Chips -->
      <div class="suggestions-container" *ngIf="suggestedQuestions.length > 0">
        <div class="suggestions-label">Quick Suggestions:</div>
        <div class="suggestions-scroll">
          <button 
            *ngFor="let q of suggestedQuestions" 
            class="suggestion-chip"
            [disabled]="isTyping"
            (click)="selectQuestion(q)">
            {{ q }}
          </button>
        </div>
      </div>

      <!-- Input Bar -->
      <div class="chat-input-area">
        <input 
          type="text" 
          [(ngModel)]="userInput" 
          (keyup.enter)="sendMessage()"
          [disabled]="isTyping"
          [placeholder]="isTyping ? 'Assistant is answering...' : 'Ask about skills, experience, projects...'"
          class="chat-input"
          #inputBox>
        <button 
          class="chat-send-btn" 
          [disabled]="!userInput.trim() || isTyping"
          (click)="sendMessage()" 
          aria-label="Send Message">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .chatbot-trigger-wrap {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .chatbot-fab {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent-indigo) 0%, var(--accent-cyan) 100%);
      color: #ffffff;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      box-shadow: 0 8px 25px rgba(99, 102, 241, 0.45);
      transition: var(--transition-smooth);
    }
    .chatbot-fab:hover {
      transform: scale(1.08) translateY(-2px);
      box-shadow: 0 12px 32px rgba(99, 102, 241, 0.6);
    }
    .fab-pulse {
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 2px solid var(--accent-cyan);
      opacity: 0.6;
      animation: pulse-ring 2.5s infinite;
      pointer-events: none;
    }
    .fab-badge {
      position: absolute;
      top: -2px;
      right: -2px;
      background: #10b981;
      color: #ffffff;
      font-size: 0.68rem;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 999px;
      border: 2px solid #07090e;
    }
    .fab-tooltip {
      background: rgba(16, 22, 38, 0.9);
      backdrop-filter: blur(10px);
      border: 1px solid var(--border-subtle);
      color: #f1f5f9;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: var(--radius-full);
      box-shadow: 0 4px 15px rgba(0,0,0,0.4);
      pointer-events: none;
      animation: fade-in 0.3s ease;
    }
    .chat-window {
      position: fixed;
      bottom: 28px;
      right: 28px;
      width: 420px;
      max-width: calc(100vw - 32px);
      height: 580px;
      max-height: calc(100vh - 60px);
      z-index: 1001;
      display: none;
      flex-direction: column;
      border-radius: var(--radius-xl);
      overflow: hidden;
      border: 1px solid rgba(99, 102, 241, 0.3);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), var(--shadow-glow);
      animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      transition: width 0.25s ease, height 0.25s ease;
    }
    .chat-window.active {
      display: flex;
    }
    .chat-window.maximized {
      width: 760px;
      height: min(780px, calc(100vh - 50px));
      max-width: calc(100vw - 40px);
    }
    .chat-header {
      padding: 16px 20px;
      background: rgba(12, 16, 26, 0.95);
      border-bottom: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .chat-header-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .bot-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent-indigo), var(--accent-violet));
      color: #ffffff;
      font-weight: 800;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .bot-avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
    .avatar-status {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 10px;
      height: 10px;
      background: #10b981;
      border-radius: 50%;
      border: 2px solid #0c101a;
    }
    .bot-name {
      font-size: 0.92rem;
      font-weight: 700;
      color: #ffffff;
    }
    .bot-status {
      font-size: 0.72rem;
      color: #6ee7b7;
      font-family: var(--font-mono);
    }
    .chat-header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .chat-header-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-subtle);
      border-radius: 50%;
      width: 32px;
      height: 32px;
      color: var(--text-secondary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition-snappy);
    }
    .chat-header-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      color: #ffffff;
      border-color: var(--accent-indigo);
    }
    .chat-body {
      flex: 1;
      padding: 18px;
      overflow-y: auto;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      gap: 14px;
      background: rgba(7, 9, 14, 0.85);
      scroll-behavior: smooth;
    }
    .chat-body::-webkit-scrollbar {
      width: 6px;
    }
    .chat-body::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.02);
    }
    .chat-body::-webkit-scrollbar-thumb {
      background: rgba(99, 102, 241, 0.35);
      border-radius: 999px;
    }
    .chat-body::-webkit-scrollbar-thumb:hover {
      background: rgba(99, 102, 241, 0.7);
    }
    .message-row {
      display: flex;
      width: 100%;
    }
    .message-row.user-row {
      justify-content: flex-end;
    }
    .message-bubble {
      max-width: 88%;
      padding: 12px 16px;
      border-radius: 16px;
      background: rgba(22, 31, 54, 0.9);
      border: 1px solid var(--border-subtle);
      color: #e2e8f0;
      font-size: 0.88rem;
      line-height: 1.55;
    }
    .user-bubble {
      background: linear-gradient(135deg, var(--accent-indigo), var(--accent-violet));
      color: #ffffff;
      border: none;
      border-bottom-right-radius: 4px;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);
    }
    .message-text {
      word-break: break-word;
      white-space: pre-wrap;
    }
    .message-time {
      font-size: 0.65rem;
      color: rgba(255, 255, 255, 0.5);
      text-align: right;
      margin-top: 4px;
    }
    .typing-bubble {
      padding: 10px 16px;
      width: fit-content;
    }
    .typing-dots {
      display: flex;
      gap: 5px;
    }
    .typing-dots span {
      width: 7px;
      height: 7px;
      background: var(--accent-cyan);
      border-radius: 50%;
      animation: bounce 1.2s infinite ease-in-out;
    }
    .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes bounce {
      0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
      40% { transform: translateY(-6px); opacity: 1; }
    }
    .suggestions-container {
      padding: 10px 16px;
      background: rgba(12, 16, 26, 0.9);
      border-top: 1px solid var(--border-subtle);
    }
    .suggestions-label {
      font-size: 0.72rem;
      font-family: var(--font-mono);
      color: #94a3b8;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .suggestions-scroll {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 4px;
    }
    .suggestions-scroll::-webkit-scrollbar {
      height: 4px;
    }
    .suggestion-chip {
      white-space: nowrap;
      padding: 5px 12px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
      color: #c7d2fe;
      font-size: 0.75rem;
      cursor: pointer;
      transition: var(--transition-smooth);
    }
    .suggestion-chip:hover {
      background: rgba(99, 102, 241, 0.2);
      border-color: var(--accent-indigo);
      color: #ffffff;
    }
    .suggestion-chip:disabled {
      opacity: 0.45;
      cursor: not-allowed;
      pointer-events: none;
    }
    .chat-input-area {
      padding: 14px 16px;
      background: rgba(12, 16, 26, 0.98);
      border-top: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .chat-input {
      flex: 1;
      padding: 11px 16px;
      background: rgba(7, 9, 14, 0.85);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
      color: #ffffff;
      font-size: 0.88rem;
      outline: none;
      transition: var(--transition-smooth);
    }
    .chat-input:focus {
      border-color: var(--accent-indigo);
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.25);
    }
    .chat-input:disabled {
      opacity: 0.65;
      cursor: not-allowed;
      background: rgba(15, 20, 30, 0.5);
    }
    .chat-send-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent-indigo), var(--accent-violet));
      color: #ffffff;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition-smooth);
      flex-shrink: 0;
    }
    .chat-send-btn:hover {
      transform: scale(1.05);
    }
    .chat-send-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
    @keyframes slide-up {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes fade-in {
      from { opacity: 0; transform: translateX(8px); }
      to { opacity: 1; transform: translateX(0); }
    }
  `]
})
export class ChatbotComponent {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  private portfolioService = inject(PortfolioService);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);

  isOpen = false;
  isMaximized = false;
  userInput = '';
  isTyping = false;

  suggestedQuestions: string[] = [
    "Can I download Nitin's Resume?",
    "What are Nitin's top skills?",
    "Tell me about his current job",
    "Show me his GitHub projects",
    "How can I contact Nitin?"
  ];

  messages: ChatMessage[] = [
    {
      sender: 'bot',
      text: "👋 Hi! I am Nitin Pimpalkar's AI Portfolio Assistant. Ask me anything about his architecture, skills, projects, experience, or how to collaborate!",
      timestamp: this.getNow()
    }
  ];

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      setTimeout(() => this.scrollToBottom(), 50);
    }
  }

  toggleMaximize(): void {
    this.isMaximized = !this.isMaximized;
  }

  selectQuestion(q: string): void {
    if (this.isTyping) return;
    this.userInput = q;
    this.sendMessage();
  }

  sendMessage(): void {
    const text = this.userInput.trim();
    if (!text || this.isTyping) return;

    this.messages.push({
      sender: 'user',
      text: text,
      timestamp: this.getNow()
    });

    this.userInput = '';
    this.isTyping = true;
    this.cdr.detectChanges();
    setTimeout(() => this.scrollToBottom(), 30);

    const history = this.messages.map(m => ({ sender: m.sender, text: m.text }));

    this.portfolioService.askChatbot(text, history).subscribe({
      next: (res) => {
        this.ngZone.run(() => {
          this.isTyping = false;
          this.messages.push({
            sender: 'bot',
            text: res.reply,
            timestamp: this.getNow()
          });
          if (res.suggestedQuestions && res.suggestedQuestions.length > 0) {
            this.suggestedQuestions = res.suggestedQuestions;
          }
          this.cdr.detectChanges();
          setTimeout(() => this.scrollToBottom(), 50);
        });
      },
      error: () => {
        this.ngZone.run(() => {
          this.isTyping = false;
          let fallbackText = "Nitin Pimpalkar is a Junior Software Developer at ThinkerSteps Technologies Pvt. Ltd. based in Nagpur, India (B.Tech '24 graduate) specializing in C#, ASP.NET Core, and SQL Server. You can contact him directly at [nitinpimpalkar17@gmail.com](mailto:nitinpimpalkar17@gmail.com) or download his [Resume PDF](Nitin_Pimpalkar_Resume.pdf)!";
          if (text.toLowerCase().includes('resume') || text.toLowerCase().includes('cv')) {
            fallbackText = "📄 You can download Nitin's official Resume directly here: [Download Nitin Pimpalkar Resume (PDF)](Nitin_Pimpalkar_Resume.pdf) — Or reach him at [nitinpimpalkar17@gmail.com](mailto:nitinpimpalkar17@gmail.com).";
          }
          this.messages.push({
            sender: 'bot',
            text: fallbackText,
            timestamp: this.getNow()
          });
          this.cdr.detectChanges();
          setTimeout(() => this.scrollToBottom(), 50);
        });
      }
    });
  }

  formatMessage(text: string): string {
    if (!text) return '';
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color:#38bdf8;text-decoration:underline;">$1</a>');
    return formatted;
  }

  private getNow(): string {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private scrollToBottom(): void {
    try {
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }
    } catch { }
  }
}
