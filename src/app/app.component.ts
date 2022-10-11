import { Component } from '@angular/core';
import { DownloaderService } from './downloader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mp3dltube'
  constructor(public downloaderService: DownloaderService) {}
}
