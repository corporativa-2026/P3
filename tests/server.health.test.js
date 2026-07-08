import { registerHandler, startServer } from '../web/server.js';
import health from '../handlers/health.js';
import { test, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  registerHandler({
    method: 'GET',
    path: '/health',
    accept: ['text/plain', 'application/json'],
  }, health);
  await startServer(3000);
});

test('Server should be healthy', async () => {
  const response = await fetch('http://localhost:3000/health', {
    headers: {
      'Accept': 'text/plain',
    },
  });

  const { status, headers } = response;
  expect(status).toBe(200);
  expect(headers.get('Content-Type')).toBe('text/plain');

  const body = await response.text();
  expect(body).toBe('Server is healthy.');
});

test('Health also responds in json', async () => {
  const response = await fetch('http://localhost:3000/health', {
    headers: {
      'Accept': 'application/json',
    },
  });

  const { status, headers } = response;
  expect(status).toBe(200);
  expect(headers.get('Content-Type')).toBe('application/json');
  const json = await response.json();
  expect(json).toEqual({'server': 'healthy'});
});

test('Health only responds to GET requests', async () => {
  const response = await fetch('http://localhost:3000/health', {
    headers: {
      'Accept': 'text/plain',
    },
    method: 'PUT',
  });

  const { status } = response;
  expect(status).toBe(405); // Method Not Allowed
});

test('Health does not respond to other than text and json', async () => {
  const response = await fetch('http://localhost:3000/health', {
    headers: {
      'Accept': 'application/pdf',
    },
    method: 'GET',
  });

  const { status } = response;
  expect(status).toBe(406); // Not Acceptable
});
