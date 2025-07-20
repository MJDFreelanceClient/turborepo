import {CfnOutput, RemovalPolicy, Stack, StackProps} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import {globalConfigStore, lambdaConfigStore, layerConfigStore} from "../store/configStore";
import {lambdaDefStore, layerDefStore, tableDefStore} from "../store/defStore";
import {AttributeType, BillingMode, ProjectionType, StreamViewType, Table} from "aws-cdk-lib/aws-dynamodb";
import {DynamoEventSource} from "aws-cdk-lib/aws-lambda-event-sources";
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import * as iam from 'aws-cdk-lib/aws-iam';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import {TableConfig} from "../types";

const buildFullName = (name: string): string => {
  return [process.env.CLIENT, process.env.CONTEXT, name, process.env.VARIANT]
      .filter(Boolean) // removes empty strings or undefined
      .join('-')
      .toLowerCase();
};

function getLayersForLambda(layerNames: string[]): lambda.LayerVersion[] {
  return layerNames.map(name => {
    const layer = layerDefStore.state[name];
    if (!layer) {
      throw new Error(`Layer "${name}" not found in store`);
    }
    return layer;
  });
}

export const buildTables = (configs: TableConfig[], scope: Construct) => {
  if (!configs || configs.length === 0) {
    console.warn('No table configurations provided. Skipping table creation.');
    tableDefStore.setState(() => ({}));
    return;
  }

  const defs = configs.reduce((acc, cfg) => {
    acc[cfg.name] = new Table(scope, cfg.name, {
      tableName: buildFullName(cfg.fullName??cfg.name),
      partitionKey: { name: 'id', type: AttributeType[cfg.partitionKeyType ?? 'STRING'] },
      billingMode: cfg.billingMode ?? BillingMode.PAY_PER_REQUEST,
      removalPolicy: cfg.removalPolicy ?? RemovalPolicy.DESTROY,
      stream: cfg.streamEnabled ? StreamViewType.NEW_AND_OLD_IMAGES : undefined,
    });

    if (cfg.globalSecondaryIndexes) {
      cfg.globalSecondaryIndexes.forEach(gsi => {
        acc[cfg.name].addGlobalSecondaryIndex({
          indexName: gsi.indexName,
          partitionKey: {
            name: gsi.partitionKey.name,
            type: AttributeType[gsi.partitionKey.type]
          },
          sortKey: gsi.sortKey
              ? {
                name: gsi.sortKey.name,
                type: AttributeType[gsi.sortKey.type]
              }
              : undefined,
          projectionType: (gsi.projectionType ?? ProjectionType.ALL) as ProjectionType,
        });
      });
    }

    return acc;
  }, {} as Record<string, Table>);

  tableDefStore.setState(() => defs);

  console.log('✅ Table definitions created:');
};

const buildLayers = (configs:any[], scope:any) => {
  if (!configs || configs.length === 0) {
    console.warn('No layer configurations provided. Skipping layer creation.');
    tableDefStore.setState(() => ({}));
    return;
  }

  const defs = configs.reduce((object, item) => ({
    ...object,
    [item.name]:  new lambda.LayerVersion(scope, item.name, {
      code: lambda.Code.fromAsset(path.resolve(__dirname, `../../../bin/cdk/layers/${item.name}`)),
      layerVersionName: item.useQualifiedName && item.fullName ? buildFullName(item.fullName) : item.fullName ?? item.name,
      compatibleRuntimes: [
        lambda.Runtime.NODEJS_20_X,
        lambda.Runtime.NODEJS_22_X
      ],
      description: item.description,
    })
  }), {} as any);
  layerDefStore.setState(()=>defs);

  console.log('✅ Layer definitions created:');
}

const buildLambdas = (configs: any[], scope: any) => {
  if (!configs || configs.length === 0) {
    console.warn('No lambda configurations provided. Skipping lambda creation.');
    tableDefStore.setState(() => ({}));
    return;
  }

  const defs = configs.reduce((acc, item) => {
    const lambdaPath = path.resolve(__dirname, `../../../bin/cdk/lambdas/${item.name}`);
    const envPath = path.join(lambdaPath, '.env');

    let envVars = {};
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      envVars = dotenv.parse(envContent); // parsed as key-value object
    }

    acc[item.name] = new lambda.Function(scope, item.name, {
      runtime: lambda.Runtime.NODEJS_22_X,
      functionName: buildFullName(item.fullName ?? item.name),
      handler: 'index.handler',
      code: lambda.Code.fromAsset(lambdaPath),
      layers: getLayersForLambda(item.layers || []),
      environment: envVars,
    });

    return acc;
  }, {} as Record<string, lambda.Function>);

  lambdaDefStore.setState(() => defs);
  console.log('✅ Lambda definitions created:');
};

