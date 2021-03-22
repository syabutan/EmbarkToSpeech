import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import {SolutionService} from './services/solution.service';
import {Solution, GoogleObj} from './models/solution';
import {GoogletranslateService} from './services/googletranslate.service';
import {Form, FormControl} from '@angular/forms';
import {CheckSentence} from './services/checksentence.service';
import { RecordAudio } from './services/recordaudio.service';

declare const annyang: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],

})
export class AppComponent {
  constructor() {}
}
