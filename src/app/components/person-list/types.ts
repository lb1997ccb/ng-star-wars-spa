export interface PersonListViewModel {
  readonly message: string;
  readonly total_records: number;
  readonly total_pages: number;
  readonly previous: null | string;
  readonly next: null | string;
  readonly results: Array<Person>;
}

export interface Person {
  readonly uid: string;
  readonly name: string;
  readonly url: string;
}

export function isPersonListViewModel(person: unknown) {
  /* eslint-disable no-prototype-builtins */
  return (
    person &&
    person.hasOwnProperty('message') &&
    person.hasOwnProperty('total_records') &&
    person.hasOwnProperty('previous') &&
    person.hasOwnProperty('next') &&
    person.hasOwnProperty('results')
  );
}
