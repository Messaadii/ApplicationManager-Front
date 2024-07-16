import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VirtualMachine } from '../../../model/virtualMachine';
import { Router } from '@angular/router';
import { VmserviceService } from '../../../services/vmservice.service';
import { Command } from '../../../model/Command';

@Component({
  selector: 'app-list-virtual-machine',
  templateUrl: './list-virtual-machine.component.html',
  styleUrls: ['./list-virtual-machine.component.css']
})
export class ListVirtualMachineComponent implements OnInit {


  private apiUrl = "";

  isReadOnly = false;

  vms: VirtualMachine[] = [];
  name: any;
  commands: Command[] | undefined;
  route: any;

  constructor(private http: HttpClient, private router: Router,private apiService:VmserviceService) { }

  ngOnInit(): void {
    this.initiateOnInit();
  }

  initiateOnInit() {
    this.http.get('http://localhost:8080/virtual-machine/getAll').subscribe((data: any) => {
      this.vms = data;
    });
  }


  deleteVm(vm: VirtualMachine) {
    this.apiUrl = 'http://localhost:8080/virtual-machine/delete/' + vm.name;

    this.http.delete(this.apiUrl).subscribe({
      next: (response) => {
        console.log('Virtual machine deleted successfully', response);
        // Handle successful response
      },
      error: (error) => {
        console.error('Error deleting virtual machine', error);
        // Handle error response
      },
      complete: () => {
        console.log('Request completed');
        this.initiateOnInit();
      }
    });
  }

  updateVm(name: string) {
    this.router.navigate(['/virtualMachine/update', name]);
  }
  listActiveJavaProcesses(name: string) {
    this.router.navigate(['/virtualMachine/list-active-java-processes', name]);
  }
  loadCommands(name: string){
    this.router.navigate(['/virtualMachine/commands', name]);

  }
  
}