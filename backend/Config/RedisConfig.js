const Redis = require('redis');
require('dotenv').config();

class RedisClient {
    constructor() {
        this.client = null;
        this.isConnected = false;
    }

    async connect() {
        try {
            this.client = Redis.createClient({
                url: process.env.REDIS_URL || 'redis://localhost:6379'
            });

            this.client.on('error', (err) => {
                console.error('Redis Client Error:', err);
                this.isConnected = false;
            });

            this.client.on('connect', () => {
                console.log('Redis Client Connected');
                this.isConnected = true;
            });

            await this.client.connect();
        } catch (error) {
            console.error('Redis Connection Error:', error);
            this.isConnected = false;
        }
    }

    async get(key) {
        try {
            if (!this.isConnected) return null;
            const value = await this.client.get(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Redis Get Error:', error);
            return null;
        }
    }

    async set(key, value, expireTime = 3600) { // Default expire time: 1 hour
        try {
            if (!this.isConnected) return false;
            await this.client.set(key, JSON.stringify(value), {
                EX: expireTime
            });
            return true;
        } catch (error) {
            console.error('Redis Set Error:', error);
            return false;
        }
    }

    async del(key) {
        try {
            if (!this.isConnected) return false;
            await this.client.del(key);
            return true;
        } catch (error) {
            console.error('Redis Delete Error:', error);
            return false;
        }
    }

    async flushAll() {
        try {
            if (!this.isConnected) return false;
            await this.client.flushAll();
            return true;
        } catch (error) {
            console.error('Redis Flush Error:', error);
            return false;
        }
    }
}

const redisClient = new RedisClient();

module.exports = redisClient;