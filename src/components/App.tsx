// https://fluentsite.z22.web.core.windows.net/quick-start
import {
  FluentProvider,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  Spinner,
  tokens,
} from "@fluentui/react-components";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useTeamsUserCredential } from "@microsoft/teamsfx-react";
import Tab from "./Tab";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
/**
 * The main app which handles the initialization and routing
 * of the app.
 */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      retry: false,
    },
  },
});

export default function App() {
  const { loading, theme, themeString, teamsUserCredential } =
    useTeamsUserCredential({
      initiateLoginEndpoint: config.initiateLoginEndpoint!,
      clientId: config.clientId!,
    });
  return (
    <TeamsFxContext.Provider
      value={{ theme, themeString, teamsUserCredential }}
    >
      <FluentProvider
        theme={
          themeString === "dark"
            ? teamsDarkTheme
            : themeString === "contrast"
            ? teamsHighContrastTheme
            : {
                ...teamsLightTheme,
                colorNeutralBackground3: "#eeeeee",
              }
        }
        style={{ background: tokens.colorNeutralBackground3 }}
      >
        <QueryClientProvider client={queryClient}>
          <Router>
            {loading ? (
              <Spinner style={{ margin: 100 }} />
            ) : (
              <Routes>
                <Route path="/tab" element={<Tab />} />
                <Route path="*" element={<Navigate to={"/tab"} />}></Route>
              </Routes>
            )}
          </Router>
        </QueryClientProvider>
      </FluentProvider>
    </TeamsFxContext.Provider>
  );
}
