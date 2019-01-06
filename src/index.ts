import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebaseui/dist/firebaseui.css';
import 'normalize.css';
import { hackForMobile } from './hackForMobile';
import { registerFontAwesome } from './registerFontAwesome';
import { render } from './render';
import { printError } from './utils/printError';

registerFontAwesome();
hackForMobile();
render().catch(printError);
