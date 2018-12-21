import { globalVar, globalVar2 } from '../../_global/js/vars.js';

const sex = 'boy';
const echo = value => console.log('%c ./src/components/app1 =>  echo(sex) =>' + '%c ' + value, 'color: #333', 'color: #f00');

export { sex, echo };

console.log('%c ./src/components/app1 =>  ' + '%c' + globalVar, 'color: #333', 'color: #f00');
