import './builder.scss';
import Builder from './builder';
import './add_zone/init';
import { hooks } from 'src/globals';

const builder = new Builder();
hooks.do('builder/init', {builder})