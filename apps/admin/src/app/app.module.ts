import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';


import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { AdminsModule } from '../admins/admins.module';
import { HotelsModule } from '../hotels/hotels.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
    }),
    AdminsModule,
    HotelsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
