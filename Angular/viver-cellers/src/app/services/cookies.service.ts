import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(private cookieService: CookieService) { }

  acceptAllCookiesAndCaptureData(): void {

    // Capture the browser language
    const language = navigator.language;
    this.cookieService.set('language', language, 365);

    // Capture the browser user agent
    const userAgent = navigator.userAgent;
    this.cookieService.set(' User', userAgent, 365);

    // Set the consent cookie
    this.cookieService.set('cookieConsent', 'allCookiesAccepted', 365);
  }

  acceptNecessaryCookiesAndCaptureData(): void {
    // Set the consent cookie
    this.cookieService.set('cookieConsent', 'necessaryCookiesAccepted', 365);
  }

  //Check the cookies that are accepted
  checkCookie(cookieName: string): boolean {
    return this.cookieService.check(cookieName);
  }
}
