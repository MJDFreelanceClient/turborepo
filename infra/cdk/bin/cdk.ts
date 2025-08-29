#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LambdaCdkAppStack } from '../lib/cdk-stack';
import * as dotenv from 'dotenv';
import {collectJsonObjects, normalizeByName} from "../lib/file-utilities";
import {globalConfigStore, lambdaConfigStore, layerConfigStore} from "../store/configStore";
import * as path from "path";
import * as fs from "node:fs";

dotenv.config({ override: true });

let isValid = true;

let startFolder = path.resolve(__dirname, '../../../bin/cdk/layers');
let targetJsonFileName = "cdk.config.json";
let results = collectJsonObjects(startFolder, targetJsonFileName);
console.log("results", results);
layerConfigStore.setState(()=>normalizeByName(results))

startFolder = path.resolve(__dirname, '../../../bin/cdk/lambdas');
targetJsonFileName = "cdk.config.json";
results = collectJsonObjects(startFolder, targetJsonFileName);
lambdaConfigStore.setState(()=>normalizeByName(results))

const globalConfigPath = path.resolve(__dirname, '../global.infra.config.json');
try {
    const data = fs.readFileSync(globalConfigPath, 'utf8');
    const parsed = JSON.parse(data);
    globalConfigStore.setState(() => parsed);
    console.log('✅ Loaded global config');
} catch (err) {
    console.error('❌ Failed to load global config:', err);
    process.exit(1); // Optional: fail early
}

const app = new cdk.App();
console.log(process.env.CDK_DEFAULT_REGION)
console.log(process.cwd());

if (isValid) {
    new LambdaCdkAppStack(app, 'CdkStack', {
        env: {
            account: process.env.CDK_DEFAULT_ACCOUNT,
            region: process.env.CDK_DEFAULT_REGION,
        },
        /* If you don't specify 'env', this stack will be environment-agnostic.
         * Account/Region-dependent features and context lookups will not work,
         * but a single synthesized template can be deployed anywhere. */

        /* Uncomment the next line to specialize this stack for the AWS Account
         * and Region that are implied by the current CLI configuration. */
        // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

        /* Uncomment the next line if you know exactly what Account and Region you
         * want to deploy the stack to. */
        // env: { account: '123456789012', region: 'us-east-1' },

        /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
    });
}