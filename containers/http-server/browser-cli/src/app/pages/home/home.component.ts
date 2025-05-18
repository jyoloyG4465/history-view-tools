import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonPrimaryComponent } from '@app/shared/button-primary/button-primary.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [TranslateModule, ButtonPrimaryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private router = inject(Router);

  constructor() {}

  onDataPrepareClick() {
    this.router.navigate(['/data-preparation']);
  }

  onDatasetClick() {
    this.router.navigate(['/dataset']);
  }

  onAnalysisClick() {
    this.router.navigate(['/analysis']);
  }
}
