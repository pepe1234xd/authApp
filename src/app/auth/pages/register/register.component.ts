import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 
  miFormulario:FormGroup = this.fb.group({
    name:['',[Validators.required, Validators.minLength(6)]],
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder, private router:Router, private authService:AuthService){}

  register(){
    const {name, email, password}= this.miFormulario.value;

    this.authService.registro(name, email,password)
    .subscribe(ok =>{
      if(ok===true){
        this.router.navigateByUrl('/auth');
        Swal.fire('Registrado', 'Favor de iniciar sesion','success');
      } else{
        Swal.fire('Error', ok,'error',);
      }
    });
}
}