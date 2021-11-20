import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  User, UserCredentials
} from '../models';
import {UserCredentialsRepository} from '../repositories';

export class UserCredentialsUserController {
  constructor(
    @repository(UserCredentialsRepository) protected userCredentialsRepository: UserCredentialsRepository,
  ) { }

  @get('/user-credentials/{id}/user', {
    responses: {
      '200': {
        description: 'UserCredentials has one User',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User> {
    return this.userCredentialsRepository.user(id).get(filter);
  }

  @post('/user-credentials/{id}/user', {
    responses: {
      '200': {
        description: 'UserCredentials model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof UserCredentials.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInUserCredentials',
            exclude: ['id']
          }),
        },
      },
    }) user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.userCredentialsRepository.user(id).create(user);
  }

  @patch('/user-credentials/{id}/user', {
    responses: {
      '200': {
        description: 'UserCredentials.User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.userCredentialsRepository.user(id).patch(user, where);
  }

  @del('/user-credentials/{id}/user', {
    responses: {
      '200': {
        description: 'UserCredentials.User DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.userCredentialsRepository.user(id).delete(where);
  }
}
