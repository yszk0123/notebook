import { getTime } from 'date-fns';
import React, { useCallback } from 'react';
import DatePicker from 'react-datepicker';
import { noop } from '../../../application/utils/noop';

interface Props {
  value: number;
  onChange: (date: number) => void;
  onClose: () => void;
}

export const Picker = React.memo<Props>(({ value, onChange, onClose }) => {
  // FIXME: Avoid any
  // Type definition of react-datepicker is outdated
  // tslint:disable-next-line:no-any
  const onSelectDate = useCallback((newDate: any) => {
    const newValue = getTime(newDate);
    if (newValue !== value) {
      onChange(newValue);
    }
    onClose();
  }, []);

  return (
    <DatePicker
      // FIXME: Avoid any
      // Type definition of react-datepicker is outdated
      // @ts-ignore
      selected={new Date(value)}
      todayButton="Today"
      onSelect={onSelectDate}
      onChange={noop}
      onBlur={onClose}
      withPortal={true}
      inline={true}
    />
  );
});
