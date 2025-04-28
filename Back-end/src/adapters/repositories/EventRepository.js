class EventRepository {
    constructor(database) {
        this.database = database;
    }

    async getAllEvents() {
        try {
            const query = "SELECT * from events"
            const reply = await this.database.query(query)
            return reply.rows
        } catch (error) {
            return { error: error.message };
        }
    }

    async searchEvent(name) {
        try {
            const query = "SELECT * from events where title ilike $1"
            const reply = await this.database.query(query, [`%${name}%`])
            return reply.rows
        } catch (error) {
            return { error: error.message + " " + name };
        }
    }
    async deleteEvent(id) {
        try {
            const query = "DELETE FROM events WHERE id = $1 RETURNING *"
            const reply = await this.database.query(query, [id])
            return reply.rows
        } catch (error) {
            return { error: error.message };
        }
    }
}

module.exports = EventRepository;