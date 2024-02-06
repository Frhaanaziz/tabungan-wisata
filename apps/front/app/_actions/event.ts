import { getBackendApi } from '@/lib/axios';
import { getNestErrorMessage } from '@repo/utils';
import { z } from 'zod';
import { eventSchema } from '@repo/validators/event';
import { paginatedDataUtilsSchema } from '@repo/validators';

export async function getEventsAction() {
  try {
    const { data } = await getBackendApi().get('/events');
    const events = z.array(eventSchema).parse(data);

    return { data: events, error: null };
  } catch (error) {
    console.error('getEventsAction', error);
    return { data: null, error: getNestErrorMessage(error) };
  }
}

export async function getEventsPaginatedAction(
  paginate: {
    page?: number;
    take?: number;
    costLTE?: number;
    costGTE?: number;
    durationLTE?: number;
    durationGTE?: number;
  } = {}
) {
  try {
    const { data } = await getBackendApi(undefined, paginate).get('/events');
    const eventsPaginated = paginatedDataUtilsSchema
      .extend({ content: z.array(eventSchema) })
      .parse(data);

    return { data: eventsPaginated, error: null };
  } catch (error) {
    console.error('getEventsAction', error);
    return { data: null, error: getNestErrorMessage(error) };
  }
}
