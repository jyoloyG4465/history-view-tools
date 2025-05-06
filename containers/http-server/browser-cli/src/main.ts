import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { TranslateService } from '@ngx-translate/core';

bootstrapApplication(AppComponent, appConfig).then((ref) => {
  const translate = ref.injector.get(TranslateService);
  translate.setDefaultLang('ja');
  translate.use('ja');
});
