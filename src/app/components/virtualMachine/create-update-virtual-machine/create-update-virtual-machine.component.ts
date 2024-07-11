import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VirtualMachine } from '../../../model/virtualMachine';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

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

  currentVM: VirtualMachine = { name: "", user: "", host: "", password: "", port: 0 }

  constructor(private http: HttpClient, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.vmName = params['name'] || "";
    });
    if (this.vmName !== "") {
      this.apiUrl = `${environment.backendApp}/virtual-machine/get/` + this.vmName;

      this.http.get(this.apiUrl).subscribe((data: any) => {
        this.currentVM = data;
      });

      this.isReadOnly = true;
    }
    this.submitMessage = this.isReadOnly ? "Update" : "Create";
  }

  onSubmit(form: any): void {
    if (form.valid) {
      const vmData = {
        name: form.value.name,
        user: form.value.user,
        host: form.value.host,
        password: form.value.password,
        port: form.value.port
      };

      if (!this.isReadOnly) {

        this.apiUrl = `${environment.backendApp}/virtual-machine/save`;

        this.http.post(this.apiUrl, vmData).subscribe({
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
        this.apiUrl = `${environment.backendApp}/virtual-machine/update`;

        this.http.put(this.apiUrl, vmData).subscribe({
          next: (response) => {
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
            this.currentVM = { name: "", user: "", host: "", password: "", port: 0 };
          }
        });
      }
    }
  }

}
