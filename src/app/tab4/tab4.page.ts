import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import {SolutionService} from '../services/solution.service';
import {Solution, GoogleObj} from '../models/solution';
import {GoogletranslateService} from '../services/googletranslate.service';
import {Form, FormControl} from '@angular/forms';
import {CheckSentence} from '../services/checksentence.service';
import { RecordAudio } from '../services/recordaudio.service';
import { ModalController } from '@ionic/angular';

declare const annyang: any;


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  @ViewChild('audioOption') audioPlayerRef: ElementRef;
  videoUrl: string;
  videoBase = "../../assets/videos/conversationJP.mp4#t=";
  videoTime = ["0,1","2,7", "8,10", "11,12", "13,14", "15,22"];
  videoCount = 0;

  onAudioPlay(){
    this.audioPlayerRef.nativeElement.play();
  }


	voiceActiveSectionDisabled: boolean;
	voiceActiveSectionError: boolean = false;
	voiceActiveSectionSuccess: boolean = false;
	voiceActiveSectionListening: boolean = false;
	voiceText: any;
	langFrom = new FormControl('en');
  score = 0;

  constructor(
    private modalCtrl: ModalController,
    private recordAudio: RecordAudio,
    private checkSentence: CheckSentence,
    private ngZone: NgZone,
    private solution: SolutionService,
    private google: GoogletranslateService)
    {
      this.videoUrl = this.videoBase + this.videoTime[0];
      this.voiceActiveSectionDisabled = true;
    }

    close() {
      this.modalCtrl.dismiss();
    }
    //When click button, video starts next conversation
    goNext() {
      console.log("work");
      this.videoCount++;
      this.videoUrl = this.videoBase + this.videoTime[this.videoCount];
    }

  //Start and stop recording
  onStartVoiceRecognition(){
    // this.voiceActiveSectionDisabled = !this.voiceActiveSectionDisabled;
    this.recordAudio.setLanguage(this.langFrom.value);
    this.recordAudio.startVoiceRecognition();
  }

  onCloseVoiceRecognition(){
    this.recordAudio.setLanguage(this.langFrom.value);
    this.recordAudio.closeVoiceRecognition();
  }

//Check if user has said the sentence correctly, if so move to next senentce

//Google API, move to better location later
langTo = new FormControl('en');
  data: Solution = {
    title: '',
    description: '',
    detail: ''
  };


onCheckScore(a, b){
  this.score = this.checkSentence.checkPercent(a, b);
  console.log(this.data.title)

}
  private translateBtn: any;

  ngOnInit() {
    this.solution.getSolution().subscribe(res => this.data = res);
    this.translateBtn = document.getElementById('translatebtn');
      // this.recordAudio.voiceActiveSectionDisabledChanged.subscribe(
      //   (change: boolean) => this.voiceActiveSectionDisabled = change
      // );

      this.recordAudio.voiceActiveSectionSuccessChanged.subscribe(
        (change: boolean) => this.voiceActiveSectionSuccess = change
      );

      this.recordAudio.voiceActiveSectionErrorChanged.subscribe(
        (change: boolean) => this.voiceActiveSectionError = change
      );

      this.recordAudio.voiceActiveSectionListeningChanged.subscribe(
        (change: boolean) => this.voiceActiveSectionListening = change
      );

      this.recordAudio.voiceTextChanged.subscribe(
        (change: any) => this.voiceText = change
      );

      this.voiceActiveSectionDisabled = this.recordAudio.voiceActiveSectionDisabled;
      this.voiceActiveSectionError = this.recordAudio.voiceActiveSectionError;
      this.voiceActiveSectionSuccess = this.recordAudio.voiceActiveSectionSuccess;
      this.voiceActiveSectionListening = this.voiceActiveSectionListening;
      this.voiceText = this.recordAudio.voiceText;

  }

   send() {
    const googleObj: GoogleObj = {
      q: [this.voiceText, this.data.description, this.data.detail],
      target: this.langTo.value
    };

    this.translateBtn.disabled = true;


    this.google.translate(googleObj).subscribe(
      (res: any) => {
        this.translateBtn.disabled = false;
        this.data = {
          title: res.data.translations[0].translatedText.replace(/&#39;/g, "'"),
          // title: res.data.translations[0].translatedText,
        	description: res.data.translations[1].translatedText,
        	detail: res.data.translations[2].translatedText
        };
        console.log(this.data);
      },
      err => {
        console.log(err);
      }
    );
  }

  playAudio(){
    let audio = new Audio();
    audio.src = "../assets/soundFile/Me llamo Benjamin Brown.mp3";

    audio.load();
    audio.play();
  }
  // this.playAudio();

  onReply() {

  }


}
