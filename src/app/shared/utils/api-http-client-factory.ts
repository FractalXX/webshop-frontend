import { HttpClient } from '@angular/common/http';
import { ApiHttpClient } from './api-http-client';

export default function createApiHttpClient(httpClient: HttpClient, apiUrl: string): ApiHttpClient {
  return new ApiHttpClient(httpClient, apiUrl);
}
