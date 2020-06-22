import { suggestFunds } from './service';

function wrapPromise(promise: Promise<any>) {
  let status = 'pending';
  let result: any;
  let suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e;
    }
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    }
  };
}

export function fetchFundData(key: string) {
  let fundsPromise = suggestFunds(key);
  return {
    funds: wrapPromise(fundsPromise)
  };
}

type ResourceItem<T> = {
  read: () => T;
};

export type Resource<T> = {
  funds: ResourceItem<T>;
};
