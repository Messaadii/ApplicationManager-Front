import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pid } from 'process';
import { catchError, Observable, throwError } from 'rxjs';
import { Command } from '../model/Command';
import { VirtualMachine } from '../model/virtualMachine';

@Injectable({
  providedIn: 'root'
})


export class VmserviceService {
private apiUrl = 'http://localhost:8080/virtual-machine';


constructor(private http: HttpClient) { }
getlistactivejavaprocesses(name: String){
  return this.http.get<any>(`${this.apiUrl}/list-active-java-processes/${name}`).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.error instanceof ErrorEvent) {
        // Client-side error occurred, handle accordingly
        console.error('An error occurred:', error.error.message);
      } else {
        // Backend returned an unsuccessful response code
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // Return an observable with a user-facing error message
      return throwError('Something bad happened; please try again later.');
    })
  );
}
 
killVm(name: string, pid: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/killprocess/${name}/${pid}`, {});
}
findByName(name: string) {
  return this.http.get<any>(`${this.apiUrl}/Findbyname/${name}`);
}

executeCommand(name: any, command: Command): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/execute/${name}`, command);
}
saveVirtualMachine(virtualMachine: VirtualMachine): Observable<VirtualMachine> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post<VirtualMachine>(this.apiUrl, virtualMachine, { headers: headers });
}
}


