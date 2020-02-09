import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { switchMap, shareReplay, tap, map } from 'rxjs/operators';

import { User } from 'firebase/app';

import { firebaseCollections } from '@app/core/configs/firebase.collection';

import { UserProfile } from '../../models';
import { Router } from '@angular/router';
import { NotificationMessageService } from '../notification';

import { auth } from 'firebase/app';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userProfile$: Observable<UserProfile>;
  isAdmin$ = new BehaviorSubject<boolean>(false);
  loginLoading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private notificationService: NotificationMessageService,
    private afFunctions: AngularFireFunctions
  ) {
    this.userProfile$ = this.afAuth.authState.pipe(
      switchMap(user => (user ? this.getUserProfile(user) : of(null))),
      tap(async () => {
        this.isAdmin$.next(await this.getAdminStatus());
      })
    );
  }

  googleSignIn() {
    console.log('login-loading', 'Google Sign-in Started');
    this.loginLoading$.next(true);
    const provider = new auth.GoogleAuthProvider();
    this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: any): Promise<boolean | void> {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        const user: UserProfile = {
          uid: credential.user.uid,

          contact: {
            email: credential.user.email
          },

          photoURL: credential.user.photoURL,
          displayName: credential.user.displayName
        };

        this.updateUserData(user);

        return (
          this.router.navigate(['/']),
          this.loginLoading$.next(false),
          this.notificationService.create({
            title: `Erfolgreich angemeldet.`
          })
        );
      })
      .catch(error => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
    this.loginLoading$.next(true);
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.notificationService.create({
          title: `Erfolgreich angemeldet.`
        });

        return this.router.navigate(['/']);
      })
      .catch(error => this.handleError(error))
      .finally(() => this.loginLoading$.next(false));
  }

  updateUserData(userProfile: UserProfile): Promise<void> {
    return this.db
      .collection<UserProfile>(firebaseCollections.users)
      .doc(userProfile.uid)
      .set(userProfile, { merge: true });
  }

  promoteUser(email: string, role: string) {
    const calledFtn = this.afFunctions.httpsCallable('validateEmployee');
    return calledFtn({ email, role }).subscribe(result =>
      console.log('RECEIVED', result)
    );
  }

  emailSignUp(userData: UserProfile, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(userData.contact.email, password)
      .then(async (credential: auth.UserCredential) => {
        // Get IDs for deletion and creation
        const oldId = userData.uid;
        const newId = credential.user.uid;

        const updateFunction = this.afFunctions.httpsCallable(
          'connectAuthToDatabaseEntry'
        );
        updateFunction({
          oldId,
          newId,
          email: userData.contact.email
        }).subscribe(console.log);

        // Update AUth Profile and send mail
        await credential.user.updateProfile({
          displayName: userData.name.full
        });
        // credential.user.sendEmailVerification();

        // Create notification
        this.notificationService.create({
          title: `Willkommen ${userData.name.first}, bitte bestätige deine E-Mail-Adresse.`
        });

        return credential;
      })
      .catch(error => this.handleError(error));
  }

  resendPassword(email: string): Promise<void> {
    return this.afAuth.auth
      .sendPasswordResetEmail(email)
      .then(() =>
        this.notificationService.create({
          title: `E-Mail an ${email} erfolgreich verschickt. Bitte prüfe dein Postfach.`
        })
      )
      .catch(error => this.handleError(error));
  }

  signOut(): Promise<void> {
    return this.afAuth.auth
      .signOut()
      .then(() => {
        this.notificationService.create({
          title: 'Erfolgreich abgemeldet.'
        });
        this.router.navigate(['/auth']);
      })
      .catch(error => this.handleError(error));
  }

  private getUserProfile(user: User): Observable<UserProfile> {
    return this.db
      .collection<UserProfile>(firebaseCollections.users)
      .doc<UserProfile>(user.uid)
      .valueChanges()
      .pipe(
        tap(userData => (userData.uid = user.uid)),
        shareReplay(1)
      );
  }

  private async getAdminStatus(): Promise<boolean> {
    return this.afAuth.auth.currentUser
      ? Boolean(
          (await this.afAuth.auth.currentUser.getIdTokenResult()).claims.admin
        )
      : false;
  }

  private handleError(error: Error) {
    console.error(error);
    this.notificationService.create({
      title: error.message
    });
  }
}
