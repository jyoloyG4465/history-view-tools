import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { NavigationComponent } from './layout/navigation/navigation.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'browser-cli';
}
