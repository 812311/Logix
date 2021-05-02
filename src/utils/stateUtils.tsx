import React from "react";
import {
  useRecoilTransactionObserver_UNSTABLE as useRecoilTransactionObserver,
  atom as recoilAtom,
  // RecoilState,
  MutableSnapshot,
  // Snapshot,
} from "recoil";
import { v4 as uuidv4 } from "uuid";

export function atom<T>(state: T, key?: string) {
  return recoilAtom<T>({
    key: `${key || uuidv4()}`,
    default: state,
  });
}

export function initializeState(atoms: any) {
  return ({ set }: MutableSnapshot) => {
    Object.entries(sessionStorage).forEach(([key, value]) => {
      // @ts-ignore
      if (atoms[key]) {
        // @ts-ignore
        set(atoms[key], JSON.parse(value).value);
      }
    });
  };
}

export const PersistenceObserver = React.memo(persistenceObserver);
function persistenceObserver() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useRecoilTransactionObserver(({ snapshot }) => {
    // @ts-ignore
    [...snapshot.getNodes_UNSTABLE({ isModified: true })]
      // eslint-disable-next-line react/prop-types
      .filter((modifiedAtom) => modifiedAtom.key.length < 36)
      .forEach((modifiedAtom) => {
        const atomLoadable = snapshot.getLoadable(modifiedAtom);
        if (atomLoadable.state === "hasValue") {
          sessionStorage.setItem(
            modifiedAtom.key,
            JSON.stringify({
              value: atomLoadable.contents,
            })
          );
        }
      });
  });

  return <></>;
}
