// @flow

export type QuerySelectorType = string;

export type CallbackType = (?mixed) => void;

export type EventListType = Array<string | Array<string | Array<string>>>;
export type EventListenerArgsType = [string, CallbackType];
export type EventsStoreEventType = Map<string, Set<CallbackType>>;
export type EventsStoreType = Map<string, Map<string, Set<CallbackType>>>;
