import { Component } from '@angular/core';

@Component({
  selector: 'app-recipient-manager',
  templateUrl: './recipient-manager.component.html',
  styleUrls: ['./recipient-manager.component.css'],
})
export class RecipientManagerComponent {
  inputEvent = 0;
  detectChange() {
    this.inputEvent++;
  }
}
