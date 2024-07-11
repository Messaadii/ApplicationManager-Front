import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VirtualMachine } from '../../../model/virtualMachine';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-list-virtual-machine',
  templateUrl: './list-virtual-machine.component.html',
  styleUrls: ['./list-virtual-machine.component.css']
})
export class ListVirtualMachineComponent implements OnInit {


  private apiUrl = "";

  isReadOnly = false;
  currentVM: VirtualMachine = { name: "", user: "", host: "", password: "", port: 0 }

  vms: VirtualMachine[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.initiateOnInit();
  }

  initiateOnInit() {
    this.http.get(`${environment.backendApp}/virtual-machine/getAll`).subscribe((data: any) => {
      this.vms = data;
    });
  }


  deleteVm(vm: VirtualMachine) {
    this.apiUrl = `${environment.backendApp}/virtual-machine/delete/` + vm.name;

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

  addVm() {
    this.router.navigate(['/virtualMachine/save']);
  }

}
