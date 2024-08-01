import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../../../services/database.service';
import { Database } from '../../../model/database';

@Component({
  selector: 'app-list-database',
  templateUrl: './list-database.component.html',
  styleUrls: ['./list-database.component.css']
})
export class ListDatabaseComponent implements OnInit {
  databases: Database[] = [];

  constructor(private databaseService: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    this.loadDatabases();
  }

  loadDatabases(): void {
    this.databaseService.getDatabases().subscribe(
      (data: Database[]) => this.databases = data,
      error => console.error(error)
    );
  }

  deleteDatabase(alias: string): void {
    this.databaseService.deleteDatabase(alias).subscribe(
      () => {
        this.databases = this.databases.filter(db => db.alias !== alias);
      },
      error => console.error(error)
    );
  }

  addDatabase(): void {
    this.router.navigate(['/database/create']);
  }

  editDatabase(alias: string): void {
    this.router.navigate(['/database/update', alias]);
  }
  onExecuteScript() {
    this.router.navigate(['/execute-script']);
  }
}
