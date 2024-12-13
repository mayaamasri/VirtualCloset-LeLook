const redisClient = require('../Config/RedisConfig');

const cache = (duration = 3600) => {
    return async (req, res, next) => {
        if (!redisClient.isConnected) {
            return next();
        }

        // Create a unique cache key based on the route and any query parameters
        const key = `cache:${req.originalUrl || req.url}`;

        try {
            const cachedResponse = await redisClient.get(key);
            
            if (cachedResponse) {
                console.log('Cache hit for:', key);
                return res.json(cachedResponse);
            }

            // Modify res.json to store the response in cache
            const originalJson = res.json;
            res.json = function(data) {
                if (res.statusCode === 200) {
                    redisClient.set(key, data, duration);
                }
                return originalJson.call(this, data);
            };

            next();
        } catch (error) {
            console.error('Cache Middleware Error:', error);
            next();
        }
    };
};

module.exports = cache;