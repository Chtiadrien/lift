import { pluginConfigExt, runServerless } from "../utils/runServerless";

describe("common", () => {
    it("should not override user defined resources in serverless.yml", async () => {
        const { cfTemplate } = await runServerless({
            fixture: "common",
            configExt: pluginConfigExt,
            command: "package",
        });
        expect(cfTemplate.Resources).toMatchObject({
            UserDefinedResource: {},
        });
    });

    it("should resolve variables", async () => {
        const { cfTemplate } = await runServerless({
            fixture: "variables",
            configExt: pluginConfigExt,
            command: "package",
        });
        expect(cfTemplate.Resources.FooLambdaFunction).toMatchObject({
            Properties: {
                Environment: {
                    Variables: {
                        VAR1: "",
                    },
                },
            },
        });
        expect(cfTemplate.Resources.BarWorkerLambdaFunction).toMatchObject({
            Properties: {
                Environment: {
                    Variables: {
                        VAR2: "dev",
                    },
                },
            },
        });
        expect(cfTemplate.Resources.UserDefinedResource).toMatchObject({
            Properties: {
                BucketName: "",
            },
        });
    });
});
