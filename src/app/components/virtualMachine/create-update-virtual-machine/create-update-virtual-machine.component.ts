import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VirtualMachine } from '../../../model/virtualMachine';
import { ActivatedRoute } from '@angular/router';
import { Command } from '../../../model/Command';
import { VmserviceService } from '../../../services/vmservice.service';
import { environment } from '../../../environments/environment';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-update-virtual-machine',
  templateUrl: './create-update-virtual-machine.component.html',
  styleUrl: './create-update-virtual-machine.component.css'
})
export class CreateUpdateVirtualMachineComponent implements OnInit {

  private apiUrl = "";
  vmName = "";
  isReadOnly = false;
  submitMessage = "";
  cmd: Command = {
    command: '', runAsRoot: false, isEditMode: false, 
    
   
  };
  addMessage: string = 'Add';
  currentWindow: string = 'main-config';
  faPlus = faPlus;



  currentVM: VirtualMachine = {
    name: "",
    user: "",
    host: "",
    password: "",
    port: 0,
    commands: [],
  }
  updateVMForm!: FormGroup;

  constructor(private http: HttpClient, private router: ActivatedRoute, private apiservive: VmserviceService) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.vmName = params['name'] || "";
    });
    if (this.vmName !== "") {
      this.apiUrl = `${environment.backendApp}/virtual-machine/get/` + this.vmName;

      this.http.get(this.apiUrl).subscribe((data: any) => {
        this.currentVM = data;
        this.isReadOnly = false;

      });

      this.isReadOnly = true;
    }
    this.submitMessage = this.isReadOnly ? "Update" : "Create";
  }

  onSubmit(form: any): void {
    if (form.valid) {
      if (!this.isReadOnly) {

        this.apiUrl = `${environment.backendApp}/virtual-machine/save`;

        this.http.post(this.apiUrl, this.currentVM).subscribe({
          next: (response) => {
            console.log('Virtual machine created successfully', response);
            // Handle successful response
          },
          error: (error) => {
            console.error('Error creating virtual machine', error);
            // Handle error response
          },
          complete: () => {
            console.log('Request completed');
          }
        });

      } else {
        if (this.updateVMForm.valid && this.currentVM) {
          const updatedVM = this.updateVMForm.value;
        this.apiUrl = `${environment.backendApp}/virtual-machine/update`;

        this.http.put(this.apiUrl,this.currentVM).subscribe({
          next: (response) =>{
            console.log('Virtual machine updated successfully', response);
            // Handle successful response
          },
          error: (error) => {
            console.error('Error updating virtual machine', error);
            // Handle error response
          },
          complete: () => {
            console.log('Request completed');
            this.isReadOnly = false;
            this.currentVM = { name: "", user: "", host: "", password: "", port: 0, commands: [] };

          }
        });
      }
    }
  }
  }


  addCommand(command: Command): void {
    let tempcmd = { command: command.command, runAsRoot: command.runAsRoot, isEditMode: false , processId: function (arg0: string, processId: any): unknown {
      throw new Error('Function not implemented.');
    }};
    if (tempcmd.command !== '') {
      this.currentVM.commands.push(tempcmd);
    }
    this.cmd = { command: '', runAsRoot: false, isEditMode: false , 
    };
    this.addMessage = 'Add';
  }

  setNavWindow(value: string) {
    this.currentWindow = value;
  }



  saveVirtualMachine(): void {
    this.apiservive.saveVirtualMachine(this.currentVM).subscribe(
      (response: any) => {
        console.log('VirtualMachine saved successfully:', response);
      },
      (error: any) => {
        console.error('Error saving VirtualMachine:', error);
      }
    );
  }

}
