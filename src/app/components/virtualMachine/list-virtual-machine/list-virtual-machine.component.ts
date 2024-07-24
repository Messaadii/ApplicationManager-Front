import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VirtualMachine } from '../../../model/virtualMachine';
import { Router } from '@angular/router';
import { VmserviceService } from '../../../services/vmservice.service';
import { Command } from '../../../model/Command';
import { environment } from '../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  patchValue:any
  currentVM: FormGroup | undefined; // Assuming currentVM is a FormGroup
  updateVMForm: FormGroup;
  vm:any;

  constructor(private http: HttpClient, private router: Router, private apiService: VmserviceService,    private fb: FormBuilder,
  ) { this.updateVMForm = this.fb.group({
    name: ['', Validators.required],
    user: ['', Validators.required],
    host: ['', Validators.required],
    password: ['', Validators.required],
    port: [0, Validators.required]
  });}

  

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

  edit(name:String) {
    this.router.navigate(['/virtualMachine/update', name]); 

    const vm = this.vms.find(vm => vm.name === name);
    if (vm) {
      if (!this.currentVM) {
        this.currentVM = this.fb.group({
          name: [vm.name, Validators.required],
          user: [vm.user, Validators.required],
          host: [vm.host, Validators.required],
          password: [vm.password, Validators.required],
          port: [vm.port, Validators.required]
        });
      } else {
        this.currentVM.patchValue({
          name: vm.name,
          user: vm.user,
          host: vm.host,
          password: vm.password,
          port: vm.port
        });
      }
    }
  
  }
  listActiveJavaProcesses(name: string) {
    this.router.navigate(['/virtualMachine/list-active-java-processes', name]);
  }
  loadCommands(name: string) {
    this.router.navigate(['/virtualMachine/commands', name]);
  }

  addVm() {
    this.router.navigate(['/virtualMachine/save']);
  }

}
