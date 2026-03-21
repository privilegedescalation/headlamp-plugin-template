import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import ResourceListPage from './ResourceListPage';

vi.mock('@kinvolk/headlamp-plugin/lib/CommonComponents', () => ({
  Loader: ({ title }: { title: string }) => <div data-testid="loader">{title}</div>,
  SectionBox: ({ title, children }: { title: React.ReactNode; children?: React.ReactNode }) => (
    <section>
      {title}
      {children}
    </section>
  ),
  SectionHeader: ({ title }: { title: string }) => <h1>{title}</h1>,
  NameValueTable: ({
    rows,
  }: {
    rows: Array<{ name: React.ReactNode; value: React.ReactNode }>;
  }) => (
    <dl>
      {rows.map((r, i) => (
        <div key={i}>
          <dt>{r.name}</dt>
          <dd>{r.value}</dd>
        </div>
      ))}
    </dl>
  ),
  StatusLabel: ({ status, children }: { status: string; children?: React.ReactNode }) => (
    <span data-status={status}>{children}</span>
  ),
}));

describe('ResourceListPage', () => {
  it('renders the "My Plugin" heading', () => {
    render(<ResourceListPage />);
    expect(screen.getByText('My Plugin')).toBeInTheDocument();
  });

  it('shows the example resource group row', () => {
    render(<ResourceListPage />);
    expect(screen.getByText('Resource Group')).toBeInTheDocument();
    expect(screen.getByText('your.group.io/v1')).toBeInTheDocument();
  });

  it('shows the example Kind row', () => {
    render(<ResourceListPage />);
    expect(screen.getByText('Kind')).toBeInTheDocument();
    expect(screen.getByText('YourCustomResource')).toBeInTheDocument();
  });
});
