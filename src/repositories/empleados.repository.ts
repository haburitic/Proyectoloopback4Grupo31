import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Empleados, EmpleadosRelations} from '../models';

export class EmpleadosRepository extends DefaultCrudRepository<
  Empleados,
  typeof Empleados.prototype._id,
  EmpleadosRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Empleados, dataSource);
  }
}
