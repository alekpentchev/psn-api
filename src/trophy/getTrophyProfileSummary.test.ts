import { rest } from "msw";
import { setupServer } from "msw/node";

import type {
  AuthorizationPayload,
  TrophyProfileSummaryResponse
} from "@/models";
import { generateTrophyCounts } from "@/test/generators";

import { getTrophyProfileSummary } from "./getTrophyProfileSummary";
import { TROPHY_BASE_URL } from "./TROPHY_BASE_URL";

const server = setupServer();

describe("Function: getTrophyProfileSummary", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getTrophyProfileSummary).toBeDefined();
  });

  it("makes a call to retrieve a given user's trophy collection summary", async () => {
    // ARRANGE
    const mockAccountId = "mockAccountId";

    const mockAuthorization: AuthorizationPayload = {
      accessToken: "mockAccessToken"
    };

    const mockResponse: TrophyProfileSummaryResponse = {
      accountId: mockAccountId,
      trophyLevel: "403",
      progress: 80,
      tier: 5,
      earnedTrophies: generateTrophyCounts()
    };

    server.use(
      rest.get(
        `${TROPHY_BASE_URL}/v1/users/${mockAccountId}/trophySummary`,
        (req, res, ctx) => {
          return res(ctx.json(mockResponse));
        }
      )
    );

    // ACT
    const response = await getTrophyProfileSummary(
      mockAuthorization,
      mockAccountId
    );

    // ASSERT
    expect(response).toEqual(mockResponse);
  });
});
