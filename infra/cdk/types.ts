import { z } from 'zod';
import {BillingMode} from "aws-cdk-lib/aws-dynamodb";
import { RemovalPolicy } from 'aws-cdk-lib';

const AttributeTypeEnum = z.enum(['STRING', 'NUMBER', 'BINARY']);
const ProjectionTypeEnum = z.enum(['ALL', 'KEYS_ONLY', 'INCLUDE']);

const GSIConfigSchema = z.object({
    indexName: z.string(),
    partitionKey: z.object({
        name: z.string(),
        type: AttributeTypeEnum,
    }),
    sortKey: z
        .object({
            name: z.string(),
            type: AttributeTypeEnum,
        })
        .optional(),
    projectionType: ProjectionTypeEnum.default('ALL'),
});

export const TableConfigSchema = z.object({
    name: z.string(),
    fullName: z.string().optional(),
    partitionKeyType: AttributeTypeEnum.default('STRING'),
    billingMode: z.nativeEnum(BillingMode).optional(),
    removalPolicy: z.nativeEnum(RemovalPolicy).optional(),
    streamEnabled: z.boolean().optional(),
    globalSecondaryIndexes: z.array(GSIConfigSchema).default([]),
});

export type TableConfig = z.infer<typeof TableConfigSchema>;