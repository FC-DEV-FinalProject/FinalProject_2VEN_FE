import { http, HttpResponse } from 'msw';

export const exampleHandlers = [
  http.get('/mock/api/example', async () =>
    HttpResponse.json({ message: 'This is a mocked response!' }, { status: 200 })
  ),
];
