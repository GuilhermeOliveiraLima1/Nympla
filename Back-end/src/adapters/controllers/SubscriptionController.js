const database = require("../../frameworks/PgDatabase");
const SubscriptionService = require("../../services/SubscriptionService");
const SubscriptionRepository = require("../repositories/SubscriptionRepository");

const subscriptionRepository = new SubscriptionRepository(database);

async function getAllSubscriptions(request, reply) {
    const service = new SubscriptionService(subscriptionRepository);
    const replyService = await service.getAllSubscriptions();

    if (replyService.error) 
        return reply.status(500).json({ error: replyService.error });    

    reply.status(200).json({ subscriptions: replyService });
}

async function getSubscriptionsById(request, reply) {    
    const id = request.params.id;
    const service = new SubscriptionService(subscriptionRepository);
    const replyService = await service.getSubscriptionsById(id);

    if (replyService.error) 
        return reply.status(500).json({ error: replyService.error });    

    reply.status(200).json({ subscriptions: replyService });
}

async function createSubscription(request, reply) {
    const data = request.body;

    const service = new SubscriptionService(subscriptionRepository);
    const replyService = await service.createSubscription(data);

    if (replyService.error) 
        return reply.status(500).json({ error: replyService.error });

    reply.status(201).json({ status: replyService });
}

async function deleteSubscription(request, reply) {
    const data = request.body;
    const service = new SubscriptionService(subscriptionRepository);
    const replyService = await service.deleteSubscription(data);

    if (replyService.error) 
        return reply.status(500).json({ error: replyService.error });

    reply.status(200).json({ status: replyService });
}

async function getSubscriptionsByEventId(request, reply) {
    const id = request.params.id;
    const service = new SubscriptionService(subscriptionRepository);
    const replyService = await service.getSubscriptionsByEventId(id);

    if (replyService.error) 
        return reply.status(500).json({ error: replyService.error });

    reply.status(200).json({ subscriptions: replyService });
}

module.exports = { getAllSubscriptions, getSubscriptionsById, createSubscription, deleteSubscription, getSubscriptionsByEventId };