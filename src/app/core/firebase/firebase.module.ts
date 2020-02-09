import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from '@env/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule
  ],
  exports: [AngularFireAuthGuardModule]
})
export class FirebaseModule {}
