import Redis from 'ioredis';


const redis = new Redis({
    host: "redis-17802.c300.eu-central-1-1.ec2.cloud.redislabs.com",
    port: 17802,
    password: "xjRYuBxwyVImRYDnqUDGxevVc8a4lbPu"
});

export default redis;
