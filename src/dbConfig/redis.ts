import {Redis} from "ioredis";

const redisUrl = process.env.REDIS_URL

const getRedisUrl =() =>{
    if (redisUrl){
        return redisUrl
    }
    throw new Error ('mongoUrl not found')
}

export const redis = new Redis(getRedisUrl());