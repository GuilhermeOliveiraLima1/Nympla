class Event {
    constructor(title, dateStart, dateEnd, description, image_url) {
      this.id = 0;
      this.title = title;
      this.dateStart = dateStart;
      this.dateEnd = dateEnd;
      this.description = description;
      this.image_url = image_url;
    }
  }
  
  module.exports = Event;