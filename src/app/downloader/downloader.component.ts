import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DownloaderService } from '../downloader.service';

@Component({
  selector: 'app-downloader',
  templateUrl: './downloader.component.html',
  styleUrls: ['./downloader.component.scss']
})
export class DownloaderComponent implements OnInit, OnDestroy {

  name: string = ''
  id: string = ''

  subscription: Subscription

  constructor(private downloaderService: DownloaderService) { }

  ngOnInit(): void {
    this.subscription = this.downloaderService.infoBehaviourSubject.subscribe({
      next: (res) => {
        this.id = res?.payload.id
        this.name = res?.payload.title + '.mp3'
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  download() {
    this.downloaderService.download(this.id, this.name)
    setTimeout(() => {
      this.downloaderService.downloader = false
      this.downloaderService.infoBehaviourSubject.next(null)
    }, 3000)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
