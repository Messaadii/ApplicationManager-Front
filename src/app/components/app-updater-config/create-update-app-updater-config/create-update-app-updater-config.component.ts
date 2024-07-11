import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Command } from '../../../model/Command';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApplicationFile } from '../../../model/ApplicationFile';
import { environment } from '../../../environments/environment';

interface ConfigProperty {
  key: string;
  label: string;
  type: string;
}

@Component({
  selector: 'app-create-update-app-updater-config',
  templateUrl: './create-update-app-updater-config.component.html',
  styleUrl: './create-update-app-updater-config.component.css'
})
export class CreateUpdateAppUpdaterConfigComponent implements OnInit {

  faPlus = faPlus;
  isReadOnly = false;
  private apiUrl = "";
  currentWindow: string = 'main-config';
  cmd: Command = { command: '', runAsRoot: false, isEditMode: false };
  file: ApplicationFile = { path: '', newValue: '', isEditMode: false };
  addMessage: string = 'Add';
  editMessage: string = 'Edit';
  submit: boolean = false;

  vms: string[] = [];

  setDeployOn(value: string) {
    this.currentConfig.toBeDeployed.type = value;
  }

  setToBeDeployedVm(value: string) {
    this.currentConfig.toBeDeployed.virtualMachine.name = value;
  }

  setDeployOnVm(value: string) {
    this.currentConfig.deployOn.virtualMachine.name = value;
  }

  setNavWindow(value: string) {
    this.currentWindow = value;
  }

  currentConfig: any = {
    name: '',
    beforeUpdateCommands: [],
    afterUpdateCommands: [],
    applicationFiles: [],
    deployOn: {
      type: 'VirtualMachineResource',
      earPath: '',
      tempPath: '',
      backupFolderPath: '',
      virtualMachine: {
        name: ''
      }
    },
    toBeDeployed: {
      type: 'URLBased',
      url: '',
      earPath: '',
      regularExpression: '',
      suffix:'',
      virtualMachine: {
        name: ''
      }
    }
  };

  submitMessage: string = 'Create';

  constructor(private http: HttpClient, private router: ActivatedRoute, private navRouter: Router) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      const aucName = params['name'] || "";
      if (aucName !== "") {
        const apiUrl = `${environment.backendApp}/app-updater-config/get/` + aucName;

        this.http.get(apiUrl).subscribe((data: any) => {
          this.currentConfig = data;
        });

        this.isReadOnly = true;
      }
      this.submitMessage = this.isReadOnly ? "Update" : "Create";

      this.http.get(`${environment.backendApp}/virtual-machine/getAll`).subscribe((vmdata: any) => {
        this.vms = vmdata.map((vm: any) => vm.name);
      });
    });
  }

  onSubmit(): void {
    if (this.submit) {
      if (!this.isReadOnly) {

        this.apiUrl = `${environment.backendApp}/app-updater-config/save`;

        this.http.post(this.apiUrl, this.currentConfig).subscribe({
          next: (response) => {
            console.log('app-updater-config created successfully', response);
            // Handle successful response
          },
          error: (error) => {
            console.error('Error creating app-updater-config', error);
            // Handle error response
          },
          complete: () => {
            console.log('Request completed');
            this.submit = false;
          }
        });

      } else {
        this.apiUrl = `${environment.backendApp}/app-updater-config/update/` + this.currentConfig.name;

        this.http.put(this.apiUrl, this.currentConfig).subscribe({
          next: (response) => {
            console.log('app-updater-config updated successfully', response);
            // Handle successful response
          },
          error: (error) => {
            console.error('Error updating app-updater-config', error);
            // Handle error response
          },
          complete: () => {
            console.log('Request completed');
            this.isReadOnly = false;
            this.submit = false;
            this.currentConfig = {
              name: '',
              beforeUpdateCommands: [],
              afterUpdateCommands: [],
              applicationFiles: [],
              deployOn: {
                earPath: '',
                tempPath: '',
                backupFolderPath: '',
                virtualMachine: {
                  name: ''
                }
              },
              toBeDeployed: {
                type: 'URLBased',
                url: '',
                earPath: '',
                regularExpression: '',
                virtualMachine: {
                  name: ''
                }
              }
            };
          }
        });
      }
      this.navRouter.navigate(['/app-updater-config/list']);
    }
  }

  addCommand(commands: Command[], command: Command): void {
    let tempcmd = { command: command.command, runAsRoot: command.runAsRoot, isEditMode: false };
    if (tempcmd.command !== '') {
      commands.push(tempcmd);
    }
    this.cmd = { command: '', runAsRoot: false, isEditMode: false };
    this.addMessage = 'Add';
  }

  selectedFile: File | null = null;

  onFileSelected(event: Event, file:any): void {
    console.log(this.currentConfig)
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.encodeFileToBase64(this.selectedFile, file === null ? this.file : file);
    }
    console.log(this.currentConfig)
  }

  encodeFileToBase64(file: File, configFile:any): void {
    const reader = new FileReader();
    reader.onload = () => {
      let base64String = (reader.result as string).split(',')[1];
      configFile.newValue = base64String;
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
    reader.readAsDataURL(file);
  }

  addFile(applicationFiles: ApplicationFile[], applicationFile: ApplicationFile): void {
    let tempFile = { path: applicationFile.path, newValue: applicationFile.newValue, isEditMode: false };
    if (tempFile.path !== '') {
      applicationFiles.push(tempFile);
    }
    this.file = { path: '', newValue: '', isEditMode: false };
    this.addMessage = 'Add';
  }
}
