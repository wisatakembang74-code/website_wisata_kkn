/**
 * Unit Tests — /api/revalidate route
 *
 * Menguji endpoint on-demand revalidation yang dipanggil
 * oleh Google Apps Script webhook.
 */

import { POST } from "@/app/api/revalidate/route";
import { NextRequest } from "next/server";

/* ============================================================
   Mock next/cache — revalidateTag
   ============================================================ */

jest.mock("next/cache", () => ({
  revalidateTag: jest.fn(),
}));

/* ============================================================
   Helper: create NextRequest
   ============================================================ */

function createRequest(url: string): NextRequest {
  return new NextRequest(new URL(url, "http://localhost:3000"));
}

/* ============================================================
   Test Suite
   ============================================================ */

describe("POST /api/revalidate", () => {
  it("returns 200 with valid secret token", async () => {
    const req = createRequest("/api/revalidate?secret=test-secret-token");
    const res = await POST(req);

    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.revalidated).toBe(true);
    expect(body.now).toBeDefined();
  });

  it("returns 401 with invalid secret token", async () => {
    const req = createRequest("/api/revalidate?secret=wrong-token");
    const res = await POST(req);

    expect(res.status).toBe(401);

    const body = await res.json();
    expect(body.message).toBe("Token tidak valid");
  });

  it("returns 401 when secret parameter is missing", async () => {
    const req = createRequest("/api/revalidate");
    const res = await POST(req);

    expect(res.status).toBe(401);

    const body = await res.json();
    expect(body.message).toBe("Token tidak valid");
  });

  it("returns 401 with empty secret parameter", async () => {
    const req = createRequest("/api/revalidate?secret=");
    const res = await POST(req);

    expect(res.status).toBe(401);
  });
});
