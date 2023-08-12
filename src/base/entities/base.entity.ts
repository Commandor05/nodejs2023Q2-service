import { IsUUID } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  @IsUUID(4)
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
