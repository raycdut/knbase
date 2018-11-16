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
  similarityResult: string;

  constructor(public toastController: ToastController, private http: Http, private httpClient: HttpClient) { }

  getAnswer() {
    if (this.question) {
      this.presentToast('Test: ' + this.question);
      this.answerGot = true;
      if (!this.answerList) {
        this.answerList = [{ title: 'Test', content: 'Test content' }];
      }
    } else {
      this.presentToast('Please input the question.');
    }
  }

  getSimilarity(question: string) {

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
      this.similarityResult = JSON.stringify(data);
    }, (error) => {
    });
  }

  getSimilarity2(question: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const params = new HttpParams().set('ques', question);
    this.http.get(this.apiRoot, { search: params });
    // return this.http.get(question);
    // const promise = new Promise((resolve, reject) => {
    //   const apiURL = `${this.apiRoot}?ques=${question}`;
    //   this.httpClient.get(apiURL)
    //     .toPromise()
    //     .then(
    //       res => { // Success
    //         console.log(res);
    //         resolve();
    //       },
    //       msg => { // Error
    //         reject(msg);
    //       }
    //     );
    // });
    // return promise;
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
