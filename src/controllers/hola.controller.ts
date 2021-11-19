// Uncomment these imports to begin using these cool features!
import {get} from '@loopback/rest';
export class HolaController {
  @get('/hola')
  hola(): string {
    return 'Hello world!';
  }
  constructor() { }
}
