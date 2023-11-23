import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private router:Router) { }

  async checkAuthority() {
    // console.log('check')
    // try {
    //   const response = await axios.get('http://localhost:8080/auth/user/autority', {withCredentials:true});
    //   console.log('authority response: ', response.data)
    //   if (response.data !== 'ADMIN') {
    //     this.redirect('');
    //   }
    // } catch(e) {
    //   try {
    //     await axios.post('http://localhost:8080/auth/refresh', null, {withCredentials:true});
    //     const response = await axios.get('http://localhost:8080/auth/user/autority', {withCredentials:true});
    //     console.log('authority response: ', response.data)
    //     if (response.data !== 'ADMIN')
    //       this.redirect('/home');
    //   } catch(e) {
    //       this.redirect('/home');
    //   }
    // }
  }

  redirect(url:string) {
    this.router.navigate([url]);
  }

}
