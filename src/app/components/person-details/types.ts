export interface PersonDetailsViewModel {
  readonly description: string;
  readonly properties: PersonProperties;
  readonly uid: string;
  readonly _id: string;
  readonly __v: string;
}

export interface PersonDetailsResult {
  readonly result: PersonDetailsViewModel;
}

interface PersonProperties {
  readonly height: string;
  readonly mass: string;
  readonly hair_color: string;
  readonly skin_color: string;
  readonly eye_color: string;
  readonly birth_year: string;
  readonly gender: string;
  readonly created: string;
  readonly edited: string;
  readonly name: string;
  readonly homeworld: string;
  readonly url: string;
}

export interface PlanetDetailsResult {
  readonly result: PlanetDetailsViewModel;
}

export interface PlanetDetailsViewModel {
  readonly description: string;
  readonly properties: PlanetProperties;
  readonly uid: string;
  readonly _id: string;
  readonly __v: string;
}

interface PlanetProperties {
  readonly name: string;
}

export function isDetailsViewModel(planet: unknown) {
  /* eslint-disable no-prototype-builtins */
  return (
    planet &&
    planet.hasOwnProperty('properties') &&
    planet.hasOwnProperty('uid') &&
    planet.hasOwnProperty('_id') &&
    planet.hasOwnProperty('__v') &&
    planet.hasOwnProperty('description')
  );
}
