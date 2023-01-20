/** Log levels */
export type LogLevel = 'log' | 'warn' | 'error' | 'info' | 'debug';

/** Signature of a logging function */
export interface LogFn {
    (message?: any, ...optionalParams: any[]): void;
}

/** Basic logger interface */
export interface Logger {
    error: LogFn;
    warn: LogFn;
    info: LogFn;
    debug: LogFn;
    log: LogFn;
}

// @ts-ignore
const NO_OP: LogFn = (message?: any, ...optionalParams: any[]) => {
};

/** Logger which outputs to the browser console */
export class ConsoleLogger implements Logger {
    readonly error: LogFn;
    readonly warn: LogFn;
    readonly info: LogFn;
    readonly debug: LogFn;
    readonly log: LogFn;

    constructor(options?: { level?: LogLevel }) {
        const { level } = options || {};

        this.error = console.error.bind(console);
        if (level === 'error') {
            this.warn = NO_OP;
            this.info = NO_OP;
            this.debug = NO_OP;
            this.log = NO_OP;

            return;
        }

        this.warn = console.warn.bind(console);
        if (level === 'warn') {
            this.info = NO_OP;
            this.debug = NO_OP;
            this.log = NO_OP;

            return;
        }

        this.info = console.info.bind(console);
        if (level === 'info') {
            this.debug = NO_OP;
            this.log = NO_OP;

            return;
        }

        this.debug = console.debug.bind(console);
        if (level === 'debug') {
            this.log = NO_OP;

            return;
        }

        this.log = console.log.bind(console);
    }
}

export const LOG_LEVEL: LogLevel = import.meta.env.VITE_LOG_LEVEL || (import.meta.env.MODE === 'production' ? 'warn' : 'debug');
export const logger = new ConsoleLogger({ level: LOG_LEVEL });