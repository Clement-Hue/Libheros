import type {Task, taskList} from "~/typing/model";
import {faker} from "@faker-js/faker"

function makeTaskName() {
    const verbs = ['Fix', 'Implement', 'Design', 'Review', 'Test', 'Refactor', 'Deploy', 'Update'];
    const noun = faker.hacker.noun();
    const adjective = faker.hacker.adjective();

    const verb = faker.helpers.arrayElement(verbs);
    return `${verb} the ${adjective} ${noun}`;
}

function makeTaskListName() {
    const prefixes = ['Project', 'Sprint', 'Milestone', 'Checklist', 'Plan', 'Goals', 'Tasks'];
    const topics = [
        faker.company.buzzNoun(),
        faker.hacker.noun(),
        faker.commerce.department(),
        faker.word.noun(),
    ];

    const prefix = faker.helpers.arrayElement(prefixes);
    const topic = faker.helpers.arrayElement(topics);

    return `${prefix}: ${topic}`;
}

export function makeTaskList(): taskList {
    return {
        id: faker.string.uuid(),
        name: makeTaskListName(),
        tasks: faker.helpers.multiple(makeTask, {count: {min: 0, max: 10}})
    }
}

export function makeTask(): Task {
    return {
        id: faker.string.uuid(),
        name: makeTaskName(),
        description: faker.lorem.sentence({min: 0, max: 15}),
}}