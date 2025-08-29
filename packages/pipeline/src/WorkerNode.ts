// src/PipelineEngine.ts

import Bottleneck from "bottleneck";

// --- Types ---
export type TaskHandler<T, R> = (payload: T, attempt: number) => Promise<R>;

interface EngineOptions<TIn = unknown, TOut = unknown> {
    limiter?: Bottleneck;
    onLimitReached?: () => void;
    onSuccess?: (node: WorkerNode, payload: TIn, result: TOut) => void;
}

interface PipelineTask<T> {
    payload: any;
    attempt: number;

}

function wrapTaskHandler<T, R>(
    node: WorkerNode,
    handler: TaskHandler<T, R>,
    onSuccess?: (node: WorkerNode, payload: T, result: R) => void
): TaskHandler<T, R> {
    return async (payload, attempt) => {
        const result = await handler(payload, attempt);
        onSuccess?.(node, payload, result);
        return result;
    };
}

// --- Core Node ---
export class WorkerNode<TIn = unknown, TOut = unknown> {
    protected limiter: Bottleneck;
    protected taskHandler: TaskHandler<TIn, TOut>;
    protected options: EngineOptions;
    protected pipeline?: Pipeline<any, any>; // optional at creation

    constructor(
        taskHandler: TaskHandler<TIn, TOut>,
        options: EngineOptions = {},
        pipeline?: Pipeline<any, any>
    ) {
        const currentNode = this;
        const className = this.constructor.name;

        if (pipeline) {
            if (className !== "WorkerSourceNode" && className !== "WorkerChildNode") {
                throw new Error(`Only WorkerSourceNode or WorkerChildNode may assign a pipeline. Got: ${className}`);
            }
            this.pipeline = pipeline;
        }

        this.options = options;
        this.limiter = options.limiter ?? new Bottleneck({ maxConcurrent: 1 });

        const isAlreadyWrapped = (options as any).__handlerWrapped;

        this.taskHandler = isAlreadyWrapped
            ? taskHandler
            : wrapTaskHandler(currentNode as WorkerNode, taskHandler, options.onSuccess);

        (options as any).__handlerWrapped = true;

        if (options.onLimitReached) {
            this.limiter.on("scheduled", () => {
                options.onLimitReached?.();
            });
        }
    }

    getPipeline(): Pipeline<any, any> | undefined {
        return this.pipeline;
    }

    getHandler(): TaskHandler<TIn, TOut> {
        return this.taskHandler;
    }

    getOptions(): EngineOptions {
        return this.options;
    }

    attachParent<TParentIn>(
        parent: WorkerNode<TParentIn, TIn>
    ): WorkerChildNode<TParentIn, TIn, TOut> {
        if (!parent.pipeline) {
            throw new Error("Parent must belong to a pipeline before attaching children.");
        }

        const child = new WorkerChildNode(this, parent);
        child.pipeline = parent.pipeline;
        return child;
    }

    async execute(task: PipelineTask<TIn>): Promise<TOut> {
        return this.limiter.schedule(() =>
            this.taskHandler(task.payload, task.attempt ?? 0)
        );
    }

    async executeBatch(tasks: PipelineTask<TIn>[]): Promise<TOut[]> {
        return Promise.all(tasks.map(task => this.execute(task)));
    }

    async executePayloads(payloads: TIn[]): Promise<TOut[]> {
        return this.executeBatch(payloads.map(payload => ({
            payload,
            attempt: 0,
        })));
    }
}

export class Pipeline<TIn, TOut> {
    public source: WorkerSourceNode<any, any> | undefined = undefined;
    createSource(node: WorkerNode<TIn, TOut>): WorkerSourceNode<TIn, TOut> {
        const source = new WorkerSourceNode(node.getHandler(), node.getOptions(), this);
        this.source = source;
        return source;
    }

    runBatch(payloads: TIn[]): Promise<TOut[]> {
        if (!this.source) {
            throw new Error("No source node assigned.");
        }
        return this.source.executePayloads(payloads);
    }
}

abstract class WorkerGraphNode<TIn, TOut> extends WorkerNode<TIn, TOut> {
    protected children: Array<WorkerNode<TOut, any>> = [];

    addChild<TChildOut>(child: WorkerNode<TOut, TChildOut>): WorkerChildNode<any, any, any> {
        const childWithParent = child.attachParent(this);
        this.children.push(childWithParent);
        return childWithParent
    }

    override async execute(task: PipelineTask<TIn>): Promise<TOut> {
        const result = await super.execute(task);

        for (const child of this.children) {
            await child.execute({ payload: result, attempt: 0 });
        }

        return result;
    }
}

class WorkerSourceNode<T, R> extends WorkerGraphNode<T, R> {

}

class WorkerChildNode<TParentIn, TIn, TOut> extends WorkerGraphNode<TIn, TOut> {
    constructor(
        base: WorkerNode<TIn, TOut>,
        private parent: WorkerNode<TParentIn, TIn>
    ) {
        super(base.getHandler(), base.getOptions());
    }

    async executeOnSource(task: PipelineTask<TIn>): Promise<TOut> {
        if (!this.pipeline?.source) {
            throw new Error("No source node available on pipeline.");
        }
        return this.pipeline.source.execute(task);
    }

    async batchExecuteOnSource(tasks: PipelineTask<TIn>[]): Promise<any[]> {
        if (!this.pipeline?.source) {
            throw new Error("No source node available on pipeline.");
        }
        return this.pipeline.source.executeBatch(tasks);
    }

    async batchPayloadsOnSource(payloads: TIn[]): Promise<any[]> {
        if (!this.pipeline?.source) {
            throw new Error("No source node available on pipeline.");
        }
        return this.pipeline.source.executePayloads(payloads);
    }
}
