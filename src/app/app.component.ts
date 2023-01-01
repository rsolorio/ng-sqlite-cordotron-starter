import { Component, OnInit } from '@angular/core';
import { FeatureDetectionService } from './core/services/feature-detection/feature-detection.service';

@Component({
  selector: 'xx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public featureInfoText: string = '';

  constructor(private featureService: FeatureDetectionService) {}

  public ngOnInit(): void {
    const featureInfo = this.featureService.initialize();
    this.featureInfoText = JSON.stringify(featureInfo, null, 4);
  }
}
