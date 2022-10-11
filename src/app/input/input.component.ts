import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DownloaderService } from '../downloader.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnDestroy {

  errorMessage: string = ''

  subscription: Subscription

  videoLink = new FormControl('', Validators.required)

  constructor(public downloaderService: DownloaderService) { }

  getVideo() {
    this.downloaderService.isLoading = true
    this.subscription = this.downloaderService.getInfo(this.videoLink.value).subscribe({
      next: (res) => {
        if(res.message === 'Success!') {
          this.downloaderService.infoBehaviourSubject.next(res)
          this.downloaderService.isLoading = false
          this.downloaderService.downloader = true
        } else {
          this.errorMessage = res.message
          this.downloaderService.isLoading = false
          setTimeout(() => {
            this.errorMessage = ''
            this.videoLink.setValue('')
          }, 3000)
        }
      },
      error: (err) => {
        console.log(err)
        setTimeout(() => {
          this.errorMessage = ''
          this.videoLink.setValue('')
        }, 3000)
        this.downloaderService.isLoading = false
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
