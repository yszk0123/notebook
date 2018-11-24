import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebaseui/dist/firebaseui.css';
import { render } from './app/render';
import { registerFontAwesome } from './registerFontAwesome';

registerFontAwesome();
render().catch(console.error);
