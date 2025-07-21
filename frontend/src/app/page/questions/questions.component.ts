import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GroqService } from '../../core/services/groq.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface GroqResponse {
  answer: string;
  updatedHistory: { role: string; content: string }[];
}

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})


export class QuestionsComponent {

  messages: any[] = [];
  history: any[] = [];
  userInput = '';

  constructor(private groqService: GroqService) {
    this.sendWelcome();
  }

sendWelcome() {
  const welcomeMessage = "Bonjour, je suis WorkoTn, votre assistant Workoo. Posez-moi une question !";
  this.messages.push({ role: 'assistant', content: welcomeMessage });
  this.history = [
    {
      role: "system",
      content: "You are WorkoTn, Workoo assistant. Always answer in a polite and helpful way."
    }
  ];
}

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.history.push({ role: 'user', content: this.userInput });
    this.messages.push({ role: 'user', content: this.userInput });

    this.groqService.ask(this.history).subscribe((res: GroqResponse) => {
      this.history = res.updatedHistory;
      this.messages.push({ role: 'assistant', content: res.answer });
    });

    this.userInput = '';
  }
  
}