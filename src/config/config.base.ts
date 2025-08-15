export interface ConfigBaseProps {
  persistNavigation: "always" | "dev" | "prod" | "never"
  catchErrors: "always" | "dev" | "prod" | "never"
  exitRoutes: string[]
  gameCenterLeaderboardId: string
}

export type PersistNavigationConfig = ConfigBaseProps["persistNavigation"]

const BaseConfig: ConfigBaseProps = {
  // This feature is particularly useful in development mode, but
  // can be used in production as well if you prefer.
  persistNavigation: "dev",

  /**
   * Only enable if we're catching errors in the right environment
   */
  catchErrors: "always",

  /**
   * This is a list of all the route names that will exit the app if the back button
   * is pressed while in that screen. Only affects Android.
   */
  exitRoutes: ["Welcome"],

  /**
   * Game Center leaderboard ID, used for submitting scores and showing leaderboards.
   * This should match the ID set in your Game Center configuration.
   * 
   * Allow environment variable to override this
   */
  gameCenterLeaderboardId: process.env.EXPO_PUBLIC_GAMECENTER_LEADERBOARD_ID || "JustAnotherSudokuLeaderboardBestScore",
  
}

export default BaseConfig
