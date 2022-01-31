import { SqlMeetingRepository } from "../../infrastructure/sql/sql.meeting.repository";
import { MEETING_REPOSITORY } from "../../domain/ports/meeting.repository";
import { InMemoryMeetingRepository } from "../../infrastructure/memory/in.memory.meeting.repository";

const path = require('path');
require('dotenv').config({ path: path.resolve('./.env') });

export const MeetingRepositoryProvider = {
    provide: MEETING_REPOSITORY,
    useClass:
      process.env.ENV === 'testing'
        ? InMemoryMeetingRepository
        : SqlMeetingRepository,
  };