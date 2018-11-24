import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

interface Props {
  icon: IconProp;
  color?: string;
  fill?: boolean;
  spin?: boolean;
  pulse?: boolean;
  onClick?: React.EventHandler<React.SyntheticEvent<HTMLElement>>;
}

export const Icon: React.FunctionComponent<Props> = ({
  fill,
  icon,
  ...props
}) => {
  const finalIcon = fill === false ? ['far', icon] : icon;
  // tslint:disable-next-line:no-any
  return <FontAwesomeIcon {...props} icon={finalIcon as any} />;
};
