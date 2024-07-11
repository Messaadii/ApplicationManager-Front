import { Component, OnInit } from '@angular/core';
import { AppUpdaterConfig } from '../../../model/AppUpdaterConfig';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-list-app-updater-config',
  templateUrl: './list-app-updater-config.component.html',
  styleUrl: './list-app-updater-config.component.css'
})
export class ListAppUpdaterConfigComponent implements OnInit {

  private apiUrl = "";

  isReadOnly = false;
  isLoading = false;

  appUpdaterConfigList: AppUpdaterConfig[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.initiateOnInit();
  }

  initiateOnInit() {
    this.http.get(`${environment.backendApp}/app-updater-config/getAll`).subscribe((data: any) => {
      this.appUpdaterConfigList = data;
    });
  }

  updateConfig(name: string) {
    this.router.navigate(['/app-updater-config/update', name]);
  }

  deleteConfig(name: string) {
    this.apiUrl = `${environment.backendApp}/app-updater-config/delete/` + name;

    this.http.delete(this.apiUrl).subscribe({
      next: (response) => {
        console.log('app Updater Config deleted successfully', response);
        // Handle successful response
      },
      error: (error) => {
        console.error('Error deleting app Updater Config', error);
        // Handle error response
      },
      complete: () => {
        console.log('Request completed');
        this.initiateOnInit();
      }
    });
  }

  selectedContent: any;
  modalTitle: string = "";
  showModal: boolean = false;

  viewContent(title: string, content: any) {
    this.modalTitle = title;
    this.selectedContent = content;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  runConfig(appUpdaterConfig: any) {
    this.isLoading = true;
    this.apiUrl = `${environment.backendApp}/app-updater-config/deploy/` + appUpdaterConfig.name;

    this.http.get(this.apiUrl).subscribe({
      next: (response) => {
        console.log('app Updater Config run successfully', response);
        appUpdaterConfig.result = response;
      },
      error: (error) => {
        console.error('Error running app Updater Config', error);
        // Handle error response
      },
      complete: () => {
        this.isLoading = false;
        this.viewContent('Result', appUpdaterConfig.result);
      }
    });
  }

  addConfig() {
    this.router.navigate(['/app-updater-config/save']);
  }

}
