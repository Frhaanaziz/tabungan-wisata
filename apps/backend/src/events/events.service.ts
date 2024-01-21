import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Event, Prisma } from '@prisma/client';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class EventsService {
  constructor(
    private prisma: PrismaService,
    private utilsService: UtilsService,
  ) {}

  async getEvent(
    eventWhereUniqueInput: Prisma.EventWhereUniqueInput,
  ): Promise<Event | null> {
    return this.prisma.event.findUnique({
      where: eventWhereUniqueInput,
    });
  }

  async getEvents(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EventWhereUniqueInput;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput;
  }): Promise<Event[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.event.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createEvent(data: Prisma.EventCreateInput): Promise<Event> {
    return this.prisma.event.create({
      data,
    });
  }

  async updateEvent(params: {
    where: Prisma.EventWhereUniqueInput;
    data: Prisma.EventUpdateInput;
  }): Promise<Event> {
    const { where, data } = params;
    return this.prisma.event.update({
      data,
      where,
    });
  }

  async deleteEvent(where: Prisma.EventWhereUniqueInput): Promise<Event> {
    return this.prisma.event.delete({
      where,
    });
  }

  async getEventsPaginated({
    page,
    take,
    search,
  }: {
    page: number;
    take: number;
    search: string;
  }) {
    return this.utilsService.getPaginatedResult({
      page,
      take,
      model: 'Event',
      search: {
        name: {
          contains: search,
        },
      },
      include: {
        school: true,
      },
    });
  }
}
