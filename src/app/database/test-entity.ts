import { Entity, BaseEntity, Column, PrimaryColumn } from "typeorm";

@Entity({name: 'test'})
export class TestEntity extends BaseEntity {
    @PrimaryColumn()
    id: string;
    @Column()
    name: string;
}
