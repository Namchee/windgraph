import { setupServer } from 'msw/node';
import { handlers } from '@/mocks/img';

export const imgMockServer = setupServer(...handlers);
