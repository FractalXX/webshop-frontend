import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiHttpClient } from './utils/api-http-client';
import createApiHttpClient from './utils/api-http-client-factory';
import { environment } from 'src/environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/header/header.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

const materialModules = [
  MatTabsModule,
];

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ...materialModules,
  ],
  exports: [
    FlexLayoutModule,
    HeaderComponent,
    ...materialModules,
  ],
  providers: [
    {
      provide: ApiHttpClient,
      useFactory: (httpClient: HttpClient) => createApiHttpClient(httpClient, environment.apiUrl),
      deps: [HttpClient],
    }
  ]
})
export class SharedModule { }
