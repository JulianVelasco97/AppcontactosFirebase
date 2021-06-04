import { Component, OnInit } from '@angular/core';
//funciones de toastController para poder hacer notificaciones
import {NavController,LoadingController,ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
//importamos la clase donde definimos la estructura de los datos contacto
import {Contacto} from '../../app/contacto';
//importamos el servicio de conexion con la base de datos
import {ContactosService} from '../services/contactos.service';

@Component({
  selector: 'app-nuevocontacto',
  templateUrl: './nuevocontacto.page.html',
  styleUrls: ['./nuevocontacto.page.scss'],
})
export class NuevocontactoPage implements OnInit {

  nuevoContacto ={} as Contacto[];//se utilizara para el datasing en el formulario

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastCtrl: ToastController, //agregamos notificaciones
    private nav: NavController,
    private loadingController: LoadingController,
    private contactosService:ContactosService //comunicacion con la base de datos
    ) { }

  ngOnInit() {
  }
  //metodo para crear registro en la bd
  nuevo(nuevoContacto){
    this.mostrarMensaje('Guardado...');
    this.contactosService.crearNuevo(nuevoContacto).then(()=>{
      this.router.navigateByUrl('tabs/contactos');
      this.mostrarMensaje('Contacto registrado');
    }, err =>{
      this.mostrarMensaje('Hubo un error :(');
    });
  }

  mostrarMensaje(mensaje){
    this.toastCtrl.create({
      message:mensaje,
      duration:2000
    }).then(toast => toast.present());
  }

}
