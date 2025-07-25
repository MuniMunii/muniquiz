import { useReducer } from 'react';
/**
 * Represents the possible actions for the genericReducer.
 * @template T - The type of the state object.
 */
type ActionType<T> =
  | { type: 'SET'; payload: T }
  | { type: 'CLEAR'; initial: T };
/**
 * A generic reducer that prevents unnecessary state updates
 * by comparing deep equality using JSON.stringify.
 *
 * @template T - The type of the state.
 * @param {T} state - The current state.
 * @param {ActionType<T>} action - The action to perform.
 * @returns {T} The new state.
 */
function genericReducer<T>(state: T, action: ActionType<T>): T {
  switch (action.type) {
    case 'SET':
      if (JSON.stringify(state) === JSON.stringify(action.payload)) return state;
      return action.payload;
    case 'CLEAR':
      if (JSON.stringify(state) === JSON.stringify(action.initial)) return state;
      return action.initial;
    default:
      return state;
  }
}

/**
 * A custom hook that manages state using `useReducer`,
 * with built-in deep comparison to avoid unnecessary updates.
 *
 * @template T - The type of the state.
 * @param {T} initialState - The initial state value.
 * @returns {{
 *   state: T;
 *   set: (payload: T) => void;
 *   clear: () => void;
 * }} The current state, and methods to set or clear it.
 *
 * @example
 * const { state, set, clear } = useSafelyChangeState({ active: false, msg: '' });
 * set({ active: true, msg: 'Copied!' });
 * clear();
 */
// Note use for only simple state  like {error,message} and avoid using Date,map etc
// its not the main function for that
export function useSafelyChangeState<T>(initialState: T) {
  const [state, dispatch] = useReducer(genericReducer<T>, initialState);
  /**
   * Sets the state to a new value if it differs from the current one.
   * @param {T} payload - The new state value.
   */
  const set = (payload: T) => dispatch({ type: 'SET', payload });
  /**
   * Resets the state back to the initial state.
   */
  const clear = () => dispatch({ type: 'CLEAR', initial: initialState });
  return { state, set, clear };
}
