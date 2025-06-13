function createExpiringTracker() {
  const ids = new Set<string>();

  return {
    mark: (id: string) => {
      ids.add(id);
      setTimeout(() => ids.delete(id), 3000);
    },
    has: (id: string) => ids.has(id),
    clear: (id: string) => ids.delete(id),
  };
}

// Create individual trackers
export const recentlyCreatedTracker = createExpiringTracker();
export const recentlyUpdatedTracker = createExpiringTracker();
export const recentlyDeletedTracker = createExpiringTracker();
