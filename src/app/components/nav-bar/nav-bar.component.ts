import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faCog, faServer, faSearch, faBan } from '@fortawesome/free-solid-svg-icons';

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

  faHome = faHome;
  faCog = faCog;
  faServer = faServer;
  faSearch = faSearch;
  faBan = faBan;
}
