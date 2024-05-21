import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { CookiesService } from 'src/app/services/cookies.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];
  showBanner: boolean = true;

  constructor(private projectService: ProjectService, private myCookieService: CookiesService) { }

  /**
   * Load the projects
   * Call the `loadProjects` method to get all the projects when the component is initialized.
   * Check if the consent cookie exists
   * Use the `myCookieService` service to check if the cookie 'cookieConsent' is present.
   * If the cookie is present, set `showBanner` to `false` to hide the banner.
   */
  ngOnInit(): void {
    this.loadProjects();

    if (this.myCookieService.checkCookie('cookieConsent')) {
      this.showBanner = false;
    }
  }

  /*
    * Get all service projects
    * Call the `getAllProjects` method of the `projectService` service to get all the projects.
    * Subscribe to the service's response.
    * If the request is successful, assign the received data to the `projects` property.
    * If an error occurs, display an error message in the console.
  */
  loadProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (data: Project[]) => {
        this.projects = data;
      },
      error => {
        console.error('Error fetching products: ', error);
      }
    );
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
