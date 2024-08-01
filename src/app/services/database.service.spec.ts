import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ListDatabaseComponent } from '../components/dataBase/list-database/list-database.component';
import { DatabaseService } from './database.service';

describe('ListDatabaseComponent', () => {
  let component: ListDatabaseComponent;
  let fixture: ComponentFixture<ListDatabaseComponent>;
  let httpMock: HttpTestingController;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ListDatabaseComponent],
      providers: [DatabaseService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDatabaseComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    databaseService = TestBed.inject(DatabaseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch databases', () => {
    const mockDatabases = [
      { alias: 'db1', host: 'localhost', name: 'testdb1', password: 'pass1', port: 3306, type: 'MySQL', user: 'user1' },
      { alias: 'db2', host: 'localhost', name: 'testdb2', password: 'pass2', port: 3306, type: 'MySQL', user: 'user2' }
    ];

    component.loadDatabases();
    
    const req = httpMock.expectOne('http://localhost:8081/api/databases');
    expect(req.request.method).toBe('GET');
    req.flush(mockDatabases);

    fixture.detectChanges();
    expect(component.databases).toEqual(mockDatabases);
  });
});
