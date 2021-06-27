import { server } from "./__mocks__/server"

jest.setTimeout(10000)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())