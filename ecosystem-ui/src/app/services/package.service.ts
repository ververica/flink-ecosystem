import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Package } from '../interfaces/package';

@Injectable({ providedIn: 'root' })
export class PackageService {
  constructor(protected http: HttpClient) {}

  getPackage(name: string): Observable<Package> {
    return this.http.get<Package>(
      `/api/v1/package/${name}`
    );
  }
}
