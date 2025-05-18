import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { LoadingStateFacade } from './shared/state/loading/loading.state.facade';
import { Observable } from 'rxjs';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    NavigationComponent,
    LoadingSpinnerComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'browser-cli';

  private loadingStateFacade = inject(LoadingStateFacade);

  isLoading$: Observable<boolean> = this.loadingStateFacade.isLoading$;
}
