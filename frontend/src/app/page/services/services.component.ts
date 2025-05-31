import { Component,OnInit } from '@angular/core'; 
import { ServiceService } from '../../core/services/service.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterModule,CommonModule], 
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {

  services: any[]=[];

  constructor( private _service: ServiceService ){}


  ngOnInit() {
    
    this._service.getServices().subscribe({
      next: (res:any)=>{
        this.services = res;
        console.log(this.services)
      }
    })

  }

}

