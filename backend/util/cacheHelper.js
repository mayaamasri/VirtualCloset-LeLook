const redisClient = require('../Config/RedisConfig');

const invalidateCache = async (patterns) => {
    if (!redisClient.isConnected) return;

    try {
        if (Array.isArray(patterns)) {
            for (const pattern of patterns) {
                const keys = await redisClient.client.keys(`cache:${pattern}`);
                if (keys.length > 0) {
                    await Promise.all(keys.map(key => redisClient.del(key)));
                }
            }
        } else {
            const keys = await redisClient.client.keys(`cache:${patterns}`);
            if (keys.length > 0) {
                await Promise.all(keys.map(key => redisClient.del(key)));
            }
        }
    } catch (error) {
        console.error('Cache Invalidation Error:', error);
    }
};

const clearAllCache = async () => {
    if (!redisClient.isConnected) return;
    
    try {
        await redisClient.flushAll();
    } catch (error) {
        console.error('Clear Cache Error:', error);
    }
};

module.exports = {
    invalidateCache,
    clearAllCache
};