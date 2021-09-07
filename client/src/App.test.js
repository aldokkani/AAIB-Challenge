import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import REPORTS from '../../data/reports.json';
import fetchReports from './services/fetchReports';
import updateReport from './services/updateReport';
jest.mock('./services/fetchReports');
jest.mock('./services/updateReport');

beforeEach(() => {
  fetchReports.mockResolvedValue(REPORTS.elements);
  updateReport.mockResolvedValue({});
});

test('renders the reports list', async () => {
  render(<App />);
  const reportsList = await screen.findAllByText(/Id:/);
  expect(reportsList).toHaveLength(25);
});

test('resolves reports and block content', async () => {
  render(<App />);

  const resolveBtns = await screen.findAllByRole('button', {
    name: /resolve/i,
  });
  userEvent.click(resolveBtns[0]);
  expect(updateReport).lastCalledWith(REPORTS.elements[0].id, 'Resolved');

  const blockBtns = await screen.findAllByRole('button', { name: /block/i });
  userEvent.click(blockBtns[0]);
  expect(updateReport).lastCalledWith(REPORTS.elements[0].id, 'Blocked');
});
