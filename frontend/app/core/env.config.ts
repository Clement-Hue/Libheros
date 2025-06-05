import type {Services} from "~/typing/app";
import ApiMock from "~/core/api.mock";
import {makeTaskList} from "~/core/factories";
import {faker} from "@faker-js/faker";
import Api from "~/core/api";

const mock = new ApiMock(faker.helpers.multiple(() => makeTaskList(), {count: {min: 1, max: 10}}))

export default {
    development : {
        api: new Api()
    },
    production: {
        api: new Api(),
    }
} as {[key: string]: Services}