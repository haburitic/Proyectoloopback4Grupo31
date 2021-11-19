import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Jugador extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  numeroCamisa: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreJugador: string;

  @property({
    type: 'number',
    required: true,
  })
  puntos: number;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Jugador>) {
    super(data);
  }
}

export interface JugadorRelations {
  // describe navigational properties here
}

export type JugadorWithRelations = Jugador & JugadorRelations;
