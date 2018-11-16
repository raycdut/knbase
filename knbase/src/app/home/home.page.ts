import { Component, ViewChild } from '@angular/core';
import { Answer } from '../model/answer';
import { ToastController } from '@ionic/angular';

import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

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


  mediaFiles = [];
  @ViewChild('myvideo') myVideo: any;


  constructor(public toastController: ToastController,
    private mediaCapture: MediaCapture, private storage: Storage, private file: File, private media: Media) { }

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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  ionViewDidLoad() {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      this.mediaFiles = JSON.parse(res) || [];
    });
  }

  captureAudio() {
    this.mediaCapture.captureAudio().then(res => {
      this.storeMediaFiles(res);
    }, (err: CaptureError) => console.error(err));
  }

  storeMediaFiles(files) {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      if (res) {
        let arr = JSON.parse(res);
        arr = arr.concat(files);
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
      } else {
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files));
      }
      this.mediaFiles = this.mediaFiles.concat(files);
    });
  }
}
