import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-health-bar',
  templateUrl: './health-bar.component.html',
  styleUrls: ['./health-bar.component.scss']
})
export class HealthBarComponent {
  @Input()
  currentHealth: number = 50;

  get healthSize() {
    return this.currentHealth.toString() + "%";
  }
  get lostHealthSize() {
    let lostHealth = 100 - this.currentHealth;
    console.log(lostHealth);
    return lostHealth.toString() + "%";
  }
}
