import { Component, OnInit } from '@angular/core';
import { VmserviceService } from '../../../services/vmservice.service';
import { ActivatedRoute } from '@angular/router';
import { pid } from 'node:process';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { vm } from '../../../model/vm';

@Component({
  selector: 'app-list-active-java-processes',
  templateUrl: './list-active-java-processes.component.html',
  styleUrl: './list-active-java-processes.component.css'
})

export class ListActiveJavaProcessesComponent implements OnInit {
  activeProcesses: any[] = []; // Initialize as an empty array or appropriate type
  pathParameter: any;
  name: any;
  processId: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: VmserviceService
  ) {
    this.route.params.subscribe(params => {
      this.name = params['name']; // Assuming 'name' is the parameter name in the route
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pathParameter = params['name'];
      console.log('Path Parameter:', this.pathParameter);

      if (this.pathParameter) {
        this.fetchActiveProcesses(this.pathParameter);

      }
    });
  }

  fetchActiveProcesses(name: string): void {
    this.apiService.getlistactivejavaprocesses(name).subscribe(
      (data: string[]) => {
        this.activeProcesses = data;
        console.log('Active Java processes:', this.activeProcesses);
      },
      (error: any) => {
        console.error('Error fetching active Java processes:', error);
      }
    );
  }




getPidFromProcess(process: string): string {
  const columns = this.splitProcess(process);
  return columns[1];
}

  

  splitProcess(process: string): string[] {
    return process.split(/\s+/); // Split by whitespace
  }

  killProcessVM(process:string): void {
    this.processId = this.getPidFromProcess(process);
    console.log('Process ID:', this.processId); // Verify if processId is correctly set

    
    console.log(`Name: ${this.name}, Process ID: ${this.processId}`); // Check if these values are correct
    this.apiService.killVm(this.name, this.processId).subscribe(
      (response: any) => {
        console.log(response);
        alert(response.message); // Assuming the response contains a 'message' field
      },
      (error: any) => {
        console.error('Error:', error);
        alert(`Failed to kill process for VM ${this.name} with PID ${this.processId}. Error: ${error.message}`);
      }
    );
  }
}  