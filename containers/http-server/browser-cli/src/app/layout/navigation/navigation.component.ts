import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatListModule, RouterModule],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {}
