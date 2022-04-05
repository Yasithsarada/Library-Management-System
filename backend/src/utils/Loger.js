import pino from 'pino';


const Logger = pino({
    transport : {
        target : 'pino-pretty',
        options : {
            translateTime : `SYS: yyyy-mm-dd HH:MM:ss`,
            ignore : "pid,hostname"
        }
    }
});

export default Logger;