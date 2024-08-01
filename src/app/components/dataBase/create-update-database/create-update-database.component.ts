// create-update-database.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../../../services/database.service';
import { Database } from '../../../model/database';

@Component({
  selector: 'app-create-update-database',
  templateUrl: './create-update-database.component.html',
  styleUrls: ['./create-update-database.component.css']
})
export class CreateUpdateDatabaseComponent implements OnInit {
  databaseForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private databaseService: DatabaseService
  ) {
    this.databaseForm = this.fb.group({
      alias: ['', Validators.required],
      host: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      port: ['', Validators.required],
      type: ['', Validators.required],
      user: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const alias = this.route.snapshot.paramMap.get('alias');
    if (alias) {
      this.isEditMode = true;
      this.databaseService.getDatabases().subscribe(databases => {
        const database = databases.find(db => db.alias === alias);
        if (database) {
          this.databaseForm.setValue({
            alias: database.alias,
            host: database.host,
            name: database.name,
            password: database.password,
            port: database.port,
            type: database.type,
            user: database.user
          });
        }
      });
    }
  }

  onSubmit(): void {
    if (this.databaseForm.valid) {
      const database: Database = this.databaseForm.value;
      if (this.isEditMode) {
        this.databaseService.updateDatabase(database.alias, database).subscribe(() => this.router.navigate(['/databases']));
      } else {
        this.databaseService.createDatabase(database).subscribe(() => this.router.navigate(['/databases']));
      }
    }
  }
}
