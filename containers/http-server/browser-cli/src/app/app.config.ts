import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideZoneChangeDetection } from '@angular/core';

import { routes } from './app.routes';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxEchartsModule } from 'ngx-echarts';
import { APP_STATES } from './app.states';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    importProvidersFrom(MatProgressSpinnerModule),
    importProvidersFrom(
      NgxEchartsModule.forRoot({
        echarts: () => import('echarts'), // 遅延ロードでバンドルサイズも最適
      })
    ),
    importProvidersFrom(NgxsModule.forRoot(APP_STATES)),
    importProvidersFrom(
      NgxsModule.forRoot(APP_STATES),
      ...(!environment.production
        ? [NgxsReduxDevtoolsPluginModule.forRoot()]
        : [])
    ),
  ],
};
