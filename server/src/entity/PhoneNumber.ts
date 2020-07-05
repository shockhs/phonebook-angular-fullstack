import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int,ObjectType} from "type-graphql";

@ObjectType()
@Entity()
export class PhoneNumber extends BaseEntity{
    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field(()=>String)
    @Column()
    ownerId: string

    @Field(()=>String)
    @Column()
    name: string

    @Field(()=>String)
    @Column()
    phone: string
}