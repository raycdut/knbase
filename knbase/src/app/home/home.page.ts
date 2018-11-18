import { Component, ViewChild } from '@angular/core';
import { Answer } from '../model/answer';
import { ToastController } from '@ionic/angular';

import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { Http } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs-compat/Observable';
import { Constants } from '../model/constants';

const MEDIA_FILES_KEY = 'mediaFiles';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  question: string;
  answerList: Answer[];
  answerGot: boolean;
  apiRoot = 'http://13.75.68.6:5000/api/v1/getSimilarity';
  similarity: number[];
  similarityResult: string;

  constructor(public toastController: ToastController, private http: Http, private httpClient: HttpClient) { }

  getAnswer() {
    if (this.question) {
      this.presentToast('Get answer for: ' + this.question);
      this.answerGot = true;
      if (!this.answerList) {
        const i: number = this.similarity.indexOf(Math.max(...this.similarity));
        this.answerList = [{ title: 'Answer', content: this.getAnswerById(i) }];
      }
    } else {
      this.presentToast('Please input the question.');
    }
  }

  getSimilarity(question: string) {

    this.presentToast('Get similarity for: ' + this.question);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const requestOptions = {
      params: new HttpParams().set('ques', question),
      // headers: new HttpHeaders(headers)
    };
    this.httpClient.get(`${this.apiRoot}`, {
      params: new HttpParams().set('ques', question),
      headers: headers
    }).subscribe(data => {
      console.log(data);
      this.similarity = JSON.parse(JSON.stringify(data));
      this.similarityResult = JSON.stringify(data);
    }, (error) => {
      console.log('Error');
      // this.similarityResult = Constants.ANSWERS[0];
      this.answerList = [{ title: 'Answer', content: this.getAnswerById(1) }];
    });
  }

  getAnswerById(id: number): string {
    if (id > 0 && id <= 3) {
      return Constants.ANSWERS[0];
    } else if (id > 3 && id <= 7) {
      return Constants.ANSWERS[1];
    } else if (id > 7 && id <= 14) {
      return Constants.ANSWERS[2];
    } else if (id > 14 && id <= 20) {
      return Constants.ANSWERS[3];
    } else {
      return '';
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  // ionViewDidLoad() {
  //   this.storage.get(MEDIA_FILES_KEY).then(res => {
  //     this.mediaFiles = JSON.parse(res) || [];
  //   });
  // }

  // captureAudio() {
  //   this.mediaCapture.captureAudio().then(res => {
  //     this.storeMediaFiles(res);
  //   }, (err: CaptureError) => console.error(err));
  // }

  // storeMediaFiles(files) {
  //   this.storage.get(MEDIA_FILES_KEY).then(res => {
  //     if (res) {
  //       let arr = JSON.parse(res);
  //       arr = arr.concat(files);
  //       this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
  //     } else {
  //       this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files));
  //     }
  //     this.mediaFiles = this.mediaFiles.concat(files);
  //   });
  // }
}
