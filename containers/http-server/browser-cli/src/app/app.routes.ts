import { Routes } from '@angular/router';
import { DatasetComponent } from './pages/dataset/dataset.component';
import { AnalysisComponent } from './pages/analysis/analysis.component';
import { HomeComponent } from './pages/home/home.component';
import { DataPreparationComponent } from './pages/data-preparation/data-preparation.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // これがリダイレクト
  { path: 'home', component: HomeComponent },
  { path: 'data-preparation', component: DataPreparationComponent },
  { path: 'dataset', component: DatasetComponent },
  { path: 'analysis', component: AnalysisComponent },
];
