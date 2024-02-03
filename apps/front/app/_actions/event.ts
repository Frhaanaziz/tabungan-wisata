import { getBackendApi } from '@/lib/axios';
import { getNestErrorMessage } from '@repo/utils';
import { z } from 'zod';
import { eventSchema } from '@repo/validators/event';

export async function getEventsAction() {
  try {
    const { data: events } = await getBackendApi().get('/events');

    const parsedEvents = z.array(eventSchema).parse(events);
    return { data: parsedEvents, error: null };
  } catch (error) {
    console.error('getEventsAction', error);
    return { data: null, error: getNestErrorMessage(error) };
  }
}
