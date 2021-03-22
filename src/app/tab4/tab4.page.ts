import { Component, OnInit, Output } from '@angular/core';
import { CheckSentence } from '../services/checksentence.service';
import { RecordAudio } from '../services/recordaudio.service';
import {FormControl, Form} from '@angular/forms';
import { GoogleObj, Solution } from '../models/solution';
import { SolutionService } from '../services/solution.service';
import { GoogletranslateService } from '../services/googletranslate.service';
// import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {ModalController} from "@ionic/angular"

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})

export class Tab4Page implements OnInit {
  userVoiceText = [];
  voiceActiveSectionDisabled: boolean = true;
	voiceActiveSectionError: boolean = false;
	voiceActiveSectionSuccess: boolean = false;
	voiceActiveSectionListening: boolean = false;
	voiceText: any;
  voiceTextReady: boolean = false;
  currentSentence: string = '';
  sentenceCounter: number = 0;
  score: number = 0;
  langFrom = new FormControl('en');
  guideSentence = 'Practice saying...';
  videoTimeJapanese = ["0,1","2,7", "8,10", "11,12", "13,14", "15,22"];



  videoUrl: SafeResourceUrl;
  videoBase = "../../assets/videos/englishpractice.mp4#t=";
  videoTime = ["1,4","7,11", "14,17", "11,12", "13,14", "15,22"];
  videoCount = 0;

  langTo = new FormControl('en');

  data: Solution = {
    title: '',
    description: '',
    detail: ''
  };

  constructor(private modalCtrl: ModalController, private google: GoogletranslateService , private solution: SolutionService, private recordAudio: RecordAudio, private checkSentence: CheckSentence) {
    this.videoUrl = this.videoBase + this.videoTime[0];
   }
  
  

  convoEnglishCom = ['Hello! It is nice to meet you.', 'Yeah! I have lived here my whole life. Are you new here?', 'No, I actually just moved here 6 months ago.', 'No, I live here alone. My family lives in a different country.', 'Yeah! I live here with my wife and three kids.', 'I have just seen you guys walking the street for the last couple of weeks. What are you doing?'];
  convoEnglishUser = ['Hey! It is nice to meet you too. Are you from around here?', 'Yeah I just got here a few weeks ago. Do you live here with your family?','Yeah! I just moved here. Have you seen missionaries like us before?'];
  //Note that these practice paragraphs in spanish do not have accent marks or double question marks
  computerSentence: string = this.convoEnglishCom[0];
  choiceOne: string = this.convoEnglishUser[0];
  choiceTwo: string = '';
  practiceParagraphBrownAudio = ['../assets/soundFile/Me llamo Benjamin Brown.mp3',
                                '../assets/soundFile/Soy de California, en los Estados Unidos. Este barrio es muy bonito. Cuanto tiempo lleva aqui.mp3',
                                '../assets/soundFile/Como se llama su esposa.mp3',
                                '../assets/soundFile/Tienen hijos.mp3',
                                '../assets/soundFile/Tenemos dos hijos.mp3',
                                '../assets/soundFile/somos misioneros.mp3',
                                '../assets/soundFile/Que sabe de la iglesia.mp3',
                                '../assets/soundFile/le gustaria aprender mas.mp3']
  practiceParagraphNeighborAudio = ['../assets/soundFile/Mucho gusto, mi nombre es Fabrizio Alegre. De donde es usted.mp3',
                                    '../assets/soundFile/Mi esposa y yo vivimos aqui hace cuatro años y nos gusta mucho. Es muy tranquilo y las personas son amigables.mp3',
                                    '../assets/soundFile/Se llama Maria.mp3',
                                    '../assets/soundFile/No, no tenemos hijos.mp3',
                                    '../assets/soundFile/estan aqui por trabajo.mp3',
                                    '../assets/soundFile/si uno de mis amigos es miembro.mp3',
                                    '../assets/soundFile/No mucho.mp3'
                                    ]

  practiceParagraphBrown = ['Buenos dias, soy su nuevo vecino. Me llamo Benjamin Brown!',
                            'Soy de California, en los Estados Unidos. Este barrio es muy bonito. Cuanto tiempo ha vivido aqui?',
                            'Como se llama su esposa?',
                            'Tienen hijos?',
                            'Mi esposa y yo tenemos dos hijos, pero no viven con nostoros ahora; estan en los Estados Unidos.',
                            'En realidad, no. Estamos aqui para compartir un mensaje de Dios y Jesucristo. Somos misioneros de nuestra iglesia. Ha escuchado de La Iglesia de Jesuscristo de los Santos do los Ultimos Dias?',
                            'Que sabe de la Iglesia?', 'Le gustaria aprender mas acerca de nuesta religion?'];
  practiceParagraphNeighbor = ['Mucho gusto, mi nombre es Fabrizio Alegre. De donde es usted?',
                              'Mi esposa y yo vivimos aqui hace cuatro años y nos gusta mucho. Es muy tranquilo y las personas son amigables.',
                              'Se llama Maria.',
                              'No, no tenemos hijos todavia. Y ustedes, cuantos hijos tienen?',
                              'Ustedes estan aqui por trabjo?',
                              'Si. Uno de mis amigos es miembro de esa iglesia.',
                              'No mucho, mi amigo habla poco de religion.'
                            ];

