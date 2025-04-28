class EventService {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }
    async getAllEvents() {
        const events = await this.eventRepository.getAllEvents();
        return events;
    }

    async searchEvent(name) {
        const events = await this.eventRepository.searchEvent(name);
        return events;
    }

    async deleteEvent(id) {
        const events = await this.eventRepository.deleteEvent(id);
        return events;
    }
}
module.exports = EventService;