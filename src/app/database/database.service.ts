import { Injectable } from '@angular/core';
import { TestEntity } from './test-entity';
import {
  DataSource,
  DataSourceOptions
} from 'typeorm';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  public async initialize(): Promise<DataSource> {
    const options: DataSourceOptions = {
      type: 'sqlite',
      database: 'starter.db',
      entities: [
        TestEntity
      ],
      synchronize: true,
      logging: ['query', 'warn', 'error']
    };

    const dataSource = new DataSource(options);
    await dataSource.initialize();
    return dataSource;
  }
}
