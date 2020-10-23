import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CustomerInfoGroupComponent } from './components/customer-info-group/customer-info-group.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
import { HeaderComponent } from './components/header/header.component';
import { SimpleAddressComponent } from './components/simple-address/simple-address.component';
import { SimpleInputComponent } from './components/simple-input/simple-input.component';
import { ApiHttpClient } from './utils/api-http-client';
import createApiHttpClient from './utils/api-http-client-factory';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatRippleModule,
  MatSelectModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
];

const commonModules = [
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  FlexLayoutModule,
];

@NgModule({
  declarations: [
    HeaderComponent,
    SimpleInputComponent,
    SimpleAddressComponent,
    CustomerInfoComponent,
    CustomerInfoGroupComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ...materialModules,
    ...commonModules,
  ],
  exports: [
    RouterModule,
    HeaderComponent,
    SimpleInputComponent,
    CustomerInfoComponent,
    CustomerInfoGroupComponent,
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
