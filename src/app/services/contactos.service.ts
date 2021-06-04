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
}
