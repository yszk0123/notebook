import { History } from 'history';
import { Nullable } from 'option-t/lib/Nullable';
import React from 'react';

export const HistoryContext = React.createContext<Nullable<History>>(null);

export const HistoryProvider = HistoryContext.Provider;
