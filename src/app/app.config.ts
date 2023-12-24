import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { uk_UA, provideNzI18n, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import uk from '@angular/common/locales/uk';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './state/user.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { UploadService } from './upload-service/upload.service';

registerLocaleData(uk);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideNzI18n(en_US), 
    importProvidersFrom(FormsModule), importProvidersFrom(HttpClientModule), provideAnimations(), 
    importProvidersFrom(NgxsModule.forRoot([UserState])), importProvidersFrom(NgxsReduxDevtoolsPluginModule.forRoot()), UploadService]
};

