import { Component, Inject, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FeatureDetectionService } from './core/services/feature-detection/feature-detection.service';
import { FileServiceBase, FILE_SERVICE } from './core/services/file/file.service.base';
import { DatabaseService } from './database/database.service';
import { TestEntity } from './database/test-entity';

@Component({
  selector: 'xx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public featureInfoText = '';
  public isFileServiceSupported = false;
  public envName = '';
  public entities: TestEntity[] = [];

  constructor(
    @Inject(FILE_SERVICE) private fileService: FileServiceBase,
    private featureService: FeatureDetectionService,
    private db: DatabaseService)
  {}

  public ngOnInit(): void {
    const featureInfo = this.featureService.initialize();
    this.featureInfoText = JSON.stringify(featureInfo, null, 4);
    this.isFileServiceSupported = this.fileService.isSupported();
    this.envName = environment.name;
    this.db.initialize().then(() => {
      this.setupEntities();
    });
  }

  private async setupEntities(): Promise<void> {
    this.createEntity();
    this.entities = await TestEntity.find();
  }

  private async createEntity(): Promise<void> {
    let count = await TestEntity.count();
    count++;
    const entity = new TestEntity();
    entity.id = count.toString();
    entity.name = 'Id: ' + entity.id;
    await entity.save();
    this.entities.push(entity);
  }
}
