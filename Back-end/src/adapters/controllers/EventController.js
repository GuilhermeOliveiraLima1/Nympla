const database = require("../../frameworks/PgDatabase");
const EventService = require("../../services/EventService");
const EventRepository = require("../repositories/EventRepository");

const eventRepository = new EventRepository(database);

async function getAllEvents(request, reply) {
    const service = new EventService(eventRepository);
    const replyService = await service.getAllEvents();

    if (replyService.error)
        return reply.status(500).json({ error: replyService.error });

    reply.status(200).json({ events: replyService });
}

async function searchEvents(request, reply) {
    const search = request.params.search
    const service = new EventService(eventRepository);
    const replyService = await service.searchEvent(search);

    if (replyService.error)
        return reply.status(500).json({ error: replyService.error });
    reply.status(200).json({ events: replyService });
}

async function deleteEvent(request, reply) {
    const id = request.params.id
    const service = new EventService(eventRepository);
    const replyService = await service.deleteEvent(id);

    if (replyService.error)
        return reply.status(500).json({ error: replyService.error });

    reply.status(200).json({ status: replyService });
}

module.exports = { getAllEvents, searchEvents, deleteEvent };


