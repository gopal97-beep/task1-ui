import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class HttpclientserviceService {

  constructor( public http:HttpClient) { }
  getprofile(){
    return this.http.get<User[]>("http://localhost:3004/profile");
  }
  addprofile(User1){
    return this.http.post<User>("http://localhost:3004/profile",User1);
}
updateprofile(User2,id){
  return this.http.put<User>("http://localhost:3004/profile/"+id,User2);
}




}
