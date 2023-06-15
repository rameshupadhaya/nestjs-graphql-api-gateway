import { Resolver, Query, Mutation, Args, Int, GraphQLExecutionContext } from '@nestjs/graphql';
import { HotelsService } from './hotels.service';
import { Hotel } from './entities/hotel.entity';
import { CreateHotelInput } from './dto/create-hotel.input';
import { UpdateHotelInput } from './dto/update-hotel.input';
import { HttpException, UseFilters, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data: string, ctx: GraphQLExecutionContext) => {
  try {
    const headers = ctx.getArgs()[2].req.headers;
    if (headers.user) {
      return JSON.parse(headers.user);
    }
  } catch (err) {
    return null;
  }
});

@Resolver(() => Hotel)
export class HotelsResolver {
  constructor(private readonly hotelsService: HotelsService) {}

  @Mutation(() => Hotel)
  createHotel(@Args('createHotelInput') createHotelInput: CreateHotelInput,
  @CurrentUser() loggedUser) {
    console.log(loggedUser, 'loggedUser');
    return this.hotelsService.create(createHotelInput);
  }

  @Query(() => [Hotel], { name: 'hotels' })
  findAll() {
    return this.hotelsService.findAll();
  }

  @Query(() => Hotel, { name: 'hotel' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.hotelsService.findOne(id);
  }

  @Mutation(() => Hotel)
  updateHotel(@Args('updateHotelInput') updateHotelInput: UpdateHotelInput) {
    return this.hotelsService.update(updateHotelInput.id, updateHotelInput);
  }

  @Mutation(() => Hotel)
  removeHotel(@Args('id', { type: () => Int }) id: number) {
    return this.hotelsService.remove(id);
  }
}
