import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebaseui/dist/firebaseui.css';
import 'normalize.css';
import { printError } from './application/utils/printError';
import { bootstrap } from './Bootstrap';
import { hackForMobile } from './hackForMobile';
import { registerFontAwesome } from './registerFontAwesome';

registerFontAwesome();
hackForMobile();
bootstrap().catch(printError);
