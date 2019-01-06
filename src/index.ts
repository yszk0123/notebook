import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebaseui/dist/firebaseui.css';
import 'normalize.css';
import { bootstrap } from './bootstrap';
import { hackForMobile } from './hackForMobile';
import { registerFontAwesome } from './registerFontAwesome';
import { printError } from './utils/printError';

registerFontAwesome();
hackForMobile();
bootstrap().catch(printError);
