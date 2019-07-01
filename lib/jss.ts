import jss from 'jss';
import preset from 'jss-preset-default';

jss.setup(preset());

export const createStyleSheet = (styles) => jss.createStyleSheet(styles).attach();
