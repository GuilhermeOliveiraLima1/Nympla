const { Router } = require("express");
const UserController = require("../adapters/controllers/UserController");
const Authenticate = require("./AuthenticateToken");
const EventController = require("../adapters/controllers/EventController")
const Authorize = require("./AuthorizeUser");
const SubscriptionController = require("../adapters/controllers/SubscriptionController");
const routes = Router();

routes.get("/user/all", UserController.getAllUsers);
routes.post("/user/register", UserController.registerUser);
routes.post("/user/login", UserController.loginUser);
routes.get("/event/all", EventController.getAllEvents);
routes.get("/event/:search", EventController.searchEvents);
routes.get("/subscription/all", SubscriptionController.getAllSubscriptions);
routes.get("/subscription/:id", SubscriptionController.getSubscriptionsById);


routes.post("/subscription/create", Authenticate, Authorize("user"), SubscriptionController.createSubscription);
routes.delete("/subscription/delete/", Authenticate, Authorize("user"), SubscriptionController.deleteSubscription);
routes.post("/auth/profile", Authenticate, Authorize("user"), UserController.profileUser);
routes.post("/auth/admin", Authenticate, Authorize("admin"), UserController.adminUser);
routes.get("/admin/subscriptions/:id", Authenticate, Authorize("admin"), SubscriptionController.getSubscriptionsByEventId);
routes.delete("/admin/event/delete/:id", Authenticate, Authorize("admin"), EventController.deleteEvent);

module.exports = routes;
