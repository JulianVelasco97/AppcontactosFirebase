import { Component, OnInit } from '@angular/core';

import {NavController, LoadingController, ToastController, ActionSheetController, AlertController} from '@ionic/angular';
import {ActivatedRoute,Router} from '@angular/router';
import {Contacto} from '../../app/contacto';
//importamos el servicio de conexion con la base de datos
import {ContactosService} from '../services/contactos.service';

import {Observable} from 'rxjs';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {
  //creamos la propiedad cibtactos que recibira los registros devueltos por la base de datos
  private contactos:Observable<Contacto[]>;
  //instanciamos el servicio de conexion con la base de datos
  constructor(
    private contactosService : ContactosService,
    private actionSheetCtrl:ActionSheetController,
    private alertCtrl:AlertController,
    private route: ActivatedRoute, private router:Router
    ) {}

  ngOnInit() {
  }

  ionViewDidEnter(){
    //al cargar buscamos la lista de contactos desde el servicio
    this.contactos=this.contactosService.getContactos();
  }

  async selectContacto(contacto:any){
    let actionsheet = await this.actionSheetCtrl.create({
      header: "Que desea hacer?",
      buttons:[
        {
          text:'Borrar contacto',
          role:'destructive',
          handler:() =>{
            this.borrar(contacto);
          }
        },{
          text:'Modificar contacto',
          handler:() =>{
            this.editar(contacto);
          }
        },{
          text:'Cancelar',
          role:'cancel',
          handler:() =>{
            console.log('cancel clicked');
          }
        }
      ]
    });
    await actionsheet.present();
  }
  async borrar(contacto:any){
    const alert=await this.alertCtrl.create({
      header:'Borrar',
      message: 'Esta seguro que desea borrar este contacto?',
      buttons:[
        {
          text:'No',
          role:'cancel',
          cssClass:'secondary',
          handler:(blah)=>{
            console.log('confirm Cancel: blah');
          }
        },{
          text:'Si',
          handler:()=>{
            this.contactosService.borrarContacto(contacto);
          }
        }
      ]
    });
    await alert.present();
  }

  async editar(contacto:any){
    this.router.navigate(['tabs/editarcontacto',contacto]);
  }

}
