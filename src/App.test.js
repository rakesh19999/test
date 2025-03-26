import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import DisplayTable from "../DisplayTable";
import { fetchStudyListData } from "../../services/StudyListService";
import { getConfig, getDataQCConfig } from "../../services/ConfigService";

// Mock the services
jest.mock("../../services/StudyListService", () => ({
  fetchStudyListData: jest.fn(),
}));

jest.mock("../../services/ConfigService", () => ({
  getConfig: jest.fn(),
  getDataQCConfig: jest.fn(),
}));

// Mock MSAL authentication
jest.mock("@azure/msal-react", () => ({
  useMsal: () => ({
    instance: {
      acquireTokenSilent: jest.fn().mockResolvedValue({ accessToken: "test-token" }),
      getActiveAccount: jest.fn().mockReturnValue({ username: "test-user" }),
    },
    inProgress: "None",
  }),
}));

const mockMsalInstance = new PublicClientApplication({
  auth: { clientId: "test-client-id" },
});

describe("DisplayTable Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (getConfig as jest.Mock).mockResolvedValue({ DATA_QC_HOST: "https://test-host" });
    (getDataQCConfig as jest.Mock).mockResolvedValue({ SCOPE: "test-scope" });
    (fetchStudyListData as jest.Mock).mockResolvedValue([
      {
        sponsorName: "Test Sponsor",
        studyId: "12345",
        modality: "CT",
        statusName: "new",
        modifiedBy: "User1",
        modifiedDatetime: "2025-03-03",
      },
    ]);
  });

  test("fetches and displays study list data", async () => {
    render(
      <MsalProvider instance={mockMsalInstance}>
        <MemoryRouter>
          <DisplayTable />
        </MemoryRouter>
      </MsalProvider>
    );

    await waitFor(() => expect(fetchStudyListData).toHaveBeenCalled());

    expect(screen.getByText("Test Sponsor")).toBeInTheDocument();
    expect(screen.getByText("12345")).toBeInTheDocument();
    expect(screen.getByText("CT")).toBeInTheDocument();
    expect(screen.getByText("User1")).toBeInTheDocument();
    expect(screen.getByText("2025-03-03")).toBeInTheDocument();
  });
});
