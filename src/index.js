//-------------------------------------
//-------------------------------------
//import SASS files from components
import './components/_global/scss/__.scss'; /* must be placed in the first place */
import './components/_global/scss/base.scss';
import './components/app1/scss/style.scss';
import './components/app2/scss/style.scss';
import './components/app3/scss/style.scss';


//-------------------------------------
//-------------------------------------
//import JS files from components
import './components/_global/js/__.js'; /* must be placed in the first place */
import { sex, echo } from './components/app1/js/functions.js';
import './components/app2/js/functions.js';
import './components/app3/js/functions.js';



echo(sex);

//-------------------------------------
//-------------------------------------
/**
 * Button
 * @class UixButton
 * @requires React, ReactDOM
 * @return {Object}            [description]
 */
const styles = {
    base: {
        background: 'orange',
        border: 0,
        borderRadius: 4,
        color: 'black',
        display: 'block',
        margin: '20px auto',
        padding: '1.5em',
        ':hover': {
            backgroundColor: 'red',
            cursor: 'pointer'
        },
        ':focus': {
            backgroundColor: 'green'
        },
        ':active': {
            backgroundColor: 'yellow'
        }
    }
};

class UixButton extends React.Component {
    render() {
        return <button style={styles.base}>{this.props.children}</button>;
    }
}

UixButton = Radium(UixButton);

ReactDOM.render(
    <UixButton>Cool UixButton!</UixButton>,
    document.getElementById('root')
);
