import type {Services} from "~/typing/app";
import ApiMock from "~/core/api.mock";
import {makeTaskList} from "~/core/factories";
import {faker} from "@faker-js/faker";

export default {
    development : {
        api: new ApiMock(faker.helpers.multiple(() => makeTaskList(), {count: {min: 1, max: 10}})),
    },
    production: {
        api: new ApiMock(),
    }
} as {[key: string]: Services}