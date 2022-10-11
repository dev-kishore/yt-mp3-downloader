import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloaderService {

  constructor(private http: HttpClient) { }

  infoBehaviourSubject = new BehaviorSubject(null)

  isLoading: boolean = false
  downloader: boolean = false

  getInfo(url: string): Observable<any> {
    return this.http.get(`https://mp3dltube.herokuapp.com/downloader?url=${url}`)
  }

  download(id: string, name: string) {
    window.location.href = `https://mp3dltube.herokuapp.com/download?id=${id}&name=${name}`
  }

}
