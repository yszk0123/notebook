import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebaseui/dist/firebaseui.css';
import 'normalize.css';
import { printError } from './app/utils/printError';
import { bootstrap } from './bootstrap';
import { hackForMobile } from './hackForMobile';
import { registerFontAwesome } from './registerFontAwesome';

registerFontAwesome();
hackForMobile();
bootstrap().catch(printError);
