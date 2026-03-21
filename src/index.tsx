/**
 * my-headlamp-plugin — entry point.
 *
 * Registers sidebar entries and routes for this Headlamp plugin.
 * Replace the sidebar labels, URLs, and route component with your own.
 */

import { registerRoute, registerSidebarEntry } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import ResourceListPage from './components/ResourceListPage';

// ---------------------------------------------------------------------------
// Sidebar entries
// ---------------------------------------------------------------------------

// Top-level sidebar section (parent = null creates a new group in the nav)
registerSidebarEntry({
  parent: null,
  name: 'my-plugin',
  label: 'My Plugin',
  url: '/my-plugin',
  icon: 'mdi:kubernetes',
});

// Child entry — shown nested under the parent section above
registerSidebarEntry({
  parent: 'my-plugin',
  name: 'my-plugin-list',
  label: 'Resources',
  url: '/my-plugin',
});

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

registerRoute({
  path: '/my-plugin',
  sidebar: 'my-plugin-list',
  name: 'my-plugin-list',
  exact: true,
  component: () => <ResourceListPage />,
});
