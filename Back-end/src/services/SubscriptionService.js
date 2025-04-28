class SubscriptionService {
    constructor(subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;   
    }
    async getAllSubscriptions() {
        const subscriptions = await this.subscriptionRepository.getAllSubscriptions();
        return subscriptions;
    }

    async getSubscriptionsById(id) {
        const subscriptions = await this.subscriptionRepository.getSubscriptionsById(id);
        return subscriptions;
    }

    async createSubscription(data) {
        const subscription = await this.subscriptionRepository.createSubscription(data);
        return subscription;
    }
    async deleteSubscription(data) {
        const subscription = await this.subscriptionRepository.deleteSubscription(data);
        return subscription;
    }
    async getSubscriptionsByEventId(id) {
        const subscriptions = await this.subscriptionRepository.getSubscriptionsByEventId(id);
        return subscriptions;
    }
}
module.exports = SubscriptionService