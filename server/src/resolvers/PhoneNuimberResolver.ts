import {Arg, Field, InputType, Int, Mutation, Query, Resolver} from "type-graphql";
import {PhoneNumber} from "../entity/PhoneNumber";


@InputType()
class PhoneNumberInput {
    @Field()
    ownerId: string;

    @Field()
    name:string;

    @Field()
    phone:string;
}

@InputType()
class PhoneNumberUpdateInput {
    @Field(()=> String, {nullable:true})
    name?:string;

    @Field(()=> String, {nullable:true})
    phone?:string;
}


@Resolver()
export class PhoneNuimberResolver {
    @Mutation(()=>PhoneNumber)
    async addNumber(
        @Arg('options', ()=>PhoneNumberInput) options:PhoneNumberInput) {
        const res = await PhoneNumber.create(options).save()
        return res
    }

    @Mutation(()=>Boolean)
    async updateNumber(
        @Arg('id', ()=>Int) id:number,
        @Arg('input', ()=>PhoneNumberUpdateInput) input:PhoneNumberUpdateInput
    ) {
        await PhoneNumber.update({id},input)
        return true
    }

    @Mutation(()=>Boolean)
    async deleteNumber(
        @Arg("id",()=>Int) id:number) {
        await PhoneNumber.delete({id})
        return true
    }

    @Query(()=> [PhoneNumber])
    phoneNumbers() {
        return PhoneNumber.find()
    }

    @Query(()=> [PhoneNumber])
    phoneNumbersPersonal(
        @Arg('ownerId') ownerId:string
    ) {
        return PhoneNumber.find({ownerId})
    }

}