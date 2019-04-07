import { format, getTime } from 'date-fns';
import React, { useCallback, useState } from 'react';
import DatePicker from 'react-datepicker';
import { styled } from '../../../app/styled-components';
import { noop } from '../../../utils/noop';

const DateText = styled.div`
  cursor: pointer;
  padding: ${({ theme }) => theme.space};
  display: flex;
  align-items: center;
`;

interface Props {
  value: number;
  onChange: (date: number) => void;
}

export const Picker = React.memo<Props>(({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  // FIXME: Avoid any
  // Type definition of react-datepicker is outdated
  // tslint:disable-next-line:no-any
  const onSelectDate = useCallback((newDate: any) => {
    setIsOpen(false);
    const newValue = getTime(newDate);
    if (newValue !== value) {
      onChange(newValue);
    }
  }, []);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <DateText onClick={onOpen}>{value ? format(value, 'YYYY/MM/DD') : null}</DateText>
      {isOpen ? (
        <DatePicker
          // FIXME: Avoid any
          // Type definition of react-datepicker is outdated
          // @ts-ignore
          selected={new Date(value)}
          todayButton="Today"
          onSelect={onSelectDate}
          onChange={noop}
          onBlur={onBlur}
          withPortal={true}
          inline={true}
        />
      ) : null}
    </>
  );
});
