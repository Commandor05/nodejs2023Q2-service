import { registerAs } from '@nestjs/config';
import { loggerLevels } from 'src/logging/types';

export const loggerConfig = {
  transports: process.env.LOG_TRANSPORTS.split(',') || ['console'],
  levels: process.env.LOG_LEVEL || loggerLevels.error,
  shadowFields: process.env.LOG_SHADOW_FIELDS.split(',') || [],
  fileSize: process.env.LOG_FILE_SIZE_KB || 10,
};

export default registerAs('logger', () => loggerConfig);
