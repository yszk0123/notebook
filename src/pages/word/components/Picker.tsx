import { format, getTime } from 'date-fns';
import React, { useCallback, useState } from 'react';
import DatePicker from 'react-datepicker';
import { styled } from '../../../styled-components';
import { noop } from '../../../utils/noop';

const DateText = styled.div`
  cursor: pointer;
  padding: ${({ theme }) => theme.space};
`;

interface Props {
  value: number;
  onChange: (date: number) => void;
}

export const Picker = React.memo<Props>(({ value: date, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  // FIXME: Avoid any
  // Type definition of react-datepicker is outdated
  // tslint:disable-next-line:no-any
  const onSelectDate = useCallback((newDate: any) => {
    setIsOpen(false);
    onChange(getTime(newDate));
  }, []);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <DateText onClick={onOpen}>
        {date ? format(date, 'YYYY/MM/DD') : null}
      </DateText>
      {isOpen ? (
        <DatePicker
          // FIXME: Avoid any
          // Type definition of react-datepicker is outdated
          // @ts-ignore
          selected={new Date(date)}
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
