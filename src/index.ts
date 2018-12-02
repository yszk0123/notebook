import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebaseui/dist/firebaseui.css';
import { render } from './app/render';
import { hackForMobile } from './hackForMobile';
import { registerFontAwesome } from './registerFontAwesome';
import { printError } from './utils/printError';

registerFontAwesome();
hackForMobile();
render().catch(printError);
