import { Injectable } from "@angular/core";
import { BACKEND_API_URL } from "../constants";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PortfolioType } from "../shared/interfaces/PortfolioType";
import { Portfolio } from "../shared/interfaces/Portfolio";
import { PortfolioEntry } from "../shared/interfaces/PortfolioEntry";
import { AppResult, AppResultGeneric } from "../shared/interfaces/AppResult";
import { PortfolioEntryValue } from "../shared/interfaces/PortfolioEntryValue";


@Injectable({
  providedIn: "root"
})
export class PortfolioService {

  constructor(private http: HttpClient) { }

  basePortfolioUrl = BACKEND_API_URL + "/portfolios";

  // Ruft alle Portfoliotypen ab
  public getAllPortfolioTypes(): Observable<PortfolioType[]> {
    return this.http.get<PortfolioType[]>(this.basePortfolioUrl + "/types");
  }

  // Speichert Portfolio
  public postPortfolio(portfolio: Portfolio): Observable<AppResultGeneric<Portfolio>> {
    return this.http.post<AppResultGeneric<Portfolio>>(this.basePortfolioUrl, portfolio);
  }

  // Updated Portfolio
  public putPortfolio(portfolio: Portfolio): Observable<AppResult> {
    return this.http.put<AppResult>(this.basePortfolioUrl + `/${portfolio.id}`, portfolio);
  }

  // Löscht Portfolio
  public deletePortfolio(id: number): Observable<AppResult> {
    return this.http.delete<AppResult>(this.basePortfolioUrl + `/${id}`);
  }

  // Holt alle Portfolios des Users
  public getPortfolios(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(this.basePortfolioUrl);
  }

  // Holt bestimmtes Portfolio des Users anhand von id
  public getPortfolio(id: number): Observable<AppResultGeneric<Portfolio>> {
    return this.http.get<AppResultGeneric<Portfolio>>(this.basePortfolioUrl + `/${id}`);
  }

  // Speichert Portfolioentry
  public postPortfolioEntry(portfolioEntry: PortfolioEntry): Observable<AppResult> {
    return this.http.post<AppResult>(this.basePortfolioUrl + "/entry", portfolioEntry);
  }

  // Löscht Portfolioentry
  public deletePortfolioEntry(portfolioId: number, portfolioEntryId: number): Observable<AppResult> {
    return this.http.delete<AppResult>(this.basePortfolioUrl + `/${portfolioId}/entries/${portfolioEntryId}`);
  }

  // Ruft alle Portfolioentries zu einem Portfolio ab
  public getPortfolioEntries(portfolioId: number): Observable<PortfolioEntry[]> {
    return this.http.get<PortfolioEntry[]>(this.basePortfolioUrl + `/${portfolioId}/entries`);
  }

  // Ruft einen Portfolio Entry mit allen Values ab
  public getPortfolioEntry(portfolioId: number, entryId: number): Observable<PortfolioEntry> {
    return this.http.get<PortfolioEntry>(this.basePortfolioUrl + `/${portfolioId}/entries/${entryId}`);
  }

  // Legt einen neuen Value zu einem Entry an
  public setPortfolioEntryValue(portfolioId: number, entryId: number, entryValue: PortfolioEntryValue): Observable<AppResult> {
    return this.http.post<AppResult>(this.basePortfolioUrl + `/${portfolioId}/entries/${entryId}/values`, entryValue);
  }

  // Löscht Value zu einem Entry
  public deletePortfolioEntryValue(portfolioId: number, entryId: number, id: number): Observable<AppResult> {
    return this.http.delete<AppResult>(this.basePortfolioUrl + `/${portfolioId}/entries/${entryId}/values/${id}`);
  }

  // Updatet Value
  public putPortfolioEntryValue(portfolioId: number, entryId: number, id: number, entryValue: PortfolioEntryValue): Observable<AppResult> {
    return this.http.put<AppResult>(this.basePortfolioUrl + `/${portfolioId}/entries/${entryId}/values/${id}`, entryValue);
  }


}
