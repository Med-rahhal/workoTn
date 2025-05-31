import { Component } from '@angular/core';
import { ServiceService } from '../../core/services/service.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProposalService } from '../../core/services/proposal.service';
import { UserService } from '../../core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './services-details.component.html',
  styleUrl: './services-details.component.css'
}) 
export class ServicesdetailsComponent {

  id: any;
  service: any;

  proposalForm: FormGroup;

  proposals: any;


  constructor( private _service: ServiceService, private _act: ActivatedRoute, private fb: FormBuilder, private _proposal: ProposalService, private _user: UserService ){

    let controls = {
      price: new FormControl('', [Validators.required]),   
      days: new FormControl('', [Validators.required]),   
      cover: new FormControl('', [Validators.required]),   
      
    }

    this.proposalForm = fb.group(controls)

  }


  ngOnInit(): void {
    
    this.id = this._act.snapshot.paramMap.get('id');
    this.getServiceProposals();
    this._service.getServiceById(this.id).subscribe({
      next:(res)=>{
        this.service = res;
      }
    })

  }

  scroll(){
    window.scroll(0, 800);
  }


  getServiceProposals(){

    this._proposal.getProposalsByServiceId(this.id).subscribe({
      next: (res)=>{
        this.proposals = res;
        console.log(this.proposals);
        
      }
    })

  }


  send(){

    let data = {
      ...this.proposalForm.value,
      idUser: this._user.getUserIdFromToken(),
      idService: this.id
    }

    this._proposal.create( data ).subscribe({
      next: (res)=>{
        this.getServiceProposals();
        this.proposalForm.reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your proposal has been saved",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })

  }
}
