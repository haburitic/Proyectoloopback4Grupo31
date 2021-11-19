// ---------- ADD IMPORTS -------------
import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Jugador} from '../models';
import {JugadorRepository} from '../repositories';


// ------------------------------------
@authenticate('jwt') // <---- Apply the @authenticate decorator at the class level
export class JugadoresController {
  constructor(
    @repository(JugadorRepository)
    public jugadorRepository: JugadorRepository,
  ) { }

  @post('/jugadores')
  @response(200, {
    description: 'Jugador model instance',
    content: {'application/json': {schema: getModelSchemaRef(Jugador)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jugador, {
            title: 'NewJugador',

          }),
        },
      },
    })
    jugador: Jugador,
  ): Promise<Jugador> {
    return this.jugadorRepository.create(jugador);
  }

  @get('/jugadores/count')
  @response(200, {
    description: 'Jugador model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Jugador) where?: Where<Jugador>,
  ): Promise<Count> {
    return this.jugadorRepository.count(where);
  }

  @get('/jugadores')
  @response(200, {
    description: 'Array of Jugador model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Jugador, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Jugador) filter?: Filter<Jugador>,
  ): Promise<Jugador[]> {
    return this.jugadorRepository.find(filter);
  }

  @patch('/jugadores')
  @response(200, {
    description: 'Jugador PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jugador, {partial: true}),
        },
      },
    })
    jugador: Jugador,
    @param.where(Jugador) where?: Where<Jugador>,
  ): Promise<Count> {
    return this.jugadorRepository.updateAll(jugador, where);
  }

  @get('/jugadores/{id}')
  @response(200, {
    description: 'Jugador model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Jugador, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Jugador, {exclude: 'where'}) filter?: FilterExcludingWhere<Jugador>
  ): Promise<Jugador> {
    return this.jugadorRepository.findById(id, filter);
  }

  @patch('/jugadores/{id}')
  @response(204, {
    description: 'Jugador PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jugador, {partial: true}),
        },
      },
    })
    jugador: Jugador,
  ): Promise<void> {
    await this.jugadorRepository.updateById(id, jugador);
  }

  @put('/jugadores/{id}')
  @response(204, {
    description: 'Jugador PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() jugador: Jugador,
  ): Promise<void> {
    await this.jugadorRepository.replaceById(id, jugador);
  }

  @del('/jugadores/{id}')
  @response(204, {
    description: 'Jugador DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.jugadorRepository.deleteById(id);
  }
}
