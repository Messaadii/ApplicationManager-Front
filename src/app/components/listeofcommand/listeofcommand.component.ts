import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VmserviceService } from '../../services/vmservice.service';
import { Command } from '../../model/Command';
import { pid } from 'process';
import { PipelineDestinationPromiseFunction } from 'stream';

@Component({
  selector: 'app-listeofcommand',
  templateUrl: './listeofcommand.component.html',
  styleUrl: './listeofcommand.component.css'
})
export class ListeofcommandComponent {
  name: any | null;
  vm: { commands: Command[] } = { commands: [] };
  command: Command = {
    command: '',
    runAsRoot: false,
    isEditMode: false,


  }; // As


  constructor(
    private route: ActivatedRoute,
    private apiService: VmserviceService
  ) {


  }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: { get: (arg0: string) => any; }) => {
      const name = params.get('name');
      if (name) {
        this.name = name;
        this.commandsview();
      } else {
        console.error('Virtual machine name is not defined in the route');
      }
    });
  }

  commandsview(): void {
    if (this.name) {
      this.apiService.findByName(this.name).subscribe(
        (vm: any) => {
          this.vm = vm;
          console.log(this.vm); // Check if commands are fetched correctly
        },
        (error: any) => {
          console.error('Error loading commands:', error);
        }
      );
    }
  }

  executeCommand(id: any) {
    this.apiService.executeCommand(this.name, id).subscribe(

      (response: any) => {
        console.log(this.name);

        console.log('Command executed successfully:', response);
        // Optionally show success message to user
      },
      (error: any) => {
        console.error('Error executing command:', error);
        // Handle error, e.g., show error message to user
      }
    );
  }


}