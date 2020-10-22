import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { SimpleInputComponent } from './components/simple-input/simple-input.component';
import { ApiHttpClient } from './utils/api-http-client';
import createApiHttpClient from './utils/api-http-client-factory';

const materialModules = [
  MatTabsModule,
  MatCardModule,
  MatCheckboxModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatTooltipModule,
  MatFormFieldModule,
];

const commonModules = [FormsModule, ReactiveFormsModule, RouterModule];

@NgModule({
  declarations: [HeaderComponent, SimpleInputComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ...materialModules,
    ...commonModules,
  ],
  exports: [
    FlexLayoutModule,
    RouterModule,
    HeaderComponent,
    SimpleInputComponent,
    ...materialModules,
    ...commonModules,
  ],
  providers: [
    {
      provide: ApiHttpClient,
      useFactory: (httpClient: HttpClient) =>
        createApiHttpClient(httpClient, environment.apiUrl),
      deps: [HttpClient],
    },
  ],
})
export class SharedModule {}
