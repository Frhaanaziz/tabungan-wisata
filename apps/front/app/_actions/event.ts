import { getBackendApi } from '@/lib/axios';
import { getNestErrorMessage } from '@repo/utils';
import { z } from 'zod';
import { eventSchema } from '@repo/validators/event';
import { paginatedDataUtilsSchema } from '@repo/validators';
import * as Sentry from '@sentry/nextjs';
import { headers } from 'next/headers';

async function withSentryServerAction<T>(
  actionName: string,
  action: () => Promise<T>
): Promise<T> {
  return await Sentry.withServerActionInstrumentation(
    actionName,
    {
      headers: headers(),
      recordResponse: true,
    },
    action
  );
}

export async function getEventsAction() {
  return await withSentryServerAction('getEventsAction', async () => {
    try {
      const { data } = await getBackendApi().get('/events');
      const events = z.array(eventSchema).parse(data);

      return { data: events, error: null };
    } catch (error) {
      console.error('getEventsAction', error);
      return { data: null, error: getNestErrorMessage(error) };
    }
  });
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
