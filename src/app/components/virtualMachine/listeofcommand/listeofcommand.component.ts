import { Component } from '@angular/core';
import { Command } from '../../../model/Command';
import { ActivatedRoute } from '@angular/router';
import { VmserviceService } from '../../../services/vmservice.service';

@Component({
  selector: 'app-listeofcommand',
  templateUrl: './listeofcommand.component.html',
  styleUrl: './listeofcommand.component.css'
})
export class ListeofcommandComponent {
  name: any | null;
  vm: { commands: Command[] } = { commands: [] };


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
  
  executeCommand(command: Command) {
    this.apiService.executeCommand(this.name,command).subscribe(
      (response) => {
        console.log('Command executed successfully:', response);
        // Optionally show success message to user
      },
      (error) => {
        console.error('Error executing command:', error);
        // Handle error, e.g., show error message to user
      }
    );
  }
}

