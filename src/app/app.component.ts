import { Component, Inject, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FeatureDetectionService } from './core/services/feature-detection/feature-detection.service';
import { FileServiceBase, FILE_SERVICE } from './core/services/file/file.service.base';

@Component({
  selector: 'xx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public featureInfoText = '';
  public isFileServiceSupported = false;
  public envName = '';

  constructor(
    @Inject(FILE_SERVICE) private fileService: FileServiceBase,
    private featureService: FeatureDetectionService)
  {}

  public ngOnInit(): void {
    const featureInfo = this.featureService.initialize();
    this.featureInfoText = JSON.stringify(featureInfo, null, 4);
    this.isFileServiceSupported = this.fileService.isSupported();
    this.envName = environment.name;
  }
}