  paragraphArray = [this.practiceParagraphNeighbor, this.practiceParagraphBrown];


  practiceParagraphEnglish = ['Hey how are you?', 'My name is Steven!', 'Do you live around here?']
  testWord1 = 'hows are your?';
  testWord2 = 'how are you?';
  num = this.checkSentence.checkPercent(this.testWord1,this.testWord2);

  ngOnInit(): void {
    this.solution.getSolution().subscribe(res => this.data = res);
    this.translateBtn = document.getElementById('translatebtn');
    console.log(this.translateBtn);
    this.recordAudio.voiceActiveSectionDisabledChanged.subscribe(
      (change: boolean) => this.voiceActiveSectionDisabled = change
    );

    this.recordAudio.userVoiceTextChanged.subscribe(
      (change: any[]) => this.userVoiceText = change
    );

    this.recordAudio.voiceTextReadyChanged.subscribe(
      (change: boolean) => this.voiceTextReady = change
    );

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
    this.voiceTextReady = this.recordAudio.voiceTextReady;
  }

  onStartVoiceRecognition(){
    this.recordAudio.setLanguage(this.langFrom.value);
    this.recordAudio.startVoiceRecognition();
  }

  onCloseVoiceRecognition(){
    this.recordAudio.setLanguage(this.langFrom.value);
    this.recordAudio.closeVoiceRecognition();
  }

  onStart(){
    this.currentSentence = this.practiceParagraphBrown[this.sentenceCounter];
  }
  onCheck(){
    if(this.choiceOne !== ''){
      if(this.choiceTwo !==''){
        this.score =  Math.max(this.checkSentence.checkPercent(this.choiceOne,this.voiceText), this.checkSentence.checkPercent(this.choiceTwo,this.voiceText));
      }
      else {this.score = this.checkSentence.checkPercent(this.choiceOne,this.voiceText);}
    }
    else if (this.choiceTwo !== ''){
      this.checkSentence.checkPercent(this.choiceTwo,this.voiceText);
    }

    // this.score = this.checkSentence.checkPercent(this.,this.voiceText);
    if(this.score > .8){
      this.videoCount +=1;
      this.guideSentence = 'Good Job!'
      this.userVoiceText = [];
      this.recordAudio.clearText();
      this.videoUrl = this.videoBase + this.videoTime[this.videoCount];
      this.sentenceCounter +=1;
      this.computerSentence = this.convoEnglishCom[this.sentenceCounter];
      this.choiceOne = this.convoEnglishUser[this.sentenceCounter];
      this.choiceTwo = this.convoEnglishUser[this.sentenceCounter + 1];
    //   let audio = new Audio();
    //   audio.src = this.practiceParagraphNeighborAudio[this.sentenceCounter -1];
    // audio.load();
    // audio.play();
    }
    else if(this.score < .8){
      this.guideSentence = 'Try again :)'
    }
    if(this.practiceParagraphBrownAudio.length === this.sentenceCounter){
      this.guideSentence = 'You are done! Good job!';
    }
  }

  onListenToSentence(){
    let audio = new Audio();
    audio.src = this.practiceParagraphBrownAudio[this.sentenceCounter];
    audio.load();
    audio.play();
  }

  onListenAgain(){
    let audio = new Audio();
    audio.src = this.practiceParagraphNeighborAudio[this.sentenceCounter -1];
    audio.load();
    audio.play();
  }

  private translateBtn: any;

  send(paragraphSel: string) {

    if(paragraphSel === 'userAudio'){
      paragraphSel = this.voiceText;
      console.log(paragraphSel);
    }
    else if(paragraphSel === 'brown'){
      paragraphSel = this.practiceParagraphBrown[this.sentenceCounter];
      console.log(paragraphSel);

    }
    else if(paragraphSel === 'neighbor'){
      paragraphSel = this.practiceParagraphNeighbor[this.sentenceCounter -1];
      console.log(paragraphSel);

    }
    else{
      paragraphSel = 'Could not translate';
      console.log(paragraphSel);
    }

    const googleObj: GoogleObj = {
      q: [paragraphSel, this.data.description, this.data.detail],
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
}
