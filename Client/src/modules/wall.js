import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from 'aurelia-auth';
import { Chirps } from '../resources/data/chirps';
import { Users } from '../resources/data/users';



import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules
} from 'aurelia-validation';

@inject(Router, AuthService, Chirps, Users)
export class Wall {

  constructor(router, auth, chirps, users) {
    this.router = router;
    this.auth = auth;
    this.chirps = chirps;
    this.message = 'Chirps';
    this.wallMessage = "";
    this.saveStatus = "";
    this.newChirp;
    this.users = users;
    this.notMe = false;
    this.searchScreenName = ''
    this.userscreenname = ''
  }


  logout() {
    sessionStorage.removeItem('user');
    this.auth.logout();
  }
 // home() {
  //  this.router.navigate('wall');
 //   this.activate();
  //  this.notMe = false;
  //  this.searchScreenName = '';
async home(){
    this.notMe = false;
    await this.chirps.getUsersChirps(this.user._id);
    this.users.setUser(this.user);
    this.searchScreenName = ''


  }

    // this.searchScreenName = 'Screen Name';
  //}
  //  activate() {
  //   this.user = JSON.parse(sessionStorage.getItem('user'));
  //}

  async chirp() {
    if (this.newChirp) {
      var chirp = {
        chirp: this.newChirp,
        user: this.user._id,
        chirpAuthor: this.user._id
      }
      let serverResponse = await this.chirps.saveChirp(chirp);
      if (serverResponse && !serverResponse.error) {
        this.newChirp = "";
        this.saveStatus = "";
        this.chirps.chirpArray[0].chirpAuthor = new Object();
        //this.chirps.chirpArray[0].chirpAuthor.email = { email: this.user.email };
         this.chirps.chirpArray[0].chirpAuthor.email = this.user.email;
         this.chirps.chirpArray[0].chirpAuthor.screenName = this.user.screenName;
      } else {
        this.saveStatus = "Error saving chirp";
      }
    }
  }


//  async follow() {

//    let serverResponse = await this.users.getPersonScreenName(this.searchScreenName);
 //   this.notMe = true;
 //   if (serverResponse && !serverResponse.error) {
  //    let response = await this.users.followUser(this.user._id, serverResponse._id);
  //    if (response.error) {
   //     this.wallMessage = "Error following user";
  ///    }
   // }
  //}

async follow(){
    await this.users.followUser(this.user._id, this.users.selectedUser._id);
  }




  async activate() {
    
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.users.setUser(this.user);

    let serverResponse = await this.chirps.getUsersChirps(this.user._id);
    if (serverResponse.error) {
      this.wallMessage = "Error retrieving chirps";
    }
  }




  async findUser() {
    let serverResponse = await this.users.getPersonScreenName(this.searchScreenName);
    this.notMe = true;
    if (serverResponse && !serverResponse.error) {
      let response = await this.chirps.getUsersChirps(serverResponse._id);
      this.users.setUser(serverResponse);
      if (response.error) {
        this.wallMessage = "Error retrieving chirps";
      }
    }
  }

  like(index) {
    this.chirps.like(this.chirps.chirpArray[index]._id);
    this.chirps.chirpArray[index].likes++;
  }

  async reChirp(chirp) {
    var newChirp = {
      chirp: chirp.chirp,
      //user: chirp.user,
      user: this.user._id,

      reChirp: true,
     chirpAuthor: chirp.user
    //  chirpAuthor: this.user._id
    };


    let serverResponse = await this.chirps.saveChirp(newChirp);
    if (serverResponse && !serverResponse.error) {
      this.saveStatus = "";
   //   this.chirps.chirpArray[0].chirpAuthor = new Object();
  //    this.chirps.chirpArray[0].chirpAuthor = { email: this.user.email };
     //      this.chirps.chirpArray[0].chirpAuthor.email = chirp.user.email;
    //     this.chirps.chirpArray[0].chirpAuthor.screenName = chirp.user.screenName;
    } else {
      this.saveStatus = "Error saving chirp";
    }
  }




}
