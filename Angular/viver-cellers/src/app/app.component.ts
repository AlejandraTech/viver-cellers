import { AfterViewInit, Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { CookiesService } from './services/cookies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  showBanner: boolean = true;

  title = 'viver-cellers';

  ngAfterViewInit() {
    initFlowbite();
  }

  constructor(private myCookieService: CookiesService) { }

  ngOnInit(): void {
    if (this.myCookieService.checkCookie('cookieConsent')) {
      this.showBanner = false;
    }
  }

  /*
  * Accept all cookies and capture data
  * Call the `acceptAllCookiesAndCaptureData` method of the `myCookieService` service to accept all cookies.
  * Set `showBanner` to `false` to hide the banner after accepting all cookies.
*/
  acceptAllCookies(): void {
    this.myCookieService.acceptAllCookiesAndCaptureData();
    this.showBanner = false;
  }

  /*
    * Accept only necessary cookies and capture data
    * Call the `acceptNecessaryCookiesAndCaptureData` method of the `myCookieService` service to accept only necessary cookies.
    * Set `showBanner` to `false` to hide the banner after accepting necessary cookies.
  */
  acceptNecessaryCookies(): void {
    this.myCookieService.acceptNecessaryCookiesAndCaptureData();
    this.showBanner = false;
  }
}
