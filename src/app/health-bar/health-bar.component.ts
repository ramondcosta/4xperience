import { Component } from '@angular/core';

@Component({
  selector: 'app-health-bar',
  templateUrl: './health-bar.component.html',
  styleUrls: ['./health-bar.component.scss']
})
export class HealthBarComponent {
  currentHealth = 75;

  get healthSize() {
    return this.currentHealth.toString() + "%";
  }
  get lostHealthSize() {
    let lostHealth = 100 - this.currentHealth; 
    return lostHealth.toString() + "%";
  }
}
