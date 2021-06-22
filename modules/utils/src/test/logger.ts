import pino from "pino";

export const getTestLoggers = (
    name: string,
    level: pino.Level = "info",
    fast = 20,
    slow = 200,
): { log: pino.BaseLogger; timer: any } => {
    const log = pino({ level, name });
    const timer = (start: number) => (msg: any) => {
        const diff = Date.now() - start;
        if (diff < fast) {
            log.debug(msg);
        } else if (diff < slow) {
            log.info(msg);
        } else {
            log.warn(msg);
        }
    };
    return { log, timer };
};
