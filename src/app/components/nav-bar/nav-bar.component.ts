import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faCog, faServer, faSearch, faBan, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private router: Router) { }

  goToHome() {
    this.router.navigate(['']);
  }

  goToCreateVm() {
    this.router.navigate(['/virtualMachine/save']);
  }

  goToListVm() {
    this.router.navigate(['/virtualMachine/list']);
  }

  gotToListAppUpdaterConfig() {
    this.router.navigate(['/app-updater-config/list']);
  }

  gotToCreateAppUpdaterConfig() {
    this.router.navigate(['/app-updater-config/save']);
  }

  goToUpdateResultHistory() {
    this.router.navigate(['/app-updater-config/update-result-history']);
  }

  faHome = faHome;
  faCog = faCog;
  faServer = faServer;
  faSearch = faSearch;
  faBan = faBan;
  faClockRotateLeft = faClockRotateLeft;
}
