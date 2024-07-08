import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as fs from 'fs';
import * as path from 'path';
import { Command } from '../../../model/Command';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApplicationFile } from '../../../model/ApplicationFile';

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

  setDeployOn(value: string) {
    this.currentConfig.toBeDeployed.type = value;
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
      virtualMachine: {
        name: ''
      }
    }
  };

  submitMessage: string = 'Create';

  constructor(private http: HttpClient, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      const aucName = params['name'] || "";
      if (aucName !== "") {
        const apiUrl = 'http://localhost:8080/app-updater-config/get/' + aucName;

        this.http.get(apiUrl).subscribe((data: any) => {
          this.currentConfig = data;
        });

        this.isReadOnly = true;
      }
      this.submitMessage = this.isReadOnly ? "Update" : "Create";
    });
  }


  // Method to get a file from path on local machine
  readFileAsBase64(filePath: string, callback: (err: NodeJS.ErrnoException | null, base64?: string) => void): void {
    const absolutePath = path.resolve(filePath);

    fs.readFile(absolutePath, (err, data) => {
      if (err) {
        callback(err);
      } else {
        const base64 = data.toString('base64');
        callback(null, base64);
      }
    });
  }

  onSubmit(): void {
    if (this.submit) {/*
      const aucData = {
        name: form.value.name,
        beforeUpdateCommands: this.currentConfig.beforeUpdateCommands,
        afterUpdateCommands: this.currentConfig.afterUpdateCommands,
        applicationFiles: this.currentConfig.applicationFiles,
        deployOn: {
          type: "VirtualMachineResource",
          earPath: form.value.deployOnEarPath,
          tempPath: form.value.deployOnTempPath,
          backupFolderPath: form.value.deployOnBackupFolderPath,
          virtualMachine: {
            name: form.value.deployOnVmName
          }
        },
        toBeDeployed: {
          type: form.value.ToBeDeployedType,
          url: form.value.ToBeDeployedUrl,
          earPath: form.value.ToBeDeployedEarPath,
          regularExpression: form.value.ToBeDeployedRegularExpression,
          virtualMachine: {
            name: form.value.ToBeDeployedVmName
          }
        }

      };*/

      if (!this.isReadOnly) {

        this.apiUrl = 'http://localhost:8080/app-updater-config/save';

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
        this.apiUrl = 'http://localhost:8080/app-updater-config/update';

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

  onFileSelected(event: Event, base64String: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.encodeFileToBase64(this.selectedFile, base64String);
    }
  }

  encodeFileToBase64(file: File, base64String: string): void {
    const reader = new FileReader();
    reader.onload = () => {
      base64String = (reader.result as string).split(',')[1];
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
