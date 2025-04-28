class Subscription{
    constructor(user_id, event_id){
        this.id = 0;
        this.user_id = user_id;
        this.event_id = event_id;
        this.check_in = false;
    }
}

module.exports = Subscription