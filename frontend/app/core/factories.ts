import type {Task} from "~/typing/model";
import {faker} from "@faker-js/faker"

export function makeTask(): Task {
    return {
       id: faker.string.uuid(),
    }
}