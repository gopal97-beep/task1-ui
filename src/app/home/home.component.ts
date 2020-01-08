import { Component, OnInit } from '@angular/core';
import { HttpclientserviceService } from '../httpclientservice.service';
import { User } from '../user';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user:User[]
  user1:User
  username:string
  closeResult: string;
  username1:string;
  email:string;
  phone:number;
  constructor(private httpservice:HttpclientserviceService,private modalService: NgbModal) { }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.httpservice.getprofile().subscribe((data)=>this.user=data)
  }
  Search(){
    if(this.username!=""){
      this.user=this.user.filter(res=>{
        return res.username.toLocaleLowerCase().match(this.username.toLocaleLowerCase())
      })
    }else if(this.username==""){
      this.ngOnInit();
    }
    console.log(this.user)
    
  }
  submit(){
    this.user1=new User(this.username1,this.email,this.phone)
    this.httpservice.addprofile(this.user1).subscribe(data=>console.log(data));
    
  }
}
