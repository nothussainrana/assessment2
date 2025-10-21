const fs = require('fs');
const path = require('path');

class StatsCache {
  constructor(dataPath) {
    this.dataPath = dataPath;
    this.cache = null;
    this.lastModified = null;
    this.watcher = null;
    this.initWatcher();
  }

  initWatcher() {
    // Watch for file changes to invalidate cache
    this.watcher = fs.watch(this.dataPath, (eventType) => {
      if (eventType === 'change') {
        console.log('Items file changed, invalidating stats cache');
        this.cache = null;
        this.lastModified = null;
      }
    });
  }

  async getStats() {
    try {
      const stats = await fs.promises.stat(this.dataPath);
      const currentModified = stats.mtime.getTime();

      // Return cached data if file hasn't changed
      if (this.cache && this.lastModified === currentModified) {
        return this.cache;
      }

      // File has changed or cache is empty, recalculate
      const raw = await fs.promises.readFile(this.dataPath, 'utf8');
      const items = JSON.parse(raw);

      const statsData = {
        total: items.length,
        averagePrice: items.length > 0 ? items.reduce((acc, cur) => acc + cur.price, 0) / items.length : 0
      };

      // Update cache
      this.cache = statsData;
      this.lastModified = currentModified;

      return statsData;
    } catch (error) {
      throw new Error(`Failed to calculate stats: ${error.message}`);
    }
  }

  destroy() {
    if (this.watcher) {
      this.watcher.close();
    }
  }
}

module.exports = StatsCache;
