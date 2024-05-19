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

  ngOnInit(): void {
    this.loadProjects();

    if (this.myCookieService.checkCookie('cookieConsent')) {
      this.showBanner = false;
    }
  }

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

  /**
   * They are called cookies and depending on whether all or the necessary ones are accepted,
   * the method is executed
   */
  acceptAllCookies(): void {
    this.myCookieService.acceptAllCookiesAndCaptureData();
    this.showBanner = false;
  }

  acceptNecessaryCookies(): void {
    this.myCookieService.acceptNecessaryCookiesAndCaptureData();
    this.showBanner = false;
  }
}
