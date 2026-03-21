/**
 * ResourceListPage — placeholder resource list view.
 *
 * TODO: Replace this component with a real CRD list view. Typical approaches:
 *
 *   1. Use K8s.ResourceClasses to build a typed resource class for your CRD:
 *      ```ts
 *      const MyResource = K8s.makeKubeObject<MyResourceSpec>('MyResource');
 *      MyResource.apiEndpoint = K8s.ApiProxy.apiFactory('your.group.io', 'v1', 'yourresources');
 *      ```
 *
 *   2. Then use the ResourceListView or SectionBox + a data-fetching hook to list instances.
 *
 *   3. Remove the placeholder NameValueTable below and replace with your real UI.
 *
 * See https://headlamp.dev/docs/latest/development/plugins/functionality/ for the full SDK guide.
 */

import {
  NameValueTable,
  SectionBox,
  SectionHeader,
} from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import React from 'react';

// TODO: Replace this with your CRD list using K8s.ResourceClasses or K8s.makeKubeObject
export default function ResourceListPage() {
  const placeholderRows = [
    { name: 'Resource Group', value: 'your.group.io/v1' },
    { name: 'Kind', value: 'YourCustomResource' },
    { name: 'Namespace', value: 'default (or cluster-scoped)' },
    { name: 'Description', value: 'Replace this view with your real CRD list' },
  ];

  return (
    <SectionBox title={<SectionHeader title="My Plugin" />}>
      <NameValueTable rows={placeholderRows} />
    </SectionBox>
  );
}
