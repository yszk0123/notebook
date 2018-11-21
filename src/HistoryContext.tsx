import { History } from 'history';
import React from 'react';

export const HistoryContext = React.createContext<History | null>(null);

export const HistoryProvider = HistoryContext.Provider;
