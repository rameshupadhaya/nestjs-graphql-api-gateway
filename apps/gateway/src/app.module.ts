import { HttpException, HttpStatus, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import * as jwt from 'jsonwebtoken';

const handleContext = ({req}) =>{
  if (req && req.headers.authorization) {
    try{
      const jwtToken = req.headers.authorization.split('Bearer ')[1]
      const decodedJwt = jwt.verify(jwtToken, 'MY_NotSuperS3cr3t');
      return {user: decodedJwt}
    }catch(err){
      console.log(err, 'err');
      //throw Http error if required.
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  } else
    //throw Http error if required.
    // throw new Ht/tpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    return;
}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      
      server: {
        // ... Apollo server options
        // cors: {},
        // playground: true,
        context: handleContext,
      },
       
      gateway: {
        buildService({ name, url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              request.http.headers.set('user', context.user ? JSON.stringify(context.user) : null);
            },
          });
        },
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            // {name: 'auth', url: 'http://localhost:3331/graphql'},
            {name: 'admin', url: 'http://localhost:3332/graphql'},
            {name: 'user', url: 'http://localhost:3333/graphql'},
          ],
        }),        
      }
      
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
