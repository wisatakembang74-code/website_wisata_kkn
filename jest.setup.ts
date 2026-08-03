/**
 * Jest Global Setup
 *
 * Mocking environment variables yang digunakan oleh sheets.ts & revalidate route.
 */

// Set default environment variables for testing
process.env.SPREADSHEET_LINK = "TEST_SPREADSHEET_ID";
process.env.REVALIDATE_TOKEN = "test-secret-token";
