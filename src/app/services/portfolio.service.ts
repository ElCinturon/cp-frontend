import { Injectable } from '@angular/core';
import { BACKEND_API_URL } from '../constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PortfolioType } from '../shared/interfaces/PortfolioType';
import { Portfolio } from '../shared/interfaces/Portfolio';
import { AppResult } from '../shared/interfaces/AppResult';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) { }

  basePortfolioUrl = BACKEND_API_URL + "/portfolios";

  // Ruft alle Portfoliotypen ab
  public getAllPortfolioTypes(): Observable<PortfolioType[]> {
    return this.http.get<PortfolioType[]>(this.basePortfolioUrl + `/types`);
  }

  // Speichert Portfolio
  public postPortfolio(portfolio: Portfolio): Observable<AppResult> {
    return this.http.post<AppResult>(this.basePortfolioUrl, portfolio);
  }

}
