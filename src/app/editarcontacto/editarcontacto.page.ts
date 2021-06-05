import { Component, OnInit } from '@angular/core';

import {NavController,LoadingController,ToastController} from '@ionic/angular';
import {ActivatedRoute, Router, ParamMap, Params} from '@angular/router';

import {Contacto} from '../../app/contacto';

import {ContactosService} from '../services/contactos.service';

@Component({
  selector: 'app-editarcontacto',
  templateUrl: './editarcontacto.page.html',
  styleUrls: ['./editarcontacto.page.scss'],
})
export class EditarcontactoPage implements OnInit {

  id:any;
  contacto:Contacto;
  seleccionado: Contacto;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastCtrl: ToastController,
    private nav: NavController,
    private loadingController: LoadingController,
    private contactosService: ContactosService
  ) { }

  ngOnInit() {
    this.route.params.forEach((params:Params)=>{
      this.contactosService.getContacto(params['id'])
      .subscribe(seleccionado => {
        this.seleccionado = seleccionado;
      });
    });
  }

  regresar():void{
    this.router.navigate(['tabs/contactos'])
  }

  editar(): void{
    this.contactosService.editarContacto(this.seleccionado).then(()=>{
      this.showToast('Contacto actualizado');
    }, err=>{
      this.showToast('Problema al actualizar');
    });
    this.regresar();
  }

  showToast(msg){
    this.toastCtrl.create({
      message:msg,
      duration:2000
    }).then(toast => toast.present());
  }
}
