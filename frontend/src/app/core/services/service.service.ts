import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {

  private url = 'http://127.0.0.1:5000/services/';

  constructor(private http: HttpClient) {}

  create(service: any){
    return this.http.post( this.url + 'create'  , service );
  }

  getServices(){
    return this.http.get( this.url+ 'getAllServ' );
  }

  getServiceById( id: any ){
    return this.http.get( this.url + 'getById/'+ id );
  }

  getMyServices( id: any ){
    return this.http.get( this.url + 'getMyserv/' + id );
  }


  deleteService( id: any ){
    return this.http.delete( this.url + 'deleteServ/' + id );
  }
}
