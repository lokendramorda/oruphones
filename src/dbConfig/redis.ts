import {Redis} from "ioredis";

const redisUrl = 'rediss://default:87ff426697324825ae343ef6e1006b74@apn1-famous-prawn-33653.upstash.io:33653'

const getRedisUrl =() =>{
    if (redisUrl){
        return redisUrl
    }
    throw new Error ('mongoUrl not found')
}

export const redis = new Redis(getRedisUrl());