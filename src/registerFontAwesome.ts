import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faEdit as faEditRegular } from '@fortawesome/free-regular-svg-icons/faEdit';
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons/faUser';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

export function registerFontAwesome() {
  config.showMissingIcons = false;

  library.add(
    faBars,
    faEdit,
    faEditRegular,
    faHome,
    faSearch,
    faSpinner,
    faUser,
    faUserRegular,
  );
}
