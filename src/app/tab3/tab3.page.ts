import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoOptions, VideoPlayer } from '@ionic-native/video-player/ngx';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { Tab4Page } from '../tab4/tab4.page';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],

})
export class Tab3Page {
  public videourl = '';
  // videoOpts : VideoOptions ;

  // constructor(
  //   public navCtrl: NavController,
  //   private videoPlayer: VideoPlayer) {}

              //constructor
  // constructor(private videoPlayer: VideoPlayer,
  //             public modalCtrl: ModalController,
  //             public navParams: NavParams,
  //             public sanitizer: DomSanitizer)
  //             {
  //               console.log(' this.navParams', this.navParams.data.url)
  //                 this.videourl = this.navParams.data.url
  //               console.log(this.videourl)}

  constructor(
    private videoPlayer: VideoPlayer,
    public modalCtrl: ModalController,
    public sanitizer: DomSanitizer)
    {
      this.videourl = "https://www.youtube.com/embed/FM9_kTF0T9A";
    }


  // public playVideo() {
  //   this.videoOpts = {volume : 1.0 };
  //   this.videoPlayer.play('..\assets\videos\002ClayPotter.mpeg').then(() => {
  //   console.log('video completed');
  //   }).catch(err => {
  //   console.log(err);
  //   });
  // }
  // public stopPlayingVideo() {
  //   this.videoPlayer.close();
  // }


  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: Tab4Page,
    });
    return await modal.present();
  }

  // playVideoHosted() {
  //   this.videoPlayer.play('https://www.youtube.com/embed/FM9_kTF0T9A?start=200').then(() => {
  //   console.log('video completed');
  //   }).catch(err => {
  //   console.log(err);
  //   });
  // }

  // dismiss(){
  //   this.modalCtrl.dismiss();
  // }

}
