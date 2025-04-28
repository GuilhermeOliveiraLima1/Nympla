class SubscriptionRepository{
    constructor(database){
        this.database = database;
    }

    async getAllSubscriptions(){
        try {
            const query = "SELECT * from subscriptions"
            const reply = await this.database.query(query)
            return reply.rows
        } catch (error) {
            return { error: error.message };
        }
    }
    async getSubscriptionsById(id){
        try {
            const query = 'SELECT * FROM subscriptions JOIN events ON subscriptions.event_id = events.id WHERE subscriptions.user_id = $1;'
            const reply = await this.database.query(query, [id])
            return reply.rows
        } catch (error) {
            return { error: error.message };
        }
    }

    async createSubscription(data){
        try {
            const query = 'INSERT INTO subscriptions(user_id, event_id) VALUES($1, $2) RETURNING *;'
            const reply = await this.database.query(query, [data.user_id, data.event_id])
            return reply.rows
        } catch (error) {
            return { error: error.message };
        }
    }

    async deleteSubscription(data){
        try {
            const query = 'DELETE FROM subscriptions WHERE user_id = $1 and event_id = $2 RETURNING *;'
            const reply = await this.database.query(query, [data.user_id, data.event_id])
            return reply.rows
        } catch (error) {
            return { error: error.message };
        }
    }
    async getSubscriptionsByEventId(id){
        try {
            const query = `
            SELECT 
              s.id,
              s.check_in,
              u.name AS user_name
            FROM subscriptions s
            JOIN users u ON s.user_id = u.id
            WHERE s.event_id = $1
          `;
            const reply = await this.database.query(query, [id])
            return reply.rows
        } catch (error) {
            return { error: error.message };
        }
    }
}

module.exports = SubscriptionRepository;