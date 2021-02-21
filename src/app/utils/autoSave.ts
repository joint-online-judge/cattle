import { autorun, set, toJS } from 'mobx';

/**
 *
 * @param _this the object that needs to sync up with local storage
 * @param name key in localStorage
 */
export const autoSaveJson = (_this: any, name: string): void => {
  const storedJson = localStorage.getItem(name);
  if (storedJson) {
    set(_this, JSON.parse(storedJson));
  }
  autorun(() => {
    const value = toJS(_this);
    localStorage.setItem(name, JSON.stringify(value));
  });
};
