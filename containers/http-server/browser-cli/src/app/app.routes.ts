import { Routes } from '@angular/router';
import { DatasetComponent } from './pages/dataset/dataset.component';
import { AnalysisComponent } from './pages/analysis/analysis.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // これがリダイレクト
  { path: 'home', component: HomeComponent },
  { path: 'dataset', component: DatasetComponent },  
  { path: 'analysis', component: AnalysisComponent } 
];
