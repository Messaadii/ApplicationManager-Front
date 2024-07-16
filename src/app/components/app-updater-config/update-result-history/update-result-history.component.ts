import { Component, OnInit } from '@angular/core';
import { Result } from '../../../model/Result';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-update-result-history',
  templateUrl: './update-result-history.component.html',
  styleUrl: './update-result-history.component.css'
})
export class UpdateResultHistoryComponent implements OnInit {

  constructor(private http: HttpClient) { }

  results: Result[] = [];

  ngOnInit(): void {
    this.http.get(`${environment.backendApp}/update-result/getAll`).subscribe((data: any) => {
      this.results = data;
      console.log(this.results);
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


}
