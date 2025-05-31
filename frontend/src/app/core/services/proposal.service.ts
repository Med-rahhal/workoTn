import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProposalService {

  private url = 'http://127.0.0.1:5000/proposals/';

  constructor(private http: HttpClient) {}
  
  create( proposal: any ){
    return this.http.post( this.url + 'create' , proposal );
  }

  getProposalsByServiceId(id: any){
    return this.http.get(this.url + 'byServiceId/' + id);
  }

  getProposalsByUserId(id: any){
    return this.http.get(this.url + 'byUserId/' + id);
  }

  deleteProposal(id: any){
    return this.http.delete(this.url + 'deletProposal/' +id);
  }

  acceptProposal(id: any){
    return this.http.put( this.url + 'accept/' + id , {} )
  }

}