type PermissionsDefinition = {
  inlinePolicies?: {
    actions: string[]; // e.g., ['s3:PutObject', 's3:GetObject']
    resources: {type:string, name:string}[]; // e.g., ['arn:aws:s3:::my-bucket-name/*']
    conditions?: { [key: string]: any }; // optional conditions
  }[]; // list of AWS managed policy names
  managedPolicies?: string[]
};

export const setupOIDC = (
    configs:{
      repoName: string, // e.g., 'my-org/my-repo'
      permissions: PermissionsDefinition
    }[],
    scope: Construct | Stack
) => {
  if (!configs || configs.length === 0) {
    console.warn('No valid oidc configurations provided. Skipping oidc creation.');
    //tableDefStore.setState(() => ({}));
    return;
  }

  configs.forEach(config => {
    const {repoName, permissions} = config;
    const oidcProvider = new iam.OpenIdConnectProvider(scope, 'VercelOIDCProvider', {
      url: `https://oidc.vercel.com/${process.env.VERCEL_TEAM}`,
      clientIds: [`https://vercel.com/${process.env.VERCEL_TEAM}`],
    });

    const role = new iam.Role(scope, 'VercelOidcRole', {
      roleName: `VercelOidcRole-${process.env.CLIENT}-${process.env.CONTEXT}`,
      assumedBy: new iam.WebIdentityPrincipal(oidcProvider.openIdConnectProviderArn, {
        'StringLike': {
          [`oidc.vercel.com/${process.env.VERCEL_TEAM}:sub`]: `owner:${process.env.VERCEL_TEAM}:project:${process.env.PROJECT??'*'}:environment:${process.env.CONTEXT??'*'}`,
        },
        'StringEquals': {
          [`oidc.vercel.com/${process.env.VERCEL_TEAM}:aud`]: `https://vercel.com/${process.env.VERCEL_TEAM}`,
        },
      }),
      description: `OIDC Role for GitHub repo ${repoName}`,
    });

    // Add managed policies
    permissions.managedPolicies?.forEach((policyName) => {
      role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName(policyName));
    });

    // Add inline policies
    permissions.inlinePolicies?.forEach((policy) => {
      role.addToPolicy(new iam.PolicyStatement({
        actions: policy.actions,
        resources: policy.resources.map(resource=>`arn:aws:${resource.type}:*:${process.env.CDK_DEFAULT_ACCOUNT}:${resource.name}`),
        conditions: policy.conditions,
      }));
    });

    new CfnOutput(scope, `OIDCRoleArn`, {
      value: role.roleArn,
      description: `OIDC IAM Role ARN for GitHub repo ${repoName}`,
    });
  })

  console.log('✅ OIDC definition created');

  //return role;
};

function assignTableSettings(configs: any[]) {
  const lambdaMap = lambdaDefStore.state; // name → lambda.Function
  const tableMap = tableDefStore.state;   // name → dynamodb.Table

  for (const lambdaConfig of configs) {
    const lambdaFn = lambdaMap[lambdaConfig.name] as NodejsFunction;
    if (!lambdaFn || !lambdaConfig.tables) continue;

    for (const tableRef of lambdaConfig.tables) {
      const table = tableMap[tableRef.name] as Table;
      if (!table) {
        console.warn(`⚠️ Table "${tableRef.name}" not found for lambda "${lambdaConfig.name}"`);
        continue;
      }

      // Grant permissions
      const perms = tableRef.permissions || ["read"];
      if (perms.includes("read")) table.grantReadData(lambdaFn);
      if (perms.includes("write")) table.grantWriteData(lambdaFn);
      if (perms.includes("full")) table.grantFullAccess(lambdaFn);

      // Stream trigger (if enabled)
      if (tableRef.isStreamHandler) {
        if (!table.tableStreamArn) {
          console.warn(`⚠️ Table "${tableRef.name}" has no stream enabled.`);
          continue;
        }

        lambdaFn.addEventSource(new DynamoEventSource(table, {
          startingPosition: lambda.StartingPosition.LATEST,
          batchSize: tableRef.batchSize ?? 5,
          retryAttempts: tableRef.retryAttempts ?? 3,
        }));

        console.log(`🔁 Connected ${lambdaConfig.name} to stream from ${tableRef.name}`);
      }
    }
  }

  console.log('✅ Table settings added to lambda');
}

export class LambdaCdkAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    setupOIDC(globalConfigStore.state.oidc??{}, this);
    buildTables(Object.values(globalConfigStore.state.tables?? {}), this);

    buildLayers(Object.values(layerConfigStore.state), this);
    buildLambdas(Object.values(lambdaConfigStore.state), this);

    assignTableSettings(Object.values(lambdaConfigStore.state));

  }
}