import pino from 'pino';

export const logger = pino({
    transport: {
        target: "pino-pretty",
        options: {
            translateTime: "SYS:dd-mm-yyyy HH:MM:SS",
            ignore: "pid,hostname",
        }
    }
})