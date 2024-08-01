import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-execute-script',
  templateUrl: './execute-script.component.html',
  styleUrls: ['./execute-script.component.css']
})
export class ExecuteScriptComponent {
  databaseName: string = '';
  file: File | null = null;
  executionResult: any = null;

  constructor(private http: HttpClient) {}

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  onSubmit(): void {
    if (this.file && this.databaseName) {
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('databaseName', this.databaseName);

      this.http.post('http://localhost:8081/database/execute-script', formData).subscribe(
        response => this.executionResult = response,
        error => console.error('Error executing script:', error)
      );
    } else {
      alert('Please select a file and enter the database name.');
    }
  }
}
