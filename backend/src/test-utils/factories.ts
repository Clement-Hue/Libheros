import { faker } from '@faker-js/faker';
import { User } from '../auth/entities';

export function makeUser(override: Partial<User>): User {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    taskLists: [],
    ...override,
  };
}
