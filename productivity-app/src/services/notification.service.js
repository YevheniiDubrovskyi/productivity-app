const notificationService = {
  support: 'Notification' in window,

  showMessage(showMessage) {
    if (!this.support) return;

    Notification.requestPermission((permission) => {
      if (permission === 'granted') {
        new Notification(showMessage);
      }
    });
  }
};

export default notificationService;
