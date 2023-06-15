import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateHotelInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
