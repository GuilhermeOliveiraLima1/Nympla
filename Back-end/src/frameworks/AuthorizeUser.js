function Authorize(roleAcess) {
    return (request, reply, nextStage) => {
        if (request.user.userRole != roleAcess) {
            return reply.status(403).json({ error: "Access Denied" });
        }
        nextStage();
    }

}

module.exports = Authorize;