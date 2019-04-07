import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { DiffKeys } from '../utils/Diff';

interface Props {
  icon: IconProp;
  color?: string;
  fill?: boolean;
  spin?: boolean;
  pulse?: boolean;
  onClick?: React.EventHandler<React.SyntheticEvent<HTMLElement>>;
}

export const Icon: React.FunctionComponent<Props> = ({ fill, icon, ...props }) => {
  // tslint:disable-next-line:no-any
  const finalIcon = fill === false ? (['far', icon] as any) : icon;
  return <FontAwesomeIcon {...props} icon={finalIcon} />;
};

export function createIcon(name: IconProp): React.FunctionComponent<DiffKeys<Props, 'icon'>> {
  return props => {
    return <Icon icon={name} {...props} />;
  };
}
