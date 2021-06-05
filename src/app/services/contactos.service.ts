import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, 
  AngularFirestoreDocument,DocumentReference} from '@angular/fire/firestore';
import {map,take} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {Contacto} from '../../app/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  private contactos: Observable<Contacto[]>;
  private contactosCollection: AngularFirestoreCollection<Contacto>;
  
  constructor(private afs:AngularFirestore) {
    this.contactosCollection = this.afs.collection<Contacto>('contactos');
    this.contactos = this.contactosCollection.snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id =a.payload.doc.id;
          return{id,...data};
        });
      })
    );
   }

   crearNuevo (contacto:Contacto): Promise<DocumentReference>{
     console.log(contacto);
     return this.contactosCollection.add(contacto);
   }

   getContactos(): Observable<Contacto[]>{
     return this.contactos;
   }

   borrarContacto(contacto:any){
     this.afs.doc(`contactos/${contacto}`).delete().then(()=>{
       console.log(`contacto eliminado: "${contacto}"`);
     }).catch(err=>{
       console.error(err);
     })
   }

   getContacto (id:string):Observable<Contacto>{
     return this.contactosCollection.doc<Contacto>(id).valueChanges().pipe(
       take(1),
       map(contacto=>{
         contacto.id = id;
         return contacto
       })
     );
   }

   editarContacto(contacto:Contacto): Promise <void>{
     return this.contactosCollection.doc(contacto.id).update(
       {nombre: contacto.nombre,
        apellido: contacto.apellido,
        empresa: contacto.empresa,
        telefono: contacto.telefono,
        correo: contacto.correo});
   }
}
