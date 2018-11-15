import { Component } from '@angular/core';
import { Answer } from '../model/answer';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  question: string;
  answerList: Answer[];
  answerGot: boolean;

  getAnswer() {
    if (this.question) {
      alert('Test: ' + this.question);
      this.answerGot = true;
      if (!this.answerList) {
        this.answerList = [{ title: 'Test', content: 'Test content'}];
      }
    } else {
      alert('Please input the question.');
    }
  }
}
