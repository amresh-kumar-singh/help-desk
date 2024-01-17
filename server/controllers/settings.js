import Settings from "#root/models/setting";

async function initializeSettings() {
  const setting = await Settings.findOne();
  if (!setting) {
    await Settings.create({});
  }
}

async function getCurrentIndex() {
  const setting = await Settings.findOne();
  return setting.currentIndex;
}

export { initializeSettings, getCurrentIndex };
