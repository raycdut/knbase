import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  question: string;

  getAnswer() {
    if (this.question) {
      alert('Test: ' + this.question);
    } else {
      alert('Please input the question.');
    }
  }
}
